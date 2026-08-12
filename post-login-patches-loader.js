(() => {
  if (window.__hakaPostLoginPatchesLoader) return;
  window.__hakaPostLoginPatchesLoader = true;

  const base = "/haka-construction-dashboard/";
  const scripts = [
    { src: "https://cdn.sheetjs.com/xlsx-0.20.3/package/dist/xlsx.full.min.js" },
    { src: "https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2" },
    { src: `${base}tax-calculation-fix.js?v=tax-calc-2`, type: "module" },
    { src: `${base}store-tabs.js?v=store-tabs-4`, type: "module" },
    { src: `${base}transfer-voucher.js?v=transfer-voucher-1`, type: "module" },
    { src: `${base}payment-guard.js?v=payment-guard-6`, type: "module" },
    { src: `${base}transfer-select-fix.js?v=transfer-visible-count-2`, type: "module" },
    { src: `${base}rejected-approve.js?v=rejected-approve-1`, type: "module" },
    { src: `${base}payment-range-filter.js?v=payment-status-layout-8`, type: "module" },
    { src: `${base}payment-range-sticky.js?v=payment-range-sticky-1`, type: "module" },
    { src: `${base}menu-workflow-fix.js?v=menu-workflow-1` },
    { src: `${base}store-document-auth-fix.js?v=store-doc-auth-1` },
    { src: `${base}excel-amount-row-fix.js?v=excel-amount-1` },
    { src: `${base}selected-margin-fix.js?v=selected-margin-1` },
    { src: `${base}upload-filename-fix.js?v=upload-name-1` },
    { src: `${base}bank-transfer-table-fix.js?v=bank-transfer-table-1` },
    { src: `${base}bank-transfer-real-xls.js?v=real-xls-transfer-preserve-6` },
    { src: `${base}construction-start-list-filter.js?v=construction-start-filter-2` },
    { src: `${base}payment-workflow-stabilizer.js?v=payment-workflow-2` },
    { src: `${base}dashboard-payment-ledger-fix.js?v=dashboard-ledger-fix-1` },
    { src: `${base}payment-edit-stable.js?v=payment-edit-1` },
    { src: `${base}attachment-view.js?v=attachment-history-safe-3` }
  ];

  function isLoginScreen() {
    const text = document.body?.innerText || "";
    return text.includes("HAKA Construction") && text.includes("로그인") && text.includes("계정 만들기") && !!document.querySelector("input[type='password']");
  }

  function isLoggedInScreen() {
    const text = document.body?.innerText || "";
    if (!text.trim()) return false;
    if (isLoginScreen()) return false;
    return text.includes("로그아웃") || text.includes("결제 신청") || text.includes("대시보드") || text.includes("전체 관리자") || text.includes("인테리어 공사실장");
  }

  function appendScript(item) {
    return new Promise((resolve) => {
      const existing = [...document.scripts].find((script) => script.src === item.src || script.src.startsWith(item.src.split("?")[0]));
      if (existing) return resolve();
      const script = document.createElement("script");
      script.src = item.src;
      script.crossOrigin = "anonymous";
      if (item.type) script.type = item.type;
      script.onload = () => resolve();
      script.onerror = () => resolve();
      document.head.appendChild(script);
    });
  }

  async function loadPatches() {
    if (window.__hakaPostLoginPatchesLoaded) return;
    if (!isLoggedInScreen()) return;
    window.__hakaPostLoginPatchesLoaded = true;
    for (const item of scripts) await appendScript(item);
  }

  function schedule() {
    clearTimeout(window.__hakaPostLoginPatchesTimer);
    window.__hakaPostLoginPatchesTimer = setTimeout(loadPatches, 350);
  }

  new MutationObserver(schedule).observe(document.documentElement, { childList: true, subtree: true });
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", schedule);
  schedule();
})();
