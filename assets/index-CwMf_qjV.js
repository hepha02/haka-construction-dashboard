import{createClient as E}from"https://esm.sh/@supabase/supabase-js@2.49.1";(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const n of document.querySelectorAll('link[rel="modulepreload"]'))s(n);new MutationObserver(n=>{for(const r of n)if(r.type==="childList")for(const o of r.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&s(o)}).observe(document,{childList:!0,subtree:!0});function a(n){const r={};return n.integrity&&(r.integrity=n.integrity),n.referrerPolicy&&(r.referrerPolicy=n.referrerPolicy),n.crossOrigin==="use-credentials"?r.credentials="include":n.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function s(n){if(n.ep)return;n.ep=!0;const r=a(n);fetch(n.href,r)}})();const A="https://yqemtsbdnypgmkuyncxh.supabase.co",I="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlxZW10c2JkbnlwZ21rdXluY3hoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODAyNjYwMTUsImV4cCI6MjA5NTg0MjAxNX0.gwgdCncqRKKgC8ebj7qIdT-vA4J-wOVd2O9DSa7xEOs",c=E(A,I),u={payments:[{id:1,store:"성수 플래그십",vendor:"한빛전기",amount:184e5,status:"승인",requested_at:"2026-05-28"},{id:2,store:"부산 센텀",vendor:"도원인테리어",amount:327e5,status:"신청",requested_at:"2026-05-27"},{id:3,store:"대전 둔산",vendor:"서진설비",amount:98e5,status:"반려",requested_at:"2026-05-26"},{id:4,store:"제주 노형",vendor:"제이건축",amount:241e5,status:"승인",requested_at:"2026-05-25"}],stores:[{id:1,name:"성수 플래그십",area:52,status:"완료",budget:21e7,spent:1984e5},{id:2,name:"부산 센텀",area:47,status:"진행중",budget:186e6,spent:1227e5},{id:3,name:"대전 둔산",area:39,status:"진행중",budget:144e6,spent:882e5},{id:4,name:"제주 노형",area:42,status:"미착공",budget:158e6,spent:0}],vendors:[{id:1,name:"도원인테리어",category:"시공",bank:"신한은행",account_number:"110-000-000001",account_holder:"도원인테리어",risk:"정상",total:1245e5},{id:2,name:"한빛전기",category:"전기",bank:"국민은행",account_number:"004-000-000002",account_holder:"한빛전기",risk:"정상",total:738e5},{id:3,name:"서진설비",category:"설비",bank:"하나은행",account_number:"352-000-000003",account_holder:"서진설비",risk:"증빙확인",total:412e5}]},C=["대시보드","엑셀 업로드","결제 신청","업체/계좌 관리","매장별 공사 관리","진열장 원가 배분","견적서 생성","계약서 생성","은행 이체 파일 생성","관리자 설정"],O={"전체 관리자":C,"인테리어 공사실장":["결제 신청","진열장 원가 배분"]},F={admin:"전체 관리자",interior_manager:"인테리어 공사실장","전체 관리자":"전체 관리자","인테리어 공사실장":"인테리어 공사실장"},R={"엑셀 업로드":["결제 신청 내역 엑셀 업로드","필수 컬럼 검증","중복/오류 행 표시"],"진열장 원가 배분":["매장별 진열장 비용 배분","공용 비용 자동 분배","평당 원가 반영"],"견적서 생성":["매장/업체 기준 견적서 생성","공사항목별 금액 자동 합산","PDF/문서 다운로드"],"계약서 생성":["업체 정보 기반 계약서 생성","계좌/사업자 정보 자동 반영","계약 상태 관리"],"은행 이체 파일 생성":["승인된 결제 건만 추출","은행 업로드용 파일 생성","이체 전 검증"],"관리자 설정":["사용자 권한","승인 단계","상태/분류 코드 관리"]};let m=u,l="대시보드",g="인테리어 공사실장",f=null;const b=t=>new Intl.NumberFormat("ko-KR",{style:"currency",currency:"KRW",maximumFractionDigits:0}).format(t||0),j=()=>new Date().toISOString().slice(0,10),_=t=>Number(String(t).replace(/[^\d]/g,"")),q=t=>({승인:"green",신청:"amber",반려:"red",진행중:"blue",완료:"green",미착공:"gray",정상:"green",증빙확인:"amber"})[t]||"gray";async function y(){if(!c)return u;const[t,e,a]=await Promise.all([c.from("payments").select("*").order("requested_at",{ascending:!1}).order("id",{ascending:!1}).limit(12),c.from("stores").select("*").order("id",{ascending:!0}),c.from("vendors").select("*").order("id",{ascending:!0})]);return{payments:t.error?u.payments:t.data,stores:e.error?u.stores:e.data,vendors:a.error?u.vendors:a.data}}async function D(t){if(!c||!(t!=null&&t.email))return"인테리어 공사실장";const{data:e,error:a}=await c.from("user_roles").select("role").ilike("email",t.email).maybeSingle();return a||!(e!=null&&e.role)?"인테리어 공사실장":F[e.role]||"인테리어 공사실장"}async function M(){var e;if(!c){m=await y(),g="전체 관리자",d();return}const{data:t}=await c.auth.getSession();if(f=((e=t.session)==null?void 0:e.user)||null,!f){h();return}g=await D(f),l=p()[0],m=await y(),d()}function P(t,e,a){return t.payments.find(s=>{const n=s.vendor.trim()===e.trim(),r=Math.abs(s.amount-a)/Math.max(a,1);return n&&r<=.1})}async function V(t){t.preventDefault();const e=t.currentTarget,a=e.querySelector("button[type='submit']"),s=e.querySelector("[data-form-message]"),n=new FormData(e),r=String(n.get("store")||"").trim(),o=String(n.get("vendor")||"").trim(),w=_(n.get("amount")),v=P(m,o,w);if(!r||!o||!w){s.textContent="매장명, 업체, 신청 금액을 모두 입력해 주세요.",s.className="form-message error";return}a.disabled=!0,a.textContent="저장 중",s.textContent=v?`중복 의심: ${v.store} / ${b(v.amount)} 건과 비슷합니다.`:"신청 건을 저장하고 있습니다.",s.className=v?"form-message warning":"form-message";const k={store:r,vendor:o,amount:w,status:"신청",requested_at:j()};if(!c)u.payments=[{id:Date.now(),...k},...u.payments];else{const{error:i}=await c.from("payments").insert(k);if(i){a.disabled=!1,a.textContent="검토 요청 생성",s.textContent=`저장 실패: ${i.message}`,s.className="form-message error";return}}e.reset(),m=await y(),d(v?"신청이 저장됐습니다. 중복 의심 건은 결제 검토에서 확인하세요.":"신청이 저장됐습니다.")}async function T(t){t.preventDefault();const e=t.currentTarget,a=e.querySelector("button[type='submit']"),s=e.querySelector("[data-vendor-message]"),n=new FormData(e),r={name:String(n.get("name")||"").trim(),category:String(n.get("category")||"").trim(),bank:String(n.get("bank")||"").trim(),account_number:String(n.get("account_number")||"").trim(),account_holder:String(n.get("account_holder")||"").trim(),risk:"정상",total:0};if(!r.name||!r.category||!r.bank||!r.account_number||!r.account_holder){s.textContent="업체명, 분류, 은행, 계좌번호, 예금주를 모두 입력해 주세요.",s.className="form-message error";return}if(a.disabled=!0,a.textContent="저장 중",s.textContent="업체/계좌 정보를 저장하고 있습니다.",s.className="form-message",!c)u.vendors=[{id:Date.now(),...r},...u.vendors];else{const{error:o}=await c.from("vendors").insert(r);if(o){a.disabled=!1,a.textContent="업체 저장",s.textContent=`저장 실패: ${o.message}`,s.className="form-message error";return}}e.reset(),m=await y(),l="업체/계좌 관리",d("업체/계좌 정보가 저장됐습니다.")}async function J(t){t.preventDefault();const e=t.currentTarget,a=e.querySelector("button[type='submit']"),s=e.querySelector("[data-store-message]"),n=new FormData(e),r={name:String(n.get("name")||"").trim(),area:Number(n.get("area")),status:String(n.get("status")||"미착공"),budget:_(n.get("budget")),spent:_(n.get("spent"))};if(!r.name||!r.area||!r.budget){s.textContent="매장명, 면적, 예산을 입력해 주세요.",s.className="form-message error";return}if(a.disabled=!0,a.textContent="저장 중",s.textContent="매장 공사 정보를 저장하고 있습니다.",s.className="form-message",!c)u.stores=[{id:Date.now(),...r},...u.stores];else{const{error:o}=await c.from("stores").insert(r);if(o){a.disabled=!1,a.textContent="매장 저장",s.textContent=`저장 실패: ${o.message}`,s.className="form-message error";return}}e.reset(),m=await y(),l="매장별 공사 관리",d("매장 공사 정보가 저장됐습니다.")}async function K(t,e){if(!(!t||!["승인","반려"].includes(e))){if(!c)u.payments=u.payments.map(a=>a.id===t?{...a,status:e}:a);else{const{error:a}=await c.from("payments").update({status:e}).eq("id",t).eq("status","신청");if(a){d(`상태 변경 실패: ${a.message}`);return}}m=await y(),l="결제 신청",d(`결제 신청이 ${e} 처리됐습니다.`)}}function B(t){const e=t.stores.filter(i=>i.status==="완료").length,a=t.stores.filter(i=>i.status==="진행중").length,s=t.stores.filter(i=>i.document_required).length,n=t.payments.filter(i=>i.status==="승인").reduce((i,S)=>i+S.amount,0),r=t.stores.reduce((i,S)=>i+Number(S.spent||0),0),o=t.payments.filter(i=>i.status==="신청").length,w=t.stores.filter(i=>String(i.name||"").includes("직영점")).length,v=t.stores.reduce((i,S)=>i+Number(S.area||0),0),k=Math.round(r/Math.max(v,1));return[["완료된 매장",`${e}개`,"엑셀 공사 상태 기준"],["진행중인 매장",`${a}개`,"시공 또는 비용 검수 중"],["전체 공사비",b(r),"엑셀 합계 기준"],["문서 생성 대상",`${s}개`,"강남압구정 행부터 아래"],["대기중인 결제",`${o}건`,"승인 전 검토 필요"],["직영점",`${w}개`,"지점명 기준"],["승인된 결제",b(n),"지급 승인 완료"],["평균 평당 원가",b(k),"엑셀 합계/평수 기준"]]}function $(t,e){return`
    <div class="table-wrap">
      <table>
        <thead><tr>${t.map(a=>`<th>${a}</th>`).join("")}</tr></thead>
        <tbody>${e.join("")}</tbody>
      </table>
    </div>
  `}function H(t){return t.payments.map(e=>`
      <tr>
        <td>${e.store}</td>
        <td>${e.vendor}</td>
        <td class="money">${b(e.amount)}</td>
        <td><span class="badge ${q(e.status)}">${e.status}</span></td>
        <td>${e.requested_at}</td>
      </tr>`)}function U(t){return t.payments.map(e=>`
      <tr>
        <td>${e.store}</td>
        <td>${e.vendor}</td>
        <td class="money">${b(e.amount)}</td>
        <td><span class="badge ${q(e.status)}">${e.status}</span></td>
        <td>${e.requested_at}</td>
        <td>
          ${e.status==="신청"?`<div class="row-actions">
                  <button data-payment-id="${e.id}" data-payment-status="승인">승인</button>
                  <button data-payment-id="${e.id}" data-payment-status="반려">반려</button>
                </div>`:'<span class="muted">처리 완료</span>'}
        </td>
      </tr>`)}function N(t){return t.stores.map(e=>`
      <tr>
        <td>${e.region||"-"}</td>
        <td>${e.name}</td>
        <td>${e.fixture_count||0}</td>
        <td>${e.area}평</td>
        <td class="money">${b(e.budget)}</td>
        <td><span class="badge ${q(e.status)}">${e.status}</span></td>
        <td><span class="badge ${e.document_required?"blue":"gray"}">${e.document_required?"생성 대상":"출력 완료"}</span></td>
      </tr>`)}function x(t){return t.vendors.map(e=>`
      <tr>
        <td>${e.name}</td>
        <td>${e.category}</td>
        <td>${e.bank}</td>
        <td>${e.account_number||"-"}</td>
        <td>${e.account_holder||"-"}</td>
        <td class="money">${b(e.total)}</td>
        <td><span class="badge ${q(e.risk)}">${e.risk}</span></td>
      </tr>`)}function X(t){return t.vendors.map(e=>`<option value="${e.name}">${e.name} / ${e.bank} ${e.account_number||""}</option>`).join("")}function Y(t){return t.stores.map(e=>`<option value="${e.name}">${e.name} / ${e.area}평 / ${e.status}</option>`).join("")}function L(){return`
    <article class="panel form-panel">
      <div class="panel-head">
        <h2>결제 신청 입력</h2>
      </div>
      <div class="notice">등록된 업체를 선택하면 계좌 정보와 결제 신청이 같은 기준으로 연결됩니다.</div>
      <form id="payment-form">
        <label>매장
          <select name="store">
            <option value="">매장을 선택하세요</option>
            ${Y(m)}
          </select>
        </label>
        <label>협력업체
          <select name="vendor">
            <option value="">업체를 선택하세요</option>
            ${X(m)}
          </select>
        </label>
        <label>신청 금액<input name="amount" inputmode="numeric" placeholder="예: 18500000" autocomplete="off" /></label>
        <p class="form-message" data-form-message></p>
        <button class="primary wide" type="submit">검토 요청 생성</button>
      </form>
    </article>
  `}function Z(){return`
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
  `}function W(){return`
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
  `}function z(t){return`
    <section class="kpis">
      ${B(t).map(([e,a,s])=>`
            <article class="kpi">
              <span>${e}</span>
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
        ${$(["매장","업체","금액","상태","신청일"],H(t))}
      </article>

      <article class="panel">
        <div class="panel-head">
          <h2>매장 공사 현황</h2>
          <button data-view-link="매장별 공사 관리">관리</button>
        </div>
        ${$(["지역","매장","진열장","평수","공사비 합계","상태","문서"],N(t))}
      </article>
    </section>

    <section class="grid lower">
      <article class="panel">
        <div class="panel-head">
          <h2>주요 협력업체</h2>
          <button data-view-link="업체/계좌 관리">업체 추가</button>
        </div>
        ${$(["업체","분류","은행","계좌번호","예금주","누적 지급","상태"],x(t))}
      </article>
      ${L()}
    </section>
  `}function G(t){return`
    <section class="grid two">
      ${L()}
      <article class="panel">
        <div class="panel-head">
          <h2>결제 신청 검토</h2>
          <button>승인 대기 ${t.payments.filter(e=>e.status==="신청").length}건</button>
        </div>
        ${$(["매장","업체","금액","상태","신청일","처리"],U(t))}
      </article>
    </section>
  `}function Q(t){return`
    <section class="grid two">
      ${Z()}
      <article class="panel">
        <div class="panel-head">
          <h2>업체/계좌 목록</h2>
          <button>${t.vendors.length}개 등록</button>
        </div>
        ${$(["업체","분류","은행","계좌번호","예금주","누적 지급","상태"],x(t))}
      </article>
    </section>
  `}function ee(t){return`
    <section class="grid two">
      ${W()}
      <article class="panel">
        <div class="panel-head">
          <h2>매장별 공사 목록</h2>
          <button>${t.stores.length}개 매장</button>
        </div>
        ${$(["지역","매장","진열장","평수","공사비 합계","상태","문서"],N(t))}
      </article>
    </section>
  `}function te(t){const e=R[t]||["기능 범위 정의","입력 항목 확정","데이터 연결"];return`
    <section class="panel empty-panel">
      <h2>${t}</h2>
      <p>이 메뉴는 다음 단계에서 구현할 기능입니다. 지금은 확인해야 할 항목을 먼저 고정해둔 상태입니다.</p>
      <div class="check-list">
        ${e.map(a=>`<span>${a}</span>`).join("")}
      </div>
    </section>
  `}function ae(t){return l==="대시보드"?z(t):l==="결제 신청"?G(t):l==="업체/계좌 관리"?Q(t):l==="매장별 공사 관리"?ee(t):te(l)}function p(){return O[g]||C}function ne(){return`
    <div class="session-box">
      <span>${(f==null?void 0:f.email)||""}</span>
      <strong>${g}</strong>
      <button data-sign-out>로그아웃</button>
    </div>
  `}function h(t=""){const e=document.querySelector("#app");e.className="auth-shell",e.innerHTML=`
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
        ${t?`<div class="form-message ${t.includes("실패")?"error":"warning"}">${t}</div>`:""}
        <form id="auth-form">
          <label>이메일<input name="email" type="email" autocomplete="email" /></label>
          <label>비밀번호<input name="password" type="password" autocomplete="current-password" /></label>
          <button class="primary wide" type="submit" data-auth-action="login">로그인</button>
          <button class="wide" type="button" data-auth-action="signup">계정 만들기</button>
        </form>
      </section>
    </main>
  `,document.querySelector("#auth-form").addEventListener("submit",se),document.querySelector("[data-auth-action='signup']").addEventListener("click",re)}async function se(t){t.preventDefault();const e=new FormData(t.currentTarget),a=String(e.get("email")||"").trim(),s=String(e.get("password")||"");if(!a||!s){h("이메일과 비밀번호를 입력해 주세요.");return}const{data:n,error:r}=await c.auth.signInWithPassword({email:a,password:s});if(r){h(`로그인 실패: ${r.message}`);return}f=n.user,g=await D(f),l=p()[0],m=await y(),d()}async function re(){const t=document.querySelector("#auth-form"),e=new FormData(t),a=String(e.get("email")||"").trim(),s=String(e.get("password")||"");if(!a||!s){h("계정을 만들 이메일과 비밀번호를 입력해 주세요.");return}const{error:n}=await c.auth.signUp({email:a,password:s});if(n){h(`회원가입 실패: ${n.message}`);return}h("계정이 생성됐습니다. 이메일 확인이 필요한 경우 메일 인증 후 로그인해 주세요.")}async function oe(){await c.auth.signOut(),f=null,g="인테리어 공사실장",h("로그아웃되었습니다.")}function d(t=""){var r;const e=document.querySelector("#app");e.className="",p().includes(l)||(l=p()[0]),e.innerHTML=`
    <aside class="sidebar">
      <div class="brand">
        <span class="brand-mark">H</span>
        <div>
          <strong>HAKA Construction</strong>
          <small>공사비 관리 시스템</small>
        </div>
      </div>
      <nav>
        ${p().map(o=>`<button data-view="${o}" class="${o===l?"active":""}">${o}</button>`).join("")}
      </nav>
    </aside>
    <main class="shell">
      <header class="topbar">
        <div>
          <p>${g}</p>
          <h1>${l}</h1>
        </div>
        <div class="actions">
          ${ne()}
          ${p().includes("엑셀 업로드")?'<button data-view-link="엑셀 업로드">엑셀 업로드</button>':""}
          ${p().includes("결제 신청")?'<button class="primary" data-view-link="결제 신청">결제 신청</button>':""}
        </div>
      </header>

      ${t?`<div class="toast">${t}</div>`:""}
      ${ae(m)}
    </main>
  `,document.querySelectorAll("[data-view]").forEach(o=>{o.addEventListener("click",()=>{l=o.dataset.view,d()})}),document.querySelectorAll("[data-role]").forEach(o=>{o.addEventListener("click",()=>{g=o.dataset.role,p().includes(l)||(l=p()[0]),d()})}),(r=document.querySelector("[data-sign-out]"))==null||r.addEventListener("click",oe),document.querySelectorAll("[data-view-link]").forEach(o=>{o.addEventListener("click",()=>{p().includes(o.dataset.viewLink)&&(l=o.dataset.viewLink),d()})});const a=document.querySelector("#payment-form");a&&a.addEventListener("submit",V);const s=document.querySelector("#vendor-form");s&&s.addEventListener("submit",T);const n=document.querySelector("#store-form");n&&n.addEventListener("submit",J),document.querySelectorAll("[data-payment-id][data-payment-status]").forEach(o=>{o.addEventListener("click",()=>{K(Number(o.dataset.paymentId),o.dataset.paymentStatus)})})}M();
