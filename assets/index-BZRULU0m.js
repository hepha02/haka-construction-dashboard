import{createClient as g}from"https://esm.sh/@supabase/supabase-js@2.49.1";(function(){const r=document.createElement("link").relList;if(r&&r.supports&&r.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))o(s);new MutationObserver(s=>{for(const n of s)if(n.type==="childList")for(const l of n.addedNodes)l.tagName==="LINK"&&l.rel==="modulepreload"&&o(l)}).observe(document,{childList:!0,subtree:!0});function t(s){const n={};return s.integrity&&(n.integrity=s.integrity),s.referrerPolicy&&(n.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?n.credentials="include":s.crossOrigin==="anonymous"?n.credentials="omit":n.credentials="same-origin",n}function o(s){if(s.ep)return;s.ep=!0;const n=t(s);fetch(s.href,n)}})();const h="https://yqemtsbdnypgmkuyncxh.supabase.co",y="sb_publishable_NLGUYb8d4jA2IRyaGza4lw_30c-gIYj",c=g(h,y),u={payments:[{id:1,store:"성수 플래그십",vendor:"한빛전기",amount:184e5,status:"승인",requested_at:"2026-05-28"},{id:2,store:"부산 센텀",vendor:"도원인테리어",amount:327e5,status:"신청",requested_at:"2026-05-27"},{id:3,store:"대전 둔산",vendor:"서진설비",amount:98e5,status:"반려",requested_at:"2026-05-26"},{id:4,store:"제주 노형",vendor:"제이건축",amount:241e5,status:"승인",requested_at:"2026-05-25"}],stores:[{id:1,name:"성수 플래그십",area:52,status:"완료",budget:21e7,spent:1984e5},{id:2,name:"부산 센텀",area:47,status:"진행중",budget:186e6,spent:1227e5},{id:3,name:"대전 둔산",area:39,status:"진행중",budget:144e6,spent:882e5},{id:4,name:"제주 노형",area:42,status:"미착공",budget:158e6,spent:0}],vendors:[{id:1,name:"도원인테리어",category:"시공",bank:"신한은행",risk:"정상",total:1245e5},{id:2,name:"한빛전기",category:"전기",bank:"국민은행",risk:"정상",total:738e5},{id:3,name:"서진설비",category:"설비",bank:"하나은행",risk:"증빙확인",total:412e5}]},v=["대시보드","엑셀 업로드","결제 신청","업체/계좌 관리","매장별 공사 관리","진열장 원가 배분","견적서 생성","계약서 생성","은행 이체 파일 생성","관리자 설정"],i=e=>new Intl.NumberFormat("ko-KR",{style:"currency",currency:"KRW",maximumFractionDigits:0}).format(e),p=e=>({승인:"green",신청:"amber",반려:"red",진행중:"blue",완료:"green",미착공:"gray",정상:"green",증빙확인:"amber"})[e]||"gray";async function $(){if(!c)return u;const[e,r,t]=await Promise.all([c.from("payments").select("*").order("requested_at",{ascending:!1}).limit(8),c.from("stores").select("*").order("id",{ascending:!0}),c.from("vendors").select("*").order("id",{ascending:!0})]);return{payments:e.error?u.payments:e.data,stores:r.error?u.stores:r.data,vendors:t.error?u.vendors:t.data}}function k(e){const r=e.stores.filter(a=>a.status==="완료").length,t=e.stores.filter(a=>a.status==="진행중").length,o=e.payments.filter(a=>a.status==="승인").reduce((a,d)=>a+d.amount,0),s=e.stores.reduce((a,d)=>a+d.spent,0),n=e.payments.filter(a=>a.status==="신청").length,l=e.vendors.filter(a=>a.risk==="증빙확인").length,b=e.payments.filter(a=>a.amount>3e7).length,f=Math.round(s/Math.max(e.stores.reduce((a,d)=>a+d.area,0),1));return[["완료된 매장",`${r}개`,"준공 및 정산 완료"],["진행중인 매장",`${t}개`,"시공 또는 비용 검수 중"],["승인된 공사비",i(o),"지급 승인 완료"],["실제 사용액",i(s),"전체 매장 누적"],["대기중인 결제",`${n}건`,"승인 전 검토 필요"],["증빙 미비",`${l}건`,"자료 보완 요청"],["중복 의심",`${b}건`,"금액/업체 패턴 확인"],["평균 평당 원가",i(f),"실사용액 기준"]]}function m(e,r){return`
    <div class="table-wrap">
      <table>
        <thead><tr>${e.map(t=>`<th>${t}</th>`).join("")}</tr></thead>
        <tbody>${r.join("")}</tbody>
      </table>
    </div>
  `}function _(e){const r=document.querySelector("#app");r.innerHTML=`
    <aside class="sidebar">
      <div class="brand">
        <span class="brand-mark">H</span>
        <div>
          <strong>HAKA Construction</strong>
          <small>공사비 관리 시스템</small>
        </div>
      </div>
      <nav>${v.map((t,o)=>`<button class="${o===0?"active":""}">${t}</button>`).join("")}</nav>
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

      <section class="kpis">
        ${k(e).map(([t,o,s])=>`
              <article class="kpi">
                <span>${t}</span>
                <strong>${o}</strong>
                <small>${s}</small>
              </article>`).join("")}
      </section>

      <section class="grid two">
        <article class="panel">
          <div class="panel-head">
            <h2>최근 결제 신청</h2>
            <button>전체 보기</button>
          </div>
          ${m(["매장","업체","금액","상태","신청일"],e.payments.map(t=>`
                <tr>
                  <td>${t.store}</td>
                  <td>${t.vendor}</td>
                  <td class="money">${i(t.amount)}</td>
                  <td><span class="badge ${p(t.status)}">${t.status}</span></td>
                  <td>${t.requested_at}</td>
                </tr>`))}
        </article>

        <article class="panel">
          <div class="panel-head">
            <h2>매장 공사 현황</h2>
            <button>관리</button>
          </div>
          ${m(["매장","면적","예산","사용액","상태"],e.stores.map(t=>`
                <tr>
                  <td>${t.name}</td>
                  <td>${t.area}평</td>
                  <td class="money">${i(t.budget)}</td>
                  <td class="money">${i(t.spent)}</td>
                  <td><span class="badge ${p(t.status)}">${t.status}</span></td>
                </tr>`))}
        </article>
      </section>

      <section class="grid lower">
        <article class="panel">
          <div class="panel-head">
            <h2>주요 협력업체</h2>
            <button>업체 추가</button>
          </div>
          ${m(["업체","분류","은행","누적 지급","상태"],e.vendors.map(t=>`
                <tr>
                  <td>${t.name}</td>
                  <td>${t.category}</td>
                  <td>${t.bank}</td>
                  <td class="money">${i(t.total)}</td>
                  <td><span class="badge ${p(t.risk)}">${t.risk}</span></td>
                </tr>`))}
        </article>

        <article class="panel form-panel">
          <div class="panel-head">
            <h2>결제 신청 입력</h2>
          </div>
          <div class="notice">같은 업체와 비슷한 금액의 최근 신청 건이 있으면 중복 의심으로 표시됩니다.</div>
          <label>매장명<input placeholder="예: 성수 플래그십" /></label>
          <label>협력업체<input placeholder="업체명을 입력" /></label>
          <label>신청 금액<input placeholder="₩0" /></label>
          <button class="primary wide">검토 요청 생성</button>
        </article>
      </section>
    </main>
  `}$().then(_);
