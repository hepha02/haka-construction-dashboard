alter table public.vendors
add column if not exists account_number text,
add column if not exists account_holder text;

update public.vendors
set
  account_number = case
    when name = '도원인테리어' then '110-000-000001'
    when name = '한빛전기' then '004-000-000002'
    when name = '서진설비' then '352-000-000003'
    else account_number
  end,
  account_holder = coalesce(account_holder, name)
where account_number is null or account_holder is null;

drop policy if exists "public insert vendors" on public.vendors;

create policy "public insert vendors"
on public.vendors
for insert
with check (
  length(trim(name)) > 0
  and length(trim(category)) > 0
  and length(trim(bank)) > 0
  and length(trim(account_number)) > 0
  and length(trim(account_holder)) > 0
  and risk = '정상'
  and total = 0
);
