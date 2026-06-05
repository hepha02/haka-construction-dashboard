import { createClient } from "https://esm.sh/@supabase/supabase-js@2.49.1";

const SUPABASE_URL =
  import.meta.env.VITE_SUPABASE_URL || "https://yqemtsbdnypgmkuyncxh.supabase.co";
const SUPABASE_ANON_KEY =
  import.meta.env.VITE_SUPABASE_ANON_KEY ||
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlxZW10c2JkbnlwZ21rdXluY3hoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODAyNjYwMTUsImV4cCI6MjA5NTg0MjAxNX0.gwgdCncqRKKgC8ebj7qIdT-vA4J-wOVd2O9DSa7xEOs";

const supabase =
  SUPABASE_URL && SUPABASE_ANON_KEY
    ? createClient(SUPABASE_URL, SUPABASE_ANON_KEY)
    : null;
const CONSTRUCTION_FILE_BUCKET = "construction-start-files";
const PAYMENT_FILE_BUCKET = "payment-files";
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
  constructionStarts: []
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
  "엑셀 업로드",
  "공사 시작 접수",
  "결제 신청",
  "업체/계좌 관리",
  "매장별 공사 관리",
  "진열장 원가 배분",
  "견적서 생성",
  "계약서 생성",
  "은행 이체 파일 생성",
  "관리자 설정"
];

const roleMenus = {
  "전체 관리자": nav,
  "인테리어 공사실장": ["공사 시작 접수", "결제 신청", "업체/계좌 관리", "진열장 원가 배분"]
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
  "관리자 설정": ["사용자 권한", "승인 단계", "상태/분류 코드 관리"]
};

let currentData = fallback;
let activeView = "대시보드";
let activeRole = "인테리어 공사실장";
let currentUser = null;

const formatKRW = (value) =>
  new Intl.NumberFormat("ko-KR", {
    style: "currency",
    currency: "KRW",
    maximumFractionDigits: 0
  }).format(value || 0);

const today = () => new Date().toISOString().slice(0, 10);
const parseAmount = (value) => Number(String(value).replace(/[^\d]/g, ""));
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
  String(value || "")
    .replace(/&/g, "&amp;")
    .replace(/"/g, "&quot;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
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
    증빙확인: "amber"
  };
  return map[status] || "gray";
};

