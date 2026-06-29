const LEDGER_KEY = "haka_transfer_export_ledger_v1";

const style = document.createElement("style");
style.textContent = `
  .transfer-guard-notice { margin: 0 0 12px; padding: 12px; border-radius: 8px; color: #78540c; background: #fff5dc; font-size: 13px; line-height: 1.5; font-weight: 800; }
  .transfer-duplicate-box { grid-column: 1 / -1; margin: 0; padding: 12px 14px; border: 1px solid #f1b6b2; border-radius: 8px; color: #a7332b; background: #fff1f0; font-size: 13px; line-height: 1.45; font-weight: 900; }
  .transfer-duplicate-list { grid-column: 1 / -1; display: grid; gap: 6px; margin: 0; padding: 10px 12px; border: 1px solid #ead7d5; border-radius: 8px; background: #fffafa; color: #5b2a27; font-size: 12px; font-weight: 800; }
  .transfer-duplicate-list div { display: grid; grid-template-columns: minmax(0, 1fr) auto; gap: 10px; align-items: center; }
  .transfer-duplicate-list span:first-child { overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
  .transfer-range-summary { margin: 10px 0 12px; padding: 12px 14px; border: 1px solid #d9e7e2; border-radius: 8px; background: #f8fbfa; color: #526174; font-size: 13px; font-weight: 900; line-height: 1.45; }
  .transfer-range-summary strong { color: #061326; }
  .payment-date-chip { display: inline-flex !important; align-items: center; width: max-content; min-height: 24px; padding: 0 8px; border-radius: 999px; color: #1f5fa8; background: #e8f1ff; font-size: 12px; font-weight: 900; white-space: nowrap; }
`;
document.head.appendChild(style);

