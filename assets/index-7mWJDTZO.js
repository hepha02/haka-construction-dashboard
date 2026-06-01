import{createClient as q}from"https://esm.sh/@supabase/supabase-js@2.49.1";(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const a of document.querySelectorAll('link[rel="modulepreload"]'))s(a);new MutationObserver(a=>{for(const o of a)if(o.type==="childList")for(const i of o.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&s(i)}).observe(document,{childList:!0,subtree:!0});function n(a){const o={};return a.integrity&&(o.integrity=a.integrity),a.referrerPolicy&&(o.referrerPolicy=a.referrerPolicy),a.crossOrigin==="use-credentials"?o.credentials="include":a.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function s(a){if(a.ep)return;a.ep=!0;const o=n(a);fetch(a.href,o)}})();const A="https://yqemtsbdnypgmkuyncxh.supabase.co",_="sb_publishable_NLGUYb8d4jA2IRyaGza4lw_30c-gIYj",p=q(A,_),m={payments:[{id:1,store:"성수 플래그십",vendor:"한빛전기",amount:184e5,status:"승인",requested_at:"2026-05-28"},{id:2,store:"부산 센텀",vendor:"도원인테리어",amount:327e5,status:"신청",requested_at:"2026-05-27"},{id:3,store:"대전 둔산",vendor:"서진설비",amount:98e5,status:"반려",requested_at:"2026-05-26"},{id:4,store:"제주 노형",vendor:"제이건축",amount:241e5,status:"승인",requested_at:"2026-05-25"}],stores:[{id:1,name:"성수 플래그십",area:52,status:"완료",budget:21e7,spent:1984e5},{id:2,name:"부산 센텀",area:47,status:"진행중",budget:186e6,spent:1227e5},{id:3,name:"대전 둔산",area:39,status:"진행중",budget:144e6,spent:882e5},{id:4,name:"제주 노형",area:42,status:"미착공",budget:158e6,spent:0}],vendors:[{id:1,name:"도원인테리어",category:"시공",bank:"신한은행",risk:"정상",total:1245e5},{id:2,name:"한빛전기",category:"전기",bank:"국민은행",risk:"정상",total:738e5},{id:3,name:"서진설비",category:"설비",bank:"하나은행",risk:"증빙확인",total:412e5}]},D=["대시보드","엑셀 업로드","결제 신청","업체/계좌 관리","매장별 공사 관리","진열장 원가 배분","견적서 생성","계약서 생성","은행 이체 파일 생성","관리자 설정"],L={"엑셀 업로드":["결제 신청 내역 엑셀 업로드","필수 컬럼 검증","중복/오류 행 표시"],"진열장 원가 배분":["매장별 진열장 비용 배분","공용 비용 자동 분배","평당 원가 반영"],"견적서 생성":["매장/업체 기준 견적서 생성","공사항목별 금액 자동 합산","PDF/문서 다운로드"],"계약서 생성":["업체 정보 기반 계약서 생성","계좌/사업자 정보 자동 반영","계약 상태 관리"],"은행 이체 파일 생성":["승인된 결제 건만 추출","은행 업로드용 파일 생성","이체 전 검증"],"관리자 설정":["사용자 권한","승인 단계","상태/분류 코드 관리"]};let g=m,c="대시보드";const d=e=>new Intl.NumberFormat("ko-KR",{style:"currency",currency:"KRW",maximumFractionDigits:0}).format(e||0),N=()=>new Date().toISOString().slice(0,10),C=e=>Number(String(e).replace(/[^\d]/g,"")),h=e=>({승인:"green",신청:"amber",반려:"red",진행중:"blue",완료:"green",미착공:"gray",정상:"green",증빙확인:"amber"})[e]||"gray";async function y(){if(!p)return m;const[e,t,n]=await Promise.all([p.from("payments").select("*").order("requested_at",{ascending:!1}).order("id",{ascending:!1}).limit(12),p.from("stores").select("*").order("id",{ascending:!0}),p.from("vendors").select("*").order("id",{ascending:!0})]);return{payments:e.error?m.payments:e.data,stores:t.error?m.stores:t.data,vendors:n.error?m.vendors:n.data}}function P(e,t,n){return e.payments.find(s=>{const a=s.vendor.trim()===t.trim(),o=Math.abs(s.amount-n)/Math.max(n,1);return a&&o<=.1})}async function R(e){e.preventDefault();const t=e.currentTarget,n=t.querySelector("button[type='submit']"),s=t.querySelector("[data-form-message]"),a=new FormData(t),o=String(a.get("store")||"").trim(),i=String(a.get("vendor")||"").trim(),b=C(a.get("amount")),u=P(g,i,b);if(!o||!i||!b){s.textContent="매장명, 업체명, 신청 금액을 모두 입력해 주세요.",s.className="form-message error";return}n.disabled=!0,n.textContent="저장 중",s.textContent=u?`중복 의심: ${u.store} / ${d(u.amount)} 건과 비슷합니다.`:"신청 건을 저장하고 있습니다.",s.className=u?"form-message warning":"form-message";const r={store:o,vendor:i,amount:b,status:"신청",requested_at:N()};if(!p)m.payments=[{id:Date.now(),...r},...m.payments];else{const{error:l}=await p.from("payments").insert(r);if(l){n.disabled=!1,n.textContent="검토 요청 생성",s.textContent=`저장 실패: ${l.message}`,s.className="form-message error";return}}t.reset(),g=await y(),v(u?"신청이 저장됐습니다. 중복 의심 건은 결제 검토에서 확인하세요.":"신청이 저장됐습니다.")}function x(e){const t=e.stores.filter(r=>r.status==="완료").length,n=e.stores.filter(r=>r.status==="진행중").length,s=e.payments.filter(r=>r.status==="승인").reduce((r,l)=>r+l.amount,0),a=e.stores.reduce((r,l)=>r+l.spent,0),o=e.payments.filter(r=>r.status==="신청").length,i=e.vendors.filter(r=>r.risk==="증빙확인").length,b=e.payments.filter(r=>r.amount>3e7).length,u=Math.round(a/Math.max(e.stores.reduce((r,l)=>r+l.area,0),1));return[["완료된 매장",`${t}개`,"준공 및 정산 완료"],["진행중인 매장",`${n}개`,"시공 또는 비용 검수 중"],["승인된 공사비",d(s),"지급 승인 완료"],["실제 사용액",d(a),"전체 매장 누적"],["대기중인 결제",`${o}건`,"승인 전 검토 필요"],["증빙 미비",`${i}건`,"자료 보완 요청"],["중복 의심",`${b}건`,"금액/업체 패턴 확인"],["평균 평당 원가",d(u),"실사용액 기준"]]}function f(e,t){return`
    <div class="table-wrap">
      <table>
        <thead><tr>${e.map(n=>`<th>${n}</th>`).join("")}</tr></thead>
        <tbody>${t.join("")}</tbody>
      </table>
    </div>
  `}function $(e){return e.payments.map(t=>`
      <tr>
        <td>${t.store}</td>
        <td>${t.vendor}</td>
        <td class="money">${d(t.amount)}</td>
        <td><span class="badge ${h(t.status)}">${t.status}</span></td>
        <td>${t.requested_at}</td>
      </tr>`)}function w(e){return e.stores.map(t=>`
      <tr>
        <td>${t.name}</td>
        <td>${t.area}평</td>
        <td class="money">${d(t.budget)}</td>
        <td class="money">${d(t.spent)}</td>
        <td><span class="badge ${h(t.status)}">${t.status}</span></td>
      </tr>`)}function k(e){return e.vendors.map(t=>`
      <tr>
        <td>${t.name}</td>
        <td>${t.category}</td>
        <td>${t.bank}</td>
        <td class="money">${d(t.total)}</td>
        <td><span class="badge ${h(t.risk)}">${t.risk}</span></td>
      </tr>`)}function S(){return`
    <article class="panel form-panel">
      <div class="panel-head">
        <h2>결제 신청 입력</h2>
      </div>
      <div class="notice">같은 업체와 비슷한 금액의 최근 신청 건이 있으면 중복 의심으로 표시됩니다.</div>
      <form id="payment-form">
        <label>매장명<input name="store" placeholder="예: 성수 플래그십" autocomplete="off" /></label>
        <label>협력업체<input name="vendor" placeholder="업체명을 입력" autocomplete="off" /></label>
        <label>신청 금액<input name="amount" inputmode="numeric" placeholder="예: 18500000" autocomplete="off" /></label>
        <p class="form-message" data-form-message></p>
        <button class="primary wide" type="submit">검토 요청 생성</button>
      </form>
    </article>
  `}function E(e){return`
    <section class="kpis">
      ${x(e).map(([t,n,s])=>`
            <article class="kpi">
              <span>${t}</span>
              <strong>${n}</strong>
              <small>${s}</small>
            </article>`).join("")}
    </section>

    <section class="grid two">
      <article class="panel">
        <div class="panel-head">
          <h2>최근 결제 신청</h2>
          <button data-view-link="결제 신청">전체 보기</button>
        </div>
        ${f(["매장","업체","금액","상태","신청일"],$(e))}
      </article>

      <article class="panel">
        <div class="panel-head">
          <h2>매장 공사 현황</h2>
          <button data-view-link="매장별 공사 관리">관리</button>
        </div>
        ${f(["매장","면적","예산","사용액","상태"],w(e))}
      </article>
    </section>

    <section class="grid lower">
      <article class="panel">
        <div class="panel-head">
          <h2>주요 협력업체</h2>
          <button data-view-link="업체/계좌 관리">업체 추가</button>
        </div>
        ${f(["업체","분류","은행","누적 지급","상태"],k(e))}
      </article>
      ${S()}
    </section>
  `}function O(e){return`
    <section class="grid two">
      ${S()}
      <article class="panel">
        <div class="panel-head">
          <h2>결제 신청 검토</h2>
          <button>승인 대기 ${e.payments.filter(t=>t.status==="신청").length}건</button>
        </div>
        ${f(["매장","업체","금액","상태","신청일"],$(e))}
      </article>
    </section>
  `}function j(e){return`
    <section class="grid two">
      <article class="panel">
        <div class="panel-head">
          <h2>업체/계좌 관리</h2>
          <button>업체 추가 준비중</button>
        </div>
        ${f(["업체","분류","은행","누적 지급","상태"],k(e))}
      </article>
      <article class="panel empty-panel">
        <h2>이 화면에서 체크할 것</h2>
        <p>업체명, 공종 분류, 은행/계좌 정보, 증빙 상태, 누적 지급액을 관리합니다.</p>
      </article>
    </section>
  `}function M(e){return`
    <section class="grid two">
      <article class="panel">
        <div class="panel-head">
          <h2>매장별 공사 관리</h2>
          <button>매장 추가 준비중</button>
        </div>
        ${f(["매장","면적","예산","사용액","상태"],w(e))}
      </article>
      <article class="panel empty-panel">
        <h2>이 화면에서 체크할 것</h2>
        <p>매장별 면적, 예산, 실제 사용액, 공사 진행 상태를 확인하고 수정하게 됩니다.</p>
      </article>
    </section>
  `}function V(e){const t=L[e]||["기능 범위 정의","입력 항목 확정","데이터 연결"];return`
    <section class="panel empty-panel">
      <h2>${e}</h2>
      <p>이 메뉴는 다음 단계에서 구현할 기능입니다. 지금은 확인해야 할 항목을 먼저 고정해둔 상태입니다.</p>
      <div class="check-list">
        ${t.map(n=>`<span>${n}</span>`).join("")}
      </div>
    </section>
  `}function F(e){return c==="대시보드"?E(e):c==="결제 신청"?O(e):c==="업체/계좌 관리"?j(e):c==="매장별 공사 관리"?M(e):V(c)}function v(e=""){const t=document.querySelector("#app");t.innerHTML=`
    <aside class="sidebar">
      <div class="brand">
        <span class="brand-mark">H</span>
        <div>
          <strong>HAKA Construction</strong>
          <small>공사비 관리 시스템</small>
        </div>
      </div>
      <nav>
        ${D.map(s=>`<button data-view="${s}" class="${s===c?"active":""}">${s}</button>`).join("")}
      </nav>
    </aside>
    <main class="shell">
      <header class="topbar">
        <div>
          <p>Admin Console</p>
          <h1>${c}</h1>
        </div>
        <div class="actions">
          <button data-view-link="엑셀 업로드">엑셀 업로드</button>
          <button class="primary" data-view-link="결제 신청">결제 신청</button>
        </div>
      </header>

      ${e?`<div class="toast">${e}</div>`:""}
      ${F(g)}
    </main>
  `,document.querySelectorAll("[data-view]").forEach(s=>{s.addEventListener("click",()=>{c=s.dataset.view,v()})}),document.querySelectorAll("[data-view-link]").forEach(s=>{s.addEventListener("click",()=>{c=s.dataset.viewLink,v()})});const n=document.querySelector("#payment-form");n&&n.addEventListener("submit",R)}y().then(e=>{g=e,v()});
