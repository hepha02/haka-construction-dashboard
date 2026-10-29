import { createClient } from "@supabase/supabase-js";
import { renderStartupLoading, withTimeout } from "./startup.js";
import { readTable, updatePendingPayment } from "./data.js";
import { isBusinessIncome, transferCompleted, filterPayments, matchesSearch, csvText, validateImportRows } from "./workflow.js";
import { dashboard, costReport, costReportRows, incomeBadge, incomeReminder, importPanel } from "./workspace-views.js";

const env = import.meta.env || {};
const SUPABASE_URL =
  env.VITE_SUPABASE_URL || "https://yqemtsbdnypgmkuyncxh.supabase.co";
const SUPABASE_ANON_KEY =
  env.VITE_SUPABASE_ANON_KEY ||
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlxZW10c2JkbnlwZ21rdXluY3hoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODAyNjYwMTUsImV4cCI6MjA5NTg0MjAxNX0.gwgdCncqRKKgC8ebj7qIdT-vA4J-wOVd2O9DSa7xEOs";
const LOCAL_PREVIEW_MODE =
  typeof window !== "undefined" &&
  ["localhost", "127.0.0.1"].includes(window.location?.hostname || "") &&
  new URLSearchParams(window.location?.search || "").has("preview");

const supabase =
  !LOCAL_PREVIEW_MODE && SUPABASE_URL && SUPABASE_ANON_KEY
    ? createClient(SUPABASE_URL, SUPABASE_ANON_KEY)
    : null;
const CONSTRUCTION_FILE_BUCKET = "construction-start-files";
const PAYMENT_FILE_BUCKET = "payment-files";
const VENDOR_FILE_BUCKET = "vendor-files";
const basePaymentItems = [
  "철거",
  "금속공사",
  "목작업",
  "목자재",
  "전기",
  "전기자재",
  "간판",
  "임시간판",
  "돌출간판",
  "실내광고외",
  "광고 시트",
  "자판기 유리작업",
  "자동문 /강화도어",
  "자동문",
  "강화도어",
  "페인트자재",
  "도장공사",
  "타일자재",
  "타일 부자재",
  "타일시공",
  "타일",
  "싱크 개수대",
  "설비",
  "진열장",
  "카운터 역채널",
  "인조대리석",
  "유리/무늬목작접등 기타잡비",
  "유리",
  "무늬목",
  "기타잡비",
  "스카이",
  "에어컨",
  "소방설비",
  "가구운송",
  "엠프",
  "오픈현수막",
  "열쇠/철물",
  "열쇠",
  "철물",
  "청소",
  "폐기물",
  "추가공사",
  "기타"
];

const fallback = {
  payments: [],
  stores: [
    { id: 1, name: "성수 플래그십", area: 52, status: "완료", budget: 210000000, spent: 198400000 },
    { id: 2, name: "부산 센텀", area: 47, status: "진행중", budget: 186000000, spent: 122700000 },
    { id: 3, name: "대전 둔산", area: 39, status: "진행중", budget: 144000000, spent: 88200000 },
    { id: 4, name: "제주 노형", area: 42, status: "미착공", budget: 158000000, spent: 0 }
  ],
  vendors: [
    { id: 1, name: "도원인테리어", category: "시공", bank: "신한은행", account_number: "110-000-000001", account_holder: "도원인테리어", risk: "정상", total: 124500000 },
    { id: 2, name: "한빛전기", category: "전기", bank: "국민은행", account_number: "004-000-000002", account_holder: "한빛전기", risk: "정상", total: 73800000 },
    { id: 3, name: "서진설비", category: "설비", bank: "하나은행", account_number: "352-000-000003", account_holder: "서진설비", risk: "증빙확인", total: 41200000 }
  ],
  userRoles: [],
  paymentItems: basePaymentItems,
  constructionStarts: [],
  storeQuotes: []
};

const previewData = {
  ...fallback,
  payments: [
    {
      id: 101,
      store: "성수 플래그십",
      vendor: "도원인테리어",
      payment_item: "목작업",
      estimate_total: 12000000,
      payment_type: "선금 50%",
      amount: 6000000,
      vendor_bank: "신한은행",
      vendor_account_number: "110-000-000001",
      vendor_account_holder: "도원인테리어",
      tax_type: "일반 송금",
      withholding_amount: 0,
      net_amount: 6000000,
      attachment_files: {
        estimate_files: [{ name: "성수_목작업_견적서.pdf", size: 245760, url: "#" }],
        tax_invoice_files: [{ name: "성수_목작업_세금계산서.pdf", size: 184320, url: "#" }]
      },
      estimate_group_mode: "매장별 항목 합산",
      estimate_group_key: "성수 플래그십::목작업",
      memo: "미리보기 승인 건",
      status: "승인",
      requested_at: "2026-08-25",
      transfer_status: "미작성"
    },
    {
      id: 102,
      store: "부산 센텀",
      vendor: "한빛전기",
      payment_item: "전기",
      estimate_total: 8800000,
      payment_type: "일시 지급",
      amount: 8800000,
      vendor_bank: "국민은행",
      vendor_account_number: "004-000-000002",
      vendor_account_holder: "한빛전기",
      tax_type: "사업소득 3.3%",
      withholding_amount: 290400,
      net_amount: 8509600,
      attachment_files: {
        id_card_files: [{ name: "한빛전기_신분증.pdf", size: 126000, url: "#" }]
      },
      estimate_group_mode: "매장별 항목 합산",
      estimate_group_key: "부산 센텀::전기",
      memo: "파일 생성 완료 샘플",
      status: "승인",
      requested_at: "2026-08-24",
      transfer_status: "파일생성",
      exported_at: "2026-08-26T09:20:00+09:00",
      transfer_batch_id: "TR-PREVIEW-001"
    },
    {
      id: 103,
      store: "대전 둔산",
      vendor: "계좌미등록업체",
      payment_item: "설비",
      estimate_total: 4300000,
      payment_type: "일시 지급",
      amount: 4300000,
      vendor_bank: "",
      vendor_account_number: "",
      vendor_account_holder: "",
      tax_type: "일반 송금",
      withholding_amount: 0,
      net_amount: 4300000,
      attachment_files: {},
      estimate_group_mode: "매장별 항목 합산",
      estimate_group_key: "대전 둔산::설비",
      memo: "계좌 확인 필요 샘플",
      status: "승인",
      requested_at: "2026-08-23",
      transfer_status: "미작성"
    },
    {
      id: 104,
      store: "제주 노형",
      vendor: "도원인테리어",
      payment_item: "타일",
      estimate_total: 3200000,
      payment_type: "일시 지급",
      amount: 3200000,
      vendor_bank: "신한은행",
      vendor_account_number: "110-000-000001",
      vendor_account_holder: "도원인테리어",
      tax_type: "일반 송금",
      withholding_amount: 0,
      net_amount: 3200000,
      attachment_files: {},
      estimate_group_mode: "매장별 항목 합산",
      estimate_group_key: "제주 노형::타일",
      memo: "송금완료 제외 샘플",
      status: "승인",
      requested_at: "2026-08-22",
      transfer_status: "송금완료",
      transferred_at: "2026-08-26T14:30:00+09:00"
    },
    {
      id: 105,
      store: "성수 플래그십",
      vendor: "서진설비",
      payment_item: "소방설비",
      estimate_total: 2800000,
      payment_type: "잔금 50%",
      amount: 1400000,
      vendor_bank: "하나은행",
      vendor_account_number: "352-000-000003",
      vendor_account_holder: "서진설비",
      tax_type: "일반 송금",
      withholding_amount: 0,
      net_amount: 1400000,
      attachment_files: {},
      estimate_group_mode: "매장별 항목 합산",
      estimate_group_key: "성수 플래그십::소방설비",
      memo: "승인 전 검토 샘플",
      status: "신청",
      requested_at: "2026-08-27",
      transfer_status: "미작성"
    }
  ],
  constructionStarts: [
    {
      id: 201,
      store_name: "부산 센텀",
      area: 47,
      drawing_note: "도면 확인 완료",
      drawing_files: [{ name: "부산센텀_도면.pdf", size: 312000, url: "#" }],
      wall_upper_count: 8,
      wall_lower_count: 8,
      display_fixture_count: 6,
      counter_drawer_1200_count: 2,
      counter_shelf_1800_count: 1,
      counter_shelf_1600_count: 1,
      table_count: 4,
      base_photo_note: "기초 사진 등록",
      base_photo_files: [{ name: "부산센텀_기초사진.jpg", size: 520000, url: "#" }],
      special_notes: "미리보기 데이터",
      created_at: "2026-08-20T09:00:00+09:00"
    }
  ],
  storeQuotes: [
    {
      store_name: "성수 플래그십",
      quote_status: "견적 확정",
      margin_rate: 35,
      direct_cost: 7400000,
      fixture_cost: 0,
      cost_total: 7400000,
      supply_amount: 9990000,
      vat_amount: 999000,
      total_amount: 10989000
    }
  ],
  costParts: [
    { id: 1, store_name: "성수 플래그십", part_name: "목작업", amount: 12000000 },
    { id: 2, store_name: "성수 플래그십", part_name: "전기", amount: 7800000 },
    { id: 3, store_name: "부산 센텀", part_name: "전기", amount: 8800000 },
    { id: 4, store_name: "부산 센텀", part_name: "철거", amount: 3500000 }
  ]
};

const furnitureCostItems = [
  { group: "벽장", name: "상부장", baseUnit: 115600, allocationUnit: 57100, quantity: 40, madeAmount: 1260000 },
  { group: "벽장", name: "하부장", baseUnit: 167500, allocationUnit: 63500, quantity: 40, madeAmount: 2240000 },
  { group: "진열장", name: "유리장", baseUnit: 287000, allocationUnit: 163500, quantity: 40, madeAmount: 2660000 },
  { group: "카운터", name: "카운터 서랍형 1200", baseUnit: 831200, allocationUnit: 727200, quantity: 10, madeAmount: 560000 },
  { group: "카운터", name: "카운터 선반형 1800", baseUnit: 395800, allocationUnit: 395800, quantity: 4, madeAmount: 256000 },
  { group: "카운터", name: "카운터 선반형 1600", baseUnit: 350600, allocationUnit: 350600, quantity: 2, madeAmount: 122000 },
  { group: "테이블", name: "테이블 600*1200", baseUnit: 220000, allocationUnit: 161000, quantity: 5, madeAmount: 805000 },
  { group: "도장", name: "도장 / 총 58통", baseUnit: 180000, allocationUnit: 180000, quantity: 4, madeAmount: 720000 }
];

const nav = [
  "대시보드",
  "공사비 집계",
  "엑셀 업로드",
  "공사 시작 접수",
  "결제 신청",
  "결제 계좌 관리",
  "첨부 파일 보기",
  "매장별 공사 관리",
  "진열장 원가 배분",
  "견적서 생성",
  "계약서 생성",
  "은행 이체 파일 생성",
  "관리자 설정"
];

const roleMenus = {
  "전체 관리자": nav,
  "인테리어 공사실장": ["결제 신청", "공사 시작 접수", "결제 계좌 관리", "첨부 파일 보기", "진열장 원가 배분"]
};

const roleLabels = {
  admin: "전체 관리자",
  interior_manager: "인테리어 공사실장",
  "전체 관리자": "전체 관리자",
  "인테리어 공사실장": "인테리어 공사실장"
};

const viewDescriptions = {
  "엑셀 업로드": ["결제 신청 내역 엑셀 업로드", "필수 컬럼 검증", "중복/오류 행 표시"],
  "진열장 원가 배분": ["매장별 진열장 비용 배분", "공용 비용 자동 분배", "평당 원가 반영"],
  "견적서 생성": ["매장/업체 기준 견적서 생성", "공사항목별 금액 자동 합산", "PDF/문서 다운로드"],
  "계약서 생성": ["업체 정보 기반 계약서 생성", "계좌/사업자 정보 자동 반영", "계약 상태 관리"],
  "은행 이체 파일 생성": ["승인된 결제 건만 추출", "은행 업로드용 파일 생성", "이체 전 검증"],
  "첨부 파일 보기": ["결제 증빙 확인", "업체 서류 확인", "공사 시작 파일 확인"],
  "관리자 설정": ["사용자 권한", "승인 단계", "상태/분류 코드 관리"]
};

let currentData = fallback;
let activeView = "대시보드";
let activeRole = "인테리어 공사실장";
let currentUser = null;
let transferDateFilter = { startDate: "", endDate: "", keyword: "", readyStatus: "all" };
let selectedDocumentStore = "";
let storeManagementFilter = "진행중";
let dataLoadWarnings = [];
let editingPaymentId = null;
let paymentFilters = { search: "", status: "", tax: "", start: "", end: "" };
let reportFilters = { store: "", search: "", start: "", end: "", group: "store", source: "payments" };
let workspaceSearch = "";
let paymentPage = 1;
let importRows = [];
let importedDraft = null;
let lastLoadedAt = null;

function workspaceSearchForm(placeholder = "검색") {
  return `<form id="workspace-search-form" class="filter-toolbar"><label>검색<input name="search" value="${escapeAttr(workspaceSearch)}" placeholder="${placeholder}"></label><button>검색</button><button type="button" data-workspace-reset>전체 보기</button></form>`;
}

function paymentFilterToolbar(count, total) {
  return `<form id="payment-filter-form" class="filter-toolbar"><label>검색<input name="search" value="${escapeAttr(paymentFilters.search)}" placeholder="매장·업체·공사 품목"></label><label>상태<select name="status"><option value="">전체 상태</option>${["신청", "승인", "반려"].map((s) => `<option ${s === paymentFilters.status ? "selected" : ""}>${s}</option>`).join("")}</select></label><label>지급 구분<select name="tax"><option value="">전체 구분</option><option value="일반 송금" ${paymentFilters.tax === "일반 송금" ? "selected" : ""}>일반 계산서</option><option ${paymentFilters.tax === "사업소득 3.3%" ? "selected" : ""}>사업소득 3.3%</option></select></label><label>신청 시작일<input type="date" name="start" value="${escapeAttr(paymentFilters.start)}"></label><label>신청 종료일<input type="date" name="end" value="${escapeAttr(paymentFilters.end)}"></label><button class="primary">조회</button><button type="button" data-payment-reset>초기화</button><span class="result-count">전체 ${total}건 중 ${count}건</span></form>`;
}

function canLeaveForm() {
  return !document.querySelector('.form-panel form[data-dirty="true"]') || window.confirm("작성 중인 내용이 있습니다. 저장하지 않고 화면을 이동할까요?");
}

function navigateTo(view) {
  if (!visibleNav().includes(view) || !canLeaveForm()) return;
  activeView = view;
  workspaceSearch = "";
  render();
  window.scrollTo?.({ top: 0 });
}

function downloadCSV(name, rows) {
  const url = URL.createObjectURL(new Blob([csvText(rows)], { type: "text/csv;charset=utf-8" }));
  const link = document.createElement("a");
  link.href = url; link.download = name;
  document.body.appendChild(link); link.click(); link.remove(); URL.revokeObjectURL(url);
}

async function previewImport(file) {
  if (!file) return;
  const message = document.querySelector("[data-import-message]");
  try {
    if (file.size > 5 * 1024 * 1024) throw new Error("파일은 5MB 이하로 선택해 주세요.");
    if (!window.XLSX) throw new Error("엑셀 모듈을 준비하지 못했습니다. 새로고침 후 다시 시도해 주세요.");
    const workbook = window.XLSX.read(await file.arrayBuffer(), { type: "array", sheetRows: 1002 });
    const rows = window.XLSX.utils.sheet_to_json(workbook.Sheets[workbook.SheetNames[0]], { defval: "", raw: false });
    if (!rows.length) throw new Error("첫 시트에 가져올 행이 없습니다.");
    if (rows.length > 1000) throw new Error("한 번에 1,000행까지 검토할 수 있습니다.");
    importRows = validateImportRows(rows, currentData);
    render();
  } catch (error) { message.textContent = error.message; message.className = "form-message error"; }
}

