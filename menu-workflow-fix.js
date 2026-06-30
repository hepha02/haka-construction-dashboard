(() => {
  if (window.__hakaMenuWorkflowFix) return;
  window.__hakaMenuWorkflowFix = true;

  const REQUEST_LABEL = "결제신청";
  const REVIEW_LABEL = "결제신청 검토";
  const TRANSFER_OLD_LABEL = "은행 이체 파일 생성";
  const TRANSFER_LABEL = "은행 이체 전표";
  const ADMIN_SETTING_LABEL = "관리자 설정";
  const MODE_KEY = "haka_payment_menu_mode_v1";

  function clean(value) {
    return String(value || "").replace(/\s+/g, " ").trim();
  }

  function isAdminMenu() {
    return Array.from(document.querySelectorAll("nav button")).some((button) => clean(button.textContent).includes(ADMIN_SETTING_LABEL));
  }

  function navButtons() {
    return Array.from(document.querySelectorAll("nav button"));
  }

  function topTitle() {
    return document.querySelector(".topbar h1");
  }

  function findNavButton(label) {
    return navButtons().find((button) => clean(button.textContent).includes(label));
  }

  function isActivePaymentPage() {
    const title = clean(topTitle()?.textContent);
    return title.includes(REQUEST_LABEL) || title.includes(REVIEW_LABEL);
  }

  function clickOriginalPayment(mode) {
    sessionStorage.setItem(MODE_KEY, mode);
    const original = findNavButton(REQUEST_LABEL);
    if (original) original.click();
  }

  function setButtonText(button, text) {
    if (!button || clean(button.textContent) === text) return;
    button.textContent = text;
  }

  function applyNav() {
    const admin = isAdminMenu();
    navButtons().forEach((button) => {
      const label = clean(button.textContent);
      if (label.includes(TRANSFER_OLD_LABEL)) setButtonText(button, TRANSFER_LABEL);
      if (button.dataset.view && button.dataset.view.includes(TRANSFER_OLD_LABEL)) button.dataset.view = TRANSFER_OLD_LABEL;
    });

    const paymentButton = findNavButton(REQUEST_LABEL);
    if (!paymentButton) return;

    if (admin) {
      setButtonText(paymentButton, REVIEW_LABEL);
      paymentButton.dataset.workflowProxy = "review";
      if (!paymentButton.dataset.workflowBound) {
        paymentButton.dataset.workflowBound = "true";
        paymentButton.addEventListener("click", () => sessionStorage.setItem(MODE_KEY, "review"), true);
      }
    } else {
      setButtonText(paymentButton, REQUEST_LABEL);
      paymentButton.dataset.workflowProxy = "request";
      if (!paymentButton.dataset.workflowBound) {
        paymentButton.dataset.workflowBound = "true";
        paymentButton.addEventListener("click", () => sessionStorage.setItem(MODE_KEY, "request"), true);
      }
    }
  }

  function updateViewLinks() {
    document.querySelectorAll("[data-view-link]").forEach((button) => {
      const view = button.getAttribute("data-view-link") || "";
      const text = clean(button.textContent);
      if (view.includes(TRANSFER_OLD_LABEL) || text.includes(TRANSFER_OLD_LABEL)) {
        button.textContent = text.replace(TRANSFER_OLD_LABEL, TRANSFER_LABEL).replace("상세 보기", "전표 보기");
      }
      if (view.includes(REQUEST_LABEL) && isAdminMenu()) {
        button.textContent = REVIEW_LABEL;
        button.addEventListener("click", () => sessionStorage.setItem(MODE_KEY, "review"), true);
      }
    });
  }

  function insertRequestStatusGuide(panel) {
    if (!panel || panel.querySelector(".request-status-guide")) return;
    const guide = document.createElement("div");
    guide.className = "request-status-guide";
    guide.textContent = "아래 신청내역에서 승인 대기, 승인, 반려 상태를 직접 확인할 수 있습니다.";
    panel.querySelector(".panel-head")?.insertAdjacentElement("afterend", guide);
  }

  function applyPaymentPageMode() {
    if (!isActivePaymentPage()) return;
    const admin = isAdminMenu();
    const mode = admin ? "review" : "request";
    sessionStorage.setItem(MODE_KEY, mode);

    const title = topTitle();
    if (title) title.textContent = admin ? REVIEW_LABEL : REQUEST_LABEL;

    const paymentPanel = Array.from(document.querySelectorAll("article.panel"))
      .find((panel) => clean(panel.textContent).includes("결제 신청 검토") || clean(panel.textContent).includes("승인대기") || panel.querySelector(".payment-review-card"));
    const formPanel = Array.from(document.querySelectorAll("article.panel"))
      .find((panel) => panel.querySelector("form") && clean(panel.textContent).includes("결제"));
    const transferPanel = document.querySelector(".transfer-download-panel");

    if (admin) {
      if (formPanel) formPanel.style.display = "none";
      if (paymentPanel) {
        paymentPanel.style.gridColumn = "1 / -1";
        const heading = paymentPanel.querySelector(".panel-head h2");
        if (heading) heading.textContent = REVIEW_LABEL;
        let notice = paymentPanel.querySelector(".review-status-guide");
        if (!notice) {
          notice = document.createElement("div");
          notice.className = "review-status-guide";
          notice.textContent = "관리자는 날짜 범위로 신청건을 조회하고, 선택 승인/반려 및 상태별 확인을 진행합니다. 이체파일 생성은 은행 이체 전표 메뉴에서 처리합니다.";
          paymentPanel.querySelector(".panel-head")?.insertAdjacentElement("afterend", notice);
        }
      }
      if (transferPanel) transferPanel.style.display = "none";
      document.querySelectorAll("[data-bank-transfer-download]").forEach((button) => {
        if (button.closest(".bulk-actions")) button.style.display = "none";
      });
    } else {
      if (formPanel) formPanel.style.display = "";
      if (paymentPanel) {
        const heading = paymentPanel.querySelector(".panel-head h2");
        if (heading) heading.textContent = "신청내역 상태 확인";
        insertRequestStatusGuide(paymentPanel);
      }
      if (transferPanel) transferPanel.style.display = "none";
      document.querySelectorAll("[data-payment-status], [data-approve-selected-payments], [data-select-pending-payments], [data-bank-transfer-download]").forEach((node) => {
        node.closest("button, label")?.style && (node.closest("button, label").style.display = "none");
      });
    }
  }

  function applyTransferPage() {
    const title = topTitle();
    if (!title) return;
    const titleText = clean(title.textContent);
    if (!titleText.includes(TRANSFER_OLD_LABEL) && !titleText.includes(TRANSFER_LABEL)) return;
    title.textContent = TRANSFER_LABEL;

    document.querySelectorAll("article.panel h2").forEach((heading) => {
      const text = clean(heading.textContent);
      if (text.includes("날짜별") || text.includes("지급")) heading.textContent = "은행 이체 전표 작성";
      if (text.includes("조회 요약")) heading.textContent = "조회 및 이체 요약";
    });

    const firstPanel = document.querySelector("article.panel");
    if (firstPanel && !firstPanel.querySelector(".transfer-voucher-guide")) {
      const guide = document.createElement("div");
      guide.className = "transfer-voucher-guide";
      guide.textContent = "승인 완료된 결제건을 날짜 범위로 조회한 뒤, 선택한 건을 하나의 이체 전표로 묶어 은행 업로드용 엑셀을 생성합니다. 이미 생성된 건은 중복 방지 대상으로 표시됩니다.";
      firstPanel.querySelector(".panel-head")?.insertAdjacentElement("afterend", guide);
    }

    document.querySelectorAll("[data-bank-transfer-download]").forEach((button) => {
      const text = clean(button.textContent);
      if (text.includes("엑셀") || text.includes("다운로드") || text.includes("이체")) {
        button.textContent = text.includes("선택") ? text : "조회건 전표/엑셀 생성";
      }
    });
  }

  function applyLabels() {
    applyNav();
    updateViewLinks();
    applyPaymentPageMode();
    applyTransferPage();
  }

  const style = document.createElement("style");
  style.textContent = `
    .request-status-guide,
    .review-status-guide,
    .transfer-voucher-guide {
      margin: 0 0 14px;
      padding: 12px 14px;
      border: 1px solid #d9e7e2;
      border-radius: 8px;
      background: #f8fbfa;
      color: #3f5064;
      font-size: 13px;
      font-weight: 800;
      line-height: 1.5;
      word-break: keep-all;
    }
    nav button[data-workflow-proxy="review"]::after,
    nav button[data-workflow-proxy="request"]::after {
      content: "";
    }
  `;
  document.head.appendChild(style);

  document.addEventListener("click", (event) => {
    const button = event.target.closest?.("nav button");
    if (!button) return;
    const label = clean(button.textContent);
    if (label.includes(REVIEW_LABEL)) sessionStorage.setItem(MODE_KEY, "review");
    if (label.includes(REQUEST_LABEL) && !label.includes(REVIEW_LABEL)) sessionStorage.setItem(MODE_KEY, "request");
  }, true);

  const observer = new MutationObserver(() => {
    clearTimeout(window.__hakaMenuWorkflowTimer);
    window.__hakaMenuWorkflowTimer = setTimeout(applyLabels, 120);
  });
  observer.observe(document.documentElement, { childList: true, subtree: true });
  applyLabels();
  setTimeout(applyLabels, 500);
  setTimeout(applyLabels, 1500);
})();
