-- REVIEW ONLY: test locally, take a fresh backup, and coordinate a release before applying.
-- Existing records keep their IDs, amounts, statuses, attachments and unknown authorship.
begin;
set local lock_timeout = '3s';
set local statement_timeout = '30s';

do $$ begin
  if exists (select 1 from pg_policies where schemaname='public' and tablename='payments' and
    (cmd in ('ALL','DELETE') or (cmd='UPDATE' and policyname not in ('authenticated update pending payments','authenticated update approved transfer status'))
     or (cmd='INSERT' and policyname not in ('authenticated insert payments','payments_insert_with_attachments')))) then
    raise exception 'Unexpected payment write policies: review them before migration';
  end if;
end $$;

alter table public.payments
  add column created_by uuid,
  add column created_by_email text,
  add column created_at timestamptz,
  add column updated_at timestamptz,
  add column row_version bigint not null default 0,
  add column cancelled_at timestamptz,
  add column cancelled_by uuid,
  add column cancel_reason text,
  add column reviewed_at timestamptz,
  add column reviewed_by uuid,
  add column rejection_reason text,
  add column resubmitted_from bigint references public.payments(id);
-- Defaults apply to future records only. Never infer the author of old records.
alter table public.payments alter column created_by set default auth.uid();
alter table public.payments alter column created_at set default now();
alter table public.payments drop constraint payments_status_check;
alter table public.payments add constraint payments_status_check check (status in ('신청','승인','반려','취소'));
create index payments_created_by_id_idx on public.payments (created_by,id);

create schema if not exists app_private;
revoke all on schema app_private from public, anon;
grant usage on schema app_private to authenticated;
create function app_private.payment_is_admin() returns boolean
language sql stable security definer set search_path = '' as $$
  select auth.uid() is not null and exists (
    select 1 from public.user_roles where lower(email)=lower(auth.jwt()->>'email') and role='admin'
  );
$$;
revoke all on function app_private.payment_is_admin() from public, anon;
grant execute on function app_private.payment_is_admin() to authenticated;

create table public.payment_events (
  id bigint generated always as identity primary key,
  payment_id bigint not null references public.payments(id),
  event_type text not null,
  actor_id uuid not null,
  actor_email text,
  occurred_at timestamptz not null default clock_timestamp(),
  before_data jsonb,
  after_data jsonb not null
);
alter table public.payment_events enable row level security;
revoke all on public.payment_events from public, anon, authenticated;
grant select on public.payment_events to authenticated;
create index payment_events_payment_id_idx on public.payment_events(payment_id,id);
create policy payment_events_read on public.payment_events for select to authenticated using (
  (select app_private.payment_is_admin()) or exists (
    select 1 from public.payments p where p.id=payment_id and p.created_by=(select auth.uid())
  )
);

create function app_private.guard_payment_lifecycle() returns trigger
language plpgsql security definer set search_path = '' as $$
declare
  actor uuid := auth.uid();
  is_admin boolean := app_private.payment_is_admin();
  owner boolean;
  check_money boolean;
  transfer_fields text[] := array['transfer_batch_id','exported_at','transferred_at','transfer_status','transfer_memo'];
