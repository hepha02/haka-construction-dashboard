import { createClient } from "https://esm.sh/@supabase/supabase-js@2.49.1";

const SUPABASE_URL = "https://yqemtsbdnypgmkuyncxh.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJ5cWVtdHNiZG55cGdta3V5bmN4aCIsInJlZiI6InlxZW10c2JkbnlwZ21rdXluY3hoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODAyNjYwMTUsImV4cCI6MjA5NTg0MjAxNX0.gwgdCncqRKKgC8ebj7qIdT-vA4J-wOVd2O9DSa7xEOs";
const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
const LEDGER_KEY = "haka_transfer_export_ledger_v1";
let paymentReviewDate = "";

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
  .payment-review-date-filter {
    display: grid;
    grid-template-columns: minmax(150px, 1fr) auto auto;
    gap: 10px;
    align-items: end;
    margin: 0 0 12px;
    padding: 12px;
    border: 1px solid #d9e7e2;
    border-radius: 8px;
    background: #f8fbfa;
  }
  .payment-review-date-filter label {
    display: grid;
    gap: 6px;
    color: #596579;
    font-size: 13px;
    font-weight: 900;
  }
  .payment-review-date-filter input {
    min-height: 40px;
    padding: 0 10px;
    border: 1px solid #dce2ea;
    border-radius: 8px;
    color: #162033;
    background: #ffffff;
  }
  .payment-review-date-filter button {
    min-height: 40px;
    padding: 0 12px;
    border: 1px solid #d9dfe8;
    border-radius: 8px;
    color: #253247;
    background: #ffffff;
    font-size: 13px;
    font-weight: 900;
  }
  .payment-review-date-filter button.primary {
    border-color: #237c63;
    color: #ffffff;
    background: #237c63;
  }
  .payment-review-empty {
    padding: 18px;
    border: 1px solid #dfe6ee;
    border-radius: 8px;
    color: #667386;
    background: #ffffff;
    text-align: center;
    font-weight: 900;
  }
  @media (max-width: 720px) {
    .payment-review-date-filter { grid-template-columns: 1fr; }
    .payment-review-date-filter button { width: 100%; }
  }