function today() { return new Date().toISOString().slice(0, 10); }
function ledger() { try { return JSON.parse(localStorage.getItem(LEDGER_KEY) || "{}"); } catch { return {}; } }
function saveLedger(data) { localStorage.setItem(LEDGER_KEY, JSON.stringify(data)); }
function digits(value) { return String(value || "").replace(/[^\d]/g, ""); }
function escapeHtml(value) { return String(value ?? "").replace(/[&<>"]/g, (char) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" })[char]); }
function excelCell(value, style = "") { return `<td${style ? ` style="${style}"` : ""}>${escapeHtml(value)}</td>`; }
function formatKRW(value) { return new Intl.NumberFormat("ko-KR", { style: "currency", currency: "KRW", maximumFractionDigits: 0 }).format(Number(value || 0)); }
function parseAmount(value) { return Number(String(value || "").replace(/[^\d.-]/g, "")) || 0; }
function norm(value) { return String(value || "").trim(); }
function text(node) { return norm(node?.textContent); }
function keyOf(payment) {
  return [payment.store, payment.vendor, payment.payment_item, payment.requested_at, payment.vendor_bank, digits(payment.vendor_account_number), payment.vendor_account_holder, amountOf(payment)].map(norm).join("|");
}
function amountOf(payment) { return Number(payment.net_amount || payment.amount || 0); }
function sumAmount(payments) { return payments.reduce((sum, payment) => sum + amountOf(payment), 0); }
function ready(payment) { return payment.vendor_bank && payment.vendor_account_number && payment.vendor_account_holder && amountOf(payment) > 0; }
function inRange(payment, startDate, endDate) {
  const date = String(payment.requested_at || "").slice(0, 10);
  if (!date) return true;
  if (startDate && date < startDate) return false;
  if (endDate && date > endDate) return false;
  return true;
}
function ledgerRecordFor(payment, data = ledger()) {
  if (data[payment.id]) return data[payment.id];
  const amount = amountOf(payment);
  return Object.values(data).find((record) =>
    norm(record.store) === norm(payment.store) &&
    norm(record.vendor) === norm(payment.vendor) &&
    Number(record.amount || 0) === amount &&
    (!record.requestedAt || !payment.requested_at || String(record.requestedAt).slice(0, 10) === String(payment.requested_at).slice(0, 10))
  );
}
function splitTransferPayments(payments, startDate = "", endDate = "") {
  const data = ledger();
  const approvedReady = payments.filter((payment) => inRange(payment, startDate, endDate)).filter(ready);
  const exported = approvedReady.filter((payment) => ledgerRecordFor(payment, data));
  const fresh = approvedReady.filter((payment) => !ledgerRecordFor(payment, data));
  return { approvedReady, exported, fresh, data };
}
function detailValue(card, labels, fallbackIndex) {
  const items = [...card.querySelectorAll(".payment-detail-grid div")];
  const found = items.find((box) => labels.some((label) => text(box.querySelector("span")).includes(label) || text(box).includes(label)));
  return text(found?.querySelector("strong")) || text(items[fallbackIndex]?.querySelector("strong"));
}
function cardRequestedDate(card) {
  const chip = text(card.querySelector(".payment-date-chip")).replace("신청일", "").trim();
  return chip || detailValue(card, ["신청일"], 11);
}
function paymentFromCard(card) {
  const store = text(card.querySelector(".payment-summary-main strong"));
  const vendor = text(card.querySelector(".payment-summary-main span"));
  const meta = card.querySelector(".payment-summary-meta");
  const status = text(meta?.querySelector(".badge"));
  const itemNode = [...(meta?.querySelectorAll("span") || [])].find((node) => !node.classList.contains("payment-date-chip") && !node.classList.contains("badge"));
  const payment = {
    store,
    vendor,
    payment_item: text(itemNode),
    requested_at: cardRequestedDate(card),
    vendor_bank: detailValue(card, ["입금은행", "은행"], 0),
    vendor_account_number: detailValue(card, ["입금계좌", "계좌"], 1),
    vendor_account_holder: detailValue(card, ["예금주"], 2),
    amount: parseAmount(text(meta?.querySelector("strong")) || detailValue(card, ["실지급", "이번 신청"], 8)),
    net_amount: parseAmount(detailValue(card, ["실지급"], 8)) || parseAmount(text(meta?.querySelector("strong"))),
    status
  };
  payment.id = keyOf(payment);
  return payment;
}
function paymentsFromCards() {
  return [...document.querySelectorAll(".payment-review-card")]
    .map(paymentFromCard)
    .filter((payment) => payment.status.includes("승인"));
}
function paymentsFromTransferTable(panel) {
  const rows = [...panel.querySelectorAll("tbody tr")];
  return rows.map((row) => {
    const cells = [...row.children].map(text);
    const payment = {
      store: cells[0] || "",
      vendor: cells[1] || "",
      payment_item: cells[6] || "",
      requested_at: "",
      vendor_bank: cells[2] || "",
      vendor_account_number: cells[3] || "",
      vendor_account_holder: cells[4] || "",
      amount: parseAmount(cells[5]),
      net_amount: parseAmount(cells[5]),
      status: cells[7] || "승인"
    };
    payment.id = keyOf(payment);
    return payment;
  }).filter((payment) => payment.status.includes("승인"));
}
function currentPaymentsFor(button) {
  const panel = button?.closest("article.panel");
  if (button?.dataset?.bankTransferDownload === "range" && panel?.querySelector("tbody tr")) return paymentsFromTransferTable(panel);
  const cardPayments = paymentsFromCards();
  if (cardPayments.length) return cardPayments;
  if (panel?.querySelector("tbody tr")) return paymentsFromTransferTable(panel);
  return [];
}
function periodFromPanel(panel) {
  const startDate = panel?.querySelector("[data-transfer-start]")?.value || "";
  const endDate = panel?.querySelector("[data-transfer-end]")?.value || "";
  const periodText = startDate || endDate ? `${startDate || "처음"}_${endDate || "오늘"}` : "전체";
  return { startDate, endDate, periodText };
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
  const panel = button.closest("article.panel") || document;
  const { startDate, endDate, periodText } = periodFromPanel(panel);
  const payments = currentPaymentsFor(button);
  const { approvedReady, exported, fresh } = splitTransferPayments(payments, startDate, endDate);
  if (!approvedReady.length) { alert("다운로드할 승인 완료 건이 없습니다."); return; }
  if (!fresh.length) { alert(`새로 다운로드할 건이 없습니다. 이미 이체 파일로 받은 ${exported.length}건은 중복 방지를 위해 제외됩니다.`); return; }
  if (exported.length) alert(`이미 이체 파일로 받은 ${exported.length}건은 중복 방지를 위해 자동 제외하고, 새 ${fresh.length}건만 다운로드합니다.`);
  downloadExcel(fresh, periodText);
  markExported(fresh, periodText);
  refreshTransferSummary(true);
  alert(`${fresh.length}건을 이체 파일로 다운로드했고, 중복 방지 기록을 남겼습니다.`);
}
function duplicateListHtml(exported, data) {
  const recent = exported.slice(-8).reverse();
  if (!recent.length) return "";
  return `<div class="transfer-duplicate-list"><strong>이미 이체 파일 생성된 최근 건</strong>${recent.map((payment) => {
    const record = ledgerRecordFor(payment, data) || {};
    const exportedDate = record.exportedAt ? String(record.exportedAt).slice(0, 10) : "다운로드 기록 있음";
    return `<div><span>${escapeHtml(payment.store)} / ${escapeHtml(payment.vendor)} / ${escapeHtml(payment.payment_item || "-")}</span><span>${escapeHtml(exportedDate)} · ${formatKRW(amountOf(payment))}</span></div>`;
  }).join("")}</div>`;
}
function setAfter(target, html) {
  if (!target?.parentElement) return;
  target.parentElement.querySelectorAll(".transfer-duplicate-box, .transfer-duplicate-list").forEach((node) => node.remove());
  if (html) target.insertAdjacentHTML("afterend", html);
}
function refreshTransferSummary(force = false) {
  const allPayments = paymentsFromCards();
  const allSplit = splitTransferPayments(allPayments);
  document.querySelectorAll(".transfer-download-panel").forEach((panel) => {
    const summary = panel.querySelector(".transfer-summary");
    if (!summary) return;
    summary.innerHTML = `
      <span>승인 전체 ${allPayments.length}건</span>
      <span>새로 다운로드 가능 ${allSplit.fresh.length}건</span>
      <span>이미 이체파일 생성 ${allSplit.exported.length}건</span>
      <strong>${formatKRW(sumAmount(allSplit.fresh))}</strong>
    `;
    panel.querySelectorAll("[data-bank-transfer-download]").forEach((button) => {
      button.textContent = allSplit.fresh.length ? `새 이체 파일 ${allSplit.fresh.length}건` : "새 이체 건 없음";
      button.disabled = !allSplit.fresh.length;
    });
    const duplicateHtml = allSplit.exported.length
      ? `<div class="transfer-duplicate-box">이미 엑셀 다운로드된 ${allSplit.exported.length}건, ${formatKRW(sumAmount(allSplit.exported))}은 중복 방지를 위해 다운로드 합계에서 제외됩니다.</div>${duplicateListHtml(allSplit.exported, allSplit.data)}`
      : "";
    setAfter(summary, duplicateHtml);
  });

  document.querySelectorAll("[data-bank-transfer-download]").forEach((button) => {
    if (button.closest(".transfer-download-panel")) return;
    const panel = button.closest("article.panel") || document;
    const { startDate, endDate } = periodFromPanel(panel);
    const payments = currentPaymentsFor(button);
    const split = splitTransferPayments(payments, startDate, endDate);
    button.textContent = split.fresh.length ? `새 이체 파일 ${split.fresh.length}건` : "새 이체 건 없음";
    button.disabled = !split.fresh.length;
  });

  document.querySelectorAll("[data-transfer-start]").forEach((startInput) => {
    const panel = startInput.closest("article.panel");
    if (!panel) return;
    const { startDate, endDate } = periodFromPanel(panel);
    const payments = paymentsFromTransferTable(panel);
    const split = splitTransferPayments(payments, startDate, endDate);
    let box = panel.querySelector(".transfer-range-summary");
    if (!box) {
      box = document.createElement("div");
      box.className = "transfer-range-summary";
      panel.querySelector(".date-filter")?.insertAdjacentElement("afterend", box);
    }
    box.innerHTML = `조회 범위 기준: 새로 다운로드 가능 <strong>${split.fresh.length}건 ${formatKRW(sumAmount(split.fresh))}</strong> / 이미 다운로드됨 <strong>${split.exported.length}건 ${formatKRW(sumAmount(split.exported))}</strong>`;
  });
}
function addTransferNotice() {
  const panel = [...document.querySelectorAll("article.panel")].find((item) => item.querySelector("h2")?.textContent?.includes("이체"));
  if (!panel || panel.querySelector(".transfer-guard-notice")) return;
  const notice = document.createElement("div");
  notice.className = "transfer-guard-notice";
  notice.textContent = "중복 방지: 이 브라우저에서 이미 엑셀로 내려받은 승인건은 다음 다운로드 때 자동 제외됩니다.";
  panel.querySelector(".panel-head")?.insertAdjacentElement("afterend", notice);
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
  const button = event.target.closest?.("[data-bank-transfer-download]");
  if (!button) return;
  event.preventDefault();
  event.stopPropagation();
  event.stopImmediatePropagation();
  guardedDownload(button);
}, true);

document.addEventListener("click", (event) => {
  if (event.target.closest?.("[data-transfer-filter], [data-transfer-clear]")) setTimeout(() => refreshTransferSummary(true), 250);
}, true);

const observer = new MutationObserver(() => {
  window.clearTimeout(window.__paymentGuardTimer);
  window.__paymentGuardTimer = window.setTimeout(() => {
    addTransferNotice();
    highlightPaymentDates();
    refreshTransferSummary();
  }, 180);
});
observer.observe(document.body, { childList: true, subtree: true });
addTransferNotice();
highlightPaymentDates();
refreshTransferSummary(true);
