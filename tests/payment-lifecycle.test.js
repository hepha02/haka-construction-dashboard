import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { after, before, test } from "node:test";
import { PGlite } from "@electric-sql/pglite";

const ids = { owner: "00000000-0000-4000-8000-000000000001", other: "00000000-0000-4000-8000-000000000002", admin: "00000000-0000-4000-8000-000000000003" };
const db = new PGlite();
let legacyBefore;
async function asUser(name, extra = {}) {
  await db.exec("reset role");
  await db.query("select set_config('request.jwt.claims',$1,false)", [JSON.stringify({ sub: ids[name], email: `${name}@example.invalid`, role: "authenticated", ...extra })]);
  await db.exec("set role authenticated");
}
async function createPayment(source = null) {
  const result = await db.query(`insert into public.payments(store,vendor,amount,status,estimate_total,net_amount,vendor_bank,vendor_account_number,vendor_account_holder,payment_item,estimate_group_key,attachment_files,resubmitted_from)
    values ('Sample store','Sample vendor',10000,'신청',30000,10000,'Sample bank','001234','Sample holder','전기','Sample store::전기','{"estimate_files":[{"path":"sample.pdf"}],"tax_invoice_files":[{"path":"sample-invoice.pdf"}]}',$1) returning *`, [source]);
  return result.rows[0];
}

before(async () => {
  const baseline = await readFile(new URL("../supabase/schema.sql", import.meta.url), "utf8");
  const paymentTable = baseline.match(/create table if not exists public\.payments \([\s\S]*?\n\);/)[0];
  await db.exec(`create role authenticated; create role anon; create schema auth;
    create function auth.jwt() returns jsonb language sql stable as $$select coalesce(nullif(current_setting('request.jwt.claims',true),''),'{}')::jsonb$$;
    create function auth.uid() returns uuid language sql stable as $$select (auth.jwt()->>'sub')::uuid$$;
    create function auth.role() returns text language sql stable as $$select coalesce(auth.jwt()->>'role',current_user::text)$$;
    grant usage on schema auth to authenticated,anon;
    create table public.user_roles(email text primary key,role text);
    insert into public.user_roles values ('admin@example.invalid','admin');
    ${paymentTable}
    insert into public.payments(id,store,vendor,amount,status,net_amount) values (900,'Legacy store','Legacy vendor',44444,'승인',44444);
    alter table public.payments enable row level security;
    create policy "authenticated read payments" on public.payments for select using(auth.role()='authenticated');
    create policy "authenticated update pending payments" on public.payments for update using(auth.role()='authenticated' and status='신청') with check(status in ('승인','반려'));
    create policy "authenticated update approved transfer status" on public.payments for update using(auth.role()='authenticated' and status='승인') with check(status='승인');
    create policy "authenticated insert payments" on public.payments for insert with check(auth.role()='authenticated');
    grant select,insert,update on public.payments to authenticated;
    grant select on public.payments to anon;
    grant usage,select on sequence public.payments_id_seq to authenticated;`);
  legacyBefore = (await db.query("select * from public.payments where id=900")).rows[0];
  const migration = await readFile(new URL("../supabase/migrations/20261029092713_payment_request_lifecycle.sql", import.meta.url), "utf8");
  try { await db.exec(migration); }
  catch (error) { throw new Error(`${error.message} at ${error.position}: ${migration.slice(Number(error.position) - 100, Number(error.position) + 150)}`); }
});
after(async () => { await db.close(); });

test("migration preserves legacy values and never invents an applicant or history", async () => {
  await db.exec("reset role");
  const after = (await db.query("select * from public.payments where id=900")).rows[0];
  for (const key of Object.keys(legacyBefore)) assert.deepEqual(after[key], legacyBefore[key]);
  assert.equal(after.created_by, null);
  assert.equal(after.created_at, null);
  assert.equal((await db.query("select count(*)::integer n from public.payment_events")).rows[0].n, 0);
});

test("applicant can edit and cancel a pending payment, with distinct cancellation history", async () => {
  await asUser("owner");
  const payment = await createPayment();
  assert.equal(payment.created_by, ids.owner);
  const edited = (await db.query("update public.payments set amount=12000,net_amount=12000,memo='Corrected' where id=$1 and row_version=$2 returning *", [payment.id, payment.row_version])).rows[0];
  assert.equal(edited.row_version, 1);
  const cancelled = (await db.query("update public.payments set status='취소',cancel_reason='Duplicate request' where id=$1 and row_version=$2 returning *", [payment.id, edited.row_version])).rows[0];
  assert.equal(cancelled.status, "취소");
  assert.equal(cancelled.cancelled_by, ids.owner);
  assert.equal(cancelled.amount, 12000);
  assert.deepEqual(cancelled.attachment_files, payment.attachment_files);
  assert.deepEqual((await db.query("select event_type from public.payment_events where payment_id=$1 order by id", [payment.id])).rows.map((r) => r.event_type), ["신청", "수정", "취소"]);
});

