(() => {
  const VERSION = "bank-transfer-plain-1";

  function clean(value) {
    return String(value ?? "").replace(/\t/g, " ").replace(/\r?\n/g, " ").trim();
  }

  function digits(value) {
    return clean(value).replace(/[^0-9]/g, "");
  }

  function money(value) {
    const number = Number(digits(value));
    return Number.isFinite(number) ? number : 0;
  }

  function today() {
    return new Date().toISOString().slice(0, 10);
  }

  function dateInputs(root = document) {
    const start = root.querySelector("[data-transfer-start], [data-payment-review-start], input[type='date']");
    const dates = [...root.querySelectorAll("[data-transfer-start], [data-transfer-end], [data-payment-review-start], [data-payment-review-end], input[type='date']")];
    const end = root.querySelector("[data-transfer-end], [data-payment-review-end]") || dates[1] || start;
    return { start: start?.value || "", end: end?.value || "" };
  }

  function inRange(date, start, end) {
    const value = clean(date).slice(0, 10);
    if (!value) return true;
    if (start && value < start) return false;
    if (end && value > end) return false;
    return true;
  }

  function closestPaymentElement(node) {
    return node?.closest?.(".payment-review-card, .payment-card, tr");
  }

  function labelValue(card, labels) {
    const labelSet = labels.map((label) => label.replace(/\s/g, ""));
    const blocks = [...card.querySelectorAll("div, p, li, td")];
    for (const block of blocks) {
      const text = clean(block.textContent);
      const normalized = text.replace(/\s/g, "");
      if (!labelSet.some((label) => normalized.includes(label))) continue;
      const strong = block.querySelector("strong, b");
      if (strong) return clean(strong.textContent);
      for (const label of labels) {
        const idx = text.indexOf(label);
        if (idx >= 0) return clean(text.slice(idx + label.length).replace(/^[:：-]+/, ""));
      }
    }
    return "";
  }

  function dateFromElement(el) {
    const chip = clean(el.querySelector(".payment-date-chip, [data-payment-date]")?.textContent || "");
    const fromChip = chip.match(/20\d{2}-\d{2}-\d{2}/)?.[0];
    if (fromChip) return fromChip;
    return clean(el.textContent).match(/20\d{2}-\d{2}-\d{2}/)?.[0] || "";
  }

  function recordFromCard(card) {
    const status = clean(card.querySelector(".badge, .status, [data-status]")?.textContent || card.textContent);
    if (status.includes("반려") || status.includes("신청") || !status.includes("승인")) return null;
    const bank = labelValue(card, ["입금은행", "은행"]);
    const account = labelValue(card, ["입금계좌", "계좌번호", "계좌"]);
    const holder = labelValue(card, ["예금주", "고객관리성명", "업체"]);
    const amountText = labelValue(card, ["실지급액", "입금액", "이번 신청액", "금액"]) || clean(card.querySelector(".amount, [data-amount]")?.textContent || "");
    const amount = money(amountText);
    if (!bank || !account || !holder || !amount) return null;
    return { bank, account: digits(account), amount, holder, date: dateFromElement(card) };
  }

  function tableIndexes(table) {
    const headers = [...table.querySelectorAll("thead th")].map((th) => clean(th.textContent));
    return {
      bank: headers.findIndex((h) => h.includes("입금은행") || h === "은행"),
      account: headers.findIndex((h) => h.includes("입금계좌") || h.includes("계좌번호")),
      holder: headers.findIndex((h) => h.includes("예금주") || h.includes("고객관리성명")),
      amount: headers.findIndex((h) => h.includes("입금액") || h.includes("실지급액") || h.includes("금액")),
      status: headers.findIndex((h) => h.includes("상태")),
      date: headers.findIndex((h) => h.includes("신청일") || h.includes("날짜"))
    };
  }

  function recordFromRow(row) {
    const table = row.closest("table");
    const idx = tableIndexes(table);
    const cells = [...row.children];
    if (idx.bank < 0 || idx.account < 0 || idx.holder < 0 || idx.amount < 0) return null;
    const status = idx.status >= 0 ? clean(cells[idx.status]?.textContent) : "승인";
    if (status.includes("반려") || status.includes("신청")) return null;
    const bank = clean(cells[idx.bank]?.textContent);
    const account = clean(cells[idx.account]?.textContent);
    const holder = clean(cells[idx.holder]?.textContent);
    const amount = money(cells[idx.amount]?.textContent);
    const date = idx.date >= 0 ? clean(cells[idx.date]?.textContent).slice(0, 10) : "";
    if (!bank || !account || !holder || !amount) return null;
    return { bank, account: digits(account), amount, holder, date };
  }

  function visible(el) {
    const style = getComputedStyle(el);
    return style.display !== "none" && style.visibility !== "hidden" && el.offsetParent !== null;
  }

  function selectedElements() {
    return [...document.querySelectorAll(".transfer-payment-select:checked, .payment-select:checked")]
      .map(closestPaymentElement)
      .filter(Boolean);
  }

  function visiblePaymentElements() {
    const cards = [...document.querySelectorAll(".payment-review-card, .payment-card")].filter(visible);
    const rows = [...document.querySelectorAll("table tbody tr")].filter(visible);
    return [...cards, ...rows];
  }

  function collectRecords(button) {
    const selected = selectedElements();
    const elements = selected.length ? selected : visiblePaymentElements();
    const { start, end } = dateInputs(button.closest(".panel") || document);
    const records = [];
    for (const el of elements) {
      const record = el.matches("tr") ? recordFromRow(el) : recordFromCard(el);
      if (!record) continue;
      if (!inRange(record.date, start, end)) continue;
      records.push(record);
    }
    const seen = new Set();
    return records.filter((record) => {
      const key = [record.bank, record.account, record.amount, record.holder, record.date].join("|");
      if (seen.has(key)) return false;
      seen.add(key);
      return true;
    });
  }

  function download(records) {
    const rows = [["*입금은행", "*입금계좌", "*입금액", "고객관리성명"], ...records.map((record) => [
      record.bank,
      record.account,
      String(Math.round(record.amount)),
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

  window.addEventListener("click", (event) => {
    const button = event.target?.closest?.("[data-bank-transfer-download]");
    if (!button) return;
    event.preventDefault();
    event.stopImmediatePropagation();
    const records = collectRecords(button);
    if (!records.length) {
      alert("다운로드할 승인 완료 건이 없거나 계좌/금액 정보가 비어 있습니다. 날짜 조회 범위와 선택 건을 확인해 주세요.");
      return;
    }
    download(records);
  }, true);

  console.info(`[HAKA] ${VERSION} loaded`);
})();
