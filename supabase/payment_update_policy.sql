drop policy if exists "public update pending payments" on public.payments;

create policy "public update pending payments"
on public.payments
for update
using (status = '신청')
with check (status in ('승인', '반려'));
