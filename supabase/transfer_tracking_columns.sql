alter table public.payments
  add column if not exists transfer_batch_id text,
  add column if not exists exported_at timestamp with time zone,
  add column if not exists transferred_at timestamp with time zone,
  add column if not exists transfer_status text not null default '미작성',
  add column if not exists transfer_memo text;

do $$
begin
  if not exists (
    select 1
    from pg_constraint
    where conname = 'payments_transfer_status_check'
      and conrelid = 'public.payments'::regclass
  ) then
    alter table public.payments
      add constraint payments_transfer_status_check
      check (transfer_status in ('미작성', '파일생성', '송금완료', '이체완료'));
  end if;
end $$;

drop policy if exists "authenticated update approved transfer status" on public.payments;

create policy "authenticated update approved transfer status"
on public.payments
for update
using (auth.role() = 'authenticated' and status = '승인')
with check (
  auth.role() = 'authenticated'
  and status = '승인'
  and transfer_status in ('미작성', '파일생성', '송금완료', '이체완료')
);
