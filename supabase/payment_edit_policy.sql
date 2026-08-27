drop policy if exists "authenticated update pending payments" on public.payments;
drop policy if exists "public update pending payments" on public.payments;

create policy "authenticated update pending payments"
on public.payments
for update
using (auth.role() = 'authenticated' and status = '신청')
with check (
  auth.role() = 'authenticated'
  and status in ('신청', '승인', '반려')
  and amount > 0
  and estimate_total > 0
  and withholding_amount >= 0
  and net_amount > 0
  and length(trim(store)) > 0
  and length(trim(vendor)) > 0
  and length(trim(vendor_bank)) > 0
  and length(trim(vendor_account_number)) > 0
  and length(trim(vendor_account_holder)) > 0
  and length(trim(payment_item)) > 0
);
