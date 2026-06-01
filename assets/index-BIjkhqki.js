import{createClient as _}from"https://esm.sh/@supabase/supabase-js@2.49.1";(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const n of document.querySelectorAll('link[rel="modulepreload"]'))s(n);new MutationObserver(n=>{for(const r of n)if(r.type==="childList")for(const i of r.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&s(i)}).observe(document,{childList:!0,subtree:!0});function a(n){const r={};return n.integrity&&(r.integrity=n.integrity),n.referrerPolicy&&(r.referrerPolicy=n.referrerPolicy),n.crossOrigin==="use-credentials"?r.credentials="include":n.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function s(n){if(n.ep)return;n.ep=!0;const r=a(n);fetch(n.href,r)}})();const C="https://yqemtsbdnypgmkuyncxh.supabase.co",q="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlxZW10c2JkbnlwZ21rdXluY3hoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODAyNjYwMTUsImV4cCI6MjA5NTg0MjAxNX0.gwgdCncqRKKgC8ebj7qIdT-vA4J-wOVd2O9DSa7xEOs",u=_(C,q),l={payments:[{id:1,store:"성수 플래그십",vendor:"한빛전기",amount:184e5,status:"승인",requested_at:"2026-05-28"},{id:2,store:"부산 센텀",vendor:"도원인테리어",amount:327e5,status:"신청",requested_at:"2026-05-27"},{id:3,store:"대전 둔산",vendor:"서진설비",amount:98e5,status:"반려",requested_at:"2026-05-26"},{id:4,store:"제주 노형",vendor:"제이건축",amount:241e5,status:"승인",requested_at:"2026-05-25"}],stores:[{id:1,name:"성수 플래그십",area:52,status:"완료",budget:21e7,spent:1984e5},{id:2,name:"부산 센텀",area:47,status:"진행중",budget:186e6,spent:1227e5},{id:3,name:"대전 둔산",area:39,status:"진행중",budget:144e6,spent:882e5},{id:4,name:"제주 노형",area:42,status:"미착공",budget:158e6,spent:0}],vendors:[{id:1,name:"도원인테리어",category:"시공",bank:"신한은행",account_number:"110-000-000001",account_holder:"도원인테리어",risk:"정상",total:1245e5},{id:2,name:"한빛전기",category:"전기",bank:"국민은행",account_number:"004-000-000002",account_holder:"한빛전기",risk:"정상",total:738e5},{id:3,name:"서진설비",category:"설비",bank:"하나은행",account_number:"352-000-000003",account_holder:"서진설비",risk:"증빙확인",total:412e5}]},I=["대시보드","엑셀 업로드","결제 신청","업체/계좌 관리","매장별 공사 관리","진열장 원가 배분","견적서 생성","계약서 생성","은행 이체 파일 생성","관리자 설정"],D={"엑셀 업로드":["결제 신청 내역 엑셀 업로드","필수 컬럼 검증","중복/오류 행 표시"],"진열장 원가 배분":["매장별 진열장 비용 배분","공용 비용 자동 분배","평당 원가 반영"],"견적서 생성":["매장/업체 기준 견적서 생성","공사항목별 금액 자동 합산","PDF/문서 다운로드"],"계약서 생성":["업체 정보 기반 계약서 생성","계좌/사업자 정보 자동 반영","계약 상태 관리"],"은행 이체 파일 생성":["승인된 결제 건만 추출","은행 업로드용 파일 생성","이체 전 검증"],"관리자 설정":["사용자 권한","승인 단계","상태/분류 코드 관리"]};let g=l,c="대시보드";const m=e=>new Intl.NumberFormat("ko-KR",{style:"currency",currency:"KRW",maximumFractionDigits:0}).format(e||0),x=()=>new Date().toISOString().slice(0,10),N=e=>Number(String(e).replace(/[^\d]/g,"")),v=e=>({승인:"green",신청:"amber",반려:"red",진행중:"blue",완료:"green",미착공:"gray",정상:"green",증빙확인:"amber"})[e]||"gray";async function y(){if(!u)return l;const[e,t,a]=await Promise.all([u.from("payments").select("*").order("requested_at",{ascending:!1}).order("id",{ascending:!1}).limit(12),u.from("stores").select("*").order("id",{ascending:!0}),u.from("vendors").select("*").order("id",{ascending:!0})]);return{payments:e.error?l.payments:e.data,stores:t.error?l.stores:t.data,vendors:a.error?l.vendors:a.data}}function A(e,t,a){return e.payments.find(s=>{const n=s.vendor.trim()===t.trim(),r=Math.abs(s.amount-a)/Math.max(a,1);return n&&r<=.1})}async function O(e){e.preventDefault();const t=e.currentTarget,a=t.querySelector("button[type='submit']"),s=t.querySelector("[data-form-message]"),n=new FormData(t),r=String(n.get("store")||"").trim(),i=String(n.get("vendor")||"").trim(),b=N(n.get("amount")),p=A(g,i,b);if(!r||!i||!b){s.textContent="매장명, 업체명, 신청 금액을 모두 입력해 주세요.",s.className="form-message error";return}a.disabled=!0,a.textContent="저장 중",s.textContent=p?`중복 의심: ${p.store} / ${m(p.amount)} 건과 비슷합니다.`:"신청 건을 저장하고 있습니다.",s.className=p?"form-message warning":"form-message";const o={store:r,vendor:i,amount:b,status:"신청",requested_at:x()};if(!u)l.payments=[{id:Date.now(),...o},...l.payments];else{const{error:d}=await u.from("payments").insert(o);if(d){a.disabled=!1,a.textContent="검토 요청 생성",s.textContent=`저장 실패: ${d.message}`,s.className="form-message error";return}}t.reset(),g=await y(),h(p?"신청이 저장됐습니다. 중복 의심 건은 결제 검토에서 확인하세요.":"신청이 저장됐습니다.")}async function E(e){e.preventDefault();const t=e.currentTarget,a=t.querySelector("button[type='submit']"),s=t.querySelector("[data-vendor-message]"),n=new FormData(t),r={name:String(n.get("name")||"").trim(),category:String(n.get("category")||"").trim(),bank:String(n.get("bank")||"").trim(),account_number:String(n.get("account_number")||"").trim(),account_holder:String(n.get("account_holder")||"").trim(),risk:"정상",total:0};if(!r.name||!r.category||!r.bank||!r.account_number||!r.account_holder){s.textContent="업체명, 분류, 은행, 계좌번호, 예금주를 모두 입력해 주세요.",s.className="form-message error";return}if(a.disabled=!0,a.textContent="저장 중",s.textContent="업체/계좌 정보를 저장하고 있습니다.",s.className="form-message",!u)l.vendors=[{id:Date.now(),...r},...l.vendors];else{const{error:i}=await u.from("vendors").insert(r);if(i){a.disabled=!1,a.textContent="업체 저장",s.textContent=`저장 실패: ${i.message}`,s.className="form-message error";return}}t.reset(),g=await y(),c="업체/계좌 관리",h("업체/계좌 정보가 저장됐습니다.")}function L(e){const t=e.stores.filter(o=>o.status==="완료").length,a=e.stores.filter(o=>o.status==="진행중").length,s=e.payments.filter(o=>o.status==="승인").reduce((o,d)=>o+d.amount,0),n=e.stores.reduce((o,d)=>o+d.spent,0),r=e.payments.filter(o=>o.status==="신청").length,i=e.vendors.filter(o=>o.risk==="증빙확인").length,b=e.payments.filter(o=>o.amount>3e7).length,p=Math.round(n/Math.max(e.stores.reduce((o,d)=>o+d.area,0),1));return[["완료된 매장",`${t}개`,"준공 및 정산 완료"],["진행중인 매장",`${a}개`,"시공 또는 비용 검수 중"],["승인된 공사비",m(s),"지급 승인 완료"],["실제 사용액",m(n),"전체 매장 누적"],["대기중인 결제",`${r}건`,"승인 전 검토 필요"],["증빙 미비",`${i}건`,"자료 보완 요청"],["중복 의심",`${b}건`,"금액/업체 패턴 확인"],["평균 평당 원가",m(p),"실사용액 기준"]]}function f(e,t){return`
    <div class="table-wrap">
      <table>
        <thead><tr>${e.map(a=>`<th>${a}</th>`).join("")}</tr></thead>
        <tbody>${t.join("")}</tbody>
      </table>
    </div>
  `}function $(e){return e.payments.map(t=>`
      <tr>
        <td>${t.store}</td>
        <td>${t.vendor}</td>
        <td class="money">${m(t.amount)}</td>
        <td><span class="badge ${v(t.status)}">${t.status}</span></td>
        <td>${t.requested_at}</td>
      </tr>`)}function w(e){return e.stores.map(t=>`
      <tr>
        <td>${t.name}</td>
        <td>${t.area}평</td>
        <td class="money">${m(t.budget)}</td>
        <td class="money">${m(t.spent)}</td>
        <td><span class="badge ${v(t.status)}">${t.status}</span></td>
      </tr>`)}function k(e){return e.vendors.map(t=>`
      <tr>
        <td>${t.name}</td>
        <td>${t.category}</td>
        <td>${t.bank}</td>
        <td>${t.account_number||"-"}</td>
        <td>${t.account_holder||"-"}</td>
        <td class="money">${m(t.total)}</td>
        <td><span class="badge ${v(t.risk)}">${t.risk}</span></td>
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
  `}function F(){return`
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
  `}function M(e){return`
    <section class="kpis">
      ${L(e).map(([t,a,s])=>`
            <article class="kpi">
              <span>${t}</span>
              <strong>${a}</strong>
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
        ${f(["업체","분류","은행","계좌번호","예금주","누적 지급","상태"],k(e))}
      </article>
      ${S()}
    </section>
  `}function R(e){return`
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
  `}function V(e){return`
    <section class="grid two">
      ${F()}
      <article class="panel">
        <div class="panel-head">
          <h2>업체/계좌 목록</h2>
          <button>${e.vendors.length}개 등록</button>
        </div>
        ${f(["업체","분류","은행","계좌번호","예금주","누적 지급","상태"],k(e))}
      </article>
    </section>
  `}function j(e){return`
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
  `}function P(e){const t=D[e]||["기능 범위 정의","입력 항목 확정","데이터 연결"];return`
    <section class="panel empty-panel">
      <h2>${e}</h2>
      <p>이 메뉴는 다음 단계에서 구현할 기능입니다. 지금은 확인해야 할 항목을 먼저 고정해둔 상태입니다.</p>
      <div class="check-list">
        ${t.map(a=>`<span>${a}</span>`).join("")}
      </div>
    </section>
  `}function J(e){return c==="대시보드"?M(e):c==="결제 신청"?R(e):c==="업체/계좌 관리"?V(e):c==="매장별 공사 관리"?j(e):P(c)}function h(e=""){const t=document.querySelector("#app");t.innerHTML=`
    <aside class="sidebar">
      <div class="brand">
        <span class="brand-mark">H</span>
        <div>
          <strong>HAKA Construction</strong>
          <small>공사비 관리 시스템</small>
        </div>
      </div>
      <nav>
        ${I.map(n=>`<button data-view="${n}" class="${n===c?"active":""}">${n}</button>`).join("")}
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
      ${J(g)}
    </main>
  `,document.querySelectorAll("[data-view]").forEach(n=>{n.addEventListener("click",()=>{c=n.dataset.view,h()})}),document.querySelectorAll("[data-view-link]").forEach(n=>{n.addEventListener("click",()=>{c=n.dataset.viewLink,h()})});const a=document.querySelector("#payment-form");a&&a.addEventListener("submit",O);const s=document.querySelector("#vendor-form");s&&s.addEventListener("submit",E)}y().then(e=>{g=e,h()});