function bindWorkspaceEvents() {
  document.querySelector("[data-menu-toggle]")?.addEventListener("click", (event) => {
    const open = document.querySelector("#app").classList.toggle("menu-open");
    event.currentTarget.setAttribute("aria-expanded", String(open));
  });
  document.querySelector("[data-refresh]")?.addEventListener("click", async (event) => {
    if (!canLeaveForm()) return;
    event.currentTarget.disabled = true;
    await refreshDataAndRender("최신 데이터를 다시 불러왔습니다.");
  });
  document.querySelector("[data-income-filter]")?.addEventListener("click", () => {
    if (!canLeaveForm()) return;
    paymentFilters = { search: "", status: "", tax: "사업소득 3.3%", start: "", end: "" };
    paymentPage = 1; activeView = "결제 신청"; render();
  });
  for (const [id, update] of [
    ["payment-filter-form", (values) => { paymentFilters = values; paymentPage = 1; }],
    ["report-filter-form", (values) => { reportFilters = values; }],
    ["workspace-search-form", (values) => { workspaceSearch = values.search || ""; }]
  ]) document.querySelector(`#${id}`)?.addEventListener("submit", (event) => {
    event.preventDefault();
    if (!canLeaveForm()) return;
    const values = Object.fromEntries(new FormData(event.currentTarget));
    if (values.start && values.end && values.start > values.end) { window.alert("시작일은 종료일 이전으로 선택해 주세요."); return; }
    update(values); render();
  });
  document.querySelectorAll("[data-payment-page]").forEach((button) => button.addEventListener("click", () => {
    if (!canLeaveForm()) return; paymentPage = Number(button.dataset.paymentPage); render();
  }));
  document.querySelector("[data-payment-reset]")?.addEventListener("click", () => { if (!canLeaveForm()) return; paymentFilters = { search: "", status: "", tax: "", start: "", end: "" }; paymentPage = 1; render(); });
  document.querySelector("[data-report-reset]")?.addEventListener("click", () => { reportFilters = { store: "", search: "", start: "", end: "", group: "store", source: "payments" }; render(); });
  document.querySelector("[data-workspace-reset]")?.addEventListener("click", () => { if (!canLeaveForm()) return; workspaceSearch = ""; render(); });
  document.querySelector("[data-cost-export]")?.addEventListener("click", () => {
    const rows = costReportRows(currentData, reportFilters);
    const legacy = reportFilters.source === "legacy";
    downloadCSV(`공사비집계_${today()}.csv`, [["그룹", "품목", "건수", ...(legacy ? ["기존 장부 원가"] : ["승인대기", "승인공사비", "송금완료원가", "실지급액", "미송금승인액"])], ...rows.map((r) => [r.name, reportFilters.group === "detail" ? r.item : "", r.count, ...(legacy ? [r.legacy] : [r.pending, r.approved, r.paidCost, r.paidNet, r.unpaid])])]);
  });
  document.querySelector("[data-import-file]")?.addEventListener("change", (event) => previewImport(event.currentTarget.files[0]));
  document.querySelector("[data-import-template]")?.addEventListener("click", () => downloadCSV("결제신청_양식.csv", [["매장", "업체", "공사 품목", "신청 금액", "지급 구분", "메모"], ["등록된 매장명", "등록된 업체명", "전기", 1000000, "일반 송금", ""]]));
  document.querySelectorAll("[data-import-draft]").forEach((button) => button.addEventListener("click", () => {
    const draft = importRows[Number(button.dataset.importDraft)];
    if (!draft || draft.errors.length) return;
    const vendor = currentData.vendors.find((v) => v.name === draft.vendor);
    importedDraft = { ...draft, vendor_bank: vendor?.bank || "", vendor_account_number: vendor?.account_number || "", vendor_account_holder: vendor?.account_holder || "" };
    editingPaymentId = null; activeView = "결제 신청"; render("엑셀 초안을 불러왔습니다. 금액과 증빙을 확인하고 저장해 주세요.");
  }));
  document.querySelectorAll(".form-panel form").forEach((form) => {
    for (const event of ["input", "change"]) form.addEventListener(event, () => { form.dataset.dirty = "true"; });
  });
}

const formatKRW = (value) =>
  new Intl.NumberFormat("ko-KR", {
    style: "currency",
    currency: "KRW",
    maximumFractionDigits: 0
  }).format(value || 0);

const today = () => new Intl.DateTimeFormat("sv-SE", { timeZone: "Asia/Seoul" }).format(new Date());
const parseAmount = (value) => {
  const text = String(value ?? "").replace(/[,원\s]/g, "");
  return /^\d+$/.test(text) ? Number(text) : NaN;
};
const numberValue = (value) => Number(value || 0);
const textLimit = (value, maxLength) => String(value || "").trim().slice(0, maxLength);
const onlyDigits = (value) => String(value || "").replace(/[^\d]/g, "");
const paymentRatio = (type) =>
  ({
    "일시 지급": 1,
    "선금 50%": 0.5,
    "잔금 50%": 0.5
  })[type] || 0;
const withholdingRate = (type) => (type === "사업소득 3.3%" ? 0.033 : 0);
const escapeAttr = (value) =>
  String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/"/g, "&quot;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
const safeText = (value, fallback = "-") => {
  const text = value ?? "";
  return escapeAttr(text === "" ? fallback : text);
};
const safeFileName = (name) => String(name || "file").replace(/[^\w.\-가-힣]/g, "_");

const statusClass = (status) => {
  const map = {
    승인: "green",
    신청: "amber",
    반려: "red",
    진행중: "blue",
    완료: "green",
    미착공: "gray",
    정상: "green",
    증빙확인: "amber",
    정산중: "amber",
    "견적 확정": "blue",
    "계약 완료": "green"
  };
  return map[status] || "gray";
};

async function loadData() {
  dataLoadWarnings = [];
  if (!supabase) {
    if (!LOCAL_PREVIEW_MODE) throw new Error("서버 연결 설정을 확인해 주세요.");
    return previewData;
  }

  const [payments, stores, vendors, constructionStarts, userRoles, paymentItems, storeQuotes] = await Promise.all([
    readTable(supabase, "payments"),
    readTable(supabase, "stores"),
    readTable(supabase, "vendors"),
    readTable(supabase, "construction_starts"),
    readTable(supabase, "user_roles"),
    readTable(supabase, "construction_cost_parts"),
    readTable(supabase, "store_quotes")
  ]);

  const requiredSources = [
    ["결제 신청", payments],
    ["매장", stores],
    ["업체/계좌", vendors]
  ];
  const failedRequired = requiredSources.find(([, result]) => result.error);
  if (failedRequired) {
    throw new Error(`${failedRequired[0]} 데이터를 불러오지 못했습니다. DB 연결과 권한을 확인해 주세요. (${failedRequired[1].error.message})`);
  }

  [
    ["공사 시작", constructionStarts],
    ["사용자 권한", userRoles],
    ["공사항목", paymentItems],
    ["매장 견적", storeQuotes]
  ].forEach(([label, result]) => {
    if (result.error) dataLoadWarnings.push(`${label}: ${result.error.message}`);
  });

  const uniquePaymentItems = paymentItems.error
    ? fallback.paymentItems
    : [...new Set([...basePaymentItems, ...paymentItems.data.map((item) => item.part_name).filter(Boolean)])];

  return {
    payments: [...payments.data].sort((a, b) => String(b.requested_at).localeCompare(String(a.requested_at)) || Number(b.id) - Number(a.id)),
    stores: stores.data,
    vendors: vendors.data,
    constructionStarts: constructionStarts.error ? [] : [...constructionStarts.data].sort((a, b) => String(b.created_at).localeCompare(String(a.created_at))),
    userRoles: userRoles.error ? [] : userRoles.data,
    paymentItems: uniquePaymentItems,
    storeQuotes: storeQuotes.error ? [] : storeQuotes.data,
    costParts: paymentItems.error ? [] : paymentItems.data
  };
}

function renderDataLoadError(error) {
  const app = document.querySelector("#app");
  app.className = "auth-shell";
  app.innerHTML = `
    <main class="auth-page">
      <section class="auth-panel">
        <div class="brand auth-brand">
          <span class="brand-mark">H</span>
          <div>
            <strong>HAKA Construction</strong>
            <small>공사비 관리 시스템</small>
          </div>
        </div>
        <h1>데이터 연결 확인 필요</h1>
        <p>운영 데이터가 안전하게 확인되지 않아 화면 표시를 멈췄습니다.</p>
        <div class="form-message error">${escapeAttr(error.message || "데이터를 불러오지 못했습니다.")}</div>
        <button class="primary wide" type="button" data-retry-load>다시 불러오기</button>
      </section>
    </main>
  `;
  document.querySelector("[data-retry-load]")?.addEventListener("click", startApp);
}

async function refreshDataAndRender(notice = "") {
  try {
    currentData = await withTimeout(loadData(), "데이터 서버에 연결할 수 없습니다. 서버 상태 또는 인터넷 연결을 확인한 뒤 다시 시도해 주세요.");
    lastLoadedAt = new Date();
    render(notice);
  } catch (error) {
    renderDataLoadError(error);
  }
}

async function loadUserRole(user) {
  if (!supabase || !user?.email) return "인테리어 공사실장";

  const { data, error } = await supabase
    .from("user_roles")
    .select("role")
    .ilike("email", user.email)
    .maybeSingle();

  if (error || !data?.role) return "인테리어 공사실장";
  return roleLabels[data.role] || "인테리어 공사실장";
}

export async function startApp() {
  renderStartupLoading();
  try {
    if (!supabase) {
      if (!LOCAL_PREVIEW_MODE) throw new Error("서버 연결 설정을 확인해 주세요.");
      activeRole = "전체 관리자";
      await refreshDataAndRender();
      return;
    }

    const { data, error } = await withTimeout(
      supabase.auth.getSession(),
      "로그인 서버에 연결할 수 없습니다. 서버 상태 또는 인터넷 연결을 확인한 뒤 다시 시도해 주세요."
    );
    if (error) throw error;
    currentUser = data.session?.user || null;

    if (!currentUser) {
      renderLogin();
      return;
    }

    activeRole = await withTimeout(loadUserRole(currentUser), "사용자 권한을 확인하지 못했습니다. 서버 상태 또는 인터넷 연결을 확인한 뒤 다시 시도해 주세요.");
    activeView = visibleNav()[0];
    await refreshDataAndRender();
  } catch (error) {
    renderDataLoadError(error);
  }
}

function findDuplicateRisk(data, vendor, amount) {
  return data.payments.find((payment) => {
    const sameVendor = payment.vendor.trim() === vendor.trim();
    const diffRate = Math.abs(payment.amount - amount) / Math.max(amount, 1);
    return sameVendor && diffRate <= 0.1;
  });
}

function findSameStoreItemRisk(data, store, paymentItem) {
  return data.payments.find((payment) => {
    const sameStore = String(payment.store || "").trim() === store.trim();
    const sameItem = String(payment.payment_item || "").trim() === paymentItem.trim();
    return sameStore && sameItem;
  });
}

async function uploadConstructionFiles(fileList, folder) {
  const files = Array.from(fileList || []).filter((file) => file.size > 0);
  if (!files.length) return [];

  if (!supabase) {
    return files.map((file) => ({ name: file.name, type: file.type, size: file.size, path: "", url: "" }));
  }

  const uploaded = [];
  for (const file of files) {
    const path = `${currentUser?.id || "user"}/${folder}/${Date.now()}-${crypto.randomUUID()}-${safeFileName(file.name)}`;
    const { error } = await supabase.storage
      .from(CONSTRUCTION_FILE_BUCKET)
      .upload(path, file, { contentType: file.type || "application/octet-stream", upsert: false });

    if (error) throw error;

    const { data } = supabase.storage.from(CONSTRUCTION_FILE_BUCKET).getPublicUrl(path);
    uploaded.push({
      name: file.name,
      type: file.type,
      size: file.size,
      path,
      url: data.publicUrl
    });
  }
  return uploaded;
}

async function uploadPaymentFiles(fileList, folder) {
  const files = Array.from(fileList || []).filter((file) => file.size > 0);
  if (!files.length) return [];

  if (!supabase) {
    return files.map((file) => ({ name: file.name, type: file.type, size: file.size, path: "", url: "" }));
  }

  const uploaded = [];
  for (const file of files) {
    const path = `${currentUser?.id || "user"}/${folder}/${Date.now()}-${crypto.randomUUID()}-${safeFileName(file.name)}`;
    const { error } = await supabase.storage
      .from(PAYMENT_FILE_BUCKET)
      .upload(path, file, { contentType: file.type, upsert: false });

    if (error) throw error;

    const { data } = supabase.storage.from(PAYMENT_FILE_BUCKET).getPublicUrl(path);
    uploaded.push({
      name: file.name,
      type: file.type,
      size: file.size,
      path,
      url: data.publicUrl
    });
  }
  return uploaded;
}

async function uploadVendorFiles(fileList, folder) {
  const files = Array.from(fileList || []).filter((file) => file.size > 0);
  if (!files.length) return [];

  if (!supabase) {
    return files.map((file) => ({ name: file.name, type: file.type, size: file.size, path: "", url: "" }));
  }

  const uploaded = [];
  for (const file of files) {
    const path = `${currentUser?.id || "user"}/${folder}/${Date.now()}-${crypto.randomUUID()}-${safeFileName(file.name)}`;
    const { error } = await supabase.storage
      .from(VENDOR_FILE_BUCKET)
      .upload(path, file, { contentType: file.type, upsert: false });

    if (error) throw error;

    const { data } = supabase.storage.from(VENDOR_FILE_BUCKET).getPublicUrl(path);
    uploaded.push({
      name: file.name,
      type: file.type,
      size: file.size,
      path,
      url: data.publicUrl
    });
  }
  return uploaded;
}

