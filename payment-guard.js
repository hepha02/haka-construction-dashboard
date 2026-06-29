import { createClient } from "https://esm.sh/@supabase/supabase-js@2.49.1";

const SUPABASE_URL = "https://yqemtsbdnypgmkuyncxh.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXAiLCJyZWYiOiJ5cWVtdHNiZG55cGdta3V5bmN4aCIsInJvbGUiOiJhbm9uIiwiaWF0IjoxNzgwMjY2MDE1LCJleHAiOjIwOTU4NDIwMTV9.gwgdCncqRKKgC8ebj7qIdT-vA4J-wOVd2O9DSa7xEOs".replace('c3Vw','c3VwYWJhc2UuY28=');
const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
const LEDGER_KEY = "haka_transfer_export_ledger_v1";

const style = document.createElement("style");
style.textContent = `
  .transfer-guard-notice {
    margin: 0 0 12px;
    padding: 12px;
    border-radius: 8px;
    color: #78540c;
    background: #fff5dc;
    font-size: 13px;
    line-height: 1.5;
    font-weight: 800;
  }
  .payment-date-chip {
    display: inline-flex !important;
    align-items: center;
    width: max-content;
    min-height: 24px;
    padding: 0 8px;
    border-radius: 999px;
    color: #1f5fa8;
    background: #e8f1ff;
    font-size: 12px;
    font-weight: 900;
    white-space: nowrap;
  }
`;
document.head.appendChild(style);

function today() {
  return new Date().toISOString().slice(0, 10);
}
function ledger() {
  try { return JSON.parse(localStorage.getItem(LEDGER_KEY) || "{}"); } catch { return {}; }
}
function saveLedger(data) {
  localStorage.setItem(LEDGER_KEY, JSON.stringify(data));
}
function digits(value) {
  return String(value || "").replace(/[^\d]/g, "");
}
function escapeHtml(value) {
  return String(value ?? "").replace(/[&<>"]/g, (char) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" })[char]);
}
function excelCell(value, style = "") {
  return `<td${style ? ` style="${style}"` : ""}>${escapeHtml(value)}</td>`;
}
function inRange(payment, startDate, endDate) {
  const date = String(payment.requested_at || "").slice(0, 10);
  if (!date) return false;
  if (startDate && date < startDate) return false;
  if (endDate && date > endDate) return false;
  return true;
}
function amountOf(payment) {
  return Number(payment.net_amount || payment.amount || 0);
}
function ready(payment) {
  return payment.vendor_bank && payment.vendor_account_number && payment.vendor_account_holder && amountOf(payment) > 0;
}
async function fetchApprovedPayments() {
  const { data, error } = await supabase
    .from("payments")
    .select("id,store,vendor,payment_item,requested_at,vendor_bank,vendor_account_number,vendor_account_holder,amount,net_amount,status")
    .eq("status", "승인")
    .order("requested_at", { ascending: true })
    .order("id", { ascending: true });
  if (error) throw error;
  return data || [];
}
function downloadExcel(payments, periodText) {
  const headers = ["*입금은행", "*입금계좌", "*입금액", "고객관리성명"];
  const rows = payments.map((payment) => [
    payment.vendor_bank,
    digits(payment.vendor_account_number),
    amountOf(payment),
    payment.vendor_account_holder || payment.vendor
  ]);
  const tableRows = [
    `<tr>${headers.map((header) => excelCell(header)).join("")}</tr>`,
    ...rows.map((row) => `<tr>${row.map((cell, index) => excelCell(cell, index === 1 ? "mso-number-format:'\\@';" : "")).join("")}</tr>`)
  ];
  const workbook = `
    <html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel">
      <head><meta charset="UTF-8" /></head>
      <body><table>${tableRows.join("")}</table></body>
    </html>`;
  const blob = new Blob([workbook], { type: "application/vnd.ms-excel;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = `은행대량이체_${periodText}_${today()}.xls`;
  document.body.appendChild(link);
  link.click();
  link.remove();
  URL.revokeObjectURL(url);
}
function markExported(payments, periodText) {
  const data = ledger();
  const exportedAt = new Date().toISOString();
  payments.forEach((payment) => {
    data[payment.id] = {
      exportedAt,
      periodText,
      store: payment.store,
      vendor: payment.vendor,
      amount: amountOf(payment),
      requestedAt: payment.requested_at
    };
  });
  saveLedger(data);
}
async function guardedDownload(button) {
  const panel = button.closest(".panel") || document;
  const startDate = panel.querySelector("[data-transfer-start]")?.value || "";
  const endDate = panel.querySelector("[data-transfer-end]")?.value || "";
  const periodText = startDate || endDate ? `${startDate || "처음"}_${endDate || "오늘"}` : "전체";
  const payments = (await fetchApprovedPayments()).filter((payment) => inRange(payment, startDate, endDate)).filter(ready);
  const data = ledger();
  const duplicatePayments = payments.filter((payment) => data[payment.id]);
  const newPayments = payments.filter((payment) => !data[payment.id]);

  if (!payments.length) {
    alert("다운로드할 승인 완료 건이 없습니다.");
    return;
  }
  if (duplicatePayments.length) {
    const proceed = confirm(`${duplicatePayments.length}건은 이미 이체 파일로 내려받은 기록이 있습니다.\n중복 이체 방지를 위해 제외하고 ${newPayments.length}건만 다운로드할까요?`);
    if (!proceed) return;
  }
  if (!newPayments.length) {
    alert("새로 다운로드할 건이 없습니다. 이미 내려받은 건만 있습니다.");
    return;
  }
  downloadExcel(newPayments, periodText);
  markExported(newPayments, periodText);
  alert(`${newPayments.length}건을 이체 파일로 다운로드했고, 중복 방지 기록을 남겼습니다.`);
}
function addTransferNotice() {
  const panel = [...document.querySelectorAll("article.panel")].find((item) => item.querySelector("h2")?.textContent?.includes("이체"));
  if (!panel || panel.querySelector(".transfer-guard-notice")) return;
  const notice = document.createElement("div");
  notice.className = "transfer-guard-notice";
  notice.textContent = "중복 방지: 이 브라우저에서 이미 엑셀로 내려받은 승인건은 다음 다운로드 때 경고 후 제외됩니다.";
  panel.querySelector(".panel-head")?.insertAdjacentElement("afterend", notice);
}
function highlightPaymentDates() {
  document.querySelectorAll(".payment-review-card").forEach((card) => {
    if (card.querySelector(".payment-date-chip")) return;
    const detailItems = [...card.querySelectorAll(".payment-detail-grid div")];
    const dateBox = detailItems.find((box) => box.textContent.includes("신청일"));
    const date = dateBox?.querySelector("strong")?.textContent?.trim();
    const summary = card.querySelector(".payment-summary-meta");
    if (date && summary) summary.insertAdjacentHTML("afterbegin", `<span class="payment-date-chip">신청일 ${escapeHtml(date)}</span>`);
  });
}

document.addEventListener("click", (event) => {
  const button = event.target.closest?.("[data-bank-transfer-download]");
  if (!button) return;
  event.preventDefault();
  event.stopPropagation();
  event.stopImmediatePropagation();
  guardedDownload(button).catch((error) => alert(`이체 파일 생성 실패: ${error.message}`));
}, true);

const observer = new MutationObserver(() => {
  window.clearTimeout(window.__paymentGuardTimer);
  window.__paymentGuardTimer = window.setTimeout(() => {
    addTransferNotice();
    highlightPaymentDates();
  }, 120);
});
observer.observe(document.body, { childList: true, subtree: true });
addTransferNotice();
highlightPaymentDates();
