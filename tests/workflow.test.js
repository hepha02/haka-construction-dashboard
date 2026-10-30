import assert from "node:assert/strict";
import test from "node:test";
import { readTable, updatePendingPayment, changePendingStatus } from "../src/data.js";
import { summarizePayments, aggregateCosts, filterPayments, csvText, validateImportRows, canEditPayment, canReviewPayment, canResubmitPayment } from "../src/workflow.js";
import { incomeBadge, incomeReminder, costReportRows } from "../src/workspace-views.js";

const payments = [
  { id: 1, store: "A", vendor: "V", payment_item: "전기", amount: 1000000, net_amount: 967000, withholding_amount: 33000, status: "승인", tax_type: "사업소득 3.3%", transfer_status: "송금완료", requested_at: "2026-10-01" },
  { id: 2, store: "A", payment_item: "전기", amount: 500000, status: "신청", requested_at: "2026-10-02" },
  { id: 3, store: "A", payment_item: "전기", amount: 9000000, status: "반려", tax_type: "사업소득 3.3%", requested_at: "2026-10-03" },
  { id: 4, store: "B", payment_item: "철거", amount: 2000000, status: "승인", transfer_status: "파일생성", requested_at: "2026-10-04" }
];

test("only a known applicant can edit/cancel a pending request; admin does not imply ownership", () => {
  const owner = { id: "owner" };
  const pending = { status: "신청", created_by: "owner" };
  assert.equal(canEditPayment(pending, owner), true);
  assert.equal(canEditPayment(pending, { id: "admin" }), false);
  assert.equal(canEditPayment({ status: "신청", created_by: null }, owner), false);
  for (const status of ["승인", "반려", "취소"]) assert.equal(canEditPayment({ ...pending, status }, owner), false);
  assert.equal(canReviewPayment(pending, "전체 관리자"), true);
  assert.equal(canReviewPayment(pending, "인테리어 공사실장"), false);
});

test("cancelled business-income requests stay out of costs and reminders", () => {
  const cancelled = { ...payments[0], status: "취소" };
  const totals = summarizePayments([cancelled]);
  assert.equal(totals.approved, 0);
  assert.equal(totals.paidNet, 0);
  assert.equal(totals.businessCount, 0);
  assert.equal(incomeReminder({ payments: [cancelled] }), "");
  assert.equal(canResubmitPayment({ ...cancelled, created_by: "owner" }, { id: "owner" }), true);
  assert.equal(canResubmitPayment({ ...cancelled, created_by: "owner" }, { id: "other" }), false);
});

test("cost totals separate approval, actual net payment, withholding and rejection", () => {
  const snapshot = structuredClone(payments);
  assert.deepEqual(summarizePayments(payments), { pendingCount: 1, pending: 500000, approved: 3000000, paidCost: 1000000, paidNet: 967000, withholding: 33000, unpaid: 2000000, businessCount: 1, businessPaidCount: 1 });
  assert.deepEqual(payments, snapshot);
});

test("store and item aggregation preserve totals without double counting", () => {
  for (const group of ["store", "item", "detail"]) {
    const rows = aggregateCosts(payments, group);
    assert.equal(rows.reduce((n, r) => n + r.approved, 0), 3000000);
    assert.equal(rows.reduce((n, r) => n + r.paidNet, 0), 967000);
  }
});

test("legacy ledger is a separate source, independent of payment records", () => {
  const data = { payments, costParts: [{ store_name: "A", part_name: "전기", amount: 100000000 }] };
  assert.equal(costReportRows(data, { source: "legacy", group: "store" })[0].legacy, 100000000);
  assert.equal(costReportRows(data, { source: "payments", group: "store" }).reduce((n, r) => n + r.approved, 0), 3000000);
});

test("business-income alerts explicitly point to Amaranth without claiming filing completion", () => {
  assert.match(incomeBadge(payments[0]), /아마란스 신고 확인/);
  assert.equal(incomeBadge(payments[1]), "");
  assert.match(incomeReminder({ payments }), /지급 건 1건/);
  assert.match(incomeReminder({ payments }), /신고완료 여부를 판정하지 않습니다/);
});