async function submitPayment(event) {
  event.preventDefault();

  const form = event.currentTarget;
  const submitButton = form.querySelector("button[type='submit']");
  const message = form.querySelector("[data-form-message]");
  const formData = new FormData(form);
  const paymentId = Number(formData.get("payment_id") || 0);
  const editingPayment = paymentId
    ? currentData.payments.find((payment) => payment.id === paymentId && payment.status === "신청")
    : null;
  const isEditing = Boolean(editingPayment);
  const store = String(formData.get("store") || "").trim();
  const vendor = String(formData.get("vendor") || "").trim();
  const paymentItem = String(formData.get("payment_item") || "").trim();
  const estimateTotal = parseAmount(formData.get("estimate_total"));
  const paymentType = String(formData.get("payment_type") || "일시 지급");
  const amount = parseAmount(formData.get("amount"));
  const taxType = String(formData.get("tax_type") || "일반 송금");
  const withholdingAmount = Math.round(amount * withholdingRate(taxType));
  const netAmount = amount - withholdingAmount;
  const vendorBank = String(formData.get("vendor_bank") || "").trim();
  const vendorAccountNumber = String(formData.get("vendor_account_number") || "").trim();
  const vendorAccountHolder = String(formData.get("vendor_account_holder") || "").trim();
  const memo = String(formData.get("memo") || "").trim();
  const duplicate = findDuplicateRisk(currentData, vendor, amount);
  const duplicateRisk = duplicate?.id === paymentId ? null : duplicate;
  const sameStoreItem = findSameStoreItemRisk(currentData, store, paymentItem);
  const sameStoreItemRisk = sameStoreItem?.id === paymentId ? null : sameStoreItem;
  const estimateFiles = formData.getAll("estimate_files").filter((file) => file.size > 0);
  const taxInvoiceFiles = formData.getAll("tax_invoice_files").filter((file) => file.size > 0);
  const idCardFiles = formData.getAll("id_card_files").filter((file) => file.size > 0);
  const existingAttachments = editingPayment?.attachment_files || {};
  const hasEstimateFiles = estimateFiles.length || (existingAttachments.estimate_files || []).length;
  const hasTaxInvoiceFiles = taxInvoiceFiles.length || (existingAttachments.tax_invoice_files || []).length;
  const hasIdCardFiles = idCardFiles.length || (existingAttachments.id_card_files || []).length;

  if (paymentId && !editingPayment) {
    message.textContent = "수정할 수 없는 결제 신청입니다. 이미 승인/반려 처리됐는지 확인해 주세요.";
    message.className = "form-message error";
    return;
  }

  if (!store || !vendor || !paymentItem || !Number.isSafeInteger(estimateTotal) || estimateTotal <= 0 || !Number.isSafeInteger(amount) || amount <= 0 || !vendorBank || !vendorAccountNumber || !vendorAccountHolder) {
    message.textContent = "매장명, 업체, 결제 항목, 견적 총액, 신청 금액, 이체 계좌를 모두 입력해 주세요.";
    message.className = "form-message error";
    return;
  }

  if (amount > estimateTotal) {
    message.textContent = "이번 신청 금액이 견적 총액보다 큽니다. 금액을 확인해 주세요.";
    message.className = "form-message error";
    return;
  }

  if (taxType === "일반 송금" && (!hasEstimateFiles || !hasTaxInvoiceFiles)) {
    message.textContent = "일반 송금은 견적서와 세금계산서를 첨부해야 합니다.";
    message.className = "form-message error";
    return;
  }

  if (taxType === "사업소득 3.3%" && !hasIdCardFiles) {
    message.textContent = "사업소득 3.3% 지급은 주민등록증 첨부가 필요합니다.";
    message.className = "form-message error";
    return;
  }

  submitButton.disabled = true;
  submitButton.textContent = "저장 중";
  message.textContent = "첨부 자료를 업로드하고 있습니다.";
  message.className = duplicateRisk || sameStoreItemRisk ? "form-message warning" : "form-message";

  let attachmentFiles = {};
  try {
    attachmentFiles = {
      estimate_files: [
        ...(existingAttachments.estimate_files || []),
        ...(await uploadPaymentFiles(estimateFiles, "estimates"))
      ],
      tax_invoice_files: [
        ...(existingAttachments.tax_invoice_files || []),
        ...(await uploadPaymentFiles(taxInvoiceFiles, "tax-invoices"))
      ],
      id_card_files: [
        ...(existingAttachments.id_card_files || []),
        ...(await uploadPaymentFiles(idCardFiles, "id-cards"))
      ]
    };
  } catch (error) {
    submitButton.disabled = false;
    submitButton.textContent = isEditing ? "수정 저장" : "검토 요청 생성";
    message.textContent = `첨부 업로드 실패: ${error.message}`;
    message.className = "form-message error";
    return;
  }

  message.textContent = duplicateRisk
    ? `중복 의심: ${duplicateRisk.store} / ${formatKRW(duplicateRisk.amount)} 건과 비슷합니다.`
    : sameStoreItemRisk
      ? `확인 필요: ${store} / ${paymentItem} 항목에 기존 신청이 있습니다. 중복이 아니면 견적서에는 같은 항목 합계로 반영됩니다.`
    : isEditing ? "수정 내용을 저장하고 있습니다." : "신청 건을 저장하고 있습니다.";
  message.className = duplicateRisk || sameStoreItemRisk ? "form-message warning" : "form-message";

  const paymentPayload = {
    store,
    vendor,
    payment_item: paymentItem,
    estimate_total: estimateTotal,
    payment_type: paymentType,
    amount,
    vendor_bank: vendorBank,
    vendor_account_number: vendorAccountNumber,
    vendor_account_holder: vendorAccountHolder,
    tax_type: taxType,
    withholding_amount: withholdingAmount,
    net_amount: netAmount,
    attachment_files: attachmentFiles,
    estimate_group_mode: "매장별 항목 합산",
    estimate_group_key: `${store}::${paymentItem}`,
    memo,
    status: "신청",
    requested_at: editingPayment?.requested_at || today()
  };

  if (!supabase) {
    previewData.payments = isEditing
      ? previewData.payments.map((payment) => (payment.id === paymentId ? { ...payment, ...paymentPayload } : payment))
      : [{ id: Date.now(), ...paymentPayload }, ...previewData.payments];
  } else {
    const { error, data: savedPayment } = isEditing
      ? await updatePendingPayment(supabase, editingPayment, paymentPayload)
      : await supabase.from("payments").insert(paymentPayload);
    if (error || (isEditing && !savedPayment)) {
      submitButton.disabled = false;
      submitButton.textContent = isEditing ? "수정 저장" : "검토 요청 생성";
      message.textContent = `저장 실패: ${error?.message || "다른 사용자가 이미 처리한 신청입니다. 최신 내역을 확인해 주세요."}`;
      message.className = "form-message error";
      return;
    }
  }

  form.reset();
  editingPaymentId = null;
  importedDraft = null;
  await refreshDataAndRender(isEditing ? "결제 신청 수정이 저장됐습니다." : duplicateRisk ? "신청이 저장됐습니다. 중복 의심 건은 결제 검토에서 확인하세요." : "신청이 저장됐습니다.");
}

async function submitVendor(event) {
  event.preventDefault();

  const form = event.currentTarget;
  const submitButton = form.querySelector("button[type='submit']");
  const message = form.querySelector("[data-vendor-message]");
  const formData = new FormData(form);
  const vendorId = Number(formData.get("vendor_id") || 0);
  const vendor = {
    name: String(formData.get("name") || "").trim(),
    category: String(formData.get("category") || "").trim(),
    bank: String(formData.get("bank") || "").trim(),
    account_number: String(formData.get("account_number") || "").trim(),
    account_holder: String(formData.get("account_holder") || "").trim()
  };
  const businessLicenseFiles = formData.getAll("business_license_files").filter((file) => file.size > 0);
  const bankbookFiles = formData.getAll("bankbook_files").filter((file) => file.size > 0);

  if (!vendor.name || !vendor.category || !vendor.bank || !vendor.account_number || !vendor.account_holder) {
    message.textContent = "업체명, 분류, 은행, 계좌번호, 예금주를 모두 입력해 주세요.";
    message.className = "form-message error";
    return;
  }

  if (!vendorId && (!businessLicenseFiles.length || !bankbookFiles.length)) {
    message.textContent = "최초 등록 시 사업자등록증과 통장사본을 모두 첨부해 주세요.";
    message.className = "form-message error";
    return;
  }

  submitButton.disabled = true;
  submitButton.textContent = "저장 중";
  message.textContent = "첨부 자료를 업로드하고 있습니다.";
  message.className = "form-message";

  let attachmentFiles = {};
  try {
    const existing = vendorId
      ? currentData.vendors.find((item) => item.id === vendorId)?.attachment_files || {}
      : {};
    attachmentFiles = {
      business_license_files: [
        ...(existing.business_license_files || []),
        ...(await uploadVendorFiles(businessLicenseFiles, "business-licenses"))
      ],
      bankbook_files: [
        ...(existing.bankbook_files || []),
        ...(await uploadVendorFiles(bankbookFiles, "bankbooks"))
      ]
    };
  } catch (error) {
    submitButton.disabled = false;
    submitButton.textContent = "계좌 저장";
    message.textContent = `첨부 업로드 실패: ${error.message}`;
    message.className = "form-message error";
    return;
  }

  vendor.attachment_files = attachmentFiles;
  message.textContent = "결제 계좌 정보를 저장하고 있습니다.";

  if (!supabase) {
    previewData.vendors = vendorId
      ? previewData.vendors.map((item) => (item.id === vendorId ? { ...item, ...vendor } : item))
      : [{ id: Date.now(), ...vendor, risk: "정상", total: 0 }, ...previewData.vendors];
  } else {
    const { error } = vendorId
      ? await supabase.from("vendors").update(vendor).eq("id", vendorId)
      : await supabase.from("vendors").insert(vendor);
    if (error) {
      submitButton.disabled = false;
      submitButton.textContent = "계좌 저장";
      message.textContent = `저장 실패: ${error.message}`;
      message.className = "form-message error";
      return;
    }
  }

  form.reset();
  activeView = "결제 계좌 관리";
  await refreshDataAndRender(vendorId ? "결제 계좌 정보가 수정됐습니다." : "결제 계좌 정보가 저장됐습니다.");
}

async function submitStore(event) {
  event.preventDefault();

  const form = event.currentTarget;
  const submitButton = form.querySelector("button[type='submit']");
  const message = form.querySelector("[data-store-message]");
  const formData = new FormData(form);
  const store = {
    name: String(formData.get("name") || "").trim(),
    area: Number(formData.get("area")),
    status: String(formData.get("status") || "미착공"),
    budget: parseAmount(formData.get("budget")),
    spent: parseAmount(formData.get("spent"))
  };

  if (!store.name || !store.area || !store.budget) {
    message.textContent = "매장명, 면적, 예산을 입력해 주세요.";
    message.className = "form-message error";
    return;
  }

  submitButton.disabled = true;
  submitButton.textContent = "저장 중";
  message.textContent = "매장 공사 정보를 저장하고 있습니다.";
  message.className = "form-message";

  if (!supabase) {
    previewData.stores = [{ id: Date.now(), ...store }, ...previewData.stores];
  } else {
    const { error } = await supabase.from("stores").insert(store);
    if (error) {
      submitButton.disabled = false;
      submitButton.textContent = "매장 저장";
      message.textContent = `저장 실패: ${error.message}`;
      message.className = "form-message error";
      return;
    }
  }

  form.reset();
  activeView = "매장별 공사 관리";
  await refreshDataAndRender("매장 공사 정보가 저장됐습니다.");
}

async function submitConstructionStart(event) {
  event.preventDefault();

  const form = event.currentTarget;
  const submitButton = form.querySelector("button[type='submit']");
  const message = form.querySelector("[data-construction-start-message]");
  const formData = new FormData(form);
  const wallUpperCount = numberValue(formData.get("wall_upper_count"));
  const wallLowerCount = numberValue(formData.get("wall_lower_count"));
  const displayFixtureCount = numberValue(formData.get("display_fixture_count"));
  const counterDrawer1200Count = numberValue(formData.get("counter_drawer_1200_count"));
  const counterShelf1800Count = numberValue(formData.get("counter_shelf_1800_count"));
  const counterShelf1600Count = numberValue(formData.get("counter_shelf_1600_count"));
  const counterCount = counterDrawer1200Count + counterShelf1800Count + counterShelf1600Count;
  const tableCount = Number(formData.get("table_count") || 0);
  const request = {
    store_name: String(formData.get("store_name") || "").trim(),
    area: Number(formData.get("area")),
    wall_upper_count: wallUpperCount,
    wall_lower_count: wallLowerCount,
    counter_drawer_1200_count: counterDrawer1200Count,
    counter_shelf_1800_count: counterShelf1800Count,
    counter_shelf_1600_count: counterShelf1600Count,
    wall_cabinet_count: wallUpperCount + wallLowerCount,
    display_fixture_count: displayFixtureCount,
    counter_count: counterCount,
    fixture_count: wallUpperCount + wallLowerCount + displayFixtureCount + counterCount,
    table_count: tableCount,
    sign_count: Number(formData.get("sign_count") || 0),
    special_notes: String(formData.get("special_notes") || "").trim()
  };

  if (!request.store_name || !request.area) {
    message.textContent = "매장명과 평수는 꼭 입력해 주세요.";
    message.className = "form-message error";
    return;
  }

  submitButton.disabled = true;
  submitButton.textContent = "저장 중";
  message.textContent = "도면과 사진 파일을 업로드하고 있습니다.";
  message.className = "form-message";

  try {
    request.drawing_files = await uploadConstructionFiles(formData.getAll("drawing_files"), "drawings");
    request.base_photo_files = await uploadConstructionFiles(formData.getAll("base_photo_files"), "base-photos");
  } catch (error) {
    submitButton.disabled = false;
    submitButton.textContent = "공사 시작 정보 저장";
    message.textContent = `파일 업로드 실패: ${error.message}`;
    message.className = "form-message error";
    return;
  }

  message.textContent = "공사 시작 정보를 저장하고 있습니다.";

  if (!supabase) {
    previewData.constructionStarts = [{ id: Date.now(), created_at: new Date().toISOString(), ...request }, ...previewData.constructionStarts];
  } else {
    const { error } = await supabase.from("construction_starts").insert(request);
    if (error) {
      submitButton.disabled = false;
      submitButton.textContent = "공사 시작 정보 저장";
      message.textContent = `저장 실패: ${error.message}`;
      message.className = "form-message error";
      return;
    }
  }

  form.reset();
  activeView = "공사 시작 접수";
  await refreshDataAndRender("공사 시작 정보가 저장됐습니다. 결제 신청 매장 검색에도 반영됐습니다.");
}

async function updatePaymentStatus(paymentId, status) {
  if (!paymentId || !["승인", "반려"].includes(status)) return;
  if (status === "승인" && activeRole !== "전체 관리자") return;

  if (!supabase) {
    previewData.payments = previewData.payments.map((payment) =>
      payment.id === paymentId ? { ...payment, status } : payment
    );
  } else {
    const { data, error } = await supabase
      .from("payments")
      .update({ status })
      .eq("id", paymentId)
      .eq("status", "신청")
      .select("id")
      .maybeSingle();

    if (error) {
      render(`상태 변경 실패: ${error.message}`);
      return;
    }

    if (!data) {
      if (editingPaymentId === paymentId) editingPaymentId = null;
      activeView = "결제 신청";
      await refreshDataAndRender("상태 변경 실패: 이미 처리됐거나 권한이 없습니다. 새로고침 후 다시 확인해 주세요.");
      return;
    }
  }

  if (editingPaymentId === paymentId) editingPaymentId = null;
  activeView = "결제 신청";
  await refreshDataAndRender(`결제 신청이 ${status} 처리됐습니다.`);
}

async function approveSelectedPayments(paymentIds) {
  if (activeRole !== "전체 관리자") return;
  const ids = [...new Set(paymentIds.map(Number).filter(Boolean))];
  if (!ids.length) {
    render("승인할 결제 신청을 먼저 선택해 주세요.");
    return;
  }

  if (!supabase) {
    previewData.payments = previewData.payments.map((payment) =>
      ids.includes(payment.id) && payment.status === "신청" ? { ...payment, status: "승인" } : payment
    );
    activeView = "결제 신청";
    await refreshDataAndRender(`${ids.length}건을 승인 처리했습니다.`);
    return;
  }

  const { data, error } = await supabase
    .from("payments")
    .update({ status: "승인" })
    .in("id", ids)
    .eq("status", "신청")
    .select("id");

  if (error) {
    render(`선택 승인 실패: ${error.message}`);
    return;
  }

  activeView = "결제 신청";
  await refreshDataAndRender(`${data?.length || 0}건을 승인 처리했습니다. 이제 엑셀 다운로드를 누르면 승인된 건이 내려갑니다.`);
}

async function saveStoreQuote(storeName, status) {
  const marginInput = document.querySelector(`[data-margin-rate="${CSS.escape(storeName)}"]`);
  const marginRate = Number(marginInput?.value || 35);
  const amounts = quoteAmounts(currentData, storeName, marginRate);
  const existing = quoteForStore(currentData, storeName);
  const quote = {
    store_name: storeName,
    quote_status: status,
    margin_rate: marginRate,
    direct_cost: amounts.directCost,
    fixture_cost: amounts.fixtureCost,
    cost_total: amounts.costTotal,
    supply_amount: amounts.supplyAmount,
    vat_amount: amounts.vatAmount,
    total_amount: amounts.totalAmount,
    quote_confirmed_at: status === "견적 확정" ? new Date().toISOString() : existing.quote_confirmed_at || new Date().toISOString(),
    contract_completed_at: status === "계약 완료" ? new Date().toISOString() : existing.contract_completed_at || null,
    updated_at: new Date().toISOString()
  };

  if (!storeName || !amounts.costTotal || marginRate < 0) {
    render("견적 확정 전에 승인된 결제 또는 진열장 배분 원가와 마진율을 확인해 주세요.");
    return;
  }

  if (!supabase) {
    previewData.storeQuotes = [
      { id: existing.id || Date.now(), ...quote },
      ...previewData.storeQuotes.filter((item) => item.store_name !== storeName)
    ];
  } else {
    const { error } = await supabase
      .from("store_quotes")
      .upsert(quote, { onConflict: "store_name" });

    if (error) {
      render(`매장 견적 저장 실패: ${error.message}`);
      return;
    }
  }

  selectedDocumentStore = storeName;
  activeView = status === "계약 완료" ? "견적서 생성" : "매장별 공사 관리";
  await refreshDataAndRender(status === "계약 완료" ? `${storeName} 공사 완료 처리됐습니다. 견적서와 계약서를 확인할 수 있습니다.` : `${storeName} 견적이 확정됐습니다.`);
}

function normalizeBankName(bank) {
  const clean = String(bank || "").replace(/\s/g, "");
  const banks = [
    ["신한", "신한"],
    ["국민", "국민"],
    ["기업", "기업"],
    ["우리", "우리"],
    ["하나", "하나"],
    ["농협", "농협"],
    ["축협", "농협"],
    ["카카오", "카카오"],
    ["토스", "토스"],
    ["케이뱅크", "케이뱅크"],
    ["부산", "부산"],
    ["대구", "아이엠뱅크"],
    ["아이엠", "아이엠뱅크"],
    ["새마을", "새마을금고"],
    ["신협", "신협"],
    ["우체국", "우체국"],
    ["전북", "전북"],
    ["광주", "광주"],
    ["경남", "경남"],
    ["수협", "수협"]
  ];
  return banks.find(([keyword]) => clean.includes(keyword))?.[1] || textLimit(bank, 6);
}

function findVendor(data, payment) {
  const vendorName = String(payment.vendor || "").trim();
  return data.vendors.find((vendor) => String(vendor.name || "").trim() === vendorName) || {};
}

