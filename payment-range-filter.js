let paymentReviewRange = { startDate: "", endDate: "" };
let paymentReviewStatus = "all";
let applyingPaymentRange = false;

function requestedDateFromCard(card) {
  const chip = card.querySelector(".payment-date-chip")?.textContent?.replace("신청일", "")?.trim();
  if (chip) return chip;
  const detailItems = [...card.querySelectorAll(".payment-detail-grid div")];
  const dateBox = detailItems.find((box) => box.textContent.includes("신청일"));
  return dateBox?.querySelector("strong")?.textContent?.trim() || "";
}

function statusFromCard(card) {
  const badge = card.querySelector(".badge")?.textContent?.trim();
  if (badge) return badge;
  const text = card.textContent || "";
  if (text.includes("이체전표 생성됨")) return "이체전표 생성됨";
  if (text.includes("이체완료")) return "이체완료";
  if (text.includes("반려")) return "반려";
  if (text.includes("승인 대기") || text.includes("신청")) return "신청";
  if (text.includes("승인")) return "승인";
  return "";
}

function matchesPaymentReviewStatus(status) {
  if (paymentReviewStatus === "all") return true;
  if (paymentReviewStatus === "신청") return status === "신청" || status.includes("신청") || status.includes("대기");
  if (paymentReviewStatus === "승인") return status === "승인" || status === "다운로드 가능";
  if (paymentReviewStatus === "이체전표 생성됨") return status.includes("이체전표") || status.includes("이체완료");
  if (paymentReviewStatus === "반려") return status.includes("반려");
  return true;
}

function inPaymentReviewRange(date) {
  if (!date) return false;
  if (paymentReviewRange.startDate && date < paymentReviewRange.startDate) return false;
  if (paymentReviewRange.endDate && date > paymentReviewRange.endDate) return false;
  return true;
}

function findReviewPanel() {
  return [...document.querySelectorAll("article.panel")].find((panel) =>
    panel.querySelector("h2")?.textContent?.includes("결제 신청 검토")
  );
}

function syncRangeFromInputs(panel = findReviewPanel()) {
  const startValue = panel?.querySelector("[data-payment-review-start]")?.value;
  const endValue = panel?.querySelector("[data-payment-review-end]")?.value;
  if (startValue !== undefined) paymentReviewRange.startDate = startValue;
  if (endValue !== undefined) paymentReviewRange.endDate = endValue;
}

function statusButtonsHtml() {
  const items = [
    ["all", "전체"],
    ["신청", "신청건"],
    ["승인", "승인건"],
    ["이체전표 생성됨", "이체 제외"],
    ["반려", "반려"]
  ];
  return `<div class="payment-review-status-tabs" role="group" aria-label="결제 상태 구분">
    ${items.map(([value, label]) => `<button type="button" data-payment-review-status="${value}" class="${paymentReviewStatus === value ? "active" : ""}">${label}</button>`).join("")}
  </div>`;
}

function ensureRangeFilter() {
  const panel = findReviewPanel();
  if (!panel) return null;
  panel.querySelector(".payment-review-date-filter")?.remove();

  let filter = panel.querySelector(".payment-review-range-filter");
  if (!filter) {
    filter = document.createElement("div");
    filter.className = "payment-review-range-filter";
    filter.innerHTML = `
      <div class="payment-review-range-row">
        <label>시작일<input type="date" data-payment-review-start /></label>
        <label>종료일<input type="date" data-payment-review-end /></label>
        <button class="primary" type="button" data-payment-review-range-search>조회</button>
        <button type="button" data-payment-review-range-clear>전체 보기</button>
      </div>
      ${statusButtonsHtml()}
      <div class="payment-review-filter-summary" data-payment-review-summary></div>
    `;
  } else {
    const tabs = filter.querySelector(".payment-review-status-tabs");
    if (tabs) tabs.outerHTML = statusButtonsHtml();
  }

  const anchor = panel.querySelector(".bulk-actions") || panel.querySelector(".payment-review-list");
  if (anchor && filter.nextElementSibling !== anchor) anchor.insertAdjacentElement("beforebegin", filter);
  if (!anchor && !filter.parentElement) panel.querySelector(".panel-head")?.insertAdjacentElement("afterend", filter);

  const startInput = filter.querySelector("[data-payment-review-start]");
  const endInput = filter.querySelector("[data-payment-review-end]");
  if (startInput && document.activeElement !== startInput) startInput.value = paymentReviewRange.startDate;
  if (endInput && document.activeElement !== endInput) endInput.value = paymentReviewRange.endDate;
  return panel;
}

