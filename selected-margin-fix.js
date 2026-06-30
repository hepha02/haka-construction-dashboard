(() => {
  if (window.__hakaSelectedMarginFix) return;
  window.__hakaSelectedMarginFix = true;

  const clean = (value) => String(value || "").replace(/\s+/g, " ").trim();

  function rows() {
    return Array.from(document.querySelectorAll("table tbody tr")).filter((row) => row.querySelector("input[data-margin-rate]"));
  }

  function selectedRows() {
    return rows().filter((row) => row.querySelector(".selected-margin-checkbox")?.checked);
  }

  function ensureCheckboxes() {
    rows().forEach((row) => {
      if (row.querySelector(".selected-margin-checkbox")) return;
      const firstCell = row.children?.[0];
      if (!firstCell) return;
      const label = document.createElement("label");
      label.className = "selected-margin-cell";
      label.innerHTML = `<input type="checkbox" class="selected-margin-checkbox" /> <span>${firstCell.innerHTML}</span>`;
      firstCell.innerHTML = "";
      firstCell.appendChild(label);
    });
  }

  function ensurePanel() {
    if (!rows().length) return;
    ensureCheckboxes();
    let panel = document.querySelector(".bulk-margin-force-panel") || document.querySelector(".bulk-margin-panel");
    if (!panel) {
      const target = document.querySelector("article.panel .segmented-tabs") || document.querySelector("article.panel .notice") || document.querySelector("article.panel .panel-head");
      if (!target) return;
      panel = document.createElement("div");
      panel.className = "bulk-margin-force-panel selected-margin-panel-created";
      panel.innerHTML = `<label>일괄 마진율(%) <input type="number" min="0" step="0.1" value="35" data-force-bulk-margin-input /></label>`;
      target.insertAdjacentElement("afterend", panel);
    }
    if (!panel.querySelector("[data-apply-selected-margin]")) {
      panel.insertAdjacentHTML("beforeend", `
        <button type="button" data-select-visible-margin-rows>현재 목록 선택</button>
        <button type="button" data-clear-selected-margin-rows>선택 해제</button>
        <button type="button" data-apply-selected-margin>선택 매장만 적용</button>
      `);
    }
  }

  function marginValue() {
    return Number(document.querySelector("[data-force-bulk-margin-input], [data-bulk-margin-input]")?.value || 35);
  }

  function trigger(input) {
    input.dispatchEvent(new Event("input", { bubbles: true }));
    input.dispatchEvent(new Event("change", { bubbles: true }));
    setTimeout(() => input.dispatchEvent(new Event("input", { bubbles: true })), 200);
  }

  function applyToSelected() {
    const value = marginValue();
    if (!Number.isFinite(value) || value < 0) return alert("마진율을 0 이상의 숫자로 입력해 주세요.");
    const targets = selectedRows();
    if (!targets.length) return alert("먼저 적용할 매장을 체크해 주세요.");
    targets.forEach((row) => {
      const input = row.querySelector("input[data-margin-rate]");
      if (!input) return;
      input.value = String(value);
      trigger(input);
    });
    alert(`선택한 ${targets.length}개 매장에 마진율 ${value}%를 적용했습니다.`);
  }

  function setAll(checked) {
    rows().forEach((row) => {
      const box = row.querySelector(".selected-margin-checkbox");
      if (box) box.checked = checked;
    });
  }

  const style = document.createElement("style");
  style.textContent = `
    .selected-margin-cell {
      display: inline-flex !important;
      align-items: center !important;
      gap: 10px !important;
      max-width: 100% !important;
      font-weight: inherit !important;
      color: inherit !important;
    }
    .selected-margin-cell span {
      min-width: 0 !important;
      overflow-wrap: anywhere !important;
    }
    .selected-margin-checkbox {
      flex: 0 0 auto !important;
      width: 18px !important;
      height: 18px !important;
      accent-color: #237c63 !important;
    }
    [data-apply-selected-margin] {
      background: #145c4a !important;
      color: #fff !important;
      border-color: #145c4a !important;
    }
  `;
  document.head.appendChild(style);

  document.addEventListener("click", (event) => {
    if (event.target.closest?.(".selected-margin-checkbox")) event.stopPropagation();
    if (event.target.closest?.("[data-select-visible-margin-rows]")) {
      event.preventDefault(); event.stopPropagation(); setAll(true);
    }
    if (event.target.closest?.("[data-clear-selected-margin-rows]")) {
      event.preventDefault(); event.stopPropagation(); setAll(false);
    }
    if (event.target.closest?.("[data-apply-selected-margin]")) {
      event.preventDefault(); event.stopPropagation(); applyToSelected();
    }
  }, true);

  const observer = new MutationObserver(() => {
    clearTimeout(window.__hakaSelectedMarginTimer);
    window.__hakaSelectedMarginTimer = setTimeout(ensurePanel, 150);
  });
  observer.observe(document.documentElement, { childList: true, subtree: true });
  ensurePanel();
  setTimeout(ensurePanel, 800);
  setTimeout(ensurePanel, 1800);
})();
