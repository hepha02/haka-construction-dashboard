import{createClient as H}from"https://esm.sh/@supabase/supabase-js@2.49.1";(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const n of document.querySelectorAll('link[rel="modulepreload"]'))o(n);new MutationObserver(n=>{for(const s of n)if(s.type==="childList")for(const r of s.addedNodes)r.tagName==="LINK"&&r.rel==="modulepreload"&&o(r)}).observe(document,{childList:!0,subtree:!0});function a(n){const s={};return n.integrity&&(s.integrity=n.integrity),n.referrerPolicy&&(s.referrerPolicy=n.referrerPolicy),n.crossOrigin==="use-credentials"?s.credentials="include":n.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function o(n){if(n.ep)return;n.ep=!0;const s=a(n);fetch(n.href,s)}})();const X="https://yqemtsbdnypgmkuyncxh.supabase.co",Y="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlxZW10c2JkbnlwZ21rdXluY3hoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODAyNjYwMTUsImV4cCI6MjA5NTg0MjAxNX0.gwgdCncqRKKgC8ebj7qIdT-vA4J-wOVd2O9DSa7xEOs",i=H(X,Y),L="construction-start-files",O=["철거","금속공사","목작업","목자재","전기","전기자재","간판","임시간판","돌출간판","실내광고외","광고 시트","자판기 유리작업","자동문 /강화도어","자동문","강화도어","페인트자재","도장공사","타일자재","타일 부자재","타일시공","타일","싱크 개수대","설비","진열장","카운터 역채널","인조대리석","유리/무늬목작접등 기타잡비","유리","무늬목","기타잡비","스카이","에어컨","소방설비","가구운송","엠프","오픈현수막","열쇠/철물","열쇠","철물","청소","폐기물","추가공사","기타"],d={payments:[],stores:[{id:1,name:"성수 플래그십",area:52,status:"완료",budget:21e7,spent:1984e5},{id:2,name:"부산 센텀",area:47,status:"진행중",budget:186e6,spent:1227e5},{id:3,name:"대전 둔산",area:39,status:"진행중",budget:144e6,spent:882e5},{id:4,name:"제주 노형",area:42,status:"미착공",budget:158e6,spent:0}],vendors:[{id:1,name:"도원인테리어",category:"시공",bank:"신한은행",account_number:"110-000-000001",account_holder:"도원인테리어",risk:"정상",total:1245e5},{id:2,name:"한빛전기",category:"전기",bank:"국민은행",account_number:"004-000-000002",account_holder:"한빛전기",risk:"정상",total:738e5},{id:3,name:"서진설비",category:"설비",bank:"하나은행",account_number:"352-000-000003",account_holder:"서진설비",risk:"증빙확인",total:412e5}],userRoles:[],paymentItems:O,constructionStarts:[]},P=["대시보드","엑셀 업로드","공사 시작 접수","결제 신청","업체/계좌 관리","매장별 공사 관리","진열장 원가 배분","견적서 생성","계약서 생성","은행 이체 파일 생성","관리자 설정"],D={"전체 관리자":P,"인테리어 공사실장":["공사 시작 접수","결제 신청","업체/계좌 관리","진열장 원가 배분"]},j={admin:"전체 관리자",interior_manager:"인테리어 공사실장","전체 관리자":"전체 관리자","인테리어 공사실장":"인테리어 공사실장"},Z={"엑셀 업로드":["결제 신청 내역 엑셀 업로드","필수 컬럼 검증","중복/오류 행 표시"],"진열장 원가 배분":["매장별 진열장 비용 배분","공용 비용 자동 분배","평당 원가 반영"],"견적서 생성":["매장/업체 기준 견적서 생성","공사항목별 금액 자동 합산","PDF/문서 다운로드"],"계약서 생성":["업체 정보 기반 계약서 생성","계좌/사업자 정보 자동 반영","계약 상태 관리"],"은행 이체 파일 생성":["승인된 결제 건만 추출","은행 업로드용 파일 생성","이체 전 검증"],"관리자 설정":["사용자 권한","승인 단계","상태/분류 코드 관리"]};let g=d,u="대시보드",_="인테리어 공사실장",b=null;const m=e=>new Intl.NumberFormat("ko-KR",{style:"currency",currency:"KRW",maximumFractionDigits:0}).format(e||0),W=()=>new Date().toISOString().slice(0,10),x=e=>Number(String(e).replace(/[^\d]/g,"")),G=e=>({"일시 지급":1,"선금 50%":.5,"잔금 50%":.5})[e]||0,M=e=>e==="사업소득 3.3%"?.033:0,f=e=>String(e||"").replace(/&/g,"&amp;").replace(/"/g,"&quot;").replace(/</g,"&lt;").replace(/>/g,"&gt;"),Q=e=>String(e||"file").replace(/[^\w.\-가-힣]/g,"_"),N=e=>({승인:"green",신청:"amber",반려:"red",진행중:"blue",완료:"green",미착공:"gray",정상:"green",증빙확인:"amber"})[e]||"gray";async function S(){if(!i)return d;const[e,t,a,o,n,s]=await Promise.all([i.from("payments").select("*").order("requested_at",{ascending:!1}).order("id",{ascending:!1}).limit(12),i.from("stores").select("*").order("id",{ascending:!0}),i.from("vendors").select("*").order("id",{ascending:!0}),i.from("construction_starts").select("*").order("created_at",{ascending:!1}).order("id",{ascending:!1}).limit(30),i.from("user_roles").select("email, role, created_at").order("email",{ascending:!0}),i.from("construction_cost_parts").select("part_name").order("part_name",{ascending:!0})]),r=s.error?d.paymentItems:[...new Set([...O,...s.data.map(p=>p.part_name).filter(Boolean)])];return{payments:e.error?d.payments:e.data,stores:t.error?d.stores:t.data,vendors:a.error?d.vendors:a.data,constructionStarts:o.error?d.constructionStarts:o.data,userRoles:n.error?d.userRoles:n.data,paymentItems:r}}async function V(e){if(!i||!(e!=null&&e.email))return"인테리어 공사실장";const{data:t,error:a}=await i.from("user_roles").select("role").ilike("email",e.email).maybeSingle();return a||!(t!=null&&t.role)?"인테리어 공사실장":j[t.role]||"인테리어 공사실장"}async function tt(){var t;if(!i){g=await S(),_="전체 관리자",h();return}const{data:e}=await i.auth.getSession();if(b=((t=e.session)==null?void 0:t.user)||null,!b){$();return}_=await V(b),u=v()[0],g=await S(),h()}function et(e,t,a){return e.payments.find(o=>{const n=o.vendor.trim()===t.trim(),s=Math.abs(o.amount-a)/Math.max(a,1);return n&&s<=.1})}async function R(e,t){const a=Array.from(e||[]).filter(n=>n.size>0);if(!a.length)return[];if(!i)return a.map(n=>({name:n.name,type:n.type,size:n.size,path:"",url:""}));const o=[];for(const n of a){const s=`${(b==null?void 0:b.id)||"user"}/${t}/${Date.now()}-${crypto.randomUUID()}-${Q(n.name)}`,{error:r}=await i.storage.from(L).upload(s,n,{contentType:n.type,upsert:!1});if(r)throw r;const{data:p}=i.storage.from(L).getPublicUrl(s);o.push({name:n.name,type:n.type,size:n.size,path:s,url:p.publicUrl})}return o}async function nt(e){e.preventDefault();const t=e.currentTarget,a=t.querySelector("button[type='submit']"),o=t.querySelector("[data-form-message]"),n=new FormData(t),s=String(n.get("store")||"").trim(),r=String(n.get("vendor")||"").trim(),p=String(n.get("payment_item")||"").trim(),y=x(n.get("estimate_total")),q=String(n.get("payment_type")||"일시 지급"),l=x(n.get("amount")),c=String(n.get("tax_type")||"일반 송금"),I=Math.round(l*M(c)),J=l-I,z=String(n.get("memo")||"").trim(),k=et(g,r,l);if(!s||!r||!p||!y||!l){o.textContent="매장명, 업체, 결제 항목, 견적 총액, 신청 금액을 모두 입력해 주세요.",o.className="form-message error";return}a.disabled=!0,a.textContent="저장 중",o.textContent=k?`중복 의심: ${k.store} / ${m(k.amount)} 건과 비슷합니다.`:"신청 건을 저장하고 있습니다.",o.className=k?"form-message warning":"form-message";const A={store:s,vendor:r,payment_item:p,estimate_total:y,payment_type:q,amount:l,tax_type:c,withholding_amount:I,net_amount:J,memo:z,status:"신청",requested_at:W()};if(!i)d.payments=[{id:Date.now(),...A},...d.payments];else{const{error:E}=await i.from("payments").insert(A);if(E){a.disabled=!1,a.textContent="검토 요청 생성",o.textContent=`저장 실패: ${E.message}`,o.className="form-message error";return}}t.reset(),g=await S(),h(k?"신청이 저장됐습니다. 중복 의심 건은 결제 검토에서 확인하세요.":"신청이 저장됐습니다.")}async function at(e){e.preventDefault();const t=e.currentTarget,a=t.querySelector("button[type='submit']"),o=t.querySelector("[data-vendor-message]"),n=new FormData(t),s={name:String(n.get("name")||"").trim(),category:String(n.get("category")||"").trim(),bank:String(n.get("bank")||"").trim(),account_number:String(n.get("account_number")||"").trim(),account_holder:String(n.get("account_holder")||"").trim(),risk:"정상",total:0};if(!s.name||!s.category||!s.bank||!s.account_number||!s.account_holder){o.textContent="업체명, 분류, 은행, 계좌번호, 예금주를 모두 입력해 주세요.",o.className="form-message error";return}if(a.disabled=!0,a.textContent="저장 중",o.textContent="업체/계좌 정보를 저장하고 있습니다.",o.className="form-message",!i)d.vendors=[{id:Date.now(),...s},...d.vendors];else{const{error:r}=await i.from("vendors").insert(s);if(r){a.disabled=!1,a.textContent="업체 저장",o.textContent=`저장 실패: ${r.message}`,o.className="form-message error";return}}t.reset(),g=await S(),u="업체/계좌 관리",h("업체/계좌 정보가 저장됐습니다.")}async function ot(e){e.preventDefault();const t=e.currentTarget,a=t.querySelector("button[type='submit']"),o=t.querySelector("[data-store-message]"),n=new FormData(t),s={name:String(n.get("name")||"").trim(),area:Number(n.get("area")),status:String(n.get("status")||"미착공"),budget:x(n.get("budget")),spent:x(n.get("spent"))};if(!s.name||!s.area||!s.budget){o.textContent="매장명, 면적, 예산을 입력해 주세요.",o.className="form-message error";return}if(a.disabled=!0,a.textContent="저장 중",o.textContent="매장 공사 정보를 저장하고 있습니다.",o.className="form-message",!i)d.stores=[{id:Date.now(),...s},...d.stores];else{const{error:r}=await i.from("stores").insert(s);if(r){a.disabled=!1,a.textContent="매장 저장",o.textContent=`저장 실패: ${r.message}`,o.className="form-message error";return}}t.reset(),g=await S(),u="매장별 공사 관리",h("매장 공사 정보가 저장됐습니다.")}async function st(e){e.preventDefault();const t=e.currentTarget,a=t.querySelector("button[type='submit']"),o=t.querySelector("[data-construction-start-message]"),n=new FormData(t),s={store_name:String(n.get("store_name")||"").trim(),area:Number(n.get("area")),fixture_count:Number(n.get("fixture_count")||0),table_count:Number(n.get("table_count")||0),sign_count:Number(n.get("sign_count")||0),special_notes:String(n.get("special_notes")||"").trim()};if(!s.store_name||!s.area){o.textContent="매장명과 평수는 꼭 입력해 주세요.",o.className="form-message error";return}a.disabled=!0,a.textContent="저장 중",o.textContent="도면과 사진 파일을 업로드하고 있습니다.",o.className="form-message";try{s.drawing_files=await R(n.getAll("drawing_files"),"drawings"),s.base_photo_files=await R(n.getAll("base_photo_files"),"base-photos")}catch(r){a.disabled=!1,a.textContent="공사 시작 정보 저장",o.textContent=`파일 업로드 실패: ${r.message}`,o.className="form-message error";return}if(o.textContent="공사 시작 정보를 저장하고 있습니다.",!i)d.constructionStarts=[{id:Date.now(),created_at:new Date().toISOString(),...s},...d.constructionStarts];else{const{error:r}=await i.from("construction_starts").insert(s);if(r){a.disabled=!1,a.textContent="공사 시작 정보 저장",o.textContent=`저장 실패: ${r.message}`,o.className="form-message error";return}}t.reset(),g=await S(),u="공사 시작 접수",h("공사 시작 정보가 저장됐습니다. 결제 신청 매장 검색에도 반영됐습니다.")}async function rt(e,t){if(!(!e||!["승인","반려"].includes(t))){if(!i)d.payments=d.payments.map(a=>a.id===e?{...a,status:t}:a);else{const{error:a}=await i.from("payments").update({status:t}).eq("id",e).eq("status","신청");if(a){h(`상태 변경 실패: ${a.message}`);return}}g=await S(),u="결제 신청",h(`결제 신청이 ${t} 처리됐습니다.`)}}function F(e){const t=e.querySelector("[name='estimate_total']"),a=e.querySelector("[name='payment_type']"),o=e.querySelector("[name='amount']"),n=G(a.value),s=x(t.value);!n||!s||(o.value=String(Math.round(s*n)),C(e))}function C(e){var p,y;const t=x((p=e.querySelector("[name='amount']"))==null?void 0:p.value),a=((y=e.querySelector("[name='tax_type']"))==null?void 0:y.value)||"일반 송금",o=Math.round(t*M(a)),n=t-o,s=e.querySelector("[data-withholding-preview]"),r=e.querySelector("[data-net-preview]");s&&(s.textContent=m(o)),r&&(r.textContent=m(n))}function it(e){const t=e.stores.filter(l=>l.status==="완료").length,a=e.stores.filter(l=>l.status==="진행중").length,o=e.stores.filter(l=>l.document_required).length,n=e.payments.filter(l=>l.status==="승인").reduce((l,c)=>l+c.amount,0),s=e.stores.reduce((l,c)=>l+Number(c.spent||0),0),r=e.payments.filter(l=>l.status==="신청").length,p=e.stores.filter(l=>String(l.name||"").includes("직영점")).length,y=e.stores.reduce((l,c)=>l+Number(c.area||0),0),q=Math.round(s/Math.max(y,1));return[["완료된 매장",`${t}개`,"엑셀 공사 상태 기준"],["진행중인 매장",`${a}개`,"시공 또는 비용 검수 중"],["전체 공사비",m(s),"엑셀 합계 기준"],["문서 생성 대상",`${o}개`,"강남압구정 행부터 아래"],["대기중인 결제",`${r}건`,"승인 전 검토 필요"],["직영점",`${p}개`,"지점명 기준"],["승인된 결제",m(n),"지급 승인 완료"],["평균 평당 원가",m(q),"엑셀 합계/평수 기준"]]}function w(e,t){return`
    <div class="table-wrap">
      <table>
        <thead><tr>${e.map(a=>`<th>${a}</th>`).join("")}</tr></thead>
        <tbody>${t.join("")}</tbody>
      </table>
    </div>
  `}function lt(e){return e.payments.map(t=>`
      <tr>
        <td>${t.store}</td>
        <td>${t.vendor}</td>
        <td>${t.payment_item||"-"}</td>
        <td class="money">${m(t.estimate_total||t.amount)}</td>
        <td>${t.payment_type||"일시 지급"}</td>
        <td class="money">${m(t.amount)}</td>
        <td>${t.tax_type||"일반 송금"}</td>
        <td class="money">${m(t.withholding_amount||0)}</td>
        <td class="money">${m(t.net_amount||t.amount)}</td>
        <td><span class="badge ${N(t.status)}">${t.status}</span></td>
        <td>${t.requested_at}</td>
      </tr>`)}function ct(e){return e.payments.map(t=>`
      <tr>
        <td>${t.store}</td>
        <td>${t.vendor}</td>
        <td>${t.payment_item||"-"}</td>
        <td class="money">${m(t.estimate_total||t.amount)}</td>
        <td>${t.payment_type||"일시 지급"}</td>
        <td class="money">${m(t.amount)}</td>
        <td>${t.tax_type||"일반 송금"}</td>
        <td class="money">${m(t.withholding_amount||0)}</td>
        <td class="money">${m(t.net_amount||t.amount)}</td>
        <td><span class="badge ${N(t.status)}">${t.status}</span></td>
        <td>${t.requested_at}</td>
        <td>
          ${t.status==="신청"?`<div class="row-actions">
                  <button data-payment-id="${t.id}" data-payment-status="승인">승인</button>
                  <button data-payment-id="${t.id}" data-payment-status="반려">반려</button>
                </div>`:'<span class="muted">처리 완료</span>'}
        </td>
      </tr>`)}function K(e){return e.stores.map(t=>`
      <tr>
        <td>${t.region||"-"}</td>
        <td>${t.name}</td>
        <td>${t.fixture_count||0}</td>
        <td>${t.area}평</td>
        <td class="money">${m(t.budget)}</td>
        <td><span class="badge ${N(t.status)}">${t.status}</span></td>
        <td><span class="badge ${t.document_required?"blue":"gray"}">${t.document_required?"생성 대상":"출력 완료"}</span></td>
      </tr>`)}function T(e,t=""){const a=Array.isArray(e)?e:[];return a.length?a.map(o=>o.url?`<a href="${f(o.url)}" target="_blank" rel="noreferrer">${f(o.name||"파일")}</a>`:`<span>${f(o.name||"파일")}</span>`).join("<br />"):t||"-"}function ut(e){return e.constructionStarts.map(t=>`
      <tr>
        <td>${t.store_name}</td>
        <td>${t.area}평</td>
        <td>${t.fixture_count||0}</td>
        <td>${t.table_count||0}</td>
        <td>${t.sign_count||0}</td>
        <td>${T(t.drawing_files,t.drawing_note)}</td>
        <td>${T(t.base_photo_files,t.base_photo_note)}</td>
        <td>${t.special_notes||"-"}</td>
      </tr>`)}function U(e){return e.vendors.map(t=>`
      <tr>
        <td>${t.name}</td>
        <td>${t.category}</td>
        <td>${t.bank}</td>
        <td>${t.account_number||"-"}</td>
        <td>${t.account_holder||"-"}</td>
        <td class="money">${m(t.total)}</td>
        <td><span class="badge ${N(t.risk)}">${t.risk}</span></td>
      </tr>`)}function dt(e){return e.vendors.map(t=>`<option value="${f(t.name)}">${f(t.name)} / ${f(t.bank)} ${f(t.account_number||"")}</option>`).join("")}function mt(e){const a=[...e.constructionStarts.map(n=>({name:n.store_name,area:n.area,status:"공사 시작 접수"})),...e.stores],o=new Set;return a.filter(n=>{const s=String(n.name||"").trim();return!s||o.has(s)?!1:(o.add(s),!0)}).map(n=>`<option value="${f(n.name)}">${f(n.name)} / ${f(n.area)}평 / ${f(n.status)}</option>`).join("")}function pt(e){return e.paymentItems.map(t=>`<option value="${f(t)}">${f(t)}</option>`).join("")}function B(){return`
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
            ${mt(g)}
          </datalist>
        </label>
        <label>협력업체
          <input name="vendor" list="vendor-suggestions" placeholder="직접입력 또는 업체명 검색" autocomplete="off" />
          <datalist id="vendor-suggestions">
            <option value="직접입력">직접입력</option>
            ${dt(g)}
          </datalist>
        </label>
        <label>결제 항목
          <input name="payment_item" list="payment-item-suggestions" placeholder="직접입력 또는 공사항목 검색" autocomplete="off" />
          <datalist id="payment-item-suggestions">
            <option value="직접입력">직접입력</option>
            ${pt(g)}
          </datalist>
        </label>
        <label>견적 총액, 부가세 포함<input name="estimate_total" inputmode="numeric" placeholder="예: 10000000" autocomplete="off" /></label>
        <label>결제 방식
          <select name="payment_type">
            <option value="일시 지급">일시 지급</option>
            <option value="선금 50%">선금 50%</option>
            <option value="잔금 50%">잔금 50%</option>
            <option value="직접 입력">직접 입력</option>
          </select>
        </label>
        <label>이번 신청 금액<input name="amount" inputmode="numeric" placeholder="예: 5000000" autocomplete="off" /></label>
        <label>지급 유형
          <select name="tax_type">
            <option value="일반 송금">일반 송금</option>
            <option value="사업소득 3.3%">사업소득 3.3%</option>
          </select>
        </label>
        <div class="calc-box">
          <span>원천징수액 <strong data-withholding-preview>0원</strong></span>
          <span>실지급액 <strong data-net-preview>0원</strong></span>
        </div>
        <label>메모<input name="memo" placeholder="예: 진열장 선금, 잔금, 추가 요청사항" autocomplete="off" /></label>
        <p class="form-message" data-form-message></p>
        <button class="primary wide" type="submit">검토 요청 생성</button>
      </form>
    </article>
  `}function ft(){return`
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
  `}function gt(){return`
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
  `}function bt(){return`
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
  `}function ht(e){return`
    <section class="kpis">
      ${it(e).map(([t,a,o])=>`
            <article class="kpi">
              <span>${t}</span>
              <strong>${a}</strong>
              <small>${o}</small>
            </article>`).join("")}
    </section>

    <section class="grid two">
      <article class="panel">
        <div class="panel-head">
          <h2>최근 결제 신청</h2>
          <button data-view-link="결제 신청">전체 보기</button>
        </div>
        ${w(["매장","업체","항목","견적 총액","결제 방식","이번 신청액","지급 유형","원천징수","실지급액","상태","신청일"],lt(e))}
      </article>

      <article class="panel">
        <div class="panel-head">
          <h2>매장 공사 현황</h2>
          <button data-view-link="매장별 공사 관리">관리</button>
        </div>
        ${w(["지역","매장","진열장","평수","공사비 합계","상태","문서"],K(e))}
      </article>
    </section>

    <section class="grid lower">
      <article class="panel">
        <div class="panel-head">
          <h2>주요 협력업체</h2>
          <button data-view-link="업체/계좌 관리">업체 추가</button>
        </div>
        ${w(["업체","분류","은행","계좌번호","예금주","누적 지급","상태"],U(e))}
      </article>
      ${B()}
    </section>
  `}function yt(e){return`
    <section class="grid two">
      ${B()}
      <article class="panel">
        <div class="panel-head">
          <h2>결제 신청 검토</h2>
          <button>승인 대기 ${e.payments.filter(t=>t.status==="신청").length}건</button>
        </div>
        ${w(["매장","업체","항목","견적 총액","결제 방식","이번 신청액","지급 유형","원천징수","실지급액","상태","신청일","처리"],ct(e))}
      </article>
    </section>
  `}function vt(e){return`
    <section class="grid two">
      ${bt()}
      <article class="panel">
        <div class="panel-head">
          <h2>공사 시작 접수 목록</h2>
          <button>${e.constructionStarts.length}건 접수</button>
        </div>
        ${w(["매장","평수","진열장","테이블","광고판","도면","기초 사진","특이사항"],ut(e))}
      </article>
    </section>
  `}function $t(e){return`
    <section class="grid two">
      ${ft()}
      <article class="panel">
        <div class="panel-head">
          <h2>업체/계좌 목록</h2>
          <button>${e.vendors.length}개 등록</button>
        </div>
        ${w(["업체","분류","은행","계좌번호","예금주","누적 지급","상태"],U(e))}
      </article>
    </section>
  `}function wt(e){return`
    <section class="grid two">
      ${gt()}
      <article class="panel">
        <div class="panel-head">
          <h2>매장별 공사 목록</h2>
          <button>${e.stores.length}개 매장</button>
        </div>
        ${w(["지역","매장","진열장","평수","공사비 합계","상태","문서"],K(e))}
      </article>
    </section>
  `}function _t(e){return e.userRoles.map(t=>`
      <tr>
        <td>${t.email}</td>
        <td><span class="badge ${t.role==="admin"?"green":"blue"}">${j[t.role]||t.role}</span></td>
        <td>${t.created_at?String(t.created_at).slice(0,10):"-"}</td>
      </tr>`)}function St(){return Object.entries(D).map(([e,t])=>`
      <tr>
        <td><strong>${e}</strong></td>
        <td>${t.map(a=>`<span class="menu-chip">${a}</span>`).join("")}</td>
        <td>${t.length}개</td>
      </tr>`)}function qt(e){return`
    <section class="grid two">
      <article class="panel">
        <div class="panel-head">
          <h2>사용자 권한</h2>
          <button>${e.userRoles.length}명 등록</button>
        </div>
        ${w(["이메일","권한","등록일"],_t(e))}
      </article>
      <article class="panel">
        <div class="panel-head">
          <h2>권한별 메뉴</h2>
          <button>${Object.keys(D).length}개 권한</button>
        </div>
        ${w(["권한","볼 수 있는 메뉴","메뉴 수"],St())}
      </article>
    </section>
  `}function xt(e){const t=Z[e]||["기능 범위 정의","입력 항목 확정","데이터 연결"];return`
    <section class="panel empty-panel">
      <h2>${e}</h2>
      <p>이 메뉴는 다음 단계에서 구현할 기능입니다. 지금은 확인해야 할 항목을 먼저 고정해둔 상태입니다.</p>
      <div class="check-list">
        ${t.map(a=>`<span>${a}</span>`).join("")}
      </div>
    </section>
  `}function kt(e){return u==="대시보드"?ht(e):u==="공사 시작 접수"?vt(e):u==="결제 신청"?yt(e):u==="업체/계좌 관리"?$t(e):u==="매장별 공사 관리"?wt(e):u==="관리자 설정"?qt(e):xt(u)}function v(){return D[_]||P}function Ct(){return`
    <div class="session-box">
      <span>${(b==null?void 0:b.email)||""}</span>
      <strong>${_}</strong>
      <button data-sign-out>로그아웃</button>
    </div>
  `}function $(e=""){const t=document.querySelector("#app");t.className="auth-shell",t.innerHTML=`
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
  `,document.querySelector("#auth-form").addEventListener("submit",Nt),document.querySelector("[data-auth-action='signup']").addEventListener("click",Dt),document.querySelector("[data-auth-action='resend']").addEventListener("click",It)}async function Nt(e){e.preventDefault();const t=new FormData(e.currentTarget),a=String(t.get("email")||"").trim(),o=String(t.get("password")||"");if(!a||!o){$("이메일과 비밀번호를 입력해 주세요.");return}const{data:n,error:s}=await i.auth.signInWithPassword({email:a,password:o});if(s){$(`로그인 실패: ${s.message}`);return}b=n.user,_=await V(b),u=v()[0],g=await S(),h()}async function Dt(){const e=document.querySelector("#auth-form"),t=new FormData(e),a=String(t.get("email")||"").trim(),o=String(t.get("password")||"");if(!a||!o){$("계정을 만들 이메일과 비밀번호를 입력해 주세요.");return}const{error:n}=await i.auth.signUp({email:a,password:o,options:{emailRedirectTo:window.location.origin+window.location.pathname}});if(n){$(`회원가입 실패: ${n.message}`);return}$("계정이 생성됐습니다. 이메일 확인이 필요한 경우 메일 인증 후 로그인해 주세요.")}async function It(){const e=document.querySelector("#auth-form"),t=new FormData(e),a=String(t.get("email")||"").trim();if(!a){$("인증메일을 다시 받을 이메일을 입력해 주세요.");return}const{error:o}=await i.auth.resend({type:"signup",email:a,options:{emailRedirectTo:window.location.origin+window.location.pathname}});if(o){$(`인증메일 재발송 실패: ${o.message}`);return}$("인증메일을 다시 보냈습니다. 새로 받은 메일의 링크를 눌러 주세요.")}async function At(){await i.auth.signOut(),b=null,_="인테리어 공사실장",$("로그아웃되었습니다.")}function h(e=""){var r,p,y,q,l;const t=document.querySelector("#app");t.className="",v().includes(u)||(u=v()[0]),t.innerHTML=`
    <aside class="sidebar">
      <div class="brand">
        <span class="brand-mark">H</span>
        <div>
          <strong>HAKA Construction</strong>
          <small>공사비 관리 시스템</small>
        </div>
      </div>
      <nav>
        ${v().map(c=>`<button data-view="${c}" class="${c===u?"active":""}">${c}</button>`).join("")}
      </nav>
    </aside>
    <main class="shell">
      <header class="topbar">
        <div>
          <p>${_}</p>
          <h1>${u}</h1>
        </div>
        <div class="actions">
          ${Ct()}
          ${v().includes("엑셀 업로드")?'<button data-view-link="엑셀 업로드">엑셀 업로드</button>':""}
          ${v().includes("결제 신청")?'<button class="primary" data-view-link="결제 신청">결제 신청</button>':""}
        </div>
      </header>

      ${e?`<div class="toast">${e}</div>`:""}
      ${kt(g)}
    </main>
  `,document.querySelectorAll("[data-view]").forEach(c=>{c.addEventListener("click",()=>{u=c.dataset.view,h()})}),document.querySelectorAll("[data-role]").forEach(c=>{c.addEventListener("click",()=>{_=c.dataset.role,v().includes(u)||(u=v()[0]),h()})}),(r=document.querySelector("[data-sign-out]"))==null||r.addEventListener("click",At),document.querySelectorAll("[data-view-link]").forEach(c=>{c.addEventListener("click",()=>{v().includes(c.dataset.viewLink)&&(u=c.dataset.viewLink),h()})});const a=document.querySelector("#payment-form");a&&(a.addEventListener("submit",nt),(p=a.querySelector("[name='estimate_total']"))==null||p.addEventListener("input",()=>F(a)),(y=a.querySelector("[name='payment_type']"))==null||y.addEventListener("change",()=>F(a)),(q=a.querySelector("[name='amount']"))==null||q.addEventListener("input",()=>C(a)),(l=a.querySelector("[name='tax_type']"))==null||l.addEventListener("change",()=>C(a)),C(a));const o=document.querySelector("#vendor-form");o&&o.addEventListener("submit",at);const n=document.querySelector("#store-form");n&&n.addEventListener("submit",ot);const s=document.querySelector("#construction-start-form");s&&s.addEventListener("submit",st),document.querySelectorAll("[data-payment-id][data-payment-status]").forEach(c=>{c.addEventListener("click",()=>{rt(Number(c.dataset.paymentId),c.dataset.paymentStatus)})})}tt();
