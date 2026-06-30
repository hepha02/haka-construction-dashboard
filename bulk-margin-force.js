(() => {
  if (window.__hakaBulkMarginForce) return;
  window.__hakaBulkMarginForce = true;

  const clean = (value) => String(value || "").replace(/\s+/g, " ").trim();

  function visibleMarginInputs() {
    return Array.from(document.querySelectorAll("input[data-margin-rate]")).filter((input) => input.offsetParent !== null);
  }

  function findInsertTarget() {
    const firstInput = visibleMarginInputs()[0];
    const panel = firstInput?.closest("article.panel") || document.querySelector("article.panel") || document.querySelector("main") || document.body;
    return panel.querySelector(".segmented-tabs") || panel.querySelector(".notice") || panel.querySelector(".panel-head") || panel;
  }

  function recalcInputs(inputs) {
    inputs.forEach((input) => {
      input.dispatchEvent(new Event("input", { bubbles: true }));
      input.dispatchEvent(new Event("change", { bubbles: true }));
    });
    setTimeout(() => inputs.forEach((input) => input.dispatchEvent(new Event("input", { bubbles: true }))), 250);
  }

  function applyMargin() {
    const value = Number(document.querySelector("[data-force-bulk-margin-input]")?.value || 35);
    if (!Number.isFinite(value) || value < 0) return alert("마진율을 0 이상의 숫자로 입력해 주세요.");
    const inputs = visibleMarginInputs();
    if (!inputs.length) return alert("현재 화면에 적용할 매장 목록이 없습니다.");
    inputs.forEach((input) => { input.value = String(value); });
    recalcInputs(inputs);
    alert(`현재 보이는 ${inputs.length}개 매장에 마진율 ${value}%를 적용했습니다.`);
  }

  async function saveVisibleMargins() {
    const buttons = Array.from(document.querySelectorAll("button[data-quote-finalize]")).filter((button) => button.offsetParent !== null && !button.disabled);
    if (!buttons.length) return alert("저장할 매장이 없습니다.");
    for (const button of buttons) {
      button.click();
      await new Promise((resolve) => setTimeout(resolve, 120));
    }
  }

  function ensureControl() {
    const inputs = visibleMarginInputs();
    if (!inputs.length) return;
    if (document.querySelector(".bulk-margin-force-panel")) return;
    const target = findInsertTarget();
    if (!target) return;

    const box = document.createElement("div");
    box.className = "bulk-margin-force-panel";
    box.innerHTML = `
      <label>일괄 마진율(%) <input type="number" min="0" step="0.1" value="35" data-force-bulk-margin-input /></label>
      <button type="button" data-force-apply-bulk-margin>현재 목록 전체 적용</button>
      <button type="button" data-force-save-visible-margins>현재 목록 마진 저장</button>
    `;
    target.insertAdjacentElement("afterend", box);
  }

  const style = document.createElement("style");
  style.textContent = `
    .bulk-margin-force-panel {
      display: flex !important;
      flex-wrap: wrap !important;
      align-items: end !important;
      gap: 10px !important;
      margin: 12px 0 14px !important;
      padding: 12px 14px !important;
      border: 1px solid #d9e7e2 !important;
      border-radius: 8px !important;
      background: #f8fbfa !important;
      position: relative !important;
      z-index: 5 !important;
    }
    .bulk-margin-force-panel label {
      display: grid !important;
      gap: 6px !important;
      color: #536174 !important;
      font-size: 12px !important;
      font-weight: 900 !important;
    }
    .bulk-margin-force-panel input {
      width: 130px !important;
      min-height: 38px !important;
      padding: 0 10px !important;
      border: 1px solid #d5dde7 !important;
      border-radius: 8px !important;
      font-size: 15px !important;
      font-weight: 900 !important;
    }
    .bulk-margin-force-panel button {
      min-height: 38px !important;
      padding: 0 14px !important;
      border: 1px solid #237c63 !important;
      border-radius: 8px !important;
      background: #fff !important;
      color: #237c63 !important;
      font-weight: 900 !important;
      cursor: pointer !important;
    }
    .bulk-margin-force-panel button[data-force-apply-bulk-margin] {
      background: #237c63 !important;
      color: #fff !important;
    }
    @media (max-width: 720px) {
      .bulk-margin-force-panel { display: grid !important; grid-template-columns: 1fr !important; }
      .bulk-margin-force-panel input, .bulk-margin-force-panel button { width: 100% !important; }
    }
  `;
  document.head.appendChild(style);

  document.addEventListener("click", (event) => {
    if (event.target.closest?.("[data-force-apply-bulk-margin]")) {
      event.preventDefault();
      event.stopPropagation();
      applyMargin();
    }
    if (event.target.closest?.("[data-force-save-visible-margins]")) {
      event.preventDefault();
      event.stopPropagation();
      saveVisibleMargins();
    }
  }, true);

  const observer = new MutationObserver(() => {
    clearTimeout(window.__hakaBulkMarginForceTimer);
    window.__hakaBulkMarginForceTimer = setTimeout(ensureControl, 120);
  });
  observer.observe(document.documentElement, { childList: true, subtree: true });
  ensureControl();
  setTimeout(ensureControl, 800);
  setTimeout(ensureControl, 1800);
})();
