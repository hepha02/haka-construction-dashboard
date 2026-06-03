import{createClient as A}from"https://esm.sh/@supabase/supabase-js@2.49.1";(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const n of document.querySelectorAll('link[rel="modulepreload"]'))s(n);new MutationObserver(n=>{for(const r of n)if(r.type==="childList")for(const o of r.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&s(o)}).observe(document,{childList:!0,subtree:!0});function a(n){const r={};return n.integrity&&(r.integrity=n.integrity),n.referrerPolicy&&(r.referrerPolicy=n.referrerPolicy),n.crossOrigin==="use-credentials"?r.credentials="include":n.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function s(n){if(n.ep)return;n.ep=!0;const r=a(n);fetch(n.href,r)}})();const I="https://yqemtsbdnypgmkuyncxh.supabase.co",F="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlxZW10c2JkbnlwZ21rdXluY3hoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODAyNjYwMTUsImV4cCI6MjA5NTg0MjAxNX0.gwgdCncqRKKgC8ebj7qIdT-vA4J-wOVd2O9DSa7xEOs",c=A(I,F),u={payments:[{id:1,store:"성수 플래그십",vendor:"한빛전기",amount:184e5,status:"승인",requested_at:"2026-05-28"},{id:2,store:"부산 센텀",vendor:"도원인테리어",amount:327e5,status:"신청",requested_at:"2026-05-27"},{id:3,store:"대전 둔산",vendor:"서진설비",amount:98e5,status:"반려",requested_at:"2026-05-26"},{id:4,store:"제주 노형",vendor:"제이건축",amount:241e5,status:"승인",requested_at:"2026-05-25"}],stores:[{id:1,name:"성수 플래그십",area:52,status:"완료",budget:21e7,spent:1984e5},{id:2,name:"부산 센텀",area:47,status:"진행중",budget:186e6,spent:1227e5},{id:3,name:"대전 둔산",area:39,status:"진행중",budget:144e6,spent:882e5},{id:4,name:"제주 노형",area:42,status:"미착공",budget:158e6,spent:0}],vendors:[{id:1,name:"도원인테리어",category:"시공",bank:"신한은행",account_number:"110-000-000001",account_holder:"도원인테리어",risk:"정상",total:1245e5},{id:2,name:"한빛전기",category:"전기",bank:"국민은행",account_number:"004-000-000002",account_holder:"한빛전기",risk:"정상",total:738e5},{id:3,name:"서진설비",category:"설비",bank:"하나은행",account_number:"352-000-000003",account_holder:"서진설비",risk:"증빙확인",total:412e5}]},C=["대시보드","엑셀 업로드","결제 신청","업체/계좌 관리","매장별 공사 관리","진열장 원가 배분","견적서 생성","계약서 생성","은행 이체 파일 생성","관리자 설정"],O={"전체 관리자":C,"인테리어 공사실장":["결제 신청","진열장 원가 배분"]},R={admin:"전체 관리자",interior_manager:"인테리어 공사실장","전체 관리자":"전체 관리자","인테리어 공사실장":"인테리어 공사실장"},j={"엑셀 업로드":["결제 신청 내역 엑셀 업로드","필수 컬럼 검증","중복/오류 행 표시"],"진열장 원가 배분":["매장별 진열장 비용 배분","공용 비용 자동 분배","평당 원가 반영"],"견적서 생성":["매장/업체 기준 견적서 생성","공사항목별 금액 자동 합산","PDF/문서 다운로드"],"계약서 생성":["업체 정보 기반 계약서 생성","계좌/사업자 정보 자동 반영","계약 상태 관리"],"은행 이체 파일 생성":["승인된 결제 건만 추출","은행 업로드용 파일 생성","이체 전 검증"],"관리자 설정":["사용자 권한","승인 단계","상태/분류 코드 관리"]};let m=u,l="대시보드",h="인테리어 공사실장",g=null;const b=e=>new Intl.NumberFormat("ko-KR",{style:"currency",currency:"KRW",maximumFractionDigits:0}).format(e||0),M=()=>new Date().toISOString().slice(0,10),D=e=>Number(String(e).replace(/[^\d]/g,"")),q=e=>String(e||"").replace(/&/g,"&amp;").replace(/"/g,"&quot;").replace(/</g,"&lt;").replace(/>/g,"&gt;"),_=e=>({승인:"green",신청:"amber",반려:"red",진행중:"blue",완료:"green",미착공:"gray",정상:"green",증빙확인:"amber"})[e]||"gray";async function y(){if(!c)return u;const[e,t,a]=await Promise.all([c.from("payments").select("*").order("requested_at",{ascending:!1}).order("id",{ascending:!1}).limit(12),c.from("stores").select("*").order("id",{ascending:!0}),c.from("vendors").select("*").order("id",{ascending:!0})]);return{payments:e.error?u.payments:e.data,stores:t.error?u.stores:t.data,vendors:a.error?u.vendors:a.data}}async function N(e){if(!c||!(e!=null&&e.email))return"인테리어 공사실장";const{data:t,error:a}=await c.from("user_roles").select("role").ilike("email",e.email).maybeSingle();return a||!(t!=null&&t.role)?"인테리어 공사실장":R[t.role]||"인테리어 공사실장"}async function P(){var t;if(!c){m=await y(),h="전체 관리자",d();return}const{data:e}=await c.auth.getSession();if(g=((t=e.session)==null?void 0:t.user)||null,!g){f();return}h=await N(g),l=p()[0],m=await y(),d()}function T(e,t,a){return e.payments.find(s=>{const n=s.vendor.trim()===t.trim(),r=Math.abs(s.amount-a)/Math.max(a,1);return n&&r<=.1})}async function V(e){e.preventDefault();const t=e.currentTarget,a=t.querySelector("button[type='submit']"),s=t.querySelector("[data-form-message]"),n=new FormData(t),r=String(n.get("store")||"").trim(),o=String(n.get("vendor")||"").trim(),w=D(n.get("amount")),v=T(m,o,w);if(!r||!o||!w){s.textContent="매장명, 업체, 신청 금액을 모두 입력해 주세요.",s.className="form-message error";return}a.disabled=!0,a.textContent="저장 중",s.textContent=v?`중복 의심: ${v.store} / ${b(v.amount)} 건과 비슷합니다.`:"신청 건을 저장하고 있습니다.",s.className=v?"form-message warning":"form-message";const k={store:r,vendor:o,amount:w,status:"신청",requested_at:M()};if(!c)u.payments=[{id:Date.now(),...k},...u.payments];else{const{error:i}=await c.from("payments").insert(k);if(i){a.disabled=!1,a.textContent="검토 요청 생성",s.textContent=`저장 실패: ${i.message}`,s.className="form-message error";return}}t.reset(),m=await y(),d(v?"신청이 저장됐습니다. 중복 의심 건은 결제 검토에서 확인하세요.":"신청이 저장됐습니다.")}async function J(e){e.preventDefault();const t=e.currentTarget,a=t.querySelector("button[type='submit']"),s=t.querySelector("[data-vendor-message]"),n=new FormData(t),r={name:String(n.get("name")||"").trim(),category:String(n.get("category")||"").trim(),bank:String(n.get("bank")||"").trim(),account_number:String(n.get("account_number")||"").trim(),account_holder:String(n.get("account_holder")||"").trim(),risk:"정상",total:0};if(!r.name||!r.category||!r.bank||!r.account_number||!r.account_holder){s.textContent="업체명, 분류, 은행, 계좌번호, 예금주를 모두 입력해 주세요.",s.className="form-message error";return}if(a.disabled=!0,a.textContent="저장 중",s.textContent="업체/계좌 정보를 저장하고 있습니다.",s.className="form-message",!c)u.vendors=[{id:Date.now(),...r},...u.vendors];else{const{error:o}=await c.from("vendors").insert(r);if(o){a.disabled=!1,a.textContent="업체 저장",s.textContent=`저장 실패: ${o.message}`,s.className="form-message error";return}}t.reset(),m=await y(),l="업체/계좌 관리",d("업체/계좌 정보가 저장됐습니다.")}async function K(e){e.preventDefault();const t=e.currentTarget,a=t.querySelector("button[type='submit']"),s=t.querySelector("[data-store-message]"),n=new FormData(t),r={name:String(n.get("name")||"").trim(),area:Number(n.get("area")),status:String(n.get("status")||"미착공"),budget:D(n.get("budget")),spent:D(n.get("spent"))};if(!r.name||!r.area||!r.budget){s.textContent="매장명, 면적, 예산을 입력해 주세요.",s.className="form-message error";return}if(a.disabled=!0,a.textContent="저장 중",s.textContent="매장 공사 정보를 저장하고 있습니다.",s.className="form-message",!c)u.stores=[{id:Date.now(),...r},...u.stores];else{const{error:o}=await c.from("stores").insert(r);if(o){a.disabled=!1,a.textContent="매장 저장",s.textContent=`저장 실패: ${o.message}`,s.className="form-message error";return}}t.reset(),m=await y(),l="매장별 공사 관리",d("매장 공사 정보가 저장됐습니다.")}async function B(e,t){if(!(!e||!["승인","반려"].includes(t))){if(!c)u.payments=u.payments.map(a=>a.id===e?{...a,status:t}:a);else{const{error:a}=await c.from("payments").update({status:t}).eq("id",e).eq("status","신청");if(a){d(`상태 변경 실패: ${a.message}`);return}}m=await y(),l="결제 신청",d(`결제 신청이 ${t} 처리됐습니다.`)}}function H(e){const t=e.stores.filter(i=>i.status==="완료").length,a=e.stores.filter(i=>i.status==="진행중").length,s=e.stores.filter(i=>i.document_required).length,n=e.payments.filter(i=>i.status==="승인").reduce((i,S)=>i+S.amount,0),r=e.stores.reduce((i,S)=>i+Number(S.spent||0),0),o=e.payments.filter(i=>i.status==="신청").length,w=e.stores.filter(i=>String(i.name||"").includes("직영점")).length,v=e.stores.reduce((i,S)=>i+Number(S.area||0),0),k=Math.round(r/Math.max(v,1));return[["완료된 매장",`${t}개`,"엑셀 공사 상태 기준"],["진행중인 매장",`${a}개`,"시공 또는 비용 검수 중"],["전체 공사비",b(r),"엑셀 합계 기준"],["문서 생성 대상",`${s}개`,"강남압구정 행부터 아래"],["대기중인 결제",`${o}건`,"승인 전 검토 필요"],["직영점",`${w}개`,"지점명 기준"],["승인된 결제",b(n),"지급 승인 완료"],["평균 평당 원가",b(k),"엑셀 합계/평수 기준"]]}function $(e,t){return`
    <div class="table-wrap">
      <table>
        <thead><tr>${e.map(a=>`<th>${a}</th>`).join("")}</tr></thead>
        <tbody>${t.join("")}</tbody>
      </table>
    </div>
  `}function U(e){return e.payments.map(t=>`
      <tr>
        <td>${t.store}</td>
        <td>${t.vendor}</td>
        <td class="money">${b(t.amount)}</td>
        <td><span class="badge ${_(t.status)}">${t.status}</span></td>
        <td>${t.requested_at}</td>
      </tr>`)}function X(e){return e.payments.map(t=>`
      <tr>
        <td>${t.store}</td>
        <td>${t.vendor}</td>
        <td class="money">${b(t.amount)}</td>
        <td><span class="badge ${_(t.status)}">${t.status}</span></td>
        <td>${t.requested_at}</td>
        <td>
          ${t.status==="신청"?`<div class="row-actions">
                  <button data-payment-id="${t.id}" data-payment-status="승인">승인</button>
                  <button data-payment-id="${t.id}" data-payment-status="반려">반려</button>
                </div>`:'<span class="muted">처리 완료</span>'}
        </td>
      </tr>`)}function L(e){return e.stores.map(t=>`
      <tr>
        <td>${t.region||"-"}</td>
        <td>${t.name}</td>
        <td>${t.fixture_count||0}</td>
        <td>${t.area}평</td>
        <td class="money">${b(t.budget)}</td>
        <td><span class="badge ${_(t.status)}">${t.status}</span></td>
        <td><span class="badge ${t.document_required?"blue":"gray"}">${t.document_required?"생성 대상":"출력 완료"}</span></td>
      </tr>`)}function x(e){return e.vendors.map(t=>`
      <tr>
        <td>${t.name}</td>
        <td>${t.category}</td>
        <td>${t.bank}</td>
        <td>${t.account_number||"-"}</td>
        <td>${t.account_holder||"-"}</td>
        <td class="money">${b(t.total)}</td>
        <td><span class="badge ${_(t.risk)}">${t.risk}</span></td>
      </tr>`)}function Y(e){return e.vendors.map(t=>`<option value="${t.name}">${t.name} / ${t.bank} ${t.account_number||""}</option>`).join("")}function Z(e){return e.stores.map(t=>`<option value="${q(t.name)}">${q(t.name)} / ${q(t.area)}평 / ${q(t.status)}</option>`).join("")}function E(){return`
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
            ${Z(m)}
          </datalist>
        </label>
        <label>협력업체
          <select name="vendor">
            <option value="">업체를 선택하세요</option>
            ${Y(m)}
          </select>
        </label>
        <label>신청 금액<input name="amount" inputmode="numeric" placeholder="예: 18500000" autocomplete="off" /></label>
        <p class="form-message" data-form-message></p>
        <button class="primary wide" type="submit">검토 요청 생성</button>
      </form>
    </article>
  `}function W(){return`
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
  `}function z(){return`
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
  `}function G(e){return`
    <section class="kpis">
      ${H(e).map(([t,a,s])=>`
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
        ${$(["매장","업체","금액","상태","신청일"],U(e))}
      </article>

      <article class="panel">
        <div class="panel-head">
          <h2>매장 공사 현황</h2>
          <button data-view-link="매장별 공사 관리">관리</button>
        </div>
        ${$(["지역","매장","진열장","평수","공사비 합계","상태","문서"],L(e))}
      </article>
    </section>

    <section class="grid lower">
      <article class="panel">
        <div class="panel-head">
          <h2>주요 협력업체</h2>
          <button data-view-link="업체/계좌 관리">업체 추가</button>
        </div>
        ${$(["업체","분류","은행","계좌번호","예금주","누적 지급","상태"],x(e))}
      </article>
      ${E()}
    </section>
  `}function Q(e){return`
    <section class="grid two">
      ${E()}
      <article class="panel">
        <div class="panel-head">
          <h2>결제 신청 검토</h2>
          <button>승인 대기 ${e.payments.filter(t=>t.status==="신청").length}건</button>
        </div>
        ${$(["매장","업체","금액","상태","신청일","처리"],X(e))}
      </article>
    </section>
  `}function tt(e){return`
    <section class="grid two">
      ${W()}
      <article class="panel">
        <div class="panel-head">
          <h2>업체/계좌 목록</h2>
          <button>${e.vendors.length}개 등록</button>
        </div>
        ${$(["업체","분류","은행","계좌번호","예금주","누적 지급","상태"],x(e))}
      </article>
    </section>
  `}function et(e){return`
    <section class="grid two">
      ${z()}
      <article class="panel">
        <div class="panel-head">
          <h2>매장별 공사 목록</h2>
          <button>${e.stores.length}개 매장</button>
        </div>
        ${$(["지역","매장","진열장","평수","공사비 합계","상태","문서"],L(e))}
      </article>
    </section>
  `}function at(e){const t=j[e]||["기능 범위 정의","입력 항목 확정","데이터 연결"];return`
    <section class="panel empty-panel">
      <h2>${e}</h2>
      <p>이 메뉴는 다음 단계에서 구현할 기능입니다. 지금은 확인해야 할 항목을 먼저 고정해둔 상태입니다.</p>
      <div class="check-list">
        ${t.map(a=>`<span>${a}</span>`).join("")}
      </div>
    </section>
  `}function nt(e){return l==="대시보드"?G(e):l==="결제 신청"?Q(e):l==="업체/계좌 관리"?tt(e):l==="매장별 공사 관리"?et(e):at(l)}function p(){return O[h]||C}function st(){return`
    <div class="session-box">
      <span>${(g==null?void 0:g.email)||""}</span>
      <strong>${h}</strong>
      <button data-sign-out>로그아웃</button>
    </div>
  `}function f(e=""){const t=document.querySelector("#app");t.className="auth-shell",t.innerHTML=`
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
        ${e?`<div class="form-message ${e.includes("실패")?"error":"warning"}">${e}</div>`:""}
        <form id="auth-form">
          <label>이메일<input name="email" type="email" autocomplete="email" /></label>
          <label>비밀번호<input name="password" type="password" autocomplete="current-password" /></label>
          <button class="primary wide" type="submit" data-auth-action="login">로그인</button>
          <button class="wide" type="button" data-auth-action="signup">계정 만들기</button>
          <button class="wide" type="button" data-auth-action="resend">인증메일 다시 받기</button>
        </form>
      </section>
    </main>
  `,document.querySelector("#auth-form").addEventListener("submit",rt),document.querySelector("[data-auth-action='signup']").addEventListener("click",ot),document.querySelector("[data-auth-action='resend']").addEventListener("click",it)}async function rt(e){e.preventDefault();const t=new FormData(e.currentTarget),a=String(t.get("email")||"").trim(),s=String(t.get("password")||"");if(!a||!s){f("이메일과 비밀번호를 입력해 주세요.");return}const{data:n,error:r}=await c.auth.signInWithPassword({email:a,password:s});if(r){f(`로그인 실패: ${r.message}`);return}g=n.user,h=await N(g),l=p()[0],m=await y(),d()}async function ot(){const e=document.querySelector("#auth-form"),t=new FormData(e),a=String(t.get("email")||"").trim(),s=String(t.get("password")||"");if(!a||!s){f("계정을 만들 이메일과 비밀번호를 입력해 주세요.");return}const{error:n}=await c.auth.signUp({email:a,password:s,options:{emailRedirectTo:window.location.origin+window.location.pathname}});if(n){f(`회원가입 실패: ${n.message}`);return}f("계정이 생성됐습니다. 이메일 확인이 필요한 경우 메일 인증 후 로그인해 주세요.")}async function it(){const e=document.querySelector("#auth-form"),t=new FormData(e),a=String(t.get("email")||"").trim();if(!a){f("인증메일을 다시 받을 이메일을 입력해 주세요.");return}const{error:s}=await c.auth.resend({type:"signup",email:a,options:{emailRedirectTo:window.location.origin+window.location.pathname}});if(s){f(`인증메일 재발송 실패: ${s.message}`);return}f("인증메일을 다시 보냈습니다. 새로 받은 메일의 링크를 눌러 주세요.")}async function ct(){await c.auth.signOut(),g=null,h="인테리어 공사실장",f("로그아웃되었습니다.")}function d(e=""){var r;const t=document.querySelector("#app");t.className="",p().includes(l)||(l=p()[0]),t.innerHTML=`
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
          <p>${h}</p>
          <h1>${l}</h1>
        </div>
        <div class="actions">
          ${st()}
          ${p().includes("엑셀 업로드")?'<button data-view-link="엑셀 업로드">엑셀 업로드</button>':""}
          ${p().includes("결제 신청")?'<button class="primary" data-view-link="결제 신청">결제 신청</button>':""}
        </div>
      </header>

      ${e?`<div class="toast">${e}</div>`:""}
      ${nt(m)}
    </main>
  `,document.querySelectorAll("[data-view]").forEach(o=>{o.addEventListener("click",()=>{l=o.dataset.view,d()})}),document.querySelectorAll("[data-role]").forEach(o=>{o.addEventListener("click",()=>{h=o.dataset.role,p().includes(l)||(l=p()[0]),d()})}),(r=document.querySelector("[data-sign-out]"))==null||r.addEventListener("click",ct),document.querySelectorAll("[data-view-link]").forEach(o=>{o.addEventListener("click",()=>{p().includes(o.dataset.viewLink)&&(l=o.dataset.viewLink),d()})});const a=document.querySelector("#payment-form");a&&a.addEventListener("submit",V);const s=document.querySelector("#vendor-form");s&&s.addEventListener("submit",J);const n=document.querySelector("#store-form");n&&n.addEventListener("submit",K),document.querySelectorAll("[data-payment-id][data-payment-status]").forEach(o=>{o.addEventListener("click",()=>{B(Number(o.dataset.paymentId),o.dataset.paymentStatus)})})}P();
