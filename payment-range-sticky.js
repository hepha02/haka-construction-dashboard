const PAYMENT_RANGE_STICKY_KEY = "haka_payment_review_range_values_v1";

function readStickyRange() {
  try { return JSON.parse(sessionStorage.getItem(PAYMENT_RANGE_STICKY_KEY) || "{}"); } catch { return {}; }
}

function writeStickyRange(values) {
  sessionStorage.setItem(PAYMENT_RANGE_STICKY_KEY, JSON.stringify({ ...readStickyRange(), ...values }));
}

function findPaymentReviewPanel() {
  return [...document.querySelectorAll("article.panel")].find((panel) =>
    panel.querySelector("h2")?.textContent?.includes("결제 신청 검토")
  );
}

function stickyInputs() {
  const panel = findPaymentReviewPanel();
  return {
    panel,
    start: panel?.querySelector("[data-payment-review-start]"),
    end: panel?.querySelector("[data-payment-review-end]")
  };
}

function saveCurrentStickyRange() {
  const { start, end } = stickyInputs();
  const values = {};
  if (start?.value) values.startDate = start.value;
  if (end?.value) values.endDate = end.value;
  if (Object.keys(values).length) writeStickyRange(values);
}

function restoreStickyRange() {
  const saved = readStickyRange();
  const { start, end } = stickyInputs();
  if (start && !start.value && saved.startDate) start.value = saved.startDate;
  if (end && !end.value && saved.endDate) end.value = saved.endDate;
}

function clearStickyRange() {
  sessionStorage.removeItem(PAYMENT_RANGE_STICKY_KEY);
}

document.addEventListener("input", (event) => {
  if (!event.target.matches?.("[data-payment-review-start], [data-payment-review-end]")) return;
  saveCurrentStickyRange();
}, true);

document.addEventListener("change", (event) => {
  if (!event.target.matches?.("[data-payment-review-start], [data-payment-review-end]")) return;
  saveCurrentStickyRange();
  setTimeout(restoreStickyRange, 0);
  setTimeout(restoreStickyRange, 250);
}, true);

document.addEventListener("click", (event) => {
  if (event.target.closest?.("[data-payment-review-range-clear]")) clearStickyRange();
  if (event.target.closest?.("[data-payment-review-range-search]")) {
    saveCurrentStickyRange();
    setTimeout(restoreStickyRange, 0);
  }
}, true);

const stickyObserver = new MutationObserver(() => {
  clearTimeout(window.__paymentRangeStickyTimer);
  window.__paymentRangeStickyTimer = setTimeout(restoreStickyRange, 80);
});
stickyObserver.observe(document.body, { childList: true, subtree: true });
setInterval(restoreStickyRange, 300);
restoreStickyRange();
