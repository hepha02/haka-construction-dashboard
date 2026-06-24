import { createClient } from "https://esm.sh/@supabase/supabase-js@2.49.1";

const SUPABASE_URL = "https://yqemtsbdnypgmkuyncxh.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVlxZW10c2JkbnlwZ21rdXluY3hoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODAyNjYwMTUsImV4cCI6MjA5NTg0MjAxNX0.gwgdCncqRKKgC8ebj7qIdT-vA4J-wOVd2O9DSa7xEOs".replace("Vlx", "lx");
const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

let mode = "진행중";
let storesByName = new Map();
let quotesByStore = new Map();
let loading = false;
let loadedAt = 0;
let applying = false;

const style = document.createElement("style");
style.textContent = `
  .store-tabs-overlay {
    display: inline-flex;
    gap: 6px;
    margin: 0 0 12px;
    padding: 4px;
    border: 1px solid #d9e7e2;
    border-radius: 8px;
    background: #f8fbfa;
    position: relative;
    z-index: 3;
  }
  .store-tabs-overlay button {
    min-height: 34px;
    padding: 0 14px;
    border: 1px solid transparent;
    border-radius: 8px;
    color: #344154;
    background: transparent;
    font-size: 12px;
    font-weight: 900;
    cursor: pointer;
    pointer-events: auto;
  }
  .store-tabs-overlay button.active {
    color: #116447;
    border-color: #b9d8cd;
    background: #e6f5ee;
  }
  .store-tabs-managed .table-wrap { position: relative; }
  .store-tabs-managed th:first-child,
  .store-tabs-managed td:first-child {
    position: sticky;
    left: 0;
    z-index: 2;
    background: #ffffff;
    box-shadow: 8px 0 12px rgba(22, 32, 51, 0.06);
  }
  .store-tabs-managed th:last-child,
  .store-tabs-managed td:last-child {
    position: sticky;
    right: 0;
    z-index: 3;
    min-width: 210px;
    background: #ffffff;
    box-shadow: -8px 0 12px rgba(22, 32, 51, 0.08);
  }
  .store-tabs-managed th:first-child,
  .store-tabs-managed th:last-child {
    z-index: 4;
    background: #f8fafc;
  }
  .store-tabs-managed td:last-child .row-actions {
    display: grid;
    grid-template-columns: repeat(2, minmax(70px, 1fr));
    gap: 6px;
  }
  .store-tabs-managed td:last-child .row-actions button {
    min-height: 34px;
    white-space: nowrap;
  }
  .store-mobile-cards { display: none; }
  .store-mobile-card {
    display: grid;
    gap: 12px;
    padding: 14px;
    border: 1px solid #dfe6ee;
    border-radius: 8px;
    background: #ffffff;
  }
  .store-mobile-card h3 {
    margin: 0;
    color: #162033;
    font-size: 16px;
  }
  .store-mobile-card .store-card-head {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 10px;
  }
  .store-card-grid {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 8px;
  }
  .store-card-grid div {
    min-width: 0;
    padding: 10px;
    border-radius: 8px;
    background: #f8fafc;
  }
  .store-card-grid span {
    display: block;
    margin-bottom: 4px;
    color: #7a8597;
    font-size: 11px;
    font-weight: 900;
  }
  .store-card-grid strong {
    display: block;
    overflow-wrap: anywhere;
    color: #162033;
    font-size: 13px;
  }
  .store-card-actions {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 8px;
  }
  .store-card-actions button {
    min-height: 42px;
    padding: 0 10px;
    border: 1px solid #d9dfe8;
    border-radius: 8px;
    color: #253247;
    background: #ffffff;
    font-size: 13px;
    font-weight: 900;
  }
  .store-card-actions button:first-child {
    border-color: #237c63;
    color: #116447;
    background: #e6f5ee;
  }
  .store-tabs-empty-row td {
    color: #667386;
    text-align: center;
    font-weight: 800;
  }
  .store-tabs-empty-row td:first-child,
  .store-tabs-empty-row td:last-child {
    position: static;
    box-shadow: none;
  }
  @media (max-width: 720px) {
    .store-tabs-overlay {
      display: grid;
      grid-template-columns: repeat(2, minmax(0, 1fr));
      width: 100%;
      box-sizing: border-box;
    }
    .store-tabs-overlay button { min-height: 42px; }
    .store-tabs-managed .table-wrap { display: none; }
    .store-mobile-cards { display: grid; gap: 10px; }
    .store-card-grid { grid-template-columns: 1fr; }
    .store-card-actions { grid-template-columns: 1fr; }
  }
`;
document.head.appendChild(style);

