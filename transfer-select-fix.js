function tsText(node) { return String(node?.textContent || "").trim(); }

function tsIsApprovedCard(card) {
  const status = tsText(card.querySelector(".payment-summary-meta .badge"));
  return status.includes("승인");
}

function tsIsRejectedCard(card) {
  const status = tsText(card.querySelector(".payment-summary-meta .badge"));
  return status.includes("반려");
}

function tsEnsureCheckboxes() {
  document.querySelectorAll(".payment-review-card").forEach((card) => {
    const main = card.querySelector(".payment-summary-main");
    if (!main) return;

    if (tsIsApprovedCard(card)) {
      if (!card.querySelector(".transfer-payment-select")) {
        const store = tsText(card.querySelector(".payment-summary-main strong"));
        main.insertAdjacentHTML("afterbegin", `<input type="checkbox" class="transfer-payment-select" aria-label="${store} 이체 선택" />`);
      }
    }

    if (tsIsRejectedCard(card)) {
      card.querySelectorAll(".transfer-payment-select").forEach((box) => box.remove());
    }
  });

  const bulk = document.querySelector(".bulk-actions");
  if (bulk && !bulk.querySelector("[data-select-approved-transfers]")) {
    bulk.insertAdjacentHTML("beforeend", `<label class="transfer-select-control"><input type="checkbox" data-select-approved-transfers /> 이체대상 전체 선택</label>`);
  }
}

function tsUpdateDownloadButtons() {
  const selectedCount = document.querySelectorAll(".transfer-payment-select:checked").length;
  document.querySelectorAll("[data-bank-transfer-download]").forEach((button) => {
    if (button.closest(".transfer-download-panel")) return;
    button.textContent = selectedCount ? `선택 이체 파일 ${selectedCount}건` : "선택건 엑셀 다운로드";
    button.disabled = false;
  });
}

document.addEventListener("change", (event) => {
  if (event.target.matches?.("[data-select-approved-transfers]")) {
    document.querySelectorAll(".payment-review-card").forEach((card) => {
      const box = card.querySelector(".transfer-payment-select");
      if (box && card.style.display !== "none") box.checked = event.target.checked;
    });
  }
  if (event.target.matches?.(".transfer-payment-select, [data-select-approved-transfers]")) {
    tsUpdateDownloadButtons();
  }
}, true);

document.addEventListener("click", (event) => {
  if (event.target.closest?.(".transfer-payment-select, [data-select-approved-transfers]")) event.stopPropagation();
}, true);

const tsStyle = document.createElement("style");
tsStyle.textContent = `
  .transfer-payment-select {
    flex: 0 0 auto !important;
    width: 22px !important;
    height: 22px !important;
    min-height: 22px !important;
    margin: 0 !important;
    accent-color: #237c63 !important;
    cursor: pointer !important;
  }
  .transfer-select-control {
    display: inline-flex !important;
    align-items: center !important;
    gap: 8px !important;
    min-height: 44px !important;
    color: #162033 !important;
    font-size: 14px !important;
    font-weight: 800 !important;
  }
  .transfer-select-control input {
    width: 20px !important;
    height: 20px !important;
    min-height: 20px !important;
    margin: 0 !important;
    accent-color: #237c63 !important;
  }
`;
document.head.appendChild(tsStyle);

const tsObserver = new MutationObserver(() => {
  clearTimeout(window.__transferSelectFixTimer);
  window.__transferSelectFixTimer = setTimeout(() => {
    tsEnsureCheckboxes();
    tsUpdateDownloadButtons();
  }, 120);
});
tsObserver.observe(document.body, { childList: true, subtree: true });
setInterval(() => {
  tsEnsureCheckboxes();
  tsUpdateDownloadButtons();
}, 1000);
tsEnsureCheckboxes();
tsUpdateDownloadButtons();
