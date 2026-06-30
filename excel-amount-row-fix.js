(() => {
  if (window.__hakaExcelAmountRowFix) return;
  window.__hakaExcelAmountRowFix = true;

  const EXCEL_AMOUNTS = [51108113,41335410,36641020,25775380,31562030,41692300,36539790,35532275,31569075,34099100,39266520,47087760,36139360,34392785,41756430,43874660,36625590,38084420,38320020,52246970,46768680,37551180,49024700,52300090,43859420,62765741,65113075,112688015,75529510,68546225,52267585,53332070,48789370,42325800,42463532,47679899,53063319,72664609,50834689,53358850,37351050,35864450,55031910,43134964,32517250,21798780,46460560,61998980,37670415,52101580,50790249,36711980,31386300,58603340,44865010,33956395,44737135,26936894,36878295,32498150,41430840,34994170,45957520,38378050,23122540,65595190,72772185,44690920,45297770,69603095,51835045,46617350,35213575,52398595,70029020,46337625,38158425,53676660,77956295,57716950,68512200,57437990,46441050,48721080,60547565,36537600,33811910,31603970,46425040,38053840,33767350,39411690,70835031,34729280,42150411,34457830,48526160,44366780,36163270,34207360,28533380,41627650,38148790,32625980,34743410,71495340,37302200,27495350,49363670,52225310,57514576,37469470,48194016,59562607,45836437,44455190,36044720,85720400,18486740,960000,3644000,44085820,38245246,5910000,51164106,40626020,63630110,8890100,51685000,55640826,44476436,40450066,35690660,40285030,52064668,52708755,58607418,45484028,38078460,46901830];
  const DOC_START_INDEX = 27;
  const QUOTE_KEY = "haka_excel_row_quotes_v1";

  const money = (value) => new Intl.NumberFormat("ko-KR", { style: "currency", currency: "KRW", maximumFractionDigits: 0 }).format(Number(value || 0));
  const clean = (value) => String(value || "").replace(/\s+/g, " ").trim();
  const esc = (value) => String(value ?? "").replace(/[&<>"]/g, (char) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" })[char]);

  function quotes() {
    try { return JSON.parse(localStorage.getItem(QUOTE_KEY) || "{}"); } catch { return {}; }
  }

  function saveQuote(storeName, quote) {
    const data = quotes();
    data[storeName] = quote;
    localStorage.setItem(QUOTE_KEY, JSON.stringify(data));
  }

  function quoteFor(row, status) {
    const storeName = clean(row.children?.[0]?.textContent);
    const margin = Number(row.querySelector("[data-margin-rate]")?.value || 35);
    const rowIndex = Number(row.dataset.excelRowIndex || -1);
    const amount = EXCEL_AMOUNTS[rowIndex] || 0;
    const supply = Math.round(amount * (1 + margin / 100));
    const vat = Math.round(supply * 0.1);
    const saved = quotes()[storeName] || {};
    return { ...saved, storeName, status: status || saved.status || (rowIndex >= DOC_START_INDEX ? "문서 생성 대상" : "출력 완료"), margin, amount, supply, vat, total: supply + vat };
  }

  function setMoney(row, index, value) {
    const cell = row.children?.[index];
    if (!cell) return;
    cell.textContent = money(value);
    cell.classList.add("money");
  }

  function patchRow(row, index) {
    if (!row.children || row.children.length < 9) return;
    const amount = EXCEL_AMOUNTS[index];
    if (!amount) return;
    row.dataset.excelRowIndex = String(index);
    const q = quoteFor(row);
    const statusCell = row.children[1];
    if (statusCell) statusCell.innerHTML = index >= DOC_START_INDEX ? '<span class="badge blue">문서 생성 대상</span>' : '<span class="badge gray">기존 출력 완료</span>';
    setMoney(row, 2, q.amount);
    setMoney(row, 3, 0);
    setMoney(row, 4, q.amount);
    setMoney(row, 6, q.supply);
    setMoney(row, 7, q.vat);
    setMoney(row, 8, q.total);
    const buttons = row.querySelectorAll("button");
    buttons.forEach((button) => {
      const text = clean(button.textContent);
      if (text.includes("견적 확정")) button.textContent = index >= DOC_START_INDEX ? "마진 저장" : "출력 완료";
      if (text.includes("완료/문서")) button.textContent = index >= DOC_START_INDEX ? "완료/문서 활성화" : "출력 완료";
      if (text.includes("견적서") || text.includes("계약서")) {
        button.disabled = index < DOC_START_INDEX;
        button.classList.toggle("excel-doc-ready", index >= DOC_START_INDEX);
      }
    });
  }

  function storeRows() {
    const rows = Array.from(document.querySelectorAll("table tbody tr"));
    return rows.filter((row) => row.children && row.children.length >= 9 && row.querySelector("[data-margin-rate]"));
  }

  function patch() {
    const rows = storeRows();
    rows.forEach((row, index) => patchRow(row, index));
    const progressTab = Array.from(document.querySelectorAll("button")).find((button) => clean(button.textContent).startsWith("진행중"));
    const completeTab = Array.from(document.querySelectorAll("button")).find((button) => clean(button.textContent).startsWith("완료 매장"));
    if (progressTab) progressTab.textContent = `진행중 ${Math.max(0, rows.length - EXCEL_AMOUNTS.length)}건`;
    if (completeTab) completeTab.textContent = `완료 매장 ${Math.max(0, EXCEL_AMOUNTS.length - DOC_START_INDEX)}건`;
  }

  function showDocument(row, type) {
    const q = quoteFor(row);
    const isContract = String(type || "").includes("계약");
    const overlay = document.createElement("div");
    overlay.className = "excel-doc-overlay";
    overlay.innerHTML = `
      <section class="excel-doc-sheet">
        <div class="row-actions excel-doc-actions"><button data-close-excel-doc>닫기</button><button data-print-excel-doc>인쇄</button></div>
        <div class="document-title"><span>HAKA Construction</span><h1>${isContract ? "공사 계약서" : "공사 견적서"}</h1><p>${new Date().toISOString().slice(0, 10)}</p></div>
        <div class="document-meta"><div><span>매장명</span><strong>${esc(q.storeName)}</strong></div><div><span>상태</span><strong>${esc(q.status)}</strong></div><div><span>마진율</span><strong>${esc(q.margin)}%</strong></div></div>
        ${isContract ? `<div class="contract-body"><p>본 계약은 ${esc(q.storeName)} 공사와 관련하여 기존 완료 매장 엑셀 금액과 매장별 마진율을 기준으로 산정한 최종 공사금액을 계약 기준으로 한다.</p><p>최종 계약금액은 부가세 포함 ${money(q.total)}이다.</p></div>` : ""}
        <div class="table-wrap"><table><thead><tr><th>No</th><th>항목</th><th>원가</th><th>마진 반영 공급가</th><th>부가세</th><th>합계</th></tr></thead><tbody><tr><td>1</td><td>기존 공사 완료 금액</td><td class="money">${money(q.amount)}</td><td class="money">${money(q.supply)}</td><td class="money">${money(q.vat)}</td><td class="money">${money(q.total)}</td></tr></tbody></table></div>
        <div class="document-total"><span>원가 합계 ${money(q.amount)}</span><span>공급가 ${money(q.supply)}</span><span>부가세 ${money(q.vat)}</span><strong>최종 금액 ${money(q.total)}</strong></div>
        <div class="signature-grid"><div><span>발주자</span><strong>하카코리아</strong></div><div><span>시공/관리</span><strong>HAKA Construction</strong></div></div>
      </section>`;
    document.body.appendChild(overlay);
  }

  const style = document.createElement("style");
  style.textContent = `
    .excel-doc-ready { border-color: #237c63 !important; color: #237c63 !important; font-weight: 900 !important; }
    .excel-doc-overlay { position: fixed; inset: 0; z-index: 10001; overflow: auto; padding: 24px; background: rgba(15,23,42,.42); }
    .excel-doc-sheet { width: min(920px, 100%); margin: 0 auto; padding: 28px; border-radius: 8px; background: #fff; color: #061326; box-shadow: 0 24px 80px rgba(0,0,0,.22); }
    .excel-doc-actions { justify-content: flex-end; margin-bottom: 14px; }
    @media print { body > *:not(.excel-doc-overlay) { display: none !important; } .excel-doc-overlay { position: static; padding: 0; background: #fff; } .excel-doc-sheet { box-shadow: none; width: 100%; } .excel-doc-actions { display: none !important; } }
  `;
  document.head.appendChild(style);

  document.addEventListener("input", (event) => {
    const input = event.target.closest?.("[data-margin-rate]");
    if (!input) return;
    const row = input.closest("tr");
    if (!row?.dataset?.excelRowIndex) return;
    patchRow(row, Number(row.dataset.excelRowIndex));
  }, true);

  document.addEventListener("click", (event) => {
    const row = event.target.closest?.("tr");
    const button = event.target.closest?.("button");
    if (button && row?.dataset?.excelRowIndex) {
      const index = Number(row.dataset.excelRowIndex);
      const text = clean(button.textContent);
      if (text.includes("마진 저장") || text.includes("완료/문서")) {
        event.preventDefault(); event.stopPropagation(); event.stopImmediatePropagation();
        const q = quoteFor(row, text.includes("완료") ? "계약 완료" : "견적 확정");
        saveQuote(q.storeName, q);
        patchRow(row, index);
        alert(`${q.storeName} ${text.includes("완료") ? "문서 버튼이 활성화되었습니다" : "마진율이 저장되었습니다"}.`);
      }
      if ((text.includes("견적서") || text.includes("계약서")) && index >= DOC_START_INDEX) {
        event.preventDefault(); event.stopPropagation(); event.stopImmediatePropagation();
        showDocument(row, text);
      }
    }
    if (event.target.closest?.("[data-close-excel-doc]")) event.target.closest(".excel-doc-overlay")?.remove();
    if (event.target.closest?.("[data-print-excel-doc]")) window.print();
  }, true);

  const observer = new MutationObserver(() => {
    clearTimeout(window.__hakaExcelAmountRowTimer);
    window.__hakaExcelAmountRowTimer = setTimeout(patch, 150);
  });
  observer.observe(document.documentElement, { childList: true, subtree: true });
  patch();
})();