async function loadData() {
  if (!supabase) return fallback;

  const [payments, stores, vendors, constructionStarts, userRoles, paymentItems] = await Promise.all([
    supabase.from("payments").select("*").order("requested_at", { ascending: false }).order("id", { ascending: false }).limit(500),
    supabase.from("stores").select("*").order("id", { ascending: true }),
    supabase.from("vendors").select("*").order("id", { ascending: true }),
    supabase.from("construction_starts").select("*").order("created_at", { ascending: false }).order("id", { ascending: false }).limit(30),
    supabase.from("user_roles").select("email, role, created_at").order("email", { ascending: true }),
    supabase.from("construction_cost_parts").select("part_name").order("part_name", { ascending: true })
  ]);
  const uniquePaymentItems = paymentItems.error
    ? fallback.paymentItems
    : [...new Set([...basePaymentItems, ...paymentItems.data.map((item) => item.part_name).filter(Boolean)])];

  return {
    payments: payments.error ? fallback.payments : payments.data,
    stores: stores.error ? fallback.stores : stores.data,
    vendors: vendors.error ? fallback.vendors : vendors.data,
    constructionStarts: constructionStarts.error ? fallback.constructionStarts : constructionStarts.data,
    userRoles: userRoles.error ? fallback.userRoles : userRoles.data,
    paymentItems: uniquePaymentItems
  };
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

async function startApp() {
  if (!supabase) {
    currentData = await loadData();
    activeRole = "전체 관리자";
    render();
    return;
  }

  const { data } = await supabase.auth.getSession();
  currentUser = data.session?.user || null;

  if (!currentUser) {
    renderLogin();
    return;
  }

  activeRole = await loadUserRole(currentUser);
  activeView = visibleNav()[0];
  currentData = await loadData();
  render();
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
      .upload(path, file, { contentType: file.type, upsert: false });

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

async function submitPayment(event) {
  event.preventDefault();

  const form = event.currentTarget;
  const submitButton = form.querySelector("button[type='submit']");
  const message = form.querySelector("[data-form-message]");
  const formData = new FormData(form);
  const store = String(formData.get("store") || "").trim();
  const vendor = String(formData.get("vendor") || "").trim();
  const paymentItem = String(formData.get("payment_item") || "").trim();
  const estimateTotal = parseAmount(formData.get("estimate_total"));
  const paymentType = String(formData.get("payment_type") || "일시 지급");
  const amount = parseAmount(formData.get("amount"));
  const taxType = String(formData.get("tax_type") || "일반 송금");
  const withholdingAmount = Math.round(amount * withholdingRate(taxType));
  const netAmount = amount - withholdingAmount;
  const memo = String(formData.get("memo") || "").trim();
  const duplicate = findDuplicateRisk(currentData, vendor, amount);
  const sameStoreItem = findSameStoreItemRisk(currentData, store, paymentItem);
  const estimateFiles = formData.getAll("estimate_files").filter((file) => file.size > 0);
  const taxInvoiceFiles = formData.getAll("tax_invoice_files").filter((file) => file.size > 0);
  const idCardFiles = formData.getAll("id_card_files").filter((file) => file.size > 0);

  if (!store || !vendor || !paymentItem || !estimateTotal || !amount) {
    message.textContent = "매장명, 업체, 결제 항목, 견적 총액, 신청 금액을 모두 입력해 주세요.";
    message.className = "form-message error";
    return;
  }

  if (taxType === "일반 송금" && (!estimateFiles.length || !taxInvoiceFiles.length)) {
    message.textContent = "일반 송금은 견적서와 세금계산서를 첨부해야 합니다.";
    message.className = "form-message error";
    return;
  }

  if (taxType === "사업소득 3.3%" && !idCardFiles.length) {
    message.textContent = "사업소득 3.3% 지급은 주민등록증 첨부가 필요합니다.";
    message.className = "form-message error";
    return;
  }

  submitButton.disabled = true;
  submitButton.textContent = "저장 중";
  message.textContent = "첨부 자료를 업로드하고 있습니다.";
  message.className = duplicate ? "form-message warning" : "form-message";

  let attachmentFiles = {};
  try {
    attachmentFiles = {
      estimate_files: await uploadPaymentFiles(estimateFiles, "estimates"),
      tax_invoice_files: await uploadPaymentFiles(taxInvoiceFiles, "tax-invoices"),
      id_card_files: await uploadPaymentFiles(idCardFiles, "id-cards")
    };
  } catch (error) {
    submitButton.disabled = false;
    submitButton.textContent = "검토 요청 생성";
    message.textContent = `첨부 업로드 실패: ${error.message}`;
    message.className = "form-message error";
    return;
  }

  message.textContent = duplicate
    ? `중복 의심: ${duplicate.store} / ${formatKRW(duplicate.amount)} 건과 비슷합니다.`
    : sameStoreItem
      ? `확인 필요: ${store} / ${paymentItem} 항목에 기존 신청이 있습니다. 중복이 아니면 견적서에는 같은 항목 합계로 반영됩니다.`
    : "신청 건을 저장하고 있습니다.";
  message.className = duplicate || sameStoreItem ? "form-message warning" : "form-message";

  const newPayment = {
    store,
    vendor,
    payment_item: paymentItem,
    estimate_total: estimateTotal,
    payment_type: paymentType,
    amount,
    tax_type: taxType,
    withholding_amount: withholdingAmount,
    net_amount: netAmount,
    attachment_files: attachmentFiles,
    estimate_group_mode: "매장별 항목 합산",
    estimate_group_key: `${store}::${paymentItem}`,
    memo,
    status: "신청",
    requested_at: today()
  };

  if (!supabase) {
    fallback.payments = [{ id: Date.now(), ...newPayment }, ...fallback.payments];
  } else {
    const { error } = await supabase.from("payments").insert(newPayment);
    if (error) {
      submitButton.disabled = false;
      submitButton.textContent = "검토 요청 생성";
      message.textContent = `저장 실패: ${error.message}`;
      message.className = "form-message error";
      return;
    }
  }

  form.reset();
  currentData = await loadData();
  render(duplicate ? "신청이 저장됐습니다. 중복 의심 건은 결제 검토에서 확인하세요." : "신청이 저장됐습니다.");
}

async function submitVendor(event) {
  event.preventDefault();

  const form = event.currentTarget;
  const submitButton = form.querySelector("button[type='submit']");
  const message = form.querySelector("[data-vendor-message]");
  const formData = new FormData(form);
  const vendor = {
    name: String(formData.get("name") || "").trim(),
    category: String(formData.get("category") || "").trim(),
    bank: String(formData.get("bank") || "").trim(),
    account_number: String(formData.get("account_number") || "").trim(),
    account_holder: String(formData.get("account_holder") || "").trim(),
    risk: "정상",
    total: 0
  };

  if (!vendor.name || !vendor.category || !vendor.bank || !vendor.account_number || !vendor.account_holder) {
    message.textContent = "업체명, 분류, 은행, 계좌번호, 예금주를 모두 입력해 주세요.";
    message.className = "form-message error";
    return;
  }

  submitButton.disabled = true;
  submitButton.textContent = "저장 중";
  message.textContent = "업체/계좌 정보를 저장하고 있습니다.";
  message.className = "form-message";

  if (!supabase) {
    fallback.vendors = [{ id: Date.now(), ...vendor }, ...fallback.vendors];
  } else {
    const { error } = await supabase.from("vendors").insert(vendor);
    if (error) {
      submitButton.disabled = false;
      submitButton.textContent = "업체 저장";
      message.textContent = `저장 실패: ${error.message}`;
      message.className = "form-message error";
      return;
    }
  }

  form.reset();
  currentData = await loadData();
  activeView = "업체/계좌 관리";
  render("업체/계좌 정보가 저장됐습니다.");
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
    fallback.stores = [{ id: Date.now(), ...store }, ...fallback.stores];
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
  currentData = await loadData();
  activeView = "매장별 공사 관리";
  render("매장 공사 정보가 저장됐습니다.");
}

async function submitConstructionStart(event) {
  event.preventDefault();

  const form = event.currentTarget;
  const submitButton = form.querySelector("button[type='submit']");
  const message = form.querySelector("[data-construction-start-message]");
  const formData = new FormData(form);
  const wallCabinetCount = numberValue(formData.get("wall_cabinet_count"));
  const displayFixtureCount = numberValue(formData.get("display_fixture_count"));
  const counterCount = numberValue(formData.get("counter_count"));
  const request = {
    store_name: String(formData.get("store_name") || "").trim(),
    area: Number(formData.get("area")),
    wall_cabinet_count: wallCabinetCount,
    display_fixture_count: displayFixtureCount,
    counter_count: counterCount,
    fixture_count: wallCabinetCount + displayFixtureCount + counterCount,
    table_count: Number(formData.get("table_count") || 0),
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
    fallback.constructionStarts = [{ id: Date.now(), created_at: new Date().toISOString(), ...request }, ...fallback.constructionStarts];
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
  currentData = await loadData();
  activeView = "공사 시작 접수";
  render("공사 시작 정보가 저장됐습니다. 결제 신청 매장 검색에도 반영됐습니다.");
}

async function updatePaymentStatus(paymentId, status) {
  if (!paymentId || !["승인", "반려"].includes(status)) return;

  if (!supabase) {
    fallback.payments = fallback.payments.map((payment) =>
      payment.id === paymentId ? { ...payment, status } : payment
    );
  } else {
    const { error } = await supabase
      .from("payments")
      .update({ status })
      .eq("id", paymentId)
      .eq("status", "신청");

    if (error) {
      render(`상태 변경 실패: ${error.message}`);
      return;
    }
  }

  currentData = await loadData();
  activeView = "결제 신청";
  render(`결제 신청이 ${status} 처리됐습니다.`);
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

function bankTransferRecord(data, payment) {
  const vendor = findVendor(data, payment);
  const holder = vendor.account_holder || payment.vendor;
  const amount = Number(payment.net_amount || payment.amount || 0);
  const memo = `${payment.store || ""} ${payment.payment_item || ""}`.trim();

  return {
    bank: normalizeBankName(vendor.bank),
    account: onlyDigits(vendor.account_number),
    holder,
    amount,
    withdrawMemo: "하카공사비",
    depositMemo: textLimit(holder, 7),
    payerCode: "",
    memo: textLimit(memo, 10),
    key: textLimit(`${payment.id || ""}-${payment.requested_at || today()}`, 20),
    payment,
    vendor,
    ready: Boolean(vendor.bank && vendor.account_number && holder && amount > 0)
  };
}

function bankTransferRecords(data) {
  return approvedPayments(data).map((payment) => bankTransferRecord(data, payment));
}

function excelCell(value, style = "") {
  return `<td${style ? ` style="${style}"` : ""}>${escapeAttr(value)}</td>`;
}

function downloadBankTransferFile(data) {
  const readyRecords = bankTransferRecords(data).filter((record) => record.ready);
  if (!readyRecords.length) {
    render("다운로드할 승인 완료 건이 없거나, 업체 계좌정보가 비어 있습니다.");
    return;
  }

  const headers = ["*입금은행", "*입금계좌", "고객관리성명", "*입금액", "출금통장표시내용", "입금통장표시내용", "입금인코드", "비고", "업체사용key"];
  const rows = readyRecords.map((record) => [
    record.bank,
    record.account,
    record.holder,
    record.amount,
    record.withdrawMemo,
    record.depositMemo,
    record.payerCode,
    record.memo,
    record.key
  ]);
  const tableRows = [
    `<tr>${headers.map((header) => excelCell(header)).join("")}</tr>`,
    ...rows.map((row) => `<tr>${row.map((cell, index) => excelCell(cell, index === 1 ? "mso-number-format:'\\@';" : "")).join("")}</tr>`)
  ];
  const workbook = `
    <html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel">
      <head>
        <meta charset="UTF-8" />
        <!--[if gte mso 9]><xml><x:ExcelWorkbook><x:ExcelWorksheets><x:ExcelWorksheet><x:Name>입력정보</x:Name><x:WorksheetOptions><x:DisplayGridlines/></x:WorksheetOptions></x:ExcelWorksheet></x:ExcelWorksheets></x:ExcelWorkbook></xml><![endif]-->
      </head>
      <body><table>${tableRows.join("")}</table></body>
    </html>`;
  const blob = new Blob([workbook], { type: "application/vnd.ms-excel;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = `은행대량이체_${today()}.xls`;
  document.body.appendChild(link);
  link.click();
  link.remove();
  URL.revokeObjectURL(url);
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
  const amount = parseAmount(form.querySelector("[name='amount']")?.value);
  const taxType = form.querySelector("[name='tax_type']")?.value || "일반 송금";
  const withholdingAmount = Math.round(amount * withholdingRate(taxType));
  const netAmount = amount - withholdingAmount;

  const withholdingPreview = form.querySelector("[data-withholding-preview]");
  const netPreview = form.querySelector("[data-net-preview]");
  if (withholdingPreview) withholdingPreview.textContent = formatKRW(withholdingAmount);
  if (netPreview) netPreview.textContent = formatKRW(netAmount);
}

function kpiData(data) {
  const completed = data.stores.filter((store) => store.status === "완료").length;
  const active = data.stores.filter((store) => store.status === "진행중").length;
  const documentTargets = data.stores.filter((store) => store.document_required).length;
  const approved = data.payments
    .filter((payment) => payment.status === "승인")
    .reduce((sum, payment) => sum + payment.amount, 0);
  const spent = data.stores.reduce((sum, store) => sum + Number(store.spent || 0), 0);
  const pending = data.payments.filter((payment) => payment.status === "신청").length;
  const directStores = data.stores.filter((store) => String(store.name || "").includes("직영점")).length;
  const totalArea = data.stores.reduce((sum, store) => sum + Number(store.area || 0), 0);
  const average = Math.round(spent / Math.max(totalArea, 1));

  return [
    ["완료된 매장", `${completed}개`, "엑셀 공사 상태 기준"],
    ["진행중인 매장", `${active}개`, "시공 또는 비용 검수 중"],
    ["전체 공사비", formatKRW(spent), "엑셀 합계 기준"],
    ["문서 생성 대상", `${documentTargets}개`, "강남압구정 행부터 아래"],
    ["대기중인 결제", `${pending}건`, "승인 전 검토 필요"],
    ["직영점", `${directStores}개`, "지점명 기준"],
    ["승인된 결제", formatKRW(approved), "지급 승인 완료"],
    ["평균 평당 원가", formatKRW(average), "엑셀 합계/평수 기준"]
  ];
}

function table(headers, rows) {
  return `
    <div class="table-wrap">
      <table>
        <thead><tr>${headers.map((head) => `<th>${head}</th>`).join("")}</tr></thead>
        <tbody>${rows.join("")}</tbody>
      </table>
    </div>
  `;
}

function paymentRows(data) {
  return data.payments.map(
    (payment) => `
      <tr>
        <td>${payment.store}</td>
        <td>${payment.vendor}</td>
        <td>${payment.payment_item || "-"}</td>
        <td class="money">${formatKRW(payment.estimate_total || payment.amount)}</td>
        <td>${payment.payment_type || "일시 지급"}</td>
        <td class="money">${formatKRW(payment.amount)}</td>
        <td>${payment.tax_type || "일반 송금"}</td>
        <td class="money">${formatKRW(payment.withholding_amount || 0)}</td>
        <td class="money">${formatKRW(payment.net_amount || payment.amount)}</td>
        <td>${paymentAttachmentSummary(payment)}</td>
        <td>${payment.estimate_group_mode || "매장별 항목 합산"}</td>
        <td><span class="badge ${statusClass(payment.status)}">${payment.status}</span></td>
        <td>${payment.requested_at}</td>
      </tr>`
  );
}

function paymentReviewRows(data) {
  return data.payments.map(
    (payment) => `
      <tr>
        <td>${payment.store}</td>
        <td>${payment.vendor}</td>
        <td>${payment.payment_item || "-"}</td>
        <td class="money">${formatKRW(payment.estimate_total || payment.amount)}</td>
        <td>${payment.payment_type || "일시 지급"}</td>
        <td class="money">${formatKRW(payment.amount)}</td>
        <td>${payment.tax_type || "일반 송금"}</td>
        <td class="money">${formatKRW(payment.withholding_amount || 0)}</td>
        <td class="money">${formatKRW(payment.net_amount || payment.amount)}</td>
        <td>${paymentAttachmentSummary(payment)}</td>
        <td>${payment.estimate_group_mode || "매장별 항목 합산"}</td>
        <td><span class="badge ${statusClass(payment.status)}">${payment.status}</span></td>
        <td>${payment.requested_at}</td>
        <td>
          ${
            payment.status === "신청"
              ? `<div class="row-actions">
                  <button data-payment-id="${payment.id}" data-payment-status="승인">승인</button>
                  <button data-payment-id="${payment.id}" data-payment-status="반려">반려</button>
                </div>`
              : `<span class="muted">처리 완료</span>`
          }
        </td>
      </tr>`
  );
}

function bankTransferRows(data) {
  return bankTransferRecords(data).map(
    (record) => `
      <tr>
        <td>${record.payment.store}</td>
        <td>${record.payment.vendor}</td>
        <td>${record.bank || "-"}</td>
        <td>${record.account || "-"}</td>
        <td>${record.holder || "-"}</td>
        <td class="money">${formatKRW(record.amount)}</td>
        <td>${record.payment.tax_type || "일반 송금"}</td>
        <td><span class="badge ${record.ready ? "green" : "red"}">${record.ready ? "다운로드 가능" : "계좌정보 확인"}</span></td>
      </tr>`
  );
}

function storeRows(data) {
  return data.stores.map(
    (store) => `
      <tr>
        <td>${store.region || "-"}</td>
        <td>${store.name}</td>
        <td>${store.fixture_count || 0}</td>
        <td>${store.area}평</td>
        <td class="money">${formatKRW(store.budget)}</td>
        <td><span class="badge ${statusClass(store.status)}">${store.status}</span></td>
        <td><span class="badge ${store.document_required ? "blue" : "gray"}">${store.document_required ? "생성 대상" : "출력 완료"}</span></td>
      </tr>`
  );
}

function fileLinks(files, fallbackText = "") {
  const parsedFiles = Array.isArray(files) ? files : [];
  if (!parsedFiles.length) return fallbackText || "-";

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

function constructionStartRows(data) {
  return data.constructionStarts.map(
    (item) => `
      <tr>
        <td>${item.store_name}</td>
        <td>${item.area}평</td>
        <td>${item.wall_cabinet_count ?? 0}</td>
        <td>${item.display_fixture_count ?? item.fixture_count ?? 0}</td>
        <td>${item.counter_count ?? 0}</td>
        <td>${item.table_count || 0}</td>
        <td>${item.sign_count || 0}</td>
        <td>${fileLinks(item.drawing_files, item.drawing_note)}</td>
        <td>${fileLinks(item.base_photo_files, item.base_photo_note)}</td>
        <td>${item.special_notes || "-"}</td>
      </tr>`
  );
}

function vendorRows(data) {
  return data.vendors.map(
    (vendor) => `
      <tr>
        <td>${vendor.name}</td>
        <td>${vendor.category}</td>
        <td>${vendor.bank}</td>
        <td>${vendor.account_number || "-"}</td>
        <td>${vendor.account_holder || "-"}</td>
        <td class="money">${formatKRW(vendor.total)}</td>
        <td><span class="badge ${statusClass(vendor.risk)}">${vendor.risk}</span></td>
      </tr>`
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

function paymentForm() {
  return `
    <article class="panel form-panel">
      <div class="panel-head">
        <h2>결제 신청 입력</h2>
      </div>
      <div class="notice">등록된 업체를 선택하면 계좌 정보와 결제 신청이 같은 기준으로 연결됩니다.</div>
      <form id="payment-form">
        <label>매장
          <input name="store" list="store-suggestions" placeholder="직접입력 또는 매장명 검색" autocomplete="off" />
          <datalist id="store-suggestions">
            <option value="직접입력">직접입력</option>
            ${storeSuggestions(currentData)}
          </datalist>
        </label>
        <label>협력업체
          <input name="vendor" list="vendor-suggestions" placeholder="직접입력 또는 업체명 검색" autocomplete="off" />
          <datalist id="vendor-suggestions">
            <option value="직접입력">직접입력</option>
            ${vendorSuggestions(currentData)}
          </datalist>
        </label>
        <label>결제 항목
          <input name="payment_item" list="payment-item-suggestions" placeholder="직접입력 또는 공사항목 검색" autocomplete="off" />
          <datalist id="payment-item-suggestions">
            <option value="직접입력">직접입력</option>
            ${paymentItemSuggestions(currentData)}
          </datalist>
        </label>
        <label>견적 총액, 부가세 포함<input name="estimate_total" inputmode="numeric" placeholder="예: 10000000" autocomplete="off" /></label>
        <label>결제 방식
          <select name="payment_type">
            <option value="일시 지급">일시 지급</option>
            <option value="선금 50%">선금 50%</option>
            <option value="잔금 50%">잔금 50%</option>
            <option value="직접 입력">직접 입력</option>
          </select>
        </label>
        <label>이번 신청 금액<input name="amount" inputmode="numeric" placeholder="예: 5000000" autocomplete="off" /></label>
        <label>지급 유형
          <select name="tax_type">
            <option value="일반 송금">일반 송금</option>
            <option value="사업소득 3.3%">사업소득 3.3%</option>
          </select>
        </label>
        <div class="calc-box">
          <span>원천징수액 <strong data-withholding-preview>0원</strong></span>
          <span>실지급액 <strong data-net-preview>0원</strong></span>
        </div>
        <label>견적서 첨부<input name="estimate_files" type="file" accept="image/*,application/pdf" multiple /></label>
        <label>세금계산서 첨부<input name="tax_invoice_files" type="file" accept="image/*,application/pdf" multiple /></label>
        <label>주민등록증 첨부<input name="id_card_files" type="file" accept="image/*,application/pdf" multiple /></label>
        <label>메모<input name="memo" placeholder="예: 진열장 선금, 잔금, 추가 요청사항" autocomplete="off" /></label>
        <p class="form-message" data-form-message></p>
        <button class="primary wide" type="submit">검토 요청 생성</button>
      </form>
    </article>
  `;
}

function vendorForm() {
  return `
    <article class="panel form-panel">
      <div class="panel-head">
        <h2>업체/계좌 추가</h2>
      </div>
      <div class="notice">결제 신청 전에 협력업체와 지급 계좌를 먼저 등록합니다.</div>
      <form id="vendor-form">
        <label>업체명<input name="name" placeholder="예: 도원인테리어" autocomplete="off" /></label>
        <label>공종 분류<input name="category" placeholder="예: 시공, 전기, 설비" autocomplete="off" /></label>
        <label>은행명<input name="bank" placeholder="예: 신한은행" autocomplete="off" /></label>
        <label>계좌번호<input name="account_number" placeholder="예: 110-000-000000" autocomplete="off" /></label>
        <label>예금주<input name="account_holder" placeholder="예: 도원인테리어" autocomplete="off" /></label>
        <p class="form-message" data-vendor-message></p>
        <button class="primary wide" type="submit">업체 저장</button>
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
        <label>도면 파일<input name="drawing_files" type="file" accept="image/*,application/pdf" multiple /></label>
        <label>벽장 수<input name="wall_cabinet_count" inputmode="numeric" placeholder="예: 4" autocomplete="off" /></label>
        <label>진열장 수<input name="display_fixture_count" inputmode="numeric" placeholder="예: 8" autocomplete="off" /></label>
        <label>카운터 수<input name="counter_count" inputmode="numeric" placeholder="예: 2" autocomplete="off" /></label>
        <label>필요한 테이블 수<input name="table_count" inputmode="numeric" placeholder="예: 3" autocomplete="off" /></label>
        <label>광고판 갯수<input name="sign_count" inputmode="numeric" placeholder="예: 2" autocomplete="off" /></label>
        <label>매장 기초 사진<input name="base_photo_files" type="file" accept="image/*,application/pdf" multiple /></label>
        <label>특이사항<textarea name="special_notes" placeholder="현장 특이사항, 요청사항, 주의할 점"></textarea></label>
        <p class="form-message" data-construction-start-message></p>
        <button class="primary wide" type="submit">공사 시작 정보 저장</button>
      </form>
    </article>
  `;
}

function dashboardView(data) {
  return `
    <section class="kpis">
      ${kpiData(data)
        .map(
          ([label, value, helper]) => `
            <article class="kpi">
              <span>${label}</span>
              <strong>${value}</strong>
              <small>${helper}</small>
            </article>`
        )
        .join("")}
    </section>

    <section class="grid two">
      <article class="panel">
        <div class="panel-head">
          <h2>최근 결제 신청</h2>
          <button data-view-link="결제 신청">전체 보기</button>
        </div>
        ${table(["매장", "업체", "항목", "견적 총액", "결제 방식", "이번 신청액", "지급 유형", "원천징수", "실지급액", "첨부 자료", "견적서 반영", "상태", "신청일"], paymentRows(data))}
      </article>

      <article class="panel">
        <div class="panel-head">
          <h2>매장 공사 현황</h2>
          <button data-view-link="매장별 공사 관리">관리</button>
        </div>
        ${table(["지역", "매장", "진열장", "평수", "공사비 합계", "상태", "문서"], storeRows(data))}
      </article>
    </section>

    <section class="grid lower">
      <article class="panel">
        <div class="panel-head">
          <h2>주요 협력업체</h2>
          <button data-view-link="업체/계좌 관리">업체 추가</button>
        </div>
        ${table(["업체", "분류", "은행", "계좌번호", "예금주", "누적 지급", "상태"], vendorRows(data))}
      </article>
      ${paymentForm()}
    </section>
  `;
}

function paymentView(data) {
  const readyTransferCount = bankTransferRecords(data).filter((record) => record.ready).length;
  return `
    <section class="grid two">
      ${paymentForm()}
      <article class="panel">
        <div class="panel-head">
          <h2>결제 신청 검토</h2>
          <div class="row-actions">
            <button>승인 대기 ${data.payments.filter((payment) => payment.status === "신청").length}건</button>
            <button data-bank-transfer-download>이체 파일 ${readyTransferCount}건</button>
          </div>
        </div>
        ${table(["매장", "업체", "항목", "견적 총액", "결제 방식", "이번 신청액", "지급 유형", "원천징수", "실지급액", "첨부 자료", "견적서 반영", "상태", "신청일", "처리"], paymentReviewRows(data))}
      </article>
    </section>
  `;
}

function bankTransferView(data) {
  const records = bankTransferRecords(data);
  const readyCount = records.filter((record) => record.ready).length;
  const totalAmount = records
    .filter((record) => record.ready)
    .reduce((sum, record) => sum + record.amount, 0);

  return `
    <section class="grid two">
      <article class="panel">
        <div class="panel-head">
          <h2>은행 대량이체 파일</h2>
          <button class="primary" data-bank-transfer-download>엑셀 다운로드</button>
        </div>
        <div class="notice">승인된 결제건만 이체 파일에 들어갑니다. 사업소득 3.3% 건은 원천징수 후 실지급액으로 내려받습니다.</div>
        ${table(["매장", "업체", "입금은행", "입금계좌", "예금주", "입금액", "지급 유형", "상태"], bankTransferRows(data))}
      </article>
      <article class="panel">
        <div class="panel-head">
          <h2>다운로드 요약</h2>
          <button>${readyCount}건 가능</button>
        </div>
        <section class="kpis compact-kpis">
          <article class="kpi">
            <span>승인 건</span>
            <strong>${records.length}건</strong>
            <small>결제 상태가 승인인 건</small>
          </article>
          <article class="kpi">
            <span>다운로드 가능</span>
            <strong>${readyCount}건</strong>
            <small>은행/계좌/예금주 확인 완료</small>
          </article>
          <article class="kpi">
            <span>총 이체액</span>
            <strong>${formatKRW(totalAmount)}</strong>
            <small>실지급액 기준</small>
          </article>
        </section>
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
        ${table(["매장", "평수", "벽장", "진열장", "카운터", "테이블", "광고판", "도면", "기초 사진", "특이사항"], constructionStartRows(data))}
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
  const wallUnit = furnitureGroupUnit("벽장");
  const displayUnit = furnitureGroupUnit("진열장");
  const counterUnit = furnitureGroupUnit("카운터");

  return data.constructionStarts.map((item) => {
    const wallCount = numberValue(item.wall_cabinet_count);
    const displayCount = numberValue(item.display_fixture_count ?? item.fixture_count);
    const counterCount = numberValue(item.counter_count);
    const total = wallCount * wallUnit + displayCount * displayUnit + counterCount * counterUnit;

    return `
      <tr>
        <td>${item.store_name}</td>
        <td>${wallCount}</td>
        <td>${displayCount}</td>
        <td>${counterCount}</td>
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
        ${table(["매장", "벽장", "진열장", "카운터", "예상 반영 금액"], furnitureAllocationRows(data))}
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
          <h2>업체/계좌 목록</h2>
          <button>${data.vendors.length}개 등록</button>
        </div>
        ${table(["업체", "분류", "은행", "계좌번호", "예금주", "누적 지급", "상태"], vendorRows(data))}
      </article>
    </section>
  `;
}

function storesView(data) {
  return `
    <section class="grid two">
      ${storeForm()}
      <article class="panel">
        <div class="panel-head">
          <h2>매장별 공사 목록</h2>
          <button>${data.stores.length}개 매장</button>
        </div>
        ${table(["지역", "매장", "진열장", "평수", "공사비 합계", "상태", "문서"], storeRows(data))}
      </article>
    </section>
  `;
}

function userRoleRows(data) {
  return data.userRoles.map(
    (user) => `
      <tr>
        <td>${user.email}</td>
        <td><span class="badge ${user.role === "admin" ? "green" : "blue"}">${roleLabels[user.role] || user.role}</span></td>
        <td>${user.created_at ? String(user.created_at).slice(0, 10) : "-"}</td>
      </tr>`
  );
}

function roleMenuRows() {
  return Object.entries(roleMenus).map(
    ([role, menus]) => `
      <tr>
        <td><strong>${role}</strong></td>
        <td>${menus.map((menu) => `<span class="menu-chip">${menu}</span>`).join("")}</td>
        <td>${menus.length}개</td>
      </tr>`
  );
}

function adminSettingsView(data) {
  return `
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
      <h2>${view}</h2>
      <p>이 메뉴는 다음 단계에서 구현할 기능입니다. 지금은 확인해야 할 항목을 먼저 고정해둔 상태입니다.</p>
      <div class="check-list">
        ${checks.map((item) => `<span>${item}</span>`).join("")}
      </div>
    </section>
  `;
}

function activeContent(data) {
  if (activeView === "대시보드") return dashboardView(data);
  if (activeView === "공사 시작 접수") return constructionStartView(data);
  if (activeView === "결제 신청") return paymentView(data);
  if (activeView === "업체/계좌 관리") return vendorsView(data);
  if (activeView === "매장별 공사 관리") return storesView(data);
  if (activeView === "진열장 원가 배분") return furnitureAllocationView(data);
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
      <span>${currentUser?.email || ""}</span>
      <strong>${activeRole}</strong>
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
        ${message ? `<div class="form-message ${message.includes("실패") ? "error" : "warning"}">${message}</div>` : ""}
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

  document.querySelector("#auth-form").addEventListener("submit", handleLogin);
  document.querySelector("[data-auth-action='signup']").addEventListener("click", handleSignup);
  document.querySelector("[data-auth-action='resend']").addEventListener("click", handleResendVerification);
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

  const { data, error } = await supabase.auth.signInWithPassword({ email, password });
  if (error) {
    renderLogin(`로그인 실패: ${error.message}`);
    return;
  }

  currentUser = data.user;
  activeRole = await loadUserRole(currentUser);
  activeView = visibleNav()[0];
  currentData = await loadData();
  render();
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
  await supabase.auth.signOut();
  currentUser = null;
  activeRole = "인테리어 공사실장";
  renderLogin("로그아웃되었습니다.");
}

function render(notice = "") {
  const app = document.querySelector("#app");
  app.className = "";
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
      <nav>
        ${visibleNav()
          .map(
            (item) => `<button data-view="${item}" class="${item === activeView ? "active" : ""}">${item}</button>`
          )
          .join("")}
      </nav>
    </aside>
    <main class="shell">
      <header class="topbar">
        <div>
          <p>${activeRole}</p>
          <h1>${activeView}</h1>
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

      ${notice ? `<div class="toast">${notice}</div>` : ""}
      ${activeContent(currentData)}
    </main>
  `;

  document.querySelectorAll("[data-view]").forEach((button) => {
    button.addEventListener("click", () => {
      activeView = button.dataset.view;
      render();
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

  document.querySelectorAll("[data-view-link]").forEach((button) => {
    button.addEventListener("click", () => {
      if (visibleNav().includes(button.dataset.viewLink)) {
        activeView = button.dataset.viewLink;
      }
      render();
    });
  });

  const paymentFormElement = document.querySelector("#payment-form");
  if (paymentFormElement) {
    paymentFormElement.addEventListener("submit", submitPayment);
    paymentFormElement.querySelector("[name='estimate_total']")?.addEventListener("input", () => syncPaymentAmount(paymentFormElement));
    paymentFormElement.querySelector("[name='payment_type']")?.addEventListener("change", () => syncPaymentAmount(paymentFormElement));
    paymentFormElement.querySelector("[name='amount']")?.addEventListener("input", () => syncTaxPreview(paymentFormElement));
    paymentFormElement.querySelector("[name='tax_type']")?.addEventListener("change", () => syncTaxPreview(paymentFormElement));
    syncTaxPreview(paymentFormElement);
  }

  const vendorFormElement = document.querySelector("#vendor-form");
  if (vendorFormElement) vendorFormElement.addEventListener("submit", submitVendor);

  const storeFormElement = document.querySelector("#store-form");
  if (storeFormElement) storeFormElement.addEventListener("submit", submitStore);

  const constructionStartFormElement = document.querySelector("#construction-start-form");
  if (constructionStartFormElement) constructionStartFormElement.addEventListener("submit", submitConstructionStart);

  document.querySelectorAll("[data-bank-transfer-download]").forEach((button) => {
    button.addEventListener("click", () => downloadBankTransferFile(currentData));
  });

  document.querySelectorAll("[data-payment-id][data-payment-status]").forEach((button) => {
    button.addEventListener("click", () => {
      updatePaymentStatus(Number(button.dataset.paymentId), button.dataset.paymentStatus);
    });
  });
}

startApp();