function approvedPayments(data) {
  return data.payments.filter((payment) => payment.status === "승인");
}

function paymentTransferStatus(payment) {
  return String(payment.transfer_status || "미작성").trim() || "미작성";
}

function isTransferCompleted(payment) {
  return transferCompleted(payment);
}

function transferCandidatePayments(data) {
  return approvedPayments(data).filter((payment) => !isTransferCompleted(payment));
}

function transferStatusClass(record) {
  if (!record.ready) return "red";
  const status = paymentTransferStatus(record.payment);
  if (isTransferCompleted(record.payment)) return "green";
  if (status === "파일생성") return "blue";
  return "gray";
}

function transferStatusLabel(record) {
  if (!record.ready) return "계좌정보 확인";
  const status = paymentTransferStatus(record.payment);
  return status === "미작성" ? "파일 미생성" : status;
}

function compactDateTime(value) {
  const text = String(value || "");
  if (!text) return "";
  return text.includes("T") ? text.slice(0, 16).replace("T", " ") : text.slice(0, 10);
}

function createTransferBatchId() {
  const timestamp = new Date().toISOString().replace(/[-:TZ.]/g, "").slice(0, 14);
  const suffix = Math.random().toString(36).slice(2, 8).toUpperCase();
  return `TR-${timestamp}-${suffix}`;
}

function bankTransferRecord(data, payment) {
  const vendor = findVendor(data, payment);
  const bank = payment.vendor_bank || vendor.bank;
  const account = payment.vendor_account_number || vendor.account_number;
  const holder = payment.vendor_account_holder || vendor.account_holder || payment.vendor;
  const amount = Number(payment.net_amount ?? payment.amount ?? 0);
  const memo = `${payment.store || ""} ${payment.payment_item || ""}`.trim();

  return {
    bank: normalizeBankName(bank),
    account: onlyDigits(account),
    holder,
    amount,
    withdrawMemo: "하카공사비",
    depositMemo: textLimit(holder, 7),
    payerCode: "",
    memo: textLimit(memo, 10),
    key: textLimit(`${payment.id || ""}-${payment.requested_at || today()}`, 20),
    payment,
    vendor,
    ready: Boolean(bank && account && holder && amount > 0)
  };
}

function isWithinDateRange(dateValue, startDate, endDate) {
  const date = String(dateValue || "").slice(0, 10);
  if (!date) return false;
  if (startDate && date < startDate) return false;
  if (endDate && date > endDate) return false;
  return true;
}

function bankTransferRecords(data, filters = {}) {
  const selectedIds = filters.selectedIds?.length ? new Set(filters.selectedIds.map(String)) : null;
  const hasDateScope = Boolean(filters.startDate || filters.endDate);
  const keyword = String(filters.keyword || "").trim().toLowerCase();
  const readyStatus = filters.readyStatus || "all";

  return transferCandidatePayments(data)
    .filter((payment) => !hasDateScope || isWithinDateRange(payment.requested_at, filters.startDate, filters.endDate))
    .filter((payment) => !selectedIds || selectedIds.has(String(payment.id)))
    .map((payment) => bankTransferRecord(data, payment))
    .filter((record) => {
      if (!keyword) return true;
      return [
        record.payment.store,
        record.payment.vendor,
        record.payment.payment_item,
        record.bank,
        record.account,
        record.holder
      ]
        .join(" ")
        .toLowerCase()
        .includes(keyword);
    })
    .filter((record) => {
      if (readyStatus === "ready") return record.ready;
      if (readyStatus === "missing") return !record.ready;
      return true;
    });
}

async function updateTransferExportStatus(records, batchId) {
  if (activeRole !== "전체 관리자") return { error: new Error("관리자만 이체 상태를 처리할 수 있습니다.") };
  const ids = [...new Set(records.map((record) => Number(record.payment.id)).filter(Boolean))];
  if (!ids.length) return { updated: 0 };

  const exportedAt = new Date().toISOString();
  const transferPayload = {
    transfer_batch_id: batchId,
    exported_at: exportedAt,
    transfer_status: "파일생성"
  };

  if (!supabase) {
    previewData.payments = previewData.payments.map((payment) =>
      ids.includes(payment.id) && payment.status === "승인" && !isTransferCompleted(payment) ? { ...payment, ...transferPayload } : payment
    );
    currentData = await loadData();
    return { updated: ids.length };
  }

  const { data: updatedRows, error } = await supabase
    .from("payments")
    .update(transferPayload)
    .in("id", ids)
    .eq("status", "승인")
    .in("transfer_status", ["미작성", "파일생성"])
    .is("transferred_at", null)
    .select("id");

  if (error) return { error };
  return { updated: updatedRows?.length || 0 };
}

async function markSelectedTransfersCompleted(paymentIds) {
  if (activeRole !== "전체 관리자") return;
  const ids = [...new Set(paymentIds.map(Number).filter(Boolean))];
  if (!ids.length) {
    render("송금완료 처리할 이체건을 먼저 선택해 주세요.");
    return;
  }

  if (!window.confirm(`${ids.length}건을 송금완료로 처리할까요? 처리 후 이체자료조회 대상에서 제외됩니다.`)) return;

  const transferPayload = {
    transfer_status: "송금완료",
    transferred_at: new Date().toISOString(),
    transfer_memo: "화면에서 송금완료 처리"
  };

  if (!supabase) {
    previewData.payments = previewData.payments.map((payment) =>
      ids.includes(payment.id) && payment.status === "승인" && !isTransferCompleted(payment) ? { ...payment, ...transferPayload } : payment
    );
    activeView = "은행 이체 파일 생성";
    await refreshDataAndRender(`${ids.length}건을 송금완료 처리했습니다.`);
    return;
  }

  const { data: updatedRows, error } = await supabase
    .from("payments")
    .update(transferPayload)
    .in("id", ids)
    .eq("status", "승인")
    .in("transfer_status", ["미작성", "파일생성"])
    .is("transferred_at", null)
    .select("id");

  if (error) {
    render(`송금완료 처리 실패: ${error.message}`);
    return;
  }

  activeView = "은행 이체 파일 생성";
  await refreshDataAndRender(`${updatedRows?.length || 0}건을 송금완료 처리했습니다.`);
}

async function downloadBankTransferFile(data, filters = {}) {
  if (activeRole !== "전체 관리자") return;
  const hasSelectedScope = Array.isArray(filters.selectedIds) && filters.selectedIds.length > 0;
  const hasDateScope = Boolean(filters.startDate || filters.endDate);
  if (!hasSelectedScope && !hasDateScope) {
    render("이체 파일은 전체 승인건을 자동으로 만들지 않습니다. 이체대상을 체크하거나 날짜 범위를 조회한 뒤 다운로드해 주세요.");
    return;
  }

  // Re-read just before generating an export to exclude payments completed by another user.
  const latest = supabase ? await withTimeout(loadData(), "최신 이체 내역을 확인하지 못했습니다. 다시 조회해 주세요.") : data;
  const readyRecords = bankTransferRecords(latest, filters).filter((record) => record.ready);
  if (!readyRecords.length) {
    render("다운로드할 승인 완료 건이 없거나, 업체 계좌정보가 비어 있습니다.");
    return;
  }

  if (!window.XLSX) {
    render("엑셀 생성 모듈을 불러오지 못했습니다. 새로고침 후 다시 시도해 주세요.");
    return;
  }

  const headers = ["*입금은행", "*입금계좌", "*입금액", "고객관리성명"];
  const rows = readyRecords.map((record) => [
    record.bank,
    record.account,
    Math.round(Number(record.amount || 0)),
    record.holder
  ]);

  const sheet = window.XLSX.utils.aoa_to_sheet([headers, ...rows]);
  for (let rowIndex = 2; rowIndex <= rows.length + 1; rowIndex += 1) {
    const accountCell = sheet[`B${rowIndex}`];
    const amountCell = sheet[`C${rowIndex}`];
    if (accountCell) {
      accountCell.t = "s";
      accountCell.z = "@";
    }
    if (amountCell) {
      amountCell.t = "n";
      amountCell.z = "0";
    }
  }
  sheet["!cols"] = [{ wch: 12 }, { wch: 22 }, { wch: 14 }, { wch: 24 }];

  const workbook = window.XLSX.utils.book_new();
  window.XLSX.utils.book_append_sheet(workbook, sheet, "입력정보");
  const output = window.XLSX.write(workbook, { bookType: "xls", type: "array" });
  const blob = new Blob([output], { type: "application/vnd.ms-excel" });
  const url = URL.createObjectURL(blob);
  const batchId = createTransferBatchId();
  const link = document.createElement("a");
  link.href = url;
  const period = filters.startDate || filters.endDate ? `_${filters.startDate || "처음"}_${filters.endDate || "오늘"}` : "";
  link.download = `은행대량이체${period}_${batchId}_${readyRecords.length}건.xls`;
  document.body.appendChild(link);
  link.click();
  link.remove();
  URL.revokeObjectURL(url);

  const tracking = await updateTransferExportStatus(readyRecords, batchId);
  if (tracking.error) {
    render(`이체 파일 ${readyRecords.length}건은 생성했지만 상태 저장에 실패했습니다: ${tracking.error.message}`);
    return;
  }

  activeView = "은행 이체 파일 생성";
  await refreshDataAndRender(`이체 파일 ${readyRecords.length}건을 생성하고 ${tracking.updated}건을 파일생성 상태로 표시했습니다.`);
}

function syncPaymentAmount(form) {
  const estimateInput = form.querySelector("[name='estimate_total']");
  const typeInput = form.querySelector("[name='payment_type']");
  const amountInput = form.querySelector("[name='amount']");
  const ratio = paymentRatio(typeInput.value);
  const estimateTotal = parseAmount(estimateInput.value);

  if (!ratio || !estimateTotal) return;
  amountInput.value = String(Math.round(estimateTotal * ratio));
  syncTaxPreview(form);
}

function syncTaxPreview(form) {
  const incomeNotice = form.querySelector("[data-income-notice]");
  if (incomeNotice) incomeNotice.hidden = form.querySelector("[name='tax_type']")?.value !== "사업소득 3.3%";
  const amount = parseAmount(form.querySelector("[name='amount']")?.value);
  const taxType = form.querySelector("[name='tax_type']")?.value || "일반 송금";
  const withholdingAmount = Math.round(amount * withholdingRate(taxType));
  const netAmount = amount - withholdingAmount;

  const withholdingPreview = form.querySelector("[data-withholding-preview]");
  const netPreview = form.querySelector("[data-net-preview]");
  if (withholdingPreview) withholdingPreview.textContent = formatKRW(withholdingAmount);
  if (netPreview) netPreview.textContent = formatKRW(netAmount);
}

function syncPaymentVendorAccount(form) {
  const vendorName = String(form.querySelector("[name='vendor']")?.value || "").trim();
  const vendor = currentData.vendors.find((item) => String(item.name || "").trim() === vendorName);
  if (!vendor) return;

  form.querySelector("[name='vendor_bank']").value = vendor.bank || "";
  form.querySelector("[name='vendor_account_number']").value = vendor.account_number || "";
  form.querySelector("[name='vendor_account_holder']").value = vendor.account_holder || "";
}

function fillVendorForm(vendorId) {
  const vendor = currentData.vendors.find((item) => item.id === vendorId);
  const form = document.querySelector("#vendor-form");
  if (!vendor || !form) return;

  form.querySelector("[name='vendor_id']").value = vendor.id;
  form.querySelector("[name='name']").value = vendor.name || "";
  form.querySelector("[name='category']").value = vendor.category || "";
  form.querySelector("[name='bank']").value = vendor.bank || "";
  form.querySelector("[name='account_number']").value = vendor.account_number || "";
  form.querySelector("[name='account_holder']").value = vendor.account_holder || "";
  form.querySelector("button[type='submit']").textContent = "계좌 수정";
  form.querySelector("[data-vendor-message]").textContent = "기존 계좌 정보를 수정 중입니다. 새 파일을 첨부하면 기존 파일에 추가됩니다.";
}

function table(headers, rows) {
  return `
    <div class="table-wrap">
      <table>
        <thead><tr>${headers.map((head) => `<th>${head}</th>`).join("")}</tr></thead>
        <tbody>${rows.length ? rows.join("") : `<tr><td colspan="${headers.length}" class="empty">조회된 내역이 없습니다.</td></tr>`}</tbody>
      </table>
    </div>
  `;
}

function paymentRows(data) {
  return data.payments.map(
    (payment) => `
      <tr>
        <td>${safeText(payment.store)}</td>
        <td>${safeText(payment.vendor)}</td>
        <td>${safeText(payment.vendor_bank)}</td>
        <td>${safeText(payment.vendor_account_number)}</td>
        <td>${safeText(payment.vendor_account_holder)}</td>
        <td>${safeText(payment.payment_item)}</td>
        <td class="money">${formatKRW(payment.estimate_total || payment.amount)}</td>
        <td>${safeText(payment.payment_type, "일시 지급")}</td>
        <td class="money">${formatKRW(payment.amount)}</td>
        <td>${safeText(payment.tax_type, "일반 송금")}</td>
        <td class="money">${formatKRW(payment.withholding_amount || 0)}</td>
        <td class="money">${formatKRW(payment.net_amount ?? payment.amount)}</td>
        <td>${paymentAttachmentSummary(payment)}</td>
        <td>${safeText(payment.estimate_group_mode, "매장별 항목 합산")}</td>
        <td><span class="badge ${statusClass(payment.status)}">${safeText(payment.status)}</span></td>
        <td>${safeText(payment.requested_at)}</td>
      </tr>`
  );
}

function paymentReviewRows(data, canApprove = false) {
  return data.payments.map(
    (payment) => `
      <tr>
        <td>${safeText(payment.store)}</td>
        <td>${safeText(payment.vendor)}</td>
        <td>${safeText(payment.vendor_bank)}</td>
        <td>${safeText(payment.vendor_account_number)}</td>
        <td>${safeText(payment.vendor_account_holder)}</td>
        <td>${safeText(payment.payment_item)}</td>
        <td class="money">${formatKRW(payment.estimate_total || payment.amount)}</td>
        <td>${safeText(payment.payment_type, "일시 지급")}</td>
        <td class="money">${formatKRW(payment.amount)}</td>
        <td>${safeText(payment.tax_type, "일반 송금")}</td>
        <td class="money">${formatKRW(payment.withholding_amount || 0)}</td>
        <td class="money">${formatKRW(payment.net_amount ?? payment.amount)}</td>
        <td>${paymentAttachmentSummary(payment)}</td>
        <td>${safeText(payment.estimate_group_mode, "매장별 항목 합산")}</td>
        <td><span class="badge ${statusClass(payment.status)}">${safeText(payment.status)}</span></td>
        <td>${safeText(payment.requested_at)}</td>
        <td>
          ${
            payment.status === "신청" && canApprove
              ? `<div class="row-actions">
                  <label class="check-control compact">
                    <input type="checkbox" class="payment-select" value="${escapeAttr(payment.id)}" />
                    선택
                  </label>
                  <button data-payment-id="${escapeAttr(payment.id)}" data-payment-status="승인">승인</button>
                  <button data-payment-id="${escapeAttr(payment.id)}" data-payment-status="반려">반려</button>
                </div>`
              : payment.status === "신청"
                ? `<span class="muted">승인 대기</span>`
              : `<span class="muted">처리 완료</span>`
          }
        </td>
      </tr>`
  );
}

