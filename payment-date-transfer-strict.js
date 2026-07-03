(() => {
  if (window.__hakaPaymentDateTransferStrict) return;
  window.__hakaPaymentDateTransferStrict = true;

  const moneyNumber = (value) => Number(String(value || "").replace(/[^\d.-]/g, "")) || 0;
  const clean = (value) => String(value || "").replace(/\s+/g, " ").trim();
  const digits = (value) => String(value || "").replace(/[^\d]/g, "");
  const esc = (value) => String(value ?? "").replace(/[&<>"]/g, (char) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" })[char]);

  function cards() {
    return Array.from(document.querySelectorAll(".payment-review-card"));
  }

  function isVisible(el) {
    return !!el && el.offsetParent !== null && getComputedStyle(el).display !== "none" && getComputedStyle(el).visibility !== "hidden";
  }

  function cardText(card) {
    return clean(card?.innerText || card?.textContent || "");
  }

  function cardDate(card) {
    const existing = clean(card.querySelector(".payment-date-chip")?.textContent || "").replace("신청일", "").trim();
    if (/^\d{4}-\d{2}-\d{2}$/.test(existing)) return existing;
    const text = cardText(card);
    const labeled = text.match(/신청일\s*(\d{4}-\d{2}-\d{2})/);
    if (labeled) return labeled[1];
    const dates = text.match(/20\d{2}-\d{2}-\d{2}/g) || [];
    return dates[0] || "";
  }

  function statusOf(card) {
    return clean(card.querySelector(".badge")?.textContent || cardText(card));
  }

  function isApproved(card) {
    const status = statusOf(card);
    return status.includes("승인") && !status.includes("반려") && !status.includes("신청");
  }

  function detailValue(card, labels, fallbackIndex) {
    const boxes = Array.from(card.querySelectorAll(".payment-detail-grid div"));
    const found = boxes.find((box) => labels.some((label) => clean(box.textContent).includes(label)));
    if (found) return clean(found.querySelector("strong")?.textContent || found.textContent.replace(labels.find((label) => found.textContent.includes(label)) || "", ""));
    return clean(boxes[fallbackIndex]?.querySelector("strong")?.textContent || "");
  }

  function paymentFromCard(card) {
    const meta = card.querySelector(".payment-summary-meta");
    const main = card.querySelector(".payment-summary-main");
    const spans = Array.from(meta?.querySelectorAll("span") || []);
    const item = clean(spans.find((node) => !node.classList.contains("payment-date-chip") && !node.classList.contains("badge"))?.textContent || detailValue(card, ["항목", "결제 항목"], 3));
    const amount = moneyNumber(meta?.querySelector("strong")?.textContent || detailValue(card, ["실지급", "이번 신청", "금액"], 8));
    return {
      store: clean(main?.querySelector("strong")?.textContent || detailValue(card, ["매장"], 0)),
      vendor: clean(main?.querySelector("span")?.textContent || detailValue(card, ["업체"], 1)),
      item,
      date: cardDate(card),
      bank: detailValue(card, ["입금은행", "은행"], 0),
      account: detailValue(card, ["입금계좌", "계좌"], 1),
      holder: detailValue(card, ["예금주"], 2),
      amount
    };
  }

  function dateInputs() {
    const inputs = Array.from(document.querySelectorAll("input[type='date']"));
    return { start: inputs[0]?.value || "", end: inputs[1]?.value || "" };
  }

  function inRange(date, start, end) {
    if (!date) return true;
    if (start && date < start) return false;
    if (end && date > end) return false;
    return true;
  }

  function selectedCards() {
    const checked = Array.from(document.querySelectorAll(".transfer-payment-select:checked, .payment-select:checked"));
    return checked.map((box) => box.closest(".payment-review-card")).filter(Boolean);
  }

  function exportCards() {
    const selected = selectedCards();
    const base = selected.length ? selected : cards().filter(isVisible);
    const { start, end } = dateInputs();
    return base.filter((card) => isApproved(card)).filter((card) => inRange(cardDate(card), start, end));
  }

  function ensureDateChips() {
    cards().forEach((card) => {
      const date = cardDate(card);
      if (!date) return;
      let chip = card.querySelector(".payment-date-chip");
      if (!chip) {
        chip = document.createElement("span");
        chip.className = "payment-date-chip";
        const meta = card.querySelector(".payment-summary-meta") || card.querySelector("summary") || card;
        meta.insertAdjacentElement("afterbegin", chip);
      }
      chip.textContent = `신청일 ${date}`;
    });
  }

  function excelCell(value, style = "") {
    return `<td${style ? ` style="${style}"` : ""}>${esc(value)}</td>`;
  }

  function downloadExcel(payments) {
    const headers = ["*입금은행", "*입금계좌", "*입금액", "고객관리성명"];
    const rows = payments.map((payment) => [payment.bank, digits(payment.account), payment.amount, payment.holder || payment.vendor]);
    const html = `<html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel"><head><meta charset="UTF-8" /></head><body><table><tr>${headers.map((header) => excelCell(header)).join("")}</tr>${rows.map((row) => `<tr>${row.map((cell, index) => excelCell(cell, index === 1 ? "mso-number-format:'\\@';" : "")).join("")}</tr>`).join("")}</table></body></html>`;
    const blob = new Blob([html], { type: "application/vnd.ms-excel;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    const { start, end } = dateInputs();
    link.href = url;
    link.download = `은행대량이체_${start || "전체"}_${end || start || "전체"}.xls`;
    document.body.appendChild(link);
    link.click();
    link.remove();
    URL.revokeObjectURL(url);
  }

  function handleTransferDownload(button, event) {
    if (!cards().length) return false;
    const selected = selectedCards();
    const payments = exportCards().map(paymentFromCard).filter((payment) => payment.bank && payment.account && payment.holder && payment.amount > 0);
    if (!payments.length) {
      alert(selected.length ? "선택한 승인건 중 이체 가능한 건이 없습니다." : "현재 조회 범위에서 이체 가능한 승인건이 없습니다.");
      event.preventDefault(); event.stopPropagation(); event.stopImmediatePropagation();
      return true;
    }
    event.preventDefault(); event.stopPropagation(); event.stopImmediatePropagation();
    downloadExcel(payments);
    alert(`${payments.length}건만 이체파일로 생성했습니다. 날짜 범위와 체크 선택을 적용했습니다.`);
    return true;
  }

  const style = document.createElement("style");
  style.textContent = `
    .payment-date-chip {
      display: inline-flex !important;
      align-items: center !important;
      width: max-content !important;
      min-height: 24px !important;
      padding: 0 8px !important;
      border-radius: 999px !important;
      color: #1f5fa8 !important;
      background: #e8f1ff !important;
      font-size: 12px !important;
      font-weight: 900 !important;
      white-space: nowrap !important;
    }
  `;
  document.head.appendChild(style);

  document.addEventListener("click", (event) => {
    const button = event.target.closest?.("[data-bank-transfer-download]");
    if (button && handleTransferDownload(button, event)) return;
    if (event.target.closest?.("[data-transfer-filter], [data-transfer-clear]")) setTimeout(ensureDateChips, 250);
  }, true);

  const observer = new MutationObserver(() => {
    clearTimeout(window.__hakaPaymentDateTransferTimer);
    window.__hakaPaymentDateTransferTimer = setTimeout(ensureDateChips, 120);
  });
  observer.observe(document.documentElement, { childList: true, subtree: true });
  ensureDateChips();
  setTimeout(ensureDateChips, 800);
})();
