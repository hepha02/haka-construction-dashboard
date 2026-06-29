const VOUCHER_KEY = "haka_transfer_vouchers_v1";
const LEDGER_KEY_FOR_VOUCHER = "haka_transfer_export_ledger_v1";

function voucherDate() { return new Date().toISOString().slice(0, 10); }
function voucherTime() { return new Date().toLocaleString("ko-KR"); }
function voucherRead(key, fallback) { try { return JSON.parse(localStorage.getItem(key) || JSON.stringify(fallback)); } catch { return fallback; } }
function voucherWrite(key, value) { localStorage.setItem(key, JSON.stringify(value)); }
function voucherMoney(value) { return new Intl.NumberFormat("ko-KR", { style: "currency", currency: "KRW", maximumFractionDigits: 0 }).format(Number(value || 0)); }
function voucherAmount(value) { return Number(String(value || "").replace(/[^\d.-]/g, "")) || 0; }
function voucherText(node) { return String(node?.textContent || "").trim(); }
function voucherDigits(value) { return String(value || "").replace(/[^\d]/g, ""); }
function voucherKey(payment) {
  return [payment.store, payment.vendor, payment.item, payment.date, payment.bank, voucherDigits(payment.account), payment.holder, payment.amount].map((v) => String(v || "").trim()).join("|");
}
function detailValueFromCard(card, labels, fallbackIndex) {
  const items = [...card.querySelectorAll(".payment-detail-grid div")];
  const found = items.find((box) => labels.some((label) => voucherText(box).includes(label)));
  return voucherText(found?.querySelector("strong")) || voucherText(items[fallbackIndex]?.querySelector("strong"));
}
function paymentFromReviewCard(card) {
  const meta = card.querySelector(".payment-summary-meta");
  const itemNode = [...(meta?.querySelectorAll("span") || [])].find((node) => !node.classList.contains("payment-date-chip") && !node.classList.contains("badge"));
  const date = voucherText(card.querySelector(".payment-date-chip")).replace("신청일", "").trim() || detailValueFromCard(card, ["신청일"], 11);
  const payment = {
    store: voucherText(card.querySelector(".payment-summary-main strong")),
    vendor: voucherText(card.querySelector(".payment-summary-main span")),
    item: voucherText(itemNode),
    date,
    bank: detailValueFromCard(card, ["입금은행", "은행"], 0),
    account: detailValueFromCard(card, ["입금계좌", "계좌"], 1),
    holder: detailValueFromCard(card, ["예금주"], 2),
    amount: voucherAmount(voucherText(meta?.querySelector("strong")) || detailValueFromCard(card, ["실지급", "이번 신청"], 8)),
    status: voucherText(meta?.querySelector(".badge"))
  };
  payment.id = voucherKey(payment);
  return payment;
}
function approvedPaymentsOnPage() {
  return [...document.querySelectorAll(".payment-review-card")]
    .map(paymentFromReviewCard)
    .filter((payment) => payment.status.includes("승인") && payment.bank && payment.account && payment.holder && payment.amount > 0);
}
function voucherLedgerRecord(payment, ledger) {
  if (ledger[payment.id]) return ledger[payment.id];
  return Object.values(ledger).find((record) =>
    String(record.store || "").trim() === payment.store &&
    String(record.vendor || "").trim() === payment.vendor &&
    Number(record.amount || 0) === payment.amount
  );
}
function pendingVoucherPayments() {
  const ledger = voucherRead(LEDGER_KEY_FOR_VOUCHER, {});
  return approvedPaymentsOnPage().filter((payment) => !voucherLedgerRecord(payment, ledger));
}
function saveVoucher(payments) {
  if (!payments.length) return null;
  const vouchers = voucherRead(VOUCHER_KEY, []);
  const now = new Date();
  const id = `이체전표-${now.toISOString().slice(0, 10).replaceAll("-", "")}-${String(vouchers.length + 1).padStart(3, "0")}`;
  const voucher = {
    id,
    createdAt: now.toISOString(),
    createdText: voucherTime(),
    count: payments.length,
    total: payments.reduce((sum, payment) => sum + payment.amount, 0),
    payments
  };
  vouchers.unshift(voucher);
  voucherWrite(VOUCHER_KEY, vouchers.slice(0, 100));
  return voucher;
}
function voucherRows(payments) {
  return payments.map((payment) => `
    <tr>
      <td>${payment.store}</td>
      <td>${payment.vendor}</td>
      <td>${payment.item || "-"}</td>
      <td>${payment.bank}</td>
      <td>${payment.account}</td>
      <td>${payment.holder}</td>
      <td>${voucherMoney(payment.amount)}</td>
    </tr>
  `).join("");
}
function renderVouchers() {
  const transferPanel = document.querySelector(".transfer-download-panel");
  if (!transferPanel) return;
  let panel = document.querySelector(".transfer-voucher-panel");
  if (!panel) {
    panel = document.createElement("section");
    panel.className = "panel transfer-voucher-panel";
    transferPanel.insertAdjacentElement("afterend", panel);
  }
  const vouchers = voucherRead(VOUCHER_KEY, []);
  panel.innerHTML = `
    <div class="panel-head">
      <h2>이체 전표 내역</h2>
      <button type="button">${vouchers.length}건</button>
    </div>
    ${vouchers.length ? vouchers.map((voucher) => `
      <details class="transfer-voucher-card">
        <summary>
          <strong>${voucher.id}</strong>
          <span>${voucher.createdText}</span>
          <span>${voucher.count}건</span>
          <b>${voucherMoney(voucher.total)}</b>
        </summary>
        <div class="table-wrap">
          <table>
            <thead><tr><th>매장</th><th>업체</th><th>항목</th><th>은행</th><th>계좌</th><th>예금주</th><th>금액</th></tr></thead>
            <tbody>${voucherRows(voucher.payments)}</tbody>
          </table>
        </div>
      </details>
    `).join("") : `<div class="empty">아직 생성된 이체 전표가 없습니다.</div>`}
  `;
}