function paymentReviewCards(data, canApprove = false) {
  if (!data.payments.length) return `<div class="empty">표시할 결제 신청이 없습니다.</div>`;

  return `
    <div class="payment-review-list">
      ${data.payments
        .map((payment) => {
          const canSelectPending = payment.status === "신청" && canApprove;

          return `
            <details class="payment-review-card">
              <summary>
                <div class="payment-summary-main">
                  ${
                    canSelectPending
                      ? `<input type="checkbox" class="payment-select" value="${payment.id}" aria-label="${escapeAttr(payment.store)} 선택" />`
                      : ""
                  }
                  <div>
                    <strong>${safeText(payment.store)}</strong>
                    <span>${safeText(payment.vendor)}</span>
                  </div>
                </div>
                <div class="payment-summary-meta">
                  <span>${safeText(payment.payment_item)}</span>
                  <strong>${formatKRW(payment.net_amount ?? payment.amount)}</strong>
                  ${incomeBadge(payment)}
                  <span class="badge ${statusClass(payment.status)}">${safeText(payment.status)}</span>
                </div>
              </summary>
              <div class="payment-detail-grid">
                <div><span>입금은행</span><strong>${safeText(payment.vendor_bank)}</strong></div>
                <div><span>입금계좌</span><strong>${safeText(payment.vendor_account_number)}</strong></div>
                <div><span>예금주</span><strong>${safeText(payment.vendor_account_holder)}</strong></div>
                <div><span>견적 총액</span><strong>${formatKRW(payment.estimate_total || payment.amount)}</strong></div>
                <div><span>결제 방식</span><strong>${safeText(payment.payment_type, "일시 지급")}</strong></div>
                <div><span>이번 신청액</span><strong>${formatKRW(payment.amount)}</strong></div>
                <div><span>지급 유형</span><strong>${safeText(payment.tax_type, "일반 송금")}</strong></div>
                <div><span>원천징수</span><strong>${formatKRW(payment.withholding_amount || 0)}</strong></div>
                <div><span>실지급액</span><strong>${formatKRW(payment.net_amount ?? payment.amount)}</strong></div>
                <div><span>첨부 자료</span><strong>${paymentAttachmentSummary(payment)}</strong></div>
                <div><span>견적서 반영</span><strong>${safeText(payment.estimate_group_mode, "매장별 항목 합산")}</strong></div>
                <div><span>신청일</span><strong>${safeText(payment.requested_at)}</strong></div>
                ${isBusinessIncome(payment) ? `<div class="income-detail"><span>신고 알림</span><strong>사업소득 3.3% · 아마란스 신고 확인</strong><small>송금완료와 신고완료는 별도입니다.</small></div>` : ""}
              </div>
              <div class="payment-detail-actions">
                ${
                  payment.status === "신청"
                    ? `<button data-payment-edit="${escapeAttr(payment.id)}">수정</button>
                       <button data-payment-id="${escapeAttr(payment.id)}" data-payment-status="반려">신청 취소</button>
                       ${canApprove ? `<button class="primary" data-payment-id="${escapeAttr(payment.id)}" data-payment-status="승인">승인</button>` : ""}`
                      : `<span class="muted">처리 완료</span>`
                }
              </div>
            </details>`;
        })
        .join("")}
    </div>
  `;
}

function bankTransferRows(records, selectable = false) {
  if (!records.length) {
    return `<tr><td colspan="${selectable ? 12 : 11}">조회된 이체 대상이 없습니다.</td></tr>`;
  }

  return records.map(
    (record) => `
      <tr>
        ${selectable ? `<td><input type="checkbox" class="transfer-select" value="${escapeAttr(record.payment.id)}" ${record.ready ? "" : "disabled"} aria-label="${escapeAttr(record.payment.store)} 이체대상 선택" /></td>` : ""}
        <td>${safeText(record.payment.requested_at)}</td>
        <td>${safeText(record.payment.store)}</td>
        <td>${safeText(record.payment.vendor)}</td>
        <td>${safeText(record.payment.payment_item)}${incomeBadge(record.payment)}</td>
        <td>${safeText(record.bank)}</td>
        <td>${safeText(record.account)}</td>
        <td>${safeText(record.holder)}</td>
        <td class="money">${formatKRW(record.amount)}</td>
        <td>${safeText(compactDateTime(record.payment.exported_at))}</td>
        <td>${safeText(compactDateTime(record.payment.transferred_at))}</td>
        <td><span class="badge ${transferStatusClass(record)}">${transferStatusLabel(record)}</span></td>
      </tr>`
  ).join("");
}

function quoteForStore(data, storeName) {
  return data.storeQuotes.find((quote) => quote.store_name === storeName) || {};
}

function constructionStartForStore(data, storeName) {
  return data.constructionStarts.find((item) => item.store_name === storeName) || {};
}

function furnitureItemUnit(group, nameIncludes) {
  const item = furnitureCostItems.find((entry) => {
    const sameGroup = entry.group === group;
    const sameName = nameIncludes.every((keyword) => entry.name.includes(keyword));
    return sameGroup && sameName;
  });
  return item ? furnitureAverage(item) : 0;
}

function approvedDirectCost(data, storeName) {
  return data.payments
    .filter((payment) => {
      const sameStore = payment.store === storeName;
      const approved = payment.status === "승인";
      const item = String(payment.payment_item || "");
      const fixtureMaterial = item.includes("진열장") || item.includes("벽장") || item.includes("카운터");
      return sameStore && approved && !fixtureMaterial;
    })
    .reduce((sum, payment) => sum + Number(payment.amount || 0), 0);
}

function fixtureCostForStore(data, storeName) {
  const start = constructionStartForStore(data, storeName);
  const upperCount = numberValue(start.wall_upper_count ?? start.wall_cabinet_count);
  const lowerCount = numberValue(start.wall_lower_count);
  const displayCount = numberValue(start.display_fixture_count ?? start.fixture_count);
  const counterDrawer1200Count = numberValue(start.counter_drawer_1200_count ?? start.counter_count);
  const counterShelf1800Count = numberValue(start.counter_shelf_1800_count);
  const counterShelf1600Count = numberValue(start.counter_shelf_1600_count);
  const tableCount = numberValue(start.table_count);

  return (
    upperCount * furnitureItemUnit("벽장", ["상부장"]) +
    lowerCount * furnitureItemUnit("벽장", ["하부장"]) +
    displayCount * furnitureItemUnit("진열장", ["유리장"]) +
    counterDrawer1200Count * furnitureItemUnit("카운터", ["서랍형", "1200"]) +
    counterShelf1800Count * furnitureItemUnit("카운터", ["선반형", "1800"]) +
    counterShelf1600Count * furnitureItemUnit("카운터", ["선반형", "1600"]) +
    tableCount * furnitureItemUnit("테이블", ["600*1200"])
  );
}

function allManagedStoreNames(data) {
  const names = [
    ...data.stores.map((store) => store.name),
    ...data.constructionStarts.map((store) => store.store_name),
    ...data.payments.map((payment) => payment.store)
  ];
  return [...new Set(names.map((name) => String(name || "").trim()).filter(Boolean))];
}

function storeForName(data, storeName) {
  return data.stores.find((store) => store.name === storeName) || {};
}

function isHardcopyCompletedStore(data, storeName) {
  const store = storeForName(data, storeName);
  return store.status === "완료" && !store.document_required;
}

function isCompletedManagedStore(data, storeName) {
  const quote = quoteForStore(data, storeName);
  const store = storeForName(data, storeName);
  return quote.quote_status === "계약 완료" || (store.status === "완료" && Boolean(store.document_required));
}

function managedStoreNamesByStatus(data, filter = "진행중") {
  return allManagedStoreNames(data).filter((storeName) => {
    if (isHardcopyCompletedStore(data, storeName)) return false;
    const completed = isCompletedManagedStore(data, storeName);
    return filter === "완료" ? completed : !completed;
  });
}

function documentManagedStoreNames(data) {
  return allManagedStoreNames(data).filter((storeName) => !isHardcopyCompletedStore(data, storeName));
}

function quoteAmounts(data, storeName, marginRate) {
  const directCost = approvedDirectCost(data, storeName);
  const fixtureCost = fixtureCostForStore(data, storeName);
  const costTotal = directCost + fixtureCost;
  const supplyAmount = Math.round(costTotal * (1 + numberValue(marginRate) / 100));
  const vatAmount = Math.round(supplyAmount * 0.1);
  const totalAmount = supplyAmount + vatAmount;

  return { directCost, fixtureCost, costTotal, supplyAmount, vatAmount, totalAmount };
}

function documentLineItems(data, storeName, marginRate) {
  const grouped = new Map();
  data.payments
    .filter((payment) => {
      const sameStore = payment.store === storeName;
      const approved = payment.status === "승인";
      const item = String(payment.payment_item || "");
      const fixtureMaterial = item.includes("진열장") || item.includes("벽장") || item.includes("카운터");
      return sameStore && approved && !fixtureMaterial;
    })
    .forEach((payment) => {
      const key = payment.payment_item || "기타 공사";
      grouped.set(key, (grouped.get(key) || 0) + Number(payment.amount || 0));
    });

  const fixtureCost = fixtureCostForStore(data, storeName);
  if (fixtureCost > 0) grouped.set("진열장 원가 배분", (grouped.get("진열장 원가 배분") || 0) + fixtureCost);

  return [...grouped.entries()].map(([name, cost]) => {
    const supply = Math.round(cost * (1 + numberValue(marginRate) / 100));
    const vat = Math.round(supply * 0.1);
    return { name, cost, supply, vat, total: supply + vat };
  });
}

function storeManagementRows(data, filter = "진행중") {
  return managedStoreNamesByStatus(data, filter).filter((storeName) => matchesSearch(storeName, workspaceSearch)).map((storeName) => {
    const quote = quoteForStore(data, storeName);
    const marginRate = quote.margin_rate ?? 35;
    const amounts = quoteAmounts(data, storeName, marginRate);
    const status = quote.quote_status || "정산중";

    return `
      <tr>
        <td>${safeText(storeName)}</td>
        <td><span class="badge ${statusClass(status)}">${safeText(status)}</span></td>
        <td class="money">${formatKRW(amounts.directCost)}</td>
        <td class="money">${formatKRW(amounts.fixtureCost)}</td>
        <td class="money">${formatKRW(amounts.costTotal)}</td>
        <td><input class="inline-input" data-margin-rate="${escapeAttr(storeName)}" inputmode="decimal" value="${escapeAttr(marginRate)}" /></td>
        <td class="money">${formatKRW(amounts.supplyAmount)}</td>
        <td class="money">${formatKRW(amounts.vatAmount)}</td>
        <td class="money">${formatKRW(amounts.totalAmount)}</td>
        <td>
          <div class="row-actions">
            <button data-quote-finalize="${escapeAttr(storeName)}">견적 확정</button>
            <button data-contract-complete="${escapeAttr(storeName)}">완료/문서 생성</button>
            <button data-document-view="견적서 생성" data-document-store="${escapeAttr(storeName)}">견적서</button>
            <button data-document-view="계약서 생성" data-document-store="${escapeAttr(storeName)}">계약서</button>
          </div>
        </td>
      </tr>`;
  });
}

function storeRows(data) {
  return data.stores.map(
    (store) => `
      <tr>
        <td>${safeText(store.region)}</td>
        <td>${safeText(store.name)}</td>
        <td>${store.fixture_count || 0}</td>
        <td>${safeText(store.area)}평</td>
        <td class="money">${formatKRW(store.budget)}</td>
        <td><span class="badge ${statusClass(store.status)}">${safeText(store.status)}</span></td>
        <td><span class="badge ${store.document_required ? "blue" : "gray"}">${store.document_required ? "생성 대상" : "출력 완료"}</span></td>
      </tr>`
  );
}

function fileLinks(files, fallbackText = "") {
  const parsedFiles = Array.isArray(files) ? files : [];
  if (!parsedFiles.length) return fallbackText ? escapeAttr(fallbackText) : "-";

  return parsedFiles
    .map((file) =>
      file.url
        ? `<a href="${escapeAttr(file.url)}" target="_blank" rel="noreferrer">${escapeAttr(file.name || "파일")}</a>`
        : `<span>${escapeAttr(file.name || "파일")}</span>`
    )
    .join("<br />");
}

function paymentAttachmentSummary(payment) {
  const files = payment.attachment_files || {};
  const estimateCount = (files.estimate_files || []).length;
  const taxInvoiceCount = (files.tax_invoice_files || []).length;
  const idCardCount = (files.id_card_files || []).length;

  if (payment.tax_type === "사업소득 3.3%") {
    return idCardCount ? `주민등록증 ${idCardCount}개` : "주민등록증 필요";
  }

  return `견적서 ${estimateCount}개 / 세금계산서 ${taxInvoiceCount}개`;
}

function fileSizeLabel(size) {
  const value = Number(size || 0);
  if (!value) return "-";
  if (value >= 1024 * 1024) return `${(value / 1024 / 1024).toFixed(1)}MB`;
  if (value >= 1024) return `${Math.round(value / 1024)}KB`;
  return `${value}B`;
}

function attachmentRows(data) {
  const rows = [];
  const addFiles = (source, owner, category, files, date = "") => {
    (Array.isArray(files) ? files : []).forEach((file) => {
      rows.push({
        source,
        owner,
        category,
        name: file.name || "파일",
        size: fileSizeLabel(file.size),
        date,
        url: file.url || ""
      });
    });
  };

  data.payments.forEach((payment) => {
    const files = payment.attachment_files || {};
    const owner = `${payment.store || "-"} / ${payment.vendor || "-"}`;
    const date = payment.requested_at || "";
    addFiles("결제 신청", owner, "견적서", files.estimate_files, date);
    addFiles("결제 신청", owner, "세금계산서", files.tax_invoice_files, date);
    addFiles("결제 신청", owner, "주민등록증", files.id_card_files, date);
  });

  data.vendors.forEach((vendor) => {
    const files = vendor.attachment_files || {};
    addFiles("업체 계좌", vendor.name || "-", "사업자등록증", files.business_license_files);
    addFiles("업체 계좌", vendor.name || "-", "통장사본", files.bankbook_files);
  });

  data.constructionStarts.forEach((item) => {
    const date = String(item.created_at || "").slice(0, 10);
    addFiles("공사 시작", item.store_name || "-", "도면", item.drawing_files, date);
    addFiles("공사 시작", item.store_name || "-", "기초 사진", item.base_photo_files, date);
  });

  if (!rows.length) {
    return [
      `<tr><td colspan="7">아직 업로드된 첨부 파일이 없습니다.</td></tr>`
    ];
  }

  return rows.filter((row) => matchesSearch(`${row.source} ${row.owner} ${row.category} ${row.name}`, workspaceSearch)).map(
    (row) => `
      <tr>
        <td>${safeText(row.source)}</td>
        <td>${safeText(row.owner)}</td>
        <td>${safeText(row.category)}</td>
        <td>${row.url ? `<a href="${escapeAttr(row.url)}" target="_blank" rel="noreferrer">${escapeAttr(row.name)}</a>` : escapeAttr(row.name)}</td>
        <td>${safeText(row.size)}</td>
        <td>${safeText(row.date)}</td>
        <td>${row.url ? `<a class="file-open-link" href="${escapeAttr(row.url)}" target="_blank" rel="noreferrer">열기</a>` : "-"}</td>
      </tr>`
  );
}

function constructionStartRows(data) {
  return data.constructionStarts.filter((row) => matchesSearch(`${row.store_name} ${row.special_notes || ""}`, workspaceSearch)).map(
    (item) => `
      <tr>
        <td>${safeText(item.store_name)}</td>
        <td>${safeText(item.area)}평</td>
        <td>${safeText(item.wall_upper_count ?? item.wall_cabinet_count ?? 0)}</td>
        <td>${safeText(item.wall_lower_count ?? 0)}</td>
        <td>${safeText(item.display_fixture_count ?? item.fixture_count ?? 0)}</td>
        <td>${safeText(item.counter_drawer_1200_count ?? item.counter_count ?? 0)}</td>
        <td>${safeText(item.counter_shelf_1800_count ?? 0)}</td>
        <td>${safeText(item.counter_shelf_1600_count ?? 0)}</td>
        <td>${safeText(item.table_count || 0)}</td>
        <td>${safeText(item.sign_count || 0)}</td>
        <td>${fileLinks(item.drawing_files, item.drawing_note)}</td>
        <td>${fileLinks(item.base_photo_files, item.base_photo_note)}</td>
        <td>${safeText(item.special_notes)}</td>
      </tr>`
  );
}

function vendorRows(data) {
  return data.vendors.map(
    (vendor) => {
      const files = vendor.attachment_files || {};
      const licenseCount = (files.business_license_files || []).length;
      const bankbookCount = (files.bankbook_files || []).length;

      return `
        <tr>
          <td>${safeText(vendor.name)}</td>
          <td>${safeText(vendor.category)}</td>
          <td>${safeText(vendor.bank)}</td>
          <td>${safeText(vendor.account_number)}</td>
          <td>${safeText(vendor.account_holder)}</td>
          <td>사업자 ${licenseCount}개 / 통장 ${bankbookCount}개</td>
          <td><span class="badge ${statusClass(vendor.risk)}">${safeText(vendor.risk)}</span></td>
          <td><button data-vendor-edit="${escapeAttr(vendor.id)}">수정</button></td>
        </tr>`;
    }
  );
}

function vendorSuggestions(data) {
  return data.vendors
    .map(
      (vendor) =>
        `<option value="${escapeAttr(vendor.name)}">${escapeAttr(vendor.name)} / ${escapeAttr(vendor.bank)} ${escapeAttr(vendor.account_number || "")}</option>`
    )
    .join("");
}

