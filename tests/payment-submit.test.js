import assert from "node:assert/strict";
import test from "node:test";
import { readFile } from "node:fs/promises";
import { SourceTextModule, SyntheticModule, createContext } from "node:vm";

async function failedSubmission(outcome) {
  const source = await readFile(new URL("../src/main.js", import.meta.url), "utf8");
  const button = { disabled: false, textContent: "수정 저장" };
  const message = { textContent: "", className: "" };
  let resets = 0, attempts = 0;
  const values = new Map(Object.entries({ payment_id: "9", store: "Sample store", vendor: "Sample vendor", payment_item: "전기", amount: "12000", estimate_total: "30000", payment_type: "직접 입력", tax_type: "일반 송금", vendor_bank: "Sample bank", vendor_account_number: "001234", vendor_account_holder: "Sample holder", memo: "입력 유지 확인" }));
  const original = { id: 9, status: "신청", created_by: "owner", row_version: 0, store: "Sample store", vendor: "Sample vendor", payment_item: "전기", amount: 10000, attachment_files: { estimate_files: [{ path: "existing-estimate.pdf" }], tax_invoice_files: [{ path: "existing-invoice.pdf" }] } };
  const snapshot = structuredClone(original);
  const form = {
    values,
    querySelector: (selector) => selector === "button[type='submit']" ? button : message,
    reset: () => { resets++; values.clear(); }
  };
  const query = { eq: () => query, select: () => query, maybeSingle: async () => { attempts++; return outcome(); } };
  const client = { from: (table) => { assert.equal(table, "payments"); return { update: () => query }; } };
  const context = createContext({
    window: { location: { hostname: "example.test", search: "" } },
    document: {}, URLSearchParams, structuredClone, setTimeout, clearTimeout, console,
    FormData: class {
      constructor(formElement) { this.values = formElement.values; }
      get(key) { return this.values.get(key) ?? null; }
      getAll() { return []; }
    }
  });
  const sdk = new SyntheticModule(["createClient"], function () { this.setExport("createClient", () => client); }, { context });
  const modules = new Map();
  for (const file of ["startup.js", "data.js", "workflow.js", "workspace-views.js", "attachments.js"]) {
    modules.set(`./${file}`, new SourceTextModule(await readFile(new URL(`../src/${file}`, import.meta.url), "utf8"), { context }));
  }
  // Exercise the actual submit handler; expose setup only inside this isolated test module.
  const main = new SourceTextModule(source + `\nexport function configureSubmissionTest(record) {
    currentUser = {id:'owner'}; currentData = {...fallback,payments:[record]}; return submitPayment;
  }`, { context, initializeImportMeta: (meta) => { meta.env = {}; } });
  await main.link((name) => name === "@supabase/supabase-js" ? sdk : modules.get(name));
  await main.evaluate();
  const submit = main.namespace.configureSubmissionTest(original);
  await submit({ preventDefault() {}, currentTarget: form });
  assert.equal(attempts, 1);
  assert.equal(resets, 0);
  assert.equal(values.get("amount"), "12000");
  assert.equal(values.get("memo"), "입력 유지 확인");
  assert.equal(button.disabled, false);
  assert.equal(button.textContent, "수정 저장");
  assert.deepEqual(original, snapshot);
  return message.textContent;
}

test("RLS-denied correction preserves entered values and attachments and restores the save button", async () => {
  const message = await failedSubmission(() => ({ data: null, error: { code: "42501", message: "new row violates row-level security policy" } }));
  assert.match(message, /권한 설정/);
  assert.match(message, /입력 내용은 유지/);
});

test("an unexpected save exception cannot leave the form stuck in saving state", async () => {
  const message = await failedSubmission(() => { throw new Error("network interruption"); });
  assert.match(message, /저장 결과 확인 실패/);
  assert.match(message, /다시 제출하기 전 신청 내역/);
});

test("a concurrent edit/approval is reported without clearing the attempted correction", async () => {
  const message = await failedSubmission(() => ({ data: null, error: null }));
  assert.match(message, /다른 사용자가 먼저 수정하거나 처리/);
});
