(() => {
  const VERSION = "bank-transfer-real-xls-1";
  const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
  const clean = (value) => String(value ?? "").replace(/\s+/g, " ").replace(/\t/g, " ").replace(/\r?\n/g, " ").trim();
  const compact = (value) => clean(value).replace(/\s/g, "");
  const digits = (value) => clean(value).replace(/[^0-9]/g, "");
  const today = () => new Date().toISOString().slice(0, 10);

  function money(value) {
    const number = Number(String(value ?? "").replace(/[^0-9.-]/g, ""));
    return Number.isFinite(number) ? Math.round(number) : 0;
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

  function dateFromCard(card) {
    return clean(card.innerText || card.textContent || "").match(/20\d{2}-\d{2}-\d{2}/)?.[0] || "";
  }

  function inRange(date, start, end) {
    if (!date) return true;
    if (start && date < start) return false;
    if (end && date > end) return false;
    return true;
  }

  function isVisible(el) {
    const style = getComputedStyle(el);
    return style.display !== "none" && style.visibility !== "hidden" && el.offsetParent !== null;
  }

  function statusText(card) {
    const candidates = [...card.querySelectorAll(".badge, .status, [data-status], span")].map((el) => clean(el.textContent));
    return candidates.find((text) => text.includes("승인") || text.includes("반려") || text.includes("대기") || text.includes("신청")) || "";
  }

  function isApproved(card) {
    const status = statusText(card);
    return status.includes("승인") && !status.includes("대기") && !status.includes("신청") && !status.includes("반려");
  }

  function allCards() {
    return [...document.querySelectorAll(".payment-review-card, .payment-card")].filter(isVisible);
  }

  function selectedCards() {
    return [...document.querySelectorAll(".transfer-payment-select:checked, .payment-select:checked")]
      .map((box) => box.closest(".payment-review-card, .payment-card"))
      .filter(Boolean)
      .filter(isVisible);
  }

  async function expandCards(cards) {
    for (const card of cards) {
      const opener = [...card.querySelectorAll("button, a")].find((el) => clean(el.textContent).includes("펼치기"));
      if (opener) {
        opener.click();
        await wait(80);
      }
    }
    await wait(1000);
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

  function summaryAmount(card) {
    return money(card.querySelector(".payment-summary-meta strong")?.textContent || clean(card.textContent).match(/₩[0-9,]+/)?.[0] || "");
  }

  function summaryVendor(card) {
    return clean(card.querySelector(".payment-summary-main span")?.textContent || "");
  }

  function recordFromCard(card) {
    if (!isApproved(card)) return null;
    const rows = detailRows(card);
    const bank = detailValue(rows, ["입금은행", "은행"]);
    const account = detailValue(rows, ["입금계좌", "계좌번호", "계좌"]);
    const holder = detailValue(rows, ["예금주", "고객관리성명"]) || summaryVendor(card);
    const amount = money(detailValue(rows, ["실지급액", "입금액", "이번신청액", "신청액", "금액"]) || summaryAmount(card));
    if (!bank || !account || !holder || !amount) return null;
    return {
      bank: normalizeBankName(bank),
      account: digits(account),
      amount,
      holder: clean(holder),
      date: dateFromCard(card)
    };
  }

  function downloadRealExcel(records) {
    if (!window.XLSX) {
      alert("엑셀 생성 모듈을 아직 불러오지 못했습니다. 잠시 후 다시 눌러 주세요.");
      return;
    }
    const rows = [["*입금은행", "*입금계좌", "*입금액", "고객관리성명"], ...records.map((record) => [record.bank, record.account, record.amount, record.holder])];
    const ws = XLSX.utils.aoa_to_sheet(rows);
    ws["!cols"] = [{ wch: 12 }, { wch: 22 }, { wch: 14 }, { wch: 34 }];
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
    const checked = selectedCards();
    let cards = (checked.length ? checked : allCards()).filter(isApproved).filter((card) => inRange(dateFromCard(card), start, end));
    const oldText = button.textContent;
    button.disabled = true;
    button.textContent = "이체 파일 생성 중";
    try {
      await expandCards(cards);
      cards = (checked.length ? checked : allCards()).filter(isApproved).filter((card) => inRange(dateFromCard(card), start, end));
      let records = cards.map(recordFromCard).filter(Boolean);
      const seen = new Set();
      records = records.filter((record) => {
        const id = [record.bank, record.account, record.amount, record.holder].join("|");
        if (seen.has(id)) return false;
        seen.add(id);
        return true;
      });
      if (!records.length) {
        alert(`승인건 ${cards.length}건은 보이지만 계좌/금액을 읽지 못했습니다. 펼친 상세에 입금은행, 입금계좌, 예금주, 실지급액이 보이는지 확인해 주세요.`);
        return;
      }
      downloadRealExcel(records);
      alert(`${records.length}건 이체파일을 생성했습니다.`);
    } finally {
      button.disabled = false;
      button.textContent = oldText;
    }
  }, true);

  console.info(`[HAKA] ${VERSION} loaded`);
})();