function storeSuggestions(data) {
  const constructionStores = data.constructionStarts.map((item) => ({
    name: item.store_name,
    area: item.area,
    status: "공사 시작 접수"
  }));
  const stores = [...constructionStores, ...data.stores];
  const seen = new Set();

  return stores
    .filter((store) => {
      const key = String(store.name || "").trim();
      if (!key || seen.has(key)) return false;
      seen.add(key);
      return true;
    })
    .map(
      (store) =>
        `<option value="${escapeAttr(store.name)}">${escapeAttr(store.name)} / ${escapeAttr(store.area)}평 / ${escapeAttr(store.status)}</option>`
    )
    .join("");
}

function paymentItemSuggestions(data) {
  return data.paymentItems
    .map((item) => `<option value="${escapeAttr(item)}">${escapeAttr(item)}</option>`)
    .join("");
}

function selectAttr(value, currentValue) {
  return value === currentValue ? "selected" : "";
}

function paymentForm() {
  const editingPayment = currentData.payments.find((payment) => payment.id === editingPaymentId && payment.status === "신청") || importedDraft;
  const isEditing = Boolean(editingPayment?.id);
  const valueFor = (field, fallbackValue = "") => escapeAttr(editingPayment?.[field] ?? fallbackValue);

  return `
    <article class="panel form-panel">
      <div class="panel-head">
        <h2>${isEditing ? "결제 신청 수정" : "결제 신청 입력"}</h2>
        ${isEditing ? `<button data-payment-edit-cancel>수정 취소</button>` : ""}
      </div>
      <div class="notice">${isEditing ? "승인 전 신청 건만 수정할 수 있습니다. 기존 첨부파일은 유지되고 새 파일을 추가할 수 있습니다." : "등록된 업체를 선택하면 계좌 정보와 결제 신청이 같은 기준으로 연결됩니다."}</div>
      <form id="payment-form">
        <input type="hidden" name="payment_id" value="${isEditing ? editingPayment.id : ""}" />
        <label>매장
          <input name="store" list="store-suggestions" value="${valueFor("store")}" placeholder="직접입력 또는 매장명 검색" autocomplete="off" />
          <datalist id="store-suggestions">
            <option value="직접입력">직접입력</option>
            ${storeSuggestions(currentData)}
          </datalist>
        </label>
        <label>협력업체
          <input name="vendor" list="vendor-suggestions" value="${valueFor("vendor")}" placeholder="직접입력 또는 업체명 검색" autocomplete="off" />
          <datalist id="vendor-suggestions">
            <option value="직접입력">직접입력</option>
            ${vendorSuggestions(currentData)}
          </datalist>
        </label>
        <label>입금은행<input name="vendor_bank" value="${valueFor("vendor_bank")}" placeholder="업체 선택 시 자동 입력, 변경 가능" autocomplete="off" /></label>
        <label>입금계좌<input name="vendor_account_number" value="${valueFor("vendor_account_number")}" placeholder="예: 110-000-000000" autocomplete="off" /></label>
        <label>예금주<input name="vendor_account_holder" value="${valueFor("vendor_account_holder")}" placeholder="예: 도원인테리어" autocomplete="off" /></label>
        <label>결제 항목
          <input name="payment_item" list="payment-item-suggestions" value="${valueFor("payment_item")}" placeholder="직접입력 또는 공사항목 검색" autocomplete="off" />
          <datalist id="payment-item-suggestions">
            <option value="직접입력">직접입력</option>
            ${paymentItemSuggestions(currentData)}
          </datalist>
        </label>
        <label>견적 총액, 부가세 포함<input name="estimate_total" value="${valueFor("estimate_total")}" inputmode="numeric" placeholder="예: 10000000" autocomplete="off" /></label>
        <label>결제 방식
          <select name="payment_type">
            <option value="일시 지급" ${selectAttr("일시 지급", editingPayment?.payment_type || "일시 지급")}>일시 지급</option>
            <option value="선금 50%" ${selectAttr("선금 50%", editingPayment?.payment_type)}>선금 50%</option>
            <option value="잔금 50%" ${selectAttr("잔금 50%", editingPayment?.payment_type)}>잔금 50%</option>
            <option value="직접 입력" ${selectAttr("직접 입력", editingPayment?.payment_type)}>직접 입력</option>
          </select>
        </label>
        <label>이번 신청 금액<input name="amount" value="${valueFor("amount")}" inputmode="numeric" placeholder="예: 5000000" autocomplete="off" /></label>
        <label>계산서 / 사업소득 구분
          <select name="tax_type">
            <option value="일반 송금" ${selectAttr("일반 송금", editingPayment?.tax_type || "일반 송금")}>일반 계산서 건</option>
            <option value="사업소득 3.3%" ${selectAttr("사업소득 3.3%", editingPayment?.tax_type)}>사업소득 3.3%</option>
          </select>
        </label>
        <div class="income-form-notice wide" data-income-notice hidden><strong>사업소득 3.3% · 아마란스 신고 확인</strong><span>이 결제는 사업소득 지급 건입니다. 신고서는 아마란스에서 별도로 작성해 주세요.</span></div>
        <div class="calc-box">
          <span>원천징수액 <strong data-withholding-preview>0원</strong></span>
          <span>실지급액 <strong data-net-preview>0원</strong></span>
        </div>
        <label>견적서 첨부<input name="estimate_files" type="file" accept="image/*,application/pdf" multiple /></label>
        <label>세금계산서 첨부<input name="tax_invoice_files" type="file" accept="image/*,application/pdf" multiple /></label>
        <label>주민등록증 첨부<input name="id_card_files" type="file" accept="image/*,application/pdf" multiple /></label>
        <label>메모<input name="memo" value="${valueFor("memo")}" placeholder="예: 진열장 선금, 잔금, 추가 요청사항" autocomplete="off" /></label>
        <p class="form-message" data-form-message></p>
        <button class="primary wide" type="submit">${isEditing ? "수정 저장" : "검토 요청 생성"}</button>
      </form>
    </article>
  `;
}

function vendorForm() {
  return `
    <article class="panel form-panel">
      <div class="panel-head">
        <h2>결제 계좌 추가</h2>
      </div>
      <div class="notice">결제 신청 전에 협력업체와 지급 계좌를 먼저 등록합니다.</div>
      <form id="vendor-form">
        <input type="hidden" name="vendor_id" />
        <label>업체명<input name="name" placeholder="예: 도원인테리어" autocomplete="off" /></label>
        <label>공종 분류<input name="category" placeholder="예: 시공, 전기, 설비" autocomplete="off" /></label>
        <label>은행명<input name="bank" placeholder="예: 신한은행" autocomplete="off" /></label>
        <label>계좌번호<input name="account_number" placeholder="예: 110-000-000000" autocomplete="off" /></label>
        <label>예금주<input name="account_holder" placeholder="예: 도원인테리어" autocomplete="off" /></label>
        <label>사업자등록증 첨부<input name="business_license_files" type="file" accept="image/*,application/pdf" multiple /></label>
        <label>통장사본 첨부<input name="bankbook_files" type="file" accept="image/*,application/pdf" multiple /></label>
        <p class="form-message" data-vendor-message></p>
        <button class="primary wide" type="submit">계좌 저장</button>
      </form>
    </article>
  `;
}

function storeForm() {
  return `
    <article class="panel form-panel">
      <div class="panel-head">
        <h2>매장 공사 추가</h2>
      </div>
      <div class="notice">매장별 면적, 예산, 실제 사용액과 공사 상태를 등록합니다.</div>
      <form id="store-form">
        <label>매장명<input name="name" placeholder="예: 강남 플래그십" autocomplete="off" /></label>
        <label>면적<input name="area" inputmode="numeric" placeholder="예: 45" autocomplete="off" /></label>
        <label>예산<input name="budget" inputmode="numeric" placeholder="예: 180000000" autocomplete="off" /></label>
        <label>현재 사용액<input name="spent" inputmode="numeric" placeholder="예: 0" autocomplete="off" /></label>
        <label>공사 상태
          <select name="status">
            <option value="미착공">미착공</option>
            <option value="진행중">진행중</option>
            <option value="완료">완료</option>
          </select>
        </label>
        <p class="form-message" data-store-message></p>
        <button class="primary wide" type="submit">매장 저장</button>
      </form>
    </article>
  `;
}

function constructionStartForm() {
  return `
    <article class="panel form-panel">
      <div class="panel-head">
        <h2>공사 시작 정보 입력</h2>
      </div>
      <div class="notice">직영매장 공사 시작 전에 필요한 도면, 수량, 사진, 특이사항을 먼저 접수합니다.</div>
      <form id="construction-start-form">
        <label>매장명<input name="store_name" placeholder="예: 강남압구정 직영점" autocomplete="off" /></label>
        <label>평수<input name="area" inputmode="numeric" placeholder="예: 45" autocomplete="off" /></label>
        <label>도면 파일<input name="drawing_files" type="file" accept="image/*,application/pdf,.pdf,.heic,.heif,.dwg,.dxf" multiple /></label>
        <label>벽장 / 상부장<input name="wall_upper_count" inputmode="numeric" placeholder="예: 4" autocomplete="off" /></label>
        <label>벽장 / 하부장<input name="wall_lower_count" inputmode="numeric" placeholder="예: 4" autocomplete="off" /></label>
        <label>진열장 / 유리장<input name="display_fixture_count" inputmode="numeric" placeholder="예: 8" autocomplete="off" /></label>
        <label>카운터 / 서랍형 1200<input name="counter_drawer_1200_count" inputmode="numeric" placeholder="예: 1" autocomplete="off" /></label>
        <label>카운터 / 선반형 1800<input name="counter_shelf_1800_count" inputmode="numeric" placeholder="예: 1" autocomplete="off" /></label>
        <label>카운터 / 선반형 1600<input name="counter_shelf_1600_count" inputmode="numeric" placeholder="예: 1" autocomplete="off" /></label>
        <label>테이블 / 600*1200<input name="table_count" inputmode="numeric" placeholder="예: 3" autocomplete="off" /></label>
        <label>광고판 갯수<input name="sign_count" inputmode="numeric" placeholder="예: 2" autocomplete="off" /></label>
        <label>매장 기초 사진<input name="base_photo_files" type="file" accept="image/*,application/pdf,.pdf,.heic,.heif" multiple /></label>
        <label>특이사항<textarea name="special_notes" placeholder="현장 특이사항, 요청사항, 주의할 점"></textarea></label>
        <p class="form-message" data-construction-start-message></p>
        <button class="primary wide" type="submit">공사 시작 정보 저장</button>
      </form>
    </article>
  `;
}

function dashboardView(data) {
  return dashboard(data);
}

function paymentView(data) {
  const canDownloadTransfer = visibleNav().includes("은행 이체 파일 생성");
  const pendingCount = data.payments.filter((payment) => payment.status === "신청").length;
  const filtered = filterPayments(data.payments, paymentFilters);
  const pages = Math.max(1, Math.ceil(filtered.length / 25));
  paymentPage = Math.min(paymentPage, pages);
  const pageData = { ...data, payments: filtered.slice((paymentPage - 1) * 25, paymentPage * 25) };

  return `
    <section class="page-intro"><span class="eyebrow">REQUEST → REVIEW → TRANSFER</span><h2>품목별로 올리고, 확인하고, 지급하세요.</h2><p>매장과 공사 품목을 정확히 선택하면 같은 기록이 집계에 반영됩니다.</p></section>
    <section class="grid payment-layout">
      ${paymentForm()}
      <article class="panel">
        <div class="panel-head">
          <h2>결제 신청 검토</h2>
          <div class="row-actions">
            <button>승인 대기 ${pendingCount}건</button>
            ${canDownloadTransfer ? `<button data-view-link="은행 이체 파일 생성">은행 이체 전표</button>` : ""}
          </div>
        </div>
        ${paymentFilterToolbar(filtered.length, data.payments.length)}
        ${
          canDownloadTransfer
            ? `<div class="bulk-actions">
                <label class="check-control">
                  <input type="checkbox" data-select-pending-payments />
                  현재 페이지 승인대기 선택
                </label>
                <button class="primary" data-approve-selected-payments>선택 승인</button>
                <button data-view-link="은행 이체 파일 생성">은행 이체 전표로 이동</button>
              </div>`
            : ""
        }
        ${paymentReviewCards(pageData, canDownloadTransfer)}
        <div class="pagination"><span>${filtered.length}건 중 ${(paymentPage - 1) * 25 + (filtered.length ? 1 : 0)}–${Math.min(paymentPage * 25, filtered.length)}건</span><div><button data-payment-page="${paymentPage - 1}" ${paymentPage === 1 ? "disabled" : ""}>이전</button><strong>${paymentPage} / ${pages}</strong><button data-payment-page="${paymentPage + 1}" ${paymentPage === pages ? "disabled" : ""}>다음</button></div></div>
      </article>
    </section>
  `;
}

function bankTransferView(data) {
  const allRecords = bankTransferRecords(data);
  const records = bankTransferRecords(data, transferDateFilter);
  const completedTransferCount = approvedPayments(data).filter((payment) => isTransferCompleted(payment)).length;
  const readyCount = records.filter((record) => record.ready).length;
  const missingCount = records.length - readyCount;
  const exportedCount = records.filter((record) => paymentTransferStatus(record.payment) === "파일생성").length;
  const totalAmount = records
    .filter((record) => record.ready)
    .reduce((sum, record) => sum + record.amount, 0);
  const periodText =
    transferDateFilter.startDate || transferDateFilter.endDate
      ? `${transferDateFilter.startDate || "처음"} ~ ${transferDateFilter.endDate || "오늘"}`
      : "전체 기간";

  return `
    <section class="transfer-workspace">
      <article class="panel transfer-panel">
        <div class="transfer-title-row">
          <div>
            <h2>이체자료조회</h2>
          </div>
          <div class="transfer-stepper" aria-label="이체 처리 단계">
            <span>STEP1 승인검토</span>
            <span class="active">STEP2 이체자료조회</span>
            <span>STEP3 이체파일생성</span>
            <span>STEP4 송금완료확인</span>
          </div>
        </div>
        <div class="notice">파일 생성은 실제 송금이 아닙니다. 은행에서 이체 결과를 확인한 뒤 송금완료로 처리하세요. 사업소득 건은 아마란스 신고도 별도로 확인해 주세요.</div>

        <div class="transfer-filter-bar">
          <label>시작일<input type="date" data-transfer-start value="${escapeAttr(transferDateFilter.startDate)}" /></label>
          <label>종료일<input type="date" data-transfer-end value="${escapeAttr(transferDateFilter.endDate)}" /></label>
          <label>검색어<input data-transfer-keyword value="${escapeAttr(transferDateFilter.keyword)}" placeholder="매장, 업체, 항목, 계좌" autocomplete="off" /></label>
          <label>계좌상태
            <select data-transfer-ready-status>
              <option value="all" ${selectAttr("all", transferDateFilter.readyStatus)}>전체</option>
              <option value="ready" ${selectAttr("ready", transferDateFilter.readyStatus)}>계좌확인</option>
              <option value="missing" ${selectAttr("missing", transferDateFilter.readyStatus)}>확인필요</option>
            </select>
          </label>
          <button class="primary" data-transfer-filter>조회</button>
          <button data-transfer-clear>전체</button>
        </div>

        <div class="transfer-status-strip">
          <div><span>조회기간</span><strong>${periodText}</strong></div>
          <div><span>미송금 승인</span><strong>${allRecords.length}건</strong></div>
          <div><span>조회 결과</span><strong>${records.length}건</strong></div>
          <div><span>계좌 확인</span><strong>${readyCount}건</strong></div>
          <div><span>확인 필요</span><strong>${missingCount}건</strong></div>
          <div><span>파일 생성</span><strong>${exportedCount}건</strong></div>
          <div><span>송금완료 제외</span><strong>${completedTransferCount}건</strong></div>
        </div>

        <div class="bulk-actions transfer-actions-row">
          <label class="check-control">
            <input type="checkbox" data-select-transfer-payments />
            조회 결과 전체 선택
          </label>
          <button class="primary" data-bank-transfer-download>선택 이체 파일 다운로드</button>
          <button data-bank-transfer-download="range">조회 결과 전체 다운로드</button>
          <button data-transfer-complete-selected>선택 송금완료 처리</button>
        </div>

        <div class="table-wrap transfer-table-wrap">
          <table class="transfer-table">
            <thead>
              <tr>
                <th>선택</th>
                <th>신청일</th>
                <th>매장</th>
                <th>업체</th>
                <th>항목</th>
                <th>은행</th>
                <th>계좌번호</th>
                <th>예금주</th>
                <th>입금액</th>
                <th>파일생성일</th>
                <th>송금일</th>
                <th>상태</th>
              </tr>
            </thead>
            <tbody>${bankTransferRows(records, true)}</tbody>
            <tfoot>
              <tr>
                <td colspan="8">합계</td>
                <td class="money">${formatKRW(totalAmount)}</td>
                <td colspan="3">${readyCount}건 가능</td>
              </tr>
            </tfoot>
          </table>
        </div>
      </article>
    </section>
  `;
}

