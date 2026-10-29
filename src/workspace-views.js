import { aggregateCosts, summarizePayments, filterPayments, isBusinessIncome, netPayment, matchesSearch } from "./workflow.js";

export const html = (value) => String(value ?? "").replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
const money = (value) => `${Number(value || 0).toLocaleString("ko-KR")}원`;
const sum = (rows, key) => rows.reduce((total, row) => total + Number(row[key] || 0), 0);
const gridTable = (headers, rows) => `<div class="table-wrap"><table><thead><tr>${headers.map((h) => `<th>${h}</th>`).join("")}</tr></thead><tbody>${rows.join("") || `<tr><td colspan="${headers.length}" class="empty">조회된 내역이 없습니다.</td></tr>`}</tbody></table></div>`;
const card = (label, value, helper, tone = "") => `<article class="metric-card ${tone}"><span>${label}</span><strong>${value}</strong><small>${helper}</small></article>`;
export const incomeBadge = (payment) => isBusinessIncome(payment) ? `<span class="income-badge">사업소득 3.3% · 아마란스 신고 확인</span>` : "";

export function incomeReminder(data) {
  const rows = data.payments.filter((p) => isBusinessIncome(p) && p.status !== "반려");
  if (!rows.length) return "";
  const summary = summarizePayments(rows);
  return `<aside class="income-reminder" role="note"><span class="reminder-mark">!</span><div><strong>사업소득 지급 건 ${rows.length}건 · 아마란스 신고를 확인해 주세요</strong><p>신청 ${rows.filter((p) => p.status === "신청").length}건 / 승인 ${rows.filter((p) => p.status === "승인").length}건 / 이 중 송금완료 ${summary.businessPaidCount}건. 이 알림은 신고완료 여부를 판정하지 않습니다.</p></div><button data-income-filter>대상 결제 보기</button></aside>`;
}

export function dashboard(data) {
  const s = summarizePayments(data.payments);
  const stores = aggregateCosts(data.payments).slice(0, 5);
  const max = Math.max(1, ...stores.map((r) => r.approved));
  const recent = data.payments.slice(0, 6);
  const waiting = data.payments.filter((p) => p.status === "신청");
  return `
    <section class="workspace-hero"><div><span class="eyebrow">CONSTRUCTION WORKSPACE</span><h2>현장의 기록이,<br>정확한 공사비가 되도록.</h2><p>신청부터 승인, 이체와 매장별 정산까지 한 흐름으로 관리하세요.</p></div><div class="hero-summary"><span>오늘 확인할 결제</span><strong>${s.pendingCount}<small>건</small></strong><button data-view-link="결제 신청">승인 대기 검토 <span>↗</span></button></div></section>
    <section class="metrics-grid">${card("승인 공사비", money(s.approved), "부가세 포함 신청금액 기준")}${card("송금완료 실지급액", money(s.paidNet), "원천징수 차감 후 지급액")}${card("미송금 승인액", money(s.unpaid), "계좌로 지급할 잔여 금액", "amber")}${card("승인 대기", `${s.pendingCount}건`, `${money(s.pending)} 검토 필요`)}</section>
    <section class="overview-grid"><article class="panel"><div class="panel-head"><div><span class="eyebrow">COST OVERVIEW</span><h2>매장별 승인 공사비</h2></div><button data-view-link="공사비 집계">집계 상세 ↗</button></div><div class="cost-bars">${stores.map((r) => `<div class="cost-bar-row"><div><strong>${html(r.name)}</strong><span>${money(r.approved)}</span></div><div class="bar-track"><i style="width:${r.approved / max * 100}%"></i></div></div>`).join("") || `<p class="empty">승인된 공사비가 없습니다.</p>`}</div><p class="panel-footnote">기존 장부 금액과 별도로 집계합니다.</p></article><article class="panel action-panel"><span class="eyebrow">YOUR NEXT STEP</span><h2>업무를 이어가세요</h2><button data-view-link="결제 신청"><span>01</span><div><strong>결제 검토</strong><small>승인 대기 ${waiting.length}건</small></div><b>→</b></button><button data-view-link="은행 이체 파일 생성"><span>02</span><div><strong>승인 건 이체 준비</strong><small>지급 계좌와 실지급액 확인</small></div><b>→</b></button><button data-view-link="공사비 집계"><span>03</span><div><strong>매장·품목별 비용 확인</strong><small>${data.stores.length}개 매장 · 누적 기록 조회</small></div><b>→</b></button></article></section>
    <article class="panel"><div class="panel-head"><div><span class="eyebrow">RECENT REQUESTS</span><h2>최근 결제 신청</h2></div><button data-view-link="결제 신청">전체 ${data.payments.length}건 보기 ↗</button></div>${gridTable(["신청일", "매장 / 업체", "공사 품목", "실지급액", "진행 상태", "신고 확인"], recent.map((p) => `<tr><td>${html(p.requested_at)}</td><td><strong>${html(p.store)}</strong><small class="cell-sub">${html(p.vendor)}</small></td><td>${html(p.payment_item || "품목 미분류")}</td><td class="money">${money(netPayment(p))}</td><td><span class="badge ${p.status === "승인" ? "green" : p.status === "반려" ? "red" : "amber"}">${html(p.status)}</span></td><td>${incomeBadge(p) || "일반 계산서"}</td></tr>`))}</article>`;
}

