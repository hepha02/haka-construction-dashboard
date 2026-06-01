import{createClient as C}from"https://esm.sh/@supabase/supabase-js@2.49.1";(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const a of document.querySelectorAll('link[rel="modulepreload"]'))r(a);new MutationObserver(a=>{for(const n of a)if(n.type==="childList")for(const i of n.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&r(i)}).observe(document,{childList:!0,subtree:!0});function s(a){const n={};return a.integrity&&(n.integrity=a.integrity),a.referrerPolicy&&(n.referrerPolicy=a.referrerPolicy),a.crossOrigin==="use-credentials"?n.credentials="include":a.crossOrigin==="anonymous"?n.credentials="omit":n.credentials="same-origin",n}function r(a){if(a.ep)return;a.ep=!0;const n=s(a);fetch(a.href,n)}})();const q="https://yqemtsbdnypgmkuyncxh.supabase.co",x="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlxZW10c2JkbnlwZ21rdXluY3hoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODAyNjYwMTUsImV4cCI6MjA5NTg0MjAxNX0.gwgdCncqRKKgC8ebj7qIdT-vA4J-wOVd2O9DSa7xEOs",u=C(q,x),l={payments:[{id:1,store:"성수 플래그십",vendor:"한빛전기",amount:184e5,status:"승인",requested_at:"2026-05-28"},{id:2,store:"부산 센텀",vendor:"도원인테리어",amount:327e5,status:"신청",requested_at:"2026-05-27"},{id:3,store:"대전 둔산",vendor:"서진설비",amount:98e5,status:"반려",requested_at:"2026-05-26"},{id:4,store:"제주 노형",vendor:"제이건축",amount:241e5,status:"승인",requested_at:"2026-05-25"}],stores:[{id:1,name:"성수 플래그십",area:52,status:"완료",budget:21e7,spent:1984e5},{id:2,name:"부산 센텀",area:47,status:"진행중",budget:186e6,spent:1227e5},{id:3,name:"대전 둔산",area:39,status:"진행중",budget:144e6,spent:882e5},{id:4,name:"제주 노형",area:42,status:"미착공",budget:158e6,spent:0}],vendors:[{id:1,name:"도원인테리어",category:"시공",bank:"신한은행",account_number:"110-000-000001",account_holder:"도원인테리어",risk:"정상",total:1245e5},{id:2,name:"한빛전기",category:"전기",bank:"국민은행",account_number:"004-000-000002",account_holder:"한빛전기",risk:"정상",total:738e5},{id:3,name:"서진설비",category:"설비",bank:"하나은행",account_number:"352-000-000003",account_holder:"서진설비",risk:"증빙확인",total:412e5}]},D=["대시보드","엑셀 업로드","결제 신청","업체/계좌 관리","매장별 공사 관리","진열장 원가 배분","견적서 생성","계약서 생성","은행 이체 파일 생성","관리자 설정"],N={"엑셀 업로드":["결제 신청 내역 엑셀 업로드","필수 컬럼 검증","중복/오류 행 표시"],"진열장 원가 배분":["매장별 진열장 비용 배분","공용 비용 자동 분배","평당 원가 반영"],"견적서 생성":["매장/업체 기준 견적서 생성","공사항목별 금액 자동 합산","PDF/문서 다운로드"],"계약서 생성":["업체 정보 기반 계약서 생성","계좌/사업자 정보 자동 반영","계약 상태 관리"],"은행 이체 파일 생성":["승인된 결제 건만 추출","은행 업로드용 파일 생성","이체 전 검증"],"관리자 설정":["사용자 권한","승인 단계","상태/분류 코드 관리"]};let f=l,c="대시보드";const m=e=>new Intl.NumberFormat("ko-KR",{style:"currency",currency:"KRW",maximumFractionDigits:0}).format(e||0),I=()=>new Date().toISOString().slice(0,10),y=e=>Number(String(e).replace(/[^\d]/g,"")),$=e=>({승인:"green",신청:"amber",반려:"red",진행중:"blue",완료:"green",미착공:"gray",정상:"green",증빙확인:"amber"})[e]||"gray";async function h(){if(!u)return l;const[e,t,s]=await Promise.all([u.from("payments").select("*").order("requested_at",{ascending:!1}).order("id",{ascending:!1}).limit(12),u.from("stores").select("*").order("id",{ascending:!0}),u.from("vendors").select("*").order("id",{ascending:!0})]);return{payments:e.error?l.payments:e.data,stores:t.error?l.stores:t.data,vendors:s.error?l.vendors:s.data}}function A(e,t,s){return e.payments.find(r=>{const a=r.vendor.trim()===t.trim(),n=Math.abs(r.amount-s)/Math.max(s,1);return a&&n<=.1})}async function E(e){e.preventDefault();const t=e.currentTarget,s=t.querySelector("button[type='submit']"),r=t.querySelector("[data-form-message]"),a=new FormData(t),n=String(a.get("store")||"").trim(),i=String(a.get("vendor")||"").trim(),v=y(a.get("amount")),p=A(f,i,v);if(!n||!i||!v){r.textContent="매장명, 업체, 신청 금액을 모두 입력해 주세요.",r.className="form-message error";return}s.disabled=!0,s.textContent="저장 중",r.textContent=p?`중복 의심: ${p.store} / ${m(p.amount)} 건과 비슷합니다.`:"신청 건을 저장하고 있습니다.",r.className=p?"form-message warning":"form-message";const o={store:n,vendor:i,amount:v,status:"신청",requested_at:I()};if(!u)l.payments=[{id:Date.now(),...o},...l.payments];else{const{error:d}=await u.from("payments").insert(o);if(d){s.disabled=!1,s.textContent="검토 요청 생성",r.textContent=`저장 실패: ${d.message}`,r.className="form-message error";return}}t.reset(),f=await h(),g(p?"신청이 저장됐습니다. 중복 의심 건은 결제 검토에서 확인하세요.":"신청이 저장됐습니다.")}async function O(e){e.preventDefault();const t=e.currentTarget,s=t.querySelector("button[type='submit']"),r=t.querySelector("[data-vendor-message]"),a=new FormData(t),n={name:String(a.get("name")||"").trim(),category:String(a.get("category")||"").trim(),bank:String(a.get("bank")||"").trim(),account_number:String(a.get("account_number")||"").trim(),account_holder:String(a.get("account_holder")||"").trim(),risk:"정상",total:0};if(!n.name||!n.category||!n.bank||!n.account_number||!n.account_holder){r.textContent="업체명, 분류, 은행, 계좌번호, 예금주를 모두 입력해 주세요.",r.className="form-message error";return}if(s.disabled=!0,s.textContent="저장 중",r.textContent="업체/계좌 정보를 저장하고 있습니다.",r.className="form-message",!u)l.vendors=[{id:Date.now(),...n},...l.vendors];else{const{error:i}=await u.from("vendors").insert(n);if(i){s.disabled=!1,s.textContent="업체 저장",r.textContent=`저장 실패: ${i.message}`,r.className="form-message error";return}}t.reset(),f=await h(),c="업체/계좌 관리",g("업체/계좌 정보가 저장됐습니다.")}async function F(e){e.preventDefault();const t=e.currentTarget,s=t.querySelector("button[type='submit']"),r=t.querySelector("[data-store-message]"),a=new FormData(t),n={name:String(a.get("name")||"").trim(),area:Number(a.get("area")),status:String(a.get("status")||"미착공"),budget:y(a.get("budget")),spent:y(a.get("spent"))};if(!n.name||!n.area||!n.budget){r.textContent="매장명, 면적, 예산을 입력해 주세요.",r.className="form-message error";return}if(s.disabled=!0,s.textContent="저장 중",r.textContent="매장 공사 정보를 저장하고 있습니다.",r.className="form-message",!u)l.stores=[{id:Date.now(),...n},...l.stores];else{const{error:i}=await u.from("stores").insert(n);if(i){s.disabled=!1,s.textContent="매장 저장",r.textContent=`저장 실패: ${i.message}`,r.className="form-message error";return}}t.reset(),f=await h(),c="매장별 공사 관리",g("매장 공사 정보가 저장됐습니다.")}function L(e){const t=e.stores.filter(o=>o.status==="완료").length,s=e.stores.filter(o=>o.status==="진행중").length,r=e.payments.filter(o=>o.status==="승인").reduce((o,d)=>o+d.amount,0),a=e.stores.reduce((o,d)=>o+d.spent,0),n=e.payments.filter(o=>o.status==="신청").length,i=e.vendors.filter(o=>o.risk==="증빙확인").length,v=e.payments.filter(o=>o.amount>3e7).length,p=Math.round(a/Math.max(e.stores.reduce((o,d)=>o+d.area,0),1));return[["완료된 매장",`${t}개`,"준공 및 정산 완료"],["진행중인 매장",`${s}개`,"시공 또는 비용 검수 중"],["승인된 공사비",m(r),"지급 승인 완료"],["실제 사용액",m(a),"전체 매장 누적"],["대기중인 결제",`${n}건`,"승인 전 검토 필요"],["증빙 미비",`${i}건`,"자료 보완 요청"],["중복 의심",`${v}건`,"금액/업체 패턴 확인"],["평균 평당 원가",m(p),"실사용액 기준"]]}function b(e,t){return`
    <div class="table-wrap">
      <table>
        <thead><tr>${e.map(s=>`<th>${s}</th>`).join("")}</tr></thead>
        <tbody>${t.join("")}</tbody>
      </table>
    </div>
  `}function w(e){return e.payments.map(t=>`
      <tr>
        <td>${t.store}</td>
        <td>${t.vendor}</td>
        <td class="money">${m(t.amount)}</td>
        <td><span class="badge ${$(t.status)}">${t.status}</span></td>
        <td>${t.requested_at}</td>
      </tr>`)}function S(e){return e.stores.map(t=>`
      <tr>
        <td>${t.name}</td>
        <td>${t.area}평</td>
        <td class="money">${m(t.budget)}</td>
        <td class="money">${m(t.spent)}</td>
        <td><span class="badge ${$(t.status)}">${t.status}</span></td>
      </tr>`)}function k(e){return e.vendors.map(t=>`
      <tr>
        <td>${t.name}</td>
        <td>${t.category}</td>
        <td>${t.bank}</td>
        <td>${t.account_number||"-"}</td>
        <td>${t.account_holder||"-"}</td>
        <td class="money">${m(t.total)}</td>
        <td><span class="badge ${$(t.risk)}">${t.risk}</span></td>
      </tr>`)}function j(e){return e.vendors.map(t=>`<option value="${t.name}">${t.name} / ${t.bank} ${t.account_number||""}</option>`).join("")}function _(){return`
    <article class="panel form-panel">
      <div class="panel-head">
        <h2>결제 신청 입력</h2>
      </div>
      <div class="notice">등록된 업체를 선택하면 계좌 정보와 결제 신청이 같은 기준으로 연결됩니다.</div>
      <form id="payment-form">
        <label>매장명<input name="store" placeholder="예: 성수 플래그십" autocomplete="off" /></label>
        <label>협력업체
          <select name="vendor">
            <option value="">업체를 선택하세요</option>
            ${j(f)}
          </select>
        </label>
        <label>신청 금액<input name="amount" inputmode="numeric" placeholder="예: 18500000" autocomplete="off" /></label>
        <p class="form-message" data-form-message></p>
        <button class="primary wide" type="submit">검토 요청 생성</button>
      </form>
    </article>
  `}function M(){return`
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
  `}function R(){return`
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
  `}function V(e){return`
    <section class="kpis">
      ${L(e).map(([t,s,r])=>`
            <article class="kpi">
              <span>${t}</span>
              <strong>${s}</strong>
              <small>${r}</small>
            </article>`).join("")}
    </section>

    <section class="grid two">
      <article class="panel">
        <div class="panel-head">
          <h2>최근 결제 신청</h2>
          <button data-view-link="결제 신청">전체 보기</button>
        </div>
        ${b(["매장","업체","금액","상태","신청일"],w(e))}
      </article>

      <article class="panel">
        <div class="panel-head">
          <h2>매장 공사 현황</h2>
          <button data-view-link="매장별 공사 관리">관리</button>
        </div>
        ${b(["매장","면적","예산","사용액","상태"],S(e))}
      </article>
    </section>

    <section class="grid lower">
      <article class="panel">
        <div class="panel-head">
          <h2>주요 협력업체</h2>
          <button data-view-link="업체/계좌 관리">업체 추가</button>
        </div>
        ${b(["업체","분류","은행","계좌번호","예금주","누적 지급","상태"],k(e))}
      </article>
      ${_()}
    </section>
  `}function P(e){return`
    <section class="grid two">
      ${_()}
      <article class="panel">
        <div class="panel-head">
          <h2>결제 신청 검토</h2>
          <button>승인 대기 ${e.payments.filter(t=>t.status==="신청").length}건</button>
        </div>
        ${b(["매장","업체","금액","상태","신청일"],w(e))}
      </article>
    </section>
  `}function J(e){return`
    <section class="grid two">
      ${M()}
      <article class="panel">
        <div class="panel-head">
          <h2>업체/계좌 목록</h2>
          <button>${e.vendors.length}개 등록</button>
        </div>
        ${b(["업체","분류","은행","계좌번호","예금주","누적 지급","상태"],k(e))}
      </article>
    </section>
  `}function K(e){return`
    <section class="grid two">
      ${R()}
      <article class="panel">
        <div class="panel-head">
          <h2>매장별 공사 목록</h2>
          <button>${e.stores.length}개 매장</button>
        </div>
        ${b(["매장","면적","예산","사용액","상태"],S(e))}
      </article>
    </section>
  `}function T(e){const t=N[e]||["기능 범위 정의","입력 항목 확정","데이터 연결"];return`
    <section class="panel empty-panel">
      <h2>${e}</h2>
      <p>이 메뉴는 다음 단계에서 구현할 기능입니다. 지금은 확인해야 할 항목을 먼저 고정해둔 상태입니다.</p>
      <div class="check-list">
        ${t.map(s=>`<span>${s}</span>`).join("")}
      </div>
    </section>
  `}function B(e){return c==="대시보드"?V(e):c==="결제 신청"?P(e):c==="업체/계좌 관리"?J(e):c==="매장별 공사 관리"?K(e):T(c)}function g(e=""){const t=document.querySelector("#app");t.innerHTML=`
    <aside class="sidebar">
      <div class="brand">
        <span class="brand-mark">H</span>
        <div>
          <strong>HAKA Construction</strong>
          <small>공사비 관리 시스템</small>
        </div>
      </div>
      <nav>
        ${D.map(n=>`<button data-view="${n}" class="${n===c?"active":""}">${n}</button>`).join("")}
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
      ${B(f)}
    </main>
  `,document.querySelectorAll("[data-view]").forEach(n=>{n.addEventListener("click",()=>{c=n.dataset.view,g()})}),document.querySelectorAll("[data-view-link]").forEach(n=>{n.addEventListener("click",()=>{c=n.dataset.viewLink,g()})});const s=document.querySelector("#payment-form");s&&s.addEventListener("submit",E);const r=document.querySelector("#vendor-form");r&&r.addEventListener("submit",O);const a=document.querySelector("#store-form");a&&a.addEventListener("submit",F)}h().then(e=>{f=e,g()});
