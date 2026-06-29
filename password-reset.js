import { createClient } from "https://esm.sh/@supabase/supabase-js@2.49.1";

const RESET_SUPABASE_URL = "https://yqemtsbdnypgmkuyncxh.supabase.co";
const RESET_SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJ5cWVtdHNiZG55cGdta3V5bmN4aCIsInJlZiI6InlxZW10c2JkbnlwZ21rdXluY3hoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODAyNjYwMTUsImV4cCI6MjA5NTg0MjAxNX0.gwgdCncqRKKgC8ebj7qIdT-vA4J-wOVd2O9DSa7xEOs";
const resetSupabase = createClient(RESET_SUPABASE_URL, RESET_SUPABASE_ANON_KEY);

function loginCard() {
  return document.querySelector("form") || document.querySelector(".auth-card") || document.querySelector("main");
}

function emailInput() {
  return document.querySelector("input[type='email'], input[name='email']");
}

function passwordInput() {
  return document.querySelector("input[type='password'], input[name='password']");
}

function messageBox() {
  let box = document.querySelector("[data-password-reset-message]");
  if (!box) {
    box = document.createElement("div");
    box.dataset.passwordResetMessage = "true";
    box.className = "password-reset-message";
    loginCard()?.appendChild(box);
  }
  return box;
}

function setMessage(text, type = "") {
  const box = messageBox();
  box.textContent = text;
  box.className = `password-reset-message ${type}`.trim();
}

function ensureResetButton() {
  const card = loginCard();
  if (!card || document.querySelector("[data-password-reset-send]")) return;
  const button = document.createElement("button");
  button.type = "button";
  button.dataset.passwordResetSend = "true";
  button.className = "password-reset-button";
  button.textContent = "비밀번호 재설정";
  card.appendChild(button);
}

async function sendResetEmail() {
  const email = emailInput()?.value?.trim();
  if (!email) {
    setMessage("이메일을 먼저 입력해 주세요.", "error");
    emailInput()?.focus();
    return;
  }
  const button = document.querySelector("[data-password-reset-send]");
  if (button) {
    button.disabled = true;
    button.textContent = "메일 보내는 중";
  }
  const redirectTo = `${location.origin}${location.pathname}?v=password-reset-1`;
  const { error } = await resetSupabase.auth.resetPasswordForEmail(email, { redirectTo });
  if (button) {
    button.disabled = false;
    button.textContent = "비밀번호 재설정";
  }
  if (error) {
    setMessage(`재설정 메일 발송 실패: ${error.message}`, "error");
    return;
  }
  setMessage("비밀번호 재설정 메일을 보냈습니다. 메일함에서 링크를 눌러 주세요.", "success");
}

function isRecoveryUrl() {
  const hash = new URLSearchParams(location.hash.replace(/^#/, ""));
  const query = new URLSearchParams(location.search);
  return hash.get("type") === "recovery" || query.get("type") === "recovery" || hash.has("access_token");
}

function showNewPasswordForm() {
  if (!isRecoveryUrl() || document.querySelector("[data-new-password-panel]")) return;
  document.body.innerHTML = `
    <main class="password-reset-page">
      <section class="password-reset-panel" data-new-password-panel>
        <div class="brand-row"><div class="brand-mark">H</div><div><strong>HAKA Construction</strong><span>비밀번호 재설정</span></div></div>
        <h1>새 비밀번호</h1>
        <p>앞으로 사용할 새 비밀번호를 입력해 주세요.</p>
        <label>새 비밀번호<input type="password" data-new-password minlength="6" autocomplete="new-password" /></label>
        <label>새 비밀번호 확인<input type="password" data-new-password-confirm minlength="6" autocomplete="new-password" /></label>
        <button type="button" data-update-password>비밀번호 변경</button>
        <div class="password-reset-message" data-password-reset-message></div>
      </section>
    </main>
  `;
}

async function updatePassword() {
  const password = document.querySelector("[data-new-password]")?.value || "";
  const confirm = document.querySelector("[data-new-password-confirm]")?.value || "";
  if (password.length < 6) {
    setMessage("비밀번호는 6자 이상으로 입력해 주세요.", "error");
    return;
  }
  if (password !== confirm) {
    setMessage("비밀번호 확인이 서로 다릅니다.", "error");
    return;
  }
  const button = document.querySelector("[data-update-password]");
  if (button) {
    button.disabled = true;
    button.textContent = "변경 중";
  }
  const { error } = await resetSupabase.auth.updateUser({ password });
  if (button) {
    button.disabled = false;
    button.textContent = "비밀번호 변경";
  }
  if (error) {
    setMessage(`비밀번호 변경 실패: ${error.message}`, "error");
    return;
  }
  setMessage("비밀번호가 변경됐습니다. 로그인 화면으로 이동합니다.", "success");
  setTimeout(() => {
    location.href = `${location.origin}${location.pathname}?v=password-reset-1`;
  }, 1200);
}

const style = document.createElement("style");
style.textContent = `
  .password-reset-button {
    width: 100%;
    min-height: 44px;
    margin-top: 10px;
    border: 1px solid #237c63;
    border-radius: 8px;
    background: #ffffff;
    color: #237c63;
    font-size: 14px;
    font-weight: 900;
    cursor: pointer;
  }
  .password-reset-button:disabled, .password-reset-panel button:disabled { opacity: .6; cursor: wait; }
  .password-reset-message {
    margin-top: 10px;
    color: #526174;
    font-size: 13px;
    font-weight: 800;
    line-height: 1.45;
  }
  .password-reset-message.error { color: #a7332b; }
  .password-reset-message.success { color: #237c63; }
  .password-reset-page {
    min-height: 100vh;
    display: grid;
    place-items: center;
    padding: 24px;
    background: #f4f7f8;
  }
  .password-reset-panel {
    width: min(420px, 100%);
    display: grid;
    gap: 14px;
    padding: 28px;
    border: 1px solid #dfe6ee;
    border-radius: 8px;
    background: #fff;
    box-shadow: 0 18px 50px rgba(20, 32, 48, .12);
  }
  .password-reset-panel h1, .password-reset-panel p { margin: 0; }
  .password-reset-panel label { display: grid; gap: 6px; color: #526174; font-size: 13px; font-weight: 900; }
  .password-reset-panel input { height: 46px; padding: 0 12px; border: 1px solid #dce2ea; border-radius: 8px; font-size: 16px; }
  .password-reset-panel button { height: 46px; border: 0; border-radius: 8px; background: #237c63; color: #fff; font-weight: 900; }
  .brand-row { display: flex; align-items: center; gap: 12px; }
  .brand-row span { display: block; color: #6b7788; font-size: 12px; font-weight: 800; }
  .brand-mark { width: 42px; height: 42px; display: grid; place-items: center; border-radius: 8px; background: #237c63; color: #fff; font-weight: 900; }
`;
document.head.appendChild(style);

showNewPasswordForm();

document.addEventListener("click", (event) => {
  if (event.target.closest?.("[data-password-reset-send]")) sendResetEmail();
  if (event.target.closest?.("[data-update-password]")) updatePassword();
}, true);

const resetObserver = new MutationObserver(() => {
  clearTimeout(window.__passwordResetTimer);
  window.__passwordResetTimer = setTimeout(ensureResetButton, 150);
});
resetObserver.observe(document.body, { childList: true, subtree: true });
ensureResetButton();