test("another applicant cannot edit or cancel someone else's pending payment", async () => {
  await asUser("owner"); const payment = await createPayment();
  await asUser("other");
  assert.equal((await db.query("update public.payments set memo='Other edit' where id=$1 returning id", [payment.id])).rows.length, 0);
  assert.equal((await db.query("update public.payments set status='취소',cancel_reason='Other cancel' where id=$1 returning id", [payment.id])).rows.length, 0);
  assert.equal((await db.query("select * from public.payment_events where payment_id=$1", [payment.id])).rows.length, 0);
});

test("applicant cannot approve, spoof authorship, or forge audit events", async () => {
  await asUser("owner", { user_metadata: { role: "admin" } }); const payment = await createPayment();
  await assert.rejects(db.query("update public.payments set status='승인' where id=$1", [payment.id]), /administrator/);
  await assert.rejects(db.query("update public.payments set created_by=$1 where id=$2", [ids.other, payment.id]), /immutable/);
  await assert.rejects(db.query("insert into public.payment_events(payment_id,event_type,actor_id,after_data) values($1,'승인',$2,'{}')", [payment.id, ids.owner]), /permission denied/);
  await assert.rejects(db.query("update public.payments set status='취소' where id=$1", [payment.id]), /reason/);
});

test("admin approval locks amounts and cancellation, and completed transfers cannot regress", async () => {
  await asUser("owner"); const payment = await createPayment();
  await asUser("admin");
  await assert.rejects(db.query("update public.payments set amount=15000,net_amount=15000 where id=$1", [payment.id]), /applicant/);
  const approved = (await db.query("update public.payments set status='승인' where id=$1 returning *", [payment.id])).rows[0];
  assert.equal(approved.reviewed_by, ids.admin);
  await assert.rejects(db.query("update public.payments set status='취소',cancel_reason='Too late' where id=$1", [payment.id]), /locked/);
  await assert.rejects(db.query("update public.payments set amount=20000,net_amount=20000 where id=$1", [payment.id]), /locked/);
  await asUser("owner");
  assert.equal((await db.query("update public.payments set status='취소',cancel_reason='Too late' where id=$1 returning id", [payment.id])).rows.length, 0);
  await asUser("admin");
  await db.query("update public.payments set transfer_status='송금완료',transferred_at=now() where id=$1", [payment.id]);
  await assert.rejects(db.query("update public.payments set transfer_status='파일생성',exported_at=now(),transfer_batch_id='B1' where id=$1", [payment.id]), /locked/);
});

test("a stale version cannot overwrite an edit or an approval", async () => {
  await asUser("owner"); const payment = await createPayment();
  await db.query("update public.payments set memo='First edit' where id=$1 and row_version=0", [payment.id]);
  assert.equal((await db.query("update public.payments set memo='Stale edit' where id=$1 and status='신청' and row_version=0 returning id", [payment.id])).rows.length, 0);
  await asUser("admin"); await db.query("update public.payments set status='승인' where id=$1", [payment.id]);
  await asUser("owner");
  assert.equal((await db.query("update public.payments set memo='Stale after approval' where id=$1 and status='신청' and row_version=1 returning id", [payment.id])).rows.length, 0);
});

test("rejection requires a reason and cancelled/rejected records stay immutable", async () => {
  await asUser("owner"); const payment = await createPayment();
  await asUser("admin");
  await assert.rejects(db.query("update public.payments set status='반려' where id=$1", [payment.id]), /reason/);
  await db.query("update public.payments set status='반려',rejection_reason='Missing details' where id=$1", [payment.id]);
  await assert.rejects(db.query("update public.payments set memo='Overwrite old request' where id=$1", [payment.id]), /immutable/);
  await asUser("owner");
  const replacement = await createPayment(payment.id);
  assert.equal(replacement.status, "신청");
  assert.notEqual(replacement.id, payment.id);
  assert.equal(replacement.resubmitted_from, payment.id);
  await asUser("other");
  await assert.rejects(createPayment(payment.id), /resubmission/);
});

test("business-income edits require reconciled amounts and their evidence", async () => {
  await asUser("owner"); const payment = await createPayment();
  await assert.rejects(db.query("update public.payments set tax_type='사업소득 3.3%',withholding_amount=330,net_amount=9670 where id=$1", [payment.id]), /evidence/);
  const changed = (await db.query(`update public.payments set tax_type='사업소득 3.3%',withholding_amount=330,net_amount=9670,
    attachment_files='{"id_card_files":[{"path":"synthetic-proof.pdf"}]}' where id=$1 returning *`, [payment.id])).rows[0];
  assert.equal(changed.net_amount, 9670);
  assert.equal(changed.created_by, ids.owner);
});

test("server rejects financial mismatches and processing changes in a pending edit", async () => {
  await asUser("owner"); const payment = await createPayment();
  await assert.rejects(db.query("update public.payments set net_amount=1 where id=$1", [payment.id]), /reconcile/);
  await assert.rejects(db.query("update public.payments set transfer_status='파일생성' where id=$1", [payment.id]), /processing/);
  await db.exec("reset role");
  await db.query("select set_config('request.jwt.claims',$1,false)", [JSON.stringify({ role: "anon" })]);
  await db.exec("set role anon");
  assert.equal((await db.query("select * from public.payments")).rows.length, 0);
  await assert.rejects(db.query("select * from public.payment_events"), /permission denied/);
});
