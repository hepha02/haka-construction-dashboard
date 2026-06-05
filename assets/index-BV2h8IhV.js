import{createClient as T}from"https://esm.sh/@supabase/supabase-js@2.49.1";(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const a of document.querySelectorAll('link[rel="modulepreload"]'))s(a);new MutationObserver(a=>{for(const r of a)if(r.type==="childList")for(const o of r.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&s(o)}).observe(document,{childList:!0,subtree:!0});function n(a){const r={};return a.integrity&&(r.integrity=a.integrity),a.referrerPolicy&&(r.referrerPolicy=a.referrerPolicy),a.crossOrigin==="use-credentials"?r.credentials="include":a.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function s(a){if(a.ep)return;a.ep=!0;const r=n(a);fetch(a.href,r)}})();const P="https://yqemtsbdnypgmkuyncxh.supabase.co",V="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlxZW10c2JkbnlwZ21rdXluY3hoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODAyNjYwMTUsImV4cCI6MjA5NTg0MjAxNX0.gwgdCncqRKKgC8ebj7qIdT-vA4J-wOVd2O9DSa7xEOs",i=T(P,V),N="construction-start-files",R=["철거","금속공사","목작업","목자재","전기","전기자재","간판","임시간판","돌출간판","실내광고외","광고 시트","자판기 유리작업","자동문 /강화도어","자동문","강화도어","페인트자재","도장공사","타일자재","타일 부자재","타일시공","타일","싱크 개수대","설비","진열장","카운터 역채널","인조대리석","유리/무늬목작접등 기타잡비","유리","무늬목","기타잡비","스카이","에어컨","소방설비","가구운송","엠프","오픈현수막","열쇠/철물","열쇠","철물","청소","폐기물","추가공사","기타"],d={payments:[],stores:[{id:1,name:"성수 플래그십",area:52,status:"완료",budget:21e7,spent:1984e5},{id:2,name:"부산 센텀",area:47,status:"진행중",budget:186e6,spent:1227e5},{id:3,name:"대전 둔산",area:39,status:"진행중",budget:144e6,spent:882e5},{id:4,name:"제주 노형",area:42,status:"미착공",budget:158e6,spent:0}],vendors:[{id:1,name:"도원인테리어",category:"시공",bank:"신한은행",account_number:"110-000-000001",account_holder:"도원인테리어",risk:"정상",total:1245e5},{id:2,name:"한빛전기",category:"전기",bank:"국민은행",account_number:"004-000-000002",account_holder:"한빛전기",risk:"정상",total:738e5},{id:3,name:"서진설비",category:"설비",bank:"하나은행",account_number:"352-000-000003",account_holder:"서진설비",risk:"증빙확인",total:412e5}],userRoles:[],paymentItems:R,constructionStarts:[]},E=["대시보드","엑셀 업로드","공사 시작 접수","결제 신청","업체/계좌 관리","매장별 공사 관리","진열장 원가 배분","견적서 생성","계약서 생성","은행 이체 파일 생성","관리자 설정"],x={"전체 관리자":E,"인테리어 공사실장":["공사 시작 접수","결제 신청","업체/계좌 관리","진열장 원가 배분"]},L={admin:"전체 관리자",interior_manager:"인테리어 공사실장","전체 관리자":"전체 관리자","인테리어 공사실장":"인테리어 공사실장"},M={"엑셀 업로드":["결제 신청 내역 엑셀 업로드","필수 컬럼 검증","중복/오류 행 표시"],"진열장 원가 배분":["매장별 진열장 비용 배분","공용 비용 자동 분배","평당 원가 반영"],"견적서 생성":["매장/업체 기준 견적서 생성","공사항목별 금액 자동 합산","PDF/문서 다운로드"],"계약서 생성":["업체 정보 기반 계약서 생성","계좌/사업자 정보 자동 반영","계약 상태 관리"],"은행 이체 파일 생성":["승인된 결제 건만 추출","은행 업로드용 파일 생성","이체 전 검증"],"관리자 설정":["사용자 권한","승인 단계","상태/분류 코드 관리"]};let p=d,l="대시보드",w="인테리어 공사실장",f=null;const v=e=>new Intl.NumberFormat("ko-KR",{style:"currency",currency:"KRW",maximumFractionDigits:0}).format(e||0),K=()=>new Date().toISOString().slice(0,10),C=e=>Number(String(e).replace(/[^\d]/g,"")),m=e=>String(e||"").replace(/&/g,"&amp;").replace(/"/g,"&quot;").replace(/</g,"&lt;").replace(/>/g,"&gt;"),U=e=>String(e||"file").replace(/[^\w.\-가-힣]/g,"_"),q=e=>({승인:"green",신청:"amber",반려:"red",진행중:"blue",완료:"green",미착공:"gray",정상:"green",증빙확인:"amber"})[e]||"gray";async function S(){if(!i)return d;const[e,t,n,s,a,r]=await Promise.all([i.from("payments").select("*").order("requested_at",{ascending:!1}).order("id",{ascending:!1}).limit(12),i.from("stores").select("*").order("id",{ascending:!0}),i.from("vendors").select("*").order("id",{ascending:!0}),i.from("construction_starts").select("*").order("created_at",{ascending:!1}).order("id",{ascending:!1}).limit(30),i.from("user_roles").select("email, role, created_at").order("email",{ascending:!0}),i.from("construction_cost_parts").select("part_name").order("part_name",{ascending:!0})]),o=r.error?d.paymentItems:[...new Set([...R,...r.data.map(c=>c.part_name).filter(Boolean)])];return{payments:e.error?d.payments:e.data,stores:t.error?d.stores:t.data,vendors:n.error?d.vendors:n.data,constructionStarts:s.error?d.constructionStarts:s.data,userRoles:a.error?d.userRoles:a.data,paymentItems:o}}async function A(e){if(!i||!(e!=null&&e.email))return"인테리어 공사실장";const{data:t,error:n}=await i.from("user_roles").select("role").ilike("email",e.email).maybeSingle();return n||!(t!=null&&t.role)?"인테리어 공사실장":L[t.role]||"인테리어 공사실장"}async function B(){var t;if(!i){p=await S(),w="전체 관리자",g();return}const{data:e}=await i.auth.getSession();if(f=((t=e.session)==null?void 0:t.user)||null,!f){h();return}w=await A(f),l=b()[0],p=await S(),g()}function J(e,t,n){return e.payments.find(s=>{const a=s.vendor.trim()===t.trim(),r=Math.abs(s.amount-n)/Math.max(n,1);return a&&r<=.1})}async function D(e,t){const n=Array.from(e||[]).filter(a=>a.size>0);if(!n.length)return[];if(!i)return n.map(a=>({name:a.name,type:a.type,size:a.size,path:"",url:""}));const s=[];for(const a of n){const r=`${(f==null?void 0:f.id)||"user"}/${t}/${Date.now()}-${crypto.randomUUID()}-${U(a.name)}`,{error:o}=await i.storage.from(N).upload(r,a,{contentType:a.type,upsert:!1});if(o)throw o;const{data:c}=i.storage.from(N).getPublicUrl(r);s.push({name:a.name,type:a.type,size:a.size,path:r,url:c.publicUrl})}return s}async function z(e){e.preventDefault();const t=e.currentTarget,n=t.querySelector("button[type='submit']"),s=t.querySelector("[data-form-message]"),a=new FormData(t),r=String(a.get("store")||"").trim(),o=String(a.get("vendor")||"").trim(),c=String(a.get("payment_item")||"").trim(),k=C(a.get("amount")),_=J(p,o,k);if(!r||!o||!c||!k){s.textContent="매장명, 업체, 결제 항목, 신청 금액을 모두 입력해 주세요.",s.className="form-message error";return}n.disabled=!0,n.textContent="저장 중",s.textContent=_?`중복 의심: ${_.store} / ${v(_.amount)} 건과 비슷합니다.`:"신청 건을 저장하고 있습니다.",s.className=_?"form-message warning":"form-message";const u={store:r,vendor:o,payment_item:c,amount:k,status:"신청",requested_at:K()};if(!i)d.payments=[{id:Date.now(),...u},...d.payments];else{const{error:$}=await i.from("payments").insert(u);if($){n.disabled=!1,n.textContent="검토 요청 생성",s.textContent=`저장 실패: ${$.message}`,s.className="form-message error";return}}t.reset(),p=await S(),g(_?"신청이 저장됐습니다. 중복 의심 건은 결제 검토에서 확인하세요.":"신청이 저장됐습니다.")}async function H(e){e.preventDefault();const t=e.currentTarget,n=t.querySelector("button[type='submit']"),s=t.querySelector("[data-vendor-message]"),a=new FormData(t),r={name:String(a.get("name")||"").trim(),category:String(a.get("category")||"").trim(),bank:String(a.get("bank")||"").trim(),account_number:String(a.get("account_number")||"").trim(),account_holder:String(a.get("account_holder")||"").trim(),risk:"정상",total:0};if(!r.name||!r.category||!r.bank||!r.account_number||!r.account_holder){s.textContent="업체명, 분류, 은행, 계좌번호, 예금주를 모두 입력해 주세요.",s.className="form-message error";return}if(n.disabled=!0,n.textContent="저장 중",s.textContent="업체/계좌 정보를 저장하고 있습니다.",s.className="form-message",!i)d.vendors=[{id:Date.now(),...r},...d.vendors];else{const{error:o}=await i.from("vendors").insert(r);if(o){n.disabled=!1,n.textContent="업체 저장",s.textContent=`저장 실패: ${o.message}`,s.className="form-message error";return}}t.reset(),p=await S(),l="업체/계좌 관리",g("업체/계좌 정보가 저장됐습니다.")}async function X(e){e.preventDefault();const t=e.currentTarget,n=t.querySelector("button[type='submit']"),s=t.querySelector("[data-store-message]"),a=new FormData(t),r={name:String(a.get("name")||"").trim(),area:Number(a.get("area")),status:String(a.get("status")||"미착공"),budget:C(a.get("budget")),spent:C(a.get("spent"))};if(!r.name||!r.area||!r.budget){s.textContent="매장명, 면적, 예산을 입력해 주세요.",s.className="form-message error";return}if(n.disabled=!0,n.textContent="저장 중",s.textContent="매장 공사 정보를 저장하고 있습니다.",s.className="form-message",!i)d.stores=[{id:Date.now(),...r},...d.stores];else{const{error:o}=await i.from("stores").insert(r);if(o){n.disabled=!1,n.textContent="매장 저장",s.textContent=`저장 실패: ${o.message}`,s.className="form-message error";return}}t.reset(),p=await S(),l="매장별 공사 관리",g("매장 공사 정보가 저장됐습니다.")}async function Y(e){e.preventDefault();const t=e.currentTarget,n=t.querySelector("button[type='submit']"),s=t.querySelector("[data-construction-start-message]"),a=new FormData(t),r={store_name:String(a.get("store_name")||"").trim(),area:Number(a.get("area")),fixture_count:Number(a.get("fixture_count")||0),table_count:Number(a.get("table_count")||0),sign_count:Number(a.get("sign_count")||0),special_notes:String(a.get("special_notes")||"").trim()};if(!r.store_name||!r.area){s.textContent="매장명과 평수는 꼭 입력해 주세요.",s.className="form-message error";return}n.disabled=!0,n.textContent="저장 중",s.textContent="도면과 사진 파일을 업로드하고 있습니다.",s.className="form-message";try{r.drawing_files=await D(a.getAll("drawing_files"),"drawings"),r.base_photo_files=await D(a.getAll("base_photo_files"),"base-photos")}catch(o){n.disabled=!1,n.textContent="공사 시작 정보 저장",s.textContent=`파일 업로드 실패: ${o.message}`,s.className="form-message error";return}if(s.textContent="공사 시작 정보를 저장하고 있습니다.",!i)d.constructionStarts=[{id:Date.now(),created_at:new Date().toISOString(),...r},...d.constructionStarts];else{const{error:o}=await i.from("construction_starts").insert(r);if(o){n.disabled=!1,n.textContent="공사 시작 정보 저장",s.textContent=`저장 실패: ${o.message}`,s.className="form-message error";return}}t.reset(),p=await S(),l="공사 시작 접수",g("공사 시작 정보가 저장됐습니다. 결제 신청 매장 검색에도 반영됐습니다.")}async function Z(e,t){if(!(!e||!["승인","반려"].includes(t))){if(!i)d.payments=d.payments.map(n=>n.id===e?{...n,status:t}:n);else{const{error:n}=await i.from("payments").update({status:t}).eq("id",e).eq("status","신청");if(n){g(`상태 변경 실패: ${n.message}`);return}}p=await S(),l="결제 신청",g(`결제 신청이 ${t} 처리됐습니다.`)}}function W(e){const t=e.stores.filter(u=>u.status==="완료").length,n=e.stores.filter(u=>u.status==="진행중").length,s=e.stores.filter(u=>u.document_required).length,a=e.payments.filter(u=>u.status==="승인").reduce((u,$)=>u+$.amount,0),r=e.stores.reduce((u,$)=>u+Number($.spent||0),0),o=e.payments.filter(u=>u.status==="신청").length,c=e.stores.filter(u=>String(u.name||"").includes("직영점")).length,k=e.stores.reduce((u,$)=>u+Number($.area||0),0),_=Math.round(r/Math.max(k,1));return[["완료된 매장",`${t}개`,"엑셀 공사 상태 기준"],["진행중인 매장",`${n}개`,"시공 또는 비용 검수 중"],["전체 공사비",v(r),"엑셀 합계 기준"],["문서 생성 대상",`${s}개`,"강남압구정 행부터 아래"],["대기중인 결제",`${o}건`,"승인 전 검토 필요"],["직영점",`${c}개`,"지점명 기준"],["승인된 결제",v(a),"지급 승인 완료"],["평균 평당 원가",v(_),"엑셀 합계/평수 기준"]]}function y(e,t){return`
    <div class="table-wrap">
      <table>
        <thead><tr>${e.map(n=>`<th>${n}</th>`).join("")}</tr></thead>
        <tbody>${t.join("")}</tbody>
      </table>
    </div>
  `}function G(e){return e.payments.map(t=>`
      <tr>
        <td>${t.store}</td>
        <td>${t.vendor}</td>
        <td>${t.payment_item||"-"}</td>
        <td class="money">${v(t.amount)}</td>
        <td><span class="badge ${q(t.status)}">${t.status}</span></td>
        <td>${t.requested_at}</td>
      </tr>`)}function Q(e){return e.payments.map(t=>`
      <tr>
        <td>${t.store}</td>
        <td>${t.vendor}</td>
        <td>${t.payment_item||"-"}</td>
        <td class="money">${v(t.amount)}</td>
        <td><span class="badge ${q(t.status)}">${t.status}</span></td>
        <td>${t.requested_at}</td>
        <td>
          ${t.status==="신청"?`<div class="row-actions">
                  <button data-payment-id="${t.id}" data-payment-status="승인">승인</button>
                  <button data-payment-id="${t.id}" data-payment-status="반려">반려</button>
                </div>`:'<span class="muted">처리 완료</span>'}
        </td>
      </tr>`)}function F(e){return e.stores.map(t=>`
      <tr>
        <td>${t.region||"-"}</td>
        <td>${t.name}</td>
        <td>${t.fixture_count||0}</td>
        <td>${t.area}평</td>
        <td class="money">${v(t.budget)}</td>
        <td><span class="badge ${q(t.status)}">${t.status}</span></td>
        <td><span class="badge ${t.document_required?"blue":"gray"}">${t.document_required?"생성 대상":"출력 완료"}</span></td>
      </tr>`)}function I(e,t=""){const n=Array.isArray(e)?e:[];return n.length?n.map(s=>s.url?`<a href="${m(s.url)}" target="_blank" rel="noreferrer">${m(s.name||"파일")}</a>`:`<span>${m(s.name||"파일")}</span>`).join("<br />"):t||"-"}function tt(e){return e.constructionStarts.map(t=>`
      <tr>
        <td>${t.store_name}</td>
        <td>${t.area}평</td>
        <td>${t.fixture_count||0}</td>
        <td>${t.table_count||0}</td>
        <td>${t.sign_count||0}</td>
        <td>${I(t.drawing_files,t.drawing_note)}</td>
        <td>${I(t.base_photo_files,t.base_photo_note)}</td>
        <td>${t.special_notes||"-"}</td>
      </tr>`)}function O(e){return e.vendors.map(t=>`
      <tr>
        <td>${t.name}</td>
        <td>${t.category}</td>
        <td>${t.bank}</td>
        <td>${t.account_number||"-"}</td>
        <td>${t.account_holder||"-"}</td>
        <td class="money">${v(t.total)}</td>
        <td><span class="badge ${q(t.risk)}">${t.risk}</span></td>
      </tr>`)}function et(e){return e.vendors.map(t=>`<option value="${m(t.name)}">${m(t.name)} / ${m(t.bank)} ${m(t.account_number||"")}</option>`).join("")}function at(e){const n=[...e.constructionStarts.map(a=>({name:a.store_name,area:a.area,status:"공사 시작 접수"})),...e.stores],s=new Set;return n.filter(a=>{const r=String(a.name||"").trim();return!r||s.has(r)?!1:(s.add(r),!0)}).map(a=>`<option value="${m(a.name)}">${m(a.name)} / ${m(a.area)}평 / ${m(a.status)}</option>`).join("")}function nt(e){return e.paymentItems.map(t=>`<option value="${m(t)}">${m(t)}</option>`).join("")}function j(){return`
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
            ${at(p)}
          </datalist>
        </label>
        <label>협력업체
          <input name="vendor" list="vendor-suggestions" placeholder="직접입력 또는 업체명 검색" autocomplete="off" />
          <datalist id="vendor-suggestions">
            <option value="직접입력">직접입력</option>
            ${et(p)}
          </datalist>
        </label>
        <label>결제 항목
          <input name="payment_item" list="payment-item-suggestions" placeholder="직접입력 또는 공사항목 검색" autocomplete="off" />
          <datalist id="payment-item-suggestions">
            <option value="직접입력">직접입력</option>
            ${nt(p)}
          </datalist>
        </label>
        <label>신청 금액<input name="amount" inputmode="numeric" placeholder="예: 18500000" autocomplete="off" /></label>
        <p class="form-message" data-form-message></p>
        <button class="primary wide" type="submit">검토 요청 생성</button>
      </form>
    </article>
  `}function st(){return`
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
  `}function rt(){return`
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
  `}function ot(){return`
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
  `}function it(e){return`
    <section class="kpis">
      ${W(e).map(([t,n,s])=>`
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
        ${y(["매장","업체","항목","금액","상태","신청일"],G(e))}
      </article>

      <article class="panel">
        <div class="panel-head">
          <h2>매장 공사 현황</h2>
          <button data-view-link="매장별 공사 관리">관리</button>
        </div>
        ${y(["지역","매장","진열장","평수","공사비 합계","상태","문서"],F(e))}
      </article>
    </section>

    <section class="grid lower">
      <article class="panel">
        <div class="panel-head">
          <h2>주요 협력업체</h2>
          <button data-view-link="업체/계좌 관리">업체 추가</button>
        </div>
        ${y(["업체","분류","은행","계좌번호","예금주","누적 지급","상태"],O(e))}
      </article>
      ${j()}
    </section>
  `}function ct(e){return`
    <section class="grid two">
      ${j()}
      <article class="panel">
        <div class="panel-head">
          <h2>결제 신청 검토</h2>
          <button>승인 대기 ${e.payments.filter(t=>t.status==="신청").length}건</button>
        </div>
        ${y(["매장","업체","항목","금액","상태","신청일","처리"],Q(e))}
      </article>
    </section>
  `}function lt(e){return`
    <section class="grid two">
      ${ot()}
      <article class="panel">
        <div class="panel-head">
          <h2>공사 시작 접수 목록</h2>
          <button>${e.constructionStarts.length}건 접수</button>
        </div>
        ${y(["매장","평수","진열장","테이블","광고판","도면","기초 사진","특이사항"],tt(e))}
      </article>
    </section>
  `}function ut(e){return`
    <section class="grid two">
      ${st()}
      <article class="panel">
        <div class="panel-head">
          <h2>업체/계좌 목록</h2>
          <button>${e.vendors.length}개 등록</button>
        </div>
        ${y(["업체","분류","은행","계좌번호","예금주","누적 지급","상태"],O(e))}
      </article>
    </section>
  `}function dt(e){return`
    <section class="grid two">
      ${rt()}
      <article class="panel">
        <div class="panel-head">
          <h2>매장별 공사 목록</h2>
          <button>${e.stores.length}개 매장</button>
        </div>
        ${y(["지역","매장","진열장","평수","공사비 합계","상태","문서"],F(e))}
      </article>
    </section>
  `}function mt(e){return e.userRoles.map(t=>`
      <tr>
        <td>${t.email}</td>
        <td><span class="badge ${t.role==="admin"?"green":"blue"}">${L[t.role]||t.role}</span></td>
        <td>${t.created_at?String(t.created_at).slice(0,10):"-"}</td>
      </tr>`)}function pt(){return Object.entries(x).map(([e,t])=>`
      <tr>
        <td><strong>${e}</strong></td>
        <td>${t.map(n=>`<span class="menu-chip">${n}</span>`).join("")}</td>
        <td>${t.length}개</td>
      </tr>`)}function ft(e){return`
    <section class="grid two">
      <article class="panel">
        <div class="panel-head">
          <h2>사용자 권한</h2>
          <button>${e.userRoles.length}명 등록</button>
        </div>
        ${y(["이메일","권한","등록일"],mt(e))}
      </article>
      <article class="panel">
        <div class="panel-head">
          <h2>권한별 메뉴</h2>
          <button>${Object.keys(x).length}개 권한</button>
        </div>
        ${y(["권한","볼 수 있는 메뉴","메뉴 수"],pt())}
      </article>
    </section>
  `}function gt(e){const t=M[e]||["기능 범위 정의","입력 항목 확정","데이터 연결"];return`
    <section class="panel empty-panel">
      <h2>${e}</h2>
      <p>이 메뉴는 다음 단계에서 구현할 기능입니다. 지금은 확인해야 할 항목을 먼저 고정해둔 상태입니다.</p>
      <div class="check-list">
        ${t.map(n=>`<span>${n}</span>`).join("")}
      </div>
    </section>
  `}function bt(e){return l==="대시보드"?it(e):l==="공사 시작 접수"?lt(e):l==="결제 신청"?ct(e):l==="업체/계좌 관리"?ut(e):l==="매장별 공사 관리"?dt(e):l==="관리자 설정"?ft(e):gt(l)}function b(){return x[w]||E}function ht(){return`
    <div class="session-box">
      <span>${(f==null?void 0:f.email)||""}</span>
      <strong>${w}</strong>
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
  `,document.querySelector("#auth-form").addEventListener("submit",yt),document.querySelector("[data-auth-action='signup']").addEventListener("click",$t),document.querySelector("[data-auth-action='resend']").addEventListener("click",vt)}async function yt(e){e.preventDefault();const t=new FormData(e.currentTarget),n=String(t.get("email")||"").trim(),s=String(t.get("password")||"");if(!n||!s){h("이메일과 비밀번호를 입력해 주세요.");return}const{data:a,error:r}=await i.auth.signInWithPassword({email:n,password:s});if(r){h(`로그인 실패: ${r.message}`);return}f=a.user,w=await A(f),l=b()[0],p=await S(),g()}async function $t(){const e=document.querySelector("#auth-form"),t=new FormData(e),n=String(t.get("email")||"").trim(),s=String(t.get("password")||"");if(!n||!s){h("계정을 만들 이메일과 비밀번호를 입력해 주세요.");return}const{error:a}=await i.auth.signUp({email:n,password:s,options:{emailRedirectTo:window.location.origin+window.location.pathname}});if(a){h(`회원가입 실패: ${a.message}`);return}h("계정이 생성됐습니다. 이메일 확인이 필요한 경우 메일 인증 후 로그인해 주세요.")}async function vt(){const e=document.querySelector("#auth-form"),t=new FormData(e),n=String(t.get("email")||"").trim();if(!n){h("인증메일을 다시 받을 이메일을 입력해 주세요.");return}const{error:s}=await i.auth.resend({type:"signup",email:n,options:{emailRedirectTo:window.location.origin+window.location.pathname}});if(s){h(`인증메일 재발송 실패: ${s.message}`);return}h("인증메일을 다시 보냈습니다. 새로 받은 메일의 링크를 눌러 주세요.")}async function wt(){await i.auth.signOut(),f=null,w="인테리어 공사실장",h("로그아웃되었습니다.")}function g(e=""){var o;const t=document.querySelector("#app");t.className="",b().includes(l)||(l=b()[0]),t.innerHTML=`
    <aside class="sidebar">
      <div class="brand">
        <span class="brand-mark">H</span>
        <div>
          <strong>HAKA Construction</strong>
          <small>공사비 관리 시스템</small>
        </div>
      </div>
      <nav>
        ${b().map(c=>`<button data-view="${c}" class="${c===l?"active":""}">${c}</button>`).join("")}
      </nav>
    </aside>
    <main class="shell">
      <header class="topbar">
        <div>
          <p>${w}</p>
          <h1>${l}</h1>
        </div>
        <div class="actions">
          ${ht()}
          ${b().includes("엑셀 업로드")?'<button data-view-link="엑셀 업로드">엑셀 업로드</button>':""}
          ${b().includes("결제 신청")?'<button class="primary" data-view-link="결제 신청">결제 신청</button>':""}
        </div>
      </header>

      ${e?`<div class="toast">${e}</div>`:""}
      ${bt(p)}
    </main>
  `,document.querySelectorAll("[data-view]").forEach(c=>{c.addEventListener("click",()=>{l=c.dataset.view,g()})}),document.querySelectorAll("[data-role]").forEach(c=>{c.addEventListener("click",()=>{w=c.dataset.role,b().includes(l)||(l=b()[0]),g()})}),(o=document.querySelector("[data-sign-out]"))==null||o.addEventListener("click",wt),document.querySelectorAll("[data-view-link]").forEach(c=>{c.addEventListener("click",()=>{b().includes(c.dataset.viewLink)&&(l=c.dataset.viewLink),g()})});const n=document.querySelector("#payment-form");n&&n.addEventListener("submit",z);const s=document.querySelector("#vendor-form");s&&s.addEventListener("submit",H);const a=document.querySelector("#store-form");a&&a.addEventListener("submit",X);const r=document.querySelector("#construction-start-form");r&&r.addEventListener("submit",Y),document.querySelectorAll("[data-payment-id][data-payment-status]").forEach(c=>{c.addEventListener("click",()=>{Z(Number(c.dataset.paymentId),c.dataset.paymentStatus)})})}B();
