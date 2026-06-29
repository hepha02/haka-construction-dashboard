let paymentReviewRange = { startDate: "", endDate: "" };
let applyingPaymentRange = false;

function requestedDateFromCard(card) {
  const chip = card.querySelector(".payment-date-chip")?.textContent?.replace("신청일", "")?.trim();
  if (chip) return chip;
  const detailItems = [...card.querySelectorAll(".payment-detail-grid div")];
  const dateBox = detailItems.find((box) => box.textContent.includes("신청일"));
  return dateBox?.querySelector("strong")?.textContent?.trim() || "";
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

function ensureRangeFilter() {
  const panel = findReviewPanel();
  if (!panel) return null;
  panel.querySelector(".payment-review-date-filter")?.remove();

  let filter = panel.querySelector(".payment-review-range-filter");
  if (!filter) {
    filter = document.createElement("div");
    filter.className = "payment-review-range-filter";
    filter.innerHTML = `
      <label>시작일<input type="date" data-payment-review-start /></label>
      <label>종료일<input type="date" data-payment-review-end /></label>
      <button class="primary" type="button" data-payment-review-range-search>조회</button>
      <button type="button" data-payment-review-range-clear>전체 보기</button>
    `;
  }

  const anchor = panel.querySelector(".bulk-actions") || panel.querySelector(".payment-review-list");
  if (anchor && filter.nextElementSibling !== anchor) anchor.insertAdjacentElement("beforebegin", filter);
  if (!anchor && !filter.parentElement) panel.querySelector(".panel-head")?.insertAdjacentElement("afterend", filter);

  const startInput = filter.querySelector("[data-payment-review-start]");
  const endInput = filter.querySelector("[data-payment-review-end]");
  if (startInput && !startInput.value && paymentReviewRange.startDate) startInput.value = paymentReviewRange.startDate;
  if (endInput && !endInput.value && paymentReviewRange.endDate) endInput.value = paymentReviewRange.endDate;
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
    const useFilter = paymentReviewRange.startDate || paymentReviewRange.endDate;
    cards.forEach((card) => {
      const date = requestedDateFromCard(card);
      const show = !useFilter || inPaymentReviewRange(date);
      card.style.display = show ? "" : "none";
      if (!show) {
        const checkbox = card.querySelector(".payment-select");
        if (checkbox) checkbox.checked = false;
      }
      if (show) visibleCount += 1;
    });

    panel.querySelector(".payment-review-empty")?.remove();
    if (!visibleCount && cards.length && useFilter) {
      const empty = document.createElement("div");
      empty.className = "payment-review-empty";
      empty.textContent = `${paymentReviewRange.startDate || "처음"} ~ ${paymentReviewRange.endDate || "오늘"} 신청 건이 없습니다.`;
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
  .payment-review-range-filter {
    box-sizing: border-box !important;
    width: 100% !important;
    display: grid !important;
    grid-template-columns: minmax(150px, 1fr) minmax(150px, 1fr) 108px 120px !important;
    gap: 10px !important;
    align-items: end !important;
    margin: 10px 0 14px !important;
    padding: 12px !important;
    border: 1px solid #d9e7e2 !important;
    border-radius: 8px !important;
    background: #f8fbfa !important;
    position: relative !important;
    z-index: 50 !important;
  }
  .payment-review-range-filter label {
    min-width: 0 !important;
    display: grid !important;
    gap: 6px !important;
    margin: 0 !important;
    color: #596579 !important;
    font-size: 12px !important;
    font-weight: 900 !important;
    line-height: 1.2 !important;
  }
  .payment-review-range-filter input,
  .payment-review-range-filter button {
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
    position: relative !important;
    z-index: 60 !important;
    cursor: pointer !important;
  }
  .payment-review-range-filter input { border: 1px solid #dce2ea !important; color: #162033 !important; background: #ffffff !important; }
  .payment-review-range-filter button { border: 1px solid #d9dfe8 !important; color: #253247 !important; background: #ffffff !important; }
  .payment-review-range-filter button.primary { border-color: #237c63 !important; color: #ffffff !important; background: #237c63 !important; }
  @media (max-width: 980px) { .payment-review-range-filter { grid-template-columns: 1fr 1fr !important; } }
  @media (max-width: 720px) { .payment-review-range-filter { grid-template-columns: 1fr !important; } .payment-review-range-filter input, .payment-review-range-filter button { height: 46px !important; min-height: 46px !important; font-size: 16px !important; } }
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
