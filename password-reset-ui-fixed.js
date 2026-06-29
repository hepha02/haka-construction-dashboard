import { createClient } from "https://esm.sh/@supabase/supabase-js@2.49.1";

const SUPABASE_URL = "https://yqemtsbdnypgmkuyncxh.supabase.co";
const SUPABASE_ANON = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlxZW10c2JkbnlwZ21rdXluY3hoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODAyNjYwMTUsImV4cCI6MjA5NTg0MjAxNX0.gwgdCncqRKKgC8ebj7qIdT-vA4J-wOVd2O9DSa7xEOs";
const supabase = createClient(SUPABASE_URL, SUPABASE_ANON);

function card() { return document.querySelector("form") || document.querySelector("main") || document.body; }
function emailInput() { return document.querySelector("input[type='email'], input[name='email']"); }
function messageBox() {
  let box = document.querySelector("[data-password-reset-message]");
  if (!box) {
    box = document.createElement("div");
    box.dataset.passwordResetMessage = "true";
    box.className = "password-reset-message";
    card()?.appendChild(box);
  }
  return box;
}
function setMessage(text, type = "") {
  const box = messageBox();
  box.textContent = text;
  box.className = `password-reset-message ${type}`.trim();
}
function ensureButton() {
  const root = card();
  if (!root || document.querySelector("[data-password-reset-send]")) return;
  const button = document.createElement("button");
  button.type = "button";
  button.dataset.passwordResetSend = "true";
  button.className = "password-reset-button";
  button.textContent = "비밀번호 재설정";
  root.appendChild(button);
}
async function sendReset(button) {
  const email = emailInput()?.value?.trim();
  if (!email) {
    setMessage("이메일을 먼저 입력해 주세요.", "error");
    emailInput()?.focus();
    return;
  }
  const old = button.textContent;
  button.disabled = true;
  button.textContent = "메일 보내는 중";
  const redirectTo = `${location.origin}${location.pathname}?v=password-reset-fixed-2`;
  const { error } = await supabase.auth.resetPasswordForEmail(email, { redirectTo });
  button.disabled = false;
  button.textContent = old;
  if (error) {
    setMessage(`비밀번호 재설정 메일 실패: ${error.message}`, "error");
    return;
  }
  setMessage("비밀번호 재설정 메일을 보냈습니다. Gmail 스팸함/프로모션함도 확인해 주세요.", "success");
}
function isRecoveryUrl() {
  const hash = new URLSearchParams(location.hash.replace(/^#/, ""));
  const query = new URLSearchParams(location.search);
  return hash.get("type") === "recovery" || query.get("type") === "recovery" || hash.has("access_token");
}
function showRecoveryForm() {
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
    </main>`;
}
async function updatePassword(button) {
  const password = document.querySelector("[data-new-password]")?.value || "";
  const confirm = document.querySelector("[data-new-password-confirm]")?.value || "";
  if (password.length < 6) return setMessage("비밀번호는 6자 이상으로 입력해 주세요.", "error");
  if (password !== confirm) return setMessage("비밀번호 확인이 서로 다릅니다.", "error");
  button.disabled = true;
  button.textContent = "변경 중";
  const { error } = await supabase.auth.updateUser({ password });
  button.disabled = false;
  button.textContent = "비밀번호 변경";
  if (error) return setMessage(`비밀번호 변경 실패: ${error.message}`, "error");
  setMessage("비밀번호가 변경됐습니다. 로그인 화면으로 이동합니다.", "success");
  setTimeout(() => { location.href = `${location.origin}${location.pathname}?v=auth-resend-strong-3`; }, 1200);
}
const style = document.createElement("style");
style.textContent = `
  .password-reset-button { width: 100%; min-height: 44px; margin-top: 10px; border: 1px solid #237c63; border-radius: 8px; background: #fff; color: #237c63; font-size: 14px; font-weight: 900; cursor: pointer; }
  .password-reset-message { margin-top: 10px; color: #526174; font-size: 13px; font-weight: 800; line-height: 1.45; }
  .password-reset-message.error { color: #a7332b; }
  .password-reset-message.success { color: #237c63; }
  .password-reset-page { min-height: 100vh; display: grid; place-items: center; padding: 24px; background: #f4f7f8; }
  .password-reset-panel { width: min(420px, 100%); display: grid; gap: 14px; padding: 28px; border: 1px solid #dfe6ee; border-radius: 8px; background: #fff; box-shadow: 0 18px 50px rgba(20,32,48,.12); }
  .password-reset-panel h1, .password-reset-panel p { margin: 0; }
  .password-reset-panel label { display: grid; gap: 6px; color: #526174; font-size: 13px; font-weight: 900; }
  .password-reset-panel input { height: 46px; padding: 0 12px; border: 1px solid #dce2ea; border-radius: 8px; font-size: 16px; }
  .password-reset-panel button { height: 46px; border: 0; border-radius: 8px; background: #237c63; color: #fff; font-weight: 900; }
  .brand-row { display: flex; align-items: center; gap: 12px; }
  .brand-row span { display: block; color: #6b7788; font-size: 12px; font-weight: 800; }
  .brand-mark { width: 42px; height: 42px; display: grid; place-items: center; border-radius: 8px; background: #237c63; color: #fff; font-weight: 900; }
`;
document.head.appendChild(style);
showRecoveryForm();
document.addEventListener("click", (event) => {
  const reset = event.target.closest?.("[data-password-reset-send]");
  if (reset) { event.preventDefault(); event.stopPropagation(); event.stopImmediatePropagation(); sendReset(reset); }
  const update = event.target.closest?.("[data-update-password]");
  if (update) { event.preventDefault(); event.stopPropagation(); updatePassword(update); }
}, true);
const observer = new MutationObserver(() => { clearTimeout(window.__passwordResetUiFixedTimer); window.__passwordResetUiFixedTimer = setTimeout(ensureButton, 150); });
observer.observe(document.body, { childList: true, subtree: true });
ensureButton();