function attachmentView(data) {
  const paymentFileCount = data.payments.reduce((sum, payment) => {
    const files = payment.attachment_files || {};
    return sum + (files.estimate_files || []).length + (files.tax_invoice_files || []).length + (files.id_card_files || []).length;
  }, 0);
  const vendorFileCount = data.vendors.reduce((sum, vendor) => {
    const files = vendor.attachment_files || {};
    return sum + (files.business_license_files || []).length + (files.bankbook_files || []).length;
  }, 0);
  const constructionFileCount = data.constructionStarts.reduce((sum, item) => {
    return sum + (item.drawing_files || []).length + (item.base_photo_files || []).length;
  }, 0);

  return `
    <section class="grid">
      <article class="panel">
        <div class="panel-head">
          <h2>첨부 파일 보기</h2>
          <div class="row-actions">
            <button>결제 ${paymentFileCount}개</button>
            <button>업체 ${vendorFileCount}개</button>
            <button>공사 ${constructionFileCount}개</button>
          </div>
        </div>
        <div class="notice">결제 신청 증빙, 업체 계좌 서류, 공사 시작 도면/기초사진을 한 화면에서 확인합니다. 파일명을 누르면 새 창으로 열립니다.</div>
        ${workspaceSearchForm("매장, 업체, 파일명, 파일 종류")}
        ${table(["구분", "대상", "파일 종류", "파일명", "크기", "등록일", "보기"], attachmentRows(data))}
      </article>
    </section>
  `;
}

function constructionStartView(data) {
  return `
    <section class="grid two">
      ${constructionStartForm()}
      <article class="panel">
        <div class="panel-head">
          <h2>공사 시작 접수 목록</h2>
          <button>${data.constructionStarts.length}건 접수</button>
        </div>
        ${workspaceSearchForm("매장명, 특이사항 검색")}
        ${table(["매장", "평수", "벽장/상부장", "벽장/하부장", "진열장/유리장", "카운터/서랍형 1200", "카운터/선반형 1800", "카운터/선반형 1600", "테이블", "광고판", "도면", "기초 사진", "특이사항"], constructionStartRows(data))}
      </article>
    </section>
  `;
}

function furnitureAverage(item) {
  if (item.quantity && item.madeAmount) return Math.round(item.madeAmount / item.quantity);
  return item.allocationUnit || item.baseUnit || 0;
}

function furnitureGroupUnit(group) {
  const items = furnitureCostItems.filter((item) => item.group === group);
  const total = items.reduce((sum, item) => sum + furnitureAverage(item), 0);
  if (group === "카운터") return Math.round(total / Math.max(items.length, 1));
  return total;
}

function furnitureCostRows() {
  return furnitureCostItems.map(
    (item) => `
      <tr>
        <td>${item.group}</td>
        <td>${item.name}</td>
        <td class="money">${formatKRW(item.baseUnit)}</td>
        <td class="money">${formatKRW(item.allocationUnit)}</td>
        <td>${item.quantity || "-"}</td>
        <td class="money">${formatKRW(item.madeAmount)}</td>
        <td class="money">${formatKRW(furnitureAverage(item))}</td>
      </tr>`
  );
}

function furnitureAllocationRows(data) {
  return data.constructionStarts.map((item) => {
    const upperCount = numberValue(item.wall_upper_count ?? item.wall_cabinet_count);
    const lowerCount = numberValue(item.wall_lower_count);
    const displayCount = numberValue(item.display_fixture_count ?? item.fixture_count);
    const counterDrawer1200Count = numberValue(item.counter_drawer_1200_count ?? item.counter_count);
    const counterShelf1800Count = numberValue(item.counter_shelf_1800_count);
    const counterShelf1600Count = numberValue(item.counter_shelf_1600_count);
    const tableCount = numberValue(item.table_count);
    const total = fixtureCostForStore(data, item.store_name);

    return `
      <tr>
        <td>${safeText(item.store_name)}</td>
        <td>${upperCount}</td>
        <td>${lowerCount}</td>
        <td>${displayCount}</td>
        <td>${counterDrawer1200Count}</td>
        <td>${counterShelf1800Count}</td>
        <td>${counterShelf1600Count}</td>
        <td>${tableCount}</td>
        <td class="money">${formatKRW(total)}</td>
      </tr>`;
  });
}

function furnitureAllocationView(data) {
  return `
    <section class="grid two">
      <article class="panel">
        <div class="panel-head">
          <h2>진열장 원가 기준</h2>
          <button>엑셀 반영</button>
        </div>
        <div class="notice">아름가구 산출금액과 휴가기간 가구 산출금액을 기준으로 먼저 원가 기준표를 만들었습니다. 실제 견적서에는 공사 시작 접수의 벽장/진열장/카운터 수량을 곱해 반영합니다.</div>
        ${table(["구분", "항목", "아름가구 기준", "휴가기간 단가", "제작수량", "제작금액", "평균 단가"], furnitureCostRows())}
      </article>
      <article class="panel">
        <div class="panel-head">
          <h2>매장별 예상 배분</h2>
          <button>${data.constructionStarts.length}개 매장</button>
        </div>
        ${table(["매장", "벽장/상부장", "벽장/하부장", "진열장/유리장", "카운터/서랍형 1200", "카운터/선반형 1800", "카운터/선반형 1600", "테이블", "예상 반영 금액"], furnitureAllocationRows(data))}
      </article>
    </section>
  `;
}

function vendorsView(data) {
  return `
    <section class="grid two">
      ${vendorForm()}
      <article class="panel">
        <div class="panel-head">
          <h2>결제 계좌 목록</h2>
          <button>${data.vendors.length}개 등록</button>
        </div>
        ${workspaceSearchForm("업체명, 분류, 은행 검색")}
        ${table(["업체", "분류", "은행", "계좌번호", "예금주", "첨부", "상태", "수정"], vendorRows({ ...data, vendors: data.vendors.filter((v) => matchesSearch(`${v.name} ${v.category} ${v.bank}`, workspaceSearch)) }))}
      </article>
    </section>
  `;
}

function storesView(data) {
  const activeStores = managedStoreNamesByStatus(data, storeManagementFilter);
  const progressCount = managedStoreNamesByStatus(data, "진행중").length;
  const completedCount = managedStoreNamesByStatus(data, "완료").length;

  return `
    <section class="grid">
      <article class="panel"><div class="panel-head"><h2>전체 매장 장부</h2><span>${data.stores.length}개 매장</span></div>${workspaceSearchForm("매장명, 지역 검색")}${table(["매장", "지역", "면적", "등록 예산", "기존 장부 사용액", "공사 상태"], data.stores.filter((s) => matchesSearch(`${s.name} ${s.region || ""}`, workspaceSearch)).map((s) => `<tr><td><strong>${safeText(s.name)}</strong></td><td>${safeText(s.region)}</td><td>${safeText(s.area)}평</td><td class="money">${formatKRW(s.budget)}</td><td class="money">${formatKRW(s.spent)}</td><td><span class="badge ${statusClass(s.status)}">${safeText(s.status)}</span></td></tr>`))}<p class="panel-footnote">기존 장부 사용액은 결제 신청 데이터에 합산하지 않습니다.</p></article>
      <article class="panel">
        <div class="panel-head">
          <h2>매장별 정산 및 문서 마감</h2>
          <button>${activeStores.length}개 매장</button>
        </div>
        <div class="segmented-tabs">
          <button class="${storeManagementFilter === "진행중" ? "active" : ""}" data-store-management-filter="진행중">진행중 ${progressCount}건</button>
          <button class="${storeManagementFilter === "완료" ? "active" : ""}" data-store-management-filter="완료">완료 매장 ${completedCount}건</button>
        </div>
        <div class="notice">승인된 결제건과 진열장 원가 배분 금액을 합산한 뒤, 매장별 마진율을 적용해 최종 견적금액을 확정합니다. 확정 금액은 견적서와 계약서 작성 기준으로 사용합니다.</div>
        ${table(["매장", "상태", "승인 원가", "진열장 배분", "원가 합계", "마진율(%)", "공급가", "부가세", "최종 견적금액", "처리"], storeManagementRows(data, storeManagementFilter))}
      </article>
      <details class="panel"><summary>새 매장 등록</summary>${storeForm()}</details>
    </section>
  `;
}

function documentStoreOptions(data) {
  return documentManagedStoreNames(data)
    .map((storeName) => `<option value="${escapeAttr(storeName)}" ${storeName === selectedDocumentStore ? "selected" : ""}>${escapeAttr(storeName)}</option>`)
    .join("");
}

function quoteDocumentRows(lines) {
  return lines.map(
    (line, index) => `
      <tr>
        <td>${index + 1}</td>
        <td>${safeText(line.name)}</td>
        <td class="money">${formatKRW(line.cost)}</td>
        <td class="money">${formatKRW(line.supply)}</td>
        <td class="money">${formatKRW(line.vat)}</td>
        <td class="money">${formatKRW(line.total)}</td>
      </tr>`
  );
}

function documentView(data, type) {
  const storeNames = documentManagedStoreNames(data);
  const storeName = selectedDocumentStore || storeNames[0] || "";
  selectedDocumentStore = storeName;
  const quote = quoteForStore(data, storeName);
  const marginRate = quote.margin_rate ?? 35;
  const amounts = quoteAmounts(data, storeName, marginRate);
  const lines = documentLineItems(data, storeName, marginRate);
  const start = constructionStartForStore(data, storeName);
  const isContract = type === "계약서 생성";
  const safeStoreName = safeText(storeName);

  if (!storeName) {
    return `<section class="panel empty-panel"><h2>${safeText(type)}</h2><p>문서를 만들 매장 데이터가 아직 없습니다.</p></section>`;
  }

  return `
    <section class="grid">
      <article class="panel">
        <div class="panel-head">
          <h2>${safeText(type)}</h2>
          <div class="row-actions">
            <select data-document-store-select>${documentStoreOptions(data)}</select>
            <button data-print-document>인쇄</button>
          </div>
        </div>
        <div class="notice">매장별 공사관리에서 저장한 마진율과 승인 완료된 결제 원가를 기준으로 작성됩니다.</div>
        <section class="document-preview">
          <div class="document-title">
            <span>HAKA Construction</span>
            <h1>${isContract ? "공사 계약서" : "공사 견적서"}</h1>
            <p>${today()}</p>
          </div>
          <div class="document-meta">
            <div><span>매장명</span><strong>${safeStoreName}</strong></div>
            <div><span>평수</span><strong>${start.area ? `${safeText(start.area)}평` : "-"}</strong></div>
            <div><span>상태</span><strong>${safeText(quote.quote_status, "정산중")}</strong></div>
            <div><span>마진율</span><strong>${safeText(marginRate)}%</strong></div>
          </div>
          ${
            isContract
              ? `<div class="contract-body">
                  <p>본 계약은 ${safeStoreName} 공사와 관련하여 승인된 결제 원가와 진열장 원가 배분 내역을 기준으로 산정한 최종 공사금액을 계약 기준으로 한다.</p>
                  <p>최종 계약금액은 부가세 포함 ${formatKRW(amounts.totalAmount)}이며, 세부 산출 내역은 아래 견적 기준표를 따른다.</p>
                </div>`
              : ""
          }
          ${table(["No", "항목", "원가", "마진 반영 공급가", "부가세", "합계"], quoteDocumentRows(lines))}
          <div class="document-total">
            <span>원가 합계 ${formatKRW(amounts.costTotal)}</span>
            <span>공급가 ${formatKRW(amounts.supplyAmount)}</span>
            <span>부가세 ${formatKRW(amounts.vatAmount)}</span>
            <strong>최종 금액 ${formatKRW(amounts.totalAmount)}</strong>
          </div>
          <div class="signature-grid">
            <div><span>발주자</span><strong>하카코리아</strong></div>
            <div><span>시공/관리</span><strong>HAKA Construction</strong></div>
          </div>
        </section>
      </article>
    </section>
  `;
}

function userRoleRows(data) {
  return data.userRoles.map(
    (user) => `
      <tr>
        <td>${safeText(user.email)}</td>
        <td><span class="badge ${user.role === "admin" ? "green" : "blue"}">${safeText(roleLabels[user.role] || user.role)}</span></td>
        <td>${safeText(user.created_at ? String(user.created_at).slice(0, 10) : "-")}</td>
      </tr>`
  );
}

function roleMenuRows() {
  return Object.entries(roleMenus).map(
    ([role, menus]) => `
      <tr>
        <td><strong>${safeText(role)}</strong></td>
        <td>${menus.map((menu) => `<span class="menu-chip">${safeText(menu)}</span>`).join("")}</td>
        <td>${menus.length}개</td>
      </tr>`
  );
}

function adminSettingsView(data) {
  return `
    <section class="metrics-grid"><article class="metric-card"><span>조회된 결제</span><strong>${data.payments.length}건</strong><small>모든 페이지를 조회한 결과</small></article><article class="metric-card"><span>등록 매장</span><strong>${data.stores.length}개</strong><small>기존 장부 포함</small></article><article class="metric-card"><span>공사 원가 품목</span><strong>${(data.costParts || []).length}건</strong><small>기존 장부를 별도 유지</small></article><article class="metric-card"><span>사용자</span><strong>${data.userRoles.length}명</strong><small>현재 권한 유지</small></article></section>
    <section class="grid two">
      <article class="panel">
        <div class="panel-head">
          <h2>사용자 권한</h2>
          <button>${data.userRoles.length}명 등록</button>
        </div>
        ${table(["이메일", "권한", "등록일"], userRoleRows(data))}
      </article>
      <article class="panel">
        <div class="panel-head">
          <h2>권한별 메뉴</h2>
          <button>${Object.keys(roleMenus).length}개 권한</button>
        </div>
        ${table(["권한", "볼 수 있는 메뉴", "메뉴 수"], roleMenuRows())}
      </article>
    </section>
  `;
}

function placeholderView(view) {
  const checks = viewDescriptions[view] || ["기능 범위 정의", "입력 항목 확정", "데이터 연결"];
  return `
    <section class="panel empty-panel">
      <h2>${safeText(view)}</h2>
      <p>이 메뉴는 다음 단계에서 구현할 기능입니다. 지금은 확인해야 할 항목을 먼저 고정해둔 상태입니다.</p>
      <div class="check-list">
        ${checks.map((item) => `<span>${safeText(item)}</span>`).join("")}
      </div>
    </section>
  `;
}

function activeContent(data) {
  if (activeView === "대시보드") return dashboardView(data);
  if (activeView === "공사비 집계") return costReport(data, reportFilters);
  if (activeView === "엑셀 업로드") return importPanel(importRows);
  if (activeView === "공사 시작 접수") return constructionStartView(data);
  if (activeView === "결제 신청") return paymentView(data);
  if (activeView === "결제 계좌 관리" || activeView === "업체/계좌 관리") return vendorsView(data);
  if (activeView === "첨부 파일 보기") return attachmentView(data);
  if (activeView === "매장별 공사 관리") return storesView(data);
  if (activeView === "진열장 원가 배분") return furnitureAllocationView(data);
  if (activeView === "견적서 생성") return documentView(data, "견적서 생성");
  if (activeView === "계약서 생성") return documentView(data, "계약서 생성");
  if (activeView === "은행 이체 파일 생성") return bankTransferView(data);
  if (activeView === "관리자 설정") return adminSettingsView(data);
  return placeholderView(activeView);
}

function visibleNav() {
  return roleMenus[activeRole] || nav;
}

function roleControl() {
  return `
    <div class="session-box">
      <span>${safeText(currentUser?.email, "")}</span>
      <strong>${safeText(activeRole)}</strong>
      <button data-sign-out>로그아웃</button>
    </div>
  `;
}

