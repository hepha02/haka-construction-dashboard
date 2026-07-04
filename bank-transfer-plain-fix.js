(() => {
  const VERSION = "bank-transfer-plain-3";
  const SUPABASE_URL = "https://yqemtsbdnypgmkuyncxh.supabase.co";
  const SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlxZW10c2JkbnlwZ21rdXluY3hoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODAyNjYwMTUsImV4cCI6MjA5NTg0MjAxNX0.gwgdCncqRKKgC8ebj7qIdT-vA4J-wOVd2O9DSa7xEOs";

  function clean(value) {
    return String(value ?? "").replace(/\s+/g, " ").replace(/\t/g, " ").replace(/\r?\n/g, " ").trim();
  }

  function key(value) { return clean(value).replace(/\s/g, ""); }
  function digits(value) { return clean(value).replace(/[^0-9]/g, ""); }
  function money(value) {
    const number = Number(String(value ?? "").replace(/[^0-9.-]/g, ""));
    return Number.isFinite(number) ? Math.round(number) : 0;
  }
  function today() { return new Date().toISOString().slice(0, 10); }

  function nextDate(date) {
    if (!date) return "";
    const d = new Date(`${date}T00:00:00`);
    d.setDate(d.getDate() + 1);
    return d.toISOString().slice(0, 10);
  }

  function getAccessToken() {
    for (let index = 0; index < localStorage.length; index += 1) {
      const storageKey = localStorage.key(index) || "";
      if (!storageKey.includes("auth-token")) continue;
      try {
        const parsed = JSON.parse(localStorage.getItem(storageKey) || "{}");
        const token = parsed.access_token || parsed.currentSession?.access_token || parsed.session?.access_token;
        if (token) return token;
      } catch (_) {}
    }
    return "";
  }

  function normalizeBankName(bank) {
    const text = clean(bank).replace(/\s/g, "");
    const banks = [
      ["신한", "신한"], ["국민", "국민"], ["기업", "기업"], ["우리", "우리"], ["하나", "하나"],
      ["농협", "농협"], ["축협", "농협"], ["카카오", "카카오"], ["토스", "토스"], ["케이뱅크", "케이뱅크"],
      ["부산", "부산"], ["대구", "아이엠뱅크"], ["아이엠", "아이엠뱅크"], ["새마을", "새마을금고"],
      ["신협", "신협"], ["우체국", "우체국"], ["전북", "전북"], ["광주", "광주"], ["경남", "경남"], ["수협", "수협"]
    ];
    return banks.find(([needle]) => text.includes(needle))?.[1] || clean(bank).slice(0, 8);
  }

  function dateInputs(root = document) {
    const panel = root.closest?.(".panel") || root;
    let dates = [...panel.querySelectorAll("input[type='date']")];
    if (dates.length < 2) dates = [...document.querySelectorAll("input[type='date']")];
    return { start: dates[0]?.value || "", end: dates[1]?.value || dates[0]?.value || "" };
  }

  function dateOf(payment) { return clean(payment.requested_at).slice(0, 10); }
  function inRange(date, start, end) {
    if (!date) return false;
    if (start && date < start) return false;
    if (end && date > end) return false;
    return true;
  }

  function selectedCards() {
    return [...document.querySelectorAll(".transfer-payment-select:checked, .payment-select:checked")]
      .map((box) => box.closest(".payment-review-card, .payment-card, tr"))
      .filter(Boolean);
  }

  function cardInfo(card) {
    const text = clean(card.innerText || card.textContent || "");
    const date = text.match(/20\d{2}-\d{2}-\d{2}/)?.[0] || "";
    const store = clean(card.querySelector(".payment-summary-main strong")?.textContent || card.querySelector("strong")?.textContent || "");
    const vendor = clean(card.querySelector(".payment-summary-main span")?.textContent || "");
    const spans = [...card.querySelectorAll(".payment-summary-meta span")].map((span) => clean(span.textContent));
    const item = spans.find((span) => span && !span.includes("신청일") && !span.includes("승인") && !span.includes("반려") && !span.includes("대기")) || "";
    return { store, vendor, item, date };
  }

  function selectedMatcher(cards) {
    const infos = cards.map(cardInfo).filter((info) => info.store || info.vendor || info.item || info.date);
    if (!infos.length) return null;
    return (payment) => infos.some((info) => {
      const storeMatch = !info.store || key(payment.store) === key(info.store);
      const vendorMatch = !info.vendor || key(payment.vendor) === key(info.vendor);
      const itemMatch = !info.item || key(payment.payment_item).includes(key(info.item)) || key(info.item).includes(key(payment.payment_item));
      const dateMatch = !info.date || dateOf(payment) === info.date;
      return storeMatch && vendorMatch && itemMatch && dateMatch;
    });
  }

  async function supabaseGet(path) {
    const token = getAccessToken() || SUPABASE_KEY;
    const response = await fetch(`${SUPABASE_URL}/rest/v1/${path}`, {
      headers: { apikey: SUPABASE_KEY, Authorization: `Bearer ${token}` }
    });
    if (!response.ok) throw new Error(await response.text());
    return response.json();
  }

  async function loadPayments(start, end) {
    const params = new URLSearchParams();
    params.set("select", "id,store,vendor,payment_item,status,requested_at,amount,net_amount,vendor_bank,vendor_account_number,vendor_account_holder");
    params.set("status", "eq.승인");
    if (start) params.append("requested_at", `gte.${start}`);
    if (end) params.append("requested_at", `lt.${nextDate(end)}`);
    params.set("order", "id.asc");
    return supabaseGet(`payments?${params.toString()}`);
  }

  async function loadVendors() {
    return supabaseGet("vendors?select=name,bank,account_number,account_holder");
  }

  function makeRecords(payments, vendors) {
    const vendorMap = new Map(vendors.map((vendor) => [key(vendor.name), vendor]));
    return payments.map((payment) => {
      const vendor = vendorMap.get(key(payment.vendor)) || {};
      const bank = payment.vendor_bank || vendor.bank || "";
      const account = payment.vendor_account_number || vendor.account_number || "";
      const holder = payment.vendor_account_holder || vendor.account_holder || payment.vendor || "";
      const amount = money(payment.net_amount || payment.amount || 0);
      return {
        id: payment.id,
        bank: normalizeBankName(bank),
        account: digits(account),
        amount,
        holder: clean(holder),
        payment,
        ready: Boolean(bank && account && holder && amount > 0)
      };
    }).filter((record) => record.ready);
  }

  function download(records) {
    const rows = [["*입금은행", "*입금계좌", "*입금액", "고객관리성명"], ...records.map((record) => [
      record.bank,
      record.account,
      String(record.amount),
      record.holder
    ])];
    const content = rows.map((row) => row.map(clean).join("\t")).join("\r\n");
    const blob = new Blob([content], { type: "application/vnd.ms-excel;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `은행대량이체_${today()}_${records.length}건.xls`;
    document.body.appendChild(link);
    link.click();
    link.remove();
    URL.revokeObjectURL(url);
  }

  window.addEventListener("click", async (event) => {
    const button = event.target?.closest?.("[data-bank-transfer-download]");
    if (!button) return;
    event.preventDefault();
    event.stopPropagation();
    event.stopImmediatePropagation();

    const { start, end } = dateInputs(button.closest(".panel") || document);
    const selected = selectedCards();
    const originalText = button.textContent;
    button.disabled = true;
    button.textContent = "이체 파일 생성 중";

    try {
      const [paymentsRaw, vendors] = await Promise.all([loadPayments(start, end), loadVendors()]);
      let payments = paymentsRaw.filter((payment) => inRange(dateOf(payment), start, end));
      const matchSelected = selectedMatcher(selected);
      if (matchSelected) {
        const selectedPayments = payments.filter(matchSelected);
        if (selectedPayments.length) payments = selectedPayments;
      }
      const records = makeRecords(payments, vendors);
      if (!records.length) {
        const missing = payments.length ? `${payments.length}건은 조회됐지만 계좌/금액 정보가 부족합니다.` : "조회 범위에 승인 완료 건이 없습니다.";
        alert(`${missing} 날짜, 승인상태, 업체계좌 정보를 확인해 주세요.`);
        return;
      }
      download(records);
      alert(`${records.length}건 이체파일을 생성했습니다. 금액 칸은 숫자만 들어가도록 수정했습니다.`);
    } catch (error) {
      alert(`이체파일 생성 중 오류가 났습니다: ${error.message || error}`);
    } finally {
      button.disabled = false;
      button.textContent = originalText;
    }
  }, true);

  console.info(`[HAKA] ${VERSION} loaded`);
})();
