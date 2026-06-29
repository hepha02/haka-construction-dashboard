const SUPABASE_URL_FOR_REJECTED = "https://yqemtsbdnypgmkuyncxh.supabase.co";
const SUPABASE_ANON_FOR_REJECTED = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJ5cWVtdHNiZG55cGdta3V5bmN4aCIsInJlZiI6InlxZW10c2JkbnlwZ21rdXluY3hoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODAyNjYwMTUsImV4cCI6MjA5NTg0MjAxNX0.gwgdCncqRKKgC8ebj7qIdT-vA4J-wOVd2O9DSa7xEOs";

function rejectedText(node) { return String(node?.textContent || "").trim(); }
function rejectedAmount(value) { return Number(String(value || "").replace(/[^\d.-]/g, "")) || 0; }
function rejectedDate(card) {
  const chip = rejectedText(card.querySelector(".payment-date-chip")).replace("신청일", "").trim();
  if (chip) return chip;
  const row = [...card.querySelectorAll(".payment-detail-grid div")].find((box) => rejectedText(box).includes("신청일"));
  return rejectedText(row?.querySelector("strong"));
}
function rejectedDetail(card, labels, fallbackIndex) {
  const items = [...card.querySelectorAll(".payment-detail-grid div")];
  const found = items.find((box) => labels.some((label) => rejectedText(box).includes(label)));
  return rejectedText(found?.querySelector("strong")) || rejectedText(items[fallbackIndex]?.querySelector("strong"));
}
function rejectedPaymentFromCard(card) {
  const meta = card.querySelector(".payment-summary-meta");
  const itemNode = [...(meta?.querySelectorAll("span") || [])].find((node) => !node.classList.contains("payment-date-chip") && !node.classList.contains("badge") && !node.classList.contains("payment-rejected-note"));
  return {
    store: rejectedText(card.querySelector(".payment-summary-main strong")),
    vendor: rejectedText(card.querySelector(".payment-summary-main span")),
    payment_item: rejectedText(itemNode),
    requested_at: rejectedDate(card),
    amount: rejectedAmount(rejectedDetail(card, ["이번 신청"], 5)),
    net_amount: rejectedAmount(rejectedText(meta?.querySelector("strong")) || rejectedDetail(card, ["실지급"], 8)),
    status: rejectedText(meta?.querySelector(".badge"))
  };
}
function authTokenForRejected() {
  for (const key of Object.keys(localStorage)) {
    if (!key.startsWith("sb-") || !key.endsWith("-auth-token")) continue;
    try {
      const parsed = JSON.parse(localStorage.getItem(key) || "{}");
      if (parsed.access_token) return parsed.access_token;
    } catch {}
  }
  return SUPABASE_ANON_FOR_REJECTED;
}
function nearlyEqualAmount(a, b) { return Math.abs(Number(a || 0) - Number(b || 0)) < 1; }
function sameDate(a, b) {
  if (!a || !b) return true;
  return String(a).slice(0, 10) === String(b).slice(0, 10);
}
async function findRejectedPaymentId(payment) {
  const params = new URLSearchParams();
  params.set("select", "id,store,vendor,payment_item,requested_at,amount,net_amount,status");
  params.set("status", "eq.반려");
  params.set("store", `eq.${payment.store}`);
  params.set("vendor", `eq.${payment.vendor}`);
  const response = await fetch(`${SUPABASE_URL_FOR_REJECTED}/rest/v1/payments?${params.toString()}`, {
    headers: {
      apikey: SUPABASE_ANON_FOR_REJECTED,
      Authorization: `Bearer ${authTokenForRejected()}`
    }
  });
  if (!response.ok) throw new Error(await response.text());
  const rows = await response.json();
  const matches = rows.filter((row) =>
    String(row.payment_item || "") === String(payment.payment_item || "") &&
    sameDate(row.requested_at, payment.requested_at) &&
    (nearlyEqualAmount(row.net_amount, payment.net_amount) || nearlyEqualAmount(row.amount, payment.amount) || nearlyEqualAmount(row.amount, payment.net_amount))
  );
  if (matches.length !== 1) {
    throw new Error(matches.length ? "같은 조건의 반려건이 여러 개라서 자동 변경을 멈췄습니다." : "일치하는 반려 결제건을 찾지 못했습니다.");
  }
  return matches[0].id;
}
async function approveRejectedPayment(card, button) {
  const payment = rejectedPaymentFromCard(card);
  if (!payment.status.includes("반려")) return;
  if (!confirm(`${payment.store} / ${payment.vendor}\n반려 건을 승인으로 변경할까요?`)) return;
  button.disabled = true;
  button.textContent = "변경 중";
  try {
    const id = await findRejectedPaymentId(payment);
    const response = await fetch(`${SUPABASE_URL_FOR_REJECTED}/rest/v1/payments?id=eq.${encodeURIComponent(id)}&status=eq.반려`, {
      method: "PATCH",
      headers: {
        apikey: SUPABASE_ANON_FOR_REJECTED,
        Authorization: `Bearer ${authTokenForRejected()}`,
        "Content-Type": "application/json",
        Prefer: "return=representation"
      },
      body: JSON.stringify({ status: "승인" })
    });
    if (!response.ok) throw new Error(await response.text());
    alert("반려 건을 승인으로 변경했습니다. 화면을 새로고침합니다.");
    location.reload();
  } catch (error) {
    button.disabled = false;
    button.textContent = "승인으로 변경";
    alert(`승인 변경 실패: ${error.message}`);
  }
}
function ensureRejectedApproveButtons() {
  document.querySelectorAll(".payment-review-card").forEach((card) => {
    const payment = rejectedPaymentFromCard(card);
    if (!payment.status.includes("반려")) return;
    const actions = card.querySelector(".payment-detail-actions");
    if (!actions || actions.querySelector("[data-approve-rejected-payment]")) return;
    actions.innerHTML = `<button class="primary" type="button" data-approve-rejected-payment>승인으로 변경</button><span class="muted">실제 맞는 건이면 승인으로 되돌릴 수 있습니다.</span>`;
  });
}

document.addEventListener("click", (event) => {
  const button = event.target.closest?.("[data-approve-rejected-payment]");
  if (!button) return;
  event.preventDefault();
  event.stopPropagation();
  approveRejectedPayment(button.closest(".payment-review-card"), button);
}, true);

const rejectedApproveObserver = new MutationObserver(() => {
  clearTimeout(window.__rejectedApproveTimer);
  window.__rejectedApproveTimer = setTimeout(ensureRejectedApproveButtons, 250);
});
rejectedApproveObserver.observe(document.body, { childList: true, subtree: true });
ensureRejectedApproveButtons();
