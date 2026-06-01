import{createClient as v}from"https://esm.sh/@supabase/supabase-js@2.49.1";(function(){const a=document.createElement("link").relList;if(a&&a.supports&&a.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))t(s);new MutationObserver(s=>{for(const r of s)if(r.type==="childList")for(const i of r.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&t(i)}).observe(document,{childList:!0,subtree:!0});function o(s){const r={};return s.integrity&&(r.integrity=s.integrity),s.referrerPolicy&&(r.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?r.credentials="include":s.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function t(s){if(s.ep)return;s.ep=!0;const r=o(s);fetch(s.href,r)}})();const $="https://yqemtsbdnypgmkuyncxh.supabase.co",w="sb_publishable_NLGUYb8d4jA2IRyaGza4lw_30c-gIYj",m=v($,w),u={payments:[{id:1,store:"성수 플래그십",vendor:"한빛전기",amount:184e5,status:"승인",requested_at:"2026-05-28"},{id:2,store:"부산 센텀",vendor:"도원인테리어",amount:327e5,status:"신청",requested_at:"2026-05-27"},{id:3,store:"대전 둔산",vendor:"서진설비",amount:98e5,status:"반려",requested_at:"2026-05-26"},{id:4,store:"제주 노형",vendor:"제이건축",amount:241e5,status:"승인",requested_at:"2026-05-25"}],stores:[{id:1,name:"성수 플래그십",area:52,status:"완료",budget:21e7,spent:1984e5},{id:2,name:"부산 센텀",area:47,status:"진행중",budget:186e6,spent:1227e5},{id:3,name:"대전 둔산",area:39,status:"진행중",budget:144e6,spent:882e5},{id:4,name:"제주 노형",area:42,status:"미착공",budget:158e6,spent:0}],vendors:[{id:1,name:"도원인테리어",category:"시공",bank:"신한은행",risk:"정상",total:1245e5},{id:2,name:"한빛전기",category:"전기",bank:"국민은행",risk:"정상",total:738e5},{id:3,name:"서진설비",category:"설비",bank:"하나은행",risk:"증빙확인",total:412e5}]},S=["대시보드","엑셀 업로드","결제 신청","업체/계좌 관리","매장별 공사 관리","진열장 원가 배분","견적서 생성","계약서 생성","은행 이체 파일 생성","관리자 설정"];let f=u;const d=e=>new Intl.NumberFormat("ko-KR",{style:"currency",currency:"KRW",maximumFractionDigits:0}).format(e||0),k=()=>new Date().toISOString().slice(0,10),q=e=>Number(String(e).replace(/[^\d]/g,"")),b=e=>({승인:"green",신청:"amber",반려:"red",진행중:"blue",완료:"green",미착공:"gray",정상:"green",증빙확인:"amber"})[e]||"gray";async function y(){if(!m)return u;const[e,a,o]=await Promise.all([m.from("payments").select("*").order("requested_at",{ascending:!1}).order("id",{ascending:!1}).limit(12),m.from("stores").select("*").order("id",{ascending:!0}),m.from("vendors").select("*").order("id",{ascending:!0})]);return{payments:e.error?u.payments:e.data,stores:a.error?u.stores:a.data,vendors:o.error?u.vendors:o.data}}function _(e,a,o){return e.payments.find(t=>{const s=t.vendor.trim()===a.trim(),r=Math.abs(t.amount-o)/Math.max(o,1);return s&&r<=.1})}async function A(e){e.preventDefault();const a=e.currentTarget,o=a.querySelector("button[type='submit']"),t=a.querySelector("[data-form-message]"),s=new FormData(a),r=String(s.get("store")||"").trim(),i=String(s.get("vendor")||"").trim(),p=q(s.get("amount")),l=_(f,i,p);if(!r||!i||!p){t.textContent="매장명, 업체명, 신청 금액을 모두 입력해 주세요.",t.className="form-message error";return}o.disabled=!0,o.textContent="저장 중",t.textContent=l?`중복 의심: ${l.store} / ${d(l.amount)} 건과 비슷합니다.`:"신청 건을 저장하고 있습니다.",t.className=l?"form-message warning":"form-message";const n={store:r,vendor:i,amount:p,status:"신청",requested_at:k()};if(!m)u.payments=[{id:Date.now(),...n},...u.payments];else{const{error:c}=await m.from("payments").insert(n);if(c){o.disabled=!1,o.textContent="검토 요청 생성",t.textContent=`저장 실패: ${c.message}`,t.className="form-message error";return}}a.reset(),f=await y(),h(f,l?"신청이 저장됐습니다. 중복 의심 건은 결제 검토에서 확인하세요.":"신청이 저장됐습니다.")}function N(e){const a=e.stores.filter(n=>n.status==="완료").length,o=e.stores.filter(n=>n.status==="진행중").length,t=e.payments.filter(n=>n.status==="승인").reduce((n,c)=>n+c.amount,0),s=e.stores.reduce((n,c)=>n+c.spent,0),r=e.payments.filter(n=>n.status==="신청").length,i=e.vendors.filter(n=>n.risk==="증빙확인").length,p=e.payments.filter(n=>n.amount>3e7).length,l=Math.round(s/Math.max(e.stores.reduce((n,c)=>n+c.area,0),1));return[["완료된 매장",`${a}개`,"준공 및 정산 완료"],["진행중인 매장",`${o}개`,"시공 또는 비용 검수 중"],["승인된 공사비",d(t),"지급 승인 완료"],["실제 사용액",d(s),"전체 매장 누적"],["대기중인 결제",`${r}건`,"승인 전 검토 필요"],["증빙 미비",`${i}건`,"자료 보완 요청"],["중복 의심",`${p}건`,"금액/업체 패턴 확인"],["평균 평당 원가",d(l),"실사용액 기준"]]}function g(e,a){return`
    <div class="table-wrap">
      <table>
        <thead><tr>${e.map(o=>`<th>${o}</th>`).join("")}</tr></thead>
        <tbody>${a.join("")}</tbody>
      </table>
    </div>
  `}function h(e,a=""){const o=document.querySelector("#app");o.innerHTML=`
    <aside class="sidebar">
      <div class="brand">
        <span class="brand-mark">H</span>
        <div>
          <strong>HAKA Construction</strong>
          <small>공사비 관리 시스템</small>
        </div>
      </div>
      <nav>${S.map((t,s)=>`<button class="${s===0?"active":""}">${t}</button>`).join("")}</nav>
    </aside>
    <main class="shell">
      <header class="topbar">
        <div>
          <p>Admin Console</p>
          <h1>공사비 운영 대시보드</h1>
        </div>
        <div class="actions">
          <button>엑셀 업로드</button>
          <button class="primary">결제 신청</button>
        </div>
      </header>

      ${a?`<div class="toast">${a}</div>`:""}

      <section class="kpis">
        ${N(e).map(([t,s,r])=>`
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
            <button>전체 보기</button>
          </div>
          ${g(["매장","업체","금액","상태","신청일"],e.payments.map(t=>`
                <tr>
                  <td>${t.store}</td>
                  <td>${t.vendor}</td>
                  <td class="money">${d(t.amount)}</td>
                  <td><span class="badge ${b(t.status)}">${t.status}</span></td>
                  <td>${t.requested_at}</td>
                </tr>`))}
        </article>

        <article class="panel">
          <div class="panel-head">
            <h2>매장 공사 현황</h2>
            <button>관리</button>
          </div>
          ${g(["매장","면적","예산","사용액","상태"],e.stores.map(t=>`
                <tr>
                  <td>${t.name}</td>
                  <td>${t.area}평</td>
                  <td class="money">${d(t.budget)}</td>
                  <td class="money">${d(t.spent)}</td>
                  <td><span class="badge ${b(t.status)}">${t.status}</span></td>
                </tr>`))}
        </article>
      </section>

      <section class="grid lower">
        <article class="panel">
          <div class="panel-head">
            <h2>주요 협력업체</h2>
            <button>업체 추가</button>
          </div>
          ${g(["업체","분류","은행","누적 지급","상태"],e.vendors.map(t=>`
                <tr>
                  <td>${t.name}</td>
                  <td>${t.category}</td>
                  <td>${t.bank}</td>
                  <td class="money">${d(t.total)}</td>
                  <td><span class="badge ${b(t.risk)}">${t.risk}</span></td>
                </tr>`))}
        </article>

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
      </section>
    </main>
  `,document.querySelector("#payment-form").addEventListener("submit",A)}y().then(e=>{f=e,h(e)});
