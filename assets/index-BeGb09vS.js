import{createClient as O}from"https://esm.sh/@supabase/supabase-js@2.49.1";(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const a of document.querySelectorAll('link[rel="modulepreload"]'))r(a);new MutationObserver(a=>{for(const s of a)if(s.type==="childList")for(const o of s.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&r(o)}).observe(document,{childList:!0,subtree:!0});function n(a){const s={};return a.integrity&&(s.integrity=a.integrity),a.referrerPolicy&&(s.referrerPolicy=a.referrerPolicy),a.crossOrigin==="use-credentials"?s.credentials="include":a.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function r(a){if(a.ep)return;a.ep=!0;const s=n(a);fetch(a.href,s)}})();const R="https://yqemtsbdnypgmkuyncxh.supabase.co",T="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlxZW10c2JkbnlwZ21rdXluY3hoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODAyNjYwMTUsImV4cCI6MjA5NTg0MjAxNX0.gwgdCncqRKKgC8ebj7qIdT-vA4J-wOVd2O9DSa7xEOs",i=O(R,T),x="construction-start-files",d={payments:[{id:1,store:"성수 플래그십",vendor:"한빛전기",amount:184e5,status:"승인",requested_at:"2026-05-28"},{id:2,store:"부산 센텀",vendor:"도원인테리어",amount:327e5,status:"신청",requested_at:"2026-05-27"},{id:3,store:"대전 둔산",vendor:"서진설비",amount:98e5,status:"반려",requested_at:"2026-05-26"},{id:4,store:"제주 노형",vendor:"제이건축",amount:241e5,status:"승인",requested_at:"2026-05-25"}],stores:[{id:1,name:"성수 플래그십",area:52,status:"완료",budget:21e7,spent:1984e5},{id:2,name:"부산 센텀",area:47,status:"진행중",budget:186e6,spent:1227e5},{id:3,name:"대전 둔산",area:39,status:"진행중",budget:144e6,spent:882e5},{id:4,name:"제주 노형",area:42,status:"미착공",budget:158e6,spent:0}],vendors:[{id:1,name:"도원인테리어",category:"시공",bank:"신한은행",account_number:"110-000-000001",account_holder:"도원인테리어",risk:"정상",total:1245e5},{id:2,name:"한빛전기",category:"전기",bank:"국민은행",account_number:"004-000-000002",account_holder:"한빛전기",risk:"정상",total:738e5},{id:3,name:"서진설비",category:"설비",bank:"하나은행",account_number:"352-000-000003",account_holder:"서진설비",risk:"증빙확인",total:412e5}],constructionStarts:[]},E=["대시보드","엑셀 업로드","공사 시작 접수","결제 신청","업체/계좌 관리","매장별 공사 관리","진열장 원가 배분","견적서 생성","계약서 생성","은행 이체 파일 생성","관리자 설정"],j={"전체 관리자":E,"인테리어 공사실장":["공사 시작 접수","결제 신청","진열장 원가 배분"]},P={admin:"전체 관리자",interior_manager:"인테리어 공사실장","전체 관리자":"전체 관리자","인테리어 공사실장":"인테리어 공사실장"},V={"엑셀 업로드":["결제 신청 내역 엑셀 업로드","필수 컬럼 검증","중복/오류 행 표시"],"진열장 원가 배분":["매장별 진열장 비용 배분","공용 비용 자동 분배","평당 원가 반영"],"견적서 생성":["매장/업체 기준 견적서 생성","공사항목별 금액 자동 합산","PDF/문서 다운로드"],"계약서 생성":["업체 정보 기반 계약서 생성","계좌/사업자 정보 자동 반영","계약 상태 관리"],"은행 이체 파일 생성":["승인된 결제 건만 추출","은행 업로드용 파일 생성","이체 전 검증"],"관리자 설정":["사용자 권한","승인 단계","상태/분류 코드 관리"]};let f=d,u="대시보드",v="인테리어 공사실장",m=null;const y=e=>new Intl.NumberFormat("ko-KR",{style:"currency",currency:"KRW",maximumFractionDigits:0}).format(e||0),M=()=>new Date().toISOString().slice(0,10),C=e=>Number(String(e).replace(/[^\d]/g,"")),g=e=>String(e||"").replace(/&/g,"&amp;").replace(/"/g,"&quot;").replace(/</g,"&lt;").replace(/>/g,"&gt;"),K=e=>String(e||"file").replace(/[^\w.\-가-힣]/g,"_"),k=e=>({승인:"green",신청:"amber",반려:"red",진행중:"blue",완료:"green",미착공:"gray",정상:"green",증빙확인:"amber"})[e]||"gray";async function $(){if(!i)return d;const[e,t,n,r]=await Promise.all([i.from("payments").select("*").order("requested_at",{ascending:!1}).order("id",{ascending:!1}).limit(12),i.from("stores").select("*").order("id",{ascending:!0}),i.from("vendors").select("*").order("id",{ascending:!0}),i.from("construction_starts").select("*").order("created_at",{ascending:!1}).order("id",{ascending:!1}).limit(30)]);return{payments:e.error?d.payments:e.data,stores:t.error?d.stores:t.data,vendors:n.error?d.vendors:n.data,constructionStarts:r.error?d.constructionStarts:r.data}}async function L(e){if(!i||!(e!=null&&e.email))return"인테리어 공사실장";const{data:t,error:n}=await i.from("user_roles").select("role").ilike("email",e.email).maybeSingle();return n||!(t!=null&&t.role)?"인테리어 공사실장":P[t.role]||"인테리어 공사실장"}async function U(){var t;if(!i){f=await $(),v="전체 관리자",p();return}const{data:e}=await i.auth.getSession();if(m=((t=e.session)==null?void 0:t.user)||null,!m){h();return}v=await L(m),u=b()[0],f=await $(),p()}function J(e,t,n){return e.payments.find(r=>{const a=r.vendor.trim()===t.trim(),s=Math.abs(r.amount-n)/Math.max(n,1);return a&&s<=.1})}async function N(e,t){const n=Array.from(e||[]).filter(a=>a.size>0);if(!n.length)return[];if(!i)return n.map(a=>({name:a.name,type:a.type,size:a.size,path:"",url:""}));const r=[];for(const a of n){const s=`${(m==null?void 0:m.id)||"user"}/${t}/${Date.now()}-${crypto.randomUUID()}-${K(a.name)}`,{error:o}=await i.storage.from(x).upload(s,a,{contentType:a.type,upsert:!1});if(o)throw o;const{data:c}=i.storage.from(x).getPublicUrl(s);r.push({name:a.name,type:a.type,size:a.size,path:s,url:c.publicUrl})}return r}async function z(e){e.preventDefault();const t=e.currentTarget,n=t.querySelector("button[type='submit']"),r=t.querySelector("[data-form-message]"),a=new FormData(t),s=String(a.get("store")||"").trim(),o=String(a.get("vendor")||"").trim(),c=C(a.get("amount")),w=J(f,o,c);if(!s||!o||!c){r.textContent="매장명, 업체, 신청 금액을 모두 입력해 주세요.",r.className="form-message error";return}n.disabled=!0,n.textContent="저장 중",r.textContent=w?`중복 의심: ${w.store} / ${y(w.amount)} 건과 비슷합니다.`:"신청 건을 저장하고 있습니다.",r.className=w?"form-message warning":"form-message";const q={store:s,vendor:o,amount:c,status:"신청",requested_at:M()};if(!i)d.payments=[{id:Date.now(),...q},...d.payments];else{const{error:l}=await i.from("payments").insert(q);if(l){n.disabled=!1,n.textContent="검토 요청 생성",r.textContent=`저장 실패: ${l.message}`,r.className="form-message error";return}}t.reset(),f=await $(),p(w?"신청이 저장됐습니다. 중복 의심 건은 결제 검토에서 확인하세요.":"신청이 저장됐습니다.")}async function B(e){e.preventDefault();const t=e.currentTarget,n=t.querySelector("button[type='submit']"),r=t.querySelector("[data-vendor-message]"),a=new FormData(t),s={name:String(a.get("name")||"").trim(),category:String(a.get("category")||"").trim(),bank:String(a.get("bank")||"").trim(),account_number:String(a.get("account_number")||"").trim(),account_holder:String(a.get("account_holder")||"").trim(),risk:"정상",total:0};if(!s.name||!s.category||!s.bank||!s.account_number||!s.account_holder){r.textContent="업체명, 분류, 은행, 계좌번호, 예금주를 모두 입력해 주세요.",r.className="form-message error";return}if(n.disabled=!0,n.textContent="저장 중",r.textContent="업체/계좌 정보를 저장하고 있습니다.",r.className="form-message",!i)d.vendors=[{id:Date.now(),...s},...d.vendors];else{const{error:o}=await i.from("vendors").insert(s);if(o){n.disabled=!1,n.textContent="업체 저장",r.textContent=`저장 실패: ${o.message}`,r.className="form-message error";return}}t.reset(),f=await $(),u="업체/계좌 관리",p("업체/계좌 정보가 저장됐습니다.")}async function H(e){e.preventDefault();const t=e.currentTarget,n=t.querySelector("button[type='submit']"),r=t.querySelector("[data-store-message]"),a=new FormData(t),s={name:String(a.get("name")||"").trim(),area:Number(a.get("area")),status:String(a.get("status")||"미착공"),budget:C(a.get("budget")),spent:C(a.get("spent"))};if(!s.name||!s.area||!s.budget){r.textContent="매장명, 면적, 예산을 입력해 주세요.",r.className="form-message error";return}if(n.disabled=!0,n.textContent="저장 중",r.textContent="매장 공사 정보를 저장하고 있습니다.",r.className="form-message",!i)d.stores=[{id:Date.now(),...s},...d.stores];else{const{error:o}=await i.from("stores").insert(s);if(o){n.disabled=!1,n.textContent="매장 저장",r.textContent=`저장 실패: ${o.message}`,r.className="form-message error";return}}t.reset(),f=await $(),u="매장별 공사 관리",p("매장 공사 정보가 저장됐습니다.")}async function X(e){e.preventDefault();const t=e.currentTarget,n=t.querySelector("button[type='submit']"),r=t.querySelector("[data-construction-start-message]"),a=new FormData(t),s={store_name:String(a.get("store_name")||"").trim(),area:Number(a.get("area")),fixture_count:Number(a.get("fixture_count")||0),table_count:Number(a.get("table_count")||0),sign_count:Number(a.get("sign_count")||0),special_notes:String(a.get("special_notes")||"").trim()};if(!s.store_name||!s.area){r.textContent="매장명과 평수는 꼭 입력해 주세요.",r.className="form-message error";return}n.disabled=!0,n.textContent="저장 중",r.textContent="도면과 사진 파일을 업로드하고 있습니다.",r.className="form-message";try{s.drawing_files=await N(a.getAll("drawing_files"),"drawings"),s.base_photo_files=await N(a.getAll("base_photo_files"),"base-photos")}catch(o){n.disabled=!1,n.textContent="공사 시작 정보 저장",r.textContent=`파일 업로드 실패: ${o.message}`,r.className="form-message error";return}if(r.textContent="공사 시작 정보를 저장하고 있습니다.",!i)d.constructionStarts=[{id:Date.now(),created_at:new Date().toISOString(),...s},...d.constructionStarts];else{const{error:o}=await i.from("construction_starts").insert(s);if(o){n.disabled=!1,n.textContent="공사 시작 정보 저장",r.textContent=`저장 실패: ${o.message}`,r.className="form-message error";return}}t.reset(),f=await $(),u="공사 시작 접수",p("공사 시작 정보가 저장됐습니다. 결제 신청 매장 검색에도 반영됐습니다.")}async function Y(e,t){if(!(!e||!["승인","반려"].includes(t))){if(!i)d.payments=d.payments.map(n=>n.id===e?{...n,status:t}:n);else{const{error:n}=await i.from("payments").update({status:t}).eq("id",e).eq("status","신청");if(n){p(`상태 변경 실패: ${n.message}`);return}}f=await $(),u="결제 신청",p(`결제 신청이 ${t} 처리됐습니다.`)}}function Z(e){const t=e.stores.filter(l=>l.status==="완료").length,n=e.stores.filter(l=>l.status==="진행중").length,r=e.stores.filter(l=>l.document_required).length,a=e.payments.filter(l=>l.status==="승인").reduce((l,_)=>l+_.amount,0),s=e.stores.reduce((l,_)=>l+Number(_.spent||0),0),o=e.payments.filter(l=>l.status==="신청").length,c=e.stores.filter(l=>String(l.name||"").includes("직영점")).length,w=e.stores.reduce((l,_)=>l+Number(_.area||0),0),q=Math.round(s/Math.max(w,1));return[["완료된 매장",`${t}개`,"엑셀 공사 상태 기준"],["진행중인 매장",`${n}개`,"시공 또는 비용 검수 중"],["전체 공사비",y(s),"엑셀 합계 기준"],["문서 생성 대상",`${r}개`,"강남압구정 행부터 아래"],["대기중인 결제",`${o}건`,"승인 전 검토 필요"],["직영점",`${c}개`,"지점명 기준"],["승인된 결제",y(a),"지급 승인 완료"],["평균 평당 원가",y(q),"엑셀 합계/평수 기준"]]}function S(e,t){return`
    <div class="table-wrap">
      <table>
        <thead><tr>${e.map(n=>`<th>${n}</th>`).join("")}</tr></thead>
        <tbody>${t.join("")}</tbody>
      </table>
    </div>
  `}function W(e){return e.payments.map(t=>`
      <tr>
        <td>${t.store}</td>
        <td>${t.vendor}</td>
        <td class="money">${y(t.amount)}</td>
        <td><span class="badge ${k(t.status)}">${t.status}</span></td>
        <td>${t.requested_at}</td>
      </tr>`)}function G(e){return e.payments.map(t=>`
      <tr>
        <td>${t.store}</td>
        <td>${t.vendor}</td>
        <td class="money">${y(t.amount)}</td>
        <td><span class="badge ${k(t.status)}">${t.status}</span></td>
        <td>${t.requested_at}</td>
        <td>
          ${t.status==="신청"?`<div class="row-actions">
                  <button data-payment-id="${t.id}" data-payment-status="승인">승인</button>
                  <button data-payment-id="${t.id}" data-payment-status="반려">반려</button>
                </div>`:'<span class="muted">처리 완료</span>'}
        </td>
      </tr>`)}function A(e){return e.stores.map(t=>`
      <tr>
        <td>${t.region||"-"}</td>
        <td>${t.name}</td>
        <td>${t.fixture_count||0}</td>
        <td>${t.area}평</td>
        <td class="money">${y(t.budget)}</td>
        <td><span class="badge ${k(t.status)}">${t.status}</span></td>
        <td><span class="badge ${t.document_required?"blue":"gray"}">${t.document_required?"생성 대상":"출력 완료"}</span></td>
      </tr>`)}function D(e,t=""){const n=Array.isArray(e)?e:[];return n.length?n.map(r=>r.url?`<a href="${g(r.url)}" target="_blank" rel="noreferrer">${g(r.name||"파일")}</a>`:`<span>${g(r.name||"파일")}</span>`).join("<br />"):t||"-"}function Q(e){return e.constructionStarts.map(t=>`
      <tr>
        <td>${t.store_name}</td>
        <td>${t.area}평</td>
        <td>${t.fixture_count||0}</td>
        <td>${t.table_count||0}</td>
        <td>${t.sign_count||0}</td>
        <td>${D(t.drawing_files,t.drawing_note)}</td>
        <td>${D(t.base_photo_files,t.base_photo_note)}</td>
        <td>${t.special_notes||"-"}</td>
      </tr>`)}function F(e){return e.vendors.map(t=>`
      <tr>
        <td>${t.name}</td>
        <td>${t.category}</td>
        <td>${t.bank}</td>
        <td>${t.account_number||"-"}</td>
        <td>${t.account_holder||"-"}</td>
        <td class="money">${y(t.total)}</td>
        <td><span class="badge ${k(t.risk)}">${t.risk}</span></td>
      </tr>`)}function tt(e){return e.vendors.map(t=>`<option value="${g(t.name)}">${g(t.name)} / ${g(t.bank)} ${g(t.account_number||"")}</option>`).join("")}function et(e){const n=[...e.constructionStarts.map(a=>({name:a.store_name,area:a.area,status:"공사 시작 접수"})),...e.stores],r=new Set;return n.filter(a=>{const s=String(a.name||"").trim();return!s||r.has(s)?!1:(r.add(s),!0)}).map(a=>`<option value="${g(a.name)}">${g(a.name)} / ${g(a.area)}평 / ${g(a.status)}</option>`).join("")}function I(){return`
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
            ${et(f)}
          </datalist>
        </label>
        <label>협력업체
          <input name="vendor" list="vendor-suggestions" placeholder="직접입력 또는 업체명 검색" autocomplete="off" />
          <datalist id="vendor-suggestions">
            <option value="직접입력">직접입력</option>
            ${tt(f)}
          </datalist>
        </label>
        <label>신청 금액<input name="amount" inputmode="numeric" placeholder="예: 18500000" autocomplete="off" /></label>
        <p class="form-message" data-form-message></p>
        <button class="primary wide" type="submit">검토 요청 생성</button>
      </form>
    </article>
  `}function at(){return`
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
  `}function nt(){return`
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
  `}function rt(){return`
    <article class="panel form-panel">
      <div class="panel-head">
        <h2>공사 시작 정보 입력</h2>
      </div>
      <div class="notice">직영매장 공사 시작 전에 필요한 도면, 수량, 사진, 특이사항을 먼저 접수합니다.</div>
      <form id="construction-start-form">
        <label>매장명<input name="store_name" placeholder="예: 강남압구정 직영점" autocomplete="off" /></label>
        <label>평수<input name="area" inputmode="numeric" placeholder="예: 45" autocomplete="off" /></label>
        <label>도면 파일<input name="drawing_files" type="file" accept="image/*,application/pdf" multiple /></label>
        <label>필요한 진열장 수<input name="fixture_count" inputmode="numeric" placeholder="예: 8" autocomplete="off" /></label>
        <label>필요한 테이블 수<input name="table_count" inputmode="numeric" placeholder="예: 3" autocomplete="off" /></label>
        <label>광고판 갯수<input name="sign_count" inputmode="numeric" placeholder="예: 2" autocomplete="off" /></label>
        <label>매장 기초 사진<input name="base_photo_files" type="file" accept="image/*,application/pdf" multiple /></label>
        <label>특이사항<textarea name="special_notes" placeholder="현장 특이사항, 요청사항, 주의할 점"></textarea></label>
        <p class="form-message" data-construction-start-message></p>
        <button class="primary wide" type="submit">공사 시작 정보 저장</button>
      </form>
    </article>
  `}function st(e){return`
    <section class="kpis">
      ${Z(e).map(([t,n,r])=>`
            <article class="kpi">
              <span>${t}</span>
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
        ${S(["매장","업체","금액","상태","신청일"],W(e))}
      </article>

      <article class="panel">
        <div class="panel-head">
          <h2>매장 공사 현황</h2>
          <button data-view-link="매장별 공사 관리">관리</button>
        </div>
        ${S(["지역","매장","진열장","평수","공사비 합계","상태","문서"],A(e))}
      </article>
    </section>

    <section class="grid lower">
      <article class="panel">
        <div class="panel-head">
          <h2>주요 협력업체</h2>
          <button data-view-link="업체/계좌 관리">업체 추가</button>
        </div>
        ${S(["업체","분류","은행","계좌번호","예금주","누적 지급","상태"],F(e))}
      </article>
      ${I()}
    </section>
  `}function ot(e){return`
    <section class="grid two">
      ${I()}
      <article class="panel">
        <div class="panel-head">
          <h2>결제 신청 검토</h2>
          <button>승인 대기 ${e.payments.filter(t=>t.status==="신청").length}건</button>
        </div>
        ${S(["매장","업체","금액","상태","신청일","처리"],G(e))}
      </article>
    </section>
  `}function it(e){return`
    <section class="grid two">
      ${rt()}
      <article class="panel">
        <div class="panel-head">
          <h2>공사 시작 접수 목록</h2>
          <button>${e.constructionStarts.length}건 접수</button>
        </div>
        ${S(["매장","평수","진열장","테이블","광고판","도면","기초 사진","특이사항"],Q(e))}
      </article>
    </section>
  `}function ct(e){return`
    <section class="grid two">
      ${at()}
      <article class="panel">
        <div class="panel-head">
          <h2>업체/계좌 목록</h2>
          <button>${e.vendors.length}개 등록</button>
        </div>
        ${S(["업체","분류","은행","계좌번호","예금주","누적 지급","상태"],F(e))}
      </article>
    </section>
  `}function lt(e){return`
    <section class="grid two">
      ${nt()}
      <article class="panel">
        <div class="panel-head">
          <h2>매장별 공사 목록</h2>
          <button>${e.stores.length}개 매장</button>
        </div>
        ${S(["지역","매장","진열장","평수","공사비 합계","상태","문서"],A(e))}
      </article>
    </section>
  `}function ut(e){const t=V[e]||["기능 범위 정의","입력 항목 확정","데이터 연결"];return`
    <section class="panel empty-panel">
      <h2>${e}</h2>
      <p>이 메뉴는 다음 단계에서 구현할 기능입니다. 지금은 확인해야 할 항목을 먼저 고정해둔 상태입니다.</p>
      <div class="check-list">
        ${t.map(n=>`<span>${n}</span>`).join("")}
      </div>
    </section>
  `}function dt(e){return u==="대시보드"?st(e):u==="공사 시작 접수"?it(e):u==="결제 신청"?ot(e):u==="업체/계좌 관리"?ct(e):u==="매장별 공사 관리"?lt(e):ut(u)}function b(){return j[v]||E}function mt(){return`
    <div class="session-box">
      <span>${(m==null?void 0:m.email)||""}</span>
      <strong>${v}</strong>
      <button data-sign-out>로그아웃</button>
    </div>
  `}function h(e=""){const t=document.querySelector("#app");t.className="auth-shell",t.innerHTML=`
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
  `,document.querySelector("#auth-form").addEventListener("submit",pt),document.querySelector("[data-auth-action='signup']").addEventListener("click",ft),document.querySelector("[data-auth-action='resend']").addEventListener("click",gt)}async function pt(e){e.preventDefault();const t=new FormData(e.currentTarget),n=String(t.get("email")||"").trim(),r=String(t.get("password")||"");if(!n||!r){h("이메일과 비밀번호를 입력해 주세요.");return}const{data:a,error:s}=await i.auth.signInWithPassword({email:n,password:r});if(s){h(`로그인 실패: ${s.message}`);return}m=a.user,v=await L(m),u=b()[0],f=await $(),p()}async function ft(){const e=document.querySelector("#auth-form"),t=new FormData(e),n=String(t.get("email")||"").trim(),r=String(t.get("password")||"");if(!n||!r){h("계정을 만들 이메일과 비밀번호를 입력해 주세요.");return}const{error:a}=await i.auth.signUp({email:n,password:r,options:{emailRedirectTo:window.location.origin+window.location.pathname}});if(a){h(`회원가입 실패: ${a.message}`);return}h("계정이 생성됐습니다. 이메일 확인이 필요한 경우 메일 인증 후 로그인해 주세요.")}async function gt(){const e=document.querySelector("#auth-form"),t=new FormData(e),n=String(t.get("email")||"").trim();if(!n){h("인증메일을 다시 받을 이메일을 입력해 주세요.");return}const{error:r}=await i.auth.resend({type:"signup",email:n,options:{emailRedirectTo:window.location.origin+window.location.pathname}});if(r){h(`인증메일 재발송 실패: ${r.message}`);return}h("인증메일을 다시 보냈습니다. 새로 받은 메일의 링크를 눌러 주세요.")}async function bt(){await i.auth.signOut(),m=null,v="인테리어 공사실장",h("로그아웃되었습니다.")}function p(e=""){var o;const t=document.querySelector("#app");t.className="",b().includes(u)||(u=b()[0]),t.innerHTML=`
    <aside class="sidebar">
      <div class="brand">
        <span class="brand-mark">H</span>
        <div>
          <strong>HAKA Construction</strong>
          <small>공사비 관리 시스템</small>
        </div>
      </div>
      <nav>
        ${b().map(c=>`<button data-view="${c}" class="${c===u?"active":""}">${c}</button>`).join("")}
      </nav>
    </aside>
    <main class="shell">
      <header class="topbar">
        <div>
          <p>${v}</p>
          <h1>${u}</h1>
        </div>
        <div class="actions">
          ${mt()}
          ${b().includes("엑셀 업로드")?'<button data-view-link="엑셀 업로드">엑셀 업로드</button>':""}
          ${b().includes("결제 신청")?'<button class="primary" data-view-link="결제 신청">결제 신청</button>':""}
        </div>
      </header>

      ${e?`<div class="toast">${e}</div>`:""}
      ${dt(f)}
    </main>
  `,document.querySelectorAll("[data-view]").forEach(c=>{c.addEventListener("click",()=>{u=c.dataset.view,p()})}),document.querySelectorAll("[data-role]").forEach(c=>{c.addEventListener("click",()=>{v=c.dataset.role,b().includes(u)||(u=b()[0]),p()})}),(o=document.querySelector("[data-sign-out]"))==null||o.addEventListener("click",bt),document.querySelectorAll("[data-view-link]").forEach(c=>{c.addEventListener("click",()=>{b().includes(c.dataset.viewLink)&&(u=c.dataset.viewLink),p()})});const n=document.querySelector("#payment-form");n&&n.addEventListener("submit",z);const r=document.querySelector("#vendor-form");r&&r.addEventListener("submit",B);const a=document.querySelector("#store-form");a&&a.addEventListener("submit",H);const s=document.querySelector("#construction-start-form");s&&s.addEventListener("submit",X),document.querySelectorAll("[data-payment-id][data-payment-status]").forEach(c=>{c.addEventListener("click",()=>{Y(Number(c.dataset.paymentId),c.dataset.paymentStatus)})})}U();
