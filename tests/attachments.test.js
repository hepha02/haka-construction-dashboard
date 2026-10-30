import assert from "node:assert/strict";
import test from "node:test";
import { createClient } from "@supabase/supabase-js";
import { attachmentPath, uploadAttachments } from "../src/attachments.js";

const owner = "00000000-0000-4000-8000-000000000001";
// Match Storage's object-key character validation, without contacting a cloud project.
const validKey = /^[A-Za-z0-9_/!.*'() &$=@;:+,?-]*$/;
const names = ["성수 매장 견적서(최종).PDF", "세금계산서_10월.pdf", "견적서.pdf".normalize("NFD"), "현장사진😀.jpg", "取引明細.xlsx", "확장자없는한글파일"];

test("real SDK requests use valid unique keys while retaining Korean/Unicode filenames and bytes", async () => {
  const requests = [];
  const client = createClient("https://storage.example.invalid", "test-anon-key", {
    auth: { persistSession: false, autoRefreshToken: false, detectSessionInUrl: false },
    global: { fetch: async (input, options) => {
      const url = new URL(input);
      assert.equal(url.hostname, "storage.example.invalid");
      assert.equal(options.method, "POST");
      const key = decodeURIComponent(url.pathname.replace(/^\/storage\/v1\/object\//, ""));
      if (!validKey.test(key)) return new Response(JSON.stringify({ statusCode: "400", error: "InvalidKey", message: "Invalid key" }), { status: 400 });
      assert.equal(new Headers(options.headers).get("x-upsert"), "false");
      const bodyFile = options.body.get("");
      requests.push({ key, name: bodyFile.name, body: await bodyFile.text() });
      return new Response(JSON.stringify({ Id: crypto.randomUUID(), Key: key }), { status: 200 });
    } }
  });
  const files = names.map((name) => new File(["synthetic attachment bytes"], name, { type: "application/pdf" }));
  const oldAttempt = await client.storage.from("payment-files").upload(`${owner}/estimates/한글견적서.pdf`, files[0]);
  assert.match(oldAttempt.error.message, /Invalid key/);

  for (const bucket of ["payment-files", "vendor-files", "construction-start-files"]) {
    const result = await uploadAttachments(client, bucket, owner, files, "estimates");
    assert.deepEqual(result.map((file) => file.name), names);
    assert.ok(result.every((file) => validKey.test(file.path) && file.path.startsWith(`${owner}/estimates/`)));
    assert.ok(result.every((file) => file.url.includes(`/object/public/${bucket}/`)));
  }
  assert.equal(new Set(requests.map((request) => request.key)).size, files.length * 3);
  assert.ok(requests.every((request) => request.body === "synthetic attachment bytes"));
  assert.deepEqual(requests.slice(0, files.length).map((request) => request.name), names);
});

test("preview uses the same safe path generation without a Storage client", async () => {
  const results = await uploadAttachments(null, "payment-files", owner, [new File(["sample"], names[0])], "estimates");
  assert.equal(results[0].name, names[0]);
  assert.match(results[0].path, /\/[a-f0-9-]+\.pdf$/);
  assert.equal(results[0].url, "");
});

test("filenames cannot inject folders, and invalid ownership paths fail before upload", () => {
  const path = attachmentPath(owner, "tax-invoices", "../../잘못된 경로.PDF");
  assert.equal(path.split("/").length, 3);
  assert.ok(validKey.test(path));
  assert.throws(() => attachmentPath("../other", "estimates", "a.pdf"), /저장 경로/);
  assert.throws(() => attachmentPath(owner, "../estimates", "a.pdf"), /저장 경로/);
});

test("upload failures preserve the original file and identify its Korean filename", async () => {
  const file = new File(["sample"], names[0]);
  const client = { storage: { from: () => ({ upload: async () => ({ error: new Error("temporary failure") }) }) } };
  await assert.rejects(uploadAttachments(client, "payment-files", owner, [file], "estimates"), (error) => {
    assert.ok(error.message.includes(file.name));
    assert.equal(error.cause.message, "temporary failure");
    return true;
  });
  assert.equal(await file.text(), "sample");
  assert.equal(file.name, names[0]);
});