export function costReportRows(data, filters) {
  if (filters.source === "legacy") {
    const groups = new Map();
    const parts = (data.costParts || []).filter((p) => (!filters.store || p.store_name === filters.store) && matchesSearch(`${p.store_name} ${p.part_name}`, filters.search));
    for (const p of parts) {
      const key = filters.group === "item" ? p.part_name : filters.group === "detail" ? JSON.stringify([p.store_name, p.part_name]) : p.store_name;
      if (!groups.has(key)) groups.set(key, { name: filters.group === "item" ? p.part_name : p.store_name, store: p.store_name, item: p.part_name, count: 0, legacy: 0 });
      const group = groups.get(key); group.count++; group.legacy += Number(p.amount || 0);
    }
    return [...groups.values()].sort((a, b) => b.legacy - a.legacy);
  }
  return aggregateCosts(filterPayments(data.payments, filters), filters.group);
}

export function costReport(data, filters) {
  const filtered = filterPayments(data.payments, filters);
  const s = summarizePayments(filtered);
  const legacy = filters.source === "legacy";
  const names = [...new Set([...data.stores.map((p) => p.name), ...data.payments.map((p) => p.store), ...(data.costParts || []).map((p) => p.store_name)])].filter(Boolean).sort((a, b) => a.localeCompare(b, "ko"));
  const rows = costReportRows(data, filters);
  const select = (value, current) => value === current ? "selected" : "";
  return `<section class="page-intro"><span class="eyebrow">COST INTELLIGENCE</span><h2>같은 기록으로, 명확한 공사비 집계.</h2><p>매장·공사 품목 단위로 신청, 승인, 지급 현황을 나누어 확인합니다.</p></section>
    <form class="filter-toolbar report-toolbar" id="report-filter-form"><label>집계 기준<select name="source"><option value="payments" ${select("payments", filters.source)}>결제 신청·승인 데이터</option><option value="legacy" ${select("legacy", filters.source)}>기존 장부 품목 원가</option></select></label><label>매장<select name="store"><option value="">전체 매장</option>${names.map((name) => `<option ${select(name, filters.store)}>${html(name)}</option>`).join("")}</select></label><label>집계 단위<select name="group"><option value="store" ${select("store", filters.group)}>매장별</option><option value="item" ${select("item", filters.group)}>품목별</option><option value="detail" ${select("detail", filters.group)}>매장 × 품목</option></select></label><label>신청 시작일<input type="date" name="start" value="${html(filters.start)}" ${legacy ? "disabled" : ""}></label><label>신청 종료일<input type="date" name="end" value="${html(filters.end)}" ${legacy ? "disabled" : ""}></label><label>검색<input name="search" value="${html(filters.search)}" placeholder="매장 또는 품목"></label><button class="primary">조회</button><button type="button" data-report-reset>초기화</button></form>
    <section class="metrics-grid">${legacy ? card("기존 장부 품목 원가", money(sum(rows, "legacy")), "기존 기록 그대로 조회") + card("조회 그룹", `${rows.length}개`, "선택한 집계 단위 기준") : card("승인 공사비", money(s.approved), "반려·미승인 제외") + card("송금완료 원가", money(s.paidCost), "원천징수 포함 공사 원가") + card("송금완료 실지급액", money(s.paidNet), "실제 계좌 지급액") + card("미송금 승인액", money(s.unpaid), "지급 대기 실지급액", "amber")}</section>
    <article class="panel"><div class="panel-head"><h2>${legacy ? "기존 장부 품목 원가" : "공사비 집계 결과"} <small>${rows.length}개 그룹</small></h2><button data-cost-export>CSV 내보내기 ↓</button></div><div class="notice">${legacy ? "기존 장부는 날짜 정보가 없어 전체 기간으로 조회합니다. 결제 데이터와 합산하지 않습니다." : "기간은 신청일 기준입니다. 승인 공사비는 부가세·원천징수를 포함한 신청금액이며, 실지급액은 원천징수 차감 후 금액입니다. 기존 장부와 중복 합산하지 않습니다."}</div>${gridTable(["매장 / 품목", ...(filters.group === "detail" ? ["품목"] : []), "건수", ...(legacy ? ["기존 장부 원가"] : ["승인 대기", "승인 공사비", "송금완료 원가", "실지급액", "미송금 승인액"])], rows.map((r) => `<tr><td><strong>${html(r.name)}</strong></td>${filters.group === "detail" ? `<td>${html(r.item)}</td>` : ""}<td>${r.count}</td>${(legacy ? [r.legacy] : [r.pending, r.approved, r.paidCost, r.paidNet, r.unpaid]).map((n) => `<td class="money">${money(n)}</td>`).join("")}</tr>`))}</article>`;
}