test("date, store and tax filters are applied together", () => {
  assert.deepEqual(filterPayments(payments, { store: "A", tax: "사업소득 3.3%", end: "2026-10-02", search: "전기" }).map((p) => p.id), [1]);
});

test("all pages are loaded, including records beyond the old 500-row limit", async () => {
  const rows = Array.from({ length: 1234 }, (_, id) => ({ id }));
  const client = { from: () => ({ select: () => ({ order: () => ({ range: async (start, end) => ({ data: rows.slice(start, end + 1), error: null }) }) }) }) };
  assert.equal((await readTable(client, "payments")).data.length, 1234);
});

test("a later-page failure cannot be treated as a complete cost total", async () => {
  const client = { from: () => ({ select: () => ({ order: () => ({ range: async (start) => start === 0 ? { data: Array(500).fill({ id: 1 }) } : { error: { message: "offline" } } }) }) }) };
  const result = await readTable(client, "payments");
  assert.equal(result.data, null);
  assert.equal(result.error.message, "offline");
});

test("saving a stale draft cannot overwrite a concurrent edit or approval", async () => {
  const original = { id: 9, status: "신청", amount: 10000, memo: null, attachment_files: { estimate_files: [{ path: "old.pdf" }] } };
  const live = { ...original, amount: 20000 };
  const conditions = [];
  let saved = false;
  const query = {
    eq: (key, value) => { conditions.push([key, value]); return query; },
    is: (key, value) => { conditions.push([key, value]); return query; },
    select: () => query,
    maybeSingle: async () => {
      const match = conditions.every(([key, value]) => (typeof live[key] === "object" && live[key] !== null ? JSON.stringify(live[key]) : live[key]) === value);
      saved = match;
      return { data: match ? { id: 9 } : null, error: null };
    }
  };
  const client = { from: () => ({ update: () => query }) };
  assert.equal((await updatePendingPayment(client, original, { amount: 15000 })).data, null);
  assert.equal(saved, false);
  assert.equal(live.amount, 20000);
  assert.ok(conditions.some(([key]) => key === "attachment_files"));
  live.amount = 10000; live.status = "승인";
  assert.equal((await updatePendingPayment(client, original, { amount: 15000 })).data, null);
  assert.equal(saved, false);
});

test("CSV protects formulas and leading-zero account numbers", () => {
  assert.equal(csvText([["=1+1", "00123", 'a"b', 0]]), '\uFEFF"\'=1+1","\'00123","a""b","0"');
});

test("status decisions cannot approve/cancel unseen edits or operate without a version", async () => {
  const original = { id: 9, status: "신청", row_version: 0 };
  const live = { ...original, row_version: 1 };
  let writes = 0;
  const client = { from: () => ({ update: (payload) => {
    const conditions = [];
    const query = {
      eq: (key, value) => { conditions.push([key, value]); return query; },
      select: () => query,
      maybeSingle: async () => {
        if (!conditions.every(([key, value]) => live[key] === value)) return { data: null, error: null };
        Object.assign(live, payload); live.row_version++; writes++;
        return { data: { id: live.id }, error: null };
      }
    };
    return query;
  } }) };
  for (const status of ["승인", "반려", "취소"]) assert.equal((await changePendingStatus(client, original, status, "sample reason")).data, null);
  await assert.rejects(changePendingStatus(client, { id: 9, status: "신청" }, "승인"), /버전/);
  assert.equal(writes, 0);
  assert.equal((await changePendingStatus(client, { ...live }, "승인")).data.id, 9);
  assert.equal(writes, 1);
});

test("import review flags invalid values, unknown names and duplicates without modifying data", () => {
  const data = { stores: [{ name: "A" }], vendors: [{ name: "V" }], constructionStarts: [], payments };
  const snapshot = structuredClone(data);
  const results = validateImportRows([
    { 매장: "A", 업체: "V", 품목: "전기", amount: "1,000,000" },
    { 매장: "A", 업체: "V", 품목: "설비", amount: "-100" },
    { 매장: "Unknown", 업체: "V", 품목: "설비", amount: "100" }
  ], data);
  assert.match(results[0].errors.join(), /중복/);
  assert.match(results[1].errors.join(), /정수/);
  assert.match(results[2].errors.join(), /매장/);
  assert.deepEqual(data, snapshot);
});