function normalize(value) { return String(value || "").trim(); }
function cellText(row, index) {
  const cell = row.children[index];
  const input = cell?.querySelector("input");
  return normalize(input ? input.value : cell?.textContent);
}
function escapeHtml(value) {
  return String(value || "").replace(/[&<>"]/g, (char) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" })[char]);
}

async function refreshData(force = false) {
  if (loading) return;
  if (!force && Date.now() - loadedAt < 5000) return;
  loading = true;
  try {
    const [stores, quotes] = await Promise.all([
      supabase.from("stores").select("name,status,document_required"),
      supabase.from("store_quotes").select("store_name,quote_status")
    ]);
    if (!stores.error) storesByName = new Map((stores.data || []).map((store) => [normalize(store.name), store]));
    if (!quotes.error) quotesByStore = new Map((quotes.data || []).map((quote) => [normalize(quote.store_name), quote]));
    loadedAt = Date.now();
  } finally {
    loading = false;
  }
}
function isHardcopyCompleted(storeName) {
  const store = storesByName.get(normalize(storeName));
  return store?.status === "완료" && !store?.document_required;
}
function isManagedCompleted(storeName) {
  const store = storesByName.get(normalize(storeName));
  const quote = quotesByStore.get(normalize(storeName));
  return quote?.quote_status === "계약 완료" || (store?.status === "완료" && Boolean(store?.document_required));
}
function findStorePanel() {
  return [...document.querySelectorAll("article.panel")].find((panel) => panel.querySelector("h2")?.textContent?.includes("매장별 정산"));
}
function rowsFor(panel) {
  return [...panel.querySelectorAll("tbody tr")].filter((row) => !row.classList.contains("store-tabs-empty-row"));
}
function classifyRows(panel) {
  return rowsFor(panel).map((row, index) => {
    const storeName = normalize(row.querySelector("td")?.textContent);
    row.dataset.storeTabsIndex = String(index);
    const hardcopy = isHardcopyCompleted(storeName);
    const completed = isManagedCompleted(storeName);
    return { row, index, storeName, hardcopy, completed };
  });
}
function ensureTabs(panel, counts) {
  panel.classList.add("store-tabs-managed");
  let tabs = panel.querySelector(".store-tabs-overlay");
  if (!tabs) {
    tabs = document.createElement("div");
    tabs.className = "store-tabs-overlay";
    panel.querySelector(".panel-head")?.insertAdjacentElement("afterend", tabs);
  }
  const nextHtml = `
    <button type="button" data-store-tab="진행중" class="${mode === "진행중" ? "active" : ""}">진행중 ${counts.progress}건</button>
    <button type="button" data-store-tab="완료" class="${mode === "완료" ? "active" : ""}">완료 매장 ${counts.completed}건</button>
  `;
  if (tabs.innerHTML.trim() !== nextHtml.trim()) tabs.innerHTML = nextHtml;
}
function visibleItems(classified) {
  return classified.filter((item) => !item.hardcopy && (mode === "완료" ? item.completed : !item.completed));
}
function ensureMobileCards(panel, items) {
  let cards = panel.querySelector(".store-mobile-cards");
  if (!cards) {
    cards = document.createElement("div");
    cards.className = "store-mobile-cards";
    panel.querySelector(".table-wrap")?.insertAdjacentElement("beforebegin", cards);
  }
  if (!items.length) {
    cards.innerHTML = `<article class="store-mobile-card"><h3>${mode === "진행중" ? "진행중인 매장이 없습니다." : "문서 생성 대상 완료 매장이 없습니다."}</h3></article>`;
    return;
  }
  cards.innerHTML = items.map((item) => {
    const row = item.row;
    const buttons = [...row.querySelectorAll("td:last-child button")].map((button, buttonIndex) =>
      `<button type="button" data-store-mobile-action="${item.index}:${buttonIndex}">${escapeHtml(button.textContent)}</button>`
    ).join("");
    return `
      <article class="store-mobile-card">
        <div class="store-card-head">
          <h3>${escapeHtml(item.storeName)}</h3>
          <span class="badge gray">${escapeHtml(cellText(row, 1))}</span>
        </div>
        <div class="store-card-grid">
          <div><span>승인 원가</span><strong>${escapeHtml(cellText(row, 2))}</strong></div>
          <div><span>진열장 배분</span><strong>${escapeHtml(cellText(row, 3))}</strong></div>
          <div><span>원가 합계</span><strong>${escapeHtml(cellText(row, 4))}</strong></div>
          <div><span>마진율</span><strong>${escapeHtml(cellText(row, 5))}%</strong></div>
          <div><span>공급가</span><strong>${escapeHtml(cellText(row, 6))}</strong></div>
          <div><span>부가세</span><strong>${escapeHtml(cellText(row, 7))}</strong></div>
          <div><span>최종 견적금액</span><strong>${escapeHtml(cellText(row, 8))}</strong></div>
        </div>
        <div class="store-card-actions">${buttons}</div>
      </article>`;
  }).join("");
}
function setEmptyRow(panel, visibleCount) {
  panel.querySelector(".store-tabs-empty-row")?.remove();
  if (visibleCount > 0) return;
  const tbody = panel.querySelector("tbody");
  const colCount = panel.querySelectorAll("thead th").length || 1;
  const tr = document.createElement("tr");
  tr.className = "store-tabs-empty-row";
  tr.innerHTML = `<td colspan="${colCount}">${mode === "진행중" ? "진행중인 매장이 없습니다." : "문서 생성 대상 완료 매장이 없습니다."}</td>`;
  tbody?.appendChild(tr);
}
async function applyTabs(forceRefresh = false) {
  const panel = findStorePanel();
  if (!panel) return;
  applying = true;
  try {
    await refreshData(forceRefresh);
    const classified = classifyRows(panel);
    const progress = classified.filter((item) => !item.hardcopy && !item.completed).length;
    const completed = classified.filter((item) => !item.hardcopy && item.completed).length;
    ensureTabs(panel, { progress, completed });
    const visible = visibleItems(classified);
    classified.forEach((item) => { item.row.style.display = visible.includes(item) ? "" : "none"; });
    const countButton = panel.querySelector(".panel-head button");
    if (countButton) countButton.textContent = `${visible.length}개 매장`;
    ensureMobileCards(panel, visible);
    setEmptyRow(panel, visible.length);
  } finally {
    applying = false;
  }
}

document.addEventListener("click", (event) => {
  const tab = event.target.closest?.("[data-store-tab]");
  if (tab) {
    event.preventDefault();
    event.stopPropagation();
    mode = tab.dataset.storeTab || "진행중";
    applyTabs(true);
    return;
  }
  const action = event.target.closest?.("[data-store-mobile-action]");
  if (action) {
    event.preventDefault();
    event.stopPropagation();
    const [rowIndex, buttonIndex] = action.dataset.storeMobileAction.split(":").map(Number);
    const panel = findStorePanel();
    const targetButton = panel?.querySelector(`tr[data-store-tabs-index="${rowIndex}"] td:last-child button:nth-of-type(${buttonIndex + 1})`);
    targetButton?.click();
  }
}, true);

const observer = new MutationObserver(() => {
  if (applying) return;
  window.clearTimeout(window.__storeTabsTimer);
  window.__storeTabsTimer = window.setTimeout(() => applyTabs(false), 120);
});
observer.observe(document.body, { childList: true, subtree: true });
applyTabs(true);
