function hakaParseAmount(value) {
  return Number(String(value || "").replace(/[^\d]/g, "")) || 0;
}

function hakaFormatKRW(value) {
  return new Intl.NumberFormat("ko-KR", { style: "currency", currency: "KRW", maximumFractionDigits: 0 }).format(Number(value || 0));
}

function hakaBusinessIncomeTax(amount, taxType) {
  if (taxType !== "사업소득 3.3%") return { incomeTax: 0, localTax: 0, withholding: 0, net: amount };
  const incomeTax = Math.floor(amount * 0.03);
  const localTax = Math.floor((incomeTax * 0.1) / 10) * 10;
  const withholding = incomeTax + localTax;
  return { incomeTax, localTax, withholding, net: amount - withholding };
}

function normalizePaymentTax(payment) {
  if (!payment || payment.tax_type !== "사업소득 3.3%") return payment;
  const amount = Number(payment.amount || 0);
  const tax = hakaBusinessIncomeTax(amount, payment.tax_type);
  return {
    ...payment,
    withholding_amount: tax.withholding,
    net_amount: tax.net
  };
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
  .business-tax-detail {
    display: block;
    grid-column: 1 / -1;
    margin-top: 4px;
    color: #5f6d80;
    font-size: 12px;
    font-weight: 900;
  }
`;
document.head.appendChild(style);

const taxObserver = new MutationObserver(() => {
  clearTimeout(window.__taxCalculationFixTimer);
  window.__taxCalculationFixTimer = setTimeout(patchTaxPreview, 150);
});
taxObserver.observe(document.body, { childList: true, subtree: true });
patchTaxPreview();
