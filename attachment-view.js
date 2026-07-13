(() => {
  const VERSION = "attachment-view-3-safe-history";
  if (window.__hakaAttachmentViewV3) return;
  window.__hakaAttachmentViewV3 = true;

  const SUPABASE_URL = "https://yqemtsbdnypgmkuyncxh.supabase.co";
  const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlxZW10c2JkbnlwZ21rdXluY3hoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODAyNjYwMTUsImV4cCI6MjA5NTg0MjAxNX0.gwgdCncqRKKgC8ebj7qIdT-vA4J-wOVd2O9DSa7xEOs";
  const JSZIP_URL = "https://cdn.jsdelivr.net/npm/jszip@3.10.1/dist/jszip.min.js";
  const LOG_KEY = "haka_attachment_download_log_v1";
  const esc = (value) => String(value ?? "").replace(/[&<>"]/g, (char) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" })[char]);
  const safeName = (value) => String(value || "파일").replace(/[\\/:*?"<>|]/g, "_").replace(/\s+/g, " ").trim().slice(0, 90) || "파일";
  const today = () => new Date().toISOString().slice(0, 10);
  const sizeLabel = (size) => {
    const value = Number(size || 0);
    if (!value) return "-";
    if (value >= 1024 * 1024) return `${(value / 1024 / 1024).toFixed(1)}MB`;
    if (value >= 1024) return `${Math.round(value / 1024)}KB`;
    return `${value}B`;
  };

  let cachedRows = [];
  let busyDownload = false;

  function readLog() {
    try {
      const parsed = JSON.parse(localStorage.getItem(LOG_KEY) || "{}");
      return parsed && typeof parsed === "object" ? parsed : {};
    } catch {
      return {};
    }
  }

  function writeLog(log) {
    try {
      localStorage.setItem(LOG_KEY, JSON.stringify(log));
      return true;
    } catch {
      return false;
    }
  }

  function fileKey(row) {
    return [row.category, row.url || row.name || ""].join("|");
  }

  function isDownloaded(row) {
    return Boolean(readLog()[fileKey(row)]);
  }

  function markRowsDownloaded(rows) {
    const log = readLog();
    const now = new Date().toISOString();
    rows.filter((row) => row.url).forEach((row) => {
      log[fileKey(row)] = { category: row.category, owner: row.owner, name: row.name, url: row.url, downloaded_at: now };
    });
    return writeLog(log);
  }

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
        rawSize: Number(file.size || 0),
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
    cachedRows = rows;
    return rows;
  }

  function groupedRows(rows) {
    const order = ["견적서", "세금계산서", "주민등록증", "사업자등록증", "통장사본", "도면", "기초 사진"];
    return order
      .map((category) => {
        const all = rows.filter((row) => row.category === category && row.url);
        const fresh = all.filter((row) => !isDownloaded(row));
        const done = all.length - fresh.length;
        return { category, all, fresh, done };
      })
      .filter((group) => group.all.length);
  }

  function groupButtons(rows) {
    const groups = groupedRows(rows);
    if (!groups.length) return "";
    return `<div class="bulk-actions" data-attachment-actions>
      ${groups.map((group) => `
        <button type="button" data-attachment-download="${esc(group.category)}" data-attachment-mode="fresh">${esc(group.category)} 신규 ${group.fresh.length}개 내려받기</button>
        <button type="button" data-attachment-download="${esc(group.category)}" data-attachment-mode="all">전체 ${group.all.length}개</button>
        <button type="button" data-attachment-mark="${esc(group.category)}">완료 처리 ${group.done}/${group.all.length}</button>
      `).join("")}
    </div>`;
  }

  async function ensureZip() {
    if (window.JSZip) return window.JSZip;
    await new Promise((resolve, reject) => {
      const existing = document.querySelector(`script[src="${JSZIP_URL}"]`);
      if (existing) {
        existing.addEventListener("load", resolve, { once: true });
        existing.addEventListener("error", reject, { once: true });
        return;
      }
      const script = document.createElement("script");
      script.src = JSZIP_URL;
      script.onload = resolve;
      script.onerror = reject;
      document.head.appendChild(script);
    });
    return window.JSZip;
  }

  async function downloadGroup(category, mode, button) {
    if (busyDownload) return;
    const allFiles = cachedRows.filter((row) => row.category === category && row.url);
    const files = mode === "all" ? allFiles : allFiles.filter((row) => !isDownloaded(row));
    if (!files.length) {
      alert(mode === "all" ? `${category} 파일이 없습니다.` : `${category} 신규 파일이 없습니다. 이미 완료 처리된 파일은 제외했습니다.`);
      return;
    }
    busyDownload = true;
    const oldText = button?.textContent || "";
    if (button) {
      button.disabled = true;
      button.textContent = `${category} 압축 중`;
    }
    try {
      const JSZip = await ensureZip();
      const zip = new JSZip();
      const downloadedRows = [];
      for (let index = 0; index < files.length; index += 1) {
        const file = files[index];
        const response = await fetch(file.url, { mode: "cors" });
        if (!response.ok) continue;
        const blob = await response.blob();
        const ext = safeName(file.name).includes(".") ? "" : ".bin";
        const name = `${String(index + 1).padStart(3, "0")}_${safeName(file.owner)}_${safeName(file.name)}${ext}`;
        zip.file(name, blob);
        downloadedRows.push(file);
      }
      if (!downloadedRows.length) {
        alert(`${category} 파일을 내려받지 못했습니다. 파일 열기는 가능하지만 일괄 압축 다운로드 권한이 막혀 있을 수 있습니다.`);
        return;
      }
      const content = await zip.generateAsync({ type: "blob" });
      const url = URL.createObjectURL(content);
      const link = document.createElement("a");
      link.href = url;
      link.download = `첨부파일_${safeName(category)}_${mode === "all" ? "전체" : "신규"}_${today()}_${downloadedRows.length}개.zip`;
      document.body.appendChild(link);
      link.click();
      link.remove();
      URL.revokeObjectURL(url);
      markRowsDownloaded(downloadedRows);
      alert(`${category} ${downloadedRows.length}개 파일을 ZIP으로 만들고 다운로드 완료 처리했습니다.`);
      renderAttachmentView();
    } catch (error) {
      alert(`일괄 다운로드 실패: ${error.message}`);
    } finally {
      busyDownload = false;
      if (button) {
        button.disabled = false;
        button.textContent = oldText;
      }
    }
  }

  function markCategory(category) {
    const files = cachedRows.filter((row) => row.category === category && row.url);
    if (!files.length) {
      alert(`${category} 파일이 없습니다.`);
      return;
    }
    const ok = confirm(`${category} ${files.length}개를 다운로드 완료로 표시할까요? 이미 따로 내려받은 파일을 다음 신규 다운로드에서 제외할 때 사용합니다.`);
    if (!ok) return;
    markRowsDownloaded(files);
    alert(`${category} ${files.length}개를 완료 처리했습니다. 다음부터 신규 다운로드에서는 제외됩니다.`);
    renderAttachmentView();
  }

  function table(rows) {
    if (!rows.length) {
      return `<div class="empty-panel"><p>아직 업로드된 첨부 파일이 없습니다.</p></div>`;
    }
    return `<div class="table-wrap"><table>
      <thead><tr><th>상태</th><th>구분</th><th>대상</th><th>파일 종류</th><th>파일명</th><th>크기</th><th>등록일</th><th>보기</th></tr></thead>
      <tbody>${rows.map((row) => {
        const done = isDownloaded(row);
        return `<tr>
          <td><span class="badge ${done ? "green" : "amber"}">${done ? "다운로드 완료" : "신규"}</span></td>
          <td>${esc(row.source)}</td>
          <td>${esc(row.owner)}</td>
          <td>${esc(row.category)}</td>
          <td>${row.url ? `<a href="${esc(row.url)}" target="_blank" rel="noreferrer">${esc(row.name)}</a>` : esc(row.name)}</td>
          <td>${esc(row.size)}</td>
          <td>${esc(row.date || "-")}</td>
          <td>${row.url ? `<a href="${esc(row.url)}" target="_blank" rel="noreferrer">열기</a>` : "-"}</td>
        </tr>`;
      }).join("")}</tbody>
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
    host.innerHTML = `<article class="panel"><div class="panel-head"><h2>첨부 파일 보기</h2><button>불러오는 중</button></div><div class="notice">첨부 파일 목록을 불러오고 있습니다.</div></article>`;

    try {
      const rows = await loadRows();
      const paymentCount = rows.filter((row) => row.source === "결제 신청").length;
      const vendorCount = rows.filter((row) => row.source === "업체 계좌").length;
      const constructionCount = rows.filter((row) => row.source === "공사 시작").length;
      const freshCount = rows.filter((row) => row.url && !isDownloaded(row)).length;
      host.innerHTML = `<article class="panel">
        <div class="panel-head"><h2>첨부 파일 보기</h2><div class="row-actions"><button>신규 ${freshCount}개</button><button>결제 ${paymentCount}개</button><button>업체 ${vendorCount}개</button><button>공사 ${constructionCount}개</button></div></div>
        <div class="notice">신규 내려받기는 이미 완료 처리된 파일을 제외합니다. 예전에 따로 받은 세금계산서는 세금계산서의 완료 처리 버튼을 눌러 다음 다운로드에서 제외하세요.</div>
        ${groupButtons(rows)}
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
    const markButton = event.target.closest?.("[data-attachment-mark]");
    if (markButton) {
      event.preventDefault();
      event.stopPropagation();
      markCategory(markButton.dataset.attachmentMark);
      return;
    }
    const downloadButton = event.target.closest?.("[data-attachment-download]");
    if (downloadButton) {
      event.preventDefault();
      event.stopPropagation();
      downloadGroup(downloadButton.dataset.attachmentDownload, downloadButton.dataset.attachmentMode || "fresh", downloadButton);
      return;
    }
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
