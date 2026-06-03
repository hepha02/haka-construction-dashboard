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

const fallback = {
  payments: [
    { id: 1, store: "성수 플래그십", vendor: "한빛전기", amount: 18400000, status: "승인", requested_at: "2026-05-28" },
    { id: 2, store: "부산 센텀", vendor: "도원인테리어", amount: 32700000, status: "신청", requested_at: "2026-05-27" },
    { id: 3, store: "대전 둔산", vendor: "서진설비", amount: 9800000, status: "반려", requested_at: "2026-05-26" },
    { id: 4, store: "제주 노형", vendor: "제이건축", amount: 24100000, status: "승인", requested_at: "2026-05-25" }
  ],
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
  ]
};

const nav = [
  "대시보드",
  "엑셀 업로드",
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
  "인테리어 공사실장": ["결제 신청", "진열장 원가 배분"]
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
const escapeAttr = (value) =>
  String(value || "")
    .replace(/&/g, "&amp;")
    .replace(/"/g, "&quot;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");

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

  const [payments, stores, vendors] = await Promise.all([
    supabase.from("payments").select("*").order("requested_at", { ascending: false }).order("id", { ascending: false }).limit(12),
    supabase.from("stores").select("*").order("id", { ascending: true }),
    supabase.from("vendors").select("*").order("id", { ascending: true })
  ]);

  return {
    payments: payments.error ? fallback.payments : payments.data,
    stores: stores.error ? fallback.stores : stores.data,
    vendors: vendors.error ? fallback.vendors : vendors.data
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

async function submitPayment(event) {
  event.preventDefault();

  const form = event.currentTarget;
  const submitButton = form.querySelector("button[type='submit']");
  const message = form.querySelector("[data-form-message]");
  const formData = new FormData(form);
  const store = String(formData.get("store") || "").trim();
  const vendor = String(formData.get("vendor") || "").trim();
  const amount = parseAmount(formData.get("amount"));
  const duplicate = findDuplicateRisk(currentData, vendor, amount);

  if (!store || !vendor || !amount) {
    message.textContent = "매장명, 업체, 신청 금액을 모두 입력해 주세요.";
    message.className = "form-message error";
    return;
  }

  submitButton.disabled = true;
  submitButton.textContent = "저장 중";
  message.textContent = duplicate
    ? `중복 의심: ${duplicate.store} / ${formatKRW(duplicate.amount)} 건과 비슷합니다.`
    : "신청 건을 저장하고 있습니다.";
  message.className = duplicate ? "form-message warning" : "form-message";

  const newPayment = {
    store,
    vendor,
    amount,
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
        <td class="money">${formatKRW(payment.amount)}</td>
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
        <td class="money">${formatKRW(payment.amount)}</td>
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
  return data.stores
    .map(
      (store) =>
        `<option value="${escapeAttr(store.name)}">${escapeAttr(store.name)} / ${escapeAttr(store.area)}평 / ${escapeAttr(store.status)}</option>`
    )
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
        <label>신청 금액<input name="amount" inputmode="numeric" placeholder="예: 18500000" autocomplete="off" /></label>
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
        ${table(["매장", "업체", "금액", "상태", "신청일"], paymentRows(data))}
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
  return `
    <section class="grid two">
      ${paymentForm()}
      <article class="panel">
        <div class="panel-head">
          <h2>결제 신청 검토</h2>
          <button>승인 대기 ${data.payments.filter((payment) => payment.status === "신청").length}건</button>
        </div>
        ${table(["매장", "업체", "금액", "상태", "신청일", "처리"], paymentReviewRows(data))}
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
  if (activeView === "결제 신청") return paymentView(data);
  if (activeView === "업체/계좌 관리") return vendorsView(data);
  if (activeView === "매장별 공사 관리") return storesView(data);
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
  if (paymentFormElement) paymentFormElement.addEventListener("submit", submitPayment);

  const vendorFormElement = document.querySelector("#vendor-form");
  if (vendorFormElement) vendorFormElement.addEventListener("submit", submitVendor);

  const storeFormElement = document.querySelector("#store-form");
  if (storeFormElement) storeFormElement.addEventListener("submit", submitStore);

  document.querySelectorAll("[data-payment-id][data-payment-status]").forEach((button) => {
    button.addEventListener("click", () => {
      updatePaymentStatus(Number(button.dataset.paymentId), button.dataset.paymentStatus);
    });
  });
}

startApp();
