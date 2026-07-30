(() => {
  const VERSION = "bank-transfer-table-fix-1";
  if (window.__hakaBankTransferTableFixV1) return;
  window.__hakaBankTransferTableFixV1 = true;

  const SUPABASE_URL = "https://yqemtsbdnypgmkuyncxh.supabase.co";
  const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlxZW10c2JkbnlwZ21rdXluY3hoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODAyNjYwMTUsImV4cCI6MjA5NTg0MjAxNX0.gwgdCncqRKKgC8ebj7qIdT-vA4J-wOVd2O9DSa7xEOs";
  const TRANSFER_STATUS = "이체전표 생성됨";
  const clean = (value) => String(value ?? "").replace(/\s+/g, " ").trim();
  const compact = (value) => clean(value).replace(/\s/g, "");
  const digits = (value) => clean(value).replace(/[^0-9]/g, "");
  const amount = (value) => Number(String(value ?? "").replace(/[^0-9.-]/g, "")) || 0;
  const today = () => new Date().toISOString().slice(0, 10);

  function getClient() {
    const factory = window.supabase?.createClient || window.createClient;
    if (!factory) return null;
    return factory(SUPABASE_URL, SUPABASE_ANON_KEY);
  }

  function normalizeBankName(bank) {
    const text = compact(bank);
    const banks = [["신한", "신한"], ["국민", "국민"], ["기업", "기업"], ["우리", "우리"], ["하나", "하나"], ["농협", "농협"], ["축협", "농협"], ["카카오", "카카오"], ["토스", "토스"], ["케이뱅크", "케이뱅크"], ["부산", "부산"], ["대구", "아이엠뱅크"], ["아이엠", "아이엠뱅크"], ["새마을", "새마을금고"], ["신협", "신협"], ["우체국", "우체국"], ["전북", "전북"], ["광주", "광주"], ["경남", "경남"], ["수협", "수협"]];
    return banks.find(([needle]) => text.includes(needle))?.[1] || clean(bank).slice(0, 12);
  }

  function currentTransferPanel() {
    const title = clean(document.querySelector(".topbar h1")?.textContent || document.querySelector("h1")?.textContent || "");
    if (!title.includes("은행 이체 전표")) return null;
    return [...document.querySelectorAll("article.panel, section.panel, .panel")]
      .find((panel) => clean(panel.textContent).includes("은행 이체 전표 작성") && panel.querySelector("table"));
  }

  function dateRange(panel) {
    const inputs = [...panel.querySelectorAll("input[type='date']")];
    return { start: inputs[0]?.value || "", end: inputs[1]?.value || inputs[0]?.value || "" };
  }

  function tableRecords(panel) {
    const table = panel.querySelector("table");
    if (!table) return [];
    return [...table.querySelectorAll("tbody tr")].map((row) => {
      const cells = [...row.children].map((cell) => clean(cell.textContent));
      if (cells.length < 6) return null;
      const record = {
        store: cells[0],
        vendor: cells[1],
        bank: normalizeBankName(cells[2]),
        account: digits(cells[3]),
        holder: cells[4],
        amount: amount(cells[5])
      };
      if (!record.store || !record.vendor || !record.bank || !record.account || !record.holder || !record.amount) return null;
      return record;
    }).filter(Boolean);
  }

  function downloadExcel(records, label) {
    if (!window.XLSX) {
      alert("엑셀 생성 모듈을 아직 불러오지 못했습니다. 새로고침 후 다시 눌러 주세요.");
      return false;
    }
    const rows = [["*입금은행", "*입금계좌", "*입금액", "고객관리성명"], ...records.map((record) => [record.bank, String(record.account), Number(record.amount), record.holder])];
    const ws = XLSX.utils.aoa_to_sheet(rows);
    ws["!cols"] = [{ wch: 12 }, { wch: 24 }, { wch: 14 }, { wch: 34 }];
    for (let row = 2; row <= rows.length; row += 1) {
      if (ws[`B${row}`]) {
        ws[`B${row}`].t = "s";
        ws[`B${row}`].z = "@";
        ws[`B${row}`].v = String(ws[`B${row}`].v || "");
      }
      if (ws[`C${row}`]) {
        ws[`C${row}`].t = "n";
        ws[`C${row}`].z = "0";
        ws[`C${row}`].v = Number(ws[`C${row}`].v || 0);
      }
    }
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "입력정보");
    const data = XLSX.write(wb, { bookType: "xls", type: "array" });
    const blob = new Blob([data], { type: "application/vnd.ms-excel" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `은행대량이체_${label}_${records.length}건.xls`;
    document.body.appendChild(link);
    link.click();
    link.remove();
    URL.revokeObjectURL(url);
    return true;
  }

  function paymentMatches(record, payment) {
    if (clean(payment.status) !== "승인") return false;
    if (record.store && compact(payment.store) !== compact(record.store)) return false;
    if (record.vendor && compact(payment.vendor) !== compact(record.vendor)) return false;
    if (record.account && digits(payment.vendor_account_number) && digits(payment.vendor_account_number) !== record.account) return false;
    const payAmount = amount(payment.net_amount || payment.amount || 0);
    return payAmount === record.amount || amount(payment.amount) === record.amount;
  }

  async function markTransferred(records, range) {
    const client = getClient();
    if (!client) return { ok: false, count: 0, message: "Supabase 연결 모듈을 찾지 못했습니다." };
    let query = client.from("payments").select("id,store,vendor,amount,net_amount,vendor_account_number,requested_at,status").eq("status", "승인").limit(1000);
    if (range.start) query = query.gte("requested_at", range.start);
    if (range.end) query = query.lte("requested_at", `${range.end}T23:59:59`);
    const { data, error } = await query;
    if (error) return { ok: false, count: 0, message: error.message };

    const used = new Set();
    const ids = [];
    records.forEach((record) => {
      const found = (data || []).find((payment) => !used.has(payment.id) && paymentMatches(record, payment));
      if (found) {
        used.add(found.id);
        ids.push(found.id);
      }
    });
    if (!ids.length) return { ok: false, count: 0, message: "표의 이체건과 결제 원본을 매칭하지 못했습니다." };

    const update = await client.from("payments").update({ status: TRANSFER_STATUS }).in("id", ids).eq("status", "승인").select("id");
    if (update.error) return { ok: false, count: 0, message: update.error.message };
    return { ok: true, count: update.data?.length || 0 };
  }

  function enableButton(panel) {
    const records = tableRecords(panel);
    const button = [...panel.querySelectorAll("button")].find((btn) => clean(btn.textContent).includes("전표") || clean(btn.textContent).includes("엑셀") || clean(btn.textContent).includes("생성"));
    if (!button) return;
    button.disabled = !records.length;
    if (records.length) button.textContent = `조회건 전표/엑셀 생성 ${records.length}건`;
  }

  async function handleDownload(event, button) {
    const panel = currentTransferPanel();
    if (!panel || !panel.contains(button)) return false;
    const records = tableRecords(panel);
    const range = dateRange(panel);
    event.preventDefault();
    event.stopPropagation();
    event.stopImmediatePropagation();

    if (!records.length) {
      alert("표 안에 이체 가능한 건을 찾지 못했습니다. 날짜 조회 결과와 계좌정보를 확인해 주세요.");
      return true;
    }
    const oldText = button.textContent;
    button.disabled = true;
    button.textContent = "전표/엑셀 생성 중";
    try {
      const label = `${range.start || today()}_${range.end || range.start || today()}`;
      if (!downloadExcel(records, label)) return true;
      const marked = await markTransferred(records, range);
      if (marked.ok) {
        alert(`${records.length}건 이체파일을 생성했고, ${marked.count}건을 다음 이체대상에서 제외 처리했습니다.`);
        setTimeout(() => window.location.reload(), 900);
      } else {
        alert(`${records.length}건 이체파일은 생성됐지만 상태 저장은 실패했습니다: ${marked.message}`);
      }
    } finally {
      button.disabled = false;
      button.textContent = oldText;
    }
    return true;
  }

  document.addEventListener("click", (event) => {
    const button = event.target.closest?.("button, [data-bank-transfer-download]");
    if (!button) return;
    const text = clean(button.textContent);
    if (!text.includes("전표") && !text.includes("엑셀") && !text.includes("생성")) return;
    handleDownload(event, button);
  }, true);

  const observer = new MutationObserver(() => {
    clearTimeout(window.__hakaBankTransferTableFixTimer);
    window.__hakaBankTransferTableFixTimer = setTimeout(() => {
      const panel = currentTransferPanel();
      if (panel) enableButton(panel);
    }, 120);
  });
  observer.observe(document.documentElement, { childList: true, subtree: true });
  setTimeout(() => {
    const panel = currentTransferPanel();
    if (panel) enableButton(panel);
  }, 500);

  console.info(`[HAKA] ${VERSION} loaded`);
})();
