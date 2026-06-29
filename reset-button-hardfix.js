(() => {
  if (window.__hakaResetButtonHardfix) return;
  window.__hakaResetButtonHardfix = true;

  const SUPABASE_URL = "https://yqemtsbdnypgmkuyncxh.supabase.co";
  const SUPABASE_ANON = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlxZW10c2JkbnlwZ21rdXluY3hoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODAyNjYwMTUsImV4cCI6MjA5NTg0MjAxNX0.gwgdCncqRKKgC8ebj7qIdT-vA4J-wOVd2O9DSa7xEOs";

  const text = {
    reset: "비밀번호 재설정",
    enterEmail: "이메일을 먼저 입력해 주세요.",
    sending: "메일 보내는 중",
    sent: "비밀번호 재설정 메일을 보냈습니다. Gmail 스팸함/프로모션함도 확인해 주세요.",
    failed: "비밀번호 재설정 메일 실패: "
  };

  function hasLoginScreen() {
    return document.body && document.body.innerText.includes("HAKA Construction") && document.body.innerText.includes("로그인") && !!emailInput();
  }

  function emailInput() {
    return document.querySelector("input[type='email'], input[name='email']");
  }

  function findPanel() {
    const input = emailInput();
    if (!input) return null;
    let node = input.parentElement;
    while (node && node !== document.body) {
      const body = node.innerText || "";
      if (body.includes("로그인") && body.includes("계정 만들기")) return node;
      node = node.parentElement;
    }
    return document.querySelector("form") || document.querySelector("main") || document.body;
  }

  function findResendButton(panel) {
    const buttons = Array.from((panel || document).querySelectorAll("button"));
    return buttons.find((button) => (button.innerText || "").trim().includes("인증메일"));
  }

  function messageBox(panel) {
    let box = document.querySelector("[data-hard-reset-message]");
    if (!box) {
      box = document.createElement("div");
      box.dataset.hardResetMessage = "true";
      box.className = "hard-reset-message";
      (panel || findPanel() || document.body).appendChild(box);
    }
    return box;
  }

  function setMessage(message, kind) {
    const panel = findPanel();
    const box = messageBox(panel);
    box.textContent = message;
    box.className = `hard-reset-message ${kind || ""}`.trim();
  }

  async function sendReset(button) {
    const email = (emailInput()?.value || "").trim();
    if (!email) {
      setMessage(text.enterEmail, "error");
      emailInput()?.focus();
      return;
    }

    const old = button.textContent;
    button.disabled = true;
    button.textContent = text.sending;
    const redirectTo = `${location.origin}${location.pathname}?v=password-reset-fixed-3`;

    try {
      const response = await fetch(`${SUPABASE_URL}/auth/v1/recover?redirect_to=${encodeURIComponent(redirectTo)}`, {
        method: "POST",
        headers: {
          "apikey": SUPABASE_ANON,
          "Authorization": `Bearer ${SUPABASE_ANON}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ email })
      });
      const data = await response.json().catch(() => ({}));
      if (!response.ok) throw new Error(data.msg || data.message || response.statusText);
      setMessage(text.sent, "success");
    } catch (error) {
      setMessage(text.failed + (error?.message || "알 수 없는 오류"), "error");
    } finally {
      button.disabled = false;
      button.textContent = old;
    }
  }

  function ensureButton() {
    if (!hasLoginScreen()) return;
    if (document.querySelector("[data-hard-password-reset]")) return;
    const panel = findPanel();
    if (!panel) return;
    const button = document.createElement("button");
    button.type = "button";
    button.dataset.hardPasswordReset = "true";
    button.className = "hard-reset-button";
    button.textContent = text.reset;
    const resend = findResendButton(panel);
    if (resend && resend.parentElement) {
      resend.insertAdjacentElement("afterend", button);
    } else {
      panel.appendChild(button);
    }
  }

  const style = document.createElement("style");
  style.textContent = `
    .hard-reset-button,
    [data-hard-password-reset] {
      display: block !important;
      width: 100% !important;
      min-height: 48px !important;
      margin-top: 14px !important;
      border: 1px solid #237c63 !important;
      border-radius: 8px !important;
      background: #fff !important;
      color: #237c63 !important;
      font-size: 16px !important;
      font-weight: 900 !important;
      cursor: pointer !important;
      text-align: center !important;
    }
    .hard-reset-button:disabled {
      opacity: .65 !important;
      cursor: progress !important;
    }
    .hard-reset-message {
      margin-top: 12px !important;
      color: #526174 !important;
      font-size: 13px !important;
      font-weight: 800 !important;
      line-height: 1.45 !important;
      word-break: keep-all !important;
    }
    .hard-reset-message.success { color: #237c63 !important; }
    .hard-reset-message.error { color: #b42318 !important; }
  `;
  document.head.appendChild(style);

  document.addEventListener("click", (event) => {
    const button = event.target.closest?.("[data-hard-password-reset]");
    if (!button) return;
    event.preventDefault();
    event.stopPropagation();
    sendReset(button);
  }, true);

  const run = () => {
    ensureButton();
    setTimeout(ensureButton, 300);
    setTimeout(ensureButton, 1000);
    setTimeout(ensureButton, 2500);
  };

  new MutationObserver(() => run()).observe(document.documentElement, { childList: true, subtree: true });
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", run);
  run();
})();