function applyPaymentReviewRange(force = false) {
  if (!force && document.activeElement?.matches?.("[data-payment-review-start], [data-payment-review-end]")) return;
  const panel = ensureRangeFilter();
  if (!panel) return;
  applyingPaymentRange = true;
  try {
    const cards = [...panel.querySelectorAll(".payment-review-card")];
    let visibleCount = 0;
    const useDateFilter = paymentReviewRange.startDate || paymentReviewRange.endDate;
    cards.forEach((card) => {
      const date = requestedDateFromCard(card);
      const status = statusFromCard(card);
      const dateOk = !useDateFilter || inPaymentReviewRange(date);
      const statusOk = matchesPaymentReviewStatus(status);
      const show = dateOk && statusOk;
      card.style.display = show ? "" : "none";
      if (!show) {
        const checkbox = card.querySelector(".payment-select, .transfer-select");
        if (checkbox) checkbox.checked = false;
      }
      if (show) visibleCount += 1;
    });

    const summary = panel.querySelector("[data-payment-review-summary]");
    if (summary) {
      const period = useDateFilter ? `${paymentReviewRange.startDate || "처음"} ~ ${paymentReviewRange.endDate || "오늘"}` : "전체 기간";
      const statusText = paymentReviewStatus === "all" ? "전체" : paymentReviewStatus;
      summary.textContent = `${period} / ${statusText}: ${visibleCount}건 표시`;
    }

    panel.querySelector(".payment-review-empty")?.remove();
    if (!visibleCount && cards.length) {
      const empty = document.createElement("div");
      empty.className = "payment-review-empty";
      empty.textContent = "선택한 날짜 범위와 구분에 해당하는 결제 신청이 없습니다.";
      panel.querySelector(".payment-review-list")?.appendChild(empty);
    }
  } finally {
    applyingPaymentRange = false;
  }
}

function runPaymentRangeSearch() {
  const panel = ensureRangeFilter();
  syncRangeFromInputs(panel);
  applyPaymentReviewRange(true);
}

document.addEventListener("input", (event) => {
  if (!event.target.matches?.("[data-payment-review-start], [data-payment-review-end]")) return;
  syncRangeFromInputs(event.target.closest("article.panel"));
}, true);

document.addEventListener("change", (event) => {
  if (!event.target.matches?.("[data-payment-review-start], [data-payment-review-end]")) return;
  syncRangeFromInputs(event.target.closest("article.panel"));
}, true);

document.addEventListener("click", (event) => {
  const statusButton = event.target.closest?.("[data-payment-review-status]");
  if (statusButton) {
    event.preventDefault();
    event.stopPropagation();
    paymentReviewStatus = statusButton.dataset.paymentReviewStatus || "all";
    applyPaymentReviewRange(true);
    return;
  }

  const search = event.target.closest?.("[data-payment-review-range-search]");
  if (search) {
    event.preventDefault();
    event.stopPropagation();
    search.blur();
    runPaymentRangeSearch();
    return;
  }

  const clear = event.target.closest?.("[data-payment-review-range-clear]");
  if (clear) {
    event.preventDefault();
    event.stopPropagation();
    paymentReviewRange = { startDate: "", endDate: "" };
    paymentReviewStatus = "all";
    const panel = ensureRangeFilter();
    const startInput = panel?.querySelector("[data-payment-review-start]");
    const endInput = panel?.querySelector("[data-payment-review-end]");
    if (startInput) startInput.value = "";
    if (endInput) endInput.value = "";
    clear.blur();
    applyPaymentReviewRange(true);
    return;
  }

  const selectAll = event.target.closest?.("[data-select-pending-payments]");
  if (selectAll) {
    setTimeout(() => {
      const panel = findReviewPanel();
      panel?.querySelectorAll(".payment-review-card").forEach((card) => {
        const checkbox = card.querySelector(".payment-select");
        if (checkbox) checkbox.checked = card.style.display !== "none" && selectAll.checked;
      });
    }, 0);
  }
}, true);

