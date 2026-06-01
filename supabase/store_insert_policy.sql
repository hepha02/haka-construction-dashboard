drop policy if exists "public insert stores" on public.stores;

create policy "public insert stores"
on public.stores
for insert
with check (
  length(trim(name)) > 0
  and area > 0
  and budget > 0
  and spent >= 0
  and status in ('완료', '진행중', '미착공')
);