function renderLogin(message = "") {
  const app = document.querySelector("#app");
  app.className = "auth-shell";
  app.innerHTML = `
    <main class="auth-page">
      <section class="auth-panel">
        <div class="brand auth-brand">
          <span class="brand-mark">H</span>
          <div>
            <strong>HAKA Construction</strong>
            <small>공사비 관리 시스템</small>
          </div>
        </div>
        <h1>로그인</h1>
        <p>권한이 있는 사용자만 공사비 데이터를 볼 수 있습니다.</p>
        ${message ? `<div class="form-message ${message.includes("실패") ? "error" : "warning"}" role="status">${escapeAttr(message)}</div>` : ""}
        <form id="auth-form">
          <label>이메일<input name="email" type="email" autocomplete="email" /></label>
          <label>비밀번호<input name="password" type="password" autocomplete="current-password" /></label>
          <button class="primary wide" type="submit" data-auth-action="login">로그인</button>
          <button class="wide" type="button" data-auth-action="signup">계정 만들기</button>
          <button class="wide" type="button" data-auth-action="resend">인증메일 다시 받기</button>
        </form>
      </section>
    </main>
  `;

  const runAuth = (handler) => async (event) => {
    event.preventDefault();
    const buttons = [...document.querySelectorAll("#auth-form button")];
    buttons.forEach((button) => { button.disabled = true; });
    try { await handler(event); }
    catch (error) { renderLogin(`처리 실패: ${error.message || "서버 연결을 확인해 주세요."}`); }
    finally { buttons.forEach((button) => { button.disabled = false; }); }
  };
  document.querySelector("#auth-form").addEventListener("submit", runAuth(handleLogin));
  document.querySelector("[data-auth-action='signup']").addEventListener("click", runAuth(handleSignup));
  document.querySelector("[data-auth-action='resend']").addEventListener("click", runAuth(handleResendVerification));
}

async function handleLogin(event) {
  event.preventDefault();
  const formData = new FormData(event.currentTarget);
  const email = String(formData.get("email") || "").trim();
  const password = String(formData.get("password") || "");

  if (!email || !password) {
    renderLogin("이메일과 비밀번호를 입력해 주세요.");
    return;
  }

  const { data, error } = await withTimeout(supabase.auth.signInWithPassword({ email, password }), "로그인 연결 시간이 초과됐습니다. 잠시 후 다시 시도해 주세요.");
  if (error) {
    renderLogin(`로그인 실패: ${error.message}`);
    return;
  }

  currentUser = data.user;
  activeRole = await withTimeout(loadUserRole(currentUser), "권한 조회 시간이 초과됐습니다.");
  activeView = visibleNav()[0];
  await refreshDataAndRender();
}

async function handleSignup() {
  const form = document.querySelector("#auth-form");
  const formData = new FormData(form);
  const email = String(formData.get("email") || "").trim();
  const password = String(formData.get("password") || "");

  if (!email || !password) {
    renderLogin("계정을 만들 이메일과 비밀번호를 입력해 주세요.");
    return;
  }

  const { error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      emailRedirectTo: window.location.origin + window.location.pathname
    }
  });
  if (error) {
    renderLogin(`회원가입 실패: ${error.message}`);
    return;
  }

  renderLogin("계정이 생성됐습니다. 이메일 확인이 필요한 경우 메일 인증 후 로그인해 주세요.");
}

async function handleResendVerification() {
  const form = document.querySelector("#auth-form");
  const formData = new FormData(form);
  const email = String(formData.get("email") || "").trim();

  if (!email) {
    renderLogin("인증메일을 다시 받을 이메일을 입력해 주세요.");
    return;
  }

  const { error } = await supabase.auth.resend({
    type: "signup",
    email,
    options: {
      emailRedirectTo: window.location.origin + window.location.pathname
    }
  });

  if (error) {
    renderLogin(`인증메일 재발송 실패: ${error.message}`);
    return;
  }

  renderLogin("인증메일을 다시 보냈습니다. 새로 받은 메일의 링크를 눌러 주세요.");
}

async function signOut() {
  if (LOCAL_PREVIEW_MODE) { render("샘플 미리보기에는 로그인 세션이 없습니다."); return; }
  await supabase.auth.signOut();
  currentUser = null;
  activeRole = "인테리어 공사실장";
  renderLogin("로그아웃되었습니다.");
}

function render(notice = "") {
  const app = document.querySelector("#app");
  app.className = activeView === "은행 이체 파일 생성" ? "transfer-app" : "";
  if (!visibleNav().includes(activeView)) {
    activeView = visibleNav()[0];
  }
  app.innerHTML = `
    <aside class="sidebar">
      <div class="brand">
        <span class="brand-mark">H</span>
        <div>
          <strong>HAKA Construction</strong>
          <small>공사비 관리 시스템</small>
        </div>
      </div>
      <nav aria-label="업무 메뉴">
        ${visibleNav()
          .map(
            (item, index) => `${index === 0 ? '<span class="nav-heading">WORKSPACE</span>' : item === "진열장 원가 배분" ? '<span class="nav-heading">COST & DOCUMENTS</span>' : item === "관리자 설정" ? '<span class="nav-heading">MANAGEMENT</span>' : ""}<button data-view="${item}" class="${item === activeView ? "active" : ""}" ${item === activeView ? 'aria-current="page"' : ""}><span class="nav-icon">${navigationIcon(item)}</span><span>${item}</span>${item === "결제 신청" ? `<small>${currentData.payments.filter((p) => p.status === "신청").length}</small>` : ""}</button>`
          )
          .join("")}
      </nav>
      <div class="sidebar-bottom"><span class="live-dot"></span> HAKA Construction <small>공사비 관리 워크스페이스</small><button class="mobile-signout" data-mobile-signout>로그아웃</button></div>
    </aside>
    <main class="shell ${activeView === "은행 이체 파일 생성" ? "transfer-shell" : ""}">
      <header class="topbar">
        <button class="menu-toggle" data-menu-toggle aria-label="업무 메뉴 열기" aria-expanded="false">☰</button>
        <div>
          <p>WORKSPACE / ${activeRole}</p>
          <h1>${safeText(activeView)}</h1>
        </div>
        <div class="actions">
          ${roleControl()}
          ${
            visibleNav().includes("엑셀 업로드")
              ? `<button data-view-link="엑셀 업로드">엑셀 업로드</button>`
              : ""
          }
          ${
            visibleNav().includes("결제 신청")
              ? `<button class="primary" data-view-link="결제 신청">결제 신청</button>`
              : ""
          }
        </div>
      </header>

      <div class="workspace-meta"><span><i class="live-dot"></i>${LOCAL_PREVIEW_MODE ? "샘플 데이터 미리보기 · 운영 DB 연결 없음" : "운영 데이터"} · ${lastLoadedAt ? lastLoadedAt.toLocaleTimeString("ko-KR", { timeZone: "Asia/Seoul", hour: "2-digit", minute: "2-digit" }) : ""} 조회</span><div>${LOCAL_PREVIEW_MODE ? `<button data-preview-role="전체 관리자">관리자 보기</button><button data-preview-role="인테리어 공사실장">현장 보기</button>` : ""}<button data-refresh>새로고침 ↻</button></div></div>

      ${notice ? `<div class="toast" role="status">${escapeAttr(notice)}</div>` : ""}
      ${activeRole === "전체 관리자" ? incomeReminder(currentData) : ""}
      ${
        dataLoadWarnings.length
          ? `<div class="data-alert">
              <strong>일부 데이터 확인 필요</strong>
              <span>${dataLoadWarnings.map((item) => escapeAttr(item)).join(" / ")}</span>
            </div>`
          : ""
      }
      ${activeContent(currentData)}
    </main>
  `;

  document.querySelectorAll("[data-view]").forEach((button) => {
    button.addEventListener("click", () => {
      navigateTo(button.dataset.view);
    });
  });

  document.querySelectorAll("[data-role]").forEach((button) => {
    button.addEventListener("click", () => {
      activeRole = button.dataset.role;
      if (!visibleNav().includes(activeView)) {
        activeView = visibleNav()[0];
      }
      render();
    });
  });

  document.querySelector("[data-sign-out]")?.addEventListener("click", signOut);
  document.querySelector("[data-mobile-signout]")?.addEventListener("click", signOut);

  document.querySelectorAll("[data-view-link]").forEach((button) => {
    button.addEventListener("click", () => {
      navigateTo(button.dataset.viewLink);
    });
  });

  const paymentFormElement = document.querySelector("#payment-form");
  if (paymentFormElement) {
    paymentFormElement.addEventListener("submit", submitPayment);
    paymentFormElement.querySelector("[name='vendor']")?.addEventListener("input", () => syncPaymentVendorAccount(paymentFormElement));
    paymentFormElement.querySelector("[name='vendor']")?.addEventListener("change", () => syncPaymentVendorAccount(paymentFormElement));
    paymentFormElement.querySelector("[name='estimate_total']")?.addEventListener("input", () => syncPaymentAmount(paymentFormElement));
    paymentFormElement.querySelector("[name='payment_type']")?.addEventListener("change", () => syncPaymentAmount(paymentFormElement));
    paymentFormElement.querySelector("[name='amount']")?.addEventListener("input", () => syncTaxPreview(paymentFormElement));
    paymentFormElement.querySelector("[name='tax_type']")?.addEventListener("change", () => syncTaxPreview(paymentFormElement));
    syncTaxPreview(paymentFormElement);
  }

  const vendorFormElement = document.querySelector("#vendor-form");
  if (vendorFormElement) vendorFormElement.addEventListener("submit", submitVendor);

  document.querySelectorAll("[data-vendor-edit]").forEach((button) => {
    button.addEventListener("click", () => fillVendorForm(Number(button.dataset.vendorEdit)));
  });

  const storeFormElement = document.querySelector("#store-form");
  if (storeFormElement) storeFormElement.addEventListener("submit", submitStore);

  const constructionStartFormElement = document.querySelector("#construction-start-form");
  if (constructionStartFormElement) constructionStartFormElement.addEventListener("submit", submitConstructionStart);

  document.querySelector("[data-transfer-filter]")?.addEventListener("click", (event) => {
    const panel = event.currentTarget.closest(".transfer-panel") || event.currentTarget.closest(".panel") || document;
    transferDateFilter = {
      startDate: panel.querySelector("[data-transfer-start]")?.value || "",
      endDate: panel.querySelector("[data-transfer-end]")?.value || "",
      keyword: panel.querySelector("[data-transfer-keyword]")?.value || "",
      readyStatus: panel.querySelector("[data-transfer-ready-status]")?.value || "all"
    };
    render();
  });

  document.querySelector("[data-transfer-clear]")?.addEventListener("click", () => {
    transferDateFilter = { startDate: "", endDate: "", keyword: "", readyStatus: "all" };
    render();
  });

  document.querySelectorAll("[data-bank-transfer-download]").forEach((button) => {
    button.addEventListener("click", async () => {
      const useRange = button.dataset.bankTransferDownload === "range";
      const panel = button.closest(".transfer-panel") || button.closest(".panel") || document;
      const selectedTransferIds = [...document.querySelectorAll(".transfer-select:checked:not(:disabled)")].map((checkbox) => checkbox.value);
      const rangeDates = {
        startDate: panel.querySelector("[data-transfer-start]")?.value || "",
        endDate: panel.querySelector("[data-transfer-end]")?.value || "",
        keyword: panel.querySelector("[data-transfer-keyword]")?.value || "",
        readyStatus: panel.querySelector("[data-transfer-ready-status]")?.value || "all"
      };
      if (useRange && (!rangeDates.startDate || !rangeDates.endDate)) {
        render("조회 결과 전체 다운로드는 시작일과 종료일을 모두 선택한 뒤 사용할 수 있습니다.");
        return;
      }
      if (!useRange && !selectedTransferIds.length) {
        render("이체 파일로 만들 결제건을 먼저 체크해 주세요. 전체 승인건 자동 다운로드는 막아두었습니다.");
        return;
      }
      await downloadBankTransferFile(
        currentData,
        {
          ...(useRange ? rangeDates : {}),
          ...(!useRange && selectedTransferIds.length ? { selectedIds: selectedTransferIds } : {})
        }
      );
    });
  });

  document.querySelector("[data-select-pending-payments]")?.addEventListener("change", (event) => {
    document.querySelectorAll(".payment-select").forEach((checkbox) => {
      checkbox.checked = event.currentTarget.checked;
    });
  });

  document.querySelectorAll(".payment-select").forEach((checkbox) => {
    checkbox.addEventListener("click", (event) => event.stopPropagation());
  });

  document.querySelector("[data-select-transfer-payments]")?.addEventListener("change", (event) => {
    document.querySelectorAll(".transfer-select:not(:disabled)").forEach((checkbox) => {
      checkbox.checked = event.currentTarget.checked;
    });
  });

  document.querySelectorAll(".transfer-select").forEach((checkbox) => {
    checkbox.addEventListener("click", (event) => event.stopPropagation());
  });

  document.querySelector("[data-transfer-complete-selected]")?.addEventListener("click", () => {
    const paymentIds = [...document.querySelectorAll(".transfer-select:checked:not(:disabled)")].map((checkbox) => checkbox.value);
    markSelectedTransfersCompleted(paymentIds);
  });

  document.querySelector("[data-approve-selected-payments]")?.addEventListener("click", () => {
    const paymentIds = [...document.querySelectorAll(".payment-select:checked")].map((checkbox) => checkbox.value);
    approveSelectedPayments(paymentIds);
  });

  document.querySelectorAll("[data-quote-finalize]").forEach((button) => {
    button.addEventListener("click", () => saveStoreQuote(button.dataset.quoteFinalize, "견적 확정"));
  });

  document.querySelectorAll("[data-contract-complete]").forEach((button) => {
    button.addEventListener("click", () => saveStoreQuote(button.dataset.contractComplete, "계약 완료"));
  });

  document.querySelectorAll("[data-store-management-filter]").forEach((button) => {
    button.addEventListener("click", () => {
      storeManagementFilter = button.dataset.storeManagementFilter;
      render();
    });
  });

  document.querySelectorAll("[data-document-view][data-document-store]").forEach((button) => {
    button.addEventListener("click", () => {
      selectedDocumentStore = button.dataset.documentStore;
      activeView = button.dataset.documentView;
      render();
    });
  });

  document.querySelector("[data-document-store-select]")?.addEventListener("change", (event) => {
    selectedDocumentStore = event.currentTarget.value;
    render();
  });

  document.querySelector("[data-print-document]")?.addEventListener("click", () => window.print());

  document.querySelectorAll("[data-payment-edit]").forEach((button) => {
    button.addEventListener("click", () => {
      editingPaymentId = Number(button.dataset.paymentEdit);
      activeView = "결제 신청";
      render("선택한 결제 신청을 수정 중입니다.");
    });
  });

  document.querySelector("[data-payment-edit-cancel]")?.addEventListener("click", () => {
    editingPaymentId = null;
    render("수정 모드를 종료했습니다.");
  });

  document.querySelectorAll("[data-payment-id][data-payment-status]").forEach((button) => {
    button.addEventListener("click", () => {
      const status = button.dataset.paymentStatus;
      if (status === "반려" && !window.confirm("이 결제 신청을 취소 처리할까요? 기록은 반려 상태로 남습니다.")) return;
      updatePaymentStatus(Number(button.dataset.paymentId), status);
    });
  });
  document.querySelectorAll("[data-preview-role]").forEach((button) => button.addEventListener("click", () => {
    if (!LOCAL_PREVIEW_MODE || !canLeaveForm()) return;
    activeRole = button.dataset.previewRole; activeView = visibleNav()[0]; render();
  }));
  bindWorkspaceEvents();
}

function navigationIcon(view) {
  const paths = {
    "대시보드": "M3 3h7v7H3z M14 3h7v7h-7z M3 14h7v7H3z M14 14h7v7h-7z",
    "공사비 집계": "M4 20V10h4v10 M10 20V4h4v16 M16 20v-7h4v7",
    "결제 신청": "M5 3h14v18l-3-2-4 2-4-2-3 2z M8 8h8 M8 12h5",
    "은행 이체 파일 생성": "M3 7l9-4 9 4H3z M5 10v7 M12 10v7 M19 10v7 M3 21h18",
    "결제 계좌 관리": "M3 5h18v14H3z M3 10h18 M6 15h4",
    "엑셀 업로드": "M12 16V3 M7 8l5-5 5 5 M4 15v6h16v-6",
    "관리자 설정": "M12 8a4 4 0 1 0 0 8 4 4 0 1 0 0-8 M12 2v3 M12 19v3 M2 12h3 M19 12h3 M5 5l2 2 M17 17l2 2 M5 19l2-2 M17 7l2-2"
  };
  return `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="${paths[view] || 'M5 3h10l4 4v14H5z M14 3v5h5 M8 12h8 M8 16h6'}"/></svg>`;
}
