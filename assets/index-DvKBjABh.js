import{createClient as ht}from"https://esm.sh/@supabase/supabase-js@2.49.1";(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const n of document.querySelectorAll('link[rel="modulepreload"]'))o(n);new MutationObserver(n=>{for(const r of n)if(r.type==="childList")for(const s of r.addedNodes)s.tagName==="LINK"&&s.rel==="modulepreload"&&o(s)}).observe(document,{childList:!0,subtree:!0});function a(n){const r={};return n.integrity&&(r.integrity=n.integrity),n.referrerPolicy&&(r.referrerPolicy=n.referrerPolicy),n.crossOrigin==="use-credentials"?r.credentials="include":n.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function o(n){if(n.ep)return;n.ep=!0;const r=a(n);fetch(n.href,r)}})();const yt="https://yqemtsbdnypgmkuyncxh.supabase.co",vt="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlxZW10c2JkbnlwZ21rdXluY3hoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODAyNjYwMTUsImV4cCI6MjA5NTg0MjAxNX0.gwgdCncqRKKgC8ebj7qIdT-vA4J-wOVd2O9DSa7xEOs",l=ht(yt,vt),Y="construction-start-files",X="payment-files",Z="vendor-files",ot=["철거","금속공사","목작업","목자재","전기","전기자재","간판","임시간판","돌출간판","실내광고외","광고 시트","자판기 유리작업","자동문 /강화도어","자동문","강화도어","페인트자재","도장공사","타일자재","타일 부자재","타일시공","타일","싱크 개수대","설비","진열장","카운터 역채널","인조대리석","유리/무늬목작접등 기타잡비","유리","무늬목","기타잡비","스카이","에어컨","소방설비","가구운송","엠프","오픈현수막","열쇠/철물","열쇠","철물","청소","폐기물","추가공사","기타"],b={payments:[],stores:[{id:1,name:"성수 플래그십",area:52,status:"완료",budget:21e7,spent:1984e5},{id:2,name:"부산 센텀",area:47,status:"진행중",budget:186e6,spent:1227e5},{id:3,name:"대전 둔산",area:39,status:"진행중",budget:144e6,spent:882e5},{id:4,name:"제주 노형",area:42,status:"미착공",budget:158e6,spent:0}],vendors:[{id:1,name:"도원인테리어",category:"시공",bank:"신한은행",account_number:"110-000-000001",account_holder:"도원인테리어",risk:"정상",total:1245e5},{id:2,name:"한빛전기",category:"전기",bank:"국민은행",account_number:"004-000-000002",account_holder:"한빛전기",risk:"정상",total:738e5},{id:3,name:"서진설비",category:"설비",bank:"하나은행",account_number:"352-000-000003",account_holder:"서진설비",risk:"증빙확인",total:412e5}],userRoles:[],paymentItems:ot,constructionStarts:[]},rt=[{group:"벽장",name:"상부장",baseUnit:115600,allocationUnit:57100,quantity:40,madeAmount:126e4},{group:"벽장",name:"하부장",baseUnit:167500,allocationUnit:63500,quantity:40,madeAmount:224e4},{group:"진열장",name:"유리장",baseUnit:287e3,allocationUnit:163500,quantity:40,madeAmount:266e4},{group:"카운터",name:"카운터 서랍형 1200",baseUnit:831200,allocationUnit:727200,quantity:10,madeAmount:56e4},{group:"카운터",name:"카운터 선반형 1800",baseUnit:395800,allocationUnit:395800,quantity:4,madeAmount:256e3},{group:"카운터",name:"카운터 선반형 1600",baseUnit:350600,allocationUnit:350600,quantity:2,madeAmount:122e3},{group:"테이블",name:"테이블 600*1200",baseUnit:22e4,allocationUnit:161e3,quantity:5,madeAmount:805e3},{group:"도장",name:"도장 / 총 58통",baseUnit:18e4,allocationUnit:18e4,quantity:4,madeAmount:72e4}],st=["대시보드","엑셀 업로드","공사 시작 접수","결제 신청","결제 계좌 관리","매장별 공사 관리","진열장 원가 배분","견적서 생성","계약서 생성","은행 이체 파일 생성","관리자 설정"],T={"전체 관리자":st,"인테리어 공사실장":["공사 시작 접수","결제 신청","결제 계좌 관리","진열장 원가 배분"]},it={admin:"전체 관리자",interior_manager:"인테리어 공사실장","전체 관리자":"전체 관리자","인테리어 공사실장":"인테리어 공사실장"},_t={"엑셀 업로드":["결제 신청 내역 엑셀 업로드","필수 컬럼 검증","중복/오류 행 표시"],"진열장 원가 배분":["매장별 진열장 비용 배분","공용 비용 자동 분배","평당 원가 반영"],"견적서 생성":["매장/업체 기준 견적서 생성","공사항목별 금액 자동 합산","PDF/문서 다운로드"],"계약서 생성":["업체 정보 기반 계약서 생성","계좌/사업자 정보 자동 반영","계약 상태 관리"],"은행 이체 파일 생성":["승인된 결제 건만 추출","은행 업로드용 파일 생성","이체 전 검증"],"관리자 설정":["사용자 권한","승인 단계","상태/분류 코드 관리"]};let h=b,f="대시보드",x="인테리어 공사실장",y=null;const g=e=>new Intl.NumberFormat("ko-KR",{style:"currency",currency:"KRW",maximumFractionDigits:0}).format(e||0),O=()=>new Date().toISOString().slice(0,10),E=e=>Number(String(e).replace(/[^\d]/g,"")),N=e=>Number(e||0),R=(e,t)=>String(e||"").trim().slice(0,t),$t=e=>String(e||"").replace(/[^\d]/g,""),wt=e=>({"일시 지급":1,"선금 50%":.5,"잔금 50%":.5})[e]||0,lt=e=>e==="사업소득 3.3%"?.033:0,v=e=>String(e||"").replace(/&/g,"&amp;").replace(/"/g,"&quot;").replace(/</g,"&lt;").replace(/>/g,"&gt;"),P=e=>String(e||"file").replace(/[^\w.\-가-힣]/g,"_"),D=e=>({승인:"green",신청:"amber",반려:"red",진행중:"blue",완료:"green",미착공:"gray",정상:"green",증빙확인:"amber"})[e]||"gray";async function q(){if(!l)return b;const[e,t,a,o,n,r]=await Promise.all([l.from("payments").select("*").order("requested_at",{ascending:!1}).order("id",{ascending:!1}).limit(500),l.from("stores").select("*").order("id",{ascending:!0}),l.from("vendors").select("*").order("id",{ascending:!0}),l.from("construction_starts").select("*").order("created_at",{ascending:!1}).order("id",{ascending:!1}).limit(30),l.from("user_roles").select("email, role, created_at").order("email",{ascending:!0}),l.from("construction_cost_parts").select("part_name").order("part_name",{ascending:!0})]),s=r.error?b.paymentItems:[...new Set([...ot,...r.data.map(i=>i.part_name).filter(Boolean)])];return{payments:e.error?b.payments:e.data,stores:t.error?b.stores:t.data,vendors:a.error?b.vendors:a.data,constructionStarts:o.error?b.constructionStarts:o.data,userRoles:n.error?b.userRoles:n.data,paymentItems:s}}async function ct(e){if(!l||!(e!=null&&e.email))return"인테리어 공사실장";const{data:t,error:a}=await l.from("user_roles").select("role").ilike("email",e.email).maybeSingle();return a||!(t!=null&&t.role)?"인테리어 공사실장":it[t.role]||"인테리어 공사실장"}async function St(){var t;if(!l){h=await q(),x="전체 관리자",_();return}const{data:e}=await l.auth.getSession();if(y=((t=e.session)==null?void 0:t.user)||null,!y){k();return}x=await ct(y),f=w()[0],h=await q(),_()}function kt(e,t,a){return e.payments.find(o=>{const n=o.vendor.trim()===t.trim(),r=Math.abs(o.amount-a)/Math.max(a,1);return n&&r<=.1})}function xt(e,t,a){return e.payments.find(o=>{const n=String(o.store||"").trim()===t.trim(),r=String(o.payment_item||"").trim()===a.trim();return n&&r})}async function G(e,t){const a=Array.from(e||[]).filter(n=>n.size>0);if(!a.length)return[];if(!l)return a.map(n=>({name:n.name,type:n.type,size:n.size,path:"",url:""}));const o=[];for(const n of a){const r=`${(y==null?void 0:y.id)||"user"}/${t}/${Date.now()}-${crypto.randomUUID()}-${P(n.name)}`,{error:s}=await l.storage.from(Y).upload(r,n,{contentType:n.type,upsert:!1});if(s)throw s;const{data:i}=l.storage.from(Y).getPublicUrl(r);o.push({name:n.name,type:n.type,size:n.size,path:r,url:i.publicUrl})}return o}async function L(e,t){const a=Array.from(e||[]).filter(n=>n.size>0);if(!a.length)return[];if(!l)return a.map(n=>({name:n.name,type:n.type,size:n.size,path:"",url:""}));const o=[];for(const n of a){const r=`${(y==null?void 0:y.id)||"user"}/${t}/${Date.now()}-${crypto.randomUUID()}-${P(n.name)}`,{error:s}=await l.storage.from(X).upload(r,n,{contentType:n.type,upsert:!1});if(s)throw s;const{data:i}=l.storage.from(X).getPublicUrl(r);o.push({name:n.name,type:n.type,size:n.size,path:r,url:i.publicUrl})}return o}async function Q(e,t){const a=Array.from(e||[]).filter(n=>n.size>0);if(!a.length)return[];if(!l)return a.map(n=>({name:n.name,type:n.type,size:n.size,path:"",url:""}));const o=[];for(const n of a){const r=`${(y==null?void 0:y.id)||"user"}/${t}/${Date.now()}-${crypto.randomUUID()}-${P(n.name)}`,{error:s}=await l.storage.from(Z).upload(r,n,{contentType:n.type,upsert:!1});if(s)throw s;const{data:i}=l.storage.from(Z).getPublicUrl(r);o.push({name:n.name,type:n.type,size:n.size,path:r,url:i.publicUrl})}return o}async function qt(e){e.preventDefault();const t=e.currentTarget,a=t.querySelector("button[type='submit']"),o=t.querySelector("[data-form-message]"),n=new FormData(t),r=String(n.get("store")||"").trim(),s=String(n.get("vendor")||"").trim(),i=String(n.get("payment_item")||"").trim(),m=E(n.get("estimate_total")),d=String(n.get("payment_type")||"일시 지급"),c=E(n.get("amount")),u=String(n.get("tax_type")||"일반 송금"),C=Math.round(c*lt(u)),p=c-C,z=String(n.get("vendor_bank")||"").trim(),M=String(n.get("vendor_account_number")||"").trim(),j=String(n.get("vendor_account_holder")||"").trim(),bt=String(n.get("memo")||"").trim(),A=kt(h,s,c),V=xt(h,r,i),B=n.getAll("estimate_files").filter(S=>S.size>0),K=n.getAll("tax_invoice_files").filter(S=>S.size>0),W=n.getAll("id_card_files").filter(S=>S.size>0);if(!r||!s||!i||!m||!c||!z||!M||!j){o.textContent="매장명, 업체, 결제 항목, 견적 총액, 신청 금액, 이체 계좌를 모두 입력해 주세요.",o.className="form-message error";return}if(u==="일반 송금"&&(!B.length||!K.length)){o.textContent="일반 송금은 견적서와 세금계산서를 첨부해야 합니다.",o.className="form-message error";return}if(u==="사업소득 3.3%"&&!W.length){o.textContent="사업소득 3.3% 지급은 주민등록증 첨부가 필요합니다.",o.className="form-message error";return}a.disabled=!0,a.textContent="저장 중",o.textContent="첨부 자료를 업로드하고 있습니다.",o.className=A?"form-message warning":"form-message";let J={};try{J={estimate_files:await L(B,"estimates"),tax_invoice_files:await L(K,"tax-invoices"),id_card_files:await L(W,"id-cards")}}catch(S){a.disabled=!1,a.textContent="검토 요청 생성",o.textContent=`첨부 업로드 실패: ${S.message}`,o.className="form-message error";return}o.textContent=A?`중복 의심: ${A.store} / ${g(A.amount)} 건과 비슷합니다.`:V?`확인 필요: ${r} / ${i} 항목에 기존 신청이 있습니다. 중복이 아니면 견적서에는 같은 항목 합계로 반영됩니다.`:"신청 건을 저장하고 있습니다.",o.className=A||V?"form-message warning":"form-message";const H={store:r,vendor:s,payment_item:i,estimate_total:m,payment_type:d,amount:c,vendor_bank:z,vendor_account_number:M,vendor_account_holder:j,tax_type:u,withholding_amount:C,net_amount:p,attachment_files:J,estimate_group_mode:"매장별 항목 합산",estimate_group_key:`${r}::${i}`,memo:bt,status:"신청",requested_at:O()};if(!l)b.payments=[{id:Date.now(),...H},...b.payments];else{const{error:S}=await l.from("payments").insert(H);if(S){a.disabled=!1,a.textContent="검토 요청 생성",o.textContent=`저장 실패: ${S.message}`,o.className="form-message error";return}}t.reset(),h=await q(),_(A?"신청이 저장됐습니다. 중복 의심 건은 결제 검토에서 확인하세요.":"신청이 저장됐습니다.")}async function Ct(e){var c;e.preventDefault();const t=e.currentTarget,a=t.querySelector("button[type='submit']"),o=t.querySelector("[data-vendor-message]"),n=new FormData(t),r=Number(n.get("vendor_id")||0),s={name:String(n.get("name")||"").trim(),category:String(n.get("category")||"").trim(),bank:String(n.get("bank")||"").trim(),account_number:String(n.get("account_number")||"").trim(),account_holder:String(n.get("account_holder")||"").trim()},i=n.getAll("business_license_files").filter(u=>u.size>0),m=n.getAll("bankbook_files").filter(u=>u.size>0);if(!s.name||!s.category||!s.bank||!s.account_number||!s.account_holder){o.textContent="업체명, 분류, 은행, 계좌번호, 예금주를 모두 입력해 주세요.",o.className="form-message error";return}if(!r&&(!i.length||!m.length)){o.textContent="최초 등록 시 사업자등록증과 통장사본을 모두 첨부해 주세요.",o.className="form-message error";return}a.disabled=!0,a.textContent="저장 중",o.textContent="첨부 자료를 업로드하고 있습니다.",o.className="form-message";let d={};try{const u=r?((c=h.vendors.find(C=>C.id===r))==null?void 0:c.attachment_files)||{}:{};d={business_license_files:[...u.business_license_files||[],...await Q(i,"business-licenses")],bankbook_files:[...u.bankbook_files||[],...await Q(m,"bankbooks")]}}catch(u){a.disabled=!1,a.textContent="계좌 저장",o.textContent=`첨부 업로드 실패: ${u.message}`,o.className="form-message error";return}if(s.attachment_files=d,o.textContent="결제 계좌 정보를 저장하고 있습니다.",!l)b.vendors=r?b.vendors.map(u=>u.id===r?{...u,...s}:u):[{id:Date.now(),...s,risk:"정상",total:0},...b.vendors];else{const{error:u}=r?await l.from("vendors").update(s).eq("id",r):await l.from("vendors").insert(s);if(u){a.disabled=!1,a.textContent="계좌 저장",o.textContent=`저장 실패: ${u.message}`,o.className="form-message error";return}}t.reset(),h=await q(),f="결제 계좌 관리",_(r?"결제 계좌 정보가 수정됐습니다.":"결제 계좌 정보가 저장됐습니다.")}async function At(e){e.preventDefault();const t=e.currentTarget,a=t.querySelector("button[type='submit']"),o=t.querySelector("[data-store-message]"),n=new FormData(t),r={name:String(n.get("name")||"").trim(),area:Number(n.get("area")),status:String(n.get("status")||"미착공"),budget:E(n.get("budget")),spent:E(n.get("spent"))};if(!r.name||!r.area||!r.budget){o.textContent="매장명, 면적, 예산을 입력해 주세요.",o.className="form-message error";return}if(a.disabled=!0,a.textContent="저장 중",o.textContent="매장 공사 정보를 저장하고 있습니다.",o.className="form-message",!l)b.stores=[{id:Date.now(),...r},...b.stores];else{const{error:s}=await l.from("stores").insert(r);if(s){a.disabled=!1,a.textContent="매장 저장",o.textContent=`저장 실패: ${s.message}`,o.className="form-message error";return}}t.reset(),h=await q(),f="매장별 공사 관리",_("매장 공사 정보가 저장됐습니다.")}async function Nt(e){e.preventDefault();const t=e.currentTarget,a=t.querySelector("button[type='submit']"),o=t.querySelector("[data-construction-start-message]"),n=new FormData(t),r=N(n.get("wall_cabinet_count")),s=N(n.get("display_fixture_count")),i=N(n.get("counter_count")),m={store_name:String(n.get("store_name")||"").trim(),area:Number(n.get("area")),wall_cabinet_count:r,display_fixture_count:s,counter_count:i,fixture_count:r+s+i,table_count:Number(n.get("table_count")||0),sign_count:Number(n.get("sign_count")||0),special_notes:String(n.get("special_notes")||"").trim()};if(!m.store_name||!m.area){o.textContent="매장명과 평수는 꼭 입력해 주세요.",o.className="form-message error";return}a.disabled=!0,a.textContent="저장 중",o.textContent="도면과 사진 파일을 업로드하고 있습니다.",o.className="form-message";try{m.drawing_files=await G(n.getAll("drawing_files"),"drawings"),m.base_photo_files=await G(n.getAll("base_photo_files"),"base-photos")}catch(d){a.disabled=!1,a.textContent="공사 시작 정보 저장",o.textContent=`파일 업로드 실패: ${d.message}`,o.className="form-message error";return}if(o.textContent="공사 시작 정보를 저장하고 있습니다.",!l)b.constructionStarts=[{id:Date.now(),created_at:new Date().toISOString(),...m},...b.constructionStarts];else{const{error:d}=await l.from("construction_starts").insert(m);if(d){a.disabled=!1,a.textContent="공사 시작 정보 저장",o.textContent=`저장 실패: ${d.message}`,o.className="form-message error";return}}t.reset(),h=await q(),f="공사 시작 접수",_("공사 시작 정보가 저장됐습니다. 결제 신청 매장 검색에도 반영됐습니다.")}async function Et(e,t){if(!(!e||!["승인","반려"].includes(t))){if(!l)b.payments=b.payments.map(a=>a.id===e?{...a,status:t}:a);else{const{error:a}=await l.from("payments").update({status:t}).eq("id",e).eq("status","신청");if(a){_(`상태 변경 실패: ${a.message}`);return}}h=await q(),f="결제 신청",_(`결제 신청이 ${t} 처리됐습니다.`)}}function It(e){var o;const t=String(e||"").replace(/\s/g,"");return((o=[["신한","신한"],["국민","국민"],["기업","기업"],["우리","우리"],["하나","하나"],["농협","농협"],["축협","농협"],["카카오","카카오"],["토스","토스"],["케이뱅크","케이뱅크"],["부산","부산"],["대구","아이엠뱅크"],["아이엠","아이엠뱅크"],["새마을","새마을금고"],["신협","신협"],["우체국","우체국"],["전북","전북"],["광주","광주"],["경남","경남"],["수협","수협"]].find(([n])=>t.includes(n)))==null?void 0:o[1])||R(e,6)}function Rt(e,t){const a=String(t.vendor||"").trim();return e.vendors.find(o=>String(o.name||"").trim()===a)||{}}function ut(e){return e.payments.filter(t=>t.status==="승인")}function Ut(e,t){const a=Rt(e,t),o=t.vendor_bank||a.bank,n=t.vendor_account_number||a.account_number,r=t.vendor_account_holder||a.account_holder||t.vendor,s=Number(t.net_amount||t.amount||0),i=`${t.store||""} ${t.payment_item||""}`.trim();return{bank:It(o),account:$t(n),holder:r,amount:s,withdrawMemo:"하카공사비",depositMemo:R(r,7),payerCode:"",memo:R(i,10),key:R(`${t.id||""}-${t.requested_at||O()}`,20),payment:t,vendor:a,ready:!!(o&&n&&r&&s>0)}}function I(e){return ut(e).map(t=>Ut(e,t))}function tt(e,t=""){return`<td${t?` style="${t}"`:""}>${v(e)}</td>`}function Dt(e){const t=I(e).filter(d=>d.ready);if(!t.length){_("다운로드할 승인 완료 건이 없거나, 업체 계좌정보가 비어 있습니다.");return}const a=["*입금은행","*입금계좌","고객관리성명","*입금액","출금통장표시내용","입금통장표시내용","입금인코드","비고","업체사용key"],o=t.map(d=>[d.bank,d.account,d.holder,d.amount,d.withdrawMemo,d.depositMemo,d.payerCode,d.memo,d.key]),r=`
    <html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel">
      <head>
        <meta charset="UTF-8" />
        <!--[if gte mso 9]><xml><x:ExcelWorkbook><x:ExcelWorksheets><x:ExcelWorksheet><x:Name>입력정보</x:Name><x:WorksheetOptions><x:DisplayGridlines/></x:WorksheetOptions></x:ExcelWorksheet></x:ExcelWorksheets></x:ExcelWorkbook></xml><![endif]-->
      </head>
      <body><table>${[`<tr>${a.map(d=>tt(d)).join("")}</tr>`,...o.map(d=>`<tr>${d.map((c,u)=>tt(c,u===1?"mso-number-format:'\\@';":"")).join("")}</tr>`)].join("")}</table></body>
    </html>`,s=new Blob([r],{type:"application/vnd.ms-excel;charset=utf-8"}),i=URL.createObjectURL(s),m=document.createElement("a");m.href=i,m.download=`은행대량이체_${O()}.xls`,document.body.appendChild(m),m.click(),m.remove(),URL.revokeObjectURL(i)}function et(e){const t=e.querySelector("[name='estimate_total']"),a=e.querySelector("[name='payment_type']"),o=e.querySelector("[name='amount']"),n=wt(a.value),r=E(t.value);!n||!r||(o.value=String(Math.round(r*n)),U(e))}function U(e){var i,m;const t=E((i=e.querySelector("[name='amount']"))==null?void 0:i.value),a=((m=e.querySelector("[name='tax_type']"))==null?void 0:m.value)||"일반 송금",o=Math.round(t*lt(a)),n=t-o,r=e.querySelector("[data-withholding-preview]"),s=e.querySelector("[data-net-preview]");r&&(r.textContent=g(o)),s&&(s.textContent=g(n))}function nt(e){var o;const t=String(((o=e.querySelector("[name='vendor']"))==null?void 0:o.value)||"").trim(),a=h.vendors.find(n=>String(n.name||"").trim()===t);a&&(e.querySelector("[name='vendor_bank']").value=a.bank||"",e.querySelector("[name='vendor_account_number']").value=a.account_number||"",e.querySelector("[name='vendor_account_holder']").value=a.account_holder||"")}function Lt(e){const t=h.vendors.find(o=>o.id===e),a=document.querySelector("#vendor-form");!t||!a||(a.querySelector("[name='vendor_id']").value=t.id,a.querySelector("[name='name']").value=t.name||"",a.querySelector("[name='category']").value=t.category||"",a.querySelector("[name='bank']").value=t.bank||"",a.querySelector("[name='account_number']").value=t.account_number||"",a.querySelector("[name='account_holder']").value=t.account_holder||"",a.querySelector("button[type='submit']").textContent="계좌 수정",a.querySelector("[data-vendor-message]").textContent="기존 계좌 정보를 수정 중입니다. 새 파일을 첨부하면 기존 파일에 추가됩니다.")}function Ft(e){const t=e.stores.filter(c=>c.status==="완료").length,a=e.stores.filter(c=>c.status==="진행중").length,o=e.stores.filter(c=>c.document_required).length,n=e.payments.filter(c=>c.status==="승인").reduce((c,u)=>c+u.amount,0),r=e.stores.reduce((c,u)=>c+Number(u.spent||0),0),s=e.payments.filter(c=>c.status==="신청").length,i=e.stores.filter(c=>String(c.name||"").includes("직영점")).length,m=e.stores.reduce((c,u)=>c+Number(u.area||0),0),d=Math.round(r/Math.max(m,1));return[["완료된 매장",`${t}개`,"엑셀 공사 상태 기준"],["진행중인 매장",`${a}개`,"시공 또는 비용 검수 중"],["전체 공사비",g(r),"엑셀 합계 기준"],["문서 생성 대상",`${o}개`,"강남압구정 행부터 아래"],["대기중인 결제",`${s}건`,"승인 전 검토 필요"],["직영점",`${i}개`,"지점명 기준"],["승인된 결제",g(n),"지급 승인 완료"],["평균 평당 원가",g(d),"엑셀 합계/평수 기준"]]}function $(e,t){return`
    <div class="table-wrap">
      <table>
        <thead><tr>${e.map(a=>`<th>${a}</th>`).join("")}</tr></thead>
        <tbody>${t.join("")}</tbody>
      </table>
    </div>
  `}function Tt(e){return e.payments.map(t=>`
      <tr>
        <td>${t.store}</td>
        <td>${t.vendor}</td>
        <td>${t.vendor_bank||"-"}</td>
        <td>${t.vendor_account_number||"-"}</td>
        <td>${t.vendor_account_holder||"-"}</td>
        <td>${t.payment_item||"-"}</td>
        <td class="money">${g(t.estimate_total||t.amount)}</td>
        <td>${t.payment_type||"일시 지급"}</td>
        <td class="money">${g(t.amount)}</td>
        <td>${t.tax_type||"일반 송금"}</td>
        <td class="money">${g(t.withholding_amount||0)}</td>
        <td class="money">${g(t.net_amount||t.amount)}</td>
        <td>${mt(t)}</td>
        <td>${t.estimate_group_mode||"매장별 항목 합산"}</td>
        <td><span class="badge ${D(t.status)}">${t.status}</span></td>
        <td>${t.requested_at}</td>
      </tr>`)}function Ot(e){return e.payments.map(t=>`
      <tr>
        <td>${t.store}</td>
        <td>${t.vendor}</td>
        <td>${t.payment_item||"-"}</td>
        <td class="money">${g(t.estimate_total||t.amount)}</td>
        <td>${t.payment_type||"일시 지급"}</td>
        <td class="money">${g(t.amount)}</td>
        <td>${t.tax_type||"일반 송금"}</td>
        <td class="money">${g(t.withholding_amount||0)}</td>
        <td class="money">${g(t.net_amount||t.amount)}</td>
        <td>${mt(t)}</td>
        <td>${t.estimate_group_mode||"매장별 항목 합산"}</td>
        <td><span class="badge ${D(t.status)}">${t.status}</span></td>
        <td>${t.requested_at}</td>
        <td>
          ${t.status==="신청"?`<div class="row-actions">
                  <button data-payment-id="${t.id}" data-payment-status="승인">승인</button>
                  <button data-payment-id="${t.id}" data-payment-status="반려">반려</button>
                </div>`:'<span class="muted">처리 완료</span>'}
        </td>
      </tr>`)}function Pt(e){return I(e).map(t=>`
      <tr>
        <td>${t.payment.store}</td>
        <td>${t.payment.vendor}</td>
        <td>${t.bank||"-"}</td>
        <td>${t.account||"-"}</td>
        <td>${t.holder||"-"}</td>
        <td class="money">${g(t.amount)}</td>
        <td>${t.payment.tax_type||"일반 송금"}</td>
        <td><span class="badge ${t.ready?"green":"red"}">${t.ready?"다운로드 가능":"계좌정보 확인"}</span></td>
      </tr>`)}function dt(e){return e.stores.map(t=>`
      <tr>
        <td>${t.region||"-"}</td>
        <td>${t.name}</td>
        <td>${t.fixture_count||0}</td>
        <td>${t.area}평</td>
        <td class="money">${g(t.budget)}</td>
        <td><span class="badge ${D(t.status)}">${t.status}</span></td>
        <td><span class="badge ${t.document_required?"blue":"gray"}">${t.document_required?"생성 대상":"출력 완료"}</span></td>
      </tr>`)}function at(e,t=""){const a=Array.isArray(e)?e:[];return a.length?a.map(o=>o.url?`<a href="${v(o.url)}" target="_blank" rel="noreferrer">${v(o.name||"파일")}</a>`:`<span>${v(o.name||"파일")}</span>`).join("<br />"):t||"-"}function mt(e){const t=e.attachment_files||{},a=(t.estimate_files||[]).length,o=(t.tax_invoice_files||[]).length,n=(t.id_card_files||[]).length;return e.tax_type==="사업소득 3.3%"?n?`주민등록증 ${n}개`:"주민등록증 필요":`견적서 ${a}개 / 세금계산서 ${o}개`}function zt(e){return e.constructionStarts.map(t=>`
      <tr>
        <td>${t.store_name}</td>
        <td>${t.area}평</td>
        <td>${t.wall_cabinet_count??0}</td>
        <td>${t.display_fixture_count??t.fixture_count??0}</td>
        <td>${t.counter_count??0}</td>
        <td>${t.table_count||0}</td>
        <td>${t.sign_count||0}</td>
        <td>${at(t.drawing_files,t.drawing_note)}</td>
        <td>${at(t.base_photo_files,t.base_photo_note)}</td>
        <td>${t.special_notes||"-"}</td>
      </tr>`)}function pt(e){return e.vendors.map(t=>{const a=t.attachment_files||{},o=(a.business_license_files||[]).length,n=(a.bankbook_files||[]).length;return`
        <tr>
          <td>${t.name}</td>
          <td>${t.category}</td>
          <td>${t.bank}</td>
          <td>${t.account_number||"-"}</td>
          <td>${t.account_holder||"-"}</td>
          <td>사업자 ${o}개 / 통장 ${n}개</td>
          <td><span class="badge ${D(t.risk)}">${t.risk}</span></td>
          <td><button data-vendor-edit="${t.id}">수정</button></td>
        </tr>`})}function Mt(e){return e.vendors.map(t=>`<option value="${v(t.name)}">${v(t.name)} / ${v(t.bank)} ${v(t.account_number||"")}</option>`).join("")}function jt(e){const a=[...e.constructionStarts.map(n=>({name:n.store_name,area:n.area,status:"공사 시작 접수"})),...e.stores],o=new Set;return a.filter(n=>{const r=String(n.name||"").trim();return!r||o.has(r)?!1:(o.add(r),!0)}).map(n=>`<option value="${v(n.name)}">${v(n.name)} / ${v(n.area)}평 / ${v(n.status)}</option>`).join("")}function Vt(e){return e.paymentItems.map(t=>`<option value="${v(t)}">${v(t)}</option>`).join("")}function ft(){return`
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
            ${jt(h)}
          </datalist>
        </label>
        <label>협력업체
          <input name="vendor" list="vendor-suggestions" placeholder="직접입력 또는 업체명 검색" autocomplete="off" />
          <datalist id="vendor-suggestions">
            <option value="직접입력">직접입력</option>
            ${Mt(h)}
          </datalist>
        </label>
        <label>입금은행<input name="vendor_bank" placeholder="업체 선택 시 자동 입력, 변경 가능" autocomplete="off" /></label>
        <label>입금계좌<input name="vendor_account_number" placeholder="예: 110-000-000000" autocomplete="off" /></label>
        <label>예금주<input name="vendor_account_holder" placeholder="예: 도원인테리어" autocomplete="off" /></label>
        <label>결제 항목
          <input name="payment_item" list="payment-item-suggestions" placeholder="직접입력 또는 공사항목 검색" autocomplete="off" />
          <datalist id="payment-item-suggestions">
            <option value="직접입력">직접입력</option>
            ${Vt(h)}
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
  `}function Bt(){return`
    <article class="panel form-panel">
      <div class="panel-head">
        <h2>결제 계좌 추가</h2>
      </div>
      <div class="notice">결제 신청 전에 협력업체와 지급 계좌를 먼저 등록합니다.</div>
      <form id="vendor-form">
        <input type="hidden" name="vendor_id" />
        <label>업체명<input name="name" placeholder="예: 도원인테리어" autocomplete="off" /></label>
        <label>공종 분류<input name="category" placeholder="예: 시공, 전기, 설비" autocomplete="off" /></label>
        <label>은행명<input name="bank" placeholder="예: 신한은행" autocomplete="off" /></label>
        <label>계좌번호<input name="account_number" placeholder="예: 110-000-000000" autocomplete="off" /></label>
        <label>예금주<input name="account_holder" placeholder="예: 도원인테리어" autocomplete="off" /></label>
        <label>사업자등록증 첨부<input name="business_license_files" type="file" accept="image/*,application/pdf" multiple /></label>
        <label>통장사본 첨부<input name="bankbook_files" type="file" accept="image/*,application/pdf" multiple /></label>
        <p class="form-message" data-vendor-message></p>
        <button class="primary wide" type="submit">계좌 저장</button>
      </form>
    </article>
  `}function Kt(){return`
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
  `}function Wt(){return`
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
  `}function Jt(e){return`
    <section class="kpis">
      ${Ft(e).map(([t,a,o])=>`
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
        ${$(["매장","업체","항목","견적 총액","결제 방식","이번 신청액","지급 유형","원천징수","실지급액","첨부 자료","견적서 반영","상태","신청일"],Tt(e))}
      </article>

      <article class="panel">
        <div class="panel-head">
          <h2>매장 공사 현황</h2>
          <button data-view-link="매장별 공사 관리">관리</button>
        </div>
        ${$(["지역","매장","진열장","평수","공사비 합계","상태","문서"],dt(e))}
      </article>
    </section>

    <section class="grid lower">
      <article class="panel">
        <div class="panel-head">
          <h2>주요 협력업체</h2>
          <button data-view-link="결제 계좌 관리">계좌 추가</button>
        </div>
        ${$(["업체","분류","은행","계좌번호","예금주","첨부","상태","수정"],pt(e))}
      </article>
      ${ft()}
    </section>
  `}function Ht(e){const t=w().includes("은행 이체 파일 생성"),a=ut(e).length,o=I(e).filter(r=>r.ready).length,n=I(e).filter(r=>r.ready).reduce((r,s)=>r+s.amount,0);return`
    <section class="grid two">
      ${ft()}
      <article class="panel">
        <div class="panel-head">
          <h2>결제 신청 검토</h2>
          <div class="row-actions">
            <button>승인 대기 ${e.payments.filter(r=>r.status==="신청").length}건</button>
            ${t?`<button data-bank-transfer-download>이체 파일 ${o}건</button>`:""}
          </div>
        </div>
        ${$(["매장","업체","입금은행","입금계좌","예금주","항목","견적 총액","결제 방식","이번 신청액","지급 유형","원천징수","실지급액","첨부 자료","견적서 반영","상태","신청일","처리"],Ot(e))}
      </article>
    </section>
    ${t?`<section class="panel transfer-download-panel">
            <div>
              <h2>은행 이체 엑셀 다운로드</h2>
              <p>승인된 결제건 중 계좌정보가 있는 건만 은행 대량이체 파일로 내려받습니다.</p>
            </div>
            <div class="transfer-summary">
              <span>승인 ${a}건</span>
              <span>다운로드 가능 ${o}건</span>
              <strong>${g(n)}</strong>
            </div>
            <div class="row-actions">
              <button class="primary" data-bank-transfer-download>엑셀 다운로드</button>
              <button data-view-link="은행 이체 파일 생성">상세 보기</button>
            </div>
          </section>`:""}
  `}function Yt(e){const t=I(e),a=t.filter(n=>n.ready).length,o=t.filter(n=>n.ready).reduce((n,r)=>n+r.amount,0);return`
    <section class="grid two">
      <article class="panel">
        <div class="panel-head">
          <h2>은행 대량이체 파일</h2>
          <button class="primary" data-bank-transfer-download>엑셀 다운로드</button>
        </div>
        <div class="notice">승인된 결제건만 이체 파일에 들어갑니다. 사업소득 3.3% 건은 원천징수 후 실지급액으로 내려받습니다.</div>
        ${$(["매장","업체","입금은행","입금계좌","예금주","입금액","지급 유형","상태"],Pt(e))}
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
            <strong>${g(o)}</strong>
            <small>실지급액 기준</small>
          </article>
        </section>
      </article>
    </section>
  `}function Xt(e){return`
    <section class="grid two">
      ${Wt()}
      <article class="panel">
        <div class="panel-head">
          <h2>공사 시작 접수 목록</h2>
          <button>${e.constructionStarts.length}건 접수</button>
        </div>
        ${$(["매장","평수","벽장","진열장","카운터","테이블","광고판","도면","기초 사진","특이사항"],zt(e))}
      </article>
    </section>
  `}function gt(e){return e.quantity&&e.madeAmount?Math.round(e.madeAmount/e.quantity):e.allocationUnit||e.baseUnit||0}function F(e){const t=rt.filter(o=>o.group===e),a=t.reduce((o,n)=>o+gt(n),0);return e==="카운터"?Math.round(a/Math.max(t.length,1)):a}function Zt(){return rt.map(e=>`
      <tr>
        <td>${e.group}</td>
        <td>${e.name}</td>
        <td class="money">${g(e.baseUnit)}</td>
        <td class="money">${g(e.allocationUnit)}</td>
        <td>${e.quantity||"-"}</td>
        <td class="money">${g(e.madeAmount)}</td>
        <td class="money">${g(gt(e))}</td>
      </tr>`)}function Gt(e){const t=F("벽장"),a=F("진열장"),o=F("카운터");return e.constructionStarts.map(n=>{const r=N(n.wall_cabinet_count),s=N(n.display_fixture_count??n.fixture_count),i=N(n.counter_count),m=r*t+s*a+i*o;return`
      <tr>
        <td>${n.store_name}</td>
        <td>${r}</td>
        <td>${s}</td>
        <td>${i}</td>
        <td class="money">${g(m)}</td>
      </tr>`})}function Qt(e){return`
    <section class="grid two">
      <article class="panel">
        <div class="panel-head">
          <h2>진열장 원가 기준</h2>
          <button>엑셀 반영</button>
        </div>
        <div class="notice">아름가구 산출금액과 휴가기간 가구 산출금액을 기준으로 먼저 원가 기준표를 만들었습니다. 실제 견적서에는 공사 시작 접수의 벽장/진열장/카운터 수량을 곱해 반영합니다.</div>
        ${$(["구분","항목","아름가구 기준","휴가기간 단가","제작수량","제작금액","평균 단가"],Zt())}
      </article>
      <article class="panel">
        <div class="panel-head">
          <h2>매장별 예상 배분</h2>
          <button>${e.constructionStarts.length}개 매장</button>
        </div>
        ${$(["매장","벽장","진열장","카운터","예상 반영 금액"],Gt(e))}
      </article>
    </section>
  `}function te(e){return`
    <section class="grid two">
      ${Bt()}
      <article class="panel">
        <div class="panel-head">
          <h2>결제 계좌 목록</h2>
          <button>${e.vendors.length}개 등록</button>
        </div>
        ${$(["업체","분류","은행","계좌번호","예금주","첨부","상태","수정"],pt(e))}
      </article>
    </section>
  `}function ee(e){return`
    <section class="grid two">
      ${Kt()}
      <article class="panel">
        <div class="panel-head">
          <h2>매장별 공사 목록</h2>
          <button>${e.stores.length}개 매장</button>
        </div>
        ${$(["지역","매장","진열장","평수","공사비 합계","상태","문서"],dt(e))}
      </article>
    </section>
  `}function ne(e){return e.userRoles.map(t=>`
      <tr>
        <td>${t.email}</td>
        <td><span class="badge ${t.role==="admin"?"green":"blue"}">${it[t.role]||t.role}</span></td>
        <td>${t.created_at?String(t.created_at).slice(0,10):"-"}</td>
      </tr>`)}function ae(){return Object.entries(T).map(([e,t])=>`
      <tr>
        <td><strong>${e}</strong></td>
        <td>${t.map(a=>`<span class="menu-chip">${a}</span>`).join("")}</td>
        <td>${t.length}개</td>
      </tr>`)}function oe(e){return`
    <section class="grid two">
      <article class="panel">
        <div class="panel-head">
          <h2>사용자 권한</h2>
          <button>${e.userRoles.length}명 등록</button>
        </div>
        ${$(["이메일","권한","등록일"],ne(e))}
      </article>
      <article class="panel">
        <div class="panel-head">
          <h2>권한별 메뉴</h2>
          <button>${Object.keys(T).length}개 권한</button>
        </div>
        ${$(["권한","볼 수 있는 메뉴","메뉴 수"],ae())}
      </article>
    </section>
  `}function re(e){const t=_t[e]||["기능 범위 정의","입력 항목 확정","데이터 연결"];return`
    <section class="panel empty-panel">
      <h2>${e}</h2>
      <p>이 메뉴는 다음 단계에서 구현할 기능입니다. 지금은 확인해야 할 항목을 먼저 고정해둔 상태입니다.</p>
      <div class="check-list">
        ${t.map(a=>`<span>${a}</span>`).join("")}
      </div>
    </section>
  `}function se(e){return f==="대시보드"?Jt(e):f==="공사 시작 접수"?Xt(e):f==="결제 신청"?Ht(e):f==="결제 계좌 관리"||f==="업체/계좌 관리"?te(e):f==="매장별 공사 관리"?ee(e):f==="진열장 원가 배분"?Qt(e):f==="은행 이체 파일 생성"?Yt(e):f==="관리자 설정"?oe(e):re(f)}function w(){return T[x]||st}function ie(){return`
    <div class="session-box">
      <span>${(y==null?void 0:y.email)||""}</span>
      <strong>${x}</strong>
      <button data-sign-out>로그아웃</button>
    </div>
  `}function k(e=""){const t=document.querySelector("#app");t.className="auth-shell",t.innerHTML=`
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
  `,document.querySelector("#auth-form").addEventListener("submit",le),document.querySelector("[data-auth-action='signup']").addEventListener("click",ce),document.querySelector("[data-auth-action='resend']").addEventListener("click",ue)}async function le(e){e.preventDefault();const t=new FormData(e.currentTarget),a=String(t.get("email")||"").trim(),o=String(t.get("password")||"");if(!a||!o){k("이메일과 비밀번호를 입력해 주세요.");return}const{data:n,error:r}=await l.auth.signInWithPassword({email:a,password:o});if(r){k(`로그인 실패: ${r.message}`);return}y=n.user,x=await ct(y),f=w()[0],h=await q(),_()}async function ce(){const e=document.querySelector("#auth-form"),t=new FormData(e),a=String(t.get("email")||"").trim(),o=String(t.get("password")||"");if(!a||!o){k("계정을 만들 이메일과 비밀번호를 입력해 주세요.");return}const{error:n}=await l.auth.signUp({email:a,password:o,options:{emailRedirectTo:window.location.origin+window.location.pathname}});if(n){k(`회원가입 실패: ${n.message}`);return}k("계정이 생성됐습니다. 이메일 확인이 필요한 경우 메일 인증 후 로그인해 주세요.")}async function ue(){const e=document.querySelector("#auth-form"),t=new FormData(e),a=String(t.get("email")||"").trim();if(!a){k("인증메일을 다시 받을 이메일을 입력해 주세요.");return}const{error:o}=await l.auth.resend({type:"signup",email:a,options:{emailRedirectTo:window.location.origin+window.location.pathname}});if(o){k(`인증메일 재발송 실패: ${o.message}`);return}k("인증메일을 다시 보냈습니다. 새로 받은 메일의 링크를 눌러 주세요.")}async function de(){await l.auth.signOut(),y=null,x="인테리어 공사실장",k("로그아웃되었습니다.")}function _(e=""){var s,i,m,d,c,u,C;const t=document.querySelector("#app");t.className="",w().includes(f)||(f=w()[0]),t.innerHTML=`
    <aside class="sidebar">
      <div class="brand">
        <span class="brand-mark">H</span>
        <div>
          <strong>HAKA Construction</strong>
          <small>공사비 관리 시스템</small>
        </div>
      </div>
      <nav>
        ${w().map(p=>`<button data-view="${p}" class="${p===f?"active":""}">${p}</button>`).join("")}
      </nav>
    </aside>
    <main class="shell">
      <header class="topbar">
        <div>
          <p>${x}</p>
          <h1>${f}</h1>
        </div>
        <div class="actions">
          ${ie()}
          ${w().includes("엑셀 업로드")?'<button data-view-link="엑셀 업로드">엑셀 업로드</button>':""}
          ${w().includes("결제 신청")?'<button class="primary" data-view-link="결제 신청">결제 신청</button>':""}
        </div>
      </header>

      ${e?`<div class="toast">${e}</div>`:""}
      ${se(h)}
    </main>
  `,document.querySelectorAll("[data-view]").forEach(p=>{p.addEventListener("click",()=>{f=p.dataset.view,_()})}),document.querySelectorAll("[data-role]").forEach(p=>{p.addEventListener("click",()=>{x=p.dataset.role,w().includes(f)||(f=w()[0]),_()})}),(s=document.querySelector("[data-sign-out]"))==null||s.addEventListener("click",de),document.querySelectorAll("[data-view-link]").forEach(p=>{p.addEventListener("click",()=>{w().includes(p.dataset.viewLink)&&(f=p.dataset.viewLink),_()})});const a=document.querySelector("#payment-form");a&&(a.addEventListener("submit",qt),(i=a.querySelector("[name='vendor']"))==null||i.addEventListener("input",()=>nt(a)),(m=a.querySelector("[name='vendor']"))==null||m.addEventListener("change",()=>nt(a)),(d=a.querySelector("[name='estimate_total']"))==null||d.addEventListener("input",()=>et(a)),(c=a.querySelector("[name='payment_type']"))==null||c.addEventListener("change",()=>et(a)),(u=a.querySelector("[name='amount']"))==null||u.addEventListener("input",()=>U(a)),(C=a.querySelector("[name='tax_type']"))==null||C.addEventListener("change",()=>U(a)),U(a));const o=document.querySelector("#vendor-form");o&&o.addEventListener("submit",Ct),document.querySelectorAll("[data-vendor-edit]").forEach(p=>{p.addEventListener("click",()=>Lt(Number(p.dataset.vendorEdit)))});const n=document.querySelector("#store-form");n&&n.addEventListener("submit",At);const r=document.querySelector("#construction-start-form");r&&r.addEventListener("submit",Nt),document.querySelectorAll("[data-bank-transfer-download]").forEach(p=>{p.addEventListener("click",()=>Dt(h))}),document.querySelectorAll("[data-payment-id][data-payment-status]").forEach(p=>{p.addEventListener("click",()=>{Et(Number(p.dataset.paymentId),p.dataset.paymentStatus)})})}St();
