import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";
import { SourceTextModule, SyntheticModule, createContext } from "node:vm";

const mainSource = await readFile(new URL("../src/main.js", import.meta.url), "utf8");
const startupSource = await readFile(new URL("../src/startup.js", import.meta.url), "utf8");

async function appWithSession(getSession, location = { hostname: "example.test", search: "" }) {
  const app = { className: "", innerHTML: "" };
  const listeners = new Map();
  const client = { auth: { getSession } };
  let clientCreations = 0;
  const context = createContext({
    document: {
      querySelector: (selector) => selector === "#app" ? app : {
        addEventListener: (event, callback) => listeners.set(`${selector}:${event}`, callback)
      }
    },
    window: { location },
    URLSearchParams,
    setTimeout: (callback, ms) => setTimeout(callback, Math.min(ms, 20)),
    clearTimeout,
    console
  });
  const sdk = new SyntheticModule(["createClient"], function () {
    this.setExport("createClient", () => { clientCreations++; return client; });
  }, { context });
  const modules = new Map();
  for (const file of ["startup.js", "data.js", "workflow.js", "workspace-views.js"]) {
    const source = file === "startup.js" ? startupSource : await readFile(new URL(`../src/${file}`, import.meta.url), "utf8");
    modules.set(`./${file}`, new SourceTextModule(source, { context }));
  }
  const main = new SourceTextModule(mainSource, {
    context,
    initializeImportMeta: (meta) => { meta.env = {}; }
  });
  await main.link((specifier) => specifier === "@supabase/supabase-js" ? sdk : modules.get(specifier));
  await main.evaluate();
  return { app, client, listeners, start: main.namespace.startApp, clientCreations };
}

test("a visitor without a saved session sees the login form", async () => {
  const harness = await appWithSession(async () => ({ data: { session: null }, error: null }));
  await harness.start();
  assert.match(harness.app.innerHTML, /id="auth-form"/);
});

test("session refresh errors show a retry screen and escape error text", async () => {
  const harness = await appWithSession(async () => ({
    data: { session: null }, error: new Error("<server unavailable>")
  }));
  await harness.start();
  assert.match(harness.app.innerHTML, /data-retry-load/);
  assert.match(harness.app.innerHTML, /&lt;server unavailable&gt;/);
  assert.doesNotMatch(harness.app.innerHTML, /id="auth-form"/);
});

test("a rejected session lookup shows an error instead of leaving a blank screen", async () => {
  const harness = await appWithSession(async () => { throw new Error("Failed to fetch"); });
  await harness.start();
  assert.match(harness.app.innerHTML, /Failed to fetch/);
  assert.match(harness.app.innerHTML, /data-retry-load/);
});

test("a stalled refresh times out, and retry works when the server recovers", async () => {
  const harness = await appWithSession(() => new Promise(() => {}));
  const starting = harness.start();
  assert.match(harness.app.innerHTML, /로그인 상태를 확인하고 있습니다/);
  await starting;
  assert.match(harness.app.innerHTML, /로그인 서버에 연결할 수 없습니다/);
  harness.client.auth.getSession = async () => ({ data: { session: null }, error: null });
  await harness.listeners.get("[data-retry-load]:click")();
  assert.match(harness.app.innerHTML, /id="auth-form"/);
});

test("the HTML has visible fallback content before JavaScript loads", async () => {
  const html = await readFile(new URL("../index.html", import.meta.url), "utf8");
  assert.match(html, /화면을 불러오는 중입니다/);
  assert.match(html, /<noscript>/);
});

test("localhost sample preview never creates a production Supabase client", async () => {
  const harness = await appWithSession(() => { throw new Error("Must not call auth"); }, { hostname: "127.0.0.1", search: "?preview=1" });
  assert.equal(harness.clientCreations, 0);
  const remote = await appWithSession(async () => ({ data: { session: null } }), { hostname: "hepha02.github.io", search: "?preview=1" });
  assert.equal(remote.clientCreations, 1);
});