begin
  if actor is null then raise exception 'Authentication required'; end if;
  if tg_op='INSERT' then
    if new.created_by is not null and new.created_by<>actor then raise exception 'Cannot impersonate applicant'; end if;
    if new.status<>'신청' then raise exception 'New payments must be pending'; end if;
    if new.resubmitted_from is not null and not exists (
      select 1 from public.payments p where p.id=new.resubmitted_from and p.status in ('반려','취소')
        and (p.created_by=actor or is_admin)
    ) then raise exception 'Invalid resubmission source'; end if;
    new.created_by := actor;
    new.created_by_email := auth.jwt()->>'email';
    new.created_at := clock_timestamp();
    new.row_version := 0;
    new.cancelled_at := null; new.cancelled_by := null; new.cancel_reason := null;
    new.reviewed_at := null; new.reviewed_by := null; new.rejection_reason := null;
    new.transfer_status := '미작성'; new.transferred_at := null;
    new.transfer_batch_id := null; new.exported_at := null; new.transfer_memo := null;
    check_money := true;
  else
    owner := old.created_by is not null and old.created_by=actor;
    if new is not distinct from old then return old; end if;
    if new.id<>old.id or new.created_by is distinct from old.created_by
      or new.created_by_email is distinct from old.created_by_email
      or new.created_at is distinct from old.created_at
      or new.resubmitted_from is distinct from old.resubmitted_from
      or new.row_version<>old.row_version or new.updated_at is distinct from old.updated_at
      or new.cancelled_by is distinct from old.cancelled_by or new.cancelled_at is distinct from old.cancelled_at
      or new.reviewed_by is distinct from old.reviewed_by or new.reviewed_at is distinct from old.reviewed_at then
      raise exception 'Payment history metadata is immutable';
    end if;
    if old.status='신청' then
      if new.status='신청' then
        if not owner then raise exception 'Only the applicant can edit a pending payment'; end if;
        if new.cancel_reason is distinct from old.cancel_reason or new.rejection_reason is distinct from old.rejection_reason
          or exists (select 1 from jsonb_each(to_jsonb(new)) e where e.key=any(transfer_fields) and e.value is distinct from (to_jsonb(old)->e.key)) then
          raise exception 'Cannot change processing fields while editing';
        end if;
        check_money := true;
      elsif new.status='취소' then
        if not owner then raise exception 'Only the applicant can cancel a pending payment'; end if;
        if (to_jsonb(new)-array['status','cancel_reason']) is distinct from (to_jsonb(old)-array['status','cancel_reason']) then
          raise exception 'Cancellation cannot change payment details';
        end if;
        if length(trim(coalesce(new.cancel_reason,'')))=0 then raise exception 'Cancellation reason required'; end if;
        new.cancelled_by := actor; new.cancelled_at := clock_timestamp();
      elsif new.status in ('승인','반려') then
        if not is_admin then raise exception 'Only an administrator can review payments'; end if;
        if (to_jsonb(new)-array['status','rejection_reason']) is distinct from (to_jsonb(old)-array['status','rejection_reason']) then
          raise exception 'Review cannot change payment details';
        end if;
        if new.status='반려' and length(trim(coalesce(new.rejection_reason,'')))=0 then raise exception 'Rejection reason required'; end if;
        if new.status='승인' and new.rejection_reason is distinct from old.rejection_reason then raise exception 'Approval cannot change rejection reason'; end if;
        new.reviewed_by := actor; new.reviewed_at := clock_timestamp();
      else raise exception 'Invalid payment transition'; end if;
    elsif old.status='승인' then
      if not is_admin then raise exception 'Only an administrator can process transfers'; end if;
      if (to_jsonb(new)-transfer_fields) is distinct from (to_jsonb(old)-transfer_fields) then
        raise exception 'Approved payment details are locked';
      end if;
      if old.transfer_status in ('송금완료','이체완료') or old.transferred_at is not null then raise exception 'Completed transfers are locked'; end if;
      if new.transfer_status='파일생성' and (new.transfer_batch_id is null or new.exported_at is null) then raise exception 'Export batch details required'; end if;
      if new.transfer_status in ('송금완료','이체완료') and new.transferred_at is null then raise exception 'Transfer completion time required'; end if;
      if new.transfer_status not in ('송금완료','이체완료') and new.transferred_at is not null then raise exception 'Transfer status and completion time disagree'; end if;
    else raise exception 'Cancelled and rejected records are immutable; submit a new request'; end if;
    new.row_version := old.row_version+1;
  end if;
  if check_money then
    if new.amount<=0 or new.estimate_total is null or new.estimate_total<new.amount
      or length(trim(coalesce(new.store,'')))=0 or length(trim(coalesce(new.vendor,'')))=0
      or length(trim(coalesce(new.payment_item,'')))=0 or length(trim(coalesce(new.vendor_bank,'')))=0
      or length(trim(coalesce(new.vendor_account_number,'')))=0 or length(trim(coalesce(new.vendor_account_holder,'')))=0
      or length(trim(coalesce(new.estimate_group_key,'')))=0
      or new.tax_type not in ('일반 송금','사업소득 3.3%')
      or new.payment_type not in ('일시 지급','선금 50%','잔금 50%','직접 입력') then raise exception 'Invalid payment details'; end if;
    if new.withholding_amount is distinct from (case when new.tax_type='사업소득 3.3%' then round(new.amount::numeric*0.033)::bigint else 0 end)
      or new.net_amount is distinct from new.amount-new.withholding_amount then raise exception 'Payment amounts do not reconcile'; end if;
    if jsonb_typeof(new.attachment_files) is distinct from 'object' then raise exception 'Invalid attachment metadata'; end if;
    if new.tax_type='사업소득 3.3%' then
      if jsonb_typeof(new.attachment_files->'id_card_files') is distinct from 'array' then raise exception 'Business income evidence required'; end if;
      if jsonb_array_length(new.attachment_files->'id_card_files')=0 then raise exception 'Business income evidence required'; end if;
    else
      if jsonb_typeof(new.attachment_files->'estimate_files') is distinct from 'array'
        or jsonb_typeof(new.attachment_files->'tax_invoice_files') is distinct from 'array' then raise exception 'Estimate and invoice evidence required'; end if;
      if jsonb_array_length(new.attachment_files->'estimate_files')=0 or jsonb_array_length(new.attachment_files->'tax_invoice_files')=0 then raise exception 'Estimate and invoice evidence required'; end if;
    end if;
  end if;
  new.updated_at := clock_timestamp();
  return new;
end $$;
revoke all on function app_private.guard_payment_lifecycle() from public, anon, authenticated;
create trigger guard_payment_lifecycle before insert or update on public.payments
for each row execute function app_private.guard_payment_lifecycle();

create function app_private.audit_payment_lifecycle() returns trigger
language plpgsql security definer set search_path = '' as $$
declare action text;
begin
  if tg_op='UPDATE' and new is not distinct from old then return new; end if;
  action := case when tg_op='INSERT' then '신청' when new.status is distinct from old.status then new.status
    when new.transfer_status is distinct from old.transfer_status or new.transfer_batch_id is distinct from old.transfer_batch_id then '이체처리' else '수정' end;
  insert into public.payment_events(payment_id,event_type,actor_id,actor_email,before_data,after_data)
    values(new.id,action,auth.uid(),auth.jwt()->>'email',case when tg_op='UPDATE' then to_jsonb(old) else null end,to_jsonb(new));
  return new;
end $$;
revoke all on function app_private.audit_payment_lifecycle() from public, anon, authenticated;
create trigger audit_payment_lifecycle after insert or update on public.payments
for each row execute function app_private.audit_payment_lifecycle();

drop policy if exists "authenticated update pending payments" on public.payments;
drop policy if exists "authenticated update approved transfer status" on public.payments;
drop policy if exists "authenticated insert payments" on public.payments;
drop policy if exists payments_insert_with_attachments on public.payments;
create policy payment_insert_applicant on public.payments for insert to authenticated
  with check (created_by=(select auth.uid()) and status='신청');
create policy payment_update_actor on public.payments for update to authenticated
  using ((select app_private.payment_is_admin()) or (created_by=(select auth.uid()) and status='신청'))
  with check ((select app_private.payment_is_admin()) or (created_by=(select auth.uid()) and status in ('신청','취소')));

commit;
