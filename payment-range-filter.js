let paymentReviewRange = { startDate: "", endDate: "" };
let applyingPaymentRange = false;

function requestedDateFromCard(card) {
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

function ensureRangeFilter() {
  const panel = findReviewPanel();
  if (!panel) return;
  panel.querySelector(".payment-review-date-filter")?.remove();
  if (panel.querySelector(".payment-review-range-filter")) return;

  const filter = document.createElement("div");
  filter.className = "payment-review-range-filter";
  filter.innerHTML = `
    <label>시작일<input type="date" data-payment-review-start /></label>
    <label>종료일<input type="date" data-payment-review-end /></label>
    <button class="primary" type="button" data-payment-review-range-search>조회</button>
    <button type="button" data-payment-review-range-clear>전체 보기</button>
  `;
  panel.querySelector(".bulk-actions")?.insertAdjacentElement("beforebegin", filter) ||
    panel.querySelector(".panel-head")?.insertAdjacentElement("afterend", filter);
}

function applyPaymentReviewRange(force = false) {
  if (!force && document.activeElement?.matches?.("[data-payment-review-start], [data-payment-review-end]")) return;
  const panel = findReviewPanel();
  if (!panel) return;
  applyingPaymentRange = true;
  try {
    ensureRangeFilter();
    const startInput = panel.querySelector("[data-payment-review-start]");
    const endInput = panel.querySelector("[data-payment-review-end]");
    if (startInput && startInput.value !== paymentReviewRange.startDate) startInput.value = paymentReviewRange.startDate;
    if (endInput && endInput.value !== paymentReviewRange.endDate) endInput.value = paymentReviewRange.endDate;

    const cards = [...panel.querySelectorAll(".payment-review-card")];
    let visibleCount = 0;
    cards.forEach((card) => {
      const date = requestedDateFromCard(card);
      const useFilter = paymentReviewRange.startDate || paymentReviewRange.endDate;
      const show = !useFilter || inPaymentReviewRange(date);
      card.style.display = show ? "" : "none";
      if (!show) {
        const checkbox = card.querySelector(".payment-select");
        if (checkbox) checkbox.checked = false;
      }
      if (show) visibleCount += 1;
    });

    panel.querySelector(".payment-review-empty")?.remove();
    const useFilter = paymentReviewRange.startDate || paymentReviewRange.endDate;
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

document.addEventListener("click", (event) => {
  const search = event.target.closest?.("[data-payment-review-range-search]");
  if (search) {
    event.preventDefault();
    event.stopPropagation();
    const panel = findReviewPanel();
    paymentReviewRange = {
      startDate: panel?.querySelector("[data-payment-review-start]")?.value || "",
      endDate: panel?.querySelector("[data-payment-review-end]")?.value || ""
    };
    search.blur();
    applyPaymentReviewRange(true);
    return;
  }

  const clear = event.target.closest?.("[data-payment-review-range-clear]");
  if (clear) {
    event.preventDefault();
    event.stopPropagation();
    paymentReviewRange = { startDate: "", endDate: "" };
    const panel = findReviewPanel();
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
    box-sizing: border-box;
    width: 100%;
    display: grid;
    grid-template-columns: minmax(140px, 1fr) minmax(140px, 1fr) 96px 112px;
    gap: 10px;
    align-items: end;
    margin: 0 0 12px;
    padding: 10px;
    border: 1px solid #d9e7e2;
    border-radius: 8px;
    background: #f8fbfa;
    position: relative;
    z-index: 20;
  }
  .payment-review-range-filter label {
    display: grid;
    gap: 6px;
    margin: 0;
    color: #596579;
    font-size: 12px;
    font-weight: 900;
    line-height: 1.2;
  }
  .payment-review-range-filter input,
  .payment-review-range-filter button {
    box-sizing: border-box;
    width: 100%;
    height: 44px;
    min-height: 44px;
    margin: 0;
    padding: 0 12px;
    border-radius: 8px;
    font-size: 14px;
    font-weight: 900;
    white-space: nowrap;
    pointer-events: auto;
    touch-action: manipulation;
    position: relative;
    z-index: 30;
    cursor: pointer;
  }
  .payment-review-range-filter input {
    border: 1px solid #dce2ea;
    color: #162033;
    background: #ffffff;
  }
  .payment-review-range-filter button {
    border: 1px solid #d9dfe8;
    color: #253247;
    background: #ffffff;
  }
  .payment-review-range-filter button.primary {
    border-color: #237c63;
    color: #ffffff;
    background: #237c63;
  }
  @media (max-width: 720px) {
    .payment-review-range-filter { grid-template-columns: 1fr 1fr; }
    .payment-review-range-filter input { height: 46px; min-height: 46px; font-size: 16px; }
    .payment-review-range-filter button { height: 46px; min-height: 46px; font-size: 15px; }
  }
`;
document.head.appendChild(style);

const observer = new MutationObserver(() => {
  if (applyingPaymentRange) return;
  window.clearTimeout(window.__paymentRangeTimer);
  window.__paymentRangeTimer = window.setTimeout(() => applyPaymentReviewRange(false), 250);
});
observer.observe(document.body, { childList: true, subtree: true });
applyPaymentReviewRange(false);
