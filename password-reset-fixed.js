import { createClient } from "https://esm.sh/@supabase/supabase-js@2.49.1";

const FIXED_SUPABASE_URL = "https://yqemtsbdnypgmkuyncxh.supabase.co";
const FIXED_SUPABASE_ANON = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlxZW10c2JkbnlwZ21rdXluY3hoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODAyNjYwMTUsImV4cCI6MjA5NTg0MjAxNX0.gwgdCncqRKKgC8ebj7qIdT-vA4J-wOVd2O9DSa7xEOs";
const fixedSupabase = createClient(FIXED_SUPABASE_URL, FIXED_SUPABASE_ANON);

function fixedEmailInput() { return document.querySelector("input[type='email'], input[name='email']"); }
function fixedCard() { return document.querySelector("form") || document.querySelector("main") || document.body; }
function fixedMessage() {
  let box = document.querySelector("[data-password-reset-fixed-message]");
  if (!box) {
    box = document.createElement("div");
    box.dataset.passwordResetFixedMessage = "true";
    box.className = "password-reset-message";
    fixedCard()?.appendChild(box);
  }
  return box;
}
function fixedSetMessage(text, type = "") {
  const box = fixedMessage();
  box.textContent = text;
  box.className = `password-reset-message ${type}`.trim();
}
async function fixedSendResetEmail(button) {
  const email = fixedEmailInput()?.value?.trim();
  if (!email) {
    fixedSetMessage("이메일을 먼저 입력해 주세요.", "error");
    fixedEmailInput()?.focus();
    return;
  }
  const oldText = button.textContent;
  button.disabled = true;
  button.textContent = "메일 보내는 중";
  const redirectTo = `${location.origin}${location.pathname}?v=password-reset-fixed-1`;
  const { error } = await fixedSupabase.auth.resetPasswordForEmail(email, { redirectTo });
  button.disabled = false;
  button.textContent = oldText;
  if (error) {
    fixedSetMessage(`비밀번호 재설정 메일 실패: ${error.message}`, "error");
    return;
  }
  fixedSetMessage("비밀번호 재설정 메일을 보냈습니다. Gmail 스팸함/프로모션함도 확인해 주세요.", "success");
}
document.addEventListener("click", (event) => {
  const button = event.target.closest?.("[data-password-reset-send]");
  if (!button) return;
  event.preventDefault();
  event.stopPropagation();
  event.stopImmediatePropagation();
  fixedSendResetEmail(button);
}, true);
