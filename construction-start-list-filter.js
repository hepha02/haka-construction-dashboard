(() => {
  const VERSION = "construction-start-list-filter-2";
  if (window.__hakaConstructionStartListFilterV2) return;
  window.__hakaConstructionStartListFilterV2 = true;

  const SUPABASE_URL = "https://yqemtsbdnypgmkuyncxh.supabase.co";
  const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlxZW10c2JkbnlwZ21rdXluY3hoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODAyNjYwMTUsImV4cCI6MjA5NTg0MjAxNX0.gwgdCncqRKKgC8ebj7qIdT-vA4J-wOVd2O9DSa7xEOs";
  const clean = (value) => String(value ?? "").replace(/\s+/g, " ").trim();
  const key = (value) => clean(value).replace(/\s/g, "").toLowerCase();

  let completedStoreKeys = new Set();
  let loading = null;

  function getClient() {
    const factory = window.supabase?.createClient || window.createClient;
    if (!factory) return null;
    return factory(SUPABASE_URL, SUPABASE_ANON_KEY);
  }

  async function loadCompletedStores() {
    if (loading) return loading;
    loading = (async () => {
      const client = getClient();
      if (!client) return completedStoreKeys;

      const next = new Set();
      const [stores, quotes] = await Promise.all([
        client.from("stores").select("name,status,document_required"),
        client.from("store_quotes").select("store_name,quote_status")
      ]);

      (stores.data || []).forEach((store) => {
        const status = clean(store.status);
        if (status.includes("완료")) next.add(key(store.name));
      });

      (quotes.data || []).forEach((quote) => {
        const status = clean(quote.quote_status);
        if (status.includes("계약 완료") || status.includes("완료")) next.add(key(quote.store_name));
      });

      completedStoreKeys = next;
      return completedStoreKeys;
    })().catch((error) => {
      console.warn(`[HAKA] ${VERSION} completed-store load failed`, error);
      return completedStoreKeys;
    });
    return loading;
  }

  function findConstructionStartPanel() {
    const heading = [...document.querySelectorAll("h1, h2, h3")]
      .find((node) => clean(node.textContent).includes("공사 시작 접수 목록"));
    return heading?.closest(".panel, section, article, div") || null;
  }

  function applyFilter() {
    const panel = findConstructionStartPanel();
    if (!panel) return;
    const table = panel.querySelector("table");
    if (!table) return;

    const rows = [...table.querySelectorAll("tbody tr")];
    let visible = 0;
    let hidden = 0;

    rows.forEach((row) => {
      const storeName = clean(row.querySelector("td")?.textContent || "");
      const shouldHide = Boolean(storeName && completedStoreKeys.has(key(storeName)));
      row.style.display = shouldHide ? "none" : "";
      row.dataset.constructionStartHidden = shouldHide ? "completed-store" : "";
      if (shouldHide) hidden += 1;
      else visible += 1;
    });

    const countButton = [...panel.querySelectorAll("button")]
      .find((button) => /\d+건\s*접수/.test(clean(button.textContent)) || clean(button.textContent).includes("건 접수"));
    if (countButton) countButton.textContent = `${visible}건 접수`;

    let notice = panel.querySelector("[data-construction-start-filter-notice]");
    if (hidden > 0) {
      if (!notice) {
        notice = document.createElement("div");
        notice.dataset.constructionStartFilterNotice = "true";
        notice.className = "notice";
        table.parentElement?.insertBefore(notice, table);
      }
      notice.textContent = `기존 완료 매장 ${hidden}건은 공사 시작 접수 목록에서 제외했습니다.`;
    } else if (notice) {
      notice.remove();
    }
  }

  async function refresh() {
    await loadCompletedStores();
    applyFilter();
  }

  const observer = new MutationObserver(() => {
    window.clearTimeout(window.__hakaConstructionStartFilterTimer);
    window.__hakaConstructionStartFilterTimer = window.setTimeout(applyFilter, 80);
  });

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", refresh, { once: true });
  } else {
    refresh();
  }
  observer.observe(document.documentElement, { childList: true, subtree: true });
  window.addEventListener("focus", refresh);

  console.info(`[HAKA] ${VERSION} loaded`);
})();
