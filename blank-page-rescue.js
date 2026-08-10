(() => {
  if (window.__hakaBlankPageRescue) return;
  window.__hakaBlankPageRescue = true;

  const AUTH_KEY_PARTS = ["supabase", "sb-yqemtsbdnypgmkuyncxh", "haka_transfer_export_ledger_v1"];

  function clearAuthOnly() {
    const keys = [];
    for (let i = 0; i < localStorage.length; i += 1) {
      const key = localStorage.key(i);
      if (!key) continue;
      if (key.includes("haka_transfer_export_ledger_v1")) continue;
      if (AUTH_KEY_PARTS.some((part) => key.includes(part))) keys.push(key);
    }
    keys.forEach((key) => localStorage.removeItem(key));
    sessionStorage.clear();
  }

  function hasVisibleAppContent() {
    const text = (document.body?.innerText || "").replace(/\s+/g, "").trim();
    if (text.length > 12) return true;
    const app = document.querySelector("#app");
    if (!app) return false;
    const box = app.getBoundingClientRect();
    return box.width > 20 && box.height > 20 && app.children.length > 0;
  }

  function showRescue() {
    if (document.querySelector("[data-blank-rescue]")) return;
    const style = document.createElement("style");
    style.textContent = `
      [data-blank-rescue] {
        position: fixed !important;
        inset: 0 !important;
        z-index: 2147483647 !important;
        display: grid !important;
        place-items: center !important;
        padding: 24px !important;
        background: #f4f7f8 !important;
        color: #162033 !important;
        font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif !important;
      }
      [data-blank-rescue] section {
        width: min(420px, 100%) !important;
        display: grid !important;
        gap: 14px !important;
        padding: 28px !important;
        border: 1px solid #dfe6ee !important;
        border-radius: 8px !important;
        background: #fff !important;
        box-shadow: 0 18px 50px rgba(20, 32, 48, .14) !important;
      }
      [data-blank-rescue] h1 { margin: 0 !important; font-size: 28px !important; line-height: 1.2 !important; letter-spacing: 0 !important; }
      [data-blank-rescue] p { margin: 0 !important; color: #526174 !important; font-size: 15px !important; line-height: 1.55 !important; font-weight: 700 !important; word-break: keep-all !important; }
      [data-blank-rescue] button {
        min-height: 48px !important;
        border: 0 !important;
        border-radius: 8px !important;
        background: #237c63 !important;
        color: #fff !important;
        font-size: 16px !important;
        font-weight: 900 !important;
        cursor: pointer !important;
      }
      [data-blank-rescue] a {
        display: inline-flex !important;
        justify-content: center !important;
        align-items: center !important;
        min-height: 44px !important;
        border: 1px solid #d6e0e8 !important;
        border-radius: 8px !important;
        color: #162033 !important;
        background: #fff !important;
        text-decoration: none !important;
        font-weight: 900 !important;
      }
    `;
    document.head.appendChild(style);
    const root = document.createElement("main");
    root.dataset.blankRescue = "true";
    root.innerHTML = `
      <section>
        <h1>화면 복구</h1>
        <p>브라우저에 남은 이전 로그인 정보 때문에 화면이 멈춘 상태입니다. 아래 버튼을 누르면 저장된 로그인 정보만 초기화하고 로그인 화면을 다시 엽니다.</p>
        <button type="button" data-clear-haka-login>로그인 상태 초기화 후 다시 열기</button>
        <a href="/haka-construction-dashboard/?v=blank-rescue-manual">그냥 다시 열기</a>
      </section>
    `;
    document.body.appendChild(root);
  }

  document.addEventListener("click", (event) => {
    const button = event.target.closest?.("[data-clear-haka-login]");
    if (!button) return;
    event.preventDefault();
    clearAuthOnly();
    location.replace(`/haka-construction-dashboard/?v=auth-cleared-${Date.now()}`);
  }, true);

  function runCheck() {
    if (!document.body) return;
    if (!hasVisibleAppContent()) showRescue();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", () => setTimeout(runCheck, 2500));
  } else {
    setTimeout(runCheck, 2500);
  }
  setTimeout(runCheck, 6000);
})();