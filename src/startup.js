export async function withTimeout(operation, message, timeoutMs = 15000) {
  let timer;
  try {
    return await Promise.race([
      operation,
      new Promise((_, reject) => {
        timer = setTimeout(() => reject(new Error(message)), timeoutMs);
      })
    ]);
  } finally {
    clearTimeout(timer);
  }
}

export function renderStartupLoading() {
  const app = document.querySelector("#app");
  app.className = "auth-shell";
  app.innerHTML = `
    <main class="auth-page">
      <section class="auth-panel" aria-live="polite">
        <h1>로그인 상태를 확인하고 있습니다</h1>
        <p>잠시만 기다려 주세요.</p>
      </section>
    </main>
  `;
}

export function renderStartupError() {
  const app = document.querySelector("#app");
  app.className = "auth-shell";
  app.innerHTML = `
    <main class="auth-page">
      <section class="auth-panel" role="alert">
        <h1>화면을 불러오지 못했습니다</h1>
        <p>인터넷 연결을 확인한 뒤 새로고침해 주세요. 문제가 계속되면 관리자에게 알려주세요.</p>
        <a href="./">새로고침</a>
      </section>
    </main>
  `;
}