export function importPanel(rows) {
  const valid = rows.filter((r) => !r.errors.length).length;
  return `<section class="page-intro"><span class="eyebrow">IMPORT & REVIEW</span><h2>엑셀에서 가져와, 한 건씩 정확하게.</h2><p>기존 데이터를 수정하지 않고 신청 초안을 만듭니다. 증빙을 첨부한 뒤 최종 저장하세요.</p></section><article class="panel"><div class="import-drop"><span class="upload-mark">↑</span><h2>결제 신청 파일을 선택하세요</h2><p>엑셀(.xlsx, .xls) 또는 CSV · 최대 5MB / 1,000행</p><input type="file" data-import-file accept=".xlsx,.xls,.csv" aria-label="결제 신청 엑셀 파일"><button data-import-template>입력 양식 다운로드 ↓</button></div><p role="status" data-import-message></p></article>${rows.length ? `<article class="panel"><div class="panel-head"><h2>가져오기 검토</h2><span>${rows.length}행 중 ${valid}행 사용 가능</span></div><div class="notice">동일 매장·업체·품목·금액의 기존 신청은 중복 가능성으로 표시합니다. 업로드만으로 운영 데이터가 저장되지는 않습니다.</div>${gridTable(["행", "매장", "업체", "공사 품목", "신청금액", "지급 구분", "검증", "처리"], rows.map((r, i) => `<tr><td>${r.row}</td><td>${html(r.store)}</td><td>${html(r.vendor)}</td><td>${html(r.payment_item)}</td><td class="money">${Number.isFinite(r.amount) ? money(r.amount) : "금액 오류"}</td><td>${html(r.tax_type)}</td><td>${r.errors.length ? `<span class="validation-error">${html(r.errors.join(" · "))}</span>` : `<span class="badge green">확인 완료</span>`}</td><td><button data-import-draft="${i}" ${r.errors.length ? "disabled" : ""}>신청서로 가져오기</button></td></tr>`))}</article>` : ""}`;
}
