(() => {
  const VERSION = "bank-transfer-dom-v6";
  const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
  const clean = (value) => String(value ?? "").replace(/\s+/g, " ").replace(/\t/g, " ").replace(/\r?\n/g, " ").trim();
  const digits = (value) => clean(value).replace(/[^0-9]/g, "");
  const money = (value) => {
    const number = Number(String(value ?? "").replace(/[^0-9.-]/g, ""));
    return Number.isFinite(number) ? Math.round(number) : 0;
  };
  const today = () => new Date().toISOString().slice(0, 10);

  function normalizeBankName(bank) {
    const text = clean(bank).replace(/\s/g, "");
    const banks = [["신한", "신한"], ["국민", "국민"], ["기업", "기업"], ["우리", "우리"], ["하나", "하나"], ["농협", "농협"], ["축협", "농협"], ["카카오", "카카오"], ["토스", "토스"], ["케이뱅크", "케이뱅크"], ["부산", "부산"], ["대구", "아이엠뱅크"], ["아이엠", "아이엠뱅크"], ["새마을", "새마을금고"], ["신협", "신협"], ["우체국", "우체국"], ["전북", "전북"], ["광주", "광주"], ["경남", "경남"], ["수협", "수협"]];
    return banks.find(([needle]) => text.includes(needle))?.[1] || clean(bank).slice(0, 8);
  }

  function dateInputs(root = document) {
    const panel = root.closest?.(".panel") || root;
    let dates = [...panel.querySelectorAll("input[type='date']")];
    if (dates.length < 2) dates = [...document.querySelectorAll("input[type='date']")];
    return { start: dates[0]?.value || "", end: dates[1]?.value || dates[0]?.value || "" };
  }

  function inRange(date, start, end) {
    if (!date) return true;
    if (start && date < start) return false;
    if (end && date > end) return false;
    return true;
  }

  function cardDate(card) {
    return clean(card.innerText || card.textContent || "").match(/20\d{2}-\d{2}-\d{2}/)?.[0] || "";
  }

  function cardStatus(card) {
    return clean(card.querySelector(".badge, .status, [data-status]")?.textContent || "");
  }

  function isApproved(card) {
    const status = cardStatus(card);
    return status.includes("승인") && !status.includes("신청") && !status.includes("대기") && !status.includes("반려");
  }

  function isVisible(card) {
    const style = getComputedStyle(card);
    return style.display !== "none" && style.visibility !== "hidden" && card.offsetParent !== null;
  }

  function selectedCards() {
    return [...document.querySelectorAll(".transfer-payment-select:checked, .payment-select:checked")]
      .map((box) => box.closest(".payment-review-card, .payment-card"))
      .filter(Boolean);
  }

  function visibleCards() {
    return [...document.querySelectorAll(".payment-review-card, .payment-card")].filter(isVisible);
  }

  async function expandCards(cards) {
    for (const card of cards) {
      const button = [...card.querySelectorAll("button, a")].find((el) => clean(el.textContent).includes("펼치기"));
      if (button) {
        button.click();
        await wait(100);
      }
    }
    await wait(900);
  }

  function detailMap(card) {
    const map = new Map();
    const boxes = [...card.querySelectorAll(".payment-detail-grid > div")];
    for (const box of boxes) {
      const label = clean(box.querySelector("span")?.textContent || "");
      const value = clean(box.querySelector("strong")?.textContent || "");
      if (label && value) map.set(label.replace(/\s/g, ""), value);
    }
    return map;
  }

  function getDetail(map, labels) {
    for (const label of labels) {
      const wanted = label.replace(/\s/g, "");
      for (const [key, value] of map.entries()) {
        if (key.includes(wanted) || wanted.includes(key)) return value;
      }
    }
    return "";
  }

  function summaryVendor(card) {
    return clean(card.querySelector(".payment-summary-main span")?.textContent || "");
  }

  function summaryAmount(card) {
    return money(card.querySelector(".payment-summary-meta strong")?.textContent || "");
  }

  function recordFromCard(card) {
    if (!isApproved(card)) return null;
    const details = detailMap(card);
    const bank = getDetail(details, ["입금은행", "은행"]);
    const account = getDetail(details, ["입금계좌", "계좌번호", "계좌"]);
    const holder = getDetail(details, ["예금주", "고객관리성명"]) || summaryVendor(card);
    const amount = money(getDetail(details, ["실지급액", "입금액", "이번 신청액", "신청액", "금액"]) || summaryAmount(card));
    if (!bank || !account || !holder || !amount) return null;
    return {
      bank: normalizeBankName(bank),
      account: digits(account),
      amount,
      holder: clean(holder),
      date: cardDate(card)
    };
  }

  function download(records) {
    const rows = [["*입금은행", "*입금계좌", "*입금액", "고객관리성명"], ...records.map((record) => [record.bank, record.account, String(record.amount), record.holder])];
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
    const selected = selectedCards().filter(isApproved);
    const baseCards = (selected.length ? selected : visibleCards().filter(isApproved)).filter((card) => inRange(cardDate(card), start, end));
    const oldText = button.textContent;
    button.disabled = true;
    button.textContent = "이체 파일 생성 중";

    try {
      await expandCards(baseCards);
      let records = baseCards.map(recordFromCard).filter(Boolean).filter((record) => inRange(record.date, start, end));
      const seen = new Set();
      records = records.filter((record) => {
        const id = [record.bank, record.account, record.amount, record.holder].join("|");
        if (seen.has(id)) return false;
        seen.add(id);
        return true;
      });
      if (!records.length) {
        alert(`승인건 ${baseCards.length}건은 보이지만 이체파일용 계좌/금액을 읽지 못했습니다. 펼친 상세에 입금은행, 입금계좌, 예금주, 실지급액이 모두 보이는지 확인해 주세요.`);
        return;
      }
      download(records);
      alert(`${records.length}건 이체파일을 생성했습니다.`);
    } finally {
      button.disabled = false;
      button.textContent = oldText;
    }
  }, true);

  console.info(`[HAKA] ${VERSION} loaded`);
})();
