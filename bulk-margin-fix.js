(() => {
  if (window.__hakaBulkMarginFix) return;
  window.__hakaBulkMarginFix = true;

  const clean = (value) => String(value || "").replace(/\s+/g, " ").trim();

  function isStoreManagementPage() {
    const text = clean(document.body.innerText.slice(0, 1600));
    return text.includes("매장별 공사 관리") || text.includes("매장별 정산") || text.includes("마진율") || text.includes("견적 확정");
  }

  function marginInputs() {
    return Array.from(document.querySelectorAll("input[data-margin-rate]")).filter((input) => input.offsetParent !== null);
  }

  function applyMargin(value) {
    const margin = Number(value);
    if (!Number.isFinite(margin) || margin < 0) {
      alert("마진율을 0 이상의 숫자로 입력해 주세요.");
      return;
    }
    const inputs = marginInputs();
    if (!inputs.length) {
      alert("현재 화면에 적용할 매장 목록이 없습니다.");
      return;
    }
    inputs.forEach((input) => {
      input.value = String(margin);
      input.dispatchEvent(new Event("input", { bubbles: true }));
      input.dispatchEvent(new Event("change", { bubbles: true }));
    });
    setTimeout(() => {
      inputs.forEach((input) => input.dispatchEvent(new Event("input", { bubbles: true })));
    }, 200);
    alert(`현재 보이는 ${inputs.length}개 매장에 마진율 ${margin}%를 적용했습니다.`);
  }

  function ensureControl() {
    if (!isStoreManagementPage()) return;
    if (document.querySelector(".bulk-margin-panel")) return;
    const panel = Array.from(document.querySelectorAll("article.panel")).find((item) => clean(item.textContent).includes("마진율"));
    if (!panel) return;
    const target = panel.querySelector(".segmented-tabs") || panel.querySelector(".notice") || panel.querySelector(".panel-head");
    if (!target) return;

    const box = document.createElement("div");
    box.className = "bulk-margin-panel";
    box.innerHTML = `
      <label>일괄 마진율(%) <input type="number" min="0" step="0.1" value="35" data-bulk-margin-input /></label>
      <button type="button" data-apply-bulk-margin>현재 목록 전체 적용</button>
      <button type="button" data-save-visible-margins>현재 목록 마진 저장</button>
    `;
    target.insertAdjacentElement("afterend", box);
  }

  async function clickButtonsSequentially(buttons) {
    for (const button of buttons) {
      button.click();
      await new Promise((resolve) => setTimeout(resolve, 180));
    }
  }

  const style = document.createElement("style");
  style.textContent = `
    .bulk-margin-panel {
      display: flex;
      flex-wrap: wrap;
      align-items: end;
      gap: 10px;
      margin: 12px 0 14px;
      padding: 12px 14px;
      border: 1px solid #d9e7e2;
      border-radius: 8px;
      background: #f8fbfa;
    }
    .bulk-margin-panel label {
      display: grid;
      gap: 6px;
      color: #536174;
      font-size: 12px;
      font-weight: 900;
    }
    .bulk-margin-panel input {
      width: 130px;
      min-height: 38px;
      padding: 0 10px;
      border: 1px solid #d5dde7;
      border-radius: 8px;
      font-size: 15px;
      font-weight: 900;
    }
    .bulk-margin-panel button {
      min-height: 38px;
      padding: 0 14px;
      border: 1px solid #237c63;
      border-radius: 8px;
      background: #fff;
      color: #237c63;
      font-weight: 900;
      cursor: pointer;
    }
    .bulk-margin-panel button[data-apply-bulk-margin] {
      background: #237c63;
      color: #fff;
    }
    @media (max-width: 720px) {
      .bulk-margin-panel { display: grid; grid-template-columns: 1fr; }
      .bulk-margin-panel input, .bulk-margin-panel button { width: 100%; }
    }
  `;
  document.head.appendChild(style);

  document.addEventListener("click", async (event) => {
    const apply = event.target.closest?.("[data-apply-bulk-margin]");
    if (apply) {
      event.preventDefault();
      event.stopPropagation();
      applyMargin(document.querySelector("[data-bulk-margin-input]")?.value || 35);
      return;
    }

    const save = event.target.closest?.("[data-save-visible-margins]");
    if (save) {
      event.preventDefault();
      event.stopPropagation();
      const buttons = Array.from(document.querySelectorAll("button[data-quote-finalize]")).filter((button) => button.offsetParent !== null && !button.disabled);
      if (!buttons.length) return alert("저장할 매장이 없습니다.");
      await clickButtonsSequentially(buttons);
    }
  }, true);

  const observer = new MutationObserver(() => {
    clearTimeout(window.__hakaBulkMarginTimer);
    window.__hakaBulkMarginTimer = setTimeout(ensureControl, 150);
  });
  observer.observe(document.documentElement, { childList: true, subtree: true });
  ensureControl();
})();