const style = document.createElement("style");
style.textContent = `
  article.panel .payment-review-range-filter {
    box-sizing: border-box !important;
    width: 100% !important;
    display: flex !important;
    flex-direction: column !important;
    gap: 12px !important;
    margin: 10px 0 14px !important;
    padding: 12px !important;
    border: 1px solid #d9e7e2 !important;
    border-radius: 8px !important;
    background: #f8fbfa !important;
    position: relative !important;
    z-index: 20 !important;
  }
  article.panel .payment-review-range-row {
    display: grid !important;
    grid-template-columns: minmax(160px, 1fr) minmax(160px, 1fr) 108px 120px !important;
    gap: 10px !important;
    align-items: end !important;
    width: 100% !important;
  }
  article.panel .payment-review-range-filter label {
    min-width: 0 !important;
    display: grid !important;
    gap: 6px !important;
    margin: 0 !important;
    color: #596579 !important;
    font-size: 12px !important;
    font-weight: 900 !important;
    line-height: 1.2 !important;
  }
  article.panel .payment-review-range-filter input,
  article.panel .payment-review-range-row button {
    box-sizing: border-box !important;
    width: 100% !important;
    height: 44px !important;
    min-height: 44px !important;
    margin: 0 !important;
    padding: 0 12px !important;
    border-radius: 8px !important;
    font-size: 14px !important;
    font-weight: 900 !important;
    white-space: nowrap !important;
    pointer-events: auto !important;
    touch-action: manipulation !important;
    cursor: pointer !important;
  }
  article.panel .payment-review-range-filter input { border: 1px solid #dce2ea !important; color: #162033 !important; background: #ffffff !important; }
  article.panel .payment-review-range-row button { border: 1px solid #d9dfe8 !important; color: #253247 !important; background: #ffffff !important; }
  article.panel .payment-review-range-row button.primary { border-color: #237c63 !important; color: #ffffff !important; background: #237c63 !important; }
  article.panel .payment-review-status-tabs {
    display: flex !important;
    flex-direction: row !important;
    flex-wrap: wrap !important;
    gap: 8px !important;
    align-items: center !important;
    justify-content: flex-start !important;
    width: 100% !important;
    position: static !important;
  }
  article.panel .payment-review-status-tabs button {
    flex: 0 1 auto !important;
    width: auto !important;
    min-width: 76px !important;
    max-width: none !important;
    height: 36px !important;
    min-height: 36px !important;
    padding: 0 12px !important;
    margin: 0 !important;
    border: 1px solid #d9dfe8 !important;
    border-radius: 8px !important;
    color: #253247 !important;
    background: #ffffff !important;
    font-size: 13px !important;
    font-weight: 900 !important;
    line-height: 1 !important;
    white-space: nowrap !important;
    position: static !important;
    transform: none !important;
  }
  article.panel .payment-review-status-tabs button.active { border-color: #237c63 !important; color: #116447 !important; background: #e6f5ee !important; }
  article.panel .payment-review-filter-summary { color: #526074 !important; font-size: 12px !important; font-weight: 900 !important; }
  @media (max-width: 980px) { article.panel .payment-review-range-row { grid-template-columns: 1fr 1fr !important; } }
  @media (max-width: 720px) {
    article.panel .payment-review-range-row { grid-template-columns: 1fr !important; }
    article.panel .payment-review-range-filter input,
    article.panel .payment-review-range-row button { height: 46px !important; min-height: 46px !important; font-size: 16px !important; }
    article.panel .payment-review-status-tabs { display: grid !important; grid-template-columns: repeat(2, minmax(0, 1fr)) !important; }
    article.panel .payment-review-status-tabs button { width: 100% !important; min-width: 0 !important; }
  }
`;
document.head.appendChild(style);

const observer = new MutationObserver(() => {
  if (applyingPaymentRange) return;
  window.clearTimeout(window.__paymentRangeTimer);
  window.__paymentRangeTimer = window.setTimeout(() => {
    ensureRangeFilter();
    applyPaymentReviewRange(false);
  }, 250);
});
observer.observe(document.body, { childList: true, subtree: true });
window.setInterval(() => ensureRangeFilter(), 1200);
ensureRangeFilter();
applyPaymentReviewRange(false);