`;
document.head.appendChild(style);

function today() { return new Date().toISOString().slice(0, 10); }
function ledger() { try { return JSON.parse(localStorage.getItem(LEDGER_KEY) || "{}"); } catch { return {}; } }
function saveLedger(data) { localStorage.setItem(LEDGER_KEY, JSON.stringify(data)); }
function digits(value) { return String(value || "").replace(/[^\d]/g, ""); }
function escapeHtml(value) { return String(value ?? "").replace(/[&<>"]/g, (char) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" })[char]); }
function excelCell(value, style = "") { return `<td${style ? ` style="${style}"` : ""}>${escapeHtml(value)}</td>`; }
function cardRequestedDate(card) {
  const detailItems = [...card.querySelectorAll(".payment-detail-grid div")];
  const dateBox = detailItems.find((box) => box.textContent.includes("신청일"));
  return dateBox?.querySelector("strong")?.textContent?.trim() || "";
}
function inRange(payment, startDate, endDate) {
  const date = String(payment.requested_at || "").slice(0, 10);
  if (!date) return false;
  if (startDate && date < startDate) return false;
  if (endDate && date > endDate) return false;
  return true;
}
function amountOf(payment) { return Number(payment.net_amount || payment.amount || 0); }
function ready(payment) { return payment.vendor_bank && payment.vendor_account_number && payment.vendor_account_holder && amountOf(payment) > 0; }
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
  const rows = payments.map((payment) => [payment.vendor_bank, digits(payment.vendor_account_number), amountOf(payment), payment.vendor_account_holder || payment.vendor]);
  const tableRows = [`<tr>${headers.map((header) => excelCell(header)).join("")}</tr>`, ...rows.map((row) => `<tr>${row.map((cell, index) => excelCell(cell, index === 1 ? "mso-number-format:'\\@';" : "")).join("")}</tr>`)];
  const workbook = `<html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel"><head><meta charset="UTF-8" /></head><body><table>${tableRows.join("")}</table></body></html>`;
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
    data[payment.id] = { exportedAt, periodText, store: payment.store, vendor: payment.vendor, amount: amountOf(payment), requestedAt: payment.requested_at };
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
  if (!payments.length) { alert("다운로드할 승인 완료 건이 없습니다."); return; }
  if (duplicatePayments.length) {
    const proceed = confirm(`${duplicatePayments.length}건은 이미 이체 파일로 내려받은 기록이 있습니다.\n중복 이체 방지를 위해 제외하고 ${newPayments.length}건만 다운로드할까요?`);
    if (!proceed) return;
  }
  if (!newPayments.length) { alert("새로 다운로드할 건이 없습니다. 이미 내려받은 건만 있습니다."); return; }
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
function findPaymentReviewPanel() {
  return [...document.querySelectorAll("article.panel")].find((item) => item.querySelector("h2")?.textContent?.includes("결제 신청 검토"));
}
function addPaymentReviewDateFilter() {
  const panel = findPaymentReviewPanel();
  if (!panel || panel.querySelector(".payment-review-date-filter")) return;
  const filter = document.createElement("div");
  filter.className = "payment-review-date-filter";
  filter.innerHTML = `
    <label>신청일 조회<input type="date" data-payment-review-date value="${escapeHtml(paymentReviewDate)}" /></label>
    <button class="primary" type="button" data-payment-review-filter>조회</button>
    <button type="button" data-payment-review-clear>전체 보기</button>
  `;
  panel.querySelector(".bulk-actions")?.insertAdjacentElement("beforebegin", filter) || panel.querySelector(".panel-head")?.insertAdjacentElement("afterend", filter);
}
function filterPaymentReviewCards() {
  const panel = findPaymentReviewPanel();
  if (!panel) return;
  addPaymentReviewDateFilter();
  panel.querySelector("[data-payment-review-date]") && (panel.querySelector("[data-payment-review-date]").value = paymentReviewDate);
  const cards = [...panel.querySelectorAll(".payment-review-card")];
  let visibleCount = 0;
  cards.forEach((card) => {
    const show = !paymentReviewDate || cardRequestedDate(card) === paymentReviewDate;
    card.style.display = show ? "" : "none";
    if (!show) card.querySelector(".payment-select") && (card.querySelector(".payment-select").checked = false);
    if (show) visibleCount += 1;
  });
  panel.querySelector(".payment-review-empty")?.remove();
  if (!visibleCount && cards.length) {
    const empty = document.createElement("div");
    empty.className = "payment-review-empty";
    empty.textContent = `${paymentReviewDate} 신청 건이 없습니다.`;
    panel.querySelector(".payment-review-list")?.appendChild(empty);
  }
}
function highlightPaymentDates() {
  document.querySelectorAll(".payment-review-card").forEach((card) => {
    if (card.querySelector(".payment-date-chip")) return;
    const date = cardRequestedDate(card);
    const summary = card.querySelector(".payment-summary-meta");
    if (date && summary) summary.insertAdjacentHTML("afterbegin", `<span class="payment-date-chip">신청일 ${escapeHtml(date)}</span>`);
  });
}

document.addEventListener("click", (event) => {
  const reviewFilter = event.target.closest?.("[data-payment-review-filter]");
  if (reviewFilter) {
    event.preventDefault(); event.stopPropagation();
    const panel = findPaymentReviewPanel();
    paymentReviewDate = panel?.querySelector("[data-payment-review-date]")?.value || "";
    filterPaymentReviewCards();
    return;
  }
  const reviewClear = event.target.closest?.("[data-payment-review-clear]");
  if (reviewClear) {
    event.preventDefault(); event.stopPropagation();
    paymentReviewDate = "";
    filterPaymentReviewCards();
    return;
  }
  const selectAll = event.target.closest?.("[data-select-pending-payments]");
  if (selectAll) {
    event.stopPropagation();
    setTimeout(() => {
      const panel = findPaymentReviewPanel();
      panel?.querySelectorAll(".payment-review-card").forEach((card) => {
        const checkbox = card.querySelector(".payment-select");
        if (checkbox) checkbox.checked = card.style.display !== "none" && selectAll.checked;
      });
    }, 0);
    return;
  }
  const button = event.target.closest?.("[data-bank-transfer-download]");
  if (!button) return;
  event.preventDefault(); event.stopPropagation(); event.stopImmediatePropagation();
  guardedDownload(button).catch((error) => alert(`이체 파일 생성 실패: ${error.message}`));
}, true);

const observer = new MutationObserver(() => {
  window.clearTimeout(window.__paymentGuardTimer);
  window.__paymentGuardTimer = window.setTimeout(() => {
    addTransferNotice();
    highlightPaymentDates();
    filterPaymentReviewCards();
  }, 120);
});
observer.observe(document.body, { childList: true, subtree: true });
addTransferNotice();
highlightPaymentDates();
filterPaymentReviewCards();
