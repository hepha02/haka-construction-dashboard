(() => {
  if (window.__hakaStoreDocumentAuthFix) return;
  window.__hakaStoreDocumentAuthFix = true;

  const SUPABASE_URL = "https://yqemtsbdnypgmkuyncxh.supabase.co";
  const ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlxZW10c2JkbnlwZ21rdXluY3hoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODAyNjYwMTUsImV4cCI6MjA5NTg0MjAxNX0.gwgdCncqRKKgC8ebj7qIdT-vA4J-wOVd2O9DSa7xEOs";
  const QUOTE_KEY = "haka_store_document_quotes_v2";

  let stores = [];
  let quotes = {};
  let loadPromise = null;

  const clean = (value) => String(value || "").replace(/\s+/g, " ").trim();
  const number = (value) => Number(String(value || "").replace(/[^\d.-]/g, "")) || 0;
  const money = (value) => new Intl.NumberFormat("ko-KR", { style: "currency", currency: "KRW", maximumFractionDigits: 0 }).format(Number(value || 0));
  const esc = (value) => String(value ?? "").replace(/[&<>"]/g, (char) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" })[char]);

  function localQuotes() {
    try { return JSON.parse(localStorage.getItem(QUOTE_KEY) || "{}"); } catch { return {}; }
  }

  function saveLocalQuote(storeName, quote) {
    const data = localQuotes();
    data[storeName] = quote;
    localStorage.setItem(QUOTE_KEY, JSON.stringify(data));
  }

  function accessToken() {
    for (const key of Object.keys(localStorage)) {
      const value = localStorage.getItem(key) || "";
      if (!value.includes("access_token")) continue;
      try {
        const parsed = JSON.parse(value);
        const token = parsed?.access_token || parsed?.currentSession?.access_token || parsed?.session?.access_token;
        if (token) return token;
      } catch {}
    }
    return "";
  }

  async function api(path, options = {}) {
    const token = accessToken();
    const response = await fetch(`${SUPABASE_URL}${path}`, {
      ...options,
      headers: {
        apikey: ANON_KEY,
        Authorization: `Bearer ${token || ANON_KEY}`,
        "Content-Type": "application/json",
        Prefer: "return=representation",
        ...(options.headers || {})
      }
    });
    if (!response.ok) throw new Error(await response.text());
    if (response.status === 204) return null;
    return response.json();
  }

  function completedStores() {
    return stores.filter((store) => clean(store.status) === "완료");
  }

  function storeByName(storeName) {
    return stores.find((store) => clean(store.name) === clean(storeName)) || null;
  }

  function isAfterApgujeong(storeName) {
    const list = completedStores();
    const startIndex = list.findIndex((store) => clean(store.name).includes("압구정"));
    const targetIndex = list.findIndex((store) => clean(store.name) === clean(storeName));
    return startIndex >= 0 && targetIndex >= startIndex;
  }

  function isTarget(storeName) {
    const store = storeByName(storeName);
    if (!store || clean(store.status) !== "완료") return false;
    return Boolean(store.document_required) || isAfterApgujeong(storeName);
  }

  function baseCost(storeName) {
    const store = storeByName(storeName) || {};
    return number(store.spent) || number(store.budget) || 0;
  }

  function quoteFor(storeName, marginRate = 35, status = "문서 생성 대상") {
    const saved = quotes[storeName];
    if (saved && Number(saved.margin_rate) === Number(marginRate)) return saved;
    const cost = baseCost(storeName);
    const supply = Math.round(cost * (1 + Number(marginRate || 35) / 100));
    const vat = Math.round(supply * 0.1);
    return {
      store_name: storeName,
      quote_status: status,
      margin_rate: Number(marginRate || 35),
      direct_cost: cost,
      fixture_cost: 0,
      cost_total: cost,
      supply_amount: supply,
      vat_amount: vat,
      total_amount: supply + vat,
      updated_at: new Date().toISOString()
    };
  }

  async function loadData() {
    if (loadPromise) return loadPromise;
    loadPromise = (async () => {
      try {
        const [storeRows, quoteRows] = await Promise.all([
          api("/rest/v1/stores?select=*&order=id.asc"),
          api("/rest/v1/store_quotes?select=*").catch(() => [])
        ]);
        stores = Array.isArray(storeRows) ? storeRows : [];
        quotes = Object.fromEntries((Array.isArray(quoteRows) ? quoteRows : []).map((quote) => [quote.store_name, quote]));
        Object.assign(quotes, localQuotes());
      } catch (error) {
        stores = [];
        Object.assign(quotes, localQuotes());
      } finally {
        loadPromise = null;
      }
    })();
    return loadPromise;
  }

  function rowStore(row) {
    return clean(row?.children?.[0]?.textContent);
  }

  function rowMargin(row) {
    return Number(row?.querySelector("[data-margin-rate]")?.value || 35);
  }

  function setMoney(row, index, value) {
    const cell = row?.children?.[index];
    if (!cell) return;
    cell.textContent = money(value);
    cell.classList.add("money");
  }

  function patchExistingRow(row) {
    const storeName = rowStore(row);
    if (!isTarget(storeName)) return;
    const margin = rowMargin(row);
    const quote = quoteFor(storeName, margin);
    row.dataset.storeDocReady = "true";
    const statusCell = row.children?.[1];
    if (statusCell) statusCell.innerHTML = `<span class="badge blue">${esc(quote.quote_status || "문서 생성 대상")}</span>`;
    setMoney(row, 2, quote.direct_cost);
    setMoney(row, 3, quote.fixture_cost);
    setMoney(row, 4, quote.cost_total);
    setMoney(row, 6, quote.supply_amount);
    setMoney(row, 7, quote.vat_amount);
    setMoney(row, 8, quote.total_amount);
    const saveButton = row.querySelector("[data-quote-finalize]");
    const completeButton = row.querySelector("[data-contract-complete]");
    if (saveButton) saveButton.textContent = "마진 저장";
    if (completeButton) completeButton.textContent = "완료/문서 활성화";
    row.querySelectorAll("[data-document-view]").forEach((button) => {
      button.disabled = false;
      button.classList.add("store-doc-ready-button");
    });
  }

  function tableHasStore(storeName) {
    return Array.from(document.querySelectorAll("table tbody tr")).some((row) => rowStore(row) === clean(storeName));
  }

  function currentPageIsStoreManagement() {
    const text = clean(document.body.innerText.slice(0, 1200));
    return text.includes("매장별 공사 관리") || text.includes("매장별 정산") || text.includes("완료 매장");
  }

  function addTargetRowsIfMissing() {
    if (!currentPageIsStoreManagement()) return;
    const tbody = document.querySelector("table tbody");
    if (!tbody) return;
    completedStores().filter((store) => isTarget(store.name)).forEach((store) => {
      if (tableHasStore(store.name)) return;
      const quote = quoteFor(store.name, 35);
      const row = document.createElement("tr");
      row.dataset.storeDocReady = "true";
      row.innerHTML = `
        <td>${esc(store.name)}</td>
        <td><span class="badge blue">${esc(quote.quote_status)}</span></td>
        <td class="money">${money(quote.direct_cost)}</td>
        <td class="money">${money(quote.fixture_cost)}</td>
        <td class="money">${money(quote.cost_total)}</td>
        <td><input class="inline-input" data-margin-rate="${esc(store.name)}" inputmode="decimal" value="${esc(quote.margin_rate)}" /></td>
        <td class="money">${money(quote.supply_amount)}</td>
        <td class="money">${money(quote.vat_amount)}</td>
        <td class="money">${money(quote.total_amount)}</td>
        <td><div class="row-actions">
          <button data-quote-finalize="${esc(store.name)}">마진 저장</button>
          <button data-contract-complete="${esc(store.name)}">완료/문서 활성화</button>
          <button data-document-view="견적서 생성" data-document-store="${esc(store.name)}">견적서</button>
          <button data-document-view="계약서 생성" data-document-store="${esc(store.name)}">계약서</button>
        </div></td>`;
      tbody.appendChild(row);
    });
  }

  async function saveQuote(storeName, status, marginRate) {
    const quote = quoteFor(storeName, marginRate, status);
    if (status === "견적 확정") quote.quote_confirmed_at = new Date().toISOString();
    if (status === "계약 완료") {
      quote.quote_confirmed_at = quotes[storeName]?.quote_confirmed_at || new Date().toISOString();
      quote.contract_completed_at = new Date().toISOString();
    }
    quotes[storeName] = quote;
    saveLocalQuote(storeName, quote);
    await api("/rest/v1/store_quotes?on_conflict=store_name", {
      method: "POST",
      headers: { Prefer: "resolution=merge-duplicates,return=representation" },
      body: JSON.stringify(quote)
    }).catch(() => null);
    return quote;
  }

  function showDocument(storeName, type) {
    const margin = Number(quotes[storeName]?.margin_rate || 35);
    const quote = quotes[storeName] || quoteFor(storeName, margin);
    const isContract = String(type || "").includes("계약");
    const area = storeByName(storeName)?.area || "-";
    const overlay = document.createElement("div");
    overlay.className = "store-doc-overlay";
    overlay.innerHTML = `
      <section class="store-doc-sheet">
        <div class="row-actions store-doc-actions"><button data-close-store-doc>닫기</button><button data-print-store-doc>인쇄</button></div>
        <div class="document-title"><span>HAKA Construction</span><h1>${isContract ? "공사 계약서" : "공사 견적서"}</h1><p>${new Date().toISOString().slice(0, 10)}</p></div>
        <div class="document-meta"><div><span>매장명</span><strong>${esc(storeName)}</strong></div><div><span>평수</span><strong>${esc(area)}</strong></div><div><span>상태</span><strong>${esc(quote.quote_status)}</strong></div><div><span>마진율</span><strong>${esc(quote.margin_rate)}%</strong></div></div>
        ${isContract ? `<div class="contract-body"><p>본 계약은 ${esc(storeName)} 공사와 관련하여 완료 매장 엑셀 금액과 매장별 마진율을 기준으로 산정한 최종 공사금액을 계약 기준으로 한다.</p><p>최종 계약금액은 부가세 포함 ${money(quote.total_amount)}이다.</p></div>` : ""}
        <div class="table-wrap"><table><thead><tr><th>No</th><th>항목</th><th>원가</th><th>마진 반영 공급가</th><th>부가세</th><th>합계</th></tr></thead><tbody><tr><td>1</td><td>기존 공사 완료 금액</td><td class="money">${money(quote.cost_total)}</td><td class="money">${money(quote.supply_amount)}</td><td class="money">${money(quote.vat_amount)}</td><td class="money">${money(quote.total_amount)}</td></tr></tbody></table></div>
        <div class="document-total"><span>원가 합계 ${money(quote.cost_total)}</span><span>공급가 ${money(quote.supply_amount)}</span><span>부가세 ${money(quote.vat_amount)}</span><strong>최종 금액 ${money(quote.total_amount)}</strong></div>
        <div class="signature-grid"><div><span>발주자</span><strong>하카코리아</strong></div><div><span>시공/관리</span><strong>HAKA Construction</strong></div></div>
      </section>`;
    document.body.appendChild(overlay);
  }

  async function patch() {
    await loadData();
    addTargetRowsIfMissing();
    document.querySelectorAll("table tbody tr").forEach(patchExistingRow);
    const doneTab = Array.from(document.querySelectorAll("button")).find((button) => clean(button.textContent).includes("완료 매장"));
    if (doneTab) doneTab.textContent = `완료 매장 ${completedStores().filter((store) => isTarget(store.name)).length}건`;
  }

  const style = document.createElement("style");
  style.textContent = `
    .store-doc-ready-button { border-color: #237c63 !important; color: #237c63 !important; font-weight: 900 !important; }
    .store-doc-overlay { position: fixed; inset: 0; z-index: 10000; overflow: auto; padding: 24px; background: rgba(15, 23, 42, .42); }
    .store-doc-sheet { width: min(920px, 100%); margin: 0 auto; padding: 28px; border-radius: 8px; background: #fff; color: #061326; box-shadow: 0 24px 80px rgba(0,0,0,.22); }
    .store-doc-actions { justify-content: flex-end; margin-bottom: 14px; }
    .store-doc-actions button { min-height: 38px; padding: 0 14px; border-radius: 8px; border: 1px solid #d5dde7; background: #fff; font-weight: 900; }
    .store-doc-actions button:last-child { border-color: #237c63; background: #237c63; color: #fff; }
    @media print { body > *:not(.store-doc-overlay) { display: none !important; } .store-doc-overlay { position: static; padding: 0; background: #fff; } .store-doc-sheet { box-shadow: none; width: 100%; } .store-doc-actions { display: none !important; } }
  `;
  document.head.appendChild(style);

  document.addEventListener("input", (event) => {
    const input = event.target.closest?.("[data-margin-rate]");
    if (!input) return;
    const row = input.closest("tr");
    const storeName = rowStore(row);
    if (!isTarget(storeName)) return;
    quotes[storeName] = quoteFor(storeName, input.value, quotes[storeName]?.quote_status || "문서 생성 대상");
    patchExistingRow(row);
  }, true);

  document.addEventListener("click", async (event) => {
    const actionButton = event.target.closest?.("[data-quote-finalize], [data-contract-complete]");
    if (actionButton) {
      const storeName = actionButton.dataset.quoteFinalize || actionButton.dataset.contractComplete;
      if (isTarget(storeName)) {
        event.preventDefault();
        event.stopPropagation();
        event.stopImmediatePropagation();
        const status = actionButton.dataset.contractComplete ? "계약 완료" : "견적 확정";
        await saveQuote(storeName, status, rowMargin(actionButton.closest("tr")));
        patchExistingRow(actionButton.closest("tr"));
        alert(`${storeName} ${status === "계약 완료" ? "문서 버튼이 활성화되었습니다" : "마진율이 저장되었습니다"}.`);
      }
      return;
    }

    const docButton = event.target.closest?.("[data-document-view][data-document-store]");
    if (docButton && isTarget(docButton.dataset.documentStore)) {
      event.preventDefault();
      event.stopPropagation();
      event.stopImmediatePropagation();
      const storeName = docButton.dataset.documentStore;
      if (!quotes[storeName]) await saveQuote(storeName, "문서 생성 대상", rowMargin(docButton.closest("tr")));
      showDocument(storeName, docButton.dataset.documentView);
      return;
    }

    if (event.target.closest?.("[data-close-store-doc]")) event.target.closest(".store-doc-overlay")?.remove();
    if (event.target.closest?.("[data-print-store-doc]")) window.print();
  }, true);

  const observer = new MutationObserver(() => {
    clearTimeout(window.__hakaStoreDocAuthTimer);
    window.__hakaStoreDocAuthTimer = setTimeout(patch, 300);
  });
  observer.observe(document.documentElement, { childList: true, subtree: true });
  patch();
})();
