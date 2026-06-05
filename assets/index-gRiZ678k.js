import{createClient as ut}from"https://esm.sh/@supabase/supabase-js@2.49.1";(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const n of document.querySelectorAll('link[rel="modulepreload"]'))o(n);new MutationObserver(n=>{for(const s of n)if(s.type==="childList")for(const r of s.addedNodes)r.tagName==="LINK"&&r.rel==="modulepreload"&&o(r)}).observe(document,{childList:!0,subtree:!0});function a(n){const s={};return n.integrity&&(s.integrity=n.integrity),n.referrerPolicy&&(s.referrerPolicy=n.referrerPolicy),n.crossOrigin==="use-credentials"?s.credentials="include":n.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function o(n){if(n.ep)return;n.ep=!0;const s=a(n);fetch(n.href,s)}})();const dt="https://yqemtsbdnypgmkuyncxh.supabase.co",mt="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlxZW10c2JkbnlwZ21rdXluY3hoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODAyNjYwMTUsImV4cCI6MjA5NTg0MjAxNX0.gwgdCncqRKKgC8ebj7qIdT-vA4J-wOVd2O9DSa7xEOs",l=ut(dt,mt),B="construction-start-files",W="payment-files",X=["철거","금속공사","목작업","목자재","전기","전기자재","간판","임시간판","돌출간판","실내광고외","광고 시트","자판기 유리작업","자동문 /강화도어","자동문","강화도어","페인트자재","도장공사","타일자재","타일 부자재","타일시공","타일","싱크 개수대","설비","진열장","카운터 역채널","인조대리석","유리/무늬목작접등 기타잡비","유리","무늬목","기타잡비","스카이","에어컨","소방설비","가구운송","엠프","오픈현수막","열쇠/철물","열쇠","철물","청소","폐기물","추가공사","기타"],g={payments:[],stores:[{id:1,name:"성수 플래그십",area:52,status:"완료",budget:21e7,spent:1984e5},{id:2,name:"부산 센텀",area:47,status:"진행중",budget:186e6,spent:1227e5},{id:3,name:"대전 둔산",area:39,status:"진행중",budget:144e6,spent:882e5},{id:4,name:"제주 노형",area:42,status:"미착공",budget:158e6,spent:0}],vendors:[{id:1,name:"도원인테리어",category:"시공",bank:"신한은행",account_number:"110-000-000001",account_holder:"도원인테리어",risk:"정상",total:1245e5},{id:2,name:"한빛전기",category:"전기",bank:"국민은행",account_number:"004-000-000002",account_holder:"한빛전기",risk:"정상",total:738e5},{id:3,name:"서진설비",category:"설비",bank:"하나은행",account_number:"352-000-000003",account_holder:"서진설비",risk:"증빙확인",total:412e5}],userRoles:[],paymentItems:X,constructionStarts:[]},Z=[{group:"벽장",name:"상부장",baseUnit:115600,allocationUnit:57100,quantity:40,madeAmount:126e4},{group:"벽장",name:"하부장",baseUnit:167500,allocationUnit:63500,quantity:40,madeAmount:224e4},{group:"진열장",name:"유리장",baseUnit:287e3,allocationUnit:163500,quantity:40,madeAmount:266e4},{group:"카운터",name:"카운터 서랍형 1200",baseUnit:831200,allocationUnit:727200,quantity:10,madeAmount:56e4},{group:"카운터",name:"카운터 선반형 1800",baseUnit:395800,allocationUnit:395800,quantity:4,madeAmount:256e3},{group:"카운터",name:"카운터 선반형 1600",baseUnit:350600,allocationUnit:350600,quantity:2,madeAmount:122e3},{group:"테이블",name:"테이블 600*1200",baseUnit:22e4,allocationUnit:161e3,quantity:5,madeAmount:805e3},{group:"도장",name:"도장 / 총 58통",baseUnit:18e4,allocationUnit:18e4,quantity:4,madeAmount:72e4}],G=["대시보드","엑셀 업로드","공사 시작 접수","결제 신청","결제 계좌 관리","매장별 공사 관리","진열장 원가 배분","견적서 생성","계약서 생성","은행 이체 파일 생성","관리자 설정"],L={"전체 관리자":G,"인테리어 공사실장":["공사 시작 접수","결제 신청","결제 계좌 관리","진열장 원가 배분","은행 이체 파일 생성"]},Q={admin:"전체 관리자",interior_manager:"인테리어 공사실장","전체 관리자":"전체 관리자","인테리어 공사실장":"인테리어 공사실장"},pt={"엑셀 업로드":["결제 신청 내역 엑셀 업로드","필수 컬럼 검증","중복/오류 행 표시"],"진열장 원가 배분":["매장별 진열장 비용 배분","공용 비용 자동 분배","평당 원가 반영"],"견적서 생성":["매장/업체 기준 견적서 생성","공사항목별 금액 자동 합산","PDF/문서 다운로드"],"계약서 생성":["업체 정보 기반 계약서 생성","계좌/사업자 정보 자동 반영","계약 상태 관리"],"은행 이체 파일 생성":["승인된 결제 건만 추출","은행 업로드용 파일 생성","이체 전 검증"],"관리자 설정":["사용자 권한","승인 단계","상태/분류 코드 관리"]};let b=g,p="대시보드",x="인테리어 공사실장",h=null;const f=e=>new Intl.NumberFormat("ko-KR",{style:"currency",currency:"KRW",maximumFractionDigits:0}).format(e||0),F=()=>new Date().toISOString().slice(0,10),A=e=>Number(String(e).replace(/[^\d]/g,"")),q=e=>Number(e||0),N=(e,t)=>String(e||"").trim().slice(0,t),ft=e=>String(e||"").replace(/[^\d]/g,""),gt=e=>({"일시 지급":1,"선금 50%":.5,"잔금 50%":.5})[e]||0,tt=e=>e==="사업소득 3.3%"?.033:0,y=e=>String(e||"").replace(/&/g,"&amp;").replace(/"/g,"&quot;").replace(/</g,"&lt;").replace(/>/g,"&gt;"),et=e=>String(e||"file").replace(/[^\w.\-가-힣]/g,"_"),R=e=>({승인:"green",신청:"amber",반려:"red",진행중:"blue",완료:"green",미착공:"gray",정상:"green",증빙확인:"amber"})[e]||"gray";async function k(){if(!l)return g;const[e,t,a,o,n,s]=await Promise.all([l.from("payments").select("*").order("requested_at",{ascending:!1}).order("id",{ascending:!1}).limit(500),l.from("stores").select("*").order("id",{ascending:!0}),l.from("vendors").select("*").order("id",{ascending:!0}),l.from("construction_starts").select("*").order("created_at",{ascending:!1}).order("id",{ascending:!1}).limit(30),l.from("user_roles").select("email, role, created_at").order("email",{ascending:!0}),l.from("construction_cost_parts").select("part_name").order("part_name",{ascending:!0})]),r=s.error?g.paymentItems:[...new Set([...X,...s.data.map(c=>c.part_name).filter(Boolean)])];return{payments:e.error?g.payments:e.data,stores:t.error?g.stores:t.data,vendors:a.error?g.vendors:a.data,constructionStarts:o.error?g.constructionStarts:o.data,userRoles:n.error?g.userRoles:n.data,paymentItems:r}}async function nt(e){if(!l||!(e!=null&&e.email))return"인테리어 공사실장";const{data:t,error:a}=await l.from("user_roles").select("role").ilike("email",e.email).maybeSingle();return a||!(t!=null&&t.role)?"인테리어 공사실장":Q[t.role]||"인테리어 공사실장"}async function bt(){var t;if(!l){b=await k(),x="전체 관리자",$();return}const{data:e}=await l.auth.getSession();if(h=((t=e.session)==null?void 0:t.user)||null,!h){S();return}x=await nt(h),p=w()[0],b=await k(),$()}function ht(e,t,a){return e.payments.find(o=>{const n=o.vendor.trim()===t.trim(),s=Math.abs(o.amount-a)/Math.max(a,1);return n&&s<=.1})}function yt(e,t,a){return e.payments.find(o=>{const n=String(o.store||"").trim()===t.trim(),s=String(o.payment_item||"").trim()===a.trim();return n&&s})}async function K(e,t){const a=Array.from(e||[]).filter(n=>n.size>0);if(!a.length)return[];if(!l)return a.map(n=>({name:n.name,type:n.type,size:n.size,path:"",url:""}));const o=[];for(const n of a){const s=`${(h==null?void 0:h.id)||"user"}/${t}/${Date.now()}-${crypto.randomUUID()}-${et(n.name)}`,{error:r}=await l.storage.from(B).upload(s,n,{contentType:n.type,upsert:!1});if(r)throw r;const{data:c}=l.storage.from(B).getPublicUrl(s);o.push({name:n.name,type:n.type,size:n.size,path:s,url:c.publicUrl})}return o}async function U(e,t){const a=Array.from(e||[]).filter(n=>n.size>0);if(!a.length)return[];if(!l)return a.map(n=>({name:n.name,type:n.type,size:n.size,path:"",url:""}));const o=[];for(const n of a){const s=`${(h==null?void 0:h.id)||"user"}/${t}/${Date.now()}-${crypto.randomUUID()}-${et(n.name)}`,{error:r}=await l.storage.from(W).upload(s,n,{contentType:n.type,upsert:!1});if(r)throw r;const{data:c}=l.storage.from(W).getPublicUrl(s);o.push({name:n.name,type:n.type,size:n.size,path:s,url:c.publicUrl})}return o}async function $t(e){e.preventDefault();const t=e.currentTarget,a=t.querySelector("button[type='submit']"),o=t.querySelector("[data-form-message]"),n=new FormData(t),s=String(n.get("store")||"").trim(),r=String(n.get("vendor")||"").trim(),c=String(n.get("payment_item")||"").trim(),m=A(n.get("estimate_total")),d=String(n.get("payment_type")||"일시 지급"),u=A(n.get("amount")),i=String(n.get("tax_type")||"일반 송금"),T=Math.round(u*tt(i)),lt=u-T,ct=String(n.get("memo")||"").trim(),C=ht(b,r,u),O=yt(b,s,c),M=n.getAll("estimate_files").filter(v=>v.size>0),P=n.getAll("tax_invoice_files").filter(v=>v.size>0),j=n.getAll("id_card_files").filter(v=>v.size>0);if(!s||!r||!c||!m||!u){o.textContent="매장명, 업체, 결제 항목, 견적 총액, 신청 금액을 모두 입력해 주세요.",o.className="form-message error";return}if(i==="일반 송금"&&(!M.length||!P.length)){o.textContent="일반 송금은 견적서와 세금계산서를 첨부해야 합니다.",o.className="form-message error";return}if(i==="사업소득 3.3%"&&!j.length){o.textContent="사업소득 3.3% 지급은 주민등록증 첨부가 필요합니다.",o.className="form-message error";return}a.disabled=!0,a.textContent="저장 중",o.textContent="첨부 자료를 업로드하고 있습니다.",o.className=C?"form-message warning":"form-message";let V={};try{V={estimate_files:await U(M,"estimates"),tax_invoice_files:await U(P,"tax-invoices"),id_card_files:await U(j,"id-cards")}}catch(v){a.disabled=!1,a.textContent="검토 요청 생성",o.textContent=`첨부 업로드 실패: ${v.message}`,o.className="form-message error";return}o.textContent=C?`중복 의심: ${C.store} / ${f(C.amount)} 건과 비슷합니다.`:O?`확인 필요: ${s} / ${c} 항목에 기존 신청이 있습니다. 중복이 아니면 견적서에는 같은 항목 합계로 반영됩니다.`:"신청 건을 저장하고 있습니다.",o.className=C||O?"form-message warning":"form-message";const z={store:s,vendor:r,payment_item:c,estimate_total:m,payment_type:d,amount:u,tax_type:i,withholding_amount:T,net_amount:lt,attachment_files:V,estimate_group_mode:"매장별 항목 합산",estimate_group_key:`${s}::${c}`,memo:ct,status:"신청",requested_at:F()};if(!l)g.payments=[{id:Date.now(),...z},...g.payments];else{const{error:v}=await l.from("payments").insert(z);if(v){a.disabled=!1,a.textContent="검토 요청 생성",o.textContent=`저장 실패: ${v.message}`,o.className="form-message error";return}}t.reset(),b=await k(),$(C?"신청이 저장됐습니다. 중복 의심 건은 결제 검토에서 확인하세요.":"신청이 저장됐습니다.")}async function _t(e){e.preventDefault();const t=e.currentTarget,a=t.querySelector("button[type='submit']"),o=t.querySelector("[data-vendor-message]"),n=new FormData(t),s={name:String(n.get("name")||"").trim(),category:String(n.get("category")||"").trim(),bank:String(n.get("bank")||"").trim(),account_number:String(n.get("account_number")||"").trim(),account_holder:String(n.get("account_holder")||"").trim(),risk:"정상",total:0};if(!s.name||!s.category||!s.bank||!s.account_number||!s.account_holder){o.textContent="업체명, 분류, 은행, 계좌번호, 예금주를 모두 입력해 주세요.",o.className="form-message error";return}if(a.disabled=!0,a.textContent="저장 중",o.textContent="결제 계좌 정보를 저장하고 있습니다.",o.className="form-message",!l)g.vendors=[{id:Date.now(),...s},...g.vendors];else{const{error:r}=await l.from("vendors").insert(s);if(r){a.disabled=!1,a.textContent="계좌 저장",o.textContent=`저장 실패: ${r.message}`,o.className="form-message error";return}}t.reset(),b=await k(),p="결제 계좌 관리",$("결제 계좌 정보가 저장됐습니다.")}async function vt(e){e.preventDefault();const t=e.currentTarget,a=t.querySelector("button[type='submit']"),o=t.querySelector("[data-store-message]"),n=new FormData(t),s={name:String(n.get("name")||"").trim(),area:Number(n.get("area")),status:String(n.get("status")||"미착공"),budget:A(n.get("budget")),spent:A(n.get("spent"))};if(!s.name||!s.area||!s.budget){o.textContent="매장명, 면적, 예산을 입력해 주세요.",o.className="form-message error";return}if(a.disabled=!0,a.textContent="저장 중",o.textContent="매장 공사 정보를 저장하고 있습니다.",o.className="form-message",!l)g.stores=[{id:Date.now(),...s},...g.stores];else{const{error:r}=await l.from("stores").insert(s);if(r){a.disabled=!1,a.textContent="매장 저장",o.textContent=`저장 실패: ${r.message}`,o.className="form-message error";return}}t.reset(),b=await k(),p="매장별 공사 관리",$("매장 공사 정보가 저장됐습니다.")}async function wt(e){e.preventDefault();const t=e.currentTarget,a=t.querySelector("button[type='submit']"),o=t.querySelector("[data-construction-start-message]"),n=new FormData(t),s=q(n.get("wall_cabinet_count")),r=q(n.get("display_fixture_count")),c=q(n.get("counter_count")),m={store_name:String(n.get("store_name")||"").trim(),area:Number(n.get("area")),wall_cabinet_count:s,display_fixture_count:r,counter_count:c,fixture_count:s+r+c,table_count:Number(n.get("table_count")||0),sign_count:Number(n.get("sign_count")||0),special_notes:String(n.get("special_notes")||"").trim()};if(!m.store_name||!m.area){o.textContent="매장명과 평수는 꼭 입력해 주세요.",o.className="form-message error";return}a.disabled=!0,a.textContent="저장 중",o.textContent="도면과 사진 파일을 업로드하고 있습니다.",o.className="form-message";try{m.drawing_files=await K(n.getAll("drawing_files"),"drawings"),m.base_photo_files=await K(n.getAll("base_photo_files"),"base-photos")}catch(d){a.disabled=!1,a.textContent="공사 시작 정보 저장",o.textContent=`파일 업로드 실패: ${d.message}`,o.className="form-message error";return}if(o.textContent="공사 시작 정보를 저장하고 있습니다.",!l)g.constructionStarts=[{id:Date.now(),created_at:new Date().toISOString(),...m},...g.constructionStarts];else{const{error:d}=await l.from("construction_starts").insert(m);if(d){a.disabled=!1,a.textContent="공사 시작 정보 저장",o.textContent=`저장 실패: ${d.message}`,o.className="form-message error";return}}t.reset(),b=await k(),p="공사 시작 접수",$("공사 시작 정보가 저장됐습니다. 결제 신청 매장 검색에도 반영됐습니다.")}async function St(e,t){if(!(!e||!["승인","반려"].includes(t))){if(!l)g.payments=g.payments.map(a=>a.id===e?{...a,status:t}:a);else{const{error:a}=await l.from("payments").update({status:t}).eq("id",e).eq("status","신청");if(a){$(`상태 변경 실패: ${a.message}`);return}}b=await k(),p="결제 신청",$(`결제 신청이 ${t} 처리됐습니다.`)}}function xt(e){var o;const t=String(e||"").replace(/\s/g,"");return((o=[["신한","신한"],["국민","국민"],["기업","기업"],["우리","우리"],["하나","하나"],["농협","농협"],["축협","농협"],["카카오","카카오"],["토스","토스"],["케이뱅크","케이뱅크"],["부산","부산"],["대구","아이엠뱅크"],["아이엠","아이엠뱅크"],["새마을","새마을금고"],["신협","신협"],["우체국","우체국"],["전북","전북"],["광주","광주"],["경남","경남"],["수협","수협"]].find(([n])=>t.includes(n)))==null?void 0:o[1])||N(e,6)}function kt(e,t){const a=String(t.vendor||"").trim();return e.vendors.find(o=>String(o.name||"").trim()===a)||{}}function Ct(e){return e.payments.filter(t=>t.status==="승인")}function qt(e,t){const a=kt(e,t),o=a.account_holder||t.vendor,n=Number(t.net_amount||t.amount||0),s=`${t.store||""} ${t.payment_item||""}`.trim();return{bank:xt(a.bank),account:ft(a.account_number),holder:o,amount:n,withdrawMemo:"하카공사비",depositMemo:N(o,7),payerCode:"",memo:N(s,10),key:N(`${t.id||""}-${t.requested_at||F()}`,20),payment:t,vendor:a,ready:!!(a.bank&&a.account_number&&o&&n>0)}}function I(e){return Ct(e).map(t=>qt(e,t))}function J(e,t=""){return`<td${t?` style="${t}"`:""}>${y(e)}</td>`}function At(e){const t=I(e).filter(d=>d.ready);if(!t.length){$("다운로드할 승인 완료 건이 없거나, 업체 계좌정보가 비어 있습니다.");return}const a=["*입금은행","*입금계좌","고객관리성명","*입금액","출금통장표시내용","입금통장표시내용","입금인코드","비고","업체사용key"],o=t.map(d=>[d.bank,d.account,d.holder,d.amount,d.withdrawMemo,d.depositMemo,d.payerCode,d.memo,d.key]),s=`
    <html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel">
      <head>
        <meta charset="UTF-8" />
        <!--[if gte mso 9]><xml><x:ExcelWorkbook><x:ExcelWorksheets><x:ExcelWorksheet><x:Name>입력정보</x:Name><x:WorksheetOptions><x:DisplayGridlines/></x:WorksheetOptions></x:ExcelWorksheet></x:ExcelWorksheets></x:ExcelWorkbook></xml><![endif]-->
      </head>
      <body><table>${[`<tr>${a.map(d=>J(d)).join("")}</tr>`,...o.map(d=>`<tr>${d.map((u,i)=>J(u,i===1?"mso-number-format:'\\@';":"")).join("")}</tr>`)].join("")}</table></body>
    </html>`,r=new Blob([s],{type:"application/vnd.ms-excel;charset=utf-8"}),c=URL.createObjectURL(r),m=document.createElement("a");m.href=c,m.download=`은행대량이체_${F()}.xls`,document.body.appendChild(m),m.click(),m.remove(),URL.revokeObjectURL(c)}function H(e){const t=e.querySelector("[name='estimate_total']"),a=e.querySelector("[name='payment_type']"),o=e.querySelector("[name='amount']"),n=gt(a.value),s=A(t.value);!n||!s||(o.value=String(Math.round(s*n)),E(e))}function E(e){var c,m;const t=A((c=e.querySelector("[name='amount']"))==null?void 0:c.value),a=((m=e.querySelector("[name='tax_type']"))==null?void 0:m.value)||"일반 송금",o=Math.round(t*tt(a)),n=t-o,s=e.querySelector("[data-withholding-preview]"),r=e.querySelector("[data-net-preview]");s&&(s.textContent=f(o)),r&&(r.textContent=f(n))}function Nt(e){const t=e.stores.filter(u=>u.status==="완료").length,a=e.stores.filter(u=>u.status==="진행중").length,o=e.stores.filter(u=>u.document_required).length,n=e.payments.filter(u=>u.status==="승인").reduce((u,i)=>u+i.amount,0),s=e.stores.reduce((u,i)=>u+Number(i.spent||0),0),r=e.payments.filter(u=>u.status==="신청").length,c=e.stores.filter(u=>String(u.name||"").includes("직영점")).length,m=e.stores.reduce((u,i)=>u+Number(i.area||0),0),d=Math.round(s/Math.max(m,1));return[["완료된 매장",`${t}개`,"엑셀 공사 상태 기준"],["진행중인 매장",`${a}개`,"시공 또는 비용 검수 중"],["전체 공사비",f(s),"엑셀 합계 기준"],["문서 생성 대상",`${o}개`,"강남압구정 행부터 아래"],["대기중인 결제",`${r}건`,"승인 전 검토 필요"],["직영점",`${c}개`,"지점명 기준"],["승인된 결제",f(n),"지급 승인 완료"],["평균 평당 원가",f(d),"엑셀 합계/평수 기준"]]}function _(e,t){return`
    <div class="table-wrap">
      <table>
        <thead><tr>${e.map(a=>`<th>${a}</th>`).join("")}</tr></thead>
        <tbody>${t.join("")}</tbody>
      </table>
    </div>
  `}function Et(e){return e.payments.map(t=>`
      <tr>
        <td>${t.store}</td>
        <td>${t.vendor}</td>
        <td>${t.payment_item||"-"}</td>
        <td class="money">${f(t.estimate_total||t.amount)}</td>
        <td>${t.payment_type||"일시 지급"}</td>
        <td class="money">${f(t.amount)}</td>
        <td>${t.tax_type||"일반 송금"}</td>
        <td class="money">${f(t.withholding_amount||0)}</td>
        <td class="money">${f(t.net_amount||t.amount)}</td>
        <td>${ot(t)}</td>
        <td>${t.estimate_group_mode||"매장별 항목 합산"}</td>
        <td><span class="badge ${R(t.status)}">${t.status}</span></td>
        <td>${t.requested_at}</td>
      </tr>`)}function Rt(e){return e.payments.map(t=>`
      <tr>
        <td>${t.store}</td>
        <td>${t.vendor}</td>
        <td>${t.payment_item||"-"}</td>
        <td class="money">${f(t.estimate_total||t.amount)}</td>
        <td>${t.payment_type||"일시 지급"}</td>
        <td class="money">${f(t.amount)}</td>
        <td>${t.tax_type||"일반 송금"}</td>
        <td class="money">${f(t.withholding_amount||0)}</td>
        <td class="money">${f(t.net_amount||t.amount)}</td>
        <td>${ot(t)}</td>
        <td>${t.estimate_group_mode||"매장별 항목 합산"}</td>
        <td><span class="badge ${R(t.status)}">${t.status}</span></td>
        <td>${t.requested_at}</td>
        <td>
          ${t.status==="신청"?`<div class="row-actions">
                  <button data-payment-id="${t.id}" data-payment-status="승인">승인</button>
                  <button data-payment-id="${t.id}" data-payment-status="반려">반려</button>
                </div>`:'<span class="muted">처리 완료</span>'}
        </td>
      </tr>`)}function It(e){return I(e).map(t=>`
      <tr>
        <td>${t.payment.store}</td>
        <td>${t.payment.vendor}</td>
        <td>${t.bank||"-"}</td>
        <td>${t.account||"-"}</td>
        <td>${t.holder||"-"}</td>
        <td class="money">${f(t.amount)}</td>
        <td>${t.payment.tax_type||"일반 송금"}</td>
        <td><span class="badge ${t.ready?"green":"red"}">${t.ready?"다운로드 가능":"계좌정보 확인"}</span></td>
      </tr>`)}function at(e){return e.stores.map(t=>`
      <tr>
        <td>${t.region||"-"}</td>
        <td>${t.name}</td>
        <td>${t.fixture_count||0}</td>
        <td>${t.area}평</td>
        <td class="money">${f(t.budget)}</td>
        <td><span class="badge ${R(t.status)}">${t.status}</span></td>
        <td><span class="badge ${t.document_required?"blue":"gray"}">${t.document_required?"생성 대상":"출력 완료"}</span></td>
      </tr>`)}function Y(e,t=""){const a=Array.isArray(e)?e:[];return a.length?a.map(o=>o.url?`<a href="${y(o.url)}" target="_blank" rel="noreferrer">${y(o.name||"파일")}</a>`:`<span>${y(o.name||"파일")}</span>`).join("<br />"):t||"-"}function ot(e){const t=e.attachment_files||{},a=(t.estimate_files||[]).length,o=(t.tax_invoice_files||[]).length,n=(t.id_card_files||[]).length;return e.tax_type==="사업소득 3.3%"?n?`주민등록증 ${n}개`:"주민등록증 필요":`견적서 ${a}개 / 세금계산서 ${o}개`}function Ut(e){return e.constructionStarts.map(t=>`
      <tr>
        <td>${t.store_name}</td>
        <td>${t.area}평</td>
        <td>${t.wall_cabinet_count??0}</td>
        <td>${t.display_fixture_count??t.fixture_count??0}</td>
        <td>${t.counter_count??0}</td>
        <td>${t.table_count||0}</td>
        <td>${t.sign_count||0}</td>
        <td>${Y(t.drawing_files,t.drawing_note)}</td>
        <td>${Y(t.base_photo_files,t.base_photo_note)}</td>
        <td>${t.special_notes||"-"}</td>
      </tr>`)}function st(e){return e.vendors.map(t=>`
      <tr>
        <td>${t.name}</td>
        <td>${t.category}</td>
        <td>${t.bank}</td>
        <td>${t.account_number||"-"}</td>
        <td>${t.account_holder||"-"}</td>
        <td class="money">${f(t.total)}</td>
        <td><span class="badge ${R(t.risk)}">${t.risk}</span></td>
      </tr>`)}function Dt(e){return e.vendors.map(t=>`<option value="${y(t.name)}">${y(t.name)} / ${y(t.bank)} ${y(t.account_number||"")}</option>`).join("")}function Lt(e){const a=[...e.constructionStarts.map(n=>({name:n.store_name,area:n.area,status:"공사 시작 접수"})),...e.stores],o=new Set;return a.filter(n=>{const s=String(n.name||"").trim();return!s||o.has(s)?!1:(o.add(s),!0)}).map(n=>`<option value="${y(n.name)}">${y(n.name)} / ${y(n.area)}평 / ${y(n.status)}</option>`).join("")}function Ft(e){return e.paymentItems.map(t=>`<option value="${y(t)}">${y(t)}</option>`).join("")}function rt(){return`
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
            ${Lt(b)}
          </datalist>
        </label>
        <label>협력업체
          <input name="vendor" list="vendor-suggestions" placeholder="직접입력 또는 업체명 검색" autocomplete="off" />
          <datalist id="vendor-suggestions">
            <option value="직접입력">직접입력</option>
            ${Dt(b)}
          </datalist>
        </label>
        <label>결제 항목
          <input name="payment_item" list="payment-item-suggestions" placeholder="직접입력 또는 공사항목 검색" autocomplete="off" />
          <datalist id="payment-item-suggestions">
            <option value="직접입력">직접입력</option>
            ${Ft(b)}
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
  `}function Tt(){return`
    <article class="panel form-panel">
      <div class="panel-head">
        <h2>결제 계좌 추가</h2>
      </div>
      <div class="notice">결제 신청 전에 협력업체와 지급 계좌를 먼저 등록합니다.</div>
      <form id="vendor-form">
        <label>업체명<input name="name" placeholder="예: 도원인테리어" autocomplete="off" /></label>
        <label>공종 분류<input name="category" placeholder="예: 시공, 전기, 설비" autocomplete="off" /></label>
        <label>은행명<input name="bank" placeholder="예: 신한은행" autocomplete="off" /></label>
        <label>계좌번호<input name="account_number" placeholder="예: 110-000-000000" autocomplete="off" /></label>
        <label>예금주<input name="account_holder" placeholder="예: 도원인테리어" autocomplete="off" /></label>
        <p class="form-message" data-vendor-message></p>
        <button class="primary wide" type="submit">계좌 저장</button>
      </form>
    </article>
  `}function Ot(){return`
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
  `}function Mt(){return`
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
  `}function Pt(e){return`
    <section class="kpis">
      ${Nt(e).map(([t,a,o])=>`
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
        ${_(["매장","업체","항목","견적 총액","결제 방식","이번 신청액","지급 유형","원천징수","실지급액","첨부 자료","견적서 반영","상태","신청일"],Et(e))}
      </article>

      <article class="panel">
        <div class="panel-head">
          <h2>매장 공사 현황</h2>
          <button data-view-link="매장별 공사 관리">관리</button>
        </div>
        ${_(["지역","매장","진열장","평수","공사비 합계","상태","문서"],at(e))}
      </article>
    </section>

    <section class="grid lower">
      <article class="panel">
        <div class="panel-head">
          <h2>주요 협력업체</h2>
          <button data-view-link="결제 계좌 관리">계좌 추가</button>
        </div>
        ${_(["업체","분류","은행","계좌번호","예금주","누적 지급","상태"],st(e))}
      </article>
      ${rt()}
    </section>
  `}function jt(e){const t=I(e).filter(a=>a.ready).length;return`
    <section class="grid two">
      ${rt()}
      <article class="panel">
        <div class="panel-head">
          <h2>결제 신청 검토</h2>
          <div class="row-actions">
            <button>승인 대기 ${e.payments.filter(a=>a.status==="신청").length}건</button>
            <button data-bank-transfer-download>이체 파일 ${t}건</button>
          </div>
        </div>
        ${_(["매장","업체","항목","견적 총액","결제 방식","이번 신청액","지급 유형","원천징수","실지급액","첨부 자료","견적서 반영","상태","신청일","처리"],Rt(e))}
      </article>
    </section>
  `}function Vt(e){const t=I(e),a=t.filter(n=>n.ready).length,o=t.filter(n=>n.ready).reduce((n,s)=>n+s.amount,0);return`
    <section class="grid two">
      <article class="panel">
        <div class="panel-head">
          <h2>은행 대량이체 파일</h2>
          <button class="primary" data-bank-transfer-download>엑셀 다운로드</button>
        </div>
        <div class="notice">승인된 결제건만 이체 파일에 들어갑니다. 사업소득 3.3% 건은 원천징수 후 실지급액으로 내려받습니다.</div>
        ${_(["매장","업체","입금은행","입금계좌","예금주","입금액","지급 유형","상태"],It(e))}
      </article>
      <article class="panel">
        <div class="panel-head">
          <h2>다운로드 요약</h2>
          <button>${a}건 가능</button>
        </div>
        <section class="kpis compact-kpis">
          <article class="kpi">
            <span>승인 건</span>
            <strong>${t.length}건</strong>
            <small>결제 상태가 승인인 건</small>
          </article>
          <article class="kpi">
            <span>다운로드 가능</span>
            <strong>${a}건</strong>
            <small>은행/계좌/예금주 확인 완료</small>
          </article>
          <article class="kpi">
            <span>총 이체액</span>
            <strong>${f(o)}</strong>
            <small>실지급액 기준</small>
          </article>
        </section>
      </article>
    </section>
  `}function zt(e){return`
    <section class="grid two">
      ${Mt()}
      <article class="panel">
        <div class="panel-head">
          <h2>공사 시작 접수 목록</h2>
          <button>${e.constructionStarts.length}건 접수</button>
        </div>
        ${_(["매장","평수","벽장","진열장","카운터","테이블","광고판","도면","기초 사진","특이사항"],Ut(e))}
      </article>
    </section>
  `}function it(e){return e.quantity&&e.madeAmount?Math.round(e.madeAmount/e.quantity):e.allocationUnit||e.baseUnit||0}function D(e){const t=Z.filter(o=>o.group===e),a=t.reduce((o,n)=>o+it(n),0);return e==="카운터"?Math.round(a/Math.max(t.length,1)):a}function Bt(){return Z.map(e=>`
      <tr>
        <td>${e.group}</td>
        <td>${e.name}</td>
        <td class="money">${f(e.baseUnit)}</td>
        <td class="money">${f(e.allocationUnit)}</td>
        <td>${e.quantity||"-"}</td>
        <td class="money">${f(e.madeAmount)}</td>
        <td class="money">${f(it(e))}</td>
      </tr>`)}function Wt(e){const t=D("벽장"),a=D("진열장"),o=D("카운터");return e.constructionStarts.map(n=>{const s=q(n.wall_cabinet_count),r=q(n.display_fixture_count??n.fixture_count),c=q(n.counter_count),m=s*t+r*a+c*o;return`
      <tr>
        <td>${n.store_name}</td>
        <td>${s}</td>
        <td>${r}</td>
        <td>${c}</td>
        <td class="money">${f(m)}</td>
      </tr>`})}function Kt(e){return`
    <section class="grid two">
      <article class="panel">
        <div class="panel-head">
          <h2>진열장 원가 기준</h2>
          <button>엑셀 반영</button>
        </div>
        <div class="notice">아름가구 산출금액과 휴가기간 가구 산출금액을 기준으로 먼저 원가 기준표를 만들었습니다. 실제 견적서에는 공사 시작 접수의 벽장/진열장/카운터 수량을 곱해 반영합니다.</div>
        ${_(["구분","항목","아름가구 기준","휴가기간 단가","제작수량","제작금액","평균 단가"],Bt())}
      </article>
      <article class="panel">
        <div class="panel-head">
          <h2>매장별 예상 배분</h2>
          <button>${e.constructionStarts.length}개 매장</button>
        </div>
        ${_(["매장","벽장","진열장","카운터","예상 반영 금액"],Wt(e))}
      </article>
    </section>
  `}function Jt(e){return`
    <section class="grid two">
      ${Tt()}
      <article class="panel">
        <div class="panel-head">
          <h2>결제 계좌 목록</h2>
          <button>${e.vendors.length}개 등록</button>
        </div>
        ${_(["업체","분류","은행","계좌번호","예금주","누적 지급","상태"],st(e))}
      </article>
    </section>
  `}function Ht(e){return`
    <section class="grid two">
      ${Ot()}
      <article class="panel">
        <div class="panel-head">
          <h2>매장별 공사 목록</h2>
          <button>${e.stores.length}개 매장</button>
        </div>
        ${_(["지역","매장","진열장","평수","공사비 합계","상태","문서"],at(e))}
      </article>
    </section>
  `}function Yt(e){return e.userRoles.map(t=>`
      <tr>
        <td>${t.email}</td>
        <td><span class="badge ${t.role==="admin"?"green":"blue"}">${Q[t.role]||t.role}</span></td>
        <td>${t.created_at?String(t.created_at).slice(0,10):"-"}</td>
      </tr>`)}function Xt(){return Object.entries(L).map(([e,t])=>`
      <tr>
        <td><strong>${e}</strong></td>
        <td>${t.map(a=>`<span class="menu-chip">${a}</span>`).join("")}</td>
        <td>${t.length}개</td>
      </tr>`)}function Zt(e){return`
    <section class="grid two">
      <article class="panel">
        <div class="panel-head">
          <h2>사용자 권한</h2>
          <button>${e.userRoles.length}명 등록</button>
        </div>
        ${_(["이메일","권한","등록일"],Yt(e))}
      </article>
      <article class="panel">
        <div class="panel-head">
          <h2>권한별 메뉴</h2>
          <button>${Object.keys(L).length}개 권한</button>
        </div>
        ${_(["권한","볼 수 있는 메뉴","메뉴 수"],Xt())}
      </article>
    </section>
  `}function Gt(e){const t=pt[e]||["기능 범위 정의","입력 항목 확정","데이터 연결"];return`
    <section class="panel empty-panel">
      <h2>${e}</h2>
      <p>이 메뉴는 다음 단계에서 구현할 기능입니다. 지금은 확인해야 할 항목을 먼저 고정해둔 상태입니다.</p>
      <div class="check-list">
        ${t.map(a=>`<span>${a}</span>`).join("")}
      </div>
    </section>
  `}function Qt(e){return p==="대시보드"?Pt(e):p==="공사 시작 접수"?zt(e):p==="결제 신청"?jt(e):p==="결제 계좌 관리"||p==="업체/계좌 관리"?Jt(e):p==="매장별 공사 관리"?Ht(e):p==="진열장 원가 배분"?Kt(e):p==="은행 이체 파일 생성"?Vt(e):p==="관리자 설정"?Zt(e):Gt(p)}function w(){return L[x]||G}function te(){return`
    <div class="session-box">
      <span>${(h==null?void 0:h.email)||""}</span>
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
  `,document.querySelector("#auth-form").addEventListener("submit",ee),document.querySelector("[data-auth-action='signup']").addEventListener("click",ne),document.querySelector("[data-auth-action='resend']").addEventListener("click",ae)}async function ee(e){e.preventDefault();const t=new FormData(e.currentTarget),a=String(t.get("email")||"").trim(),o=String(t.get("password")||"");if(!a||!o){S("이메일과 비밀번호를 입력해 주세요.");return}const{data:n,error:s}=await l.auth.signInWithPassword({email:a,password:o});if(s){S(`로그인 실패: ${s.message}`);return}h=n.user,x=await nt(h),p=w()[0],b=await k(),$()}async function ne(){const e=document.querySelector("#auth-form"),t=new FormData(e),a=String(t.get("email")||"").trim(),o=String(t.get("password")||"");if(!a||!o){S("계정을 만들 이메일과 비밀번호를 입력해 주세요.");return}const{error:n}=await l.auth.signUp({email:a,password:o,options:{emailRedirectTo:window.location.origin+window.location.pathname}});if(n){S(`회원가입 실패: ${n.message}`);return}S("계정이 생성됐습니다. 이메일 확인이 필요한 경우 메일 인증 후 로그인해 주세요.")}async function ae(){const e=document.querySelector("#auth-form"),t=new FormData(e),a=String(t.get("email")||"").trim();if(!a){S("인증메일을 다시 받을 이메일을 입력해 주세요.");return}const{error:o}=await l.auth.resend({type:"signup",email:a,options:{emailRedirectTo:window.location.origin+window.location.pathname}});if(o){S(`인증메일 재발송 실패: ${o.message}`);return}S("인증메일을 다시 보냈습니다. 새로 받은 메일의 링크를 눌러 주세요.")}async function oe(){await l.auth.signOut(),h=null,x="인테리어 공사실장",S("로그아웃되었습니다.")}function $(e=""){var r,c,m,d,u;const t=document.querySelector("#app");t.className="",w().includes(p)||(p=w()[0]),t.innerHTML=`
    <aside class="sidebar">
      <div class="brand">
        <span class="brand-mark">H</span>
        <div>
          <strong>HAKA Construction</strong>
          <small>공사비 관리 시스템</small>
        </div>
      </div>
      <nav>
        ${w().map(i=>`<button data-view="${i}" class="${i===p?"active":""}">${i}</button>`).join("")}
      </nav>
    </aside>
    <main class="shell">
      <header class="topbar">
        <div>
          <p>${x}</p>
          <h1>${p}</h1>
        </div>
        <div class="actions">
          ${te()}
          ${w().includes("엑셀 업로드")?'<button data-view-link="엑셀 업로드">엑셀 업로드</button>':""}
          ${w().includes("결제 신청")?'<button class="primary" data-view-link="결제 신청">결제 신청</button>':""}
        </div>
      </header>

      ${e?`<div class="toast">${e}</div>`:""}
      ${Qt(b)}
    </main>
  `,document.querySelectorAll("[data-view]").forEach(i=>{i.addEventListener("click",()=>{p=i.dataset.view,$()})}),document.querySelectorAll("[data-role]").forEach(i=>{i.addEventListener("click",()=>{x=i.dataset.role,w().includes(p)||(p=w()[0]),$()})}),(r=document.querySelector("[data-sign-out]"))==null||r.addEventListener("click",oe),document.querySelectorAll("[data-view-link]").forEach(i=>{i.addEventListener("click",()=>{w().includes(i.dataset.viewLink)&&(p=i.dataset.viewLink),$()})});const a=document.querySelector("#payment-form");a&&(a.addEventListener("submit",$t),(c=a.querySelector("[name='estimate_total']"))==null||c.addEventListener("input",()=>H(a)),(m=a.querySelector("[name='payment_type']"))==null||m.addEventListener("change",()=>H(a)),(d=a.querySelector("[name='amount']"))==null||d.addEventListener("input",()=>E(a)),(u=a.querySelector("[name='tax_type']"))==null||u.addEventListener("change",()=>E(a)),E(a));const o=document.querySelector("#vendor-form");o&&o.addEventListener("submit",_t);const n=document.querySelector("#store-form");n&&n.addEventListener("submit",vt);const s=document.querySelector("#construction-start-form");s&&s.addEventListener("submit",wt),document.querySelectorAll("[data-bank-transfer-download]").forEach(i=>{i.addEventListener("click",()=>At(b))}),document.querySelectorAll("[data-payment-id][data-payment-status]").forEach(i=>{i.addEventListener("click",()=>{St(Number(i.dataset.paymentId),i.dataset.paymentStatus)})})}bt();
