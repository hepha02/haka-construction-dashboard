drop policy if exists "public insert payments" on public.payments;

create policy "public insert payments"
on public.payments
for insert
with check (
  status = '신청'
  and amount > 0
  and length(trim(store)) > 0
  and length(trim(vendor)) > 0
);
