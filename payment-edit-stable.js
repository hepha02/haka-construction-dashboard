(() => {
  const VERSION = "payment-edit-stable-1";
  if (window.__hakaPaymentEditStableV1) return;
  window.__hakaPaymentEditStableV1 = true;

  const SUPABASE_URL = "https://yqemtsbdnypgmkuyncxh.supabase.co";
  const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlxZW10c2JkbnlwZ21rdXluY3hoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODAyNjYwMTUsImV4cCI6MjA5NTg0MjAxNX0.gwgdCncqRKKgC8ebj7qIdT-vA4J-wOVd2O9DSa7xEOs";
  const clean = (value) => String(value ?? "").replace(/\s+/g, " ").trim();
  const compact = (value) => clean(value).replace(/\s/g, "");
  const money = (value) => Number(String(value ?? "").replace(/[^0-9.-]/g, "")) || 0;
  const dateOnly = (value) => String(value || "").slice(0, 10);
  const today = () => new Date().toISOString().slice(0, 10);
  const escapeHtml = (value) => clean(value).replace(/[&<>"]/g, (char) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", "\"": "&quot;" }[char]));

  let payments = [];
  let loading = null;

  function getClient() {
    const factory = window.supabase?.createClient || window.createClient;
    if (!factory) return null;
    return factory(SUPABASE_URL, SUPABASE_ANON_KEY);
  }

  async function loadPayments(force = false) {
    if (loading && !force) return loading;
    loading = (async () => {
      const client = getClient();
      if (!client) return [];
      const { data, error } = await client
        .from("payments")
        .select("*")
        .order("requested_at", { ascending: false })
        .order("id", { ascending: false })
        .limit(1000);
      if (error) {
        console.warn(`[HAKA] ${VERSION} payments load failed`, error);
        return payments;
      }
      payments = data || [];
      return payments;
    })();
    return loading;
  }

  function cardText(card) {
    return clean(card.innerText || card.textContent || "");
  }

  function getDetailValue(card, labels) {
    const wanted = labels.map(compact);
    const boxes = [...card.querySelectorAll(".payment-detail-grid > div")];
    for (const box of boxes) {
      const label = compact(box.querySelector("span")?.textContent || "");
      const value = clean(box.querySelector("strong")?.textContent || "");
      if (!label || !value) continue;
      if (wanted.some((item) => label.includes(item) || item.includes(label))) return value;
    }
    return "";
  }

  function cardInfo(card) {
    const text = cardText(card);
    const summaryStore = clean(card.querySelector(".payment-summary-main strong")?.textContent || "");
    const summaryVendor = clean(card.querySelector(".payment-summary-main span")?.textContent || "");
    const summaryAmount = money(card.querySelector(".payment-summary-meta strong")?.textContent || text.match(/₩[0-9,]+/)?.[0] || "");
    const summaryItem = clean(card.querySelector(".payment-summary-meta span")?.textContent || "").replace(/^신청일\s*20\d{2}-\d{2}-\d{2}/, "");
    const date = (text.match(/신청일\s*(20\d{2}-\d{2}-\d{2})/) || text.match(/20\d{2}-\d{2}-\d{2}/) || [])[1] || "";
    return {
      id: Number(card.querySelector("[data-payment-id], [data-haka-pay-id]")?.dataset.paymentId || card.querySelector("[data-haka-pay-id]")?.dataset.hakaPayId || card.querySelector("input.payment-select, input.transfer-select, input.transfer-payment-select")?.value || 0),
      store: getDetailValue(card, ["매장"]) || summaryStore,
      vendor: getDetailValue(card, ["업체"]) || summaryVendor,
      item: getDetailValue(card, ["결제 항목", "결제항목"]) || summaryItem,
      date,
      amount: money(getDetailValue(card, ["실지급액", "이번신청액", "신청금액", "금액"]) || summaryAmount)
    };
  }

  function same(a, b) {
    return compact(a) === compact(b);
  }

  function findPayment(card) {
    const info = cardInfo(card);
    if (info.id) return payments.find((payment) => Number(payment.id) === info.id) || null;
    const matches = payments.filter((payment) => {
      if (info.store && !same(payment.store, info.store)) return false;
      if (info.vendor && !same(payment.vendor, info.vendor)) return false;
      if (info.date && dateOnly(payment.requested_at || payment.created_at) !== info.date) return false;
      const paymentAmount = money(payment.net_amount || payment.amount || 0);
      if (info.amount && paymentAmount !== info.amount && money(payment.amount) !== info.amount) return false;
      if (info.item && payment.payment_item && !same(payment.payment_item, info.item)) return false;
      return true;
    });
    return matches[0] || null;
  }

  function editForm(payment) {
    return `
      <form class="haka-payment-edit-form" data-haka-payment-edit-form data-payment-id="${payment.id}">
        <div class="haka-payment-edit-grid">
          <label>신청일<input type="date" name="requested_at" value="${escapeHtml(dateOnly(payment.requested_at || payment.created_at) || today())}" /></label>
          <label>매장<input name="store" value="${escapeHtml(payment.store || "")}" /></label>
          <label>업체<input name="vendor" value="${escapeHtml(payment.vendor || "")}" /></label>
          <label>결제 항목<input name="payment_item" value="${escapeHtml(payment.payment_item || "")}" /></label>
          <label>견적 총액<input name="estimate_total" inputmode="numeric" value="${escapeHtml(payment.estimate_total || payment.amount || "")}" /></label>
          <label>신청금액<input name="amount" inputmode="numeric" value="${escapeHtml(payment.amount || "")}" /></label>
          <label>입금은행<input name="vendor_bank" value="${escapeHtml(payment.vendor_bank || "")}" /></label>
          <label>입금계좌<input name="vendor_account_number" value="${escapeHtml(payment.vendor_account_number || "")}" /></label>
          <label>예금주<input name="vendor_account_holder" value="${escapeHtml(payment.vendor_account_holder || "")}" /></label>
          <label>지급 유형<input name="tax_type" value="${escapeHtml(payment.tax_type || "일반 송금")}" /></label>
          <label class="wide">추가 설명/메모<textarea name="memo">${escapeHtml(payment.memo || "")}</textarea></label>
        </div>
        <div class="row-actions">
          <button class="primary" type="submit">수정 저장</button>
          <button type="button" data-haka-payment-edit-cancel>닫기</button>
          <button type="button" class="danger" data-haka-payment-cancel-request>취소요청</button>
        </div>
        <p class="form-message" data-haka-payment-edit-message></p>
      </form>`;
  }

  function ensureStyle() {
    if (document.querySelector("[data-haka-payment-edit-style]")) return;
    const style = document.createElement("style");
    style.dataset.hakaPaymentEditStyle = "true";
    style.textContent = `
      .haka-payment-edit-bar { margin-top: 12px; display:flex; gap:8px; flex-wrap:wrap; }
      .haka-payment-edit-form { margin-top: 12px; padding: 14px; border:1px solid #dbe5ee; border-radius:8px; background:#fbfdff; }
      .haka-payment-edit-grid { display:grid; grid-template-columns: repeat(3, minmax(160px, 1fr)); gap:12px; }
      .haka-payment-edit-grid label { display:flex; flex-direction:column; gap:6px; font-weight:700; color:#475569; }
      .haka-payment-edit-grid input, .haka-payment-edit-grid textarea { border:1px solid #d7e0ea; border-radius:8px; padding:10px 12px; font-weight:700; min-height:42px; }
      .haka-payment-edit-grid textarea { min-height:86px; resize:vertical; }
      .haka-payment-edit-grid .wide { grid-column: 1 / -1; }
      button.danger { color:#b42318; border-color:#f4b8b0; background:#fff4f2; }
      @media (max-width: 900px) { .haka-payment-edit-grid { grid-template-columns: 1fr; } }
    `;
    document.head.appendChild(style);
  }

  async function attachControls() {
    await loadPayments();
    ensureStyle();
    document.querySelectorAll("details.payment-review-card, details.payment-card").forEach((card) => {
      if (card.dataset.hakaPaymentEditReady) return;
      const payment = findPayment(card);
      if (!payment?.id) return;
      card.dataset.hakaPaymentEditReady = "true";
      card.dataset.hakaPaymentId = payment.id;
      const actions = card.querySelector(".payment-detail-actions") || card;
      const bar = document.createElement("div");
      bar.className = "haka-payment-edit-bar";
      bar.innerHTML = `<button type="button" data-haka-payment-edit-open>내용 수정</button>`;
      actions.appendChild(bar);
    });
  }

  async function saveEdit(form) {
    const client = getClient();
    const id = Number(form.dataset.paymentId || 0);
    const message = form.querySelector("[data-haka-payment-edit-message]");
    if (!client || !id) return;
    const data = new FormData(form);
    const amount = money(data.get("amount"));
    const estimateTotal = money(data.get("estimate_total"));
    const taxType = clean(data.get("tax_type"));
    const withholding = taxType.includes("3.3") ? Math.round(amount * 0.033) : 0;
    const update = {
      requested_at: clean(data.get("requested_at")) || today(),
      store: clean(data.get("store")),
      vendor: clean(data.get("vendor")),
      payment_item: clean(data.get("payment_item")),
      estimate_total: estimateTotal || amount,
      amount,
      vendor_bank: clean(data.get("vendor_bank")),
      vendor_account_number: clean(data.get("vendor_account_number")),
      vendor_account_holder: clean(data.get("vendor_account_holder")),
      tax_type: taxType || "일반 송금",
      withholding_amount: withholding,
      net_amount: amount - withholding,
      memo: clean(data.get("memo"))
    };
    message.textContent = "수정 내용을 저장하고 있습니다.";
    const { error } = await client.from("payments").update(update).eq("id", id).select("id");
    if (error) {
      message.textContent = `수정 실패: ${error.message}`;
      message.className = "form-message error";
      return;
    }
    message.textContent = "수정 저장되었습니다. 화면을 새로고침합니다.";
    message.className = "form-message";
    await loadPayments(true);
    setTimeout(() => window.location.reload(), 700);
  }

  async function cancelRequest(form) {
    const client = getClient();
    const id = Number(form.dataset.paymentId || 0);
    if (!client || !id) return;
    const reason = clean(prompt("취소/삭제 요청 사유를 입력해 주세요. 실제 삭제하지 않고 기록으로 남깁니다.") || "");
    if (!reason) return;
    const payment = payments.find((item) => Number(item.id) === id) || {};
    const memo = clean(`${payment.memo || ""}\n[취소요청 ${today()}] ${reason}`);
    const { error } = await client.from("payments").update({ status: "취소요청", memo }).eq("id", id).select("id");
    if (error) {
      alert(`취소요청 실패: ${error.message}`);
      return;
    }
    alert("취소요청 상태로 저장했습니다. 기록은 삭제하지 않았습니다.");
    setTimeout(() => window.location.reload(), 500);
  }

  document.addEventListener("click", async (event) => {
    const open = event.target.closest("[data-haka-payment-edit-open]");
    if (open) {
      const card = open.closest("details.payment-review-card, details.payment-card");
      await loadPayments();
      const payment = payments.find((item) => Number(item.id) === Number(card?.dataset.hakaPaymentId)) || findPayment(card);
      if (!payment?.id) {
        alert("수정할 결제건을 정확히 찾지 못했습니다. 새로고침 후 다시 열어 주세요.");
        return;
      }
      card.querySelector("[data-haka-payment-edit-form]")?.remove();
      open.closest(".haka-payment-edit-bar")?.insertAdjacentHTML("afterend", editForm(payment));
      return;
    }

    const close = event.target.closest("[data-haka-payment-edit-cancel]");
    if (close) close.closest("[data-haka-payment-edit-form]")?.remove();

    const cancel = event.target.closest("[data-haka-payment-cancel-request]");
    if (cancel) cancelRequest(cancel.closest("[data-haka-payment-edit-form]"));
  });

  document.addEventListener("submit", (event) => {
    const form = event.target.closest("[data-haka-payment-edit-form]");
    if (!form) return;
    event.preventDefault();
    saveEdit(form);
  });

  const observer = new MutationObserver(() => {
    window.clearTimeout(window.__hakaPaymentEditStableTimer);
    window.__hakaPaymentEditStableTimer = window.setTimeout(attachControls, 160);
  });

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", attachControls, { once: true });
  else attachControls();
  observer.observe(document.documentElement, { childList: true, subtree: true });
  window.addEventListener("focus", () => loadPayments(true).then(attachControls));

  console.info(`[HAKA] ${VERSION} loaded`);
})();
