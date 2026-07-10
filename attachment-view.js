(() => {
  const VERSION = "attachment-view-1";
  if (window.__hakaAttachmentView) return;
  window.__hakaAttachmentView = true;

  const SUPABASE_URL = "https://yqemtsbdnypgmkuyncxh.supabase.co";
  const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlxZW10c2JkbnlwZ21rdXluY3hoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODAyNjYwMTUsImV4cCI6MjA5NTg0MjAxNX0.gwgdCncqRKKgC8ebj7qIdT-vA4J-wOVd2O9DSa7xEOs";
  const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
  const esc = (value) => String(value ?? "").replace(/[&<>"]/g, (char) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" })[char]);
  const sizeLabel = (size) => {
    const value = Number(size || 0);
    if (!value) return "-";
    if (value >= 1024 * 1024) return `${(value / 1024 / 1024).toFixed(1)}MB`;
    if (value >= 1024) return `${Math.round(value / 1024)}KB`;
    return `${value}B`;
  };

  function getClient() {
    const factory = window.supabase?.createClient || window.createClient;
    if (!factory) return null;
    return factory(SUPABASE_URL, SUPABASE_ANON_KEY);
  }

  function addFiles(rows, source, owner, category, files, date = "") {
    (Array.isArray(files) ? files : []).forEach((file) => {
      rows.push({
        source,
        owner,
        category,
        name: file.name || "파일",
        size: sizeLabel(file.size),
        date,
        url: file.url || ""
      });
    });
  }

  async function loadRows() {
    const client = getClient();
    if (!client) throw new Error("Supabase 연결 모듈을 불러오지 못했습니다.");
    const [payments, vendors, starts] = await Promise.all([
      client.from("payments").select("store,vendor,tax_type,requested_at,attachment_files").order("requested_at", { ascending: false }).limit(500),
      client.from("vendors").select("name,attachment_files").order("id", { ascending: false }).limit(500),
      client.from("construction_starts").select("store_name,created_at,drawing_files,base_photo_files").order("created_at", { ascending: false }).limit(300)
    ]);
    if (payments.error) throw payments.error;
    if (vendors.error) throw vendors.error;
    if (starts.error) throw starts.error;

    const rows = [];
    (payments.data || []).forEach((payment) => {
      const files = payment.attachment_files || {};
      const owner = `${payment.store || "-"} / ${payment.vendor || "-"}`;
      const date = String(payment.requested_at || "").slice(0, 10);
      addFiles(rows, "결제 신청", owner, "견적서", files.estimate_files, date);
      addFiles(rows, "결제 신청", owner, "세금계산서", files.tax_invoice_files, date);
      addFiles(rows, "결제 신청", owner, "주민등록증", files.id_card_files, date);
    });
    (vendors.data || []).forEach((vendor) => {
      const files = vendor.attachment_files || {};
      addFiles(rows, "업체 계좌", vendor.name || "-", "사업자등록증", files.business_license_files);
      addFiles(rows, "업체 계좌", vendor.name || "-", "통장사본", files.bankbook_files);
    });
    (starts.data || []).forEach((item) => {
      const date = String(item.created_at || "").slice(0, 10);
      addFiles(rows, "공사 시작", item.store_name || "-", "도면", item.drawing_files, date);
      addFiles(rows, "공사 시작", item.store_name || "-", "기초 사진", item.base_photo_files, date);
    });
    return rows;
  }

  function table(rows) {
    if (!rows.length) {
      return `<div class="empty-panel"><p>아직 업로드된 첨부 파일이 없습니다.</p></div>`;
    }
    return `<div class="table-wrap"><table>
      <thead><tr><th>구분</th><th>대상</th><th>파일 종류</th><th>파일명</th><th>크기</th><th>등록일</th><th>보기</th></tr></thead>
      <tbody>${rows.map((row) => `<tr>
        <td>${esc(row.source)}</td>
        <td>${esc(row.owner)}</td>
        <td>${esc(row.category)}</td>
        <td>${row.url ? `<a href="${esc(row.url)}" target="_blank" rel="noreferrer">${esc(row.name)}</a>` : esc(row.name)}</td>
        <td>${esc(row.size)}</td>
        <td>${esc(row.date || "-")}</td>
        <td>${row.url ? `<a href="${esc(row.url)}" target="_blank" rel="noreferrer">열기</a>` : "-"}</td>
      </tr>`).join("")}</tbody>
    </table></div>`;
  }

  async function renderAttachmentView() {
    const shell = document.querySelector(".shell");
    if (!shell) return;
    const headerTitle = shell.querySelector(".topbar h1");
    if (headerTitle) headerTitle.textContent = "첨부 파일 보기";
    shell.querySelectorAll("nav button, [data-view]").forEach((button) => button.classList?.remove("active"));
    const navButton = document.querySelector("[data-attachment-view]");
    navButton?.classList.add("active");

    let host = shell.querySelector("[data-attachment-page]");
    if (!host) {
      const old = [...shell.children].filter((child) => !child.classList.contains("topbar"));
      old.forEach((child) => child.remove());
      host = document.createElement("section");
      host.dataset.attachmentPage = "1";
      host.className = "grid";
      shell.appendChild(host);
    }
    host.innerHTML = `<article class="panel"><div class="panel-head"><h2>첨부 파일 보기</h2><button>불러오는 중</button></div><div class="notice">결제 증빙, 업체 서류, 공사 시작 도면/사진을 한 화면에서 확인합니다.</div></article>`;

    try {
      const rows = await loadRows();
      const paymentCount = rows.filter((row) => row.source === "결제 신청").length;
      const vendorCount = rows.filter((row) => row.source === "업체 계좌").length;
      const constructionCount = rows.filter((row) => row.source === "공사 시작").length;
      host.innerHTML = `<article class="panel">
        <div class="panel-head"><h2>첨부 파일 보기</h2><div class="row-actions"><button>결제 ${paymentCount}개</button><button>업체 ${vendorCount}개</button><button>공사 ${constructionCount}개</button></div></div>
        <div class="notice">파일명을 누르면 새 창에서 열립니다. 한글 파일명 업로드도 확인할 수 있습니다.</div>
        ${table(rows)}
      </article>`;
    } catch (error) {
      host.innerHTML = `<article class="panel"><div class="panel-head"><h2>첨부 파일 보기</h2></div><div class="form-message error">첨부 파일을 불러오지 못했습니다: ${esc(error.message)}</div></article>`;
    }
  }

  function ensureNavButton() {
    const nav = document.querySelector("nav");
    if (!nav || nav.querySelector("[data-attachment-view]")) return;
    const button = document.createElement("button");
    button.type = "button";
    button.textContent = "첨부 파일 보기";
    button.dataset.attachmentView = "1";
    button.addEventListener("click", renderAttachmentView);
    const anchor = [...nav.querySelectorAll("button")].find((item) => item.textContent.includes("결제 계좌"));
    if (anchor?.nextSibling) nav.insertBefore(button, anchor.nextSibling);
    else nav.appendChild(button);
  }

  document.addEventListener("click", (event) => {
    const button = event.target.closest?.("[data-attachment-view]");
    if (!button) return;
    event.preventDefault();
    event.stopPropagation();
    renderAttachmentView();
  }, true);

  const observer = new MutationObserver(() => {
    clearTimeout(window.__hakaAttachmentViewTimer);
    window.__hakaAttachmentViewTimer = setTimeout(ensureNavButton, 100);
  });
  observer.observe(document.documentElement, { childList: true, subtree: true });
  setTimeout(ensureNavButton, 500);
  setTimeout(ensureNavButton, 1500);
  console.info(`[HAKA] ${VERSION} loaded`);
})();
