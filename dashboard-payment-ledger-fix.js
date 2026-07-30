(() => {
  const VERSION = "dashboard-payment-ledger-fix-1";
  if (window.__hakaDashboardPaymentLedgerFixV1) return;
  window.__hakaDashboardPaymentLedgerFixV1 = true;

  const clean = (value) => String(value || "").replace(/\s+/g, " ").trim();

  function pageTitle() {
    return clean(document.querySelector(".topbar h1")?.textContent || document.querySelector("h1")?.textContent || "");
  }

  function isDashboard() {
    const title = pageTitle();
    return title.includes("대시보드") || title.includes("전체 관리자") && document.querySelector(".kpis");
  }

  function isPaymentPage() {
    const title = pageTitle();
    return (title.includes("결제 신청") || title.includes("결제신청")) && !title.includes("대시보드");
  }

  function apply() {
    const ledger = document.querySelector("[data-haka-payment-ledger]");
    if (ledger && !isPaymentPage()) ledger.remove();
    document.body.classList.toggle("haka-dashboard-page", isDashboard());
  }

  const style = document.createElement("style");
  style.textContent = `
    body.haka-dashboard-page [data-haka-payment-ledger] { display: none !important; }
    .haka-status-tabs { display: grid !important; grid-template-columns: repeat(auto-fit, minmax(130px, 1fr)) !important; gap: 8px !important; }
    .haka-status-tabs button, .haka-ledger-filters button { min-height: 42px !important; white-space: normal !important; word-break: keep-all !important; line-height: 1.25 !important; }
    .haka-ledger-filters { display: grid !important; grid-template-columns: repeat(auto-fit, minmax(180px, 1fr)) !important; gap: 12px !important; align-items: end !important; }
    .haka-ledger-filters label { min-width: 0 !important; }
    .haka-ledger-filters input { width: 100% !important; min-width: 0 !important; box-sizing: border-box !important; }
    .haka-ledger-summary { display: grid !important; grid-template-columns: repeat(auto-fit, minmax(160px, 1fr)) !important; gap: 10px !important; }
    @media (max-width: 760px) {
      .haka-status-tabs, .haka-ledger-filters, .haka-ledger-summary { grid-template-columns: 1fr !important; }
    }
  `;
  document.head.appendChild(style);

  const observer = new MutationObserver(() => {
    clearTimeout(window.__hakaDashboardPaymentLedgerFixTimer);
    window.__hakaDashboardPaymentLedgerFixTimer = setTimeout(apply, 80);
  });

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", apply, { once: true });
  else apply();
  observer.observe(document.documentElement, { childList: true, subtree: true });
  window.addEventListener("focus", apply);

  console.info(`[HAKA] ${VERSION} loaded`);
})();
