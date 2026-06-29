function hakaParseAmount(value) {
  return Number(String(value || "").replace(/[^\d]/g, "")) || 0;
}

function hakaFormatKRW(value) {
  return new Intl.NumberFormat("ko-KR", { style: "currency", currency: "KRW", maximumFractionDigits: 0 }).format(Number(value || 0));
}

function hakaBusinessIncomeTax(amount, taxType = "사업소득 3.3%") {
  if (taxType !== "사업소득 3.3%") return { incomeTax: 0, localTax: 0, withholding: 0, net: amount };
  const incomeTax = Math.floor(Number(amount || 0) * 0.03);
  const localTax = Math.floor((incomeTax * 0.1) / 10) * 10;
  const withholding = incomeTax + localTax;
  return { incomeTax, localTax, withholding, net: Number(amount || 0) - withholding };
}

function normalizePaymentTax(payment) {
  if (!payment || payment.tax_type !== "사업소득 3.3%") return payment;
  const amount = Number(payment.amount || 0);
  const tax = hakaBusinessIncomeTax(amount, payment.tax_type);
  return { ...payment, withholding_amount: tax.withholding, net_amount: tax.net };
}

function updateTaxPreview(form) {
  const amount = hakaParseAmount(form.querySelector("[name='amount']")?.value);
  const taxType = form.querySelector("[name='tax_type']")?.value || "일반 송금";
  const tax = hakaBusinessIncomeTax(amount, taxType);
  const withholdingPreview = form.querySelector("[data-withholding-preview]");
  const netPreview = form.querySelector("[data-net-preview]");
  if (withholdingPreview) withholdingPreview.textContent = hakaFormatKRW(tax.withholding);
  if (netPreview) netPreview.textContent = hakaFormatKRW(tax.net);

  let detail = form.querySelector("[data-business-tax-detail]");
  if (taxType === "사업소득 3.3%") {
    if (!detail) {
      detail = document.createElement("span");
      detail.dataset.businessTaxDetail = "true";
      detail.className = "business-tax-detail";
      form.querySelector(".calc-box")?.appendChild(detail);
    }
    detail.textContent = `소득세 ${hakaFormatKRW(tax.incomeTax)} + 지방세 ${hakaFormatKRW(tax.localTax)}`;
  } else {
    detail?.remove();
  }
}

function patchTaxPreview() {
  document.querySelectorAll("form").forEach((form) => {
    if (!form.querySelector("[name='tax_type']") || !form.querySelector("[name='amount']")) return;
    if (!form.dataset.taxFixBound) {
      form.dataset.taxFixBound = "true";
      form.addEventListener("input", () => setTimeout(() => updateTaxPreview(form), 0), true);
      form.addEventListener("change", () => setTimeout(() => updateTaxPreview(form), 0), true);
    }
    updateTaxPreview(form);
  });
}

function detailBoxByLabel(card, label) {
  return [...card.querySelectorAll(".payment-detail-grid div")].find((box) => box.textContent.includes(label));
}

function strongText(box) {
  return String(box?.querySelector("strong")?.textContent || "").trim();
}

function patchExistingBusinessIncomeCards() {
  document.querySelectorAll(".payment-review-card").forEach((card) => {
    const taxTypeBox = detailBoxByLabel(card, "지급 유형");
    if (!strongText(taxTypeBox).includes("사업소득")) return;
    const amountBox = detailBoxByLabel(card, "이번 신청");
    const withholdingBox = detailBoxByLabel(card, "원천징수");
    const netBox = detailBoxByLabel(card, "실지급");
    const summaryAmount = card.querySelector(".payment-summary-meta > strong");
    const amount = hakaParseAmount(strongText(amountBox) || summaryAmount?.textContent);
    if (!amount) return;
    const tax = hakaBusinessIncomeTax(amount, "사업소득 3.3%");
    if (withholdingBox?.querySelector("strong")) withholdingBox.querySelector("strong").textContent = hakaFormatKRW(tax.withholding);
    if (netBox?.querySelector("strong")) netBox.querySelector("strong").textContent = hakaFormatKRW(tax.net);
    if (summaryAmount) summaryAmount.textContent = hakaFormatKRW(tax.net);
    if (!card.querySelector(".business-tax-chip")) {
      card.querySelector(".payment-summary-meta")?.insertAdjacentHTML("beforeend", `<span class="business-tax-chip">소득세 ${hakaFormatKRW(tax.incomeTax)} / 지방세 ${hakaFormatKRW(tax.localTax)}</span>`);
    }
  });
}

const originalFetch = window.fetch.bind(window);
window.fetch = async (input, init = {}) => {
  const url = typeof input === "string" ? input : input?.url || "";
  const method = String(init?.method || input?.method || "GET").toUpperCase();
  const isPaymentWrite = url.includes("/rest/v1/payments") && ["POST", "PATCH"].includes(method);
  if (isPaymentWrite && init?.body) {
    try {
      const parsed = JSON.parse(init.body);
      const fixed = Array.isArray(parsed) ? parsed.map(normalizePaymentTax) : normalizePaymentTax(parsed);
      init = { ...init, body: JSON.stringify(fixed) };
    } catch {}
  }
  return originalFetch(input, init);
};

const style = document.createElement("style");
style.textContent = `
  .business-tax-detail, .business-tax-chip {
    display: inline-flex;
    align-items: center;
    width: fit-content;
    min-height: 26px;
    padding: 0 9px;
    border-radius: 999px;
    color: #78540c;
    background: #fff5dc;
    font-size: 12px;
    font-weight: 900;
    white-space: nowrap;
  }
  .business-tax-detail { grid-column: 1 / -1; margin-top: 4px; }
`;
document.head.appendChild(style);

function runTaxFixes() {
  patchTaxPreview();
  patchExistingBusinessIncomeCards();
}

const taxObserver = new MutationObserver(() => {
  clearTimeout(window.__taxCalculationFixTimer);
  window.__taxCalculationFixTimer = setTimeout(runTaxFixes, 150);
});
taxObserver.observe(document.body, { childList: true, subtree: true });
setInterval(runTaxFixes, 1000);
runTaxFixes();
