import { createClient } from "https://esm.sh/@supabase/supabase-js@2.49.1";

const AUTH_RESEND_URL = "https://yqemtsbdnypgmkuyncxh.supabase.co";
const AUTH_RESEND_ANON = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlxZW10c2JkbnlwZ21rdXluY3hoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODAyNjYwMTUsImV4cCI6MjA5NTg0MjAxNX0.gwgdCncqRKKgC8ebj7qIdT-vA4J-wOVd2O9DSa7xEOs";
const authResendClient = createClient(AUTH_RESEND_URL, AUTH_RESEND_ANON);

function authEmailInput() {
  return document.querySelector("input[type='email'], input[name='email']");
}

function authCard() {
  return document.querySelector("form") || document.querySelector("main") || document.body;
}

function authMessage() {
  let box = document.querySelector("[data-auth-resend-message]");
  if (!box) {
    box = document.createElement("div");
    box.dataset.authResendMessage = "true";
    box.className = "auth-resend-message";
    authCard()?.appendChild(box);
  }
  return box;
}

function showAuthMessage(text, type = "") {
  const box = authMessage();
  box.textContent = text;
  box.className = `auth-resend-message ${type}`.trim();
}

function isResendButton(button) {
  const label = String(button?.textContent || "").replace(/\s/g, "");
  return label.includes("인증메일다시받기") || label.includes("인증메일재발송");
}

async function resendSignupEmail(button) {
  const email = authEmailInput()?.value?.trim();
  if (!email) {
    showAuthMessage("이메일을 먼저 입력해 주세요.", "error");
    authEmailInput()?.focus();
    return;
  }

  const oldText = button?.textContent;
  if (button) {
    button.disabled = true;
    button.textContent = "인증메일 보내는 중";
  }

  const emailRedirectTo = `${location.origin}${location.pathname}?v=auth-resend-fixed`;
  const { error } = await authResendClient.auth.resend({
    type: "signup",
    email,
    options: { emailRedirectTo }
  });

  if (button) {
    button.disabled = false;
    button.textContent = oldText || "인증메일 다시 받기";
  }

  if (error) {
    showAuthMessage(`인증메일 발송 실패: ${error.message}`, "error");
    return;
  }

  showAuthMessage("인증메일을 다시 보냈습니다. Gmail의 프로모션/스팸함도 확인해 주세요.", "success");
}

document.addEventListener("click", (event) => {
  const button = event.target.closest?.("button");
  if (!isResendButton(button)) return;
  event.preventDefault();
  event.stopPropagation();
  event.stopImmediatePropagation();
  resendSignupEmail(button);
}, true);

const style = document.createElement("style");
style.textContent = `
  .auth-resend-message {
    margin-top: 10px;
    color: #526174;
    font-size: 13px;
    font-weight: 800;
    line-height: 1.45;
  }
  .auth-resend-message.error { color: #a7332b; }
  .auth-resend-message.success { color: #237c63; }
`;
document.head.appendChild(style);
