export const isBusinessIncome = (payment) => payment.tax_type === "사업소득 3.3%";
export const transferCompleted = (payment) => ["송금완료", "이체완료"].includes(payment.transfer_status) || Boolean(payment.transferred_at);
export const grossAmount = (payment) => Number(payment.amount || 0);
export const netPayment = (payment) => Number(payment.net_amount ?? (grossAmount(payment) - Number(payment.withholding_amount || 0)));
export const matchesSearch = (value, search) => String(value ?? "").toLocaleLowerCase("ko-KR").includes(String(search || "").trim().toLocaleLowerCase("ko-KR"));

export function filterPayments(payments, filters = {}) {
  return payments.filter((p) =>
    (!filters.store || p.store === filters.store) &&
    (!filters.status || p.status === filters.status) &&
    (!filters.tax || p.tax_type === filters.tax) &&
    (!filters.start || String(p.requested_at || "") >= filters.start) &&
    (!filters.end || String(p.requested_at || "") <= filters.end) &&
    matchesSearch([p.store, p.vendor, p.payment_item, p.memo, p.vendor_account_holder].join(" "), filters.search)
  );
}

export function summarizePayments(payments) {
  const approved = payments.filter((p) => p.status === "승인");
  const paid = approved.filter(transferCompleted);
  const sum = (rows, amount = grossAmount) => rows.reduce((total, row) => total + amount(row), 0);
  return {
    pendingCount: payments.filter((p) => p.status === "신청").length,
    pending: sum(payments.filter((p) => p.status === "신청")),
    approved: sum(approved), paidCost: sum(paid), paidNet: sum(paid, netPayment),
    withholding: sum(paid, (p) => Number(p.withholding_amount || 0)),
    unpaid: sum(approved.filter((p) => !transferCompleted(p)), netPayment),
    businessCount: payments.filter((p) => p.status !== "반려" && isBusinessIncome(p)).length,
    businessPaidCount: paid.filter(isBusinessIncome).length
  };
}

export function aggregateCosts(payments, groupBy = "store") {
  const groups = new Map();
  for (const payment of payments) {
    const store = payment.store || "매장 미지정";
    const item = payment.payment_item || "품목 미분류";
    const key = groupBy === "item" ? item : groupBy === "detail" ? JSON.stringify([store, item]) : store;
    if (!groups.has(key)) groups.set(key, { name: groupBy === "item" ? item : store, store, item, payments: [] });
    groups.get(key).payments.push(payment);
  }
  return [...groups.values()].map(({ payments: rows, ...group }) => ({ ...group, count: rows.length, ...summarizePayments(rows) }))
    .sort((a, b) => b.approved - a.approved || a.name.localeCompare(b.name, "ko"));
}

export function csvText(rows) {
  const cell = (value) => {
    let text = String(value ?? "");
    // Preserve account-number leading zeros and prevent spreadsheet formulas.
    if (/^[=+\-@\t\r]/.test(text) || /^0\d/.test(text)) text = `'${text}`;
    return `"${text.replace(/"/g, '""')}"`;
  };
  return "\uFEFF" + rows.map((row) => row.map(cell).join(",")).join("\r\n");
}

export function validateImportRows(rows, data) {
  const seen = new Set();
  return rows.map((row, index) => {
    const store = String(row["매장"] || row.store || "").trim();
    const vendor = String(row["업체"] || row.vendor || "").trim();
    const item = String(row["공사 품목"] || row["품목"] || row.payment_item || "").trim();
    const rawAmount = String(row["신청 금액"] ?? row.amount ?? "").replace(/[원,\s]/g, "");
    const amount = /^\d+$/.test(rawAmount) ? Number(rawAmount) : NaN;
    const rawTax = String(row["지급 구분"] || row.tax_type || "일반 송금").trim();
    const tax = ["사업소득 3.3%", "일반 송금"].includes(rawTax) ? rawTax : null;
    const errors = [];
    if (!data.stores.some((s) => s.name === store) && !data.constructionStarts.some((s) => s.store_name === store)) errors.push("등록되지 않은 매장");
    if (!data.vendors.some((v) => v.name === vendor)) errors.push("등록되지 않은 업체");
    if (!item) errors.push("공사 품목 누락");
    if (!Number.isSafeInteger(amount) || amount <= 0) errors.push("금액은 0보다 큰 정수");
    if (!tax) errors.push("지급 구분 확인");
    const key = JSON.stringify([store, vendor, item, amount]);
    if (seen.has(key) || data.payments.some((p) => p.store === store && p.vendor === vendor && p.payment_item === item && Number(p.amount) === amount && p.status !== "반려")) errors.push("중복 가능성 확인");
    seen.add(key);
    return { row: index + 2, store, vendor, payment_item: item, amount, estimate_total: amount, tax_type: tax || rawTax, payment_type: "일시 지급", memo: String(row["메모"] || row.memo || ""), errors };
  });
}
