import{createClient as q}from"https://esm.sh/@supabase/supabase-js@2.49.1";(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))r(s);new MutationObserver(s=>{for(const a of s)if(a.type==="childList")for(const i of a.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&r(i)}).observe(document,{childList:!0,subtree:!0});function n(s){const a={};return s.integrity&&(a.integrity=s.integrity),s.referrerPolicy&&(a.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?a.credentials="include":s.crossOrigin==="anonymous"?a.credentials="omit":a.credentials="same-origin",a}function r(s){if(s.ep)return;s.ep=!0;const a=n(s);fetch(s.href,a)}})();const C="https://yqemtsbdnypgmkuyncxh.supabase.co",N="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlxZW10c2JkbnlwZ21rdXluY3hoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODAyNjYwMTUsImV4cCI6MjA5NTg0MjAxNX0.gwgdCncqRKKgC8ebj7qIdT-vA4J-wOVd2O9DSa7xEOs",d=q(C,N),c={payments:[{id:1,store:"성수 플래그십",vendor:"한빛전기",amount:184e5,status:"승인",requested_at:"2026-05-28"},{id:2,store:"부산 센텀",vendor:"도원인테리어",amount:327e5,status:"신청",requested_at:"2026-05-27"},{id:3,store:"대전 둔산",vendor:"서진설비",amount:98e5,status:"반려",requested_at:"2026-05-26"},{id:4,store:"제주 노형",vendor:"제이건축",amount:241e5,status:"승인",requested_at:"2026-05-25"}],stores:[{id:1,name:"성수 플래그십",area:52,status:"완료",budget:21e7,spent:1984e5},{id:2,name:"부산 센텀",area:47,status:"진행중",budget:186e6,spent:1227e5},{id:3,name:"대전 둔산",area:39,status:"진행중",budget:144e6,spent:882e5},{id:4,name:"제주 노형",area:42,status:"미착공",budget:158e6,spent:0}],vendors:[{id:1,name:"도원인테리어",category:"시공",bank:"신한은행",account_number:"110-000-000001",account_holder:"도원인테리어",risk:"정상",total:1245e5},{id:2,name:"한빛전기",category:"전기",bank:"국민은행",account_number:"004-000-000002",account_holder:"한빛전기",risk:"정상",total:738e5},{id:3,name:"서진설비",category:"설비",bank:"하나은행",account_number:"352-000-000003",account_holder:"서진설비",risk:"증빙확인",total:412e5}]},x=["대시보드","엑셀 업로드","결제 신청","업체/계좌 관리","매장별 공사 관리","진열장 원가 배분","견적서 생성","계약서 생성","은행 이체 파일 생성","관리자 설정"],D={"엑셀 업로드":["결제 신청 내역 엑셀 업로드","필수 컬럼 검증","중복/오류 행 표시"],"진열장 원가 배분":["매장별 진열장 비용 배분","공용 비용 자동 분배","평당 원가 반영"],"견적서 생성":["매장/업체 기준 견적서 생성","공사항목별 금액 자동 합산","PDF/문서 다운로드"],"계약서 생성":["업체 정보 기반 계약서 생성","계좌/사업자 정보 자동 반영","계약 상태 관리"],"은행 이체 파일 생성":["승인된 결제 건만 추출","은행 업로드용 파일 생성","이체 전 검증"],"관리자 설정":["사용자 권한","승인 단계","상태/분류 코드 관리"]};let u=c,l="대시보드";const m=t=>new Intl.NumberFormat("ko-KR",{style:"currency",currency:"KRW",maximumFractionDigits:0}).format(t||0),A=()=>new Date().toISOString().slice(0,10),w=t=>Number(String(t).replace(/[^\d]/g,"")),y=t=>({승인:"green",신청:"amber",반려:"red",진행중:"blue",완료:"green",미착공:"gray",정상:"green",증빙확인:"amber"})[t]||"gray";async function h(){if(!d)return c;const[t,e,n]=await Promise.all([d.from("payments").select("*").order("requested_at",{ascending:!1}).order("id",{ascending:!1}).limit(12),d.from("stores").select("*").order("id",{ascending:!0}),d.from("vendors").select("*").order("id",{ascending:!0})]);return{payments:t.error?c.payments:t.data,stores:e.error?c.stores:e.data,vendors:n.error?c.vendors:n.data}}function E(t,e,n){return t.payments.find(r=>{const s=r.vendor.trim()===e.trim(),a=Math.abs(r.amount-n)/Math.max(n,1);return s&&a<=.1})}async function I(t){t.preventDefault();const e=t.currentTarget,n=e.querySelector("button[type='submit']"),r=e.querySelector("[data-form-message]"),s=new FormData(e),a=String(s.get("store")||"").trim(),i=String(s.get("vendor")||"").trim(),g=w(s.get("amount")),f=E(u,i,g);if(!a||!i||!g){r.textContent="매장명, 업체, 신청 금액을 모두 입력해 주세요.",r.className="form-message error";return}n.disabled=!0,n.textContent="저장 중",r.textContent=f?`중복 의심: ${f.store} / ${m(f.amount)} 건과 비슷합니다.`:"신청 건을 저장하고 있습니다.",r.className=f?"form-message warning":"form-message";const $={store:a,vendor:i,amount:g,status:"신청",requested_at:A()};if(!d)c.payments=[{id:Date.now(),...$},...c.payments];else{const{error:o}=await d.from("payments").insert($);if(o){n.disabled=!1,n.textContent="검토 요청 생성",r.textContent=`저장 실패: ${o.message}`,r.className="form-message error";return}}e.reset(),u=await h(),p(f?"신청이 저장됐습니다. 중복 의심 건은 결제 검토에서 확인하세요.":"신청이 저장됐습니다.")}async function O(t){t.preventDefault();const e=t.currentTarget,n=e.querySelector("button[type='submit']"),r=e.querySelector("[data-vendor-message]"),s=new FormData(e),a={name:String(s.get("name")||"").trim(),category:String(s.get("category")||"").trim(),bank:String(s.get("bank")||"").trim(),account_number:String(s.get("account_number")||"").trim(),account_holder:String(s.get("account_holder")||"").trim(),risk:"정상",total:0};if(!a.name||!a.category||!a.bank||!a.account_number||!a.account_holder){r.textContent="업체명, 분류, 은행, 계좌번호, 예금주를 모두 입력해 주세요.",r.className="form-message error";return}if(n.disabled=!0,n.textContent="저장 중",r.textContent="업체/계좌 정보를 저장하고 있습니다.",r.className="form-message",!d)c.vendors=[{id:Date.now(),...a},...c.vendors];else{const{error:i}=await d.from("vendors").insert(a);if(i){n.disabled=!1,n.textContent="업체 저장",r.textContent=`저장 실패: ${i.message}`,r.className="form-message error";return}}e.reset(),u=await h(),l="업체/계좌 관리",p("업체/계좌 정보가 저장됐습니다.")}async function F(t){t.preventDefault();const e=t.currentTarget,n=e.querySelector("button[type='submit']"),r=e.querySelector("[data-store-message]"),s=new FormData(e),a={name:String(s.get("name")||"").trim(),area:Number(s.get("area")),status:String(s.get("status")||"미착공"),budget:w(s.get("budget")),spent:w(s.get("spent"))};if(!a.name||!a.area||!a.budget){r.textContent="매장명, 면적, 예산을 입력해 주세요.",r.className="form-message error";return}if(n.disabled=!0,n.textContent="저장 중",r.textContent="매장 공사 정보를 저장하고 있습니다.",r.className="form-message",!d)c.stores=[{id:Date.now(),...a},...c.stores];else{const{error:i}=await d.from("stores").insert(a);if(i){n.disabled=!1,n.textContent="매장 저장",r.textContent=`저장 실패: ${i.message}`,r.className="form-message error";return}}e.reset(),u=await h(),l="매장별 공사 관리",p("매장 공사 정보가 저장됐습니다.")}async function L(t,e){if(!(!t||!["승인","반려"].includes(e))){if(!d)c.payments=c.payments.map(n=>n.id===t?{...n,status:e}:n);else{const{error:n}=await d.from("payments").update({status:e}).eq("id",t).eq("status","신청");if(n){p(`상태 변경 실패: ${n.message}`);return}}u=await h(),l="결제 신청",p(`결제 신청이 ${e} 처리됐습니다.`)}}function R(t){const e=t.stores.filter(o=>o.status==="완료").length,n=t.stores.filter(o=>o.status==="진행중").length,r=t.stores.filter(o=>o.document_required).length,s=t.payments.filter(o=>o.status==="승인").reduce((o,v)=>o+v.amount,0),a=t.stores.reduce((o,v)=>o+Number(v.spent||0),0),i=t.payments.filter(o=>o.status==="신청").length,g=t.stores.filter(o=>String(o.name||"").includes("직영점")).length,f=t.stores.reduce((o,v)=>o+Number(v.area||0),0),$=Math.round(a/Math.max(f,1));return[["완료된 매장",`${e}개`,"엑셀 공사 상태 기준"],["진행중인 매장",`${n}개`,"시공 또는 비용 검수 중"],["전체 공사비",m(a),"엑셀 합계 기준"],["문서 생성 대상",`${r}개`,"강남압구정 행부터 아래"],["대기중인 결제",`${i}건`,"승인 전 검토 필요"],["직영점",`${g}개`,"지점명 기준"],["승인된 결제",m(s),"지급 승인 완료"],["평균 평당 원가",m($),"엑셀 합계/평수 기준"]]}function b(t,e){return`
    <div class="table-wrap">
      <table>
        <thead><tr>${t.map(n=>`<th>${n}</th>`).join("")}</tr></thead>
        <tbody>${e.join("")}</tbody>
      </table>
    </div>
  `}function j(t){return t.payments.map(e=>`
      <tr>
        <td>${e.store}</td>
        <td>${e.vendor}</td>
        <td class="money">${m(e.amount)}</td>
        <td><span class="badge ${y(e.status)}">${e.status}</span></td>
        <td>${e.requested_at}</td>
      </tr>`)}function P(t){return t.payments.map(e=>`
      <tr>
        <td>${e.store}</td>
        <td>${e.vendor}</td>
        <td class="money">${m(e.amount)}</td>
        <td><span class="badge ${y(e.status)}">${e.status}</span></td>
        <td>${e.requested_at}</td>
        <td>
          ${e.status==="신청"?`<div class="row-actions">
                  <button data-payment-id="${e.id}" data-payment-status="승인">승인</button>
                  <button data-payment-id="${e.id}" data-payment-status="반려">반려</button>
                </div>`:'<span class="muted">처리 완료</span>'}
        </td>
      </tr>`)}function S(t){return t.stores.map(e=>`
      <tr>
        <td>${e.region||"-"}</td>
        <td>${e.name}</td>
        <td>${e.fixture_count||0}</td>
        <td>${e.area}평</td>
        <td class="money">${m(e.budget)}</td>
        <td><span class="badge ${y(e.status)}">${e.status}</span></td>
        <td><span class="badge ${e.document_required?"blue":"gray"}">${e.document_required?"생성 대상":"출력 완료"}</span></td>
      </tr>`)}function k(t){return t.vendors.map(e=>`
      <tr>
        <td>${e.name}</td>
        <td>${e.category}</td>
        <td>${e.bank}</td>
        <td>${e.account_number||"-"}</td>
        <td>${e.account_holder||"-"}</td>
        <td class="money">${m(e.total)}</td>
        <td><span class="badge ${y(e.risk)}">${e.risk}</span></td>
      </tr>`)}function V(t){return t.vendors.map(e=>`<option value="${e.name}">${e.name} / ${e.bank} ${e.account_number||""}</option>`).join("")}function M(t){return t.stores.map(e=>`<option value="${e.name}">${e.name} / ${e.area}평 / ${e.status}</option>`).join("")}function _(){return`
    <article class="panel form-panel">
      <div class="panel-head">
        <h2>결제 신청 입력</h2>
      </div>
      <div class="notice">등록된 업체를 선택하면 계좌 정보와 결제 신청이 같은 기준으로 연결됩니다.</div>
      <form id="payment-form">
        <label>매장
          <select name="store">
            <option value="">매장을 선택하세요</option>
            ${M(u)}
          </select>
        </label>
        <label>협력업체
          <select name="vendor">
            <option value="">업체를 선택하세요</option>
            ${V(u)}
          </select>
        </label>
        <label>신청 금액<input name="amount" inputmode="numeric" placeholder="예: 18500000" autocomplete="off" /></label>
        <p class="form-message" data-form-message></p>
        <button class="primary wide" type="submit">검토 요청 생성</button>
      </form>
    </article>
  `}function J(){return`
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
  `}function K(){return`
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
  `}function T(t){return`
    <section class="kpis">
      ${R(t).map(([e,n,r])=>`
            <article class="kpi">
              <span>${e}</span>
              <strong>${n}</strong>
              <small>${r}</small>
            </article>`).join("")}
    </section>

    <section class="grid two">
      <article class="panel">
        <div class="panel-head">
          <h2>최근 결제 신청</h2>
          <button data-view-link="결제 신청">전체 보기</button>
        </div>
        ${b(["매장","업체","금액","상태","신청일"],j(t))}
      </article>

      <article class="panel">
        <div class="panel-head">
          <h2>매장 공사 현황</h2>
          <button data-view-link="매장별 공사 관리">관리</button>
        </div>
        ${b(["지역","매장","진열장","평수","공사비 합계","상태","문서"],S(t))}
      </article>
    </section>

    <section class="grid lower">
      <article class="panel">
        <div class="panel-head">
          <h2>주요 협력업체</h2>
          <button data-view-link="업체/계좌 관리">업체 추가</button>
        </div>
        ${b(["업체","분류","은행","계좌번호","예금주","누적 지급","상태"],k(t))}
      </article>
      ${_()}
    </section>
  `}function B(t){return`
    <section class="grid two">
      ${_()}
      <article class="panel">
        <div class="panel-head">
          <h2>결제 신청 검토</h2>
          <button>승인 대기 ${t.payments.filter(e=>e.status==="신청").length}건</button>
        </div>
        ${b(["매장","업체","금액","상태","신청일","처리"],P(t))}
      </article>
    </section>
  `}function U(t){return`
    <section class="grid two">
      ${J()}
      <article class="panel">
        <div class="panel-head">
          <h2>업체/계좌 목록</h2>
          <button>${t.vendors.length}개 등록</button>
        </div>
        ${b(["업체","분류","은행","계좌번호","예금주","누적 지급","상태"],k(t))}
      </article>
    </section>
  `}function X(t){return`
    <section class="grid two">
      ${K()}
      <article class="panel">
        <div class="panel-head">
          <h2>매장별 공사 목록</h2>
          <button>${t.stores.length}개 매장</button>
        </div>
        ${b(["지역","매장","진열장","평수","공사비 합계","상태","문서"],S(t))}
      </article>
    </section>
  `}function Y(t){const e=D[t]||["기능 범위 정의","입력 항목 확정","데이터 연결"];return`
    <section class="panel empty-panel">
      <h2>${t}</h2>
      <p>이 메뉴는 다음 단계에서 구현할 기능입니다. 지금은 확인해야 할 항목을 먼저 고정해둔 상태입니다.</p>
      <div class="check-list">
        ${e.map(n=>`<span>${n}</span>`).join("")}
      </div>
    </section>
  `}function Z(t){return l==="대시보드"?T(t):l==="결제 신청"?B(t):l==="업체/계좌 관리"?U(t):l==="매장별 공사 관리"?X(t):Y(l)}function p(t=""){const e=document.querySelector("#app");e.innerHTML=`
    <aside class="sidebar">
      <div class="brand">
        <span class="brand-mark">H</span>
        <div>
          <strong>HAKA Construction</strong>
          <small>공사비 관리 시스템</small>
        </div>
      </div>
      <nav>
        ${x.map(a=>`<button data-view="${a}" class="${a===l?"active":""}">${a}</button>`).join("")}
      </nav>
    </aside>
    <main class="shell">
      <header class="topbar">
        <div>
          <p>Admin Console</p>
          <h1>${l}</h1>
        </div>
        <div class="actions">
          <button data-view-link="엑셀 업로드">엑셀 업로드</button>
          <button class="primary" data-view-link="결제 신청">결제 신청</button>
        </div>
      </header>

      ${t?`<div class="toast">${t}</div>`:""}
      ${Z(u)}
    </main>
  `,document.querySelectorAll("[data-view]").forEach(a=>{a.addEventListener("click",()=>{l=a.dataset.view,p()})}),document.querySelectorAll("[data-view-link]").forEach(a=>{a.addEventListener("click",()=>{l=a.dataset.viewLink,p()})});const n=document.querySelector("#payment-form");n&&n.addEventListener("submit",I);const r=document.querySelector("#vendor-form");r&&r.addEventListener("submit",O);const s=document.querySelector("#store-form");s&&s.addEventListener("submit",F),document.querySelectorAll("[data-payment-id][data-payment-status]").forEach(a=>{a.addEventListener("click",()=>{L(Number(a.dataset.paymentId),a.dataset.paymentStatus)})})}h().then(t=>{u=t,p()});
