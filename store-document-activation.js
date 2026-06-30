(() => {
  if (window.__hakaStoreDocumentActivation) return;
  window.__hakaStoreDocumentActivation = true;

  const SUPABASE_URL = "https://yqemtsbdnypgmkuyncxh.supabase.co";
  const API_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlxZW10c2JkbnlwZ21rdXluY3hoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODAyNjYwMTUsImV4cCI6MjA5NTg0MjAxNX0.gwgdCncqRKKgC8ebj7qIdT-vA4J-wOVd2O9DSa7xEOs";
  const QUOTE_KEY = "haka_store_document_quotes_v1";

  let stores = [];
  let quotes = {};
  let loading = false;

  const money = (value) => new Intl.NumberFormat("ko-KR", { style: "currency", currency: "KRW", maximumFractionDigits: 0 }).format(Number(value || 0));
  const num = (value) => Number(String(value || "").replace(/[^\d.-]/g, "")) || 0;
  const clean = (value) => String(value || "").replace(/\s+/g, " ").trim();
  const esc = (value) => String(value ?? "").replace(/[&<>"]/g, (char) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" })[char]);

  function readLocalQuotes() {
    try { return JSON.parse(localStorage.getItem(QUOTE_KEY) || "{}"); } catch { return {}; }
  }

  function writeLocalQuote(storeName, quote) {
    const data = readLocalQuotes();
    data[storeName] = quote;
    localStorage.setItem(QUOTE_KEY, JSON.stringify(data));
  }

  async function api(path, options = {}) {
    const response = await fetch(`${SUPABASE_URL}${path}`, {
      ...options,
      headers: {
        apikey: API_KEY,
        Authorization: `Bearer ${API_KEY}`,
        "Content-Type": "application/json",
        Prefer: "return=representation",
        ...(options.headers || {})
      }
    });
    if (!response.ok) throw new Error(await response.text());
    if (response.status === 204) return null;
    return response.json();
  }

  async function loadRemoteData() {
    if (loading) return;
    loading = true;
    try {
      const [storeRows, quoteRows] = await Promise.all([
        api("/rest/v1/stores?select=*&order=id.asc"),
        api("/rest/v1/store_quotes?select=*").catch(() => [])
      ]);
      stores = Array.isArray(storeRows) ? storeRows : [];
      quotes = Object.fromEntries((Array.isArray(quoteRows) ? quoteRows : []).map((quote) => [quote.store_name, quote]));
      Object.assign(quotes, readLocalQuotes());
    } catch {
      Object.assign(quotes, readLocalQuotes());
    } finally {
      loading = false;
    }
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

  function isDocumentTarget(storeName) {
    const store = storeByName(storeName);
    if (!store || clean(store.status) !== "완료") return false;
    return Boolean(store.document_required) || isAfterApgujeong(storeName);
  }

  function baseCost(storeName) {
    const store = storeByName(storeName) || {};
    return num(store.spent) || num(store.budget) || 0;
  }

  function computeQuote(storeName, marginRate, status = "문서 생성 대상") {
    const directCost = baseCost(storeName);
    const fixtureCost = 0;
    const costTotal = directCost + fixtureCost;
    const supplyAmount = Math.round(costTotal * (1 + Number(marginRate || 35) / 100));
    const vatAmount = Math.round(supplyAmount * 0.1);
    const totalAmount = supplyAmount + vatAmount;
    return { store_name: storeName, quote_status: status, margin_rate: Number(marginRate || 35), direct_cost: directCost, fixture_cost: fixtureCost, cost_total: costTotal, supply_amount: supplyAmount, vat_amount: vatAmount, total_amount: totalAmount, updated_at: new Date().toISOString() };
  }

  function rowStoreName(row) {
    return clean(row?.children?.[0]?.textContent);
  }

  function rowMargin(row) {
    return Number(row?.querySelector("[data-margin-rate]")?.value || 35);
  }

  function setCell(row, index, value) {
    const cell = row?.children?.[index];
    if (!cell) return;
    const next = money(value);
    if (cell.textContent !== next) cell.textContent = next;
    cell.classList.add("money");
  }

  function patchRow(row) {
    const storeName = rowStoreName(row);
    if (!isDocumentTarget(storeName)) return;
    const quote = quotes[storeName] || computeQuote(storeName, rowMargin(row));
    const signature = JSON.stringify([storeName, quote.quote_status, quote.margin_rate, quote.cost_total, quote.total_amount]);
    if (row.dataset.storeDocSignature === signature) return;
    row.dataset.storeDocSignature = signature;

    const statusCell = row.children?.[1];
    if (statusCell) statusCell.innerHTML = `<span class="badge blue">${esc(quote.quote_status || "문서 생성 대상")}</span>`;
    setCell(row, 2, quote.direct_cost || baseCost(storeName));
    setCell(row, 3, quote.fixture_cost || 0);
    setCell(row, 4, quote.cost_total || baseCost(storeName));
    setCell(row, 6, quote.supply_amount);
    setCell(row, 7, quote.vat_amount);
    setCell(row, 8, quote.total_amount);
    const saveButton = row.querySelector("[data-quote-finalize]");
    const completeButton = row.querySelector("[data-contract-complete]");
    if (saveButton) saveButton.textContent = "마진 저장";
    if (completeButton) completeButton.textContent = "완료/문서 활성화";
    row.querySelectorAll("[data-document-view]").forEach((button) => {
      button.disabled = false;
      button.classList.add("document-ready-button");
    });
  }

  function tableHasStore(storeName) {
    return Array.from(document.querySelectorAll("table tbody tr")).some((row) => rowStoreName(row) === storeName);
  }

  function addMissingCompletedRows() {
    const pageText = clean(document.querySelector(".topbar h1")?.textContent || document.body.innerText.slice(0, 200));
    if (!pageText.includes("매장별") && !document.body.innerText.includes("완료 매장")) return;
    const tbody = document.querySelector("table tbody");
    if (!tbody) return;

    completedStores().filter((store) => isDocumentTarget(store.name)).forEach((store) => {
      if (tableHasStore(store.name)) return;
      const quote = quotes[store.name] || computeQuote(store.name, 35);
      const row = document.createElement("tr");
      row.innerHTML = `
        <td>${esc(store.name)}</td>
        <td><span class="badge blue">${esc(quote.quote_status || "문서 생성 대상")}</span></td>
        <td class="money">${money(quote.direct_cost || baseCost(store.name))}</td>
        <td class="money">${money(quote.fixture_cost || 0)}</td>
        <td class="money">${money(quote.cost_total || baseCost(store.name))}</td>
        <td><input class="inline-input" data-margin-rate="${esc(store.name)}" inputmode="decimal" value="${esc(quote.margin_rate || 35)}" /></td>
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

  function patchStoreManagement() {
    addMissingCompletedRows();
    document.querySelectorAll("table tbody tr").forEach(patchRow);
  }

  async function saveQuote(storeName, status, marginRate) {
    const quote = computeQuote(storeName, marginRate, status);
    if (status === "견적 확정") quote.quote_confirmed_at = new Date().toISOString();
    if (status === "계약 완료") {
      quote.quote_confirmed_at = quotes[storeName]?.quote_confirmed_at || new Date().toISOString();
      quote.contract_completed_at = new Date().toISOString();
    }
    quotes[storeName] = quote;
    writeLocalQuote(storeName, quote);
    await api("/rest/v1/store_quotes?on_conflict=store_name", { method: "POST", headers: { Prefer: "resolution=merge-duplicates,return=representation" }, body: JSON.stringify(quote) }).catch(() => null);
    return quote;
  }

  function renderDocument(storeName, type) {
    const quote = quotes[storeName] || computeQuote(storeName, 35, "문서 생성 대상");
    const isContract = type.includes("계약");
    const area = storeByName(storeName)?.area || "-";
    const lineSupply = Math.round((quote.cost_total || baseCost(storeName)) * (1 + Number(quote.margin_rate || 35) / 100));
    const lineVat = Math.round(lineSupply * 0.1);
    const lineTotal = lineSupply + lineVat;
    const overlay = document.createElement("div");
    overlay.className = "haka-document-overlay";
    overlay.innerHTML = `
      <section class="haka-document-sheet">
        <div class="row-actions document-actions"><button data-close-doc>닫기</button><button data-print-doc>인쇄</button></div>
        <div class="document-title"><span>HAKA Construction</span><h1>${isContract ? "공사 계약서" : "공사 견적서"}</h1><p>${new Date().toISOString().slice(0, 10)}</p></div>
        <div class="document-meta"><div><span>매장명</span><strong>${esc(storeName)}</strong></div><div><span>평수</span><strong>${esc(area)}</strong></div><div><span>상태</span><strong>${esc(quote.quote_status || "문서 생성 대상")}</strong></div><div><span>마진율</span><strong>${esc(quote.margin_rate || 35)}%</strong></div></div>
        ${isContract ? `<div class="contract-body"><p>본 계약은 ${esc(storeName)} 공사와 관련하여 기존 완료 매장 엑셀 금액과 매장별 마진율을 기준으로 산정한 최종 공사금액을 계약 기준으로 한다.</p><p>최종 계약금액은 부가세 포함 ${money(quote.total_amount || lineTotal)}이다.</p></div>` : ""}
        <div class="table-wrap"><table><thead><tr><th>No</th><th>항목</th><th>원가</th><th>마진 반영 공급가</th><th>부가세</th><th>합계</th></tr></thead><tbody><tr><td>1</td><td>기존 공사 완료 금액</td><td class="money">${money(quote.cost_total || baseCost(storeName))}</td><td class="money">${money(lineSupply)}</td><td class="money">${money(lineVat)}</td><td class="money">${money(lineTotal)}</td></tr></tbody></table></div>
        <div class="document-total"><span>원가 합계 ${money(quote.cost_total || baseCost(storeName))}</span><span>공급가 ${money(quote.supply_amount || lineSupply)}</span><span>부가세 ${money(quote.vat_amount || lineVat)}</span><strong>최종 금액 ${money(quote.total_amount || lineTotal)}</strong></div>
        <div class="signature-grid"><div><span>발주자</span><strong>하카코리아</strong></div><div><span>시공/관리</span><strong>HAKA Construction</strong></div></div>
      </section>`;
    document.body.appendChild(overlay);
  }

  const style = document.createElement("style");
  style.textContent = `
    .document-ready-button { border-color: #237c63 !important; color: #237c63 !important; font-weight: 900 !important; }
    .haka-document-overlay { position: fixed; inset: 0; z-index: 9999; overflow: auto; padding: 24px; background: rgba(15, 23, 42, .42); }
    .haka-document-sheet { width: min(920px, 100%); margin: 0 auto; padding: 28px; border-radius: 8px; background: #fff; color: #061326; box-shadow: 0 24px 80px rgba(0,0,0,.22); }
    .document-actions { justify-content: flex-end; margin-bottom: 14px; }
    .document-actions button { min-height: 38px; padding: 0 14px; border-radius: 8px; border: 1px solid #d5dde7; background: #fff; font-weight: 900; }
    .document-actions button:last-child { border-color: #237c63; background: #237c63; color: #fff; }
    @media print { body > *:not(.haka-document-overlay) { display: none !important; } .haka-document-overlay { position: static; padding: 0; background: #fff; } .haka-document-sheet { box-shadow: none; width: 100%; } .document-actions { display: none !important; } }
  `;
  document.head.appendChild(style);

  document.addEventListener("input", (event) => {
    const input = event.target.closest?.("[data-margin-rate]");
    if (!input) return;
    const row = input.closest("tr");
    const storeName = rowStoreName(row);
    if (!isDocumentTarget(storeName)) return;
    quotes[storeName] = computeQuote(storeName, input.value, quotes[storeName]?.quote_status || "문서 생성 대상");
    row.dataset.storeDocSignature = "";
    patchRow(row);
  }, true);

  document.addEventListener("click", async (event) => {
    const quoteButton = event.target.closest?.("[data-quote-finalize], [data-contract-complete]");
    if (quoteButton) {
      const storeName = quoteButton.dataset.quoteFinalize || quoteButton.dataset.contractComplete;
      if (isDocumentTarget(storeName)) {
        event.preventDefault();
        event.stopPropagation();
        event.stopImmediatePropagation();
        const margin = rowMargin(quoteButton.closest("tr"));
        const status = quoteButton.dataset.contractComplete ? "계약 완료" : "견적 확정";
        await saveQuote(storeName, status, margin);
        patchStoreManagement();
        alert(`${storeName} ${status === "계약 완료" ? "문서 버튼이 활성화되었습니다" : "마진율이 저장되었습니다"}.`);
      }
      return;
    }

    const docButton = event.target.closest?.("[data-document-view][data-document-store]");
    if (docButton && isDocumentTarget(docButton.dataset.documentStore)) {
      event.preventDefault();
      event.stopPropagation();
      event.stopImmediatePropagation();
      const storeName = docButton.dataset.documentStore;
      if (!quotes[storeName]) await saveQuote(storeName, "문서 생성 대상", rowMargin(docButton.closest("tr")));
      renderDocument(storeName, docButton.dataset.documentView || "견적서 생성");
      return;
    }

    if (event.target.closest?.("[data-close-doc]")) event.target.closest(".haka-document-overlay")?.remove();
    if (event.target.closest?.("[data-print-doc]")) window.print();
  }, true);

  async function run() {
    await loadRemoteData();
    patchStoreManagement();
  }

  const observer = new MutationObserver(() => {
    clearTimeout(window.__hakaStoreDocumentActivationTimer);
    window.__hakaStoreDocumentActivationTimer = setTimeout(run, 350);
  });
  observer.observe(document.documentElement, { childList: true, subtree: true });
  run();
})();
