(() => {
  if (window.__hakaAuthLoginStabilizer) return;
  window.__hakaAuthLoginStabilizer = true;

  const SUPABASE_URL = "https://yqemtsbdnypgmkuyncxh.supabase.co";
  const SUPABASE_ANON = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJIUzI1NiIsInJlZiI6InlxZW10c2JkbnlwZ21rdXluY3hoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODAyNjYwMTUsImV4cCI6MjA5NTg0MjAxNX0.gwgdCncqRKKgC8ebj7qIdT-vA4J-wOVd2O9DSa7xEOs";
  const MANAGER_EMAIL = "real_smoke@e-cig.co.kr";

  function isLoginPage() {
    const body = document.body?.innerText || "";
    return body.includes("HAKA Construction") && body.includes("로그인") && !!emailInput();
  }

  function emailInput() {
    return document.querySelector("input[type='email'], input[name='email']");
  }

  function findPanel() {
    const input = emailInput();
    if (!input) return null;
    let node = input.parentElement;
    while (node && node !== document.body) {
      const text = node.innerText || "";
      if (text.includes("로그인") && text.includes("계정 만들기")) return node;
      node = node.parentElement;
    }
    return document.querySelector("form") || document.querySelector("main") || document.body;
  }

  function messageBox() {
    let box = document.querySelector("[data-login-stabilizer-message]");
    if (!box) {
      box = document.createElement("div");
      box.dataset.loginStabilizerMessage = "true";
      box.className = "login-stabilizer-message";
      findPanel()?.appendChild(box);
    }
    return box;
  }

  function showMessage(text, kind = "") {
    const box = messageBox();
    box.textContent = text;
    box.className = `login-stabilizer-message ${kind}`.trim();
  }

  function clearAuthStorage() {
    const keys = [];
    for (let i = 0; i < localStorage.length; i += 1) {
      const key = localStorage.key(i);
      if (key && (key.includes("supabase") || key.includes("sb-yqemtsbdnypgmkuyncxh"))) keys.push(key);
    }
    keys.forEach((key) => localStorage.removeItem(key));
    sessionStorage.clear();
  }

  async function sendPasswordReset(button) {
    const email = (emailInput()?.value || MANAGER_EMAIL).trim().toLowerCase();
    if (emailInput()) emailInput().value = email;
    const old = button.textContent;
    button.disabled = true;
    button.textContent = "재설정 메일 발송 중";
    const redirectTo = `${location.origin}${location.pathname}?v=manager-password-reset`;
    try {
      const response = await fetch(`${SUPABASE_URL}/auth/v1/recover?redirect_to=${encodeURIComponent(redirectTo)}`, {
        method: "POST",
        headers: {
          apikey: SUPABASE_ANON,
          Authorization: `Bearer ${SUPABASE_ANON}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ email })
      });
      const data = await response.json().catch(() => ({}));
      if (!response.ok) throw new Error(data.message || data.msg || response.statusText);
      showMessage("비밀번호 재설정 메일을 보냈습니다. 받은 메일의 Reset password를 눌러 새 비밀번호를 정해 주세요.", "success");
    } catch (error) {
      showMessage(`비밀번호 재설정 메일 발송 실패: ${error?.message || "알 수 없는 오류"}`, "error");
    } finally {
      button.disabled = false;
      button.textContent = old;
    }
  }

  function normalizeVisibleErrors() {
    if (!isLoginPage()) return;
    const nodes = [...document.querySelectorAll("p, div, span")].filter((node) => /Invalid login credentials|Email not confirmed|User not found/i.test(node.textContent || ""));
    nodes.forEach((node) => {
      const text = node.textContent || "";
      if (/Invalid login credentials/i.test(text)) node.textContent = "로그인 실패: 이메일 또는 비밀번호가 맞지 않습니다. 실장 계정은 비밀번호 재설정 후 다시 로그인해 주세요.";
      if (/Email not confirmed/i.test(text)) node.textContent = "로그인 실패: 이메일 인증이 필요합니다. 인증메일 다시 받기 또는 비밀번호 재설정을 진행해 주세요.";
      if (/User not found/i.test(text)) node.textContent = "로그인 실패: 등록된 계정을 찾지 못했습니다. 이메일 주소를 다시 확인해 주세요.";
    });
  }

  function ensureHelper() {
    if (!isLoginPage()) return;
    if (document.querySelector("[data-login-stabilizer]") || !findPanel()) {
      normalizeVisibleErrors();
      return;
    }
    const helper = document.createElement("div");
    helper.dataset.loginStabilizer = "true";
    helper.className = "login-stabilizer-box";
    helper.innerHTML = `
      <button type="button" data-manager-email-fill>실장 계정 입력</button>
      <button type="button" data-manager-reset>실장 비밀번호 재설정</button>
      <button type="button" data-auth-clear>로그인 상태 초기화</button>
      <small>기존에 로그인되던 계정이 안 될 때는 먼저 로그인 상태 초기화 후 다시 로그인하고, 비밀번호가 안 맞으면 재설정을 사용하세요.</small>
    `;
    findPanel().appendChild(helper);
    normalizeVisibleErrors();
  }

  const style = document.createElement("style");
  style.textContent = `
    .login-stabilizer-box {
      display: grid !important;
      gap: 10px !important;
      margin-top: 12px !important;
      padding-top: 12px !important;
      border-top: 1px solid #e6edf4 !important;
    }
    .login-stabilizer-box button {
      width: 100% !important;
      min-height: 44px !important;
      border: 1px solid #d6e0e8 !important;
      border-radius: 8px !important;
      background: #fff !important;
      color: #162033 !important;
      font-size: 14px !important;
      font-weight: 900 !important;
      cursor: pointer !important;
    }
    .login-stabilizer-box button[data-manager-reset] {
      border-color: #237c63 !important;
      color: #237c63 !important;
    }
    .login-stabilizer-box button:disabled { opacity: .65 !important; cursor: progress !important; }
    .login-stabilizer-box small {
      color: #6b7788 !important;
      font-size: 12px !important;
      font-weight: 800 !important;
      line-height: 1.45 !important;
      word-break: keep-all !important;
    }
    .login-stabilizer-message {
      margin-top: 10px !important;
      color: #526174 !important;
      font-size: 13px !important;
      font-weight: 900 !important;
      line-height: 1.45 !important;
      word-break: keep-all !important;
    }
    .login-stabilizer-message.success { color: #237c63 !important; }
    .login-stabilizer-message.error { color: #b42318 !important; }
  `;
  document.head.appendChild(style);

  document.addEventListener("click", (event) => {
    const fill = event.target.closest?.("[data-manager-email-fill]");
    if (fill) {
      event.preventDefault();
      const input = emailInput();
      if (input) {
        input.value = MANAGER_EMAIL;
        input.dispatchEvent(new Event("input", { bubbles: true }));
        input.focus();
      }
      showMessage("실장 계정 이메일을 입력했습니다. 비밀번호를 넣고 로그인해 주세요.", "success");
      return;
    }
    const reset = event.target.closest?.("[data-manager-reset]");
    if (reset) {
      event.preventDefault();
      sendPasswordReset(reset);
      return;
    }
    const clear = event.target.closest?.("[data-auth-clear]");
    if (clear) {
      event.preventDefault();
      clearAuthStorage();
      showMessage("브라우저에 남아있던 로그인 정보를 초기화했습니다. 화면을 새로고침합니다.", "success");
      setTimeout(() => location.replace(`${location.origin}${location.pathname}?v=auth-clean-${Date.now()}`), 700);
    }
  }, true);

  const run = () => {
    ensureHelper();
    setTimeout(ensureHelper, 250);
    setTimeout(ensureHelper, 900);
  };
  new MutationObserver(run).observe(document.documentElement, { childList: true, subtree: true });
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", run);
  run();
})();