const voucherStyle = document.createElement("style");
voucherStyle.textContent = `
  .transfer-voucher-panel { margin-top: 16px; }
  .transfer-voucher-card { border: 1px solid #dce4ee; border-radius: 8px; background: #fff; overflow: hidden; margin-top: 10px; }
  .transfer-voucher-card summary { display: grid; grid-template-columns: minmax(170px, 1fr) 150px 70px 130px; gap: 12px; align-items: center; padding: 14px 16px; cursor: pointer; list-style: none; }
  .transfer-voucher-card summary::-webkit-details-marker { display: none; }
  .transfer-voucher-card summary strong { color: #162033; }
  .transfer-voucher-card summary span { color: #5f6d80; font-weight: 800; }
  .transfer-voucher-card summary b { justify-self: end; color: #061326; }
  .transfer-voucher-card .table-wrap { padding: 0 12px 12px; }
  @media (max-width: 760px) { .transfer-voucher-card summary { grid-template-columns: 1fr; gap: 6px; } .transfer-voucher-card summary b { justify-self: start; } }
`;
document.head.appendChild(voucherStyle);

let pendingVoucher = null;
document.addEventListener("click", (event) => {
  const button = event.target.closest?.("[data-bank-transfer-download]");
  if (!button) return;
  pendingVoucher = pendingVoucherPayments();
  setTimeout(() => {
    if (!pendingVoucher?.length) return;
    const ledger = voucherRead(LEDGER_KEY_FOR_VOUCHER, {});
    const actuallyExported = pendingVoucher.filter((payment) => voucherLedgerRecord(payment, ledger));
    if (actuallyExported.length) saveVoucher(actuallyExported);
    pendingVoucher = null;
    renderVouchers();
  }, 1200);
}, true);

const voucherObserver = new MutationObserver(() => {
  clearTimeout(window.__transferVoucherTimer);
  window.__transferVoucherTimer = setTimeout(renderVouchers, 300);
});
voucherObserver.observe(document.body, { childList: true, subtree: true });
renderVouchers();
