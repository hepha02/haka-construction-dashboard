(() => {
  const VERSION = "payment-workflow-stabilizer-2";
  if (window.__hakaPaymentWorkflowStabilizerV2) return;
  window.__hakaPaymentWorkflowStabilizerV2 = true;

  const SUPABASE_URL = "https://yqemtsbdnypgmkuyncxh.supabase.co";
  const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlxZW10c2JkbnlwZ21rdXluY3hoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODAyNjYwMTUsImV4cCI6MjA5NTg0MjAxNX0.gwgdCncqRKKgC8ebj7qIdT-vA4J-wOVd2O9DSa7xEOs";
  const STATUSES = ["전체", "신청", "승인", "이체전표 생성됨", "송금완료", "반려"];
  const TRANSFER_STATUS = "이체전표 생성됨";
  const PAID_STATUS = "송금완료";
  const clean = (value) => String(value ?? "").replace(/\s+/g, " ").trim();
  const dateOnly = (value) => String(value || "").slice(0, 10);
  const money = (value) => Number(String(value ?? "").replace(/[^0-9.-]/g, "")) || 0;
  const formatKRW = (value) => new Intl.NumberFormat("ko-KR", { style: "currency", currency: "KRW", maximumFractionDigits: 0 }).format(Number(value || 0));
  const escapeHtml = (value) => clean(value).replace(/[&<>"]/g, (char) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", "\"": "&quot;" }[char]));
  const today = () => new Date().toISOString().slice(0, 10);

  let state = {
    payments: [],
    user: null,
    role: "interior_manager",
    status: "전체",
    start: "",
    end: "",
    query: "",
    mineOnly: false,
    loading: false,
    message: ""
  };

  function getClient() {
    const factory = window.supabase?.createClient || window.createClient;
    if (!factory) return null;
    return factory(SUPABASE_URL, SUPABASE_ANON_KEY);
  }

  function isAdmin() {
    const role = clean(state.role).toLowerCase();
    return role.includes("admin") || role.includes("관리자") || role.includes("전체");
  }

  function paymentOwner(payment) {
    const localOwner = payment.id ? localStorage.getItem(`haka-payment-owner-${payment.id}`) : "";
    return clean(payment.requested_by_email || payment.requested_by || payment.created_by_email || payment.created_by || localOwner || "");
  }

  function hasOwnerColumn(payment) {
    return Object.prototype.hasOwnProperty.call(payment, "requested_by_email") || Object.prototype.hasOwnProperty.call(payment, "requested_by");
  }

  function inRange(payment) {
    const date = dateOnly(payment.requested_at || payment.created_at);
    if (!date) return false;
    if (state.start && date < state.start) return false;
    if (state.end && date > state.end) return false;
    return true;
  }

  function filteredPayments() {
    const query = clean(state.query).toLowerCase();
    return state.payments.filter((payment) => {
      if (!inRange(payment)) return false;
      if (state.status !== "전체" && clean(payment.status) !== state.status) return false;
      if (state.mineOnly && state.user?.email) {
        const owner = paymentOwner(payment);
        if (owner && owner.toLowerCase() !== state.user.email.toLowerCase()) return false;
      }
      if (!query) return true;
      const text = [payment.store, payment.vendor, payment.payment_item, payment.memo, payment.vendor_account_holder, payment.vendor_account_number]
        .map(clean).join(" ").toLowerCase();
      return text.includes(query);
    });
  }

  function statusClass(status) {
    if (status === "승인" || status === PAID_STATUS) return "green";
    if (status === "신청") return "amber";
    if (status === "반려") return "red";
    if (status === TRANSFER_STATUS) return "blue";
    return "gray";
  }

  async function loadData() {
    const client = getClient();
    if (!client) return;
    state.loading = true;
    renderLedger();

    const session = await client.auth.getSession();
    state.user = session.data?.session?.user || null;

    if (state.user?.email) {
      const role = await client.from("user_roles").select("role").ilike("email", state.user.email).maybeSingle();
      state.role = role.data?.role || "interior_manager";
    }

    const { data, error } = await client
      .from("payments")
      .select("*")
      .order("requested_at", { ascending: false })
      .order("id", { ascending: false })
      .limit(1000);

    state.loading = false;
    if (error) {
      state.message = `결제 내역 조회 실패: ${error.message}`;
      renderLedger();
      return;
    }
    state.payments = data || [];
    renderLedger();
  }

  async function updatePaymentStatus(id, status) {
    const client = getClient();
    if (!client || !id) return;
    const { error } = await client.from("payments").update({ status }).eq("id", id).select("id");
    state.message = error ? `상태 변경 실패: ${error.message}` : `결제건을 '${status}' 상태로 변경했습니다.`;
    await loadData();
  }

  function isPaymentPage() {
    const text = clean(document.body?.innerText || "");
    return text.includes("결제 신청") && (text.includes("결제 신청 입력") || text.includes("결제 신청 검토"));
  }

  function anchorPanel() {
    const heading = [...document.querySelectorAll("h1, h2")].find((node) => clean(node.textContent).includes("결제 신청"));
    return heading?.closest("section, article, .panel, div") || document.querySelector("#app");
  }

  function ensureLedger() {
    if (!isPaymentPage()) return null;
    let ledger = document.querySelector("[data-haka-payment-ledger]");
    if (ledger) return ledger;
    ledger = document.createElement("article");
    ledger.dataset.hakaPaymentLedger = "true";
    ledger.className = "panel haka-payment-ledger";
    const anchor = anchorPanel();
    const parent = anchor?.parentElement || document.querySelector("#app") || document.body;
    parent.insertBefore(ledger, anchor?.nextSibling || parent.firstChild);
    return ledger;
  }

  function counts() {
    return state.payments.reduce((acc, payment) => {
      const status = clean(payment.status) || "미분류";
      acc[status] = (acc[status] || 0) + 1;
      return acc;
    }, {});
  }

  function renderActions(payment) {
    if (!isAdmin()) return "";
    const status = clean(payment.status);
    const buttons = [];
    if (status === "신청") {
      buttons.push(`<button data-haka-pay-status="승인" data-haka-pay-id="${payment.id}">승인</button>`);
      buttons.push(`<button data-haka-pay-status="반려" data-haka-pay-id="${payment.id}">반려</button>`);
    }
    if (status === "반려") buttons.push(`<button data-haka-pay-status="승인" data-haka-pay-id="${payment.id}">승인으로 변경</button>`);
    if (status === TRANSFER_STATUS) buttons.push(`<button class="primary" data-haka-pay-status="${PAID_STATUS}" data-haka-pay-id="${payment.id}">송금완료</button>`);
    return buttons.length ? `<div class="row-actions compact">${buttons.join("")}</div>` : `<span class="muted">처리 완료</span>`;
  }

  function renderRows(payments) {
    if (!payments.length) return `<div class="empty">조회 조건에 맞는 결제건이 없습니다.</div>`;
    return payments.map((payment) => {
      const amount = payment.net_amount || payment.amount || 0;
      const owner = paymentOwner(payment);
      return `
        <details class="payment-review-card haka-ledger-card">
          <summary>
            <div class="payment-summary-main"><div><strong>${escapeHtml(payment.store || "-")}</strong><span>${escapeHtml(payment.vendor || "-")}</span></div></div>
            <div class="payment-summary-meta">
              <span>신청일 ${escapeHtml(dateOnly(payment.requested_at || payment.created_at) || "-")}</span>
              <span>${escapeHtml(payment.payment_item || "-")}</span>
              <strong>${formatKRW(amount)}</strong>
              <span class="badge ${statusClass(clean(payment.status))}">${escapeHtml(payment.status || "-")}</span>
            </div>
          </summary>
          <div class="payment-detail-grid">
            <div><span>매장</span><strong>${escapeHtml(payment.store || "-")}</strong></div>
            <div><span>업체</span><strong>${escapeHtml(payment.vendor || "-")}</strong></div>
            <div><span>결제 항목</span><strong>${escapeHtml(payment.payment_item || "-")}</strong></div>
            <div><span>신청일</span><strong>${escapeHtml(dateOnly(payment.requested_at || payment.created_at) || "-")}</strong></div>
            <div><span>입금은행</span><strong>${escapeHtml(payment.vendor_bank || "-")}</strong></div>
            <div><span>입금계좌</span><strong>${escapeHtml(payment.vendor_account_number || "-")}</strong></div>
            <div><span>예금주</span><strong>${escapeHtml(payment.vendor_account_holder || "-")}</strong></div>
            <div><span>신청금액</span><strong>${formatKRW(payment.amount || 0)}</strong></div>
            <div><span>실지급액</span><strong>${formatKRW(amount)}</strong></div>
            <div><span>신청자</span><strong>${escapeHtml(owner || "기존 데이터")}</strong></div>
            <div><span>상태</span><strong>${escapeHtml(payment.status || "-")}</strong></div>
            <div><span>메모</span><strong>${escapeHtml(payment.memo || "-")}</strong></div>
          </div>
          <div class="payment-detail-actions">${renderActions(payment)}</div>
        </details>`;
    }).join("");
  }

  function renderLedger() {
    const ledger = ensureLedger();
    if (!ledger) return;
    const result = filteredPayments();
    const countMap = counts();
    const transferReady = result.filter((payment) => clean(payment.status) === "승인" && payment.vendor_bank && payment.vendor_account_number && (payment.net_amount || payment.amount)).length;
    const ownerTracked = state.payments.some(hasOwnerColumn);
    const ownerNotice = state.mineOnly && !ownerTracked
      ? `<div class="notice warning">기존 결제 데이터에는 신청자 기록이 없어 일부 과거 건은 신청자별로 완전히 분리되지 않을 수 있습니다. 앞으로 신규 신청건은 신청자 표시를 보강합니다.</div>`
      : "";

    ledger.innerHTML = `
      <style>
        .haka-payment-ledger { margin-top: 18px; }
        .haka-workflow-head { display:flex; align-items:flex-start; justify-content:space-between; gap:12px; flex-wrap:wrap; }
        .haka-status-tabs { display:flex; gap:8px; flex-wrap:wrap; margin:14px 0; }
        .haka-status-tabs button.active, .haka-ledger-filters button.active { background:#e4f4ec; border-color:#21866b; color:#075f4a; }
        .haka-ledger-filters { display:grid; grid-template-columns: repeat(5, minmax(140px, 1fr)); gap:12px; align-items:end; }
        .haka-ledger-filters label { display:flex; flex-direction:column; gap:6px; font-weight:700; color:#475569; }
        .haka-ledger-filters input { min-height:44px; border:1px solid #d7e0ea; border-radius:8px; padding:0 12px; font-weight:700; }
        .haka-ledger-summary { display:grid; grid-template-columns: repeat(4, minmax(130px, 1fr)); gap:10px; margin:14px 0; }
        .haka-ledger-summary div { border:1px solid #dbe5ee; border-radius:8px; padding:12px; background:#fff; }
        .haka-ledger-summary span { display:block; color:#64748b; font-size:13px; }
        .haka-ledger-summary strong { display:block; margin-top:4px; font-size:20px; }
        .haka-ledger-list { display:grid; gap:10px; margin-top:14px; }
        .haka-ledger-card summary { grid-template-columns: minmax(220px, 1fr) minmax(360px, 1.5fr); }
        .haka-ledger-quick { display:flex; gap:8px; flex-wrap:wrap; }
        .notice.warning { background:#fff7df; color:#8a5a00; }
        @media (max-width: 900px) {
          .haka-ledger-filters, .haka-ledger-summary { grid-template-columns: 1fr; }
          .haka-ledger-card summary { grid-template-columns: 1fr; }
        }
      </style>
      <div class="haka-workflow-head">
        <div><h2>결제 진행상황 조회</h2><p class="muted">신청, 승인, 이체전표 생성, 송금완료 상태를 날짜와 업체 기준으로 따로 확인합니다.</p></div>
        <div class="haka-ledger-quick"><button data-haka-seokyung-check>서경전력 저번주 확인</button><button data-haka-ledger-refresh>새로고침</button></div>
      </div>
      ${state.message ? `<div class="notice">${escapeHtml(state.message)}</div>` : ""}
      ${ownerNotice}
      <div class="haka-status-tabs">
        ${STATUSES.map((status) => `<button data-haka-status-tab="${status}" class="${state.status === status ? "active" : ""}">${status} ${status === "전체" ? state.payments.length : (countMap[status] || 0)}건</button>`).join("")}
      </div>
      <div class="haka-ledger-filters">
        <label>시작일<input type="date" data-haka-ledger-start value="${escapeHtml(state.start)}" /></label>
        <label>종료일<input type="date" data-haka-ledger-end value="${escapeHtml(state.end)}" /></label>
        <label>매장/업체/항목 검색<input data-haka-ledger-query value="${escapeHtml(state.query)}" placeholder="예: 서경전력" /></label>
        <label>내역 범위<button class="${state.mineOnly ? "active" : ""}" data-haka-mine-toggle>${state.mineOnly ? "내 신청만" : "전체 내역"}</button></label>
        <label>조회<button class="primary" data-haka-apply-filter>조회</button></label>
      </div>
      <div class="haka-ledger-summary">
        <div><span>조회 결과</span><strong>${result.length}건</strong></div>
        <div><span>이체 가능 승인건</span><strong>${transferReady}건</strong></div>
        <div><span>이체전표 생성</span><strong>${countMap[TRANSFER_STATUS] || 0}건</strong></div>
        <div><span>송금완료</span><strong>${countMap[PAID_STATUS] || 0}건</strong></div>
      </div>
      <div class="haka-ledger-list">${state.loading ? `<div class="empty">결제 내역을 불러오는 중입니다.</div>` : renderRows(result)}</div>
    `;
  }

  function syncFilterInputs() {
    const start = document.querySelector("[data-haka-ledger-start]");
    const end = document.querySelector("[data-haka-ledger-end]");
    const query = document.querySelector("[data-haka-ledger-query]");
    if (start) state.start = start.value;
    if (end) state.end = end.value;
    if (query) state.query = query.value;
  }

  function bindPaymentSubmitTracker() {
    document.addEventListener("submit", (event) => {
      const form = event.target;
      if (!form || form.id !== "payment-form") return;
      const formData = new FormData(form);
      const snapshot = { store: clean(formData.get("store")), vendor: clean(formData.get("vendor")), amount: money(formData.get("amount")), requested_at: today() };
      setTimeout(() => tagLatestSubmittedPayment(snapshot), 2500);
    }, true);
  }

  async function tagLatestSubmittedPayment(snapshot) {
    const client = getClient();
    if (!client || !state.user?.email || !snapshot.store || !snapshot.vendor || !snapshot.amount) return;
    const { data } = await client
      .from("payments")
      .select("id,store,vendor,amount,requested_at")
      .eq("store", snapshot.store)
      .eq("vendor", snapshot.vendor)
      .eq("amount", snapshot.amount)
      .eq("requested_at", snapshot.requested_at)
      .order("id", { ascending: false })
      .limit(1);
    const payment = data?.[0];
    if (!payment?.id) return;
    const update = await client.from("payments").update({ requested_by_email: state.user.email }).eq("id", payment.id).select("id");
    if (update.error) localStorage.setItem(`haka-payment-owner-${payment.id}`, state.user.email);
    await loadData();
  }

  document.addEventListener("click", async (event) => {
    const statusButton = event.target.closest("[data-haka-status-tab]");
    if (statusButton) {
      syncFilterInputs();
      state.status = statusButton.dataset.hakaStatusTab;
      renderLedger();
      return;
    }
    if (event.target.closest("[data-haka-apply-filter]")) {
      syncFilterInputs();
      renderLedger();
      return;
    }
    if (event.target.closest("[data-haka-ledger-refresh]")) {
      syncFilterInputs();
      await loadData();
      return;
    }
    if (event.target.closest("[data-haka-mine-toggle]")) {
      syncFilterInputs();
      state.mineOnly = !state.mineOnly;
      renderLedger();
      return;
    }
    if (event.target.closest("[data-haka-seokyung-check]")) {
      state.start = "2026-07-13";
      state.end = "2026-07-19";
      state.query = "서경전력";
      state.status = "전체";
      state.message = "서경전력 저번주 신청건을 조회했습니다. 없으면 신청 저장 누락, 신청 상태면 승인 누락, 승인 상태면 전표 생성 누락입니다.";
      renderLedger();
      return;
    }
    const action = event.target.closest("[data-haka-pay-status][data-haka-pay-id]");
    if (action) await updatePaymentStatus(Number(action.dataset.hakaPayId), action.dataset.hakaPayStatus);
  });

  const observer = new MutationObserver(() => {
    window.clearTimeout(window.__hakaPaymentWorkflowTimer);
    window.__hakaPaymentWorkflowTimer = window.setTimeout(() => {
      if (isPaymentPage() && !document.querySelector("[data-haka-payment-ledger]")) renderLedger();
    }, 160);
  });

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", loadData, { once: true });
  else loadData();
  bindPaymentSubmitTracker();
  observer.observe(document.documentElement, { childList: true, subtree: true });
  window.addEventListener("focus", loadData);

  console.info(`[HAKA] ${VERSION} loaded`);
})();
