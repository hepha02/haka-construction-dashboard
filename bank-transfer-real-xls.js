(() => {
  const VERSION = "bank-transfer-real-xls-6-preserve-same-amount";
  if (window.__hakaBankTransferStrictV6) return;
  window.__hakaBankTransferStrictV6 = true;

  const SUPABASE_URL = "https://yqemtsbdnypgmkuyncxh.supabase.co";
  const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlxZW10c2JkbnlwZ21rdXluY3hoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODAyNjYwMTUsImV4cCI6MjA5NTg0MjAxNX0.gwgdCncqRKKgC8ebj7qIdT-vA4J-wOVd2O9DSa7xEOs";
  const TRANSFER_STATUS = "이체전표 생성됨";
  const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
  const clean = (value) => String(value ?? "").replace(/\s+/g, " ").replace(/\t/g, " ").replace(/\r?\n/g, " ").trim();
  const compact = (value) => clean(value).replace(/\s/g, "");
  const digits = (value) => clean(value).replace(/[^0-9]/g, "");
  const today = () => new Date().toISOString().slice(0, 10);

  function money(value) {
    const number = Number(String(value ?? "").replace(/[^0-9.-]/g, ""));
    return Number.isFinite(number) ? Math.round(number) : 0;
  }

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

  function dateInputs(root = document) {
    const panel = root.closest?.(".panel") || root;
    let dates = [...panel.querySelectorAll("input[type='date']")];
    if (dates.length < 2) dates = [...document.querySelectorAll("input[type='date']")];
    return { start: dates[0]?.value || "", end: dates[1]?.value || dates[0]?.value || "" };
  }

  function dateFromText(text) {
    const body = clean(text);
    const labeled = body.match(/신청일\s*(20\d{2}-\d{2}-\d{2})/);
    return labeled?.[1] || body.match(/20\d{2}-\d{2}-\d{2}/)?.[0] || "";
  }

  function inRange(date, start, end) {
    if (!date) return false;
    if (start && date < start) return false;
    if (end && date > end) return false;
    return true;
  }

  function isVisible(el) {
    if (!el) return false;
    const card = el.closest?.(".payment-review-card, .payment-card");
    if (card && card.style.display === "none") return false;
    const style = getComputedStyle(el);
    return style.display !== "none" && style.visibility !== "hidden";
  }

  function statusText(card) {
    const candidates = [...card.querySelectorAll(".badge, .status, [data-status], span, td")].map((el) => clean(el.textContent));
    return candidates.find((text) => text.includes("이체전표") || text.includes("이체완료") || text.includes("승인") || text.includes("반려") || text.includes("대기") || text.includes("신청") || text.includes("다운로드 가능")) || "";
  }

  function isTransferReady(card) {
    const status = statusText(card);
    return (status.includes("승인") || status.includes("다운로드 가능")) && !status.includes("이체전표") && !status.includes("이체완료") && !status.includes("대기") && !status.includes("신청") && !status.includes("반려");
  }

  function checkedBoxes(root = document) {
    return [...root.querySelectorAll(".transfer-payment-select:checked, .transfer-select:checked")].filter(isVisible);
  }

  function rowBoxes(root = document) {
    return [...root.querySelectorAll(".transfer-payment-select, .transfer-select")].filter(isVisible);
  }

  function targetsFromBoxes(boxes) {
    const cards = [];
    const rows = [];
    const ids = [];
    boxes.forEach((box) => {
      const id = Number(box.value || box.dataset.paymentId || 0);
      if (id) ids.push(id);
      const card = box.closest(".payment-review-card, .payment-card");
      const row = box.closest("tr");
      if (card) cards.push(card);
      else if (row) rows.push(row);
    });
    return { cards, rows, ids: [...new Set(ids)], count: boxes.length };
  }

  function selectedTargets(root = document) {
    return targetsFromBoxes(checkedBoxes(root));
  }

  function rangeTargets(root = document) {
    return targetsFromBoxes(rowBoxes(root));
  }

  async function expandCards(cards) {
    for (const card of cards) {
      if (card.tagName === "DETAILS" && !card.open) {
        card.open = true;
        continue;
      }
      const opener = [...card.querySelectorAll("button, a")].find((el) => clean(el.textContent).includes("펼치기"));
      if (opener) {
        opener.click();
        await wait(80);
      }
    }
    await wait(250);
  }

  function detailRows(card) {
    return [...card.querySelectorAll(".payment-detail-grid > div")].map((box) => ({
      label: compact(box.querySelector("span")?.textContent || ""),
      value: clean(box.querySelector("strong")?.textContent || "")
    }));
  }

  function detailValue(rows, labels) {
    const wanted = labels.map(compact);
    for (const row of rows) {
      if (!row.label || !row.value) continue;
      if (wanted.some((label) => row.label.includes(label) || label.includes(row.label))) return row.value;
    }
    return "";
  }

  function summaryMain(card) {
    return {
      store: clean(card.querySelector(".payment-summary-main strong")?.textContent || ""),
      vendor: clean(card.querySelector(".payment-summary-main span")?.textContent || ""),
      item: clean(card.querySelector(".payment-summary-meta span")?.textContent || "")
    };
  }

  function summaryAmount(card) {
    return money(card.querySelector(".payment-summary-meta strong")?.textContent || clean(card.textContent).match(/₩[0-9,]+/)?.[0] || "");
  }

  function recordFromCard(card) {
    if (!isTransferReady(card)) return null;
    const rows = detailRows(card);
    const main = summaryMain(card);
    const bank = detailValue(rows, ["입금은행", "은행"]);
    const account = detailValue(rows, ["입금계좌", "계좌번호", "계좌"]);
    const holder = detailValue(rows, ["예금주", "고객관리성명"]) || main.vendor;
    const amount = money(detailValue(rows, ["실지급액", "입금액", "이번신청액", "신청액", "금액"]) || summaryAmount(card));
    const id = Number(card.querySelector(".transfer-select, .transfer-payment-select")?.value || 0);
    if (!bank || !account || !holder || !amount) return null;
    return { id, ...main, bank: normalizeBankName(bank), account: digits(account), amount, holder: clean(holder), date: dateFromText(card.innerText || card.textContent || "") };
  }

  function recordFromRow(row) {
    const cells = [...row.children].map((cell) => clean(cell.textContent));
    if (cells.length < 8) return null;
    const box = row.querySelector(".transfer-select, .transfer-payment-select");
    const id = Number(box?.value || 0);
    const hasCheckboxColumn = !!box || cells[0] === "";
    const offset = hasCheckboxColumn ? 1 : 0;
    const store = cells[offset + 0] || "";
    const vendor = cells[offset + 1] || "";
    const bank = cells[offset + 2] || "";
    const account = cells[offset + 3] || "";
    const holder = cells[offset + 4] || vendor || "";
    const amount = money(cells[offset + 5] || "");
    const status = cells[offset + 7] || "다운로드 가능";
    if (status.includes("이체전표") || status.includes("이체완료") || status.includes("계좌정보") || status.includes("반려") || status.includes("대기") || status.includes("신청")) return null;
    if (!bank || !account || !holder || !amount) return null;
    return { id, store, vendor, item: "", bank: normalizeBankName(bank), account: digits(account), amount, holder: clean(holder), date: dateFromText(row.innerText || row.textContent || "") };
  }

  function uniqueRecords(records) {
    const seenIds = new Set();
    return records.filter((record) => {
      if (!record.id) return true;
      const id = `id:${record.id}`;
      if (seenIds.has(id)) return false;
      seenIds.add(id);
      return true;
    });
  }

  function downloadRealExcel(records, label) {
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
    link.download = `은행대량이체_${label || today()}_${records.length}건.xls`;
    document.body.appendChild(link);
    link.click();
    link.remove();
    URL.revokeObjectURL(url);
    return true;
  }

  function sameText(a, b) {
    if (!a || !b) return false;
    return compact(a) === compact(b);
  }

  function paymentAmount(payment) {
    return money(payment.net_amount || payment.amount || 0);
  }

  function paymentDate(payment) {
    return String(payment.requested_at || "").slice(0, 10);
  }

  function recordMatchesPayment(record, payment) {
    if (payment.status !== "승인") return false;
    if (record.date && paymentDate(payment) !== record.date) return false;
    if (record.store && !sameText(record.store, payment.store)) return false;
    if (record.vendor && !sameText(record.vendor, payment.vendor)) return false;
    if (record.account && digits(payment.vendor_account_number) && digits(payment.vendor_account_number) !== record.account) return false;
    return paymentAmount(payment) === money(record.amount);
  }

  async function findIdsByRecords(client, records) {
    const dates = records.map((record) => record.date).filter(Boolean).sort();
    let query = client.from("payments").select("id,store,vendor,amount,net_amount,vendor_account_number,vendor_account_holder,requested_at,status").eq("status", "승인").limit(1000);
    if (dates.length) {
      query = query.gte("requested_at", dates[0]).lte("requested_at", `${dates[dates.length - 1]}T23:59:59`);
    }
    const { data, error } = await query;
    if (error) throw error;
    const used = new Set();
    const ids = [];
    records.forEach((record) => {
      const match = (data || []).find((payment) => !used.has(payment.id) && recordMatchesPayment(record, payment));
      if (match) {
        used.add(match.id);
        ids.push(match.id);
      }
    });
    return ids;
  }

  async function markTransferred(records, directIds = []) {
    const client = getClient();
    if (!client) return { ok: false, count: 0, message: "Supabase 연결 모듈을 찾지 못해 중복 제외 처리를 못했습니다." };
    let ids = [...new Set(directIds.map(Number).filter(Boolean))];
    try {
      if (!ids.length || ids.length < records.length) {
        const matchedIds = await findIdsByRecords(client, records);
        ids = [...new Set([...ids, ...matchedIds])];
      }
    } catch (error) {
      return { ok: false, count: 0, message: `결제건 조회 실패: ${error.message}` };
    }
    if (!ids.length) return { ok: false, count: 0, message: "결제건을 매칭하지 못했습니다. 매장명/업체명/금액/계좌정보를 확인해 주세요." };
    const { data, error } = await client
      .from("payments")
      .update({ status: TRANSFER_STATUS })
      .in("id", ids)
      .eq("status", "승인")
      .select("id");
    if (error) return { ok: false, count: 0, message: error.message };
    return { ok: true, count: data?.length || 0, ids, message: "" };
  }

  function markRowsVisually(paymentIds) {
    const idSet = new Set(paymentIds.map(String));
    document.querySelectorAll(".transfer-select, .transfer-payment-select").forEach((box) => {
      if (box.value && !idSet.has(String(box.value))) return;
      const row = box.closest("tr");
      const card = box.closest(".payment-review-card, .payment-card");
      const target = row || card;
      if (!target) return;
      if (box.checked || !box.value) {
        target.style.opacity = "0.55";
        box.checked = false;
        box.disabled = true;
        const badge = target.querySelector(".badge") || target.querySelector("td:last-child");
        if (badge) badge.textContent = TRANSFER_STATUS;
      }
    });
  }

  window.addEventListener("click", async (event) => {
    const button = event.target?.closest?.("[data-bank-transfer-download]");
    if (!button) return;
    event.preventDefault();
    event.stopPropagation();
    event.stopImmediatePropagation();

    const panel = button.closest(".panel") || document;
    const { start, end } = dateInputs(panel);
    const selected = selectedTargets(panel);
    const hasDateScope = Boolean(start || end);
    const isRangeDownload = button.dataset.bankTransferDownload === "range" || (hasDateScope && !selected.count);

    if (!selected.count && !isRangeDownload) {
      alert("이체 파일은 전체 승인건을 자동으로 내려받지 않습니다. 이체대상 체크박스를 선택하거나 날짜를 조회한 뒤 다운로드해 주세요.");
      return;
    }
    if (isRangeDownload && (!start || !end)) {
      alert("조회 결과 전체 다운로드는 시작일과 종료일을 모두 선택한 뒤 사용할 수 있습니다.");
      return;
    }

    const oldText = button.textContent;
    button.disabled = true;
    button.textContent = "이체 파일 생성 중";
    try {
      let targets = selected;
      if (!selected.count) targets = rangeTargets(panel);
      let records = targets.rows.map(recordFromRow).filter(Boolean);
      let cards = targets.cards;
      if (!selected.count) cards = cards.filter((card) => inRange(dateFromText(card.innerText || card.textContent || ""), start, end));
      await expandCards(cards);
      records = records.concat(cards.map(recordFromCard).filter(Boolean));
      records = uniqueRecords(records);
      if (!records.length) {
        alert("선택/조회 범위 안에 이체 가능한 승인건을 찾지 못했습니다. 날짜, 체크박스, 계좌정보를 확인해 주세요.");
        return;
      }
      const directIds = [...new Set([...targets.ids, ...records.map((record) => record.id)].map(Number).filter(Boolean))];
      const label = selected.count ? `선택_${today()}` : `${start}_${end}`;
      if (!downloadRealExcel(records, label)) return;

      const marked = await markTransferred(records, directIds);
      if (marked.ok) {
        markRowsVisually(marked.ids || directIds);
        alert(`${records.length}건 이체파일을 생성했고, ${marked.count}건을 다음 이체대상에서 제외 처리했습니다. 새로고침하면 제외된 건은 기본 이체 목록에서 빠집니다.`);
        setTimeout(() => window.location.reload(), 1200);
      } else {
        alert(`${records.length}건 이체파일은 생성됐지만 중복 제외 상태 저장은 실패했습니다: ${marked.message}`);
      }
    } finally {
      button.disabled = false;
      button.textContent = oldText;
    }
  }, true);

  console.info(`[HAKA] ${VERSION} loaded`);
})();
