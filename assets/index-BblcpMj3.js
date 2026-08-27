import{createClient as Gt}from"https://esm.sh/@supabase/supabase-js@2.49.1";(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const o of document.querySelectorAll('link[rel="modulepreload"]'))a(o);new MutationObserver(o=>{for(const r of o)if(r.type==="childList")for(const s of r.addedNodes)s.tagName==="LINK"&&s.rel==="modulepreload"&&a(s)}).observe(document,{childList:!0,subtree:!0});function n(o){const r={};return o.integrity&&(r.integrity=o.integrity),o.referrerPolicy&&(r.referrerPolicy=o.referrerPolicy),o.crossOrigin==="use-credentials"?r.credentials="include":o.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function a(o){if(o.ep)return;o.ep=!0;const r=n(o);fetch(o.href,r)}})();const te={},Rt=te||{},vt=Rt.VITE_SUPABASE_URL||"https://yqemtsbdnypgmkuyncxh.supabase.co",yt=Rt.VITE_SUPABASE_ANON_KEY||"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlxZW10c2JkbnlwZ21rdXluY3hoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODAyNjYwMTUsImV4cCI6MjA5NTg0MjAxNX0.gwgdCncqRKKgC8ebj7qIdT-vA4J-wOVd2O9DSa7xEOs";var It,Tt;const ut=typeof window<"u"&&["localhost","127.0.0.1"].includes(((It=window.location)==null?void 0:It.hostname)||"")&&new URLSearchParams(((Tt=window.location)==null?void 0:Tt.search)||"").has("preview"),m=!ut&&vt&&yt?Gt(vt,yt):null,$t="construction-start-files",wt="payment-files",St="vendor-files",Ft=["철거","금속공사","목작업","목자재","전기","전기자재","간판","임시간판","돌출간판","실내광고외","광고 시트","자판기 유리작업","자동문 /강화도어","자동문","강화도어","페인트자재","도장공사","타일자재","타일 부자재","타일시공","타일","싱크 개수대","설비","진열장","카운터 역채널","인조대리석","유리/무늬목작접등 기타잡비","유리","무늬목","기타잡비","스카이","에어컨","소방설비","가구운송","엠프","오픈현수막","열쇠/철물","열쇠","철물","청소","폐기물","추가공사","기타"],h={payments:[],stores:[{id:1,name:"성수 플래그십",area:52,status:"완료",budget:21e7,spent:1984e5},{id:2,name:"부산 센텀",area:47,status:"진행중",budget:186e6,spent:1227e5},{id:3,name:"대전 둔산",area:39,status:"진행중",budget:144e6,spent:882e5},{id:4,name:"제주 노형",area:42,status:"미착공",budget:158e6,spent:0}],vendors:[{id:1,name:"도원인테리어",category:"시공",bank:"신한은행",account_number:"110-000-000001",account_holder:"도원인테리어",risk:"정상",total:1245e5},{id:2,name:"한빛전기",category:"전기",bank:"국민은행",account_number:"004-000-000002",account_holder:"한빛전기",risk:"정상",total:738e5},{id:3,name:"서진설비",category:"설비",bank:"하나은행",account_number:"352-000-000003",account_holder:"서진설비",risk:"증빙확인",total:412e5}],userRoles:[],paymentItems:Ft,constructionStarts:[],storeQuotes:[]},ee={...h,payments:[{id:101,store:"성수 플래그십",vendor:"도원인테리어",payment_item:"목작업",estimate_total:12e6,payment_type:"선금 50%",amount:6e6,vendor_bank:"신한은행",vendor_account_number:"110-000-000001",vendor_account_holder:"도원인테리어",tax_type:"일반 송금",withholding_amount:0,net_amount:6e6,attachment_files:{estimate_files:[{name:"성수_목작업_견적서.pdf",size:245760,url:"#"}],tax_invoice_files:[{name:"성수_목작업_세금계산서.pdf",size:184320,url:"#"}]},estimate_group_mode:"매장별 항목 합산",estimate_group_key:"성수 플래그십::목작업",memo:"미리보기 승인 건",status:"승인",requested_at:"2026-08-25",transfer_status:"미작성"},{id:102,store:"부산 센텀",vendor:"한빛전기",payment_item:"전기",estimate_total:88e5,payment_type:"일시 지급",amount:88e5,vendor_bank:"국민은행",vendor_account_number:"004-000-000002",vendor_account_holder:"한빛전기",tax_type:"사업소득 3.3%",withholding_amount:290400,net_amount:8509600,attachment_files:{id_card_files:[{name:"한빛전기_신분증.pdf",size:126e3,url:"#"}]},estimate_group_mode:"매장별 항목 합산",estimate_group_key:"부산 센텀::전기",memo:"파일 생성 완료 샘플",status:"승인",requested_at:"2026-08-24",transfer_status:"파일생성",exported_at:"2026-08-26T09:20:00+09:00",transfer_batch_id:"TR-PREVIEW-001"},{id:103,store:"대전 둔산",vendor:"계좌미등록업체",payment_item:"설비",estimate_total:43e5,payment_type:"일시 지급",amount:43e5,vendor_bank:"",vendor_account_number:"",vendor_account_holder:"",tax_type:"일반 송금",withholding_amount:0,net_amount:43e5,attachment_files:{},estimate_group_mode:"매장별 항목 합산",estimate_group_key:"대전 둔산::설비",memo:"계좌 확인 필요 샘플",status:"승인",requested_at:"2026-08-23",transfer_status:"미작성"},{id:104,store:"제주 노형",vendor:"도원인테리어",payment_item:"타일",estimate_total:32e5,payment_type:"일시 지급",amount:32e5,vendor_bank:"신한은행",vendor_account_number:"110-000-000001",vendor_account_holder:"도원인테리어",tax_type:"일반 송금",withholding_amount:0,net_amount:32e5,attachment_files:{},estimate_group_mode:"매장별 항목 합산",estimate_group_key:"제주 노형::타일",memo:"송금완료 제외 샘플",status:"승인",requested_at:"2026-08-22",transfer_status:"송금완료",transferred_at:"2026-08-26T14:30:00+09:00"},{id:105,store:"성수 플래그십",vendor:"서진설비",payment_item:"소방설비",estimate_total:28e5,payment_type:"잔금 50%",amount:14e5,vendor_bank:"하나은행",vendor_account_number:"352-000-000003",vendor_account_holder:"서진설비",tax_type:"일반 송금",withholding_amount:0,net_amount:14e5,attachment_files:{},estimate_group_mode:"매장별 항목 합산",estimate_group_key:"성수 플래그십::소방설비",memo:"승인 전 검토 샘플",status:"신청",requested_at:"2026-08-27",transfer_status:"미작성"}],constructionStarts:[{id:201,store_name:"부산 센텀",area:47,drawing_note:"도면 확인 완료",drawing_files:[{name:"부산센텀_도면.pdf",size:312e3,url:"#"}],wall_upper_count:8,wall_lower_count:8,display_fixture_count:6,counter_drawer_1200_count:2,counter_shelf_1800_count:1,counter_shelf_1600_count:1,table_count:4,base_photo_note:"기초 사진 등록",base_photo_files:[{name:"부산센텀_기초사진.jpg",size:52e4,url:"#"}],special_notes:"미리보기 데이터",created_at:"2026-08-20T09:00:00+09:00"}],storeQuotes:[{store_name:"성수 플래그십",quote_status:"견적 확정",margin_rate:35,direct_cost:74e5,fixture_cost:0,cost_total:74e5,supply_amount:999e4,vat_amount:999e3,total_amount:10989e3}]},Nt=[{group:"벽장",name:"상부장",baseUnit:115600,allocationUnit:57100,quantity:40,madeAmount:126e4},{group:"벽장",name:"하부장",baseUnit:167500,allocationUnit:63500,quantity:40,madeAmount:224e4},{group:"진열장",name:"유리장",baseUnit:287e3,allocationUnit:163500,quantity:40,madeAmount:266e4},{group:"카운터",name:"카운터 서랍형 1200",baseUnit:831200,allocationUnit:727200,quantity:10,madeAmount:56e4},{group:"카운터",name:"카운터 선반형 1800",baseUnit:395800,allocationUnit:395800,quantity:4,madeAmount:256e3},{group:"카운터",name:"카운터 선반형 1600",baseUnit:350600,allocationUnit:350600,quantity:2,madeAmount:122e3},{group:"테이블",name:"테이블 600*1200",baseUnit:22e4,allocationUnit:161e3,quantity:5,madeAmount:805e3},{group:"도장",name:"도장 / 총 58통",baseUnit:18e4,allocationUnit:18e4,quantity:4,madeAmount:72e4}],Ut=["대시보드","엑셀 업로드","공사 시작 접수","결제 신청","결제 계좌 관리","첨부 파일 보기","매장별 공사 관리","진열장 원가 배분","견적서 생성","계약서 생성","은행 이체 파일 생성","관리자 설정"],mt={"전체 관리자":Ut,"인테리어 공사실장":["공사 시작 접수","결제 신청","결제 계좌 관리","첨부 파일 보기","진열장 원가 배분"]},Mt={admin:"전체 관리자",interior_manager:"인테리어 공사실장","전체 관리자":"전체 관리자","인테리어 공사실장":"인테리어 공사실장"},ne={"엑셀 업로드":["결제 신청 내역 엑셀 업로드","필수 컬럼 검증","중복/오류 행 표시"],"진열장 원가 배분":["매장별 진열장 비용 배분","공용 비용 자동 분배","평당 원가 반영"],"견적서 생성":["매장/업체 기준 견적서 생성","공사항목별 금액 자동 합산","PDF/문서 다운로드"],"계약서 생성":["업체 정보 기반 계약서 생성","계좌/사업자 정보 자동 반영","계약 상태 관리"],"은행 이체 파일 생성":["승인된 결제 건만 추출","은행 업로드용 파일 생성","이체 전 검증"],"첨부 파일 보기":["결제 증빙 확인","업체 서류 확인","공사 시작 파일 확인"],"관리자 설정":["사용자 권한","승인 단계","상태/분류 코드 관리"]};let C=h,f="대시보드",j="인테리어 공사실장",S=null,E={startDate:"",endDate:"",keyword:"",readyStatus:"all"},H="",W="진행중",Y=[],P=null;const _=e=>new Intl.NumberFormat("ko-KR",{style:"currency",currency:"KRW",maximumFractionDigits:0}).format(e||0),pt=()=>new Date().toISOString().slice(0,10),Q=e=>Number(String(e).replace(/[^\d]/g,"")),$=e=>Number(e||0),at=(e,t)=>String(e||"").trim().slice(0,t),ae=e=>String(e||"").replace(/[^\d]/g,""),oe=e=>({"일시 지급":1,"선금 50%":.5,"잔금 50%":.5})[e]||0,zt=e=>e==="사업소득 3.3%"?.033:0,p=e=>String(e??"").replace(/&/g,"&amp;").replace(/"/g,"&quot;").replace(/</g,"&lt;").replace(/>/g,"&gt;"),c=(e,t="-")=>{const n=e??"";return p(n===""?t:n)},ft=e=>String(e||"file").replace(/[^\w.\-가-힣]/g,"_"),Z=e=>({승인:"green",신청:"amber",반려:"red",진행중:"blue",완료:"green",미착공:"gray",정상:"green",증빙확인:"amber",정산중:"amber","견적 확정":"blue","계약 완료":"green"})[e]||"gray";async function Ot(){if(Y=[],!m)return Y=[ut?"로컬 미리보기 데이터로 표시 중입니다.":"Supabase 연결 정보가 없어 임시 데이터로 표시 중입니다."],ut?ee:h;const[e,t,n,a,o,r,s]=await Promise.all([m.from("payments").select("*").order("requested_at",{ascending:!1}).order("id",{ascending:!1}).limit(500),m.from("stores").select("*").order("id",{ascending:!0}),m.from("vendors").select("*").order("id",{ascending:!0}),m.from("construction_starts").select("*").order("created_at",{ascending:!1}).order("id",{ascending:!1}).limit(30),m.from("user_roles").select("email, role, created_at").order("email",{ascending:!0}),m.from("construction_cost_parts").select("part_name").order("part_name",{ascending:!0}),m.from("store_quotes").select("*").order("updated_at",{ascending:!1})]),u=[["결제 신청",e],["매장",t],["업체/계좌",n]].find(([,d])=>d.error);if(u)throw new Error(`${u[0]} 데이터를 불러오지 못했습니다. DB 연결과 권한을 확인해 주세요. (${u[1].error.message})`);[["공사 시작",a],["사용자 권한",o],["공사항목",r],["매장 견적",s]].forEach(([d,b])=>{b.error&&Y.push(`${d}: ${b.error.message}`)});const g=r.error?h.paymentItems:[...new Set([...Ft,...r.data.map(d=>d.part_name).filter(Boolean)])];return{payments:e.error?h.payments:e.data,stores:t.error?h.stores:t.data,vendors:n.error?h.vendors:n.data,constructionStarts:a.error?h.constructionStarts:a.data,userRoles:o.error?h.userRoles:o.data,paymentItems:g,storeQuotes:s.error?h.storeQuotes:s.data}}function re(e){var n;const t=document.querySelector("#app");t.className="auth-shell",t.innerHTML=`
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
        <div class="form-message error">${p(e.message||"데이터를 불러오지 못했습니다.")}</div>
        <button class="primary wide" type="button" data-retry-load>다시 불러오기</button>
      </section>
    </main>
  `,(n=document.querySelector("[data-retry-load]"))==null||n.addEventListener("click",Vt)}async function x(e=""){try{C=await Ot(),y(e)}catch(t){re(t)}}async function Bt(e){if(!m||!(e!=null&&e.email))return"인테리어 공사실장";const{data:t,error:n}=await m.from("user_roles").select("role").ilike("email",e.email).maybeSingle();return n||!(t!=null&&t.role)?"인테리어 공사실장":Mt[t.role]||"인테리어 공사실장"}async function Vt(){var t;if(!m){j="전체 관리자",await x();return}const{data:e}=await m.auth.getSession();if(S=((t=e.session)==null?void 0:t.user)||null,!S){R();return}j=await Bt(S),f=T()[0],await x()}function se(e,t,n){return e.payments.find(a=>{const o=a.vendor.trim()===t.trim(),r=Math.abs(a.amount-n)/Math.max(n,1);return o&&r<=.1})}function ie(e,t,n){return e.payments.find(a=>{const o=String(a.store||"").trim()===t.trim(),r=String(a.payment_item||"").trim()===n.trim();return o&&r})}async function kt(e,t){const n=Array.from(e||[]).filter(o=>o.size>0);if(!n.length)return[];if(!m)return n.map(o=>({name:o.name,type:o.type,size:o.size,path:"",url:""}));const a=[];for(const o of n){const r=`${(S==null?void 0:S.id)||"user"}/${t}/${Date.now()}-${crypto.randomUUID()}-${ft(o.name)}`,{error:s}=await m.storage.from($t).upload(r,o,{contentType:o.type||"application/octet-stream",upsert:!1});if(s)throw s;const{data:i}=m.storage.from($t).getPublicUrl(r);a.push({name:o.name,type:o.type,size:o.size,path:r,url:i.publicUrl})}return a}async function lt(e,t){const n=Array.from(e||[]).filter(o=>o.size>0);if(!n.length)return[];if(!m)return n.map(o=>({name:o.name,type:o.type,size:o.size,path:"",url:""}));const a=[];for(const o of n){const r=`${(S==null?void 0:S.id)||"user"}/${t}/${Date.now()}-${crypto.randomUUID()}-${ft(o.name)}`,{error:s}=await m.storage.from(wt).upload(r,o,{contentType:o.type,upsert:!1});if(s)throw s;const{data:i}=m.storage.from(wt).getPublicUrl(r);a.push({name:o.name,type:o.type,size:o.size,path:r,url:i.publicUrl})}return a}async function qt(e,t){const n=Array.from(e||[]).filter(o=>o.size>0);if(!n.length)return[];if(!m)return n.map(o=>({name:o.name,type:o.type,size:o.size,path:"",url:""}));const a=[];for(const o of n){const r=`${(S==null?void 0:S.id)||"user"}/${t}/${Date.now()}-${crypto.randomUUID()}-${ft(o.name)}`,{error:s}=await m.storage.from(St).upload(r,o,{contentType:o.type,upsert:!1});if(s)throw s;const{data:i}=m.storage.from(St).getPublicUrl(r);a.push({name:o.name,type:o.type,size:o.size,path:r,url:i.publicUrl})}return a}async function ce(e){e.preventDefault();const t=e.currentTarget,n=t.querySelector("button[type='submit']"),a=t.querySelector("[data-form-message]"),o=new FormData(t),r=Number(o.get("payment_id")||0),s=r?C.payments.find(k=>k.id===r&&k.status==="신청"):null,i=!!s,u=String(o.get("store")||"").trim(),g=String(o.get("vendor")||"").trim(),d=String(o.get("payment_item")||"").trim(),b=Q(o.get("estimate_total")),L=String(o.get("payment_type")||"일시 지급"),w=Q(o.get("amount")),A=String(o.get("tax_type")||"일반 송금"),F=Math.round(w*zt(A)),q=w-F,N=String(o.get("vendor_bank")||"").trim(),U=String(o.get("vendor_account_number")||"").trim(),J=String(o.get("vendor_account_holder")||"").trim(),G=String(o.get("memo")||"").trim(),K=se(C,g,w),l=(K==null?void 0:K.id)===r?null:K,v=ie(C,u,d),I=(v==null?void 0:v.id)===r?null:v,M=o.getAll("estimate_files").filter(k=>k.size>0),z=o.getAll("tax_invoice_files").filter(k=>k.size>0),V=o.getAll("id_card_files").filter(k=>k.size>0),O=(s==null?void 0:s.attachment_files)||{},tt=M.length||(O.estimate_files||[]).length,et=z.length||(O.tax_invoice_files||[]).length,ct=V.length||(O.id_card_files||[]).length;if(r&&!s){a.textContent="수정할 수 없는 결제 신청입니다. 이미 승인/반려 처리됐는지 확인해 주세요.",a.className="form-message error";return}if(!u||!g||!d||!b||!w||!N||!U||!J){a.textContent="매장명, 업체, 결제 항목, 견적 총액, 신청 금액, 이체 계좌를 모두 입력해 주세요.",a.className="form-message error";return}if(A==="일반 송금"&&(!tt||!et)){a.textContent="일반 송금은 견적서와 세금계산서를 첨부해야 합니다.",a.className="form-message error";return}if(A==="사업소득 3.3%"&&!ct){a.textContent="사업소득 3.3% 지급은 주민등록증 첨부가 필요합니다.",a.className="form-message error";return}n.disabled=!0,n.textContent="저장 중",a.textContent="첨부 자료를 업로드하고 있습니다.",a.className=l||I?"form-message warning":"form-message";let ht={};try{ht={estimate_files:[...O.estimate_files||[],...await lt(M,"estimates")],tax_invoice_files:[...O.tax_invoice_files||[],...await lt(z,"tax-invoices")],id_card_files:[...O.id_card_files||[],...await lt(V,"id-cards")]}}catch(k){n.disabled=!1,n.textContent=i?"수정 저장":"검토 요청 생성",a.textContent=`첨부 업로드 실패: ${k.message}`,a.className="form-message error";return}a.textContent=l?`중복 의심: ${l.store} / ${_(l.amount)} 건과 비슷합니다.`:I?`확인 필요: ${u} / ${d} 항목에 기존 신청이 있습니다. 중복이 아니면 견적서에는 같은 항목 합계로 반영됩니다.`:i?"수정 내용을 저장하고 있습니다.":"신청 건을 저장하고 있습니다.",a.className=l||I?"form-message warning":"form-message";const nt={store:u,vendor:g,payment_item:d,estimate_total:b,payment_type:L,amount:w,vendor_bank:N,vendor_account_number:U,vendor_account_holder:J,tax_type:A,withholding_amount:F,net_amount:q,attachment_files:ht,estimate_group_mode:"매장별 항목 합산",estimate_group_key:`${u}::${d}`,memo:G,status:"신청",requested_at:(s==null?void 0:s.requested_at)||pt()};if(!m)h.payments=i?h.payments.map(k=>k.id===r?{...k,...nt}:k):[{id:Date.now(),...nt},...h.payments];else{const{error:k}=i?await m.from("payments").update(nt).eq("id",r).eq("status","신청"):await m.from("payments").insert(nt);if(k){n.disabled=!1,n.textContent=i?"수정 저장":"검토 요청 생성",a.textContent=`저장 실패: ${k.message}`,a.className="form-message error";return}}t.reset(),P=null,await x(i?"결제 신청 수정이 저장됐습니다.":l?"신청이 저장됐습니다. 중복 의심 건은 결제 검토에서 확인하세요.":"신청이 저장됐습니다.")}async function le(e){var d;e.preventDefault();const t=e.currentTarget,n=t.querySelector("button[type='submit']"),a=t.querySelector("[data-vendor-message]"),o=new FormData(t),r=Number(o.get("vendor_id")||0),s={name:String(o.get("name")||"").trim(),category:String(o.get("category")||"").trim(),bank:String(o.get("bank")||"").trim(),account_number:String(o.get("account_number")||"").trim(),account_holder:String(o.get("account_holder")||"").trim()},i=o.getAll("business_license_files").filter(b=>b.size>0),u=o.getAll("bankbook_files").filter(b=>b.size>0);if(!s.name||!s.category||!s.bank||!s.account_number||!s.account_holder){a.textContent="업체명, 분류, 은행, 계좌번호, 예금주를 모두 입력해 주세요.",a.className="form-message error";return}if(!r&&(!i.length||!u.length)){a.textContent="최초 등록 시 사업자등록증과 통장사본을 모두 첨부해 주세요.",a.className="form-message error";return}n.disabled=!0,n.textContent="저장 중",a.textContent="첨부 자료를 업로드하고 있습니다.",a.className="form-message";let g={};try{const b=r?((d=C.vendors.find(L=>L.id===r))==null?void 0:d.attachment_files)||{}:{};g={business_license_files:[...b.business_license_files||[],...await qt(i,"business-licenses")],bankbook_files:[...b.bankbook_files||[],...await qt(u,"bankbooks")]}}catch(b){n.disabled=!1,n.textContent="계좌 저장",a.textContent=`첨부 업로드 실패: ${b.message}`,a.className="form-message error";return}if(s.attachment_files=g,a.textContent="결제 계좌 정보를 저장하고 있습니다.",!m)h.vendors=r?h.vendors.map(b=>b.id===r?{...b,...s}:b):[{id:Date.now(),...s,risk:"정상",total:0},...h.vendors];else{const{error:b}=r?await m.from("vendors").update(s).eq("id",r):await m.from("vendors").insert(s);if(b){n.disabled=!1,n.textContent="계좌 저장",a.textContent=`저장 실패: ${b.message}`,a.className="form-message error";return}}t.reset(),f="결제 계좌 관리",await x(r?"결제 계좌 정보가 수정됐습니다.":"결제 계좌 정보가 저장됐습니다.")}async function ue(e){e.preventDefault();const t=e.currentTarget,n=t.querySelector("button[type='submit']"),a=t.querySelector("[data-store-message]"),o=new FormData(t),r={name:String(o.get("name")||"").trim(),area:Number(o.get("area")),status:String(o.get("status")||"미착공"),budget:Q(o.get("budget")),spent:Q(o.get("spent"))};if(!r.name||!r.area||!r.budget){a.textContent="매장명, 면적, 예산을 입력해 주세요.",a.className="form-message error";return}if(n.disabled=!0,n.textContent="저장 중",a.textContent="매장 공사 정보를 저장하고 있습니다.",a.className="form-message",!m)h.stores=[{id:Date.now(),...r},...h.stores];else{const{error:s}=await m.from("stores").insert(r);if(s){n.disabled=!1,n.textContent="매장 저장",a.textContent=`저장 실패: ${s.message}`,a.className="form-message error";return}}t.reset(),f="매장별 공사 관리",await x("매장 공사 정보가 저장됐습니다.")}async function de(e){e.preventDefault();const t=e.currentTarget,n=t.querySelector("button[type='submit']"),a=t.querySelector("[data-construction-start-message]"),o=new FormData(t),r=$(o.get("wall_upper_count")),s=$(o.get("wall_lower_count")),i=$(o.get("display_fixture_count")),u=$(o.get("counter_drawer_1200_count")),g=$(o.get("counter_shelf_1800_count")),d=$(o.get("counter_shelf_1600_count")),b=u+g+d,L=Number(o.get("table_count")||0),w={store_name:String(o.get("store_name")||"").trim(),area:Number(o.get("area")),wall_upper_count:r,wall_lower_count:s,counter_drawer_1200_count:u,counter_shelf_1800_count:g,counter_shelf_1600_count:d,wall_cabinet_count:r+s,display_fixture_count:i,counter_count:b,fixture_count:r+s+i+b,table_count:L,sign_count:Number(o.get("sign_count")||0),special_notes:String(o.get("special_notes")||"").trim()};if(!w.store_name||!w.area){a.textContent="매장명과 평수는 꼭 입력해 주세요.",a.className="form-message error";return}n.disabled=!0,n.textContent="저장 중",a.textContent="도면과 사진 파일을 업로드하고 있습니다.",a.className="form-message";try{w.drawing_files=await kt(o.getAll("drawing_files"),"drawings"),w.base_photo_files=await kt(o.getAll("base_photo_files"),"base-photos")}catch(A){n.disabled=!1,n.textContent="공사 시작 정보 저장",a.textContent=`파일 업로드 실패: ${A.message}`,a.className="form-message error";return}if(a.textContent="공사 시작 정보를 저장하고 있습니다.",!m)h.constructionStarts=[{id:Date.now(),created_at:new Date().toISOString(),...w},...h.constructionStarts];else{const{error:A}=await m.from("construction_starts").insert(w);if(A){n.disabled=!1,n.textContent="공사 시작 정보 저장",a.textContent=`저장 실패: ${A.message}`,a.className="form-message error";return}}t.reset(),f="공사 시작 접수",await x("공사 시작 정보가 저장됐습니다. 결제 신청 매장 검색에도 반영됐습니다.")}async function me(e,t){if(!(!e||!["승인","반려"].includes(t))){if(!m)h.payments=h.payments.map(n=>n.id===e?{...n,status:t}:n);else{const{data:n,error:a}=await m.from("payments").update({status:t}).eq("id",e).eq("status","신청").select("id").maybeSingle();if(a){y(`상태 변경 실패: ${a.message}`);return}if(!n){P===e&&(P=null),f="결제 신청",await x("상태 변경 실패: 이미 처리됐거나 권한이 없습니다. 새로고침 후 다시 확인해 주세요.");return}}P===e&&(P=null),f="결제 신청",await x(`결제 신청이 ${t} 처리됐습니다.`)}}async function pe(e){const t=[...new Set(e.map(Number).filter(Boolean))];if(!t.length){y("승인할 결제 신청을 먼저 선택해 주세요.");return}if(!m){h.payments=h.payments.map(o=>t.includes(o.id)&&o.status==="신청"?{...o,status:"승인"}:o),f="결제 신청",await x(`${t.length}건을 승인 처리했습니다.`);return}const{data:n,error:a}=await m.from("payments").update({status:"승인"}).in("id",t).eq("status","신청").select("id");if(a){y(`선택 승인 실패: ${a.message}`);return}f="결제 신청",await x(`${(n==null?void 0:n.length)||0}건을 승인 처리했습니다. 이제 엑셀 다운로드를 누르면 승인된 건이 내려갑니다.`)}async function Ct(e,t){const n=document.querySelector(`[data-margin-rate="${CSS.escape(e)}"]`),a=Number((n==null?void 0:n.value)||35),o=bt(C,e,a),r=it(C,e),s={store_name:e,quote_status:t,margin_rate:a,direct_cost:o.directCost,fixture_cost:o.fixtureCost,cost_total:o.costTotal,supply_amount:o.supplyAmount,vat_amount:o.vatAmount,total_amount:o.totalAmount,quote_confirmed_at:t==="견적 확정"?new Date().toISOString():r.quote_confirmed_at||new Date().toISOString(),contract_completed_at:t==="계약 완료"?new Date().toISOString():r.contract_completed_at||null,updated_at:new Date().toISOString()};if(!e||!o.costTotal||a<0){y("견적 확정 전에 승인된 결제 또는 진열장 배분 원가와 마진율을 확인해 주세요.");return}if(!m)h.storeQuotes=[{id:r.id||Date.now(),...s},...h.storeQuotes.filter(i=>i.store_name!==e)];else{const{error:i}=await m.from("store_quotes").upsert(s,{onConflict:"store_name"});if(i){y(`매장 견적 저장 실패: ${i.message}`);return}}H=e,f=t==="계약 완료"?"견적서 생성":"매장별 공사 관리",await x(t==="계약 완료"?`${e} 공사 완료 처리됐습니다. 견적서와 계약서를 확인할 수 있습니다.`:`${e} 견적이 확정됐습니다.`)}function fe(e){var a;const t=String(e||"").replace(/\s/g,"");return((a=[["신한","신한"],["국민","국민"],["기업","기업"],["우리","우리"],["하나","하나"],["농협","농협"],["축협","농협"],["카카오","카카오"],["토스","토스"],["케이뱅크","케이뱅크"],["부산","부산"],["대구","아이엠뱅크"],["아이엠","아이엠뱅크"],["새마을","새마을금고"],["신협","신협"],["우체국","우체국"],["전북","전북"],["광주","광주"],["경남","경남"],["수협","수협"]].find(([o])=>t.includes(o)))==null?void 0:a[1])||at(e,6)}function _e(e,t){const n=String(t.vendor||"").trim();return e.vendors.find(a=>String(a.name||"").trim()===n)||{}}function Pt(e){return e.payments.filter(t=>t.status==="승인")}function st(e){return String(e.transfer_status||"미작성").trim()||"미작성"}function _t(e){return["송금완료","이체완료"].includes(st(e))}function ge(e){return Pt(e).filter(t=>!_t(t))}function be(e){if(!e.ready)return"red";const t=st(e.payment);return _t(e.payment)?"green":t==="파일생성"?"blue":"gray"}function he(e){if(!e.ready)return"계좌정보 확인";const t=st(e.payment);return t==="미작성"?"파일 미생성":t}function xt(e){const t=String(e||"");return t?t.includes("T")?t.slice(0,16).replace("T"," "):t.slice(0,10):""}function ve(){const e=new Date().toISOString().replace(/[-:TZ.]/g,"").slice(0,14),t=Math.random().toString(36).slice(2,8).toUpperCase();return`TR-${e}-${t}`}function ye(e,t){const n=_e(e,t),a=t.vendor_bank||n.bank,o=t.vendor_account_number||n.account_number,r=t.vendor_account_holder||n.account_holder||t.vendor,s=Number(t.net_amount||t.amount||0),i=`${t.store||""} ${t.payment_item||""}`.trim();return{bank:fe(a),account:ae(o),holder:r,amount:s,withdrawMemo:"하카공사비",depositMemo:at(r,7),payerCode:"",memo:at(i,10),key:at(`${t.id||""}-${t.requested_at||pt()}`,20),payment:t,vendor:n,ready:!!(a&&o&&r&&s>0)}}function $e(e,t,n){const a=String(e||"").slice(0,10);return!(!a||t&&a<t||n&&a>n)}function dt(e,t={}){var s;const n=(s=t.selectedIds)!=null&&s.length?new Set(t.selectedIds.map(String)):null,a=!!(t.startDate||t.endDate),o=String(t.keyword||"").trim().toLowerCase(),r=t.readyStatus||"all";return ge(e).filter(i=>!a||$e(i.requested_at,t.startDate,t.endDate)).filter(i=>!n||n.has(String(i.id))).map(i=>ye(e,i)).filter(i=>o?[i.payment.store,i.payment.vendor,i.payment.payment_item,i.bank,i.account,i.holder].join(" ").toLowerCase().includes(o):!0).filter(i=>r==="ready"?i.ready:r==="missing"?!i.ready:!0)}async function we(e,t){const n=[...new Set(e.map(i=>Number(i.payment.id)).filter(Boolean))];if(!n.length)return{updated:0};const a=new Date().toISOString(),o={transfer_batch_id:t,exported_at:a,transfer_status:"파일생성"};if(!m)return h.payments=h.payments.map(i=>n.includes(i.id)&&i.status==="승인"?{...i,...o}:i),C=await Ot(),{updated:n.length};const{data:r,error:s}=await m.from("payments").update(o).in("id",n).eq("status","승인").select("id");return s?{error:s}:{updated:(r==null?void 0:r.length)||0}}async function Se(e){const t=[...new Set(e.map(Number).filter(Boolean))];if(!t.length){y("송금완료 처리할 이체건을 먼저 선택해 주세요.");return}if(!window.confirm(`${t.length}건을 송금완료로 처리할까요? 처리 후 이체자료조회 대상에서 제외됩니다.`))return;const n={transfer_status:"송금완료",transferred_at:new Date().toISOString(),transfer_memo:"화면에서 송금완료 처리"};if(!m){h.payments=h.payments.map(r=>t.includes(r.id)&&r.status==="승인"?{...r,...n}:r),f="은행 이체 파일 생성",await x(`${t.length}건을 송금완료 처리했습니다.`);return}const{data:a,error:o}=await m.from("payments").update(n).in("id",t).eq("status","승인").select("id");if(o){y(`송금완료 처리 실패: ${o.message}`);return}f="은행 이체 파일 생성",await x(`${(a==null?void 0:a.length)||0}건을 송금완료 처리했습니다.`)}async function ke(e,t={}){const n=Array.isArray(t.selectedIds)&&t.selectedIds.length>0,a=!!(t.startDate||t.endDate);if(!n&&!a){y("이체 파일은 전체 승인건을 자동으로 만들지 않습니다. 이체대상을 체크하거나 날짜 범위를 조회한 뒤 다운로드해 주세요.");return}const o=dt(e,t).filter(q=>q.ready);if(!o.length){y("다운로드할 승인 완료 건이 없거나, 업체 계좌정보가 비어 있습니다.");return}if(!window.XLSX){y("엑셀 생성 모듈을 불러오지 못했습니다. 새로고침 후 다시 시도해 주세요.");return}const r=["*입금은행","*입금계좌","*입금액","고객관리성명"],s=o.map(q=>[q.bank,q.account,Math.round(Number(q.amount||0)),q.holder]),i=window.XLSX.utils.aoa_to_sheet([r,...s]);for(let q=2;q<=s.length+1;q+=1){const N=i[`B${q}`],U=i[`C${q}`];N&&(N.t="s",N.z="@"),U&&(U.t="n",U.z="0")}i["!cols"]=[{wch:12},{wch:22},{wch:14},{wch:24}];const u=window.XLSX.utils.book_new();window.XLSX.utils.book_append_sheet(u,i,"입력정보");const g=window.XLSX.write(u,{bookType:"xls",type:"array"}),d=new Blob([g],{type:"application/vnd.ms-excel"}),b=URL.createObjectURL(d),L=ve(),w=document.createElement("a");w.href=b;const A=t.startDate||t.endDate?`_${t.startDate||"처음"}_${t.endDate||"오늘"}`:"";w.download=`은행대량이체${A}_${L}_${o.length}건.xls`,document.body.appendChild(w),w.click(),w.remove(),URL.revokeObjectURL(b);const F=await we(o,L);if(F.error){y(`이체 파일 ${o.length}건은 생성했지만 상태 저장에 실패했습니다: ${F.error.message}`);return}f="은행 이체 파일 생성",await x(`이체 파일 ${o.length}건을 생성하고 ${F.updated}건을 파일생성 상태로 표시했습니다.`)}function At(e){const t=e.querySelector("[name='estimate_total']"),n=e.querySelector("[name='payment_type']"),a=e.querySelector("[name='amount']"),o=oe(n.value),r=Q(t.value);!o||!r||(a.value=String(Math.round(r*o)),ot(e))}function ot(e){var i,u;const t=Q((i=e.querySelector("[name='amount']"))==null?void 0:i.value),n=((u=e.querySelector("[name='tax_type']"))==null?void 0:u.value)||"일반 송금",a=Math.round(t*zt(n)),o=t-a,r=e.querySelector("[data-withholding-preview]"),s=e.querySelector("[data-net-preview]");r&&(r.textContent=_(a)),s&&(s.textContent=_(o))}function Et(e){var a;const t=String(((a=e.querySelector("[name='vendor']"))==null?void 0:a.value)||"").trim(),n=C.vendors.find(o=>String(o.name||"").trim()===t);n&&(e.querySelector("[name='vendor_bank']").value=n.bank||"",e.querySelector("[name='vendor_account_number']").value=n.account_number||"",e.querySelector("[name='vendor_account_holder']").value=n.account_holder||"")}function qe(e){const t=C.vendors.find(a=>a.id===e),n=document.querySelector("#vendor-form");!t||!n||(n.querySelector("[name='vendor_id']").value=t.id,n.querySelector("[name='name']").value=t.name||"",n.querySelector("[name='category']").value=t.category||"",n.querySelector("[name='bank']").value=t.bank||"",n.querySelector("[name='account_number']").value=t.account_number||"",n.querySelector("[name='account_holder']").value=t.account_holder||"",n.querySelector("button[type='submit']").textContent="계좌 수정",n.querySelector("[data-vendor-message]").textContent="기존 계좌 정보를 수정 중입니다. 새 파일을 첨부하면 기존 파일에 추가됩니다.")}function Ce(e){const t=e.stores.filter(d=>d.status==="완료").length,n=e.stores.filter(d=>d.status==="진행중").length,a=e.stores.filter(d=>d.document_required).length,o=e.payments.filter(d=>d.status==="승인").reduce((d,b)=>d+b.amount,0),r=e.stores.reduce((d,b)=>d+Number(b.spent||0),0),s=e.payments.filter(d=>d.status==="신청").length,i=e.stores.filter(d=>String(d.name||"").includes("직영점")).length,u=e.stores.reduce((d,b)=>d+Number(b.area||0),0),g=Math.round(r/Math.max(u,1));return[["완료된 매장",`${t}개`,"엑셀 공사 상태 기준"],["진행중인 매장",`${n}개`,"시공 또는 비용 검수 중"],["전체 공사비",_(r),"엑셀 합계 기준"],["문서 생성 대상",`${a}개`,"강남압구정 행부터 아래"],["대기중인 결제",`${s}건`,"승인 전 검토 필요"],["직영점",`${i}개`,"지점명 기준"],["승인된 결제",_(o),"지급 승인 완료"],["평균 평당 원가",_(g),"엑셀 합계/평수 기준"]]}function D(e,t){return`
    <div class="table-wrap">
      <table>
        <thead><tr>${e.map(n=>`<th>${n}</th>`).join("")}</tr></thead>
        <tbody>${t.join("")}</tbody>
      </table>
    </div>
  `}function xe(e){return e.payments.map(t=>`
      <tr>
        <td>${c(t.store)}</td>
        <td>${c(t.vendor)}</td>
        <td>${c(t.vendor_bank)}</td>
        <td>${c(t.vendor_account_number)}</td>
        <td>${c(t.vendor_account_holder)}</td>
        <td>${c(t.payment_item)}</td>
        <td class="money">${_(t.estimate_total||t.amount)}</td>
        <td>${c(t.payment_type,"일시 지급")}</td>
        <td class="money">${_(t.amount)}</td>
        <td>${c(t.tax_type,"일반 송금")}</td>
        <td class="money">${_(t.withholding_amount||0)}</td>
        <td class="money">${_(t.net_amount||t.amount)}</td>
        <td>${Jt(t)}</td>
        <td>${c(t.estimate_group_mode,"매장별 항목 합산")}</td>
        <td><span class="badge ${Z(t.status)}">${c(t.status)}</span></td>
        <td>${c(t.requested_at)}</td>
      </tr>`)}function Ae(e,t=!1){return e.payments.length?`
    <div class="payment-review-list">
      ${e.payments.map(n=>`
            <details class="payment-review-card">
              <summary>
                <div class="payment-summary-main">
                  ${n.status==="신청"&&t?`<input type="checkbox" class="payment-select" value="${n.id}" aria-label="${p(n.store)} 선택" />`:""}
                  <div>
                    <strong>${c(n.store)}</strong>
                    <span>${c(n.vendor)}</span>
                  </div>
                </div>
                <div class="payment-summary-meta">
                  <span>${c(n.payment_item)}</span>
                  <strong>${_(n.net_amount||n.amount)}</strong>
                  <span class="badge ${Z(n.status)}">${c(n.status)}</span>
                </div>
              </summary>
              <div class="payment-detail-grid">
                <div><span>입금은행</span><strong>${c(n.vendor_bank)}</strong></div>
                <div><span>입금계좌</span><strong>${c(n.vendor_account_number)}</strong></div>
                <div><span>예금주</span><strong>${c(n.vendor_account_holder)}</strong></div>
                <div><span>견적 총액</span><strong>${_(n.estimate_total||n.amount)}</strong></div>
                <div><span>결제 방식</span><strong>${c(n.payment_type,"일시 지급")}</strong></div>
                <div><span>이번 신청액</span><strong>${_(n.amount)}</strong></div>
                <div><span>지급 유형</span><strong>${c(n.tax_type,"일반 송금")}</strong></div>
                <div><span>원천징수</span><strong>${_(n.withholding_amount||0)}</strong></div>
                <div><span>실지급액</span><strong>${_(n.net_amount||n.amount)}</strong></div>
                <div><span>첨부 자료</span><strong>${Jt(n)}</strong></div>
                <div><span>견적서 반영</span><strong>${c(n.estimate_group_mode,"매장별 항목 합산")}</strong></div>
                <div><span>신청일</span><strong>${c(n.requested_at)}</strong></div>
              </div>
              <div class="payment-detail-actions">
                ${n.status==="신청"?`<button data-payment-edit="${p(n.id)}">수정</button>
                       <button data-payment-id="${p(n.id)}" data-payment-status="반려">신청 취소</button>
                       ${t?`<button class="primary" data-payment-id="${p(n.id)}" data-payment-status="승인">승인</button>`:""}`:'<span class="muted">처리 완료</span>'}
              </div>
            </details>`).join("")}
    </div>
  `:'<div class="empty">표시할 결제 신청이 없습니다.</div>'}function Ee(e,t=!1){return e.length?e.map(n=>`
      <tr>
        ${t?`<td><input type="checkbox" class="transfer-select" value="${p(n.payment.id)}" ${n.ready?"":"disabled"} aria-label="${p(n.payment.store)} 이체대상 선택" /></td>`:""}
        <td>${c(n.payment.requested_at)}</td>
        <td>${c(n.payment.store)}</td>
        <td>${c(n.payment.vendor)}</td>
        <td>${c(n.payment.payment_item)}</td>
        <td>${c(n.bank)}</td>
        <td>${c(n.account)}</td>
        <td>${c(n.holder)}</td>
        <td class="money">${_(n.amount)}</td>
        <td>${c(xt(n.payment.exported_at))}</td>
        <td>${c(xt(n.payment.transferred_at))}</td>
        <td><span class="badge ${be(n)}">${he(n)}</span></td>
      </tr>`).join(""):`<tr><td colspan="${t?12:11}">조회된 이체 대상이 없습니다.</td></tr>`}function it(e,t){return e.storeQuotes.find(n=>n.store_name===t)||{}}function jt(e,t){return e.constructionStarts.find(n=>n.store_name===t)||{}}function X(e,t){const n=Nt.find(a=>{const o=a.group===e,r=t.every(s=>a.name.includes(s));return o&&r});return n?Zt(n):0}function De(e,t){return e.payments.filter(n=>{const a=n.store===t,o=n.status==="승인",r=String(n.payment_item||""),s=r.includes("진열장")||r.includes("벽장")||r.includes("카운터");return a&&o&&!s}).reduce((n,a)=>n+Number(a.amount||0),0)}function gt(e,t){const n=jt(e,t),a=$(n.wall_upper_count??n.wall_cabinet_count),o=$(n.wall_lower_count),r=$(n.display_fixture_count??n.fixture_count),s=$(n.counter_drawer_1200_count??n.counter_count),i=$(n.counter_shelf_1800_count),u=$(n.counter_shelf_1600_count),g=$(n.table_count);return a*X("벽장",["상부장"])+o*X("벽장",["하부장"])+r*X("진열장",["유리장"])+s*X("카운터",["서랍형","1200"])+i*X("카운터",["선반형","1800"])+u*X("카운터",["선반형","1600"])+g*X("테이블",["600*1200"])}function Kt(e){const t=[...e.stores.map(n=>n.name),...e.constructionStarts.map(n=>n.store_name),...e.payments.map(n=>n.store)];return[...new Set(t.map(n=>String(n||"").trim()).filter(Boolean))]}function Xt(e,t){return e.stores.find(n=>n.name===t)||{}}function Ht(e,t){const n=Xt(e,t);return n.status==="완료"&&!n.document_required}function Le(e,t){const n=it(e,t),a=Xt(e,t);return n.quote_status==="계약 완료"||a.status==="완료"&&!!a.document_required}function rt(e,t="진행중"){return Kt(e).filter(n=>{if(Ht(e,n))return!1;const a=Le(e,n);return t==="완료"?a:!a})}function Qt(e){return Kt(e).filter(t=>!Ht(e,t))}function bt(e,t,n){const a=De(e,t),o=gt(e,t),r=a+o,s=Math.round(r*(1+$(n)/100)),i=Math.round(s*.1),u=s+i;return{directCost:a,fixtureCost:o,costTotal:r,supplyAmount:s,vatAmount:i,totalAmount:u}}function Ie(e,t,n){const a=new Map;e.payments.filter(r=>{const s=r.store===t,i=r.status==="승인",u=String(r.payment_item||""),g=u.includes("진열장")||u.includes("벽장")||u.includes("카운터");return s&&i&&!g}).forEach(r=>{const s=r.payment_item||"기타 공사";a.set(s,(a.get(s)||0)+Number(r.amount||0))});const o=gt(e,t);return o>0&&a.set("진열장 원가 배분",(a.get("진열장 원가 배분")||0)+o),[...a.entries()].map(([r,s])=>{const i=Math.round(s*(1+$(n)/100)),u=Math.round(i*.1);return{name:r,cost:s,supply:i,vat:u,total:i+u}})}function Te(e,t="진행중"){return rt(e,t).map(n=>{const a=it(e,n),o=a.margin_rate??35,r=bt(e,n,o),s=a.quote_status||"정산중";return`
      <tr>
        <td>${c(n)}</td>
        <td><span class="badge ${Z(s)}">${c(s)}</span></td>
        <td class="money">${_(r.directCost)}</td>
        <td class="money">${_(r.fixtureCost)}</td>
        <td class="money">${_(r.costTotal)}</td>
        <td><input class="inline-input" data-margin-rate="${p(n)}" inputmode="decimal" value="${p(o)}" /></td>
        <td class="money">${_(r.supplyAmount)}</td>
        <td class="money">${_(r.vatAmount)}</td>
        <td class="money">${_(r.totalAmount)}</td>
        <td>
          <div class="row-actions">
            <button data-quote-finalize="${p(n)}">견적 확정</button>
            <button data-contract-complete="${p(n)}">완료/문서 생성</button>
            <button data-document-view="견적서 생성" data-document-store="${p(n)}">견적서</button>
            <button data-document-view="계약서 생성" data-document-store="${p(n)}">계약서</button>
          </div>
        </td>
      </tr>`})}function Re(e){return e.stores.map(t=>`
      <tr>
        <td>${c(t.region)}</td>
        <td>${c(t.name)}</td>
        <td>${t.fixture_count||0}</td>
        <td>${c(t.area)}평</td>
        <td class="money">${_(t.budget)}</td>
        <td><span class="badge ${Z(t.status)}">${c(t.status)}</span></td>
        <td><span class="badge ${t.document_required?"blue":"gray"}">${t.document_required?"생성 대상":"출력 완료"}</span></td>
      </tr>`)}function Dt(e,t=""){const n=Array.isArray(e)?e:[];return n.length?n.map(a=>a.url?`<a href="${p(a.url)}" target="_blank" rel="noreferrer">${p(a.name||"파일")}</a>`:`<span>${p(a.name||"파일")}</span>`).join("<br />"):t?p(t):"-"}function Jt(e){const t=e.attachment_files||{},n=(t.estimate_files||[]).length,a=(t.tax_invoice_files||[]).length,o=(t.id_card_files||[]).length;return e.tax_type==="사업소득 3.3%"?o?`주민등록증 ${o}개`:"주민등록증 필요":`견적서 ${n}개 / 세금계산서 ${a}개`}function Fe(e){const t=Number(e||0);return t?t>=1024*1024?`${(t/1024/1024).toFixed(1)}MB`:t>=1024?`${Math.round(t/1024)}KB`:`${t}B`:"-"}function Ne(e){const t=[],n=(a,o,r,s,i="")=>{(Array.isArray(s)?s:[]).forEach(u=>{t.push({source:a,owner:o,category:r,name:u.name||"파일",size:Fe(u.size),date:i,url:u.url||""})})};return e.payments.forEach(a=>{const o=a.attachment_files||{},r=`${a.store||"-"} / ${a.vendor||"-"}`,s=a.requested_at||"";n("결제 신청",r,"견적서",o.estimate_files,s),n("결제 신청",r,"세금계산서",o.tax_invoice_files,s),n("결제 신청",r,"주민등록증",o.id_card_files,s)}),e.vendors.forEach(a=>{const o=a.attachment_files||{};n("업체 계좌",a.name||"-","사업자등록증",o.business_license_files),n("업체 계좌",a.name||"-","통장사본",o.bankbook_files)}),e.constructionStarts.forEach(a=>{const o=String(a.created_at||"").slice(0,10);n("공사 시작",a.store_name||"-","도면",a.drawing_files,o),n("공사 시작",a.store_name||"-","기초 사진",a.base_photo_files,o)}),t.length?t.map(a=>`
      <tr>
        <td>${c(a.source)}</td>
        <td>${c(a.owner)}</td>
        <td>${c(a.category)}</td>
        <td>${a.url?`<a href="${p(a.url)}" target="_blank" rel="noreferrer">${p(a.name)}</a>`:p(a.name)}</td>
        <td>${c(a.size)}</td>
        <td>${c(a.date)}</td>
        <td>${a.url?`<a class="file-open-link" href="${p(a.url)}" target="_blank" rel="noreferrer">열기</a>`:"-"}</td>
      </tr>`):['<tr><td colspan="7">아직 업로드된 첨부 파일이 없습니다.</td></tr>']}function Ue(e){return e.constructionStarts.map(t=>`
      <tr>
        <td>${c(t.store_name)}</td>
        <td>${c(t.area)}평</td>
        <td>${c(t.wall_upper_count??t.wall_cabinet_count??0)}</td>
        <td>${c(t.wall_lower_count??0)}</td>
        <td>${c(t.display_fixture_count??t.fixture_count??0)}</td>
        <td>${c(t.counter_drawer_1200_count??t.counter_count??0)}</td>
        <td>${c(t.counter_shelf_1800_count??0)}</td>
        <td>${c(t.counter_shelf_1600_count??0)}</td>
        <td>${c(t.table_count||0)}</td>
        <td>${c(t.sign_count||0)}</td>
        <td>${Dt(t.drawing_files,t.drawing_note)}</td>
        <td>${Dt(t.base_photo_files,t.base_photo_note)}</td>
        <td>${c(t.special_notes)}</td>
      </tr>`)}function Wt(e){return e.vendors.map(t=>{const n=t.attachment_files||{},a=(n.business_license_files||[]).length,o=(n.bankbook_files||[]).length;return`
        <tr>
          <td>${c(t.name)}</td>
          <td>${c(t.category)}</td>
          <td>${c(t.bank)}</td>
          <td>${c(t.account_number)}</td>
          <td>${c(t.account_holder)}</td>
          <td>사업자 ${a}개 / 통장 ${o}개</td>
          <td><span class="badge ${Z(t.risk)}">${c(t.risk)}</span></td>
          <td><button data-vendor-edit="${p(t.id)}">수정</button></td>
        </tr>`})}function Me(e){return e.vendors.map(t=>`<option value="${p(t.name)}">${p(t.name)} / ${p(t.bank)} ${p(t.account_number||"")}</option>`).join("")}function ze(e){const n=[...e.constructionStarts.map(o=>({name:o.store_name,area:o.area,status:"공사 시작 접수"})),...e.stores],a=new Set;return n.filter(o=>{const r=String(o.name||"").trim();return!r||a.has(r)?!1:(a.add(r),!0)}).map(o=>`<option value="${p(o.name)}">${p(o.name)} / ${p(o.area)}평 / ${p(o.status)}</option>`).join("")}function Oe(e){return e.paymentItems.map(t=>`<option value="${p(t)}">${p(t)}</option>`).join("")}function B(e,t){return e===t?"selected":""}function Yt(){const e=C.payments.find(a=>a.id===P&&a.status==="신청"),t=!!e,n=(a,o="")=>p((e==null?void 0:e[a])??o);return`
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
            ${ze(C)}
          </datalist>
        </label>
        <label>협력업체
          <input name="vendor" list="vendor-suggestions" value="${n("vendor")}" placeholder="직접입력 또는 업체명 검색" autocomplete="off" />
          <datalist id="vendor-suggestions">
            <option value="직접입력">직접입력</option>
            ${Me(C)}
          </datalist>
        </label>
        <label>입금은행<input name="vendor_bank" value="${n("vendor_bank")}" placeholder="업체 선택 시 자동 입력, 변경 가능" autocomplete="off" /></label>
        <label>입금계좌<input name="vendor_account_number" value="${n("vendor_account_number")}" placeholder="예: 110-000-000000" autocomplete="off" /></label>
        <label>예금주<input name="vendor_account_holder" value="${n("vendor_account_holder")}" placeholder="예: 도원인테리어" autocomplete="off" /></label>
        <label>결제 항목
          <input name="payment_item" list="payment-item-suggestions" value="${n("payment_item")}" placeholder="직접입력 또는 공사항목 검색" autocomplete="off" />
          <datalist id="payment-item-suggestions">
            <option value="직접입력">직접입력</option>
            ${Oe(C)}
          </datalist>
        </label>
        <label>견적 총액, 부가세 포함<input name="estimate_total" value="${n("estimate_total")}" inputmode="numeric" placeholder="예: 10000000" autocomplete="off" /></label>
        <label>결제 방식
          <select name="payment_type">
            <option value="일시 지급" ${B("일시 지급",(e==null?void 0:e.payment_type)||"일시 지급")}>일시 지급</option>
            <option value="선금 50%" ${B("선금 50%",e==null?void 0:e.payment_type)}>선금 50%</option>
            <option value="잔금 50%" ${B("잔금 50%",e==null?void 0:e.payment_type)}>잔금 50%</option>
            <option value="직접 입력" ${B("직접 입력",e==null?void 0:e.payment_type)}>직접 입력</option>
          </select>
        </label>
        <label>이번 신청 금액<input name="amount" value="${n("amount")}" inputmode="numeric" placeholder="예: 5000000" autocomplete="off" /></label>
        <label>지급 유형
          <select name="tax_type">
            <option value="일반 송금" ${B("일반 송금",(e==null?void 0:e.tax_type)||"일반 송금")}>일반 송금</option>
            <option value="사업소득 3.3%" ${B("사업소득 3.3%",e==null?void 0:e.tax_type)}>사업소득 3.3%</option>
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
  `}function Be(){return`
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
  `}function Ve(){return`
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
  `}function Pe(e){return`
    <section class="kpis">
      ${Ce(e).map(([t,n,a])=>`
            <article class="kpi">
              <span>${t}</span>
              <strong>${n}</strong>
              <small>${a}</small>
            </article>`).join("")}
    </section>

    <section class="grid two">
      <article class="panel">
        <div class="panel-head">
          <h2>최근 결제 신청</h2>
          <button data-view-link="결제 신청">전체 보기</button>
        </div>
        ${D(["매장","업체","입금은행","입금계좌","예금주","항목","견적 총액","결제 방식","이번 신청액","지급 유형","원천징수","실지급액","첨부 자료","견적서 반영","상태","신청일"],xe(e))}
      </article>

      <article class="panel">
        <div class="panel-head">
          <h2>매장 공사 현황</h2>
          <button data-view-link="매장별 공사 관리">관리</button>
        </div>
        ${D(["지역","매장","진열장","평수","공사비 합계","상태","문서"],Re(e))}
      </article>
    </section>

    <section class="grid lower">
      <article class="panel">
        <div class="panel-head">
          <h2>주요 협력업체</h2>
          <button data-view-link="결제 계좌 관리">계좌 추가</button>
        </div>
        ${D(["업체","분류","은행","계좌번호","예금주","첨부","상태","수정"],Wt(e))}
      </article>
      ${Yt()}
    </section>
  `}function je(e){const t=T().includes("은행 이체 파일 생성"),n=e.payments.filter(a=>a.status==="신청").length;return`
    <section class="grid two">
      ${Yt()}
      <article class="panel">
        <div class="panel-head">
          <h2>결제 신청 검토</h2>
          <div class="row-actions">
            <button>승인 대기 ${n}건</button>
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
        ${Ae(e,t)}
      </article>
    </section>
  `}function Ke(e){const t=dt(e),n=dt(e,E),a=Pt(e).filter(g=>_t(g)).length,o=n.filter(g=>g.ready).length,r=n.length-o,s=n.filter(g=>st(g.payment)==="파일생성").length,i=n.filter(g=>g.ready).reduce((g,d)=>g+d.amount,0),u=E.startDate||E.endDate?`${E.startDate||"처음"} ~ ${E.endDate||"오늘"}`:"전체 기간";return`
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
          <label>시작일<input type="date" data-transfer-start value="${p(E.startDate)}" /></label>
          <label>종료일<input type="date" data-transfer-end value="${p(E.endDate)}" /></label>
          <label>검색어<input data-transfer-keyword value="${p(E.keyword)}" placeholder="매장, 업체, 항목, 계좌" autocomplete="off" /></label>
          <label>계좌상태
            <select data-transfer-ready-status>
              <option value="all" ${B("all",E.readyStatus)}>전체</option>
              <option value="ready" ${B("ready",E.readyStatus)}>계좌확인</option>
              <option value="missing" ${B("missing",E.readyStatus)}>확인필요</option>
            </select>
          </label>
          <button class="primary" data-transfer-filter>조회</button>
          <button data-transfer-clear>전체</button>
        </div>

        <div class="transfer-status-strip">
          <div><span>조회기간</span><strong>${u}</strong></div>
          <div><span>미송금 승인</span><strong>${t.length}건</strong></div>
          <div><span>조회 결과</span><strong>${n.length}건</strong></div>
          <div><span>계좌 확인</span><strong>${o}건</strong></div>
          <div><span>확인 필요</span><strong>${r}건</strong></div>
          <div><span>파일 생성</span><strong>${s}건</strong></div>
          <div><span>송금완료 제외</span><strong>${a}건</strong></div>
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
            <tbody>${Ee(n,!0)}</tbody>
            <tfoot>
              <tr>
                <td colspan="8">합계</td>
                <td class="money">${_(i)}</td>
                <td colspan="3">${o}건 가능</td>
              </tr>
            </tfoot>
          </table>
        </div>
      </article>
    </section>
  `}function Xe(e){const t=e.payments.reduce((o,r)=>{const s=r.attachment_files||{};return o+(s.estimate_files||[]).length+(s.tax_invoice_files||[]).length+(s.id_card_files||[]).length},0),n=e.vendors.reduce((o,r)=>{const s=r.attachment_files||{};return o+(s.business_license_files||[]).length+(s.bankbook_files||[]).length},0),a=e.constructionStarts.reduce((o,r)=>o+(r.drawing_files||[]).length+(r.base_photo_files||[]).length,0);return`
    <section class="grid">
      <article class="panel">
        <div class="panel-head">
          <h2>첨부 파일 보기</h2>
          <div class="row-actions">
            <button>결제 ${t}개</button>
            <button>업체 ${n}개</button>
            <button>공사 ${a}개</button>
          </div>
        </div>
        <div class="notice">결제 신청 증빙, 업체 계좌 서류, 공사 시작 도면/기초사진을 한 화면에서 확인합니다. 파일명을 누르면 새 창으로 열립니다.</div>
        ${D(["구분","대상","파일 종류","파일명","크기","등록일","보기"],Ne(e))}
      </article>
    </section>
  `}function He(e){return`
    <section class="grid two">
      ${Ve()}
      <article class="panel">
        <div class="panel-head">
          <h2>공사 시작 접수 목록</h2>
          <button>${e.constructionStarts.length}건 접수</button>
        </div>
        ${D(["매장","평수","벽장/상부장","벽장/하부장","진열장/유리장","카운터/서랍형 1200","카운터/선반형 1800","카운터/선반형 1600","테이블","광고판","도면","기초 사진","특이사항"],Ue(e))}
      </article>
    </section>
  `}function Zt(e){return e.quantity&&e.madeAmount?Math.round(e.madeAmount/e.quantity):e.allocationUnit||e.baseUnit||0}function Qe(){return Nt.map(e=>`
      <tr>
        <td>${e.group}</td>
        <td>${e.name}</td>
        <td class="money">${_(e.baseUnit)}</td>
        <td class="money">${_(e.allocationUnit)}</td>
        <td>${e.quantity||"-"}</td>
        <td class="money">${_(e.madeAmount)}</td>
        <td class="money">${_(Zt(e))}</td>
      </tr>`)}function Je(e){return e.constructionStarts.map(t=>{const n=$(t.wall_upper_count??t.wall_cabinet_count),a=$(t.wall_lower_count),o=$(t.display_fixture_count??t.fixture_count),r=$(t.counter_drawer_1200_count??t.counter_count),s=$(t.counter_shelf_1800_count),i=$(t.counter_shelf_1600_count),u=$(t.table_count),g=gt(e,t.store_name);return`
      <tr>
        <td>${c(t.store_name)}</td>
        <td>${n}</td>
        <td>${a}</td>
        <td>${o}</td>
        <td>${r}</td>
        <td>${s}</td>
        <td>${i}</td>
        <td>${u}</td>
        <td class="money">${_(g)}</td>
      </tr>`})}function We(e){return`
    <section class="grid two">
      <article class="panel">
        <div class="panel-head">
          <h2>진열장 원가 기준</h2>
          <button>엑셀 반영</button>
        </div>
        <div class="notice">아름가구 산출금액과 휴가기간 가구 산출금액을 기준으로 먼저 원가 기준표를 만들었습니다. 실제 견적서에는 공사 시작 접수의 벽장/진열장/카운터 수량을 곱해 반영합니다.</div>
        ${D(["구분","항목","아름가구 기준","휴가기간 단가","제작수량","제작금액","평균 단가"],Qe())}
      </article>
      <article class="panel">
        <div class="panel-head">
          <h2>매장별 예상 배분</h2>
          <button>${e.constructionStarts.length}개 매장</button>
        </div>
        ${D(["매장","벽장/상부장","벽장/하부장","진열장/유리장","카운터/서랍형 1200","카운터/선반형 1800","카운터/선반형 1600","테이블","예상 반영 금액"],Je(e))}
      </article>
    </section>
  `}function Ye(e){return`
    <section class="grid two">
      ${Be()}
      <article class="panel">
        <div class="panel-head">
          <h2>결제 계좌 목록</h2>
          <button>${e.vendors.length}개 등록</button>
        </div>
        ${D(["업체","분류","은행","계좌번호","예금주","첨부","상태","수정"],Wt(e))}
      </article>
    </section>
  `}function Ze(e){const t=rt(e,W),n=rt(e,"진행중").length,a=rt(e,"완료").length;return`
    <section class="grid">
      <article class="panel">
        <div class="panel-head">
          <h2>매장별 정산 및 문서 마감</h2>
          <button>${t.length}개 매장</button>
        </div>
        <div class="segmented-tabs">
          <button class="${W==="진행중"?"active":""}" data-store-management-filter="진행중">진행중 ${n}건</button>
          <button class="${W==="완료"?"active":""}" data-store-management-filter="완료">완료 매장 ${a}건</button>
        </div>
        <div class="notice">승인된 결제건과 진열장 원가 배분 금액을 합산한 뒤, 매장별 마진율을 적용해 최종 견적금액을 확정합니다. 확정 금액은 견적서와 계약서 작성 기준으로 사용합니다.</div>
        ${D(["매장","상태","승인 원가","진열장 배분","원가 합계","마진율(%)","공급가","부가세","최종 견적금액","처리"],Te(e,W))}
      </article>
    </section>
  `}function Ge(e){return Qt(e).map(t=>`<option value="${p(t)}" ${t===H?"selected":""}>${p(t)}</option>`).join("")}function tn(e){return e.map((t,n)=>`
      <tr>
        <td>${n+1}</td>
        <td>${c(t.name)}</td>
        <td class="money">${_(t.cost)}</td>
        <td class="money">${_(t.supply)}</td>
        <td class="money">${_(t.vat)}</td>
        <td class="money">${_(t.total)}</td>
      </tr>`)}function Lt(e,t){const n=Qt(e),a=H||n[0]||"";H=a;const o=it(e,a),r=o.margin_rate??35,s=bt(e,a,r),i=Ie(e,a,r),u=jt(e,a),g=t==="계약서 생성",d=c(a);return a?`
    <section class="grid">
      <article class="panel">
        <div class="panel-head">
          <h2>${c(t)}</h2>
          <div class="row-actions">
            <select data-document-store-select>${Ge(e)}</select>
            <button data-print-document>인쇄</button>
          </div>
        </div>
        <div class="notice">매장별 공사관리에서 저장한 마진율과 승인 완료된 결제 원가를 기준으로 작성됩니다.</div>
        <section class="document-preview">
          <div class="document-title">
            <span>HAKA Construction</span>
            <h1>${g?"공사 계약서":"공사 견적서"}</h1>
            <p>${pt()}</p>
          </div>
          <div class="document-meta">
            <div><span>매장명</span><strong>${d}</strong></div>
            <div><span>평수</span><strong>${u.area?`${c(u.area)}평`:"-"}</strong></div>
            <div><span>상태</span><strong>${c(o.quote_status,"정산중")}</strong></div>
            <div><span>마진율</span><strong>${c(r)}%</strong></div>
          </div>
          ${g?`<div class="contract-body">
                  <p>본 계약은 ${d} 공사와 관련하여 승인된 결제 원가와 진열장 원가 배분 내역을 기준으로 산정한 최종 공사금액을 계약 기준으로 한다.</p>
                  <p>최종 계약금액은 부가세 포함 ${_(s.totalAmount)}이며, 세부 산출 내역은 아래 견적 기준표를 따른다.</p>
                </div>`:""}
          ${D(["No","항목","원가","마진 반영 공급가","부가세","합계"],tn(i))}
          <div class="document-total">
            <span>원가 합계 ${_(s.costTotal)}</span>
            <span>공급가 ${_(s.supplyAmount)}</span>
            <span>부가세 ${_(s.vatAmount)}</span>
            <strong>최종 금액 ${_(s.totalAmount)}</strong>
          </div>
          <div class="signature-grid">
            <div><span>발주자</span><strong>하카코리아</strong></div>
            <div><span>시공/관리</span><strong>HAKA Construction</strong></div>
          </div>
        </section>
      </article>
    </section>
  `:`<section class="panel empty-panel"><h2>${c(t)}</h2><p>문서를 만들 매장 데이터가 아직 없습니다.</p></section>`}function en(e){return e.userRoles.map(t=>`
      <tr>
        <td>${c(t.email)}</td>
        <td><span class="badge ${t.role==="admin"?"green":"blue"}">${c(Mt[t.role]||t.role)}</span></td>
        <td>${c(t.created_at?String(t.created_at).slice(0,10):"-")}</td>
      </tr>`)}function nn(){return Object.entries(mt).map(([e,t])=>`
      <tr>
        <td><strong>${c(e)}</strong></td>
        <td>${t.map(n=>`<span class="menu-chip">${c(n)}</span>`).join("")}</td>
        <td>${t.length}개</td>
      </tr>`)}function an(e){return`
    <section class="grid two">
      <article class="panel">
        <div class="panel-head">
          <h2>사용자 권한</h2>
          <button>${e.userRoles.length}명 등록</button>
        </div>
        ${D(["이메일","권한","등록일"],en(e))}
      </article>
      <article class="panel">
        <div class="panel-head">
          <h2>권한별 메뉴</h2>
          <button>${Object.keys(mt).length}개 권한</button>
        </div>
        ${D(["권한","볼 수 있는 메뉴","메뉴 수"],nn())}
      </article>
    </section>
  `}function on(e){const t=ne[e]||["기능 범위 정의","입력 항목 확정","데이터 연결"];return`
    <section class="panel empty-panel">
      <h2>${c(e)}</h2>
      <p>이 메뉴는 다음 단계에서 구현할 기능입니다. 지금은 확인해야 할 항목을 먼저 고정해둔 상태입니다.</p>
      <div class="check-list">
        ${t.map(n=>`<span>${c(n)}</span>`).join("")}
      </div>
    </section>
  `}function rn(e){return f==="대시보드"?Pe(e):f==="공사 시작 접수"?He(e):f==="결제 신청"?je(e):f==="결제 계좌 관리"||f==="업체/계좌 관리"?Ye(e):f==="첨부 파일 보기"?Xe(e):f==="매장별 공사 관리"?Ze(e):f==="진열장 원가 배분"?We(e):f==="견적서 생성"?Lt(e,"견적서 생성"):f==="계약서 생성"?Lt(e,"계약서 생성"):f==="은행 이체 파일 생성"?Ke(e):f==="관리자 설정"?an(e):on(f)}function T(){return mt[j]||Ut}function sn(){return`
    <div class="session-box">
      <span>${c(S==null?void 0:S.email,"")}</span>
      <strong>${c(j)}</strong>
      <button data-sign-out>로그아웃</button>
    </div>
  `}function R(e=""){const t=document.querySelector("#app");t.className="auth-shell",t.innerHTML=`
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
  `,document.querySelector("#auth-form").addEventListener("submit",cn),document.querySelector("[data-auth-action='signup']").addEventListener("click",ln),document.querySelector("[data-auth-action='resend']").addEventListener("click",un)}async function cn(e){e.preventDefault();const t=new FormData(e.currentTarget),n=String(t.get("email")||"").trim(),a=String(t.get("password")||"");if(!n||!a){R("이메일과 비밀번호를 입력해 주세요.");return}const{data:o,error:r}=await m.auth.signInWithPassword({email:n,password:a});if(r){R(`로그인 실패: ${r.message}`);return}S=o.user,j=await Bt(S),f=T()[0],await x()}async function ln(){const e=document.querySelector("#auth-form"),t=new FormData(e),n=String(t.get("email")||"").trim(),a=String(t.get("password")||"");if(!n||!a){R("계정을 만들 이메일과 비밀번호를 입력해 주세요.");return}const{error:o}=await m.auth.signUp({email:n,password:a,options:{emailRedirectTo:window.location.origin+window.location.pathname}});if(o){R(`회원가입 실패: ${o.message}`);return}R("계정이 생성됐습니다. 이메일 확인이 필요한 경우 메일 인증 후 로그인해 주세요.")}async function un(){const e=document.querySelector("#auth-form"),t=new FormData(e),n=String(t.get("email")||"").trim();if(!n){R("인증메일을 다시 받을 이메일을 입력해 주세요.");return}const{error:a}=await m.auth.resend({type:"signup",email:n,options:{emailRedirectTo:window.location.origin+window.location.pathname}});if(a){R(`인증메일 재발송 실패: ${a.message}`);return}R("인증메일을 다시 보냈습니다. 새로 받은 메일의 링크를 눌러 주세요.")}async function dn(){await m.auth.signOut(),S=null,j="인테리어 공사실장",R("로그아웃되었습니다.")}function y(e=""){var s,i,u,g,d,b,L,w,A,F,q,N,U,J,G,K;const t=document.querySelector("#app");t.className=f==="은행 이체 파일 생성"?"transfer-app":"",T().includes(f)||(f=T()[0]),t.innerHTML=`
    <aside class="sidebar">
      <div class="brand">
        <span class="brand-mark">H</span>
        <div>
          <strong>HAKA Construction</strong>
          <small>공사비 관리 시스템</small>
        </div>
      </div>
      <nav>
        ${T().map(l=>`<button data-view="${l}" class="${l===f?"active":""}">${l}</button>`).join("")}
      </nav>
    </aside>
    <main class="shell ${f==="은행 이체 파일 생성"?"transfer-shell":""}">
      <header class="topbar">
        <div>
          <p>${j}</p>
          <h1>${c(f)}</h1>
        </div>
        <div class="actions">
          ${sn()}
          ${T().includes("엑셀 업로드")?'<button data-view-link="엑셀 업로드">엑셀 업로드</button>':""}
          ${T().includes("결제 신청")?'<button class="primary" data-view-link="결제 신청">결제 신청</button>':""}
        </div>
      </header>

      ${e?`<div class="toast">${e}</div>`:""}
      ${Y.length?`<div class="data-alert">
              <strong>일부 데이터 확인 필요</strong>
              <span>${Y.map(l=>p(l)).join(" / ")}</span>
            </div>`:""}
      ${rn(C)}
    </main>
  `,document.querySelectorAll("[data-view]").forEach(l=>{l.addEventListener("click",()=>{f=l.dataset.view,y()})}),document.querySelectorAll("[data-role]").forEach(l=>{l.addEventListener("click",()=>{j=l.dataset.role,T().includes(f)||(f=T()[0]),y()})}),(s=document.querySelector("[data-sign-out]"))==null||s.addEventListener("click",dn),document.querySelectorAll("[data-view-link]").forEach(l=>{l.addEventListener("click",()=>{T().includes(l.dataset.viewLink)&&(f=l.dataset.viewLink),y()})});const n=document.querySelector("#payment-form");n&&(n.addEventListener("submit",ce),(i=n.querySelector("[name='vendor']"))==null||i.addEventListener("input",()=>Et(n)),(u=n.querySelector("[name='vendor']"))==null||u.addEventListener("change",()=>Et(n)),(g=n.querySelector("[name='estimate_total']"))==null||g.addEventListener("input",()=>At(n)),(d=n.querySelector("[name='payment_type']"))==null||d.addEventListener("change",()=>At(n)),(b=n.querySelector("[name='amount']"))==null||b.addEventListener("input",()=>ot(n)),(L=n.querySelector("[name='tax_type']"))==null||L.addEventListener("change",()=>ot(n)),ot(n));const a=document.querySelector("#vendor-form");a&&a.addEventListener("submit",le),document.querySelectorAll("[data-vendor-edit]").forEach(l=>{l.addEventListener("click",()=>qe(Number(l.dataset.vendorEdit)))});const o=document.querySelector("#store-form");o&&o.addEventListener("submit",ue);const r=document.querySelector("#construction-start-form");r&&r.addEventListener("submit",de),(w=document.querySelector("[data-transfer-filter]"))==null||w.addEventListener("click",l=>{var I,M,z,V;const v=l.currentTarget.closest(".transfer-panel")||l.currentTarget.closest(".panel")||document;E={startDate:((I=v.querySelector("[data-transfer-start]"))==null?void 0:I.value)||"",endDate:((M=v.querySelector("[data-transfer-end]"))==null?void 0:M.value)||"",keyword:((z=v.querySelector("[data-transfer-keyword]"))==null?void 0:z.value)||"",readyStatus:((V=v.querySelector("[data-transfer-ready-status]"))==null?void 0:V.value)||"all"},y()}),(A=document.querySelector("[data-transfer-clear]"))==null||A.addEventListener("click",()=>{E={startDate:"",endDate:"",keyword:"",readyStatus:"all"},y()}),document.querySelectorAll("[data-bank-transfer-download]").forEach(l=>{l.addEventListener("click",async()=>{var V,O,tt,et;const v=l.dataset.bankTransferDownload==="range",I=l.closest(".transfer-panel")||l.closest(".panel")||document,M=[...document.querySelectorAll(".transfer-select:checked:not(:disabled)")].map(ct=>ct.value),z={startDate:((V=I.querySelector("[data-transfer-start]"))==null?void 0:V.value)||"",endDate:((O=I.querySelector("[data-transfer-end]"))==null?void 0:O.value)||"",keyword:((tt=I.querySelector("[data-transfer-keyword]"))==null?void 0:tt.value)||"",readyStatus:((et=I.querySelector("[data-transfer-ready-status]"))==null?void 0:et.value)||"all"};if(v&&(!z.startDate||!z.endDate)){y("조회 결과 전체 다운로드는 시작일과 종료일을 모두 선택한 뒤 사용할 수 있습니다.");return}if(!v&&!M.length){y("이체 파일로 만들 결제건을 먼저 체크해 주세요. 전체 승인건 자동 다운로드는 막아두었습니다.");return}await ke(C,{...v?z:{},...!v&&M.length?{selectedIds:M}:{}})})}),(F=document.querySelector("[data-select-pending-payments]"))==null||F.addEventListener("change",l=>{document.querySelectorAll(".payment-select").forEach(v=>{v.checked=l.currentTarget.checked})}),document.querySelectorAll(".payment-select").forEach(l=>{l.addEventListener("click",v=>v.stopPropagation())}),(q=document.querySelector("[data-select-transfer-payments]"))==null||q.addEventListener("change",l=>{document.querySelectorAll(".transfer-select:not(:disabled)").forEach(v=>{v.checked=l.currentTarget.checked})}),document.querySelectorAll(".transfer-select").forEach(l=>{l.addEventListener("click",v=>v.stopPropagation())}),(N=document.querySelector("[data-transfer-complete-selected]"))==null||N.addEventListener("click",()=>{const l=[...document.querySelectorAll(".transfer-select:checked:not(:disabled)")].map(v=>v.value);Se(l)}),(U=document.querySelector("[data-approve-selected-payments]"))==null||U.addEventListener("click",()=>{const l=[...document.querySelectorAll(".payment-select:checked")].map(v=>v.value);pe(l)}),document.querySelectorAll("[data-quote-finalize]").forEach(l=>{l.addEventListener("click",()=>Ct(l.dataset.quoteFinalize,"견적 확정"))}),document.querySelectorAll("[data-contract-complete]").forEach(l=>{l.addEventListener("click",()=>Ct(l.dataset.contractComplete,"계약 완료"))}),document.querySelectorAll("[data-store-management-filter]").forEach(l=>{l.addEventListener("click",()=>{W=l.dataset.storeManagementFilter,y()})}),document.querySelectorAll("[data-document-view][data-document-store]").forEach(l=>{l.addEventListener("click",()=>{H=l.dataset.documentStore,f=l.dataset.documentView,y()})}),(J=document.querySelector("[data-document-store-select]"))==null||J.addEventListener("change",l=>{H=l.currentTarget.value,y()}),(G=document.querySelector("[data-print-document]"))==null||G.addEventListener("click",()=>window.print()),document.querySelectorAll("[data-payment-edit]").forEach(l=>{l.addEventListener("click",()=>{P=Number(l.dataset.paymentEdit),f="결제 신청",y("선택한 결제 신청을 수정 중입니다.")})}),(K=document.querySelector("[data-payment-edit-cancel]"))==null||K.addEventListener("click",()=>{P=null,y("수정 모드를 종료했습니다.")}),document.querySelectorAll("[data-payment-id][data-payment-status]").forEach(l=>{l.addEventListener("click",()=>{const v=l.dataset.paymentStatus;v==="반려"&&!window.confirm("이 결제 신청을 취소 처리할까요? 기록은 반려 상태로 남습니다.")||me(Number(l.dataset.paymentId),v)})})}Vt();
