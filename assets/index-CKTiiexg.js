import{createClient as ne}from"https://esm.sh/@supabase/supabase-js@2.49.1";(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const a of document.querySelectorAll('link[rel="modulepreload"]'))o(a);new MutationObserver(a=>{for(const r of a)if(r.type==="childList")for(const s of r.addedNodes)s.tagName==="LINK"&&s.rel==="modulepreload"&&o(s)}).observe(document,{childList:!0,subtree:!0});function n(a){const r={};return a.integrity&&(r.integrity=a.integrity),a.referrerPolicy&&(r.referrerPolicy=a.referrerPolicy),a.crossOrigin==="use-credentials"?r.credentials="include":a.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function o(a){if(a.ep)return;a.ep=!0;const r=n(a);fetch(a.href,r)}})();const ae={},Ft=ae||{},yt=Ft.VITE_SUPABASE_URL||"https://yqemtsbdnypgmkuyncxh.supabase.co",$t=Ft.VITE_SUPABASE_ANON_KEY||"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlxZW10c2JkbnlwZ21rdXluY3hoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODAyNjYwMTUsImV4cCI6MjA5NTg0MjAxNX0.gwgdCncqRKKgC8ebj7qIdT-vA4J-wOVd2O9DSa7xEOs";var Tt,Rt;const dt=typeof window<"u"&&["localhost","127.0.0.1"].includes(((Tt=window.location)==null?void 0:Tt.hostname)||"")&&new URLSearchParams(((Rt=window.location)==null?void 0:Rt.search)||"").has("preview"),u=!dt&&yt&&$t?ne(yt,$t):null,wt="construction-start-files",St="payment-files",kt="vendor-files",Nt=["철거","금속공사","목작업","목자재","전기","전기자재","간판","임시간판","돌출간판","실내광고외","광고 시트","자판기 유리작업","자동문 /강화도어","자동문","강화도어","페인트자재","도장공사","타일자재","타일 부자재","타일시공","타일","싱크 개수대","설비","진열장","카운터 역채널","인조대리석","유리/무늬목작접등 기타잡비","유리","무늬목","기타잡비","스카이","에어컨","소방설비","가구운송","엠프","오픈현수막","열쇠/철물","열쇠","철물","청소","폐기물","추가공사","기타"],b={payments:[],stores:[{id:1,name:"성수 플래그십",area:52,status:"완료",budget:21e7,spent:1984e5},{id:2,name:"부산 센텀",area:47,status:"진행중",budget:186e6,spent:1227e5},{id:3,name:"대전 둔산",area:39,status:"진행중",budget:144e6,spent:882e5},{id:4,name:"제주 노형",area:42,status:"미착공",budget:158e6,spent:0}],vendors:[{id:1,name:"도원인테리어",category:"시공",bank:"신한은행",account_number:"110-000-000001",account_holder:"도원인테리어",risk:"정상",total:1245e5},{id:2,name:"한빛전기",category:"전기",bank:"국민은행",account_number:"004-000-000002",account_holder:"한빛전기",risk:"정상",total:738e5},{id:3,name:"서진설비",category:"설비",bank:"하나은행",account_number:"352-000-000003",account_holder:"서진설비",risk:"증빙확인",total:412e5}],userRoles:[],paymentItems:Nt,constructionStarts:[],storeQuotes:[]},oe={...b,payments:[{id:101,store:"성수 플래그십",vendor:"도원인테리어",payment_item:"목작업",estimate_total:12e6,payment_type:"선금 50%",amount:6e6,vendor_bank:"신한은행",vendor_account_number:"110-000-000001",vendor_account_holder:"도원인테리어",tax_type:"일반 송금",withholding_amount:0,net_amount:6e6,attachment_files:{estimate_files:[{name:"성수_목작업_견적서.pdf",size:245760,url:"#"}],tax_invoice_files:[{name:"성수_목작업_세금계산서.pdf",size:184320,url:"#"}]},estimate_group_mode:"매장별 항목 합산",estimate_group_key:"성수 플래그십::목작업",memo:"미리보기 승인 건",status:"승인",requested_at:"2026-08-25",transfer_status:"미작성"},{id:102,store:"부산 센텀",vendor:"한빛전기",payment_item:"전기",estimate_total:88e5,payment_type:"일시 지급",amount:88e5,vendor_bank:"국민은행",vendor_account_number:"004-000-000002",vendor_account_holder:"한빛전기",tax_type:"사업소득 3.3%",withholding_amount:290400,net_amount:8509600,attachment_files:{id_card_files:[{name:"한빛전기_신분증.pdf",size:126e3,url:"#"}]},estimate_group_mode:"매장별 항목 합산",estimate_group_key:"부산 센텀::전기",memo:"파일 생성 완료 샘플",status:"승인",requested_at:"2026-08-24",transfer_status:"파일생성",exported_at:"2026-08-26T09:20:00+09:00",transfer_batch_id:"TR-PREVIEW-001"},{id:103,store:"대전 둔산",vendor:"계좌미등록업체",payment_item:"설비",estimate_total:43e5,payment_type:"일시 지급",amount:43e5,vendor_bank:"",vendor_account_number:"",vendor_account_holder:"",tax_type:"일반 송금",withholding_amount:0,net_amount:43e5,attachment_files:{},estimate_group_mode:"매장별 항목 합산",estimate_group_key:"대전 둔산::설비",memo:"계좌 확인 필요 샘플",status:"승인",requested_at:"2026-08-23",transfer_status:"미작성"},{id:104,store:"제주 노형",vendor:"도원인테리어",payment_item:"타일",estimate_total:32e5,payment_type:"일시 지급",amount:32e5,vendor_bank:"신한은행",vendor_account_number:"110-000-000001",vendor_account_holder:"도원인테리어",tax_type:"일반 송금",withholding_amount:0,net_amount:32e5,attachment_files:{},estimate_group_mode:"매장별 항목 합산",estimate_group_key:"제주 노형::타일",memo:"송금완료 제외 샘플",status:"승인",requested_at:"2026-08-22",transfer_status:"송금완료",transferred_at:"2026-08-26T14:30:00+09:00"},{id:105,store:"성수 플래그십",vendor:"서진설비",payment_item:"소방설비",estimate_total:28e5,payment_type:"잔금 50%",amount:14e5,vendor_bank:"하나은행",vendor_account_number:"352-000-000003",vendor_account_holder:"서진설비",tax_type:"일반 송금",withholding_amount:0,net_amount:14e5,attachment_files:{},estimate_group_mode:"매장별 항목 합산",estimate_group_key:"성수 플래그십::소방설비",memo:"승인 전 검토 샘플",status:"신청",requested_at:"2026-08-27",transfer_status:"미작성"}],constructionStarts:[{id:201,store_name:"부산 센텀",area:47,drawing_note:"도면 확인 완료",drawing_files:[{name:"부산센텀_도면.pdf",size:312e3,url:"#"}],wall_upper_count:8,wall_lower_count:8,display_fixture_count:6,counter_drawer_1200_count:2,counter_shelf_1800_count:1,counter_shelf_1600_count:1,table_count:4,base_photo_note:"기초 사진 등록",base_photo_files:[{name:"부산센텀_기초사진.jpg",size:52e4,url:"#"}],special_notes:"미리보기 데이터",created_at:"2026-08-20T09:00:00+09:00"}],storeQuotes:[{store_name:"성수 플래그십",quote_status:"견적 확정",margin_rate:35,direct_cost:74e5,fixture_cost:0,cost_total:74e5,supply_amount:999e4,vat_amount:999e3,total_amount:10989e3}]},Ut=[{group:"벽장",name:"상부장",baseUnit:115600,allocationUnit:57100,quantity:40,madeAmount:126e4},{group:"벽장",name:"하부장",baseUnit:167500,allocationUnit:63500,quantity:40,madeAmount:224e4},{group:"진열장",name:"유리장",baseUnit:287e3,allocationUnit:163500,quantity:40,madeAmount:266e4},{group:"카운터",name:"카운터 서랍형 1200",baseUnit:831200,allocationUnit:727200,quantity:10,madeAmount:56e4},{group:"카운터",name:"카운터 선반형 1800",baseUnit:395800,allocationUnit:395800,quantity:4,madeAmount:256e3},{group:"카운터",name:"카운터 선반형 1600",baseUnit:350600,allocationUnit:350600,quantity:2,madeAmount:122e3},{group:"테이블",name:"테이블 600*1200",baseUnit:22e4,allocationUnit:161e3,quantity:5,madeAmount:805e3},{group:"도장",name:"도장 / 총 58통",baseUnit:18e4,allocationUnit:18e4,quantity:4,madeAmount:72e4}],Mt=["대시보드","엑셀 업로드","공사 시작 접수","결제 신청","결제 계좌 관리","첨부 파일 보기","매장별 공사 관리","진열장 원가 배분","견적서 생성","계약서 생성","은행 이체 파일 생성","관리자 설정"],pt={"전체 관리자":Mt,"인테리어 공사실장":["공사 시작 접수","결제 신청","결제 계좌 관리","첨부 파일 보기","진열장 원가 배분"]},zt={admin:"전체 관리자",interior_manager:"인테리어 공사실장","전체 관리자":"전체 관리자","인테리어 공사실장":"인테리어 공사실장"},re={"엑셀 업로드":["결제 신청 내역 엑셀 업로드","필수 컬럼 검증","중복/오류 행 표시"],"진열장 원가 배분":["매장별 진열장 비용 배분","공용 비용 자동 분배","평당 원가 반영"],"견적서 생성":["매장/업체 기준 견적서 생성","공사항목별 금액 자동 합산","PDF/문서 다운로드"],"계약서 생성":["업체 정보 기반 계약서 생성","계좌/사업자 정보 자동 반영","계약 상태 관리"],"은행 이체 파일 생성":["승인된 결제 건만 추출","은행 업로드용 파일 생성","이체 전 검증"],"첨부 파일 보기":["결제 증빙 확인","업체 서류 확인","공사 시작 파일 확인"],"관리자 설정":["사용자 권한","승인 단계","상태/분류 코드 관리"]},Ot="haka-active-view",se=()=>{try{return typeof window<"u"&&window.localStorage.getItem(Ot)||""}catch{return""}},ie=e=>{try{typeof window<"u"&&window.localStorage.setItem(Ot,e)}catch{}};let q=b,f=se()||"대시보드",P="인테리어 공사실장",w=null,I={startDate:"",endDate:""},E={startDate:"",endDate:"",keyword:"",readyStatus:"all"},J="",G="진행중",tt=[],V=null;const m=e=>new Intl.NumberFormat("ko-KR",{style:"currency",currency:"KRW",maximumFractionDigits:0}).format(e||0),ft=()=>new Date().toISOString().slice(0,10),W=e=>Number(String(e).replace(/[^\d]/g,"")),y=e=>Number(e||0),rt=(e,t)=>String(e||"").trim().slice(0,t),ce=e=>String(e||"").replace(/[^\d]/g,""),le=e=>({"일시 지급":1,"선금 50%":.5,"잔금 50%":.5})[e]||0,Bt=e=>e==="사업소득 3.3%"?.033:0,g=e=>String(e||"").replace(/&/g,"&amp;").replace(/"/g,"&quot;").replace(/</g,"&lt;").replace(/>/g,"&gt;"),_t=e=>String(e||"file").replace(/[^\w.\-가-힣]/g,"_"),et=e=>({승인:"green",신청:"amber",반려:"red",진행중:"blue",완료:"green",미착공:"gray",정상:"green",증빙확인:"amber",정산중:"amber","견적 확정":"blue","계약 완료":"green"})[e]||"gray";async function Vt(){if(tt=[],!u)return tt=[dt?"로컬 미리보기 데이터로 표시 중입니다.":"Supabase 연결 정보가 없어 임시 데이터로 표시 중입니다."],dt?oe:b;const[e,t,n,o,a,r,s]=await Promise.all([u.from("payments").select("*").order("requested_at",{ascending:!1}).order("id",{ascending:!1}).limit(500),u.from("stores").select("*").order("id",{ascending:!0}),u.from("vendors").select("*").order("id",{ascending:!0}),u.from("construction_starts").select("*").order("created_at",{ascending:!1}).order("id",{ascending:!1}).limit(30),u.from("user_roles").select("email, role, created_at").order("email",{ascending:!0}),u.from("construction_cost_parts").select("part_name").order("part_name",{ascending:!0}),u.from("store_quotes").select("*").order("updated_at",{ascending:!1})]),l=[["결제 신청",e],["매장",t],["업체/계좌",n]].find(([,d])=>d.error);if(l)throw new Error(`${l[0]} 데이터를 불러오지 못했습니다. DB 연결과 권한을 확인해 주세요. (${l[1].error.message})`);[["공사 시작",o],["사용자 권한",a],["공사항목",r],["매장 견적",s]].forEach(([d,_])=>{_.error&&tt.push(`${d}: ${_.error.message}`)});const p=r.error?b.paymentItems:[...new Set([...Nt,...r.data.map(d=>d.part_name).filter(Boolean)])];return{payments:e.error?b.payments:e.data,stores:t.error?b.stores:t.data,vendors:n.error?b.vendors:n.data,constructionStarts:o.error?b.constructionStarts:o.data,userRoles:a.error?b.userRoles:a.data,paymentItems:p,storeQuotes:s.error?b.storeQuotes:s.data}}function ue(e){var n;const t=document.querySelector("#app");t.className="auth-shell",t.innerHTML=`
    <main class="auth-page">
      <section class="auth-panel">
        <div class="brand auth-brand">
          <span class="brand-mark">H</span>
          <div>
            <strong>HAKA Construction</strong>
            <small>공사비 관리 시스템</small>
          </div>
        </div>
        <h1>데이터 연결 확인 필요</h1>
        <p>운영 데이터가 안전하게 확인되지 않아 화면 표시를 멈췄습니다.</p>
        <div class="form-message error">${g(e.message||"데이터를 불러오지 못했습니다.")}</div>
        <button class="primary wide" type="button" data-retry-load>다시 불러오기</button>
      </section>
    </main>
  `,(n=document.querySelector("[data-retry-load]"))==null||n.addEventListener("click",jt)}async function C(e=""){try{q=await Vt(),h(e)}catch(t){ue(t)}}async function Pt(e){if(!u||!(e!=null&&e.email))return"인테리어 공사실장";const{data:t,error:n}=await u.from("user_roles").select("role").ilike("email",e.email).maybeSingle();return n||!(t!=null&&t.role)?"인테리어 공사실장":zt[t.role]||"인테리어 공사실장"}async function jt(){var t;if(!u){P="전체 관리자",await C();return}const{data:e}=await u.auth.getSession();if(w=((t=e.session)==null?void 0:t.user)||null,!w){F();return}P=await Pt(w),ht(),await C()}function de(e,t,n){return e.payments.find(o=>{const a=o.vendor.trim()===t.trim(),r=Math.abs(o.amount-n)/Math.max(n,1);return a&&r<=.1})}function me(e,t,n){return e.payments.find(o=>{const a=String(o.store||"").trim()===t.trim(),r=String(o.payment_item||"").trim()===n.trim();return a&&r})}async function qt(e,t){const n=Array.from(e||[]).filter(a=>a.size>0);if(!n.length)return[];if(!u)return n.map(a=>({name:a.name,type:a.type,size:a.size,path:"",url:""}));const o=[];for(const a of n){const r=`${(w==null?void 0:w.id)||"user"}/${t}/${Date.now()}-${crypto.randomUUID()}-${_t(a.name)}`,{error:s}=await u.storage.from(wt).upload(r,a,{contentType:a.type||"application/octet-stream",upsert:!1});if(s)throw s;const{data:i}=u.storage.from(wt).getPublicUrl(r);o.push({name:a.name,type:a.type,size:a.size,path:r,url:i.publicUrl})}return o}async function ut(e,t){const n=Array.from(e||[]).filter(a=>a.size>0);if(!n.length)return[];if(!u)return n.map(a=>({name:a.name,type:a.type,size:a.size,path:"",url:""}));const o=[];for(const a of n){const r=`${(w==null?void 0:w.id)||"user"}/${t}/${Date.now()}-${crypto.randomUUID()}-${_t(a.name)}`,{error:s}=await u.storage.from(St).upload(r,a,{contentType:a.type,upsert:!1});if(s)throw s;const{data:i}=u.storage.from(St).getPublicUrl(r);o.push({name:a.name,type:a.type,size:a.size,path:r,url:i.publicUrl})}return o}async function Ct(e,t){const n=Array.from(e||[]).filter(a=>a.size>0);if(!n.length)return[];if(!u)return n.map(a=>({name:a.name,type:a.type,size:a.size,path:"",url:""}));const o=[];for(const a of n){const r=`${(w==null?void 0:w.id)||"user"}/${t}/${Date.now()}-${crypto.randomUUID()}-${_t(a.name)}`,{error:s}=await u.storage.from(kt).upload(r,a,{contentType:a.type,upsert:!1});if(s)throw s;const{data:i}=u.storage.from(kt).getPublicUrl(r);o.push({name:a.name,type:a.type,size:a.size,path:r,url:i.publicUrl})}return o}async function pe(e){e.preventDefault();const t=e.currentTarget,n=t.querySelector("button[type='submit']"),o=t.querySelector("[data-form-message]"),a=new FormData(t),r=Number(a.get("payment_id")||0),s=r?q.payments.find(S=>S.id===r&&S.status==="신청"):null,i=!!s,l=String(a.get("store")||"").trim(),p=String(a.get("vendor")||"").trim(),d=String(a.get("payment_item")||"").trim(),_=W(a.get("estimate_total")),R=String(a.get("payment_type")||"일시 지급"),$=W(a.get("amount")),x=String(a.get("tax_type")||"일반 송금"),N=Math.round($*Bt(x)),k=$-N,U=String(a.get("vendor_bank")||"").trim(),M=String(a.get("vendor_account_number")||"").trim(),Y=String(a.get("vendor_account_holder")||"").trim(),nt=String(a.get("memo")||"").trim(),j=de(q,p,$),z=(j==null?void 0:j.id)===r?null:j,K=me(q,l,d),c=(K==null?void 0:K.id)===r?null:K,v=a.getAll("estimate_files").filter(S=>S.size>0),D=a.getAll("tax_invoice_files").filter(S=>S.size>0),L=a.getAll("id_card_files").filter(S=>S.size>0),A=(s==null?void 0:s.attachment_files)||{},X=v.length||(A.estimate_files||[]).length,at=D.length||(A.tax_invoice_files||[]).length,ot=L.length||(A.id_card_files||[]).length;if(r&&!s){o.textContent="수정할 수 없는 결제 신청입니다. 이미 승인/반려 처리됐는지 확인해 주세요.",o.className="form-message error";return}if(!l||!p||!d||!_||!$||!U||!M||!Y){o.textContent="매장명, 업체, 결제 항목, 견적 총액, 신청 금액, 이체 계좌를 모두 입력해 주세요.",o.className="form-message error";return}if(x==="일반 송금"&&(!X||!at)){o.textContent="일반 송금은 견적서와 세금계산서를 첨부해야 합니다.",o.className="form-message error";return}if(x==="사업소득 3.3%"&&!ot){o.textContent="사업소득 3.3% 지급은 주민등록증 첨부가 필요합니다.",o.className="form-message error";return}n.disabled=!0,n.textContent="저장 중",o.textContent="첨부 자료를 업로드하고 있습니다.",o.className=z||c?"form-message warning":"form-message";let Z={};try{Z={estimate_files:[...A.estimate_files||[],...await ut(v,"estimates")],tax_invoice_files:[...A.tax_invoice_files||[],...await ut(D,"tax-invoices")],id_card_files:[...A.id_card_files||[],...await ut(L,"id-cards")]}}catch(S){n.disabled=!1,n.textContent=i?"수정 저장":"검토 요청 생성",o.textContent=`첨부 업로드 실패: ${S.message}`,o.className="form-message error";return}o.textContent=z?`중복 의심: ${z.store} / ${m(z.amount)} 건과 비슷합니다.`:c?`확인 필요: ${l} / ${d} 항목에 기존 신청이 있습니다. 중복이 아니면 견적서에는 같은 항목 합계로 반영됩니다.`:i?"수정 내용을 저장하고 있습니다.":"신청 건을 저장하고 있습니다.",o.className=z||c?"form-message warning":"form-message";const Q={store:l,vendor:p,payment_item:d,estimate_total:_,payment_type:R,amount:$,vendor_bank:U,vendor_account_number:M,vendor_account_holder:Y,tax_type:x,withholding_amount:N,net_amount:k,attachment_files:Z,estimate_group_mode:"매장별 항목 합산",estimate_group_key:`${l}::${d}`,memo:nt,status:"신청",requested_at:(s==null?void 0:s.requested_at)||ft()};if(!u)b.payments=i?b.payments.map(S=>S.id===r?{...S,...Q}:S):[{id:Date.now(),...Q},...b.payments];else{const{error:S}=i?await u.from("payments").update(Q).eq("id",r).eq("status","신청"):await u.from("payments").insert(Q);if(S){n.disabled=!1,n.textContent=i?"수정 저장":"검토 요청 생성",o.textContent=`저장 실패: ${S.message}`,o.className="form-message error";return}}t.reset(),V=null,await C(i?"결제 신청 수정이 저장됐습니다.":z?"신청이 저장됐습니다. 중복 의심 건은 결제 검토에서 확인하세요.":"신청이 저장됐습니다.")}async function fe(e){var d;e.preventDefault();const t=e.currentTarget,n=t.querySelector("button[type='submit']"),o=t.querySelector("[data-vendor-message]"),a=new FormData(t),r=Number(a.get("vendor_id")||0),s={name:String(a.get("name")||"").trim(),category:String(a.get("category")||"").trim(),bank:String(a.get("bank")||"").trim(),account_number:String(a.get("account_number")||"").trim(),account_holder:String(a.get("account_holder")||"").trim()},i=a.getAll("business_license_files").filter(_=>_.size>0),l=a.getAll("bankbook_files").filter(_=>_.size>0);if(!s.name||!s.category||!s.bank||!s.account_number||!s.account_holder){o.textContent="업체명, 분류, 은행, 계좌번호, 예금주를 모두 입력해 주세요.",o.className="form-message error";return}if(!r&&(!i.length||!l.length)){o.textContent="최초 등록 시 사업자등록증과 통장사본을 모두 첨부해 주세요.",o.className="form-message error";return}n.disabled=!0,n.textContent="저장 중",o.textContent="첨부 자료를 업로드하고 있습니다.",o.className="form-message";let p={};try{const _=r?((d=q.vendors.find(R=>R.id===r))==null?void 0:d.attachment_files)||{}:{};p={business_license_files:[..._.business_license_files||[],...await Ct(i,"business-licenses")],bankbook_files:[..._.bankbook_files||[],...await Ct(l,"bankbooks")]}}catch(_){n.disabled=!1,n.textContent="계좌 저장",o.textContent=`첨부 업로드 실패: ${_.message}`,o.className="form-message error";return}if(s.attachment_files=p,o.textContent="결제 계좌 정보를 저장하고 있습니다.",!u)b.vendors=r?b.vendors.map(_=>_.id===r?{..._,...s}:_):[{id:Date.now(),...s,risk:"정상",total:0},...b.vendors];else{const{error:_}=r?await u.from("vendors").update(s).eq("id",r):await u.from("vendors").insert(s);if(_){n.disabled=!1,n.textContent="계좌 저장",o.textContent=`저장 실패: ${_.message}`,o.className="form-message error";return}}t.reset(),f="결제 계좌 관리",await C(r?"결제 계좌 정보가 수정됐습니다.":"결제 계좌 정보가 저장됐습니다.")}async function _e(e){e.preventDefault();const t=e.currentTarget,n=t.querySelector("button[type='submit']"),o=t.querySelector("[data-store-message]"),a=new FormData(t),r={name:String(a.get("name")||"").trim(),area:Number(a.get("area")),status:String(a.get("status")||"미착공"),budget:W(a.get("budget")),spent:W(a.get("spent"))};if(!r.name||!r.area||!r.budget){o.textContent="매장명, 면적, 예산을 입력해 주세요.",o.className="form-message error";return}if(n.disabled=!0,n.textContent="저장 중",o.textContent="매장 공사 정보를 저장하고 있습니다.",o.className="form-message",!u)b.stores=[{id:Date.now(),...r},...b.stores];else{const{error:s}=await u.from("stores").insert(r);if(s){n.disabled=!1,n.textContent="매장 저장",o.textContent=`저장 실패: ${s.message}`,o.className="form-message error";return}}t.reset(),f="매장별 공사 관리",await C("매장 공사 정보가 저장됐습니다.")}async function ge(e){e.preventDefault();const t=e.currentTarget,n=t.querySelector("button[type='submit']"),o=t.querySelector("[data-construction-start-message]"),a=new FormData(t),r=y(a.get("wall_upper_count")),s=y(a.get("wall_lower_count")),i=y(a.get("display_fixture_count")),l=y(a.get("counter_drawer_1200_count")),p=y(a.get("counter_shelf_1800_count")),d=y(a.get("counter_shelf_1600_count")),_=l+p+d,R=Number(a.get("table_count")||0),$={store_name:String(a.get("store_name")||"").trim(),area:Number(a.get("area")),wall_upper_count:r,wall_lower_count:s,counter_drawer_1200_count:l,counter_shelf_1800_count:p,counter_shelf_1600_count:d,wall_cabinet_count:r+s,display_fixture_count:i,counter_count:_,fixture_count:r+s+i+_,table_count:R,sign_count:Number(a.get("sign_count")||0),special_notes:String(a.get("special_notes")||"").trim()};if(!$.store_name||!$.area){o.textContent="매장명과 평수는 꼭 입력해 주세요.",o.className="form-message error";return}n.disabled=!0,n.textContent="저장 중",o.textContent="도면과 사진 파일을 업로드하고 있습니다.",o.className="form-message";try{$.drawing_files=await qt(a.getAll("drawing_files"),"drawings"),$.base_photo_files=await qt(a.getAll("base_photo_files"),"base-photos")}catch(x){n.disabled=!1,n.textContent="공사 시작 정보 저장",o.textContent=`파일 업로드 실패: ${x.message}`,o.className="form-message error";return}if(o.textContent="공사 시작 정보를 저장하고 있습니다.",!u)b.constructionStarts=[{id:Date.now(),created_at:new Date().toISOString(),...$},...b.constructionStarts];else{const{error:x}=await u.from("construction_starts").insert($);if(x){n.disabled=!1,n.textContent="공사 시작 정보 저장",o.textContent=`저장 실패: ${x.message}`,o.className="form-message error";return}}t.reset(),f="공사 시작 접수",await C("공사 시작 정보가 저장됐습니다. 결제 신청 매장 검색에도 반영됐습니다.")}async function ve(e,t){if(!(!e||!["승인","반려"].includes(t))){if(!u)b.payments=b.payments.map(n=>n.id===e?{...n,status:t}:n);else{const{data:n,error:o}=await u.from("payments").update({status:t}).eq("id",e).eq("status","신청").select("id").maybeSingle();if(o){h(`상태 변경 실패: ${o.message}`);return}if(!n){V===e&&(V=null),f="결제 신청",await C("상태 변경 실패: 이미 처리됐거나 권한이 없습니다. 새로고침 후 다시 확인해 주세요.");return}}V===e&&(V=null),f="결제 신청",await C(`결제 신청이 ${t} 처리됐습니다.`)}}async function be(e){const t=[...new Set(e.map(Number).filter(Boolean))];if(!t.length){h("승인할 결제 신청을 먼저 선택해 주세요.");return}if(!u){b.payments=b.payments.map(a=>t.includes(a.id)&&a.status==="신청"?{...a,status:"승인"}:a),f="결제 신청",await C(`${t.length}건을 승인 처리했습니다.`);return}const{data:n,error:o}=await u.from("payments").update({status:"승인"}).in("id",t).eq("status","신청").select("id");if(o){h(`선택 승인 실패: ${o.message}`);return}f="결제 신청",await C(`${(n==null?void 0:n.length)||0}건을 승인 처리했습니다. 이제 엑셀 다운로드를 누르면 승인된 건이 내려갑니다.`)}async function xt(e,t){const n=document.querySelector(`[data-margin-rate="${CSS.escape(e)}"]`),o=Number((n==null?void 0:n.value)||35),a=bt(q,e,o),r=lt(q,e),s={store_name:e,quote_status:t,margin_rate:o,direct_cost:a.directCost,fixture_cost:a.fixtureCost,cost_total:a.costTotal,supply_amount:a.supplyAmount,vat_amount:a.vatAmount,total_amount:a.totalAmount,quote_confirmed_at:t==="견적 확정"?new Date().toISOString():r.quote_confirmed_at||new Date().toISOString(),contract_completed_at:t==="계약 완료"?new Date().toISOString():r.contract_completed_at||null,updated_at:new Date().toISOString()};if(!e||!a.costTotal||o<0){h("견적 확정 전에 승인된 결제 또는 진열장 배분 원가와 마진율을 확인해 주세요.");return}if(!u)b.storeQuotes=[{id:r.id||Date.now(),...s},...b.storeQuotes.filter(i=>i.store_name!==e)];else{const{error:i}=await u.from("store_quotes").upsert(s,{onConflict:"store_name"});if(i){h(`매장 견적 저장 실패: ${i.message}`);return}}J=e,f=t==="계약 완료"?"견적서 생성":"매장별 공사 관리",await C(t==="계약 완료"?`${e} 공사 완료 처리됐습니다. 견적서와 계약서를 확인할 수 있습니다.`:`${e} 견적이 확정됐습니다.`)}function he(e){var o;const t=String(e||"").replace(/\s/g,"");return((o=[["신한","신한"],["국민","국민"],["기업","기업"],["우리","우리"],["하나","하나"],["농협","농협"],["축협","농협"],["카카오","카카오"],["토스","토스"],["케이뱅크","케이뱅크"],["부산","부산"],["대구","아이엠뱅크"],["아이엠","아이엠뱅크"],["새마을","새마을금고"],["신협","신협"],["우체국","우체국"],["전북","전북"],["광주","광주"],["경남","경남"],["수협","수협"]].find(([a])=>t.includes(a)))==null?void 0:o[1])||rt(e,6)}function ye(e,t){const n=String(t.vendor||"").trim();return e.vendors.find(o=>String(o.name||"").trim()===n)||{}}function Kt(e){return e.payments.filter(t=>t.status==="승인")}function ct(e){return String(e.transfer_status||"미작성").trim()||"미작성"}function gt(e){return["송금완료","이체완료"].includes(ct(e))}function $e(e){return Kt(e).filter(t=>!gt(t))}function we(e){if(!e.ready)return"red";const t=ct(e.payment);return gt(e.payment)?"green":t==="파일생성"?"blue":"gray"}function Se(e){if(!e.ready)return"계좌정보 확인";const t=ct(e.payment);return t==="미작성"?"파일 미생성":t}function Dt(e){const t=String(e||"");return t?t.includes("T")?t.slice(0,16).replace("T"," "):t.slice(0,10):""}function ke(){const e=new Date().toISOString().replace(/[-:TZ.]/g,"").slice(0,14),t=Math.random().toString(36).slice(2,8).toUpperCase();return`TR-${e}-${t}`}function qe(e,t){const n=ye(e,t),o=t.vendor_bank||n.bank,a=t.vendor_account_number||n.account_number,r=t.vendor_account_holder||n.account_holder||t.vendor,s=Number(t.net_amount||t.amount||0),i=`${t.store||""} ${t.payment_item||""}`.trim();return{bank:he(o),account:ce(a),holder:r,amount:s,withdrawMemo:"하카공사비",depositMemo:rt(r,7),payerCode:"",memo:rt(i,10),key:rt(`${t.id||""}-${t.requested_at||ft()}`,20),payment:t,vendor:n,ready:!!(o&&a&&r&&s>0)}}function Xt(e,t,n){const o=String(e||"").slice(0,10);return!(!o||t&&o<t||n&&o>n)}function Ce(e){return!(I.startDate||I.endDate)?e:{...e,payments:e.payments.filter(n=>Xt(n.requested_at,I.startDate,I.endDate))}}function mt(e,t={}){var s;const n=(s=t.selectedIds)!=null&&s.length?new Set(t.selectedIds.map(String)):null,o=!!(t.startDate||t.endDate),a=String(t.keyword||"").trim().toLowerCase(),r=t.readyStatus||"all";return $e(e).filter(i=>!o||Xt(i.requested_at,t.startDate,t.endDate)).filter(i=>!n||n.has(String(i.id))).map(i=>qe(e,i)).filter(i=>a?[i.payment.store,i.payment.vendor,i.payment.payment_item,i.bank,i.account,i.holder].join(" ").toLowerCase().includes(a):!0).filter(i=>r==="ready"?i.ready:r==="missing"?!i.ready:!0)}async function xe(e,t){const n=[...new Set(e.map(i=>Number(i.payment.id)).filter(Boolean))];if(!n.length)return{updated:0};const o=new Date().toISOString(),a={transfer_batch_id:t,exported_at:o,transfer_status:"파일생성"};if(!u)return b.payments=b.payments.map(i=>n.includes(i.id)&&i.status==="승인"?{...i,...a}:i),q=await Vt(),{updated:n.length};const{data:r,error:s}=await u.from("payments").update(a).in("id",n).eq("status","승인").select("id");return s?{error:s}:{updated:(r==null?void 0:r.length)||0}}async function De(e){const t=[...new Set(e.map(Number).filter(Boolean))];if(!t.length){h("송금완료 처리할 이체건을 먼저 선택해 주세요.");return}if(!window.confirm(`${t.length}건을 송금완료로 처리할까요? 처리 후 이체자료조회 대상에서 제외됩니다.`))return;const n={transfer_status:"송금완료",transferred_at:new Date().toISOString(),transfer_memo:"화면에서 송금완료 처리"};if(!u){b.payments=b.payments.map(r=>t.includes(r.id)&&r.status==="승인"?{...r,...n}:r),f="은행 이체 파일 생성",await C(`${t.length}건을 송금완료 처리했습니다.`);return}const{data:o,error:a}=await u.from("payments").update(n).in("id",t).eq("status","승인").select("id");if(a){h(`송금완료 처리 실패: ${a.message}`);return}f="은행 이체 파일 생성",await C(`${(o==null?void 0:o.length)||0}건을 송금완료 처리했습니다.`)}async function Ae(e,t={}){const n=Array.isArray(t.selectedIds)&&t.selectedIds.length>0,o=!!(t.startDate||t.endDate);if(!n&&!o){h("이체 파일은 전체 승인건을 자동으로 만들지 않습니다. 이체대상을 체크하거나 날짜 범위를 조회한 뒤 다운로드해 주세요.");return}const a=mt(e,t).filter(k=>k.ready);if(!a.length){h("다운로드할 승인 완료 건이 없거나, 업체 계좌정보가 비어 있습니다.");return}if(!window.XLSX){h("엑셀 생성 모듈을 불러오지 못했습니다. 새로고침 후 다시 시도해 주세요.");return}const r=["*입금은행","*입금계좌","*입금액","고객관리성명"],s=a.map(k=>[k.bank,k.account,Math.round(Number(k.amount||0)),k.holder]),i=window.XLSX.utils.aoa_to_sheet([r,...s]);for(let k=2;k<=s.length+1;k+=1){const U=i[`B${k}`],M=i[`C${k}`];U&&(U.t="s",U.z="@"),M&&(M.t="n",M.z="0")}i["!cols"]=[{wch:12},{wch:22},{wch:14},{wch:24}];const l=window.XLSX.utils.book_new();window.XLSX.utils.book_append_sheet(l,i,"입력정보");const p=window.XLSX.write(l,{bookType:"xls",type:"array"}),d=new Blob([p],{type:"application/vnd.ms-excel"}),_=URL.createObjectURL(d),R=ke(),$=document.createElement("a");$.href=_;const x=t.startDate||t.endDate?`_${t.startDate||"처음"}_${t.endDate||"오늘"}`:"";$.download=`은행대량이체${x}_${R}_${a.length}건.xls`,document.body.appendChild($),$.click(),$.remove(),URL.revokeObjectURL(_);const N=await xe(a,R);if(N.error){h(`이체 파일 ${a.length}건은 생성했지만 상태 저장에 실패했습니다: ${N.error.message}`);return}f="은행 이체 파일 생성",await C(`이체 파일 ${a.length}건을 생성하고 ${N.updated}건을 파일생성 상태로 표시했습니다.`)}function At(e){const t=e.querySelector("[name='estimate_total']"),n=e.querySelector("[name='payment_type']"),o=e.querySelector("[name='amount']"),a=le(n.value),r=W(t.value);!a||!r||(o.value=String(Math.round(r*a)),st(e))}function st(e){var i,l;const t=W((i=e.querySelector("[name='amount']"))==null?void 0:i.value),n=((l=e.querySelector("[name='tax_type']"))==null?void 0:l.value)||"일반 송금",o=Math.round(t*Bt(n)),a=t-o,r=e.querySelector("[data-withholding-preview]"),s=e.querySelector("[data-net-preview]");r&&(r.textContent=m(o)),s&&(s.textContent=m(a))}function Et(e){var o;const t=String(((o=e.querySelector("[name='vendor']"))==null?void 0:o.value)||"").trim(),n=q.vendors.find(a=>String(a.name||"").trim()===t);n&&(e.querySelector("[name='vendor_bank']").value=n.bank||"",e.querySelector("[name='vendor_account_number']").value=n.account_number||"",e.querySelector("[name='vendor_account_holder']").value=n.account_holder||"")}function Ee(e){const t=q.vendors.find(o=>o.id===e),n=document.querySelector("#vendor-form");!t||!n||(n.querySelector("[name='vendor_id']").value=t.id,n.querySelector("[name='name']").value=t.name||"",n.querySelector("[name='category']").value=t.category||"",n.querySelector("[name='bank']").value=t.bank||"",n.querySelector("[name='account_number']").value=t.account_number||"",n.querySelector("[name='account_holder']").value=t.account_holder||"",n.querySelector("button[type='submit']").textContent="계좌 수정",n.querySelector("[data-vendor-message]").textContent="기존 계좌 정보를 수정 중입니다. 새 파일을 첨부하면 기존 파일에 추가됩니다.")}function Le(e){const t=e.stores.filter(d=>d.status==="완료").length,n=e.stores.filter(d=>d.status==="진행중").length,o=e.stores.filter(d=>d.document_required).length,a=e.payments.filter(d=>d.status==="승인").reduce((d,_)=>d+_.amount,0),r=e.stores.reduce((d,_)=>d+Number(_.spent||0),0),s=e.payments.filter(d=>d.status==="신청").length,i=e.stores.filter(d=>String(d.name||"").includes("직영점")).length,l=e.stores.reduce((d,_)=>d+Number(_.area||0),0),p=Math.round(r/Math.max(l,1));return[["완료된 매장",`${t}개`,"엑셀 공사 상태 기준"],["진행중인 매장",`${n}개`,"시공 또는 비용 검수 중"],["전체 공사비",m(r),"엑셀 합계 기준"],["문서 생성 대상",`${o}개`,"강남압구정 행부터 아래"],["대기중인 결제",`${s}건`,"승인 전 검토 필요"],["직영점",`${i}개`,"지점명 기준"],["승인된 결제",m(a),"지급 승인 완료"],["평균 평당 원가",m(p),"엑셀 합계/평수 기준"]]}function T(e,t){return`
    <div class="table-wrap">
      <table>
        <thead><tr>${e.map(n=>`<th>${n}</th>`).join("")}</tr></thead>
        <tbody>${t.join("")}</tbody>
      </table>
    </div>
  `}function Ie(e){return e.payments.map(t=>`
      <tr>
        <td>${t.store}</td>
        <td>${t.vendor}</td>
        <td>${t.vendor_bank||"-"}</td>
        <td>${t.vendor_account_number||"-"}</td>
        <td>${t.vendor_account_holder||"-"}</td>
        <td>${t.payment_item||"-"}</td>
        <td class="money">${m(t.estimate_total||t.amount)}</td>
        <td>${t.payment_type||"일시 지급"}</td>
        <td class="money">${m(t.amount)}</td>
        <td>${t.tax_type||"일반 송금"}</td>
        <td class="money">${m(t.withholding_amount||0)}</td>
        <td class="money">${m(t.net_amount||t.amount)}</td>
        <td>${Zt(t)}</td>
        <td>${t.estimate_group_mode||"매장별 항목 합산"}</td>
        <td><span class="badge ${et(t.status)}">${t.status}</span></td>
        <td>${t.requested_at}</td>
      </tr>`)}function Te(e,t=!1){return e.payments.length?`
    <div class="payment-review-list">
      ${e.payments.map(n=>`
            <details class="payment-review-card">
              <summary>
                <div class="payment-summary-main">
                  ${n.status==="신청"&&t?`<input type="checkbox" class="payment-select" value="${n.id}" aria-label="${g(n.store)} 선택" />`:""}
                  <div>
                    <strong>${n.store}</strong>
                    <span>${n.vendor}</span>
                  </div>
                </div>
                <div class="payment-summary-meta">
                  <span>${n.payment_item||"-"}</span>
                  <strong>${m(n.net_amount||n.amount)}</strong>
                  <span class="badge ${et(n.status)}">${n.status}</span>
                </div>
              </summary>
              <div class="payment-detail-grid">
                <div><span>입금은행</span><strong>${n.vendor_bank||"-"}</strong></div>
                <div><span>입금계좌</span><strong>${n.vendor_account_number||"-"}</strong></div>
                <div><span>예금주</span><strong>${n.vendor_account_holder||"-"}</strong></div>
                <div><span>견적 총액</span><strong>${m(n.estimate_total||n.amount)}</strong></div>
                <div><span>결제 방식</span><strong>${n.payment_type||"일시 지급"}</strong></div>
                <div><span>이번 신청액</span><strong>${m(n.amount)}</strong></div>
                <div><span>지급 유형</span><strong>${n.tax_type||"일반 송금"}</strong></div>
                <div><span>원천징수</span><strong>${m(n.withholding_amount||0)}</strong></div>
                <div><span>실지급액</span><strong>${m(n.net_amount||n.amount)}</strong></div>
                <div><span>첨부 자료</span><strong>${Zt(n)}</strong></div>
                <div><span>견적서 반영</span><strong>${n.estimate_group_mode||"매장별 항목 합산"}</strong></div>
                <div><span>신청일</span><strong>${n.requested_at}</strong></div>
              </div>
              <div class="payment-detail-actions">
                ${n.status==="신청"?`<button data-payment-edit="${n.id}">수정</button>
                       <button data-payment-id="${n.id}" data-payment-status="반려">신청 취소</button>
                       ${t?`<button class="primary" data-payment-id="${n.id}" data-payment-status="승인">승인</button>`:""}`:'<span class="muted">처리 완료</span>'}
              </div>
            </details>`).join("")}
    </div>
  `:'<div class="empty">표시할 결제 신청이 없습니다.</div>'}function Re(e,t=!1){return e.length?e.map(n=>`
      <tr>
        ${t?`<td><input type="checkbox" class="transfer-select" value="${n.payment.id}" ${n.ready?"":"disabled"} aria-label="${g(n.payment.store)} 이체대상 선택" /></td>`:""}
        <td>${n.payment.requested_at||"-"}</td>
        <td>${n.payment.store}</td>
        <td>${n.payment.vendor}</td>
        <td>${n.payment.payment_item||"-"}</td>
        <td>${n.bank||"-"}</td>
        <td>${n.account||"-"}</td>
        <td>${n.holder||"-"}</td>
        <td class="money">${m(n.amount)}</td>
        <td>${Dt(n.payment.exported_at)||"-"}</td>
        <td>${Dt(n.payment.transferred_at)||"-"}</td>
        <td><span class="badge ${we(n)}">${Se(n)}</span></td>
      </tr>`).join(""):`<tr><td colspan="${t?12:11}">조회된 이체 대상이 없습니다.</td></tr>`}function lt(e,t){return e.storeQuotes.find(n=>n.store_name===t)||{}}function Ht(e,t){return e.constructionStarts.find(n=>n.store_name===t)||{}}function H(e,t){const n=Ut.find(o=>{const a=o.group===e,r=t.every(s=>o.name.includes(s));return a&&r});return n?ee(n):0}function Fe(e,t){return e.payments.filter(n=>{const o=n.store===t,a=n.status==="승인",r=String(n.payment_item||""),s=r.includes("진열장")||r.includes("벽장")||r.includes("카운터");return o&&a&&!s}).reduce((n,o)=>n+Number(o.amount||0),0)}function vt(e,t){const n=Ht(e,t),o=y(n.wall_upper_count??n.wall_cabinet_count),a=y(n.wall_lower_count),r=y(n.display_fixture_count??n.fixture_count),s=y(n.counter_drawer_1200_count??n.counter_count),i=y(n.counter_shelf_1800_count),l=y(n.counter_shelf_1600_count),p=y(n.table_count);return o*H("벽장",["상부장"])+a*H("벽장",["하부장"])+r*H("진열장",["유리장"])+s*H("카운터",["서랍형","1200"])+i*H("카운터",["선반형","1800"])+l*H("카운터",["선반형","1600"])+p*H("테이블",["600*1200"])}function Qt(e){const t=[...e.stores.map(n=>n.name),...e.constructionStarts.map(n=>n.store_name),...e.payments.map(n=>n.store)];return[...new Set(t.map(n=>String(n||"").trim()).filter(Boolean))]}function Jt(e,t){return e.stores.find(n=>n.name===t)||{}}function Wt(e,t){const n=Jt(e,t);return n.status==="완료"&&!n.document_required}function Ne(e,t){const n=lt(e,t),o=Jt(e,t);return n.quote_status==="계약 완료"||o.status==="완료"&&!!o.document_required}function it(e,t="진행중"){return Qt(e).filter(n=>{if(Wt(e,n))return!1;const o=Ne(e,n);return t==="완료"?o:!o})}function Yt(e){return Qt(e).filter(t=>!Wt(e,t))}function bt(e,t,n){const o=Fe(e,t),a=vt(e,t),r=o+a,s=Math.round(r*(1+y(n)/100)),i=Math.round(s*.1),l=s+i;return{directCost:o,fixtureCost:a,costTotal:r,supplyAmount:s,vatAmount:i,totalAmount:l}}function Ue(e,t,n){const o=new Map;e.payments.filter(r=>{const s=r.store===t,i=r.status==="승인",l=String(r.payment_item||""),p=l.includes("진열장")||l.includes("벽장")||l.includes("카운터");return s&&i&&!p}).forEach(r=>{const s=r.payment_item||"기타 공사";o.set(s,(o.get(s)||0)+Number(r.amount||0))});const a=vt(e,t);return a>0&&o.set("진열장 원가 배분",(o.get("진열장 원가 배분")||0)+a),[...o.entries()].map(([r,s])=>{const i=Math.round(s*(1+y(n)/100)),l=Math.round(i*.1);return{name:r,cost:s,supply:i,vat:l,total:i+l}})}function Me(e,t="진행중"){return it(e,t).map(n=>{const o=lt(e,n),a=o.margin_rate??35,r=bt(e,n,a),s=o.quote_status||"정산중";return`
      <tr>
        <td>${n}</td>
        <td><span class="badge ${et(s)}">${s}</span></td>
        <td class="money">${m(r.directCost)}</td>
        <td class="money">${m(r.fixtureCost)}</td>
        <td class="money">${m(r.costTotal)}</td>
        <td><input class="inline-input" data-margin-rate="${g(n)}" inputmode="decimal" value="${a}" /></td>
        <td class="money">${m(r.supplyAmount)}</td>
        <td class="money">${m(r.vatAmount)}</td>
        <td class="money">${m(r.totalAmount)}</td>
        <td>
          <div class="row-actions">
            <button data-quote-finalize="${g(n)}">견적 확정</button>
            <button data-contract-complete="${g(n)}">완료/문서 생성</button>
            <button data-document-view="견적서 생성" data-document-store="${g(n)}">견적서</button>
            <button data-document-view="계약서 생성" data-document-store="${g(n)}">계약서</button>
          </div>
        </td>
      </tr>`})}function ze(e){return e.stores.map(t=>`
      <tr>
        <td>${t.region||"-"}</td>
        <td>${t.name}</td>
        <td>${t.fixture_count||0}</td>
        <td>${t.area}평</td>
        <td class="money">${m(t.budget)}</td>
        <td><span class="badge ${et(t.status)}">${t.status}</span></td>
        <td><span class="badge ${t.document_required?"blue":"gray"}">${t.document_required?"생성 대상":"출력 완료"}</span></td>
      </tr>`)}function Lt(e,t=""){const n=Array.isArray(e)?e:[];return n.length?n.map(o=>o.url?`<a href="${g(o.url)}" target="_blank" rel="noreferrer">${g(o.name||"파일")}</a>`:`<span>${g(o.name||"파일")}</span>`).join("<br />"):t||"-"}function Zt(e){const t=e.attachment_files||{},n=(t.estimate_files||[]).length,o=(t.tax_invoice_files||[]).length,a=(t.id_card_files||[]).length;return e.tax_type==="사업소득 3.3%"?a?`주민등록증 ${a}개`:"주민등록증 필요":`견적서 ${n}개 / 세금계산서 ${o}개`}function Oe(e){const t=Number(e||0);return t?t>=1024*1024?`${(t/1024/1024).toFixed(1)}MB`:t>=1024?`${Math.round(t/1024)}KB`:`${t}B`:"-"}function Be(e){const t=[],n=(o,a,r,s,i="")=>{(Array.isArray(s)?s:[]).forEach(l=>{t.push({source:o,owner:a,category:r,name:l.name||"파일",size:Oe(l.size),date:i,url:l.url||""})})};return e.payments.forEach(o=>{const a=o.attachment_files||{},r=`${o.store||"-"} / ${o.vendor||"-"}`,s=o.requested_at||"";n("결제 신청",r,"견적서",a.estimate_files,s),n("결제 신청",r,"세금계산서",a.tax_invoice_files,s),n("결제 신청",r,"주민등록증",a.id_card_files,s)}),e.vendors.forEach(o=>{const a=o.attachment_files||{};n("업체 계좌",o.name||"-","사업자등록증",a.business_license_files),n("업체 계좌",o.name||"-","통장사본",a.bankbook_files)}),e.constructionStarts.forEach(o=>{const a=String(o.created_at||"").slice(0,10);n("공사 시작",o.store_name||"-","도면",o.drawing_files,a),n("공사 시작",o.store_name||"-","기초 사진",o.base_photo_files,a)}),t.length?t.map(o=>`
      <tr>
        <td>${o.source}</td>
        <td>${g(o.owner)}</td>
        <td>${o.category}</td>
        <td>${o.url?`<a href="${g(o.url)}" target="_blank" rel="noreferrer">${g(o.name)}</a>`:g(o.name)}</td>
        <td>${o.size}</td>
        <td>${o.date||"-"}</td>
        <td>${o.url?`<a class="file-open-link" href="${g(o.url)}" target="_blank" rel="noreferrer">열기</a>`:"-"}</td>
      </tr>`):['<tr><td colspan="7">아직 업로드된 첨부 파일이 없습니다.</td></tr>']}function Ve(e){return e.constructionStarts.map(t=>`
      <tr>
        <td>${t.store_name}</td>
        <td>${t.area}평</td>
        <td>${t.wall_upper_count??t.wall_cabinet_count??0}</td>
        <td>${t.wall_lower_count??0}</td>
        <td>${t.display_fixture_count??t.fixture_count??0}</td>
        <td>${t.counter_drawer_1200_count??t.counter_count??0}</td>
        <td>${t.counter_shelf_1800_count??0}</td>
        <td>${t.counter_shelf_1600_count??0}</td>
        <td>${t.table_count||0}</td>
        <td>${t.sign_count||0}</td>
        <td>${Lt(t.drawing_files,t.drawing_note)}</td>
        <td>${Lt(t.base_photo_files,t.base_photo_note)}</td>
        <td>${t.special_notes||"-"}</td>
      </tr>`)}function Gt(e){return e.vendors.map(t=>{const n=t.attachment_files||{},o=(n.business_license_files||[]).length,a=(n.bankbook_files||[]).length;return`
        <tr>
          <td>${t.name}</td>
          <td>${t.category}</td>
          <td>${t.bank}</td>
          <td>${t.account_number||"-"}</td>
          <td>${t.account_holder||"-"}</td>
          <td>사업자 ${o}개 / 통장 ${a}개</td>
          <td><span class="badge ${et(t.risk)}">${t.risk}</span></td>
          <td><button data-vendor-edit="${t.id}">수정</button></td>
        </tr>`})}function Pe(e){return e.vendors.map(t=>`<option value="${g(t.name)}">${g(t.name)} / ${g(t.bank)} ${g(t.account_number||"")}</option>`).join("")}function je(e){const n=[...e.constructionStarts.map(a=>({name:a.store_name,area:a.area,status:"공사 시작 접수"})),...e.stores],o=new Set;return n.filter(a=>{const r=String(a.name||"").trim();return!r||o.has(r)?!1:(o.add(r),!0)}).map(a=>`<option value="${g(a.name)}">${g(a.name)} / ${g(a.area)}평 / ${g(a.status)}</option>`).join("")}function Ke(e){return e.paymentItems.map(t=>`<option value="${g(t)}">${g(t)}</option>`).join("")}function O(e,t){return e===t?"selected":""}function te(){const e=q.payments.find(o=>o.id===V&&o.status==="신청"),t=!!e,n=(o,a="")=>g((e==null?void 0:e[o])??a);return`
    <article class="panel form-panel">
      <div class="panel-head">
        <h2>${t?"결제 신청 수정":"결제 신청 입력"}</h2>
        ${t?"<button data-payment-edit-cancel>수정 취소</button>":""}
      </div>
      <div class="notice">${t?"승인 전 신청 건만 수정할 수 있습니다. 기존 첨부파일은 유지되고 새 파일을 추가할 수 있습니다.":"등록된 업체를 선택하면 계좌 정보와 결제 신청이 같은 기준으로 연결됩니다."}</div>
      <form id="payment-form">
        <input type="hidden" name="payment_id" value="${t?e.id:""}" />
        <label>매장
          <input name="store" list="store-suggestions" value="${n("store")}" placeholder="직접입력 또는 매장명 검색" autocomplete="off" />
          <datalist id="store-suggestions">
            <option value="직접입력">직접입력</option>
            ${je(q)}
          </datalist>
        </label>
        <label>협력업체
          <input name="vendor" list="vendor-suggestions" value="${n("vendor")}" placeholder="직접입력 또는 업체명 검색" autocomplete="off" />
          <datalist id="vendor-suggestions">
            <option value="직접입력">직접입력</option>
            ${Pe(q)}
          </datalist>
        </label>
        <label>입금은행<input name="vendor_bank" value="${n("vendor_bank")}" placeholder="업체 선택 시 자동 입력, 변경 가능" autocomplete="off" /></label>
        <label>입금계좌<input name="vendor_account_number" value="${n("vendor_account_number")}" placeholder="예: 110-000-000000" autocomplete="off" /></label>
        <label>예금주<input name="vendor_account_holder" value="${n("vendor_account_holder")}" placeholder="예: 도원인테리어" autocomplete="off" /></label>
        <label>결제 항목
          <input name="payment_item" list="payment-item-suggestions" value="${n("payment_item")}" placeholder="직접입력 또는 공사항목 검색" autocomplete="off" />
          <datalist id="payment-item-suggestions">
            <option value="직접입력">직접입력</option>
            ${Ke(q)}
          </datalist>
        </label>
        <label>견적 총액, 부가세 포함<input name="estimate_total" value="${n("estimate_total")}" inputmode="numeric" placeholder="예: 10000000" autocomplete="off" /></label>
        <label>결제 방식
          <select name="payment_type">
            <option value="일시 지급" ${O("일시 지급",(e==null?void 0:e.payment_type)||"일시 지급")}>일시 지급</option>
            <option value="선금 50%" ${O("선금 50%",e==null?void 0:e.payment_type)}>선금 50%</option>
            <option value="잔금 50%" ${O("잔금 50%",e==null?void 0:e.payment_type)}>잔금 50%</option>
            <option value="직접 입력" ${O("직접 입력",e==null?void 0:e.payment_type)}>직접 입력</option>
          </select>
        </label>
        <label>이번 신청 금액<input name="amount" value="${n("amount")}" inputmode="numeric" placeholder="예: 5000000" autocomplete="off" /></label>
        <label>지급 유형
          <select name="tax_type">
            <option value="일반 송금" ${O("일반 송금",(e==null?void 0:e.tax_type)||"일반 송금")}>일반 송금</option>
            <option value="사업소득 3.3%" ${O("사업소득 3.3%",e==null?void 0:e.tax_type)}>사업소득 3.3%</option>
          </select>
        </label>
        <div class="calc-box">
          <span>원천징수액 <strong data-withholding-preview>0원</strong></span>
          <span>실지급액 <strong data-net-preview>0원</strong></span>
        </div>
        <label>견적서 첨부<input name="estimate_files" type="file" accept="image/*,application/pdf" multiple /></label>
        <label>세금계산서 첨부<input name="tax_invoice_files" type="file" accept="image/*,application/pdf" multiple /></label>
        <label>주민등록증 첨부<input name="id_card_files" type="file" accept="image/*,application/pdf" multiple /></label>
        <label>메모<input name="memo" value="${n("memo")}" placeholder="예: 진열장 선금, 잔금, 추가 요청사항" autocomplete="off" /></label>
        <p class="form-message" data-form-message></p>
        <button class="primary wide" type="submit">${t?"수정 저장":"검토 요청 생성"}</button>
      </form>
    </article>
  `}function Xe(){return`
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
  `}function He(){return`
    <article class="panel form-panel">
      <div class="panel-head">
        <h2>공사 시작 정보 입력</h2>
      </div>
      <div class="notice">직영매장 공사 시작 전에 필요한 도면, 수량, 사진, 특이사항을 먼저 접수합니다.</div>
      <form id="construction-start-form">
        <label>매장명<input name="store_name" placeholder="예: 강남압구정 직영점" autocomplete="off" /></label>
        <label>평수<input name="area" inputmode="numeric" placeholder="예: 45" autocomplete="off" /></label>
        <label>도면 파일<input name="drawing_files" type="file" accept="image/*,application/pdf,.pdf,.heic,.heif,.dwg,.dxf" multiple /></label>
        <label>벽장 / 상부장<input name="wall_upper_count" inputmode="numeric" placeholder="예: 4" autocomplete="off" /></label>
        <label>벽장 / 하부장<input name="wall_lower_count" inputmode="numeric" placeholder="예: 4" autocomplete="off" /></label>
        <label>진열장 / 유리장<input name="display_fixture_count" inputmode="numeric" placeholder="예: 8" autocomplete="off" /></label>
        <label>카운터 / 서랍형 1200<input name="counter_drawer_1200_count" inputmode="numeric" placeholder="예: 1" autocomplete="off" /></label>
        <label>카운터 / 선반형 1800<input name="counter_shelf_1800_count" inputmode="numeric" placeholder="예: 1" autocomplete="off" /></label>
        <label>카운터 / 선반형 1600<input name="counter_shelf_1600_count" inputmode="numeric" placeholder="예: 1" autocomplete="off" /></label>
        <label>테이블 / 600*1200<input name="table_count" inputmode="numeric" placeholder="예: 3" autocomplete="off" /></label>
        <label>광고판 갯수<input name="sign_count" inputmode="numeric" placeholder="예: 2" autocomplete="off" /></label>
        <label>매장 기초 사진<input name="base_photo_files" type="file" accept="image/*,application/pdf,.pdf,.heic,.heif" multiple /></label>
        <label>특이사항<textarea name="special_notes" placeholder="현장 특이사항, 요청사항, 주의할 점"></textarea></label>
        <p class="form-message" data-construction-start-message></p>
        <button class="primary wide" type="submit">공사 시작 정보 저장</button>
      </form>
    </article>
  `}function Qe(e){return`
    <section class="kpis">
      ${Le(e).map(([t,n,o])=>`
            <article class="kpi">
              <span>${t}</span>
              <strong>${n}</strong>
              <small>${o}</small>
            </article>`).join("")}
    </section>

    <section class="grid two">
      <article class="panel">
        <div class="panel-head">
          <h2>최근 결제 신청</h2>
          <button data-view-link="결제 신청">전체 보기</button>
        </div>
        ${T(["매장","업체","입금은행","입금계좌","예금주","항목","견적 총액","결제 방식","이번 신청액","지급 유형","원천징수","실지급액","첨부 자료","견적서 반영","상태","신청일"],Ie(e))}
      </article>

      <article class="panel">
        <div class="panel-head">
          <h2>매장 공사 현황</h2>
          <button data-view-link="매장별 공사 관리">관리</button>
        </div>
        ${T(["지역","매장","진열장","평수","공사비 합계","상태","문서"],ze(e))}
      </article>
    </section>

    <section class="grid lower">
      <article class="panel">
        <div class="panel-head">
          <h2>주요 협력업체</h2>
          <button data-view-link="결제 계좌 관리">계좌 추가</button>
        </div>
        ${T(["업체","분류","은행","계좌번호","예금주","첨부","상태","수정"],Gt(e))}
      </article>
      ${te()}
    </section>
  `}function Je(e){const t=B().includes("은행 이체 파일 생성"),n=Ce(e),o=n.payments.filter(r=>r.status==="신청").length,a=I.startDate||I.endDate?`${I.startDate||"처음"} ~ ${I.endDate||"오늘"}`:"전체 기간";return`
    <section class="grid">
      <article class="panel">
        <div class="panel-head">
          <h2>결제 신청 조회</h2>
          <div class="row-actions">
            <button>조회 ${n.payments.length}건</button>
            <button>승인 대기 ${o}건</button>
          </div>
        </div>
        <div class="date-filter">
          <label>시작일<input type="date" data-payment-start value="${g(I.startDate)}" /></label>
          <label>종료일<input type="date" data-payment-end value="${g(I.endDate)}" /></label>
          <button class="primary" data-payment-filter>조회</button>
          <button data-payment-clear>전체</button>
        </div>
        <div class="notice">조회기간: ${a}</div>
      </article>
    </section>
    <section class="grid two">
      ${te()}
      <article class="panel">
        <div class="panel-head">
          <h2>결제 신청 검토</h2>
          <div class="row-actions">
            ${t?'<button data-view-link="은행 이체 파일 생성">은행 이체 전표</button>':""}
          </div>
        </div>
        ${t?`<div class="bulk-actions">
                <label class="check-control">
                  <input type="checkbox" data-select-pending-payments />
                  승인대기 전체 선택
                </label>
                <button class="primary" data-approve-selected-payments>선택 승인</button>
                <button data-view-link="은행 이체 파일 생성">은행 이체 전표로 이동</button>
              </div>`:""}
        ${Te(n,t)}
      </article>
    </section>
  `}function We(e){const t=mt(e),n=mt(e,E),o=Kt(e).filter(p=>gt(p)).length,a=n.filter(p=>p.ready).length,r=n.length-a,s=n.filter(p=>ct(p.payment)==="파일생성").length,i=n.filter(p=>p.ready).reduce((p,d)=>p+d.amount,0),l=E.startDate||E.endDate?`${E.startDate||"처음"} ~ ${E.endDate||"오늘"}`:"전체 기간";return`
    <section class="transfer-workspace">
      <article class="panel transfer-panel">
        <div class="transfer-title-row">
          <div>
            <h2>이체자료조회</h2>
          </div>
          <div class="transfer-stepper" aria-label="이체 처리 단계">
            <span>STEP1 승인검토</span>
            <span class="active">STEP2 이체자료조회</span>
            <span>STEP3 이체파일생성</span>
            <span>STEP4 송금완료확인</span>
          </div>
        </div>

        <div class="transfer-filter-bar">
          <label>시작일<input type="date" data-transfer-start value="${g(E.startDate)}" /></label>
          <label>종료일<input type="date" data-transfer-end value="${g(E.endDate)}" /></label>
          <label>검색어<input data-transfer-keyword value="${g(E.keyword)}" placeholder="매장, 업체, 항목, 계좌" autocomplete="off" /></label>
          <label>계좌상태
            <select data-transfer-ready-status>
              <option value="all" ${O("all",E.readyStatus)}>전체</option>
              <option value="ready" ${O("ready",E.readyStatus)}>계좌확인</option>
              <option value="missing" ${O("missing",E.readyStatus)}>확인필요</option>
            </select>
          </label>
          <button class="primary" data-transfer-filter>조회</button>
          <button data-transfer-clear>전체</button>
        </div>

        <div class="transfer-status-strip">
          <div><span>조회기간</span><strong>${l}</strong></div>
          <div><span>미송금 승인</span><strong>${t.length}건</strong></div>
          <div><span>조회 결과</span><strong>${n.length}건</strong></div>
          <div><span>계좌 확인</span><strong>${a}건</strong></div>
          <div><span>확인 필요</span><strong>${r}건</strong></div>
          <div><span>파일 생성</span><strong>${s}건</strong></div>
          <div><span>송금완료 제외</span><strong>${o}건</strong></div>
        </div>

        <div class="bulk-actions transfer-actions-row">
          <label class="check-control">
            <input type="checkbox" data-select-transfer-payments />
            조회 결과 전체 선택
          </label>
          <button class="primary" data-bank-transfer-download>선택 이체 파일 다운로드</button>
          <button data-bank-transfer-download="range">조회 결과 전체 다운로드</button>
          <button data-transfer-complete-selected>선택 송금완료 처리</button>
        </div>

        <div class="table-wrap transfer-table-wrap">
          <table class="transfer-table">
            <thead>
              <tr>
                <th>선택</th>
                <th>신청일</th>
                <th>매장</th>
                <th>업체</th>
                <th>항목</th>
                <th>은행</th>
                <th>계좌번호</th>
                <th>예금주</th>
                <th>입금액</th>
                <th>파일생성일</th>
                <th>송금일</th>
                <th>상태</th>
              </tr>
            </thead>
            <tbody>${Re(n,!0)}</tbody>
            <tfoot>
              <tr>
                <td colspan="8">합계</td>
                <td class="money">${m(i)}</td>
                <td colspan="3">${a}건 가능</td>
              </tr>
            </tfoot>
          </table>
        </div>
      </article>
    </section>
  `}function Ye(e){const t=e.payments.reduce((a,r)=>{const s=r.attachment_files||{};return a+(s.estimate_files||[]).length+(s.tax_invoice_files||[]).length+(s.id_card_files||[]).length},0),n=e.vendors.reduce((a,r)=>{const s=r.attachment_files||{};return a+(s.business_license_files||[]).length+(s.bankbook_files||[]).length},0),o=e.constructionStarts.reduce((a,r)=>a+(r.drawing_files||[]).length+(r.base_photo_files||[]).length,0);return`
    <section class="grid">
      <article class="panel">
        <div class="panel-head">
          <h2>첨부 파일 보기</h2>
          <div class="row-actions">
            <button>결제 ${t}개</button>
            <button>업체 ${n}개</button>
            <button>공사 ${o}개</button>
          </div>
        </div>
        <div class="notice">결제 신청 증빙, 업체 계좌 서류, 공사 시작 도면/기초사진을 한 화면에서 확인합니다. 파일명을 누르면 새 창으로 열립니다.</div>
        ${T(["구분","대상","파일 종류","파일명","크기","등록일","보기"],Be(e))}
      </article>
    </section>
  `}function Ze(e){return`
    <section class="grid two">
      ${He()}
      <article class="panel">
        <div class="panel-head">
          <h2>공사 시작 접수 목록</h2>
          <button>${e.constructionStarts.length}건 접수</button>
        </div>
        ${T(["매장","평수","벽장/상부장","벽장/하부장","진열장/유리장","카운터/서랍형 1200","카운터/선반형 1800","카운터/선반형 1600","테이블","광고판","도면","기초 사진","특이사항"],Ve(e))}
      </article>
    </section>
  `}function ee(e){return e.quantity&&e.madeAmount?Math.round(e.madeAmount/e.quantity):e.allocationUnit||e.baseUnit||0}function Ge(){return Ut.map(e=>`
      <tr>
        <td>${e.group}</td>
        <td>${e.name}</td>
        <td class="money">${m(e.baseUnit)}</td>
        <td class="money">${m(e.allocationUnit)}</td>
        <td>${e.quantity||"-"}</td>
        <td class="money">${m(e.madeAmount)}</td>
        <td class="money">${m(ee(e))}</td>
      </tr>`)}function tn(e){return e.constructionStarts.map(t=>{const n=y(t.wall_upper_count??t.wall_cabinet_count),o=y(t.wall_lower_count),a=y(t.display_fixture_count??t.fixture_count),r=y(t.counter_drawer_1200_count??t.counter_count),s=y(t.counter_shelf_1800_count),i=y(t.counter_shelf_1600_count),l=y(t.table_count),p=vt(e,t.store_name);return`
      <tr>
        <td>${t.store_name}</td>
        <td>${n}</td>
        <td>${o}</td>
        <td>${a}</td>
        <td>${r}</td>
        <td>${s}</td>
        <td>${i}</td>
        <td>${l}</td>
        <td class="money">${m(p)}</td>
      </tr>`})}function en(e){return`
    <section class="grid two">
      <article class="panel">
        <div class="panel-head">
          <h2>진열장 원가 기준</h2>
          <button>엑셀 반영</button>
        </div>
        <div class="notice">아름가구 산출금액과 휴가기간 가구 산출금액을 기준으로 먼저 원가 기준표를 만들었습니다. 실제 견적서에는 공사 시작 접수의 벽장/진열장/카운터 수량을 곱해 반영합니다.</div>
        ${T(["구분","항목","아름가구 기준","휴가기간 단가","제작수량","제작금액","평균 단가"],Ge())}
      </article>
      <article class="panel">
        <div class="panel-head">
          <h2>매장별 예상 배분</h2>
          <button>${e.constructionStarts.length}개 매장</button>
        </div>
        ${T(["매장","벽장/상부장","벽장/하부장","진열장/유리장","카운터/서랍형 1200","카운터/선반형 1800","카운터/선반형 1600","테이블","예상 반영 금액"],tn(e))}
      </article>
    </section>
  `}function nn(e){return`
    <section class="grid two">
      ${Xe()}
      <article class="panel">
        <div class="panel-head">
          <h2>결제 계좌 목록</h2>
          <button>${e.vendors.length}개 등록</button>
        </div>
        ${T(["업체","분류","은행","계좌번호","예금주","첨부","상태","수정"],Gt(e))}
      </article>
    </section>
  `}function an(e){const t=it(e,G),n=it(e,"진행중").length,o=it(e,"완료").length;return`
    <section class="grid">
      <article class="panel">
        <div class="panel-head">
          <h2>매장별 정산 및 문서 마감</h2>
          <button>${t.length}개 매장</button>
        </div>
        <div class="segmented-tabs">
          <button class="${G==="진행중"?"active":""}" data-store-management-filter="진행중">진행중 ${n}건</button>
          <button class="${G==="완료"?"active":""}" data-store-management-filter="완료">완료 매장 ${o}건</button>
        </div>
        <div class="notice">승인된 결제건과 진열장 원가 배분 금액을 합산한 뒤, 매장별 마진율을 적용해 최종 견적금액을 확정합니다. 확정 금액은 견적서와 계약서 작성 기준으로 사용합니다.</div>
        ${T(["매장","상태","승인 원가","진열장 배분","원가 합계","마진율(%)","공급가","부가세","최종 견적금액","처리"],Me(e,G))}
      </article>
    </section>
  `}function on(e){return Yt(e).map(t=>`<option value="${g(t)}" ${t===J?"selected":""}>${g(t)}</option>`).join("")}function rn(e){return e.map((t,n)=>`
      <tr>
        <td>${n+1}</td>
        <td>${t.name}</td>
        <td class="money">${m(t.cost)}</td>
        <td class="money">${m(t.supply)}</td>
        <td class="money">${m(t.vat)}</td>
        <td class="money">${m(t.total)}</td>
      </tr>`)}function It(e,t){const n=Yt(e),o=J||n[0]||"";J=o;const a=lt(e,o),r=a.margin_rate??35,s=bt(e,o,r),i=Ue(e,o,r),l=Ht(e,o),p=t==="계약서 생성";return o?`
    <section class="grid">
      <article class="panel">
        <div class="panel-head">
          <h2>${t}</h2>
          <div class="row-actions">
            <select data-document-store-select>${on(e)}</select>
            <button data-print-document>인쇄</button>
          </div>
        </div>
        <div class="notice">매장별 공사관리에서 저장한 마진율과 승인 완료된 결제 원가를 기준으로 작성됩니다.</div>
        <section class="document-preview">
          <div class="document-title">
            <span>HAKA Construction</span>
            <h1>${p?"공사 계약서":"공사 견적서"}</h1>
            <p>${ft()}</p>
          </div>
          <div class="document-meta">
            <div><span>매장명</span><strong>${o}</strong></div>
            <div><span>평수</span><strong>${l.area?`${l.area}평`:"-"}</strong></div>
            <div><span>상태</span><strong>${a.quote_status||"정산중"}</strong></div>
            <div><span>마진율</span><strong>${r}%</strong></div>
          </div>
          ${p?`<div class="contract-body">
                  <p>본 계약은 ${o} 공사와 관련하여 승인된 결제 원가와 진열장 원가 배분 내역을 기준으로 산정한 최종 공사금액을 계약 기준으로 한다.</p>
                  <p>최종 계약금액은 부가세 포함 ${m(s.totalAmount)}이며, 세부 산출 내역은 아래 견적 기준표를 따른다.</p>
                </div>`:""}
          ${T(["No","항목","원가","마진 반영 공급가","부가세","합계"],rn(i))}
          <div class="document-total">
            <span>원가 합계 ${m(s.costTotal)}</span>
            <span>공급가 ${m(s.supplyAmount)}</span>
            <span>부가세 ${m(s.vatAmount)}</span>
            <strong>최종 금액 ${m(s.totalAmount)}</strong>
          </div>
          <div class="signature-grid">
            <div><span>발주자</span><strong>하카코리아</strong></div>
            <div><span>시공/관리</span><strong>HAKA Construction</strong></div>
          </div>
        </section>
      </article>
    </section>
  `:`<section class="panel empty-panel"><h2>${t}</h2><p>문서를 만들 매장 데이터가 아직 없습니다.</p></section>`}function sn(e){return e.userRoles.map(t=>`
      <tr>
        <td>${t.email}</td>
        <td><span class="badge ${t.role==="admin"?"green":"blue"}">${zt[t.role]||t.role}</span></td>
        <td>${t.created_at?String(t.created_at).slice(0,10):"-"}</td>
      </tr>`)}function cn(){return Object.entries(pt).map(([e,t])=>`
      <tr>
        <td><strong>${e}</strong></td>
        <td>${t.map(n=>`<span class="menu-chip">${n}</span>`).join("")}</td>
        <td>${t.length}개</td>
      </tr>`)}function ln(e){return`
    <section class="grid two">
      <article class="panel">
        <div class="panel-head">
          <h2>사용자 권한</h2>
          <button>${e.userRoles.length}명 등록</button>
        </div>
        ${T(["이메일","권한","등록일"],sn(e))}
      </article>
      <article class="panel">
        <div class="panel-head">
          <h2>권한별 메뉴</h2>
          <button>${Object.keys(pt).length}개 권한</button>
        </div>
        ${T(["권한","볼 수 있는 메뉴","메뉴 수"],cn())}
      </article>
    </section>
  `}function un(e){const t=re[e]||["기능 범위 정의","입력 항목 확정","데이터 연결"];return`
    <section class="panel empty-panel">
      <h2>${e}</h2>
      <p>이 메뉴는 다음 단계에서 구현할 기능입니다. 지금은 확인해야 할 항목을 먼저 고정해둔 상태입니다.</p>
      <div class="check-list">
        ${t.map(n=>`<span>${n}</span>`).join("")}
      </div>
    </section>
  `}function dn(e){return f==="대시보드"?Qe(e):f==="공사 시작 접수"?Ze(e):f==="결제 신청"?Je(e):f==="결제 계좌 관리"||f==="업체/계좌 관리"?nn(e):f==="첨부 파일 보기"?Ye(e):f==="매장별 공사 관리"?an(e):f==="진열장 원가 배분"?en(e):f==="견적서 생성"?It(e,"견적서 생성"):f==="계약서 생성"?It(e,"계약서 생성"):f==="은행 이체 파일 생성"?We(e):f==="관리자 설정"?ln(e):un(f)}function B(){return pt[P]||Mt}function ht(){B().includes(f)||(f=B()[0]),ie(f)}function mn(){return`
    <div class="session-box">
      <span>${(w==null?void 0:w.email)||""}</span>
      <strong>${P}</strong>
      <button data-sign-out>로그아웃</button>
    </div>
  `}function F(e=""){const t=document.querySelector("#app");t.className="auth-shell",t.innerHTML=`
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
  `,document.querySelector("#auth-form").addEventListener("submit",pn),document.querySelector("[data-auth-action='signup']").addEventListener("click",fn),document.querySelector("[data-auth-action='resend']").addEventListener("click",_n)}async function pn(e){e.preventDefault();const t=new FormData(e.currentTarget),n=String(t.get("email")||"").trim(),o=String(t.get("password")||"");if(!n||!o){F("이메일과 비밀번호를 입력해 주세요.");return}const{data:a,error:r}=await u.auth.signInWithPassword({email:n,password:o});if(r){F(`로그인 실패: ${r.message}`);return}w=a.user,P=await Pt(w),ht(),await C()}async function fn(){const e=document.querySelector("#auth-form"),t=new FormData(e),n=String(t.get("email")||"").trim(),o=String(t.get("password")||"");if(!n||!o){F("계정을 만들 이메일과 비밀번호를 입력해 주세요.");return}const{error:a}=await u.auth.signUp({email:n,password:o,options:{emailRedirectTo:window.location.origin+window.location.pathname}});if(a){F(`회원가입 실패: ${a.message}`);return}F("계정이 생성됐습니다. 이메일 확인이 필요한 경우 메일 인증 후 로그인해 주세요.")}async function _n(){const e=document.querySelector("#auth-form"),t=new FormData(e),n=String(t.get("email")||"").trim();if(!n){F("인증메일을 다시 받을 이메일을 입력해 주세요.");return}const{error:o}=await u.auth.resend({type:"signup",email:n,options:{emailRedirectTo:window.location.origin+window.location.pathname}});if(o){F(`인증메일 재발송 실패: ${o.message}`);return}F("인증메일을 다시 보냈습니다. 새로 받은 메일의 링크를 눌러 주세요.")}async function gn(){await u.auth.signOut(),w=null,P="인테리어 공사실장",F("로그아웃되었습니다.")}function h(e=""){var s,i,l,p,d,_,R,$,x,N,k,U,M,Y,nt,j,z,K;const t=document.querySelector("#app");t.className=f==="은행 이체 파일 생성"?"transfer-app":"",ht(),t.innerHTML=`
    <aside class="sidebar">
      <div class="brand">
        <span class="brand-mark">H</span>
        <div>
          <strong>HAKA Construction</strong>
          <small>공사비 관리 시스템</small>
        </div>
      </div>
      <nav>
        ${B().map(c=>`<button data-view="${c}" class="${c===f?"active":""}">${c}</button>`).join("")}
      </nav>
    </aside>
    <main class="shell ${f==="은행 이체 파일 생성"?"transfer-shell":""}">
      <header class="topbar">
        <div>
          <p>${P}</p>
          <h1>${f}</h1>
        </div>
        <div class="actions">
          ${mn()}
          ${B().includes("엑셀 업로드")?'<button data-view-link="엑셀 업로드">엑셀 업로드</button>':""}
          ${B().includes("결제 신청")?'<button class="primary" data-view-link="결제 신청">결제 신청</button>':""}
        </div>
      </header>

      ${e?`<div class="toast">${e}</div>`:""}
      ${tt.length?`<div class="data-alert">
              <strong>일부 데이터 확인 필요</strong>
              <span>${tt.map(c=>g(c)).join(" / ")}</span>
            </div>`:""}
      ${dn(q)}
    </main>
  `,document.querySelectorAll("[data-view]").forEach(c=>{c.addEventListener("click",()=>{f=c.dataset.view,h()})}),document.querySelectorAll("[data-role]").forEach(c=>{c.addEventListener("click",()=>{P=c.dataset.role,B().includes(f)||(f=B()[0]),h()})}),(s=document.querySelector("[data-sign-out]"))==null||s.addEventListener("click",gn),document.querySelectorAll("[data-view-link]").forEach(c=>{c.addEventListener("click",()=>{B().includes(c.dataset.viewLink)&&(f=c.dataset.viewLink),h()})});const n=document.querySelector("#payment-form");n&&(n.addEventListener("submit",pe),(i=n.querySelector("[name='vendor']"))==null||i.addEventListener("input",()=>Et(n)),(l=n.querySelector("[name='vendor']"))==null||l.addEventListener("change",()=>Et(n)),(p=n.querySelector("[name='estimate_total']"))==null||p.addEventListener("input",()=>At(n)),(d=n.querySelector("[name='payment_type']"))==null||d.addEventListener("change",()=>At(n)),(_=n.querySelector("[name='amount']"))==null||_.addEventListener("input",()=>st(n)),(R=n.querySelector("[name='tax_type']"))==null||R.addEventListener("change",()=>st(n)),st(n));const o=document.querySelector("#vendor-form");o&&o.addEventListener("submit",fe),document.querySelectorAll("[data-vendor-edit]").forEach(c=>{c.addEventListener("click",()=>Ee(Number(c.dataset.vendorEdit)))});const a=document.querySelector("#store-form");a&&a.addEventListener("submit",_e);const r=document.querySelector("#construction-start-form");r&&r.addEventListener("submit",ge),($=document.querySelector("[data-payment-filter]"))==null||$.addEventListener("click",c=>{var D,L;const v=c.currentTarget.closest(".panel")||document;I={startDate:((D=v.querySelector("[data-payment-start]"))==null?void 0:D.value)||"",endDate:((L=v.querySelector("[data-payment-end]"))==null?void 0:L.value)||""},h()}),(x=document.querySelector("[data-payment-clear]"))==null||x.addEventListener("click",()=>{I={startDate:"",endDate:""},h()}),(N=document.querySelector("[data-transfer-filter]"))==null||N.addEventListener("click",c=>{var D,L,A,X;const v=c.currentTarget.closest(".transfer-panel")||c.currentTarget.closest(".panel")||document;E={startDate:((D=v.querySelector("[data-transfer-start]"))==null?void 0:D.value)||"",endDate:((L=v.querySelector("[data-transfer-end]"))==null?void 0:L.value)||"",keyword:((A=v.querySelector("[data-transfer-keyword]"))==null?void 0:A.value)||"",readyStatus:((X=v.querySelector("[data-transfer-ready-status]"))==null?void 0:X.value)||"all"},h()}),(k=document.querySelector("[data-transfer-clear]"))==null||k.addEventListener("click",()=>{E={startDate:"",endDate:"",keyword:"",readyStatus:"all"},h()}),document.querySelectorAll("[data-bank-transfer-download]").forEach(c=>{c.addEventListener("click",async()=>{var X,at,ot,Z;const v=c.dataset.bankTransferDownload==="range",D=c.closest(".transfer-panel")||c.closest(".panel")||document,L=[...document.querySelectorAll(".transfer-select:checked:not(:disabled)")].map(Q=>Q.value),A={startDate:((X=D.querySelector("[data-transfer-start]"))==null?void 0:X.value)||"",endDate:((at=D.querySelector("[data-transfer-end]"))==null?void 0:at.value)||"",keyword:((ot=D.querySelector("[data-transfer-keyword]"))==null?void 0:ot.value)||"",readyStatus:((Z=D.querySelector("[data-transfer-ready-status]"))==null?void 0:Z.value)||"all"};if(v&&(!A.startDate||!A.endDate)){h("조회 결과 전체 다운로드는 시작일과 종료일을 모두 선택한 뒤 사용할 수 있습니다.");return}if(!v&&!L.length){h("이체 파일로 만들 결제건을 먼저 체크해 주세요. 전체 승인건 자동 다운로드는 막아두었습니다.");return}await Ae(q,{...v?A:{},...!v&&L.length?{selectedIds:L}:{}})})}),(U=document.querySelector("[data-select-pending-payments]"))==null||U.addEventListener("change",c=>{document.querySelectorAll(".payment-select").forEach(v=>{v.checked=c.currentTarget.checked})}),document.querySelectorAll(".payment-select").forEach(c=>{c.addEventListener("click",v=>v.stopPropagation())}),(M=document.querySelector("[data-select-transfer-payments]"))==null||M.addEventListener("change",c=>{document.querySelectorAll(".transfer-select:not(:disabled)").forEach(v=>{v.checked=c.currentTarget.checked})}),document.querySelectorAll(".transfer-select").forEach(c=>{c.addEventListener("click",v=>v.stopPropagation())}),(Y=document.querySelector("[data-transfer-complete-selected]"))==null||Y.addEventListener("click",()=>{const c=[...document.querySelectorAll(".transfer-select:checked:not(:disabled)")].map(v=>v.value);De(c)}),(nt=document.querySelector("[data-approve-selected-payments]"))==null||nt.addEventListener("click",()=>{const c=[...document.querySelectorAll(".payment-select:checked")].map(v=>v.value);be(c)}),document.querySelectorAll("[data-quote-finalize]").forEach(c=>{c.addEventListener("click",()=>xt(c.dataset.quoteFinalize,"견적 확정"))}),document.querySelectorAll("[data-contract-complete]").forEach(c=>{c.addEventListener("click",()=>xt(c.dataset.contractComplete,"계약 완료"))}),document.querySelectorAll("[data-store-management-filter]").forEach(c=>{c.addEventListener("click",()=>{G=c.dataset.storeManagementFilter,h()})}),document.querySelectorAll("[data-document-view][data-document-store]").forEach(c=>{c.addEventListener("click",()=>{J=c.dataset.documentStore,f=c.dataset.documentView,h()})}),(j=document.querySelector("[data-document-store-select]"))==null||j.addEventListener("change",c=>{J=c.currentTarget.value,h()}),(z=document.querySelector("[data-print-document]"))==null||z.addEventListener("click",()=>window.print()),document.querySelectorAll("[data-payment-edit]").forEach(c=>{c.addEventListener("click",()=>{V=Number(c.dataset.paymentEdit),f="결제 신청",h("선택한 결제 신청을 수정 중입니다.")})}),(K=document.querySelector("[data-payment-edit-cancel]"))==null||K.addEventListener("click",()=>{V=null,h("수정 모드를 종료했습니다.")}),document.querySelectorAll("[data-payment-id][data-payment-status]").forEach(c=>{c.addEventListener("click",()=>{const v=c.dataset.paymentStatus;v==="반려"&&!window.confirm("이 결제 신청을 취소 처리할까요? 기록은 반려 상태로 남습니다.")||ve(Number(c.dataset.paymentId),v)})})}jt();
