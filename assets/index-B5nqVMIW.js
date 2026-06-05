import{createClient as rt}from"https://esm.sh/@supabase/supabase-js@2.49.1";(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const n of document.querySelectorAll('link[rel="modulepreload"]'))o(n);new MutationObserver(n=>{for(const s of n)if(s.type==="childList")for(const r of s.addedNodes)r.tagName==="LINK"&&r.rel==="modulepreload"&&o(r)}).observe(document,{childList:!0,subtree:!0});function a(n){const s={};return n.integrity&&(s.integrity=n.integrity),n.referrerPolicy&&(s.referrerPolicy=n.referrerPolicy),n.crossOrigin==="use-credentials"?s.credentials="include":n.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function o(n){if(n.ep)return;n.ep=!0;const s=a(n);fetch(n.href,s)}})();const it="https://yqemtsbdnypgmkuyncxh.supabase.co",lt="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlxZW10c2JkbnlwZ21rdXluY3hoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODAyNjYwMTUsImV4cCI6MjA5NTg0MjAxNX0.gwgdCncqRKKgC8ebj7qIdT-vA4J-wOVd2O9DSa7xEOs",i=rt(it,lt),j="construction-start-files",z="payment-files",J=["철거","금속공사","목작업","목자재","전기","전기자재","간판","임시간판","돌출간판","실내광고외","광고 시트","자판기 유리작업","자동문 /강화도어","자동문","강화도어","페인트자재","도장공사","타일자재","타일 부자재","타일시공","타일","싱크 개수대","설비","진열장","카운터 역채널","인조대리석","유리/무늬목작접등 기타잡비","유리","무늬목","기타잡비","스카이","에어컨","소방설비","가구운송","엠프","오픈현수막","열쇠/철물","열쇠","철물","청소","폐기물","추가공사","기타"],f={payments:[],stores:[{id:1,name:"성수 플래그십",area:52,status:"완료",budget:21e7,spent:1984e5},{id:2,name:"부산 센텀",area:47,status:"진행중",budget:186e6,spent:1227e5},{id:3,name:"대전 둔산",area:39,status:"진행중",budget:144e6,spent:882e5},{id:4,name:"제주 노형",area:42,status:"미착공",budget:158e6,spent:0}],vendors:[{id:1,name:"도원인테리어",category:"시공",bank:"신한은행",account_number:"110-000-000001",account_holder:"도원인테리어",risk:"정상",total:1245e5},{id:2,name:"한빛전기",category:"전기",bank:"국민은행",account_number:"004-000-000002",account_holder:"한빛전기",risk:"정상",total:738e5},{id:3,name:"서진설비",category:"설비",bank:"하나은행",account_number:"352-000-000003",account_holder:"서진설비",risk:"증빙확인",total:412e5}],userRoles:[],paymentItems:J,constructionStarts:[]},H=[{group:"벽장",name:"상부장",baseUnit:115600,allocationUnit:57100,quantity:40,madeAmount:126e4},{group:"벽장",name:"하부장",baseUnit:167500,allocationUnit:63500,quantity:40,madeAmount:224e4},{group:"진열장",name:"유리장",baseUnit:287e3,allocationUnit:163500,quantity:40,madeAmount:266e4},{group:"카운터",name:"카운터 서랍형 1200",baseUnit:831200,allocationUnit:727200,quantity:10,madeAmount:56e4},{group:"카운터",name:"카운터 선반형 1800",baseUnit:395800,allocationUnit:395800,quantity:4,madeAmount:256e3},{group:"카운터",name:"카운터 선반형 1600",baseUnit:350600,allocationUnit:350600,quantity:2,madeAmount:122e3},{group:"테이블",name:"테이블 600*1200",baseUnit:22e4,allocationUnit:161e3,quantity:5,madeAmount:805e3},{group:"도장",name:"도장 / 총 58통",baseUnit:18e4,allocationUnit:18e4,quantity:4,madeAmount:72e4}],Y=["대시보드","엑셀 업로드","공사 시작 접수","결제 신청","업체/계좌 관리","매장별 공사 관리","진열장 원가 배분","견적서 생성","계약서 생성","은행 이체 파일 생성","관리자 설정"],E={"전체 관리자":Y,"인테리어 공사실장":["공사 시작 접수","결제 신청","업체/계좌 관리","진열장 원가 배분"]},X={admin:"전체 관리자",interior_manager:"인테리어 공사실장","전체 관리자":"전체 관리자","인테리어 공사실장":"인테리어 공사실장"},ct={"엑셀 업로드":["결제 신청 내역 엑셀 업로드","필수 컬럼 검증","중복/오류 행 표시"],"진열장 원가 배분":["매장별 진열장 비용 배분","공용 비용 자동 분배","평당 원가 반영"],"견적서 생성":["매장/업체 기준 견적서 생성","공사항목별 금액 자동 합산","PDF/문서 다운로드"],"계약서 생성":["업체 정보 기반 계약서 생성","계좌/사업자 정보 자동 반영","계약 상태 관리"],"은행 이체 파일 생성":["승인된 결제 건만 추출","은행 업로드용 파일 생성","이체 전 검증"],"관리자 설정":["사용자 권한","승인 단계","상태/분류 코드 관리"]};let b=f,d="대시보드",x="인테리어 공사실장",g=null;const m=e=>new Intl.NumberFormat("ko-KR",{style:"currency",currency:"KRW",maximumFractionDigits:0}).format(e||0),ut=()=>new Date().toISOString().slice(0,10),k=e=>Number(String(e).replace(/[^\d]/g,"")),A=e=>Number(e||0),dt=e=>({"일시 지급":1,"선금 50%":.5,"잔금 50%":.5})[e]||0,Z=e=>e==="사업소득 3.3%"?.033:0,y=e=>String(e||"").replace(/&/g,"&amp;").replace(/"/g,"&quot;").replace(/</g,"&lt;").replace(/>/g,"&gt;"),W=e=>String(e||"file").replace(/[^\w.\-가-힣]/g,"_"),N=e=>({승인:"green",신청:"amber",반려:"red",진행중:"blue",완료:"green",미착공:"gray",정상:"green",증빙확인:"amber"})[e]||"gray";async function q(){if(!i)return f;const[e,t,a,o,n,s]=await Promise.all([i.from("payments").select("*").order("requested_at",{ascending:!1}).order("id",{ascending:!1}).limit(12),i.from("stores").select("*").order("id",{ascending:!0}),i.from("vendors").select("*").order("id",{ascending:!0}),i.from("construction_starts").select("*").order("created_at",{ascending:!1}).order("id",{ascending:!1}).limit(30),i.from("user_roles").select("email, role, created_at").order("email",{ascending:!0}),i.from("construction_cost_parts").select("part_name").order("part_name",{ascending:!0})]),r=s.error?f.paymentItems:[...new Set([...J,...s.data.map(u=>u.part_name).filter(Boolean)])];return{payments:e.error?f.payments:e.data,stores:t.error?f.stores:t.data,vendors:a.error?f.vendors:a.data,constructionStarts:o.error?f.constructionStarts:o.data,userRoles:n.error?f.userRoles:n.data,paymentItems:r}}async function G(e){if(!i||!(e!=null&&e.email))return"인테리어 공사실장";const{data:t,error:a}=await i.from("user_roles").select("role").ilike("email",e.email).maybeSingle();return a||!(t!=null&&t.role)?"인테리어 공사실장":X[t.role]||"인테리어 공사실장"}async function mt(){var t;if(!i){b=await q(),x="전체 관리자",h();return}const{data:e}=await i.auth.getSession();if(g=((t=e.session)==null?void 0:t.user)||null,!g){S();return}x=await G(g),d=w()[0],b=await q(),h()}function pt(e,t,a){return e.payments.find(o=>{const n=o.vendor.trim()===t.trim(),s=Math.abs(o.amount-a)/Math.max(a,1);return n&&s<=.1})}function ft(e,t,a){return e.payments.find(o=>{const n=String(o.store||"").trim()===t.trim(),s=String(o.payment_item||"").trim()===a.trim();return n&&s})}async function V(e,t){const a=Array.from(e||[]).filter(n=>n.size>0);if(!a.length)return[];if(!i)return a.map(n=>({name:n.name,type:n.type,size:n.size,path:"",url:""}));const o=[];for(const n of a){const s=`${(g==null?void 0:g.id)||"user"}/${t}/${Date.now()}-${crypto.randomUUID()}-${W(n.name)}`,{error:r}=await i.storage.from(j).upload(s,n,{contentType:n.type,upsert:!1});if(r)throw r;const{data:u}=i.storage.from(j).getPublicUrl(s);o.push({name:n.name,type:n.type,size:n.size,path:s,url:u.publicUrl})}return o}async function D(e,t){const a=Array.from(e||[]).filter(n=>n.size>0);if(!a.length)return[];if(!i)return a.map(n=>({name:n.name,type:n.type,size:n.size,path:"",url:""}));const o=[];for(const n of a){const s=`${(g==null?void 0:g.id)||"user"}/${t}/${Date.now()}-${crypto.randomUUID()}-${W(n.name)}`,{error:r}=await i.storage.from(z).upload(s,n,{contentType:n.type,upsert:!1});if(r)throw r;const{data:u}=i.storage.from(z).getPublicUrl(s);o.push({name:n.name,type:n.type,size:n.size,path:s,url:u.publicUrl})}return o}async function gt(e){e.preventDefault();const t=e.currentTarget,a=t.querySelector("button[type='submit']"),o=t.querySelector("[data-form-message]"),n=new FormData(t),s=String(n.get("store")||"").trim(),r=String(n.get("vendor")||"").trim(),u=String(n.get("payment_item")||"").trim(),p=k(n.get("estimate_total")),$=String(n.get("payment_type")||"일시 지급"),c=k(n.get("amount")),l=String(n.get("tax_type")||"일반 송금"),R=Math.round(c*Z(l)),ot=c-R,st=String(n.get("memo")||"").trim(),C=pt(b,r,c),L=ft(b,s,u),F=n.getAll("estimate_files").filter(v=>v.size>0),T=n.getAll("tax_invoice_files").filter(v=>v.size>0),O=n.getAll("id_card_files").filter(v=>v.size>0);if(!s||!r||!u||!p||!c){o.textContent="매장명, 업체, 결제 항목, 견적 총액, 신청 금액을 모두 입력해 주세요.",o.className="form-message error";return}if(l==="일반 송금"&&(!F.length||!T.length)){o.textContent="일반 송금은 견적서와 세금계산서를 첨부해야 합니다.",o.className="form-message error";return}if(l==="사업소득 3.3%"&&!O.length){o.textContent="사업소득 3.3% 지급은 주민등록증 첨부가 필요합니다.",o.className="form-message error";return}a.disabled=!0,a.textContent="저장 중",o.textContent="첨부 자료를 업로드하고 있습니다.",o.className=C?"form-message warning":"form-message";let P={};try{P={estimate_files:await D(F,"estimates"),tax_invoice_files:await D(T,"tax-invoices"),id_card_files:await D(O,"id-cards")}}catch(v){a.disabled=!1,a.textContent="검토 요청 생성",o.textContent=`첨부 업로드 실패: ${v.message}`,o.className="form-message error";return}o.textContent=C?`중복 의심: ${C.store} / ${m(C.amount)} 건과 비슷합니다.`:L?`확인 필요: ${s} / ${u} 항목에 기존 신청이 있습니다. 중복이 아니면 견적서에는 같은 항목 합계로 반영됩니다.`:"신청 건을 저장하고 있습니다.",o.className=C||L?"form-message warning":"form-message";const M={store:s,vendor:r,payment_item:u,estimate_total:p,payment_type:$,amount:c,tax_type:l,withholding_amount:R,net_amount:ot,attachment_files:P,estimate_group_mode:"매장별 항목 합산",estimate_group_key:`${s}::${u}`,memo:st,status:"신청",requested_at:ut()};if(!i)f.payments=[{id:Date.now(),...M},...f.payments];else{const{error:v}=await i.from("payments").insert(M);if(v){a.disabled=!1,a.textContent="검토 요청 생성",o.textContent=`저장 실패: ${v.message}`,o.className="form-message error";return}}t.reset(),b=await q(),h(C?"신청이 저장됐습니다. 중복 의심 건은 결제 검토에서 확인하세요.":"신청이 저장됐습니다.")}async function bt(e){e.preventDefault();const t=e.currentTarget,a=t.querySelector("button[type='submit']"),o=t.querySelector("[data-vendor-message]"),n=new FormData(t),s={name:String(n.get("name")||"").trim(),category:String(n.get("category")||"").trim(),bank:String(n.get("bank")||"").trim(),account_number:String(n.get("account_number")||"").trim(),account_holder:String(n.get("account_holder")||"").trim(),risk:"정상",total:0};if(!s.name||!s.category||!s.bank||!s.account_number||!s.account_holder){o.textContent="업체명, 분류, 은행, 계좌번호, 예금주를 모두 입력해 주세요.",o.className="form-message error";return}if(a.disabled=!0,a.textContent="저장 중",o.textContent="업체/계좌 정보를 저장하고 있습니다.",o.className="form-message",!i)f.vendors=[{id:Date.now(),...s},...f.vendors];else{const{error:r}=await i.from("vendors").insert(s);if(r){a.disabled=!1,a.textContent="업체 저장",o.textContent=`저장 실패: ${r.message}`,o.className="form-message error";return}}t.reset(),b=await q(),d="업체/계좌 관리",h("업체/계좌 정보가 저장됐습니다.")}async function yt(e){e.preventDefault();const t=e.currentTarget,a=t.querySelector("button[type='submit']"),o=t.querySelector("[data-store-message]"),n=new FormData(t),s={name:String(n.get("name")||"").trim(),area:Number(n.get("area")),status:String(n.get("status")||"미착공"),budget:k(n.get("budget")),spent:k(n.get("spent"))};if(!s.name||!s.area||!s.budget){o.textContent="매장명, 면적, 예산을 입력해 주세요.",o.className="form-message error";return}if(a.disabled=!0,a.textContent="저장 중",o.textContent="매장 공사 정보를 저장하고 있습니다.",o.className="form-message",!i)f.stores=[{id:Date.now(),...s},...f.stores];else{const{error:r}=await i.from("stores").insert(s);if(r){a.disabled=!1,a.textContent="매장 저장",o.textContent=`저장 실패: ${r.message}`,o.className="form-message error";return}}t.reset(),b=await q(),d="매장별 공사 관리",h("매장 공사 정보가 저장됐습니다.")}async function ht(e){e.preventDefault();const t=e.currentTarget,a=t.querySelector("button[type='submit']"),o=t.querySelector("[data-construction-start-message]"),n=new FormData(t),s=A(n.get("wall_cabinet_count")),r=A(n.get("display_fixture_count")),u=A(n.get("counter_count")),p={store_name:String(n.get("store_name")||"").trim(),area:Number(n.get("area")),wall_cabinet_count:s,display_fixture_count:r,counter_count:u,fixture_count:s+r+u,table_count:Number(n.get("table_count")||0),sign_count:Number(n.get("sign_count")||0),special_notes:String(n.get("special_notes")||"").trim()};if(!p.store_name||!p.area){o.textContent="매장명과 평수는 꼭 입력해 주세요.",o.className="form-message error";return}a.disabled=!0,a.textContent="저장 중",o.textContent="도면과 사진 파일을 업로드하고 있습니다.",o.className="form-message";try{p.drawing_files=await V(n.getAll("drawing_files"),"drawings"),p.base_photo_files=await V(n.getAll("base_photo_files"),"base-photos")}catch($){a.disabled=!1,a.textContent="공사 시작 정보 저장",o.textContent=`파일 업로드 실패: ${$.message}`,o.className="form-message error";return}if(o.textContent="공사 시작 정보를 저장하고 있습니다.",!i)f.constructionStarts=[{id:Date.now(),created_at:new Date().toISOString(),...p},...f.constructionStarts];else{const{error:$}=await i.from("construction_starts").insert(p);if($){a.disabled=!1,a.textContent="공사 시작 정보 저장",o.textContent=`저장 실패: ${$.message}`,o.className="form-message error";return}}t.reset(),b=await q(),d="공사 시작 접수",h("공사 시작 정보가 저장됐습니다. 결제 신청 매장 검색에도 반영됐습니다.")}async function $t(e,t){if(!(!e||!["승인","반려"].includes(t))){if(!i)f.payments=f.payments.map(a=>a.id===e?{...a,status:t}:a);else{const{error:a}=await i.from("payments").update({status:t}).eq("id",e).eq("status","신청");if(a){h(`상태 변경 실패: ${a.message}`);return}}b=await q(),d="결제 신청",h(`결제 신청이 ${t} 처리됐습니다.`)}}function K(e){const t=e.querySelector("[name='estimate_total']"),a=e.querySelector("[name='payment_type']"),o=e.querySelector("[name='amount']"),n=dt(a.value),s=k(t.value);!n||!s||(o.value=String(Math.round(s*n)),I(e))}function I(e){var u,p;const t=k((u=e.querySelector("[name='amount']"))==null?void 0:u.value),a=((p=e.querySelector("[name='tax_type']"))==null?void 0:p.value)||"일반 송금",o=Math.round(t*Z(a)),n=t-o,s=e.querySelector("[data-withholding-preview]"),r=e.querySelector("[data-net-preview]");s&&(s.textContent=m(o)),r&&(r.textContent=m(n))}function _t(e){const t=e.stores.filter(c=>c.status==="완료").length,a=e.stores.filter(c=>c.status==="진행중").length,o=e.stores.filter(c=>c.document_required).length,n=e.payments.filter(c=>c.status==="승인").reduce((c,l)=>c+l.amount,0),s=e.stores.reduce((c,l)=>c+Number(l.spent||0),0),r=e.payments.filter(c=>c.status==="신청").length,u=e.stores.filter(c=>String(c.name||"").includes("직영점")).length,p=e.stores.reduce((c,l)=>c+Number(l.area||0),0),$=Math.round(s/Math.max(p,1));return[["완료된 매장",`${t}개`,"엑셀 공사 상태 기준"],["진행중인 매장",`${a}개`,"시공 또는 비용 검수 중"],["전체 공사비",m(s),"엑셀 합계 기준"],["문서 생성 대상",`${o}개`,"강남압구정 행부터 아래"],["대기중인 결제",`${r}건`,"승인 전 검토 필요"],["직영점",`${u}개`,"지점명 기준"],["승인된 결제",m(n),"지급 승인 완료"],["평균 평당 원가",m($),"엑셀 합계/평수 기준"]]}function _(e,t){return`
    <div class="table-wrap">
      <table>
        <thead><tr>${e.map(a=>`<th>${a}</th>`).join("")}</tr></thead>
        <tbody>${t.join("")}</tbody>
      </table>
    </div>
  `}function vt(e){return e.payments.map(t=>`
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
        <td>${tt(t)}</td>
        <td>${t.estimate_group_mode||"매장별 항목 합산"}</td>
        <td><span class="badge ${N(t.status)}">${t.status}</span></td>
        <td>${t.requested_at}</td>
      </tr>`)}function wt(e){return e.payments.map(t=>`
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
        <td>${tt(t)}</td>
        <td>${t.estimate_group_mode||"매장별 항목 합산"}</td>
        <td><span class="badge ${N(t.status)}">${t.status}</span></td>
        <td>${t.requested_at}</td>
        <td>
          ${t.status==="신청"?`<div class="row-actions">
                  <button data-payment-id="${t.id}" data-payment-status="승인">승인</button>
                  <button data-payment-id="${t.id}" data-payment-status="반려">반려</button>
                </div>`:'<span class="muted">처리 완료</span>'}
        </td>
      </tr>`)}function Q(e){return e.stores.map(t=>`
      <tr>
        <td>${t.region||"-"}</td>
        <td>${t.name}</td>
        <td>${t.fixture_count||0}</td>
        <td>${t.area}평</td>
        <td class="money">${m(t.budget)}</td>
        <td><span class="badge ${N(t.status)}">${t.status}</span></td>
        <td><span class="badge ${t.document_required?"blue":"gray"}">${t.document_required?"생성 대상":"출력 완료"}</span></td>
      </tr>`)}function B(e,t=""){const a=Array.isArray(e)?e:[];return a.length?a.map(o=>o.url?`<a href="${y(o.url)}" target="_blank" rel="noreferrer">${y(o.name||"파일")}</a>`:`<span>${y(o.name||"파일")}</span>`).join("<br />"):t||"-"}function tt(e){const t=e.attachment_files||{},a=(t.estimate_files||[]).length,o=(t.tax_invoice_files||[]).length,n=(t.id_card_files||[]).length;return e.tax_type==="사업소득 3.3%"?n?`주민등록증 ${n}개`:"주민등록증 필요":`견적서 ${a}개 / 세금계산서 ${o}개`}function St(e){return e.constructionStarts.map(t=>`
      <tr>
        <td>${t.store_name}</td>
        <td>${t.area}평</td>
        <td>${t.wall_cabinet_count??0}</td>
        <td>${t.display_fixture_count??t.fixture_count??0}</td>
        <td>${t.counter_count??0}</td>
        <td>${t.table_count||0}</td>
        <td>${t.sign_count||0}</td>
        <td>${B(t.drawing_files,t.drawing_note)}</td>
        <td>${B(t.base_photo_files,t.base_photo_note)}</td>
        <td>${t.special_notes||"-"}</td>
      </tr>`)}function et(e){return e.vendors.map(t=>`
      <tr>
        <td>${t.name}</td>
        <td>${t.category}</td>
        <td>${t.bank}</td>
        <td>${t.account_number||"-"}</td>
        <td>${t.account_holder||"-"}</td>
        <td class="money">${m(t.total)}</td>
        <td><span class="badge ${N(t.risk)}">${t.risk}</span></td>
      </tr>`)}function xt(e){return e.vendors.map(t=>`<option value="${y(t.name)}">${y(t.name)} / ${y(t.bank)} ${y(t.account_number||"")}</option>`).join("")}function qt(e){const a=[...e.constructionStarts.map(n=>({name:n.store_name,area:n.area,status:"공사 시작 접수"})),...e.stores],o=new Set;return a.filter(n=>{const s=String(n.name||"").trim();return!s||o.has(s)?!1:(o.add(s),!0)}).map(n=>`<option value="${y(n.name)}">${y(n.name)} / ${y(n.area)}평 / ${y(n.status)}</option>`).join("")}function Ct(e){return e.paymentItems.map(t=>`<option value="${y(t)}">${y(t)}</option>`).join("")}function nt(){return`
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
            ${qt(b)}
          </datalist>
        </label>
        <label>협력업체
          <input name="vendor" list="vendor-suggestions" placeholder="직접입력 또는 업체명 검색" autocomplete="off" />
          <datalist id="vendor-suggestions">
            <option value="직접입력">직접입력</option>
            ${xt(b)}
          </datalist>
        </label>
        <label>결제 항목
          <input name="payment_item" list="payment-item-suggestions" placeholder="직접입력 또는 공사항목 검색" autocomplete="off" />
          <datalist id="payment-item-suggestions">
            <option value="직접입력">직접입력</option>
            ${Ct(b)}
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
        <label>견적서 첨부<input name="estimate_files" type="file" accept="image/*,application/pdf" multiple /></label>
        <label>세금계산서 첨부<input name="tax_invoice_files" type="file" accept="image/*,application/pdf" multiple /></label>
        <label>주민등록증 첨부<input name="id_card_files" type="file" accept="image/*,application/pdf" multiple /></label>
        <label>메모<input name="memo" placeholder="예: 진열장 선금, 잔금, 추가 요청사항" autocomplete="off" /></label>
        <p class="form-message" data-form-message></p>
        <button class="primary wide" type="submit">검토 요청 생성</button>
      </form>
    </article>
  `}function At(){return`
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
  `}function kt(){return`
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
  `}function It(){return`
    <article class="panel form-panel">
      <div class="panel-head">
        <h2>공사 시작 정보 입력</h2>
      </div>
      <div class="notice">직영매장 공사 시작 전에 필요한 도면, 수량, 사진, 특이사항을 먼저 접수합니다.</div>
      <form id="construction-start-form">
        <label>매장명<input name="store_name" placeholder="예: 강남압구정 직영점" autocomplete="off" /></label>
        <label>평수<input name="area" inputmode="numeric" placeholder="예: 45" autocomplete="off" /></label>
        <label>도면 파일<input name="drawing_files" type="file" accept="image/*,application/pdf" multiple /></label>
        <label>벽장 수<input name="wall_cabinet_count" inputmode="numeric" placeholder="예: 4" autocomplete="off" /></label>
        <label>진열장 수<input name="display_fixture_count" inputmode="numeric" placeholder="예: 8" autocomplete="off" /></label>
        <label>카운터 수<input name="counter_count" inputmode="numeric" placeholder="예: 2" autocomplete="off" /></label>
        <label>필요한 테이블 수<input name="table_count" inputmode="numeric" placeholder="예: 3" autocomplete="off" /></label>
        <label>광고판 갯수<input name="sign_count" inputmode="numeric" placeholder="예: 2" autocomplete="off" /></label>
        <label>매장 기초 사진<input name="base_photo_files" type="file" accept="image/*,application/pdf" multiple /></label>
        <label>특이사항<textarea name="special_notes" placeholder="현장 특이사항, 요청사항, 주의할 점"></textarea></label>
        <p class="form-message" data-construction-start-message></p>
        <button class="primary wide" type="submit">공사 시작 정보 저장</button>
      </form>
    </article>
  `}function Nt(e){return`
    <section class="kpis">
      ${_t(e).map(([t,a,o])=>`
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
        ${_(["매장","업체","항목","견적 총액","결제 방식","이번 신청액","지급 유형","원천징수","실지급액","첨부 자료","견적서 반영","상태","신청일"],vt(e))}
      </article>

      <article class="panel">
        <div class="panel-head">
          <h2>매장 공사 현황</h2>
          <button data-view-link="매장별 공사 관리">관리</button>
        </div>
        ${_(["지역","매장","진열장","평수","공사비 합계","상태","문서"],Q(e))}
      </article>
    </section>

    <section class="grid lower">
      <article class="panel">
        <div class="panel-head">
          <h2>주요 협력업체</h2>
          <button data-view-link="업체/계좌 관리">업체 추가</button>
        </div>
        ${_(["업체","분류","은행","계좌번호","예금주","누적 지급","상태"],et(e))}
      </article>
      ${nt()}
    </section>
  `}function Dt(e){return`
    <section class="grid two">
      ${nt()}
      <article class="panel">
        <div class="panel-head">
          <h2>결제 신청 검토</h2>
          <button>승인 대기 ${e.payments.filter(t=>t.status==="신청").length}건</button>
        </div>
        ${_(["매장","업체","항목","견적 총액","결제 방식","이번 신청액","지급 유형","원천징수","실지급액","첨부 자료","견적서 반영","상태","신청일","처리"],wt(e))}
      </article>
    </section>
  `}function Ut(e){return`
    <section class="grid two">
      ${It()}
      <article class="panel">
        <div class="panel-head">
          <h2>공사 시작 접수 목록</h2>
          <button>${e.constructionStarts.length}건 접수</button>
        </div>
        ${_(["매장","평수","벽장","진열장","카운터","테이블","광고판","도면","기초 사진","특이사항"],St(e))}
      </article>
    </section>
  `}function at(e){return e.quantity&&e.madeAmount?Math.round(e.madeAmount/e.quantity):e.allocationUnit||e.baseUnit||0}function U(e){const t=H.filter(o=>o.group===e),a=t.reduce((o,n)=>o+at(n),0);return e==="카운터"?Math.round(a/Math.max(t.length,1)):a}function Et(){return H.map(e=>`
      <tr>
        <td>${e.group}</td>
        <td>${e.name}</td>
        <td class="money">${m(e.baseUnit)}</td>
        <td class="money">${m(e.allocationUnit)}</td>
        <td>${e.quantity||"-"}</td>
        <td class="money">${m(e.madeAmount)}</td>
        <td class="money">${m(at(e))}</td>
      </tr>`)}function Rt(e){const t=U("벽장"),a=U("진열장"),o=U("카운터");return e.constructionStarts.map(n=>{const s=A(n.wall_cabinet_count),r=A(n.display_fixture_count??n.fixture_count),u=A(n.counter_count),p=s*t+r*a+u*o;return`
      <tr>
        <td>${n.store_name}</td>
        <td>${s}</td>
        <td>${r}</td>
        <td>${u}</td>
        <td class="money">${m(p)}</td>
      </tr>`})}function Lt(e){return`
    <section class="grid two">
      <article class="panel">
        <div class="panel-head">
          <h2>진열장 원가 기준</h2>
          <button>엑셀 반영</button>
        </div>
        <div class="notice">아름가구 산출금액과 휴가기간 가구 산출금액을 기준으로 먼저 원가 기준표를 만들었습니다. 실제 견적서에는 공사 시작 접수의 벽장/진열장/카운터 수량을 곱해 반영합니다.</div>
        ${_(["구분","항목","아름가구 기준","휴가기간 단가","제작수량","제작금액","평균 단가"],Et())}
      </article>
      <article class="panel">
        <div class="panel-head">
          <h2>매장별 예상 배분</h2>
          <button>${e.constructionStarts.length}개 매장</button>
        </div>
        ${_(["매장","벽장","진열장","카운터","예상 반영 금액"],Rt(e))}
      </article>
    </section>
  `}function Ft(e){return`
    <section class="grid two">
      ${At()}
      <article class="panel">
        <div class="panel-head">
          <h2>업체/계좌 목록</h2>
          <button>${e.vendors.length}개 등록</button>
        </div>
        ${_(["업체","분류","은행","계좌번호","예금주","누적 지급","상태"],et(e))}
      </article>
    </section>
  `}function Tt(e){return`
    <section class="grid two">
      ${kt()}
      <article class="panel">
        <div class="panel-head">
          <h2>매장별 공사 목록</h2>
          <button>${e.stores.length}개 매장</button>
        </div>
        ${_(["지역","매장","진열장","평수","공사비 합계","상태","문서"],Q(e))}
      </article>
    </section>
  `}function Ot(e){return e.userRoles.map(t=>`
      <tr>
        <td>${t.email}</td>
        <td><span class="badge ${t.role==="admin"?"green":"blue"}">${X[t.role]||t.role}</span></td>
        <td>${t.created_at?String(t.created_at).slice(0,10):"-"}</td>
      </tr>`)}function Pt(){return Object.entries(E).map(([e,t])=>`
      <tr>
        <td><strong>${e}</strong></td>
        <td>${t.map(a=>`<span class="menu-chip">${a}</span>`).join("")}</td>
        <td>${t.length}개</td>
      </tr>`)}function Mt(e){return`
    <section class="grid two">
      <article class="panel">
        <div class="panel-head">
          <h2>사용자 권한</h2>
          <button>${e.userRoles.length}명 등록</button>
        </div>
        ${_(["이메일","권한","등록일"],Ot(e))}
      </article>
      <article class="panel">
        <div class="panel-head">
          <h2>권한별 메뉴</h2>
          <button>${Object.keys(E).length}개 권한</button>
        </div>
        ${_(["권한","볼 수 있는 메뉴","메뉴 수"],Pt())}
      </article>
    </section>
  `}function jt(e){const t=ct[e]||["기능 범위 정의","입력 항목 확정","데이터 연결"];return`
    <section class="panel empty-panel">
      <h2>${e}</h2>
      <p>이 메뉴는 다음 단계에서 구현할 기능입니다. 지금은 확인해야 할 항목을 먼저 고정해둔 상태입니다.</p>
      <div class="check-list">
        ${t.map(a=>`<span>${a}</span>`).join("")}
      </div>
    </section>
  `}function zt(e){return d==="대시보드"?Nt(e):d==="공사 시작 접수"?Ut(e):d==="결제 신청"?Dt(e):d==="업체/계좌 관리"?Ft(e):d==="매장별 공사 관리"?Tt(e):d==="진열장 원가 배분"?Lt(e):d==="관리자 설정"?Mt(e):jt(d)}function w(){return E[x]||Y}function Vt(){return`
    <div class="session-box">
      <span>${(g==null?void 0:g.email)||""}</span>
      <strong>${x}</strong>
      <button data-sign-out>로그아웃</button>
    </div>
  `}function S(e=""){const t=document.querySelector("#app");t.className="auth-shell",t.innerHTML=`
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
  `,document.querySelector("#auth-form").addEventListener("submit",Kt),document.querySelector("[data-auth-action='signup']").addEventListener("click",Bt),document.querySelector("[data-auth-action='resend']").addEventListener("click",Jt)}async function Kt(e){e.preventDefault();const t=new FormData(e.currentTarget),a=String(t.get("email")||"").trim(),o=String(t.get("password")||"");if(!a||!o){S("이메일과 비밀번호를 입력해 주세요.");return}const{data:n,error:s}=await i.auth.signInWithPassword({email:a,password:o});if(s){S(`로그인 실패: ${s.message}`);return}g=n.user,x=await G(g),d=w()[0],b=await q(),h()}async function Bt(){const e=document.querySelector("#auth-form"),t=new FormData(e),a=String(t.get("email")||"").trim(),o=String(t.get("password")||"");if(!a||!o){S("계정을 만들 이메일과 비밀번호를 입력해 주세요.");return}const{error:n}=await i.auth.signUp({email:a,password:o,options:{emailRedirectTo:window.location.origin+window.location.pathname}});if(n){S(`회원가입 실패: ${n.message}`);return}S("계정이 생성됐습니다. 이메일 확인이 필요한 경우 메일 인증 후 로그인해 주세요.")}async function Jt(){const e=document.querySelector("#auth-form"),t=new FormData(e),a=String(t.get("email")||"").trim();if(!a){S("인증메일을 다시 받을 이메일을 입력해 주세요.");return}const{error:o}=await i.auth.resend({type:"signup",email:a,options:{emailRedirectTo:window.location.origin+window.location.pathname}});if(o){S(`인증메일 재발송 실패: ${o.message}`);return}S("인증메일을 다시 보냈습니다. 새로 받은 메일의 링크를 눌러 주세요.")}async function Ht(){await i.auth.signOut(),g=null,x="인테리어 공사실장",S("로그아웃되었습니다.")}function h(e=""){var r,u,p,$,c;const t=document.querySelector("#app");t.className="",w().includes(d)||(d=w()[0]),t.innerHTML=`
    <aside class="sidebar">
      <div class="brand">
        <span class="brand-mark">H</span>
        <div>
          <strong>HAKA Construction</strong>
          <small>공사비 관리 시스템</small>
        </div>
      </div>
      <nav>
        ${w().map(l=>`<button data-view="${l}" class="${l===d?"active":""}">${l}</button>`).join("")}
      </nav>
    </aside>
    <main class="shell">
      <header class="topbar">
        <div>
          <p>${x}</p>
          <h1>${d}</h1>
        </div>
        <div class="actions">
          ${Vt()}
          ${w().includes("엑셀 업로드")?'<button data-view-link="엑셀 업로드">엑셀 업로드</button>':""}
          ${w().includes("결제 신청")?'<button class="primary" data-view-link="결제 신청">결제 신청</button>':""}
        </div>
      </header>

      ${e?`<div class="toast">${e}</div>`:""}
      ${zt(b)}
    </main>
  `,document.querySelectorAll("[data-view]").forEach(l=>{l.addEventListener("click",()=>{d=l.dataset.view,h()})}),document.querySelectorAll("[data-role]").forEach(l=>{l.addEventListener("click",()=>{x=l.dataset.role,w().includes(d)||(d=w()[0]),h()})}),(r=document.querySelector("[data-sign-out]"))==null||r.addEventListener("click",Ht),document.querySelectorAll("[data-view-link]").forEach(l=>{l.addEventListener("click",()=>{w().includes(l.dataset.viewLink)&&(d=l.dataset.viewLink),h()})});const a=document.querySelector("#payment-form");a&&(a.addEventListener("submit",gt),(u=a.querySelector("[name='estimate_total']"))==null||u.addEventListener("input",()=>K(a)),(p=a.querySelector("[name='payment_type']"))==null||p.addEventListener("change",()=>K(a)),($=a.querySelector("[name='amount']"))==null||$.addEventListener("input",()=>I(a)),(c=a.querySelector("[name='tax_type']"))==null||c.addEventListener("change",()=>I(a)),I(a));const o=document.querySelector("#vendor-form");o&&o.addEventListener("submit",bt);const n=document.querySelector("#store-form");n&&n.addEventListener("submit",yt);const s=document.querySelector("#construction-start-form");s&&s.addEventListener("submit",ht),document.querySelectorAll("[data-payment-id][data-payment-status]").forEach(l=>{l.addEventListener("click",()=>{$t(Number(l.dataset.paymentId),l.dataset.paymentStatus)})})}mt();
