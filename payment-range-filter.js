let paymentReviewRange = { startDate: "", endDate: "" };

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
  let filter = panel.querySelector(".payment-review-range-filter");
  if (!filter) {
    filter = document.createElement("div");
    filter.className = "payment-review-range-filter";
    panel.querySelector(".bulk-actions")?.insertAdjacentElement("beforebegin", filter) ||
      panel.querySelector(".panel-head")?.insertAdjacentElement("afterend", filter);
  }

  filter.innerHTML = `
    <label>시작일<input type="date" data-payment-review-start value="${paymentReviewRange.startDate}" /></label>
    <label>종료일<input type="date" data-payment-review-end value="${paymentReviewRange.endDate}" /></label>
    <button class="primary" type="button" data-payment-review-range-search>조회</button>
    <button type="button" data-payment-review-range-clear>전체 보기</button>
  `;
}

function applyPaymentReviewRange() {
  const panel = findReviewPanel();
  if (!panel) return;
  ensureRangeFilter();

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
    applyPaymentReviewRange();
    return;
  }

  const clear = event.target.closest?.("[data-payment-review-range-clear]");
  if (clear) {
    event.preventDefault();
    event.stopPropagation();
    paymentReviewRange = { startDate: "", endDate: "" };
    applyPaymentReviewRange();
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
    grid-template-columns: minmax(140px, 1fr) minmax(140px, 1fr) 86px 104px;
    gap: 8px;
    align-items: end;
    margin: 0 0 12px;
    padding: 10px;
    border: 1px solid #d9e7e2;
    border-radius: 8px;
    background: #f8fbfa;
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
    height: 40px;
    min-height: 40px;
    margin: 0;
    padding: 0 10px;
    border-radius: 8px;
    font-size: 13px;
    font-weight: 900;
    white-space: nowrap;
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
    .payment-review-range-filter input { height: 44px; min-height: 44px; font-size: 16px; }
    .payment-review-range-filter button { height: 42px; min-height: 42px; }
  }
`;
document.head.appendChild(style);

const observer = new MutationObserver(() => {
  window.clearTimeout(window.__paymentRangeTimer);
  window.__paymentRangeTimer = window.setTimeout(applyPaymentReviewRange, 160);
});
observer.observe(document.body, { childList: true, subtree: true });
applyPaymentReviewRange();
