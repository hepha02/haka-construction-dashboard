import{createClient as wt}from"https://esm.sh/@supabase/supabase-js@2.49.1";(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const a of document.querySelectorAll('link[rel="modulepreload"]'))o(a);new MutationObserver(a=>{for(const r of a)if(r.type==="childList")for(const s of r.addedNodes)s.tagName==="LINK"&&s.rel==="modulepreload"&&o(s)}).observe(document,{childList:!0,subtree:!0});function n(a){const r={};return a.integrity&&(r.integrity=a.integrity),a.referrerPolicy&&(r.referrerPolicy=a.referrerPolicy),a.crossOrigin==="use-credentials"?r.credentials="include":a.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function o(a){if(a.ep)return;a.ep=!0;const r=n(a);fetch(a.href,r)}})();const St="https://yqemtsbdnypgmkuyncxh.supabase.co",kt="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlxZW10c2JkbnlwZ21rdXluY3hoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODAyNjYwMTUsImV4cCI6MjA5NTg0MjAxNX0.gwgdCncqRKKgC8ebj7qIdT-vA4J-wOVd2O9DSa7xEOs",u=wt(St,kt),X="construction-start-files",Z="payment-files",G="vendor-files",it=["철거","금속공사","목작업","목자재","전기","전기자재","간판","임시간판","돌출간판","실내광고외","광고 시트","자판기 유리작업","자동문 /강화도어","자동문","강화도어","페인트자재","도장공사","타일자재","타일 부자재","타일시공","타일","싱크 개수대","설비","진열장","카운터 역채널","인조대리석","유리/무늬목작접등 기타잡비","유리","무늬목","기타잡비","스카이","에어컨","소방설비","가구운송","엠프","오픈현수막","열쇠/철물","열쇠","철물","청소","폐기물","추가공사","기타"],g={payments:[],stores:[{id:1,name:"성수 플래그십",area:52,status:"완료",budget:21e7,spent:1984e5},{id:2,name:"부산 센텀",area:47,status:"진행중",budget:186e6,spent:1227e5},{id:3,name:"대전 둔산",area:39,status:"진행중",budget:144e6,spent:882e5},{id:4,name:"제주 노형",area:42,status:"미착공",budget:158e6,spent:0}],vendors:[{id:1,name:"도원인테리어",category:"시공",bank:"신한은행",account_number:"110-000-000001",account_holder:"도원인테리어",risk:"정상",total:1245e5},{id:2,name:"한빛전기",category:"전기",bank:"국민은행",account_number:"004-000-000002",account_holder:"한빛전기",risk:"정상",total:738e5},{id:3,name:"서진설비",category:"설비",bank:"하나은행",account_number:"352-000-000003",account_holder:"서진설비",risk:"증빙확인",total:412e5}],userRoles:[],paymentItems:it,constructionStarts:[],storeQuotes:[]},ct=[{group:"벽장",name:"상부장",baseUnit:115600,allocationUnit:57100,quantity:40,madeAmount:126e4},{group:"벽장",name:"하부장",baseUnit:167500,allocationUnit:63500,quantity:40,madeAmount:224e4},{group:"진열장",name:"유리장",baseUnit:287e3,allocationUnit:163500,quantity:40,madeAmount:266e4},{group:"카운터",name:"카운터 서랍형 1200",baseUnit:831200,allocationUnit:727200,quantity:10,madeAmount:56e4},{group:"카운터",name:"카운터 선반형 1800",baseUnit:395800,allocationUnit:395800,quantity:4,madeAmount:256e3},{group:"카운터",name:"카운터 선반형 1600",baseUnit:350600,allocationUnit:350600,quantity:2,madeAmount:122e3},{group:"테이블",name:"테이블 600*1200",baseUnit:22e4,allocationUnit:161e3,quantity:5,madeAmount:805e3},{group:"도장",name:"도장 / 총 58통",baseUnit:18e4,allocationUnit:18e4,quantity:4,madeAmount:72e4}],lt=["대시보드","엑셀 업로드","공사 시작 접수","결제 신청","결제 계좌 관리","매장별 공사 관리","진열장 원가 배분","견적서 생성","계약서 생성","은행 이체 파일 생성","관리자 설정"],W={"전체 관리자":lt,"인테리어 공사실장":["공사 시작 접수","결제 신청","결제 계좌 관리","진열장 원가 배분"]},ut={admin:"전체 관리자",interior_manager:"인테리어 공사실장","전체 관리자":"전체 관리자","인테리어 공사실장":"인테리어 공사실장"},xt={"엑셀 업로드":["결제 신청 내역 엑셀 업로드","필수 컬럼 검증","중복/오류 행 표시"],"진열장 원가 배분":["매장별 진열장 비용 배분","공용 비용 자동 분배","평당 원가 반영"],"견적서 생성":["매장/업체 기준 견적서 생성","공사항목별 금액 자동 합산","PDF/문서 다운로드"],"계약서 생성":["업체 정보 기반 계약서 생성","계좌/사업자 정보 자동 반영","계약 상태 관리"],"은행 이체 파일 생성":["승인된 결제 건만 추출","은행 업로드용 파일 생성","이체 전 검증"],"관리자 설정":["사용자 권한","승인 단계","상태/분류 코드 관리"]};let b=g,p="대시보드",N="인테리어 공사실장",$=null,L={startDate:"",endDate:""};const m=e=>new Intl.NumberFormat("ko-KR",{style:"currency",currency:"KRW",maximumFractionDigits:0}).format(e||0),K=()=>new Date().toISOString().slice(0,10),F=e=>Number(String(e).replace(/[^\d]/g,"")),h=e=>Number(e||0),j=(e,t)=>String(e||"").trim().slice(0,t),qt=e=>String(e||"").replace(/[^\d]/g,""),Ct=e=>({"일시 지급":1,"선금 50%":.5,"잔금 50%":.5})[e]||0,dt=e=>e==="사업소득 3.3%"?.033:0,y=e=>String(e||"").replace(/&/g,"&amp;").replace(/"/g,"&quot;").replace(/</g,"&lt;").replace(/>/g,"&gt;"),J=e=>String(e||"file").replace(/[^\w.\-가-힣]/g,"_"),M=e=>({승인:"green",신청:"amber",반려:"red",진행중:"blue",완료:"green",미착공:"gray",정상:"green",증빙확인:"amber",정산중:"amber","견적 확정":"blue","계약 완료":"green"})[e]||"gray";async function k(){if(!u)return g;const[e,t,n,o,a,r,s]=await Promise.all([u.from("payments").select("*").order("requested_at",{ascending:!1}).order("id",{ascending:!1}).limit(500),u.from("stores").select("*").order("id",{ascending:!0}),u.from("vendors").select("*").order("id",{ascending:!0}),u.from("construction_starts").select("*").order("created_at",{ascending:!1}).order("id",{ascending:!1}).limit(30),u.from("user_roles").select("email, role, created_at").order("email",{ascending:!0}),u.from("construction_cost_parts").select("part_name").order("part_name",{ascending:!0}),u.from("store_quotes").select("*").order("updated_at",{ascending:!1})]),i=r.error?g.paymentItems:[...new Set([...it,...r.data.map(f=>f.part_name).filter(Boolean)])];return{payments:e.error?g.payments:e.data,stores:t.error?g.stores:t.data,vendors:n.error?g.vendors:n.data,constructionStarts:o.error?g.constructionStarts:o.data,userRoles:a.error?g.userRoles:a.data,paymentItems:i,storeQuotes:s.error?g.storeQuotes:s.data}}async function mt(e){if(!u||!(e!=null&&e.email))return"인테리어 공사실장";const{data:t,error:n}=await u.from("user_roles").select("role").ilike("email",e.email).maybeSingle();return n||!(t!=null&&t.role)?"인테리어 공사실장":ut[t.role]||"인테리어 공사실장"}async function At(){var t;if(!u){b=await k(),N="전체 관리자",_();return}const{data:e}=await u.auth.getSession();if($=((t=e.session)==null?void 0:t.user)||null,!$){E();return}N=await mt($),p=q()[0],b=await k(),_()}function Dt(e,t,n){return e.payments.find(o=>{const a=o.vendor.trim()===t.trim(),r=Math.abs(o.amount-n)/Math.max(n,1);return a&&r<=.1})}function Et(e,t,n){return e.payments.find(o=>{const a=String(o.store||"").trim()===t.trim(),r=String(o.payment_item||"").trim()===n.trim();return a&&r})}async function tt(e,t){const n=Array.from(e||[]).filter(a=>a.size>0);if(!n.length)return[];if(!u)return n.map(a=>({name:a.name,type:a.type,size:a.size,path:"",url:""}));const o=[];for(const a of n){const r=`${($==null?void 0:$.id)||"user"}/${t}/${Date.now()}-${crypto.randomUUID()}-${J(a.name)}`,{error:s}=await u.storage.from(X).upload(r,a,{contentType:a.type||"application/octet-stream",upsert:!1});if(s)throw s;const{data:i}=u.storage.from(X).getPublicUrl(r);o.push({name:a.name,type:a.type,size:a.size,path:r,url:i.publicUrl})}return o}async function B(e,t){const n=Array.from(e||[]).filter(a=>a.size>0);if(!n.length)return[];if(!u)return n.map(a=>({name:a.name,type:a.type,size:a.size,path:"",url:""}));const o=[];for(const a of n){const r=`${($==null?void 0:$.id)||"user"}/${t}/${Date.now()}-${crypto.randomUUID()}-${J(a.name)}`,{error:s}=await u.storage.from(Z).upload(r,a,{contentType:a.type,upsert:!1});if(s)throw s;const{data:i}=u.storage.from(Z).getPublicUrl(r);o.push({name:a.name,type:a.type,size:a.size,path:r,url:i.publicUrl})}return o}async function et(e,t){const n=Array.from(e||[]).filter(a=>a.size>0);if(!n.length)return[];if(!u)return n.map(a=>({name:a.name,type:a.type,size:a.size,path:"",url:""}));const o=[];for(const a of n){const r=`${($==null?void 0:$.id)||"user"}/${t}/${Date.now()}-${crypto.randomUUID()}-${J(a.name)}`,{error:s}=await u.storage.from(G).upload(r,a,{contentType:a.type,upsert:!1});if(s)throw s;const{data:i}=u.storage.from(G).getPublicUrl(r);o.push({name:a.name,type:a.type,size:a.size,path:r,url:i.publicUrl})}return o}async function Lt(e){e.preventDefault();const t=e.currentTarget,n=t.querySelector("button[type='submit']"),o=t.querySelector("[data-form-message]"),a=new FormData(t),r=String(a.get("store")||"").trim(),s=String(a.get("vendor")||"").trim(),i=String(a.get("payment_item")||"").trim(),f=F(a.get("estimate_total")),v=String(a.get("payment_type")||"일시 지급"),d=F(a.get("amount")),c=String(a.get("tax_type")||"일반 송금"),x=Math.round(d*dt(c)),S=d-x,A=String(a.get("vendor_bank")||"").trim(),O=String(a.get("vendor_account_number")||"").trim(),z=String(a.get("vendor_account_holder")||"").trim(),l=String(a.get("memo")||"").trim(),w=Dt(b,s,d),I=Et(b,r,i),R=a.getAll("estimate_files").filter(D=>D.size>0),P=a.getAll("tax_invoice_files").filter(D=>D.size>0),Q=a.getAll("id_card_files").filter(D=>D.size>0);if(!r||!s||!i||!f||!d||!A||!O||!z){o.textContent="매장명, 업체, 결제 항목, 견적 총액, 신청 금액, 이체 계좌를 모두 입력해 주세요.",o.className="form-message error";return}if(c==="일반 송금"&&(!R.length||!P.length)){o.textContent="일반 송금은 견적서와 세금계산서를 첨부해야 합니다.",o.className="form-message error";return}if(c==="사업소득 3.3%"&&!Q.length){o.textContent="사업소득 3.3% 지급은 주민등록증 첨부가 필요합니다.",o.className="form-message error";return}n.disabled=!0,n.textContent="저장 중",o.textContent="첨부 자료를 업로드하고 있습니다.",o.className=w?"form-message warning":"form-message";let H={};try{H={estimate_files:await B(R,"estimates"),tax_invoice_files:await B(P,"tax-invoices"),id_card_files:await B(Q,"id-cards")}}catch(D){n.disabled=!1,n.textContent="검토 요청 생성",o.textContent=`첨부 업로드 실패: ${D.message}`,o.className="form-message error";return}o.textContent=w?`중복 의심: ${w.store} / ${m(w.amount)} 건과 비슷합니다.`:I?`확인 필요: ${r} / ${i} 항목에 기존 신청이 있습니다. 중복이 아니면 견적서에는 같은 항목 합계로 반영됩니다.`:"신청 건을 저장하고 있습니다.",o.className=w||I?"form-message warning":"form-message";const Y={store:r,vendor:s,payment_item:i,estimate_total:f,payment_type:v,amount:d,vendor_bank:A,vendor_account_number:O,vendor_account_holder:z,tax_type:c,withholding_amount:x,net_amount:S,attachment_files:H,estimate_group_mode:"매장별 항목 합산",estimate_group_key:`${r}::${i}`,memo:l,status:"신청",requested_at:K()};if(!u)g.payments=[{id:Date.now(),...Y},...g.payments];else{const{error:D}=await u.from("payments").insert(Y);if(D){n.disabled=!1,n.textContent="검토 요청 생성",o.textContent=`저장 실패: ${D.message}`,o.className="form-message error";return}}t.reset(),b=await k(),_(w?"신청이 저장됐습니다. 중복 의심 건은 결제 검토에서 확인하세요.":"신청이 저장됐습니다.")}async function It(e){var d;e.preventDefault();const t=e.currentTarget,n=t.querySelector("button[type='submit']"),o=t.querySelector("[data-vendor-message]"),a=new FormData(t),r=Number(a.get("vendor_id")||0),s={name:String(a.get("name")||"").trim(),category:String(a.get("category")||"").trim(),bank:String(a.get("bank")||"").trim(),account_number:String(a.get("account_number")||"").trim(),account_holder:String(a.get("account_holder")||"").trim()},i=a.getAll("business_license_files").filter(c=>c.size>0),f=a.getAll("bankbook_files").filter(c=>c.size>0);if(!s.name||!s.category||!s.bank||!s.account_number||!s.account_holder){o.textContent="업체명, 분류, 은행, 계좌번호, 예금주를 모두 입력해 주세요.",o.className="form-message error";return}if(!r&&(!i.length||!f.length)){o.textContent="최초 등록 시 사업자등록증과 통장사본을 모두 첨부해 주세요.",o.className="form-message error";return}n.disabled=!0,n.textContent="저장 중",o.textContent="첨부 자료를 업로드하고 있습니다.",o.className="form-message";let v={};try{const c=r?((d=b.vendors.find(x=>x.id===r))==null?void 0:d.attachment_files)||{}:{};v={business_license_files:[...c.business_license_files||[],...await et(i,"business-licenses")],bankbook_files:[...c.bankbook_files||[],...await et(f,"bankbooks")]}}catch(c){n.disabled=!1,n.textContent="계좌 저장",o.textContent=`첨부 업로드 실패: ${c.message}`,o.className="form-message error";return}if(s.attachment_files=v,o.textContent="결제 계좌 정보를 저장하고 있습니다.",!u)g.vendors=r?g.vendors.map(c=>c.id===r?{...c,...s}:c):[{id:Date.now(),...s,risk:"정상",total:0},...g.vendors];else{const{error:c}=r?await u.from("vendors").update(s).eq("id",r):await u.from("vendors").insert(s);if(c){n.disabled=!1,n.textContent="계좌 저장",o.textContent=`저장 실패: ${c.message}`,o.className="form-message error";return}}t.reset(),b=await k(),p="결제 계좌 관리",_(r?"결제 계좌 정보가 수정됐습니다.":"결제 계좌 정보가 저장됐습니다.")}async function Rt(e){e.preventDefault();const t=e.currentTarget,n=t.querySelector("button[type='submit']"),o=t.querySelector("[data-store-message]"),a=new FormData(t),r={name:String(a.get("name")||"").trim(),area:Number(a.get("area")),status:String(a.get("status")||"미착공"),budget:F(a.get("budget")),spent:F(a.get("spent"))};if(!r.name||!r.area||!r.budget){o.textContent="매장명, 면적, 예산을 입력해 주세요.",o.className="form-message error";return}if(n.disabled=!0,n.textContent="저장 중",o.textContent="매장 공사 정보를 저장하고 있습니다.",o.className="form-message",!u)g.stores=[{id:Date.now(),...r},...g.stores];else{const{error:s}=await u.from("stores").insert(r);if(s){n.disabled=!1,n.textContent="매장 저장",o.textContent=`저장 실패: ${s.message}`,o.className="form-message error";return}}t.reset(),b=await k(),p="매장별 공사 관리",_("매장 공사 정보가 저장됐습니다.")}async function Nt(e){e.preventDefault();const t=e.currentTarget,n=t.querySelector("button[type='submit']"),o=t.querySelector("[data-construction-start-message]"),a=new FormData(t),r=h(a.get("wall_upper_count")),s=h(a.get("wall_lower_count")),i=h(a.get("display_fixture_count")),f=h(a.get("counter_drawer_1200_count")),v=h(a.get("counter_shelf_1800_count")),d=h(a.get("counter_shelf_1600_count")),c=f+v+d,x=Number(a.get("table_count")||0),S={store_name:String(a.get("store_name")||"").trim(),area:Number(a.get("area")),wall_upper_count:r,wall_lower_count:s,counter_drawer_1200_count:f,counter_shelf_1800_count:v,counter_shelf_1600_count:d,wall_cabinet_count:r+s,display_fixture_count:i,counter_count:c,fixture_count:r+s+i+c,table_count:x,sign_count:Number(a.get("sign_count")||0),special_notes:String(a.get("special_notes")||"").trim()};if(!S.store_name||!S.area){o.textContent="매장명과 평수는 꼭 입력해 주세요.",o.className="form-message error";return}n.disabled=!0,n.textContent="저장 중",o.textContent="도면과 사진 파일을 업로드하고 있습니다.",o.className="form-message";try{S.drawing_files=await tt(a.getAll("drawing_files"),"drawings"),S.base_photo_files=await tt(a.getAll("base_photo_files"),"base-photos")}catch(A){n.disabled=!1,n.textContent="공사 시작 정보 저장",o.textContent=`파일 업로드 실패: ${A.message}`,o.className="form-message error";return}if(o.textContent="공사 시작 정보를 저장하고 있습니다.",!u)g.constructionStarts=[{id:Date.now(),created_at:new Date().toISOString(),...S},...g.constructionStarts];else{const{error:A}=await u.from("construction_starts").insert(S);if(A){n.disabled=!1,n.textContent="공사 시작 정보 저장",o.textContent=`저장 실패: ${A.message}`,o.className="form-message error";return}}t.reset(),b=await k(),p="공사 시작 접수",_("공사 시작 정보가 저장됐습니다. 결제 신청 매장 검색에도 반영됐습니다.")}async function Tt(e,t){if(!(!e||!["승인","반려"].includes(t))){if(!u)g.payments=g.payments.map(n=>n.id===e?{...n,status:t}:n);else{const{data:n,error:o}=await u.from("payments").update({status:t}).eq("id",e).eq("status","신청").select("id").maybeSingle();if(o){_(`상태 변경 실패: ${o.message}`);return}if(!n){b=await k(),p="결제 신청",_("상태 변경 실패: 이미 처리됐거나 권한이 없습니다. 새로고침 후 다시 확인해 주세요.");return}}b=await k(),p="결제 신청",_(`결제 신청이 ${t} 처리됐습니다.`)}}async function Ft(e){const t=[...new Set(e.map(Number).filter(Boolean))];if(!t.length){_("승인할 결제 신청을 먼저 선택해 주세요.");return}if(!u){g.payments=g.payments.map(a=>t.includes(a.id)&&a.status==="신청"?{...a,status:"승인"}:a),b=await k(),p="결제 신청",_(`${t.length}건을 승인 처리했습니다.`);return}const{data:n,error:o}=await u.from("payments").update({status:"승인"}).in("id",t).eq("status","신청").select("id");if(o){_(`선택 승인 실패: ${o.message}`);return}b=await k(),p="결제 신청",_(`${(n==null?void 0:n.length)||0}건을 승인 처리했습니다. 이제 엑셀 다운로드를 누르면 승인된 건이 내려갑니다.`)}async function nt(e,t){const n=document.querySelector(`[data-margin-rate="${CSS.escape(e)}"]`),o=Number((n==null?void 0:n.value)||35),a=_t(b,e,o),r=ft(b,e),s={store_name:e,quote_status:t,margin_rate:o,direct_cost:a.directCost,fixture_cost:a.fixtureCost,cost_total:a.costTotal,supply_amount:a.supplyAmount,vat_amount:a.vatAmount,total_amount:a.totalAmount,quote_confirmed_at:t==="견적 확정"?new Date().toISOString():r.quote_confirmed_at||new Date().toISOString(),contract_completed_at:t==="계약 완료"?new Date().toISOString():r.contract_completed_at||null,updated_at:new Date().toISOString()};if(!e||!a.costTotal||o<0){_("견적 확정 전에 승인된 결제 또는 진열장 배분 원가와 마진율을 확인해 주세요.");return}if(!u)g.storeQuotes=[{id:r.id||Date.now(),...s},...g.storeQuotes.filter(i=>i.store_name!==e)];else{const{error:i}=await u.from("store_quotes").upsert(s,{onConflict:"store_name"});if(i){_(`매장 견적 저장 실패: ${i.message}`);return}}b=await k(),p="매장별 공사 관리",_(t==="계약 완료"?`${e} 계약 완료 상태로 저장됐습니다.`:`${e} 견적이 확정됐습니다.`)}function Ut(e){var o;const t=String(e||"").replace(/\s/g,"");return((o=[["신한","신한"],["국민","국민"],["기업","기업"],["우리","우리"],["하나","하나"],["농협","농협"],["축협","농협"],["카카오","카카오"],["토스","토스"],["케이뱅크","케이뱅크"],["부산","부산"],["대구","아이엠뱅크"],["아이엠","아이엠뱅크"],["새마을","새마을금고"],["신협","신협"],["우체국","우체국"],["전북","전북"],["광주","광주"],["경남","경남"],["수협","수협"]].find(([a])=>t.includes(a)))==null?void 0:o[1])||j(e,6)}function Ot(e,t){const n=String(t.vendor||"").trim();return e.vendors.find(o=>String(o.name||"").trim()===n)||{}}function pt(e){return e.payments.filter(t=>t.status==="승인")}function zt(e,t){const n=Ot(e,t),o=t.vendor_bank||n.bank,a=t.vendor_account_number||n.account_number,r=t.vendor_account_holder||n.account_holder||t.vendor,s=Number(t.net_amount||t.amount||0),i=`${t.store||""} ${t.payment_item||""}`.trim();return{bank:Ut(o),account:qt(a),holder:r,amount:s,withdrawMemo:"하카공사비",depositMemo:j(r,7),payerCode:"",memo:j(i,10),key:j(`${t.id||""}-${t.requested_at||K()}`,20),payment:t,vendor:n,ready:!!(o&&a&&r&&s>0)}}function Pt(e,t,n){const o=String(e||"").slice(0,10);return!(!o||t&&o<t||n&&o>n)}function U(e,t={}){return pt(e).filter(n=>Pt(n.requested_at,t.startDate,t.endDate)).map(n=>zt(e,n))}function at(e,t=""){return`<td${t?` style="${t}"`:""}>${y(e)}</td>`}function Mt(e,t={}){const n=U(e,t).filter(c=>c.ready);if(!n.length){_("다운로드할 승인 완료 건이 없거나, 업체 계좌정보가 비어 있습니다.");return}const o=["*입금은행","*입금계좌","*입금액","고객관리성명"],a=n.map(c=>[c.bank,c.account,c.amount,c.holder]),s=`
    <html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel">
      <head>
        <meta charset="UTF-8" />
        <!--[if gte mso 9]><xml><x:ExcelWorkbook><x:ExcelWorksheets><x:ExcelWorksheet><x:Name>입력정보</x:Name><x:WorksheetOptions><x:DisplayGridlines/></x:WorksheetOptions></x:ExcelWorksheet></x:ExcelWorksheets></x:ExcelWorkbook></xml><![endif]-->
      </head>
      <body><table>${[`<tr>${o.map(c=>at(c)).join("")}</tr>`,...a.map(c=>`<tr>${c.map((x,S)=>at(x,S===1?"mso-number-format:'\\@';":"")).join("")}</tr>`)].join("")}</table></body>
    </html>`,i=new Blob([s],{type:"application/vnd.ms-excel;charset=utf-8"}),f=URL.createObjectURL(i),v=document.createElement("a");v.href=f;const d=t.startDate||t.endDate?`_${t.startDate||"처음"}_${t.endDate||"오늘"}`:"";v.download=`은행대량이체${d}_${K()}.xls`,document.body.appendChild(v),v.click(),v.remove(),URL.revokeObjectURL(f)}function ot(e){const t=e.querySelector("[name='estimate_total']"),n=e.querySelector("[name='payment_type']"),o=e.querySelector("[name='amount']"),a=Ct(n.value),r=F(t.value);!a||!r||(o.value=String(Math.round(r*a)),V(e))}function V(e){var i,f;const t=F((i=e.querySelector("[name='amount']"))==null?void 0:i.value),n=((f=e.querySelector("[name='tax_type']"))==null?void 0:f.value)||"일반 송금",o=Math.round(t*dt(n)),a=t-o,r=e.querySelector("[data-withholding-preview]"),s=e.querySelector("[data-net-preview]");r&&(r.textContent=m(o)),s&&(s.textContent=m(a))}function rt(e){var o;const t=String(((o=e.querySelector("[name='vendor']"))==null?void 0:o.value)||"").trim(),n=b.vendors.find(a=>String(a.name||"").trim()===t);n&&(e.querySelector("[name='vendor_bank']").value=n.bank||"",e.querySelector("[name='vendor_account_number']").value=n.account_number||"",e.querySelector("[name='vendor_account_holder']").value=n.account_holder||"")}function jt(e){const t=b.vendors.find(o=>o.id===e),n=document.querySelector("#vendor-form");!t||!n||(n.querySelector("[name='vendor_id']").value=t.id,n.querySelector("[name='name']").value=t.name||"",n.querySelector("[name='category']").value=t.category||"",n.querySelector("[name='bank']").value=t.bank||"",n.querySelector("[name='account_number']").value=t.account_number||"",n.querySelector("[name='account_holder']").value=t.account_holder||"",n.querySelector("button[type='submit']").textContent="계좌 수정",n.querySelector("[data-vendor-message]").textContent="기존 계좌 정보를 수정 중입니다. 새 파일을 첨부하면 기존 파일에 추가됩니다.")}function Vt(e){const t=e.stores.filter(d=>d.status==="완료").length,n=e.stores.filter(d=>d.status==="진행중").length,o=e.stores.filter(d=>d.document_required).length,a=e.payments.filter(d=>d.status==="승인").reduce((d,c)=>d+c.amount,0),r=e.stores.reduce((d,c)=>d+Number(c.spent||0),0),s=e.payments.filter(d=>d.status==="신청").length,i=e.stores.filter(d=>String(d.name||"").includes("직영점")).length,f=e.stores.reduce((d,c)=>d+Number(c.area||0),0),v=Math.round(r/Math.max(f,1));return[["완료된 매장",`${t}개`,"엑셀 공사 상태 기준"],["진행중인 매장",`${n}개`,"시공 또는 비용 검수 중"],["전체 공사비",m(r),"엑셀 합계 기준"],["문서 생성 대상",`${o}개`,"강남압구정 행부터 아래"],["대기중인 결제",`${s}건`,"승인 전 검토 필요"],["직영점",`${i}개`,"지점명 기준"],["승인된 결제",m(a),"지급 승인 완료"],["평균 평당 원가",m(v),"엑셀 합계/평수 기준"]]}function C(e,t){return`
    <div class="table-wrap">
      <table>
        <thead><tr>${e.map(n=>`<th>${n}</th>`).join("")}</tr></thead>
        <tbody>${t.join("")}</tbody>
      </table>
    </div>
  `}function Bt(e){return e.payments.map(t=>`
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
        <td>${vt(t)}</td>
        <td>${t.estimate_group_mode||"매장별 항목 합산"}</td>
        <td><span class="badge ${M(t.status)}">${t.status}</span></td>
        <td>${t.requested_at}</td>
      </tr>`)}function Wt(e,t=!1){return e.payments.length?`
    <div class="payment-review-list">
      ${e.payments.map(n=>`
            <details class="payment-review-card">
              <summary>
                <div class="payment-summary-main">
                  ${n.status==="신청"&&t?`<input type="checkbox" class="payment-select" value="${n.id}" aria-label="${y(n.store)} 선택" />`:""}
                  <div>
                    <strong>${n.store}</strong>
                    <span>${n.vendor}</span>
                  </div>
                </div>
                <div class="payment-summary-meta">
                  <span>${n.payment_item||"-"}</span>
                  <strong>${m(n.net_amount||n.amount)}</strong>
                  <span class="badge ${M(n.status)}">${n.status}</span>
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
                <div><span>첨부 자료</span><strong>${vt(n)}</strong></div>
                <div><span>견적서 반영</span><strong>${n.estimate_group_mode||"매장별 항목 합산"}</strong></div>
                <div><span>신청일</span><strong>${n.requested_at}</strong></div>
              </div>
              <div class="payment-detail-actions">
                ${n.status==="신청"&&t?`<button class="primary" data-payment-id="${n.id}" data-payment-status="승인">승인</button>
                       <button data-payment-id="${n.id}" data-payment-status="반려">반려</button>`:n.status==="신청"?'<span class="muted">승인 대기</span>':'<span class="muted">처리 완료</span>'}
              </div>
            </details>`).join("")}
    </div>
  `:'<div class="empty">표시할 결제 신청이 없습니다.</div>'}function Kt(e){return U(e).map(t=>`
      <tr>
        <td>${t.payment.store}</td>
        <td>${t.payment.vendor}</td>
        <td>${t.bank||"-"}</td>
        <td>${t.account||"-"}</td>
        <td>${t.holder||"-"}</td>
        <td class="money">${m(t.amount)}</td>
        <td>${t.payment.tax_type||"일반 송금"}</td>
        <td><span class="badge ${t.ready?"green":"red"}">${t.ready?"다운로드 가능":"계좌정보 확인"}</span></td>
      </tr>`)}function ft(e,t){return e.storeQuotes.find(n=>n.store_name===t)||{}}function Jt(e,t){return e.constructionStarts.find(n=>n.store_name===t)||{}}function T(e,t){const n=ct.find(o=>{const a=o.group===e,r=t.every(s=>o.name.includes(s));return a&&r});return n?$t(n):0}function Qt(e,t){return e.payments.filter(n=>{const o=n.store===t,a=n.status==="승인",r=String(n.payment_item||""),s=r.includes("진열장")||r.includes("벽장")||r.includes("카운터");return o&&a&&!s}).reduce((n,o)=>n+Number(o.amount||0),0)}function gt(e,t){const n=Jt(e,t),o=h(n.wall_upper_count??n.wall_cabinet_count),a=h(n.wall_lower_count),r=h(n.display_fixture_count??n.fixture_count),s=h(n.counter_drawer_1200_count??n.counter_count),i=h(n.counter_shelf_1800_count),f=h(n.counter_shelf_1600_count),v=h(n.table_count);return o*T("벽장",["상부장"])+a*T("벽장",["하부장"])+r*T("진열장",["유리장"])+s*T("카운터",["서랍형","1200"])+i*T("카운터",["선반형","1800"])+f*T("카운터",["선반형","1600"])+v*T("테이블",["600*1200"])}function bt(e){const t=[...e.stores.map(n=>n.name),...e.constructionStarts.map(n=>n.store_name),...e.payments.map(n=>n.store)];return[...new Set(t.map(n=>String(n||"").trim()).filter(Boolean))]}function _t(e,t,n){const o=Qt(e,t),a=gt(e,t),r=o+a,s=Math.round(r*(1+h(n)/100)),i=Math.round(s*.1),f=s+i;return{directCost:o,fixtureCost:a,costTotal:r,supplyAmount:s,vatAmount:i,totalAmount:f}}function Ht(e){return bt(e).map(t=>{const n=ft(e,t),o=n.margin_rate??35,a=_t(e,t,o),r=n.quote_status||"정산중";return`
      <tr>
        <td>${t}</td>
        <td><span class="badge ${M(r)}">${r}</span></td>
        <td class="money">${m(a.directCost)}</td>
        <td class="money">${m(a.fixtureCost)}</td>
        <td class="money">${m(a.costTotal)}</td>
        <td><input class="inline-input" data-margin-rate="${y(t)}" inputmode="decimal" value="${o}" /></td>
        <td class="money">${m(a.supplyAmount)}</td>
        <td class="money">${m(a.vatAmount)}</td>
        <td class="money">${m(a.totalAmount)}</td>
        <td>
          <div class="row-actions">
            <button data-quote-finalize="${y(t)}">견적 확정</button>
            <button data-contract-complete="${y(t)}">계약 완료</button>
          </div>
        </td>
      </tr>`})}function Yt(e){return e.stores.map(t=>`
      <tr>
        <td>${t.region||"-"}</td>
        <td>${t.name}</td>
        <td>${t.fixture_count||0}</td>
        <td>${t.area}평</td>
        <td class="money">${m(t.budget)}</td>
        <td><span class="badge ${M(t.status)}">${t.status}</span></td>
        <td><span class="badge ${t.document_required?"blue":"gray"}">${t.document_required?"생성 대상":"출력 완료"}</span></td>
      </tr>`)}function st(e,t=""){const n=Array.isArray(e)?e:[];return n.length?n.map(o=>o.url?`<a href="${y(o.url)}" target="_blank" rel="noreferrer">${y(o.name||"파일")}</a>`:`<span>${y(o.name||"파일")}</span>`).join("<br />"):t||"-"}function vt(e){const t=e.attachment_files||{},n=(t.estimate_files||[]).length,o=(t.tax_invoice_files||[]).length,a=(t.id_card_files||[]).length;return e.tax_type==="사업소득 3.3%"?a?`주민등록증 ${a}개`:"주민등록증 필요":`견적서 ${n}개 / 세금계산서 ${o}개`}function Xt(e){return e.constructionStarts.map(t=>`
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
        <td>${st(t.drawing_files,t.drawing_note)}</td>
        <td>${st(t.base_photo_files,t.base_photo_note)}</td>
        <td>${t.special_notes||"-"}</td>
      </tr>`)}function ht(e){return e.vendors.map(t=>{const n=t.attachment_files||{},o=(n.business_license_files||[]).length,a=(n.bankbook_files||[]).length;return`
        <tr>
          <td>${t.name}</td>
          <td>${t.category}</td>
          <td>${t.bank}</td>
          <td>${t.account_number||"-"}</td>
          <td>${t.account_holder||"-"}</td>
          <td>사업자 ${o}개 / 통장 ${a}개</td>
          <td><span class="badge ${M(t.risk)}">${t.risk}</span></td>
          <td><button data-vendor-edit="${t.id}">수정</button></td>
        </tr>`})}function Zt(e){return e.vendors.map(t=>`<option value="${y(t.name)}">${y(t.name)} / ${y(t.bank)} ${y(t.account_number||"")}</option>`).join("")}function Gt(e){const n=[...e.constructionStarts.map(a=>({name:a.store_name,area:a.area,status:"공사 시작 접수"})),...e.stores],o=new Set;return n.filter(a=>{const r=String(a.name||"").trim();return!r||o.has(r)?!1:(o.add(r),!0)}).map(a=>`<option value="${y(a.name)}">${y(a.name)} / ${y(a.area)}평 / ${y(a.status)}</option>`).join("")}function te(e){return e.paymentItems.map(t=>`<option value="${y(t)}">${y(t)}</option>`).join("")}function yt(){return`
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
            ${Gt(b)}
          </datalist>
        </label>
        <label>협력업체
          <input name="vendor" list="vendor-suggestions" placeholder="직접입력 또는 업체명 검색" autocomplete="off" />
          <datalist id="vendor-suggestions">
            <option value="직접입력">직접입력</option>
            ${Zt(b)}
          </datalist>
        </label>
        <label>입금은행<input name="vendor_bank" placeholder="업체 선택 시 자동 입력, 변경 가능" autocomplete="off" /></label>
        <label>입금계좌<input name="vendor_account_number" placeholder="예: 110-000-000000" autocomplete="off" /></label>
        <label>예금주<input name="vendor_account_holder" placeholder="예: 도원인테리어" autocomplete="off" /></label>
        <label>결제 항목
          <input name="payment_item" list="payment-item-suggestions" placeholder="직접입력 또는 공사항목 검색" autocomplete="off" />
          <datalist id="payment-item-suggestions">
            <option value="직접입력">직접입력</option>
            ${te(b)}
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
  `}function ee(){return`
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
  `}function ne(){return`
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
  `}function ae(e){return`
    <section class="kpis">
      ${Vt(e).map(([t,n,o])=>`
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
        ${C(["매장","업체","입금은행","입금계좌","예금주","항목","견적 총액","결제 방식","이번 신청액","지급 유형","원천징수","실지급액","첨부 자료","견적서 반영","상태","신청일"],Bt(e))}
      </article>

      <article class="panel">
        <div class="panel-head">
          <h2>매장 공사 현황</h2>
          <button data-view-link="매장별 공사 관리">관리</button>
        </div>
        ${C(["지역","매장","진열장","평수","공사비 합계","상태","문서"],Yt(e))}
      </article>
    </section>

    <section class="grid lower">
      <article class="panel">
        <div class="panel-head">
          <h2>주요 협력업체</h2>
          <button data-view-link="결제 계좌 관리">계좌 추가</button>
        </div>
        ${C(["업체","분류","은행","계좌번호","예금주","첨부","상태","수정"],ht(e))}
      </article>
      ${yt()}
    </section>
  `}function oe(e){const t=q().includes("은행 이체 파일 생성"),n=e.payments.filter(s=>s.status==="신청").length,o=pt(e).length,a=U(e).filter(s=>s.ready).length,r=U(e).filter(s=>s.ready).reduce((s,i)=>s+i.amount,0);return`
    <section class="grid two">
      ${yt()}
      <article class="panel">
        <div class="panel-head">
          <h2>결제 신청 검토</h2>
          <div class="row-actions">
            <button>승인 대기 ${n}건</button>
            ${t?`<button data-bank-transfer-download>이체 파일 ${a}건</button>`:""}
          </div>
        </div>
        ${t?`<div class="bulk-actions">
                <label class="check-control">
                  <input type="checkbox" data-select-pending-payments />
                  승인대기 전체 선택
                </label>
                <button class="primary" data-approve-selected-payments>선택 승인</button>
                <button data-bank-transfer-download>승인건 엑셀 다운로드</button>
              </div>`:""}
        ${Wt(e,t)}
      </article>
    </section>
    ${t?`<section class="panel transfer-download-panel">
            <div>
              <h2>은행 이체 엑셀 다운로드</h2>
              <p>승인된 결제건 중 계좌정보가 있는 건만 은행 대량이체 파일로 내려받습니다.</p>
            </div>
            <div class="transfer-summary">
              <span>승인 ${o}건</span>
              <span>다운로드 가능 ${a}건</span>
              <strong>${m(r)}</strong>
            </div>
            <div class="row-actions">
              <button class="primary" data-bank-transfer-download>엑셀 다운로드</button>
              <button data-view-link="은행 이체 파일 생성">상세 보기</button>
            </div>
          </section>`:""}
  `}function re(e){const t=U(e),n=U(e,L),o=n.filter(s=>s.ready).length,a=n.filter(s=>s.ready).reduce((s,i)=>s+i.amount,0),r=L.startDate||L.endDate?`${L.startDate||"처음"} ~ ${L.endDate||"오늘"}`:"전체 기간";return`
    <section class="grid two">
      <article class="panel">
        <div class="panel-head">
          <h2>날짜별 지급 내역 조회</h2>
          <button>${r}</button>
        </div>
        <div class="notice">승인된 결제건을 날짜별로 조회합니다. 현재 날짜 기준은 결제 신청일입니다.</div>
        <div class="date-filter">
          <label>시작일<input type="date" data-transfer-start value="${y(L.startDate)}" /></label>
          <label>종료일<input type="date" data-transfer-end value="${y(L.endDate)}" /></label>
          <button class="primary" data-transfer-filter>조회</button>
          <button data-transfer-clear>전체 보기</button>
          <button data-bank-transfer-download="range">조회 결과 엑셀 다운로드</button>
        </div>
        ${C(["매장","업체","입금은행","입금계좌","예금주","입금액","지급 유형","상태"],Kt({...e,payments:n.map(s=>s.payment)}))}
      </article>
      <article class="panel">
        <div class="panel-head">
          <h2>조회 요약</h2>
          <button>${o}건 가능</button>
        </div>
        <section class="kpis compact-kpis">
          <article class="kpi">
            <span>전체 승인 건</span>
            <strong>${t.length}건</strong>
            <small>전체 기간 승인 건</small>
          </article>
          <article class="kpi">
            <span>조회된 건</span>
            <strong>${n.length}건</strong>
            <small>${r}</small>
          </article>
          <article class="kpi">
            <span>계좌 확인 완료</span>
            <strong>${o}건</strong>
            <small>은행/계좌/예금주 확인 완료</small>
          </article>
          <article class="kpi">
            <span>총 이체액</span>
            <strong>${m(a)}</strong>
            <small>실지급액 기준</small>
          </article>
        </section>
      </article>
    </section>
  `}function se(e){return`
    <section class="grid two">
      ${ne()}
      <article class="panel">
        <div class="panel-head">
          <h2>공사 시작 접수 목록</h2>
          <button>${e.constructionStarts.length}건 접수</button>
        </div>
        ${C(["매장","평수","벽장/상부장","벽장/하부장","진열장/유리장","카운터/서랍형 1200","카운터/선반형 1800","카운터/선반형 1600","테이블","광고판","도면","기초 사진","특이사항"],Xt(e))}
      </article>
    </section>
  `}function $t(e){return e.quantity&&e.madeAmount?Math.round(e.madeAmount/e.quantity):e.allocationUnit||e.baseUnit||0}function ie(){return ct.map(e=>`
      <tr>
        <td>${e.group}</td>
        <td>${e.name}</td>
        <td class="money">${m(e.baseUnit)}</td>
        <td class="money">${m(e.allocationUnit)}</td>
        <td>${e.quantity||"-"}</td>
        <td class="money">${m(e.madeAmount)}</td>
        <td class="money">${m($t(e))}</td>
      </tr>`)}function ce(e){return e.constructionStarts.map(t=>{const n=h(t.wall_upper_count??t.wall_cabinet_count),o=h(t.wall_lower_count),a=h(t.display_fixture_count??t.fixture_count),r=h(t.counter_drawer_1200_count??t.counter_count),s=h(t.counter_shelf_1800_count),i=h(t.counter_shelf_1600_count),f=h(t.table_count),v=gt(e,t.store_name);return`
      <tr>
        <td>${t.store_name}</td>
        <td>${n}</td>
        <td>${o}</td>
        <td>${a}</td>
        <td>${r}</td>
        <td>${s}</td>
        <td>${i}</td>
        <td>${f}</td>
        <td class="money">${m(v)}</td>
      </tr>`})}function le(e){return`
    <section class="grid two">
      <article class="panel">
        <div class="panel-head">
          <h2>진열장 원가 기준</h2>
          <button>엑셀 반영</button>
        </div>
        <div class="notice">아름가구 산출금액과 휴가기간 가구 산출금액을 기준으로 먼저 원가 기준표를 만들었습니다. 실제 견적서에는 공사 시작 접수의 벽장/진열장/카운터 수량을 곱해 반영합니다.</div>
        ${C(["구분","항목","아름가구 기준","휴가기간 단가","제작수량","제작금액","평균 단가"],ie())}
      </article>
      <article class="panel">
        <div class="panel-head">
          <h2>매장별 예상 배분</h2>
          <button>${e.constructionStarts.length}개 매장</button>
        </div>
        ${C(["매장","벽장/상부장","벽장/하부장","진열장/유리장","카운터/서랍형 1200","카운터/선반형 1800","카운터/선반형 1600","테이블","예상 반영 금액"],ce(e))}
      </article>
    </section>
  `}function ue(e){return`
    <section class="grid two">
      ${ee()}
      <article class="panel">
        <div class="panel-head">
          <h2>결제 계좌 목록</h2>
          <button>${e.vendors.length}개 등록</button>
        </div>
        ${C(["업체","분류","은행","계좌번호","예금주","첨부","상태","수정"],ht(e))}
      </article>
    </section>
  `}function de(e){return`
    <section class="grid">
      <article class="panel">
        <div class="panel-head">
          <h2>매장별 정산 및 문서 마감</h2>
          <button>${bt(e).length}개 매장</button>
        </div>
        <div class="notice">승인된 결제건과 진열장 원가 배분 금액을 합산한 뒤, 매장별 마진율을 적용해 최종 견적금액을 확정합니다. 확정 금액은 견적서와 계약서 작성 기준으로 사용합니다.</div>
        ${C(["매장","상태","승인 원가","진열장 배분","원가 합계","마진율(%)","공급가","부가세","최종 견적금액","처리"],Ht(e))}
      </article>
    </section>
  `}function me(e){return e.userRoles.map(t=>`
      <tr>
        <td>${t.email}</td>
        <td><span class="badge ${t.role==="admin"?"green":"blue"}">${ut[t.role]||t.role}</span></td>
        <td>${t.created_at?String(t.created_at).slice(0,10):"-"}</td>
      </tr>`)}function pe(){return Object.entries(W).map(([e,t])=>`
      <tr>
        <td><strong>${e}</strong></td>
        <td>${t.map(n=>`<span class="menu-chip">${n}</span>`).join("")}</td>
        <td>${t.length}개</td>
      </tr>`)}function fe(e){return`
    <section class="grid two">
      <article class="panel">
        <div class="panel-head">
          <h2>사용자 권한</h2>
          <button>${e.userRoles.length}명 등록</button>
        </div>
        ${C(["이메일","권한","등록일"],me(e))}
      </article>
      <article class="panel">
        <div class="panel-head">
          <h2>권한별 메뉴</h2>
          <button>${Object.keys(W).length}개 권한</button>
        </div>
        ${C(["권한","볼 수 있는 메뉴","메뉴 수"],pe())}
      </article>
    </section>
  `}function ge(e){const t=xt[e]||["기능 범위 정의","입력 항목 확정","데이터 연결"];return`
    <section class="panel empty-panel">
      <h2>${e}</h2>
      <p>이 메뉴는 다음 단계에서 구현할 기능입니다. 지금은 확인해야 할 항목을 먼저 고정해둔 상태입니다.</p>
      <div class="check-list">
        ${t.map(n=>`<span>${n}</span>`).join("")}
      </div>
    </section>
  `}function be(e){return p==="대시보드"?ae(e):p==="공사 시작 접수"?se(e):p==="결제 신청"?oe(e):p==="결제 계좌 관리"||p==="업체/계좌 관리"?ue(e):p==="매장별 공사 관리"?de(e):p==="진열장 원가 배분"?le(e):p==="은행 이체 파일 생성"?re(e):p==="관리자 설정"?fe(e):ge(p)}function q(){return W[N]||lt}function _e(){return`
    <div class="session-box">
      <span>${($==null?void 0:$.email)||""}</span>
      <strong>${N}</strong>
      <button data-sign-out>로그아웃</button>
    </div>
  `}function E(e=""){const t=document.querySelector("#app");t.className="auth-shell",t.innerHTML=`
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
  `,document.querySelector("#auth-form").addEventListener("submit",ve),document.querySelector("[data-auth-action='signup']").addEventListener("click",he),document.querySelector("[data-auth-action='resend']").addEventListener("click",ye)}async function ve(e){e.preventDefault();const t=new FormData(e.currentTarget),n=String(t.get("email")||"").trim(),o=String(t.get("password")||"");if(!n||!o){E("이메일과 비밀번호를 입력해 주세요.");return}const{data:a,error:r}=await u.auth.signInWithPassword({email:n,password:o});if(r){E(`로그인 실패: ${r.message}`);return}$=a.user,N=await mt($),p=q()[0],b=await k(),_()}async function he(){const e=document.querySelector("#auth-form"),t=new FormData(e),n=String(t.get("email")||"").trim(),o=String(t.get("password")||"");if(!n||!o){E("계정을 만들 이메일과 비밀번호를 입력해 주세요.");return}const{error:a}=await u.auth.signUp({email:n,password:o,options:{emailRedirectTo:window.location.origin+window.location.pathname}});if(a){E(`회원가입 실패: ${a.message}`);return}E("계정이 생성됐습니다. 이메일 확인이 필요한 경우 메일 인증 후 로그인해 주세요.")}async function ye(){const e=document.querySelector("#auth-form"),t=new FormData(e),n=String(t.get("email")||"").trim();if(!n){E("인증메일을 다시 받을 이메일을 입력해 주세요.");return}const{error:o}=await u.auth.resend({type:"signup",email:n,options:{emailRedirectTo:window.location.origin+window.location.pathname}});if(o){E(`인증메일 재발송 실패: ${o.message}`);return}E("인증메일을 다시 보냈습니다. 새로 받은 메일의 링크를 눌러 주세요.")}async function $e(){await u.auth.signOut(),$=null,N="인테리어 공사실장",E("로그아웃되었습니다.")}function _(e=""){var s,i,f,v,d,c,x,S,A,O,z;const t=document.querySelector("#app");t.className="",q().includes(p)||(p=q()[0]),t.innerHTML=`
    <aside class="sidebar">
      <div class="brand">
        <span class="brand-mark">H</span>
        <div>
          <strong>HAKA Construction</strong>
          <small>공사비 관리 시스템</small>
        </div>
      </div>
      <nav>
        ${q().map(l=>`<button data-view="${l}" class="${l===p?"active":""}">${l}</button>`).join("")}
      </nav>
    </aside>
    <main class="shell">
      <header class="topbar">
        <div>
          <p>${N}</p>
          <h1>${p}</h1>
        </div>
        <div class="actions">
          ${_e()}
          ${q().includes("엑셀 업로드")?'<button data-view-link="엑셀 업로드">엑셀 업로드</button>':""}
          ${q().includes("결제 신청")?'<button class="primary" data-view-link="결제 신청">결제 신청</button>':""}
        </div>
      </header>

      ${e?`<div class="toast">${e}</div>`:""}
      ${be(b)}
    </main>
  `,document.querySelectorAll("[data-view]").forEach(l=>{l.addEventListener("click",()=>{p=l.dataset.view,_()})}),document.querySelectorAll("[data-role]").forEach(l=>{l.addEventListener("click",()=>{N=l.dataset.role,q().includes(p)||(p=q()[0]),_()})}),(s=document.querySelector("[data-sign-out]"))==null||s.addEventListener("click",$e),document.querySelectorAll("[data-view-link]").forEach(l=>{l.addEventListener("click",()=>{q().includes(l.dataset.viewLink)&&(p=l.dataset.viewLink),_()})});const n=document.querySelector("#payment-form");n&&(n.addEventListener("submit",Lt),(i=n.querySelector("[name='vendor']"))==null||i.addEventListener("input",()=>rt(n)),(f=n.querySelector("[name='vendor']"))==null||f.addEventListener("change",()=>rt(n)),(v=n.querySelector("[name='estimate_total']"))==null||v.addEventListener("input",()=>ot(n)),(d=n.querySelector("[name='payment_type']"))==null||d.addEventListener("change",()=>ot(n)),(c=n.querySelector("[name='amount']"))==null||c.addEventListener("input",()=>V(n)),(x=n.querySelector("[name='tax_type']"))==null||x.addEventListener("change",()=>V(n)),V(n));const o=document.querySelector("#vendor-form");o&&o.addEventListener("submit",It),document.querySelectorAll("[data-vendor-edit]").forEach(l=>{l.addEventListener("click",()=>jt(Number(l.dataset.vendorEdit)))});const a=document.querySelector("#store-form");a&&a.addEventListener("submit",Rt);const r=document.querySelector("#construction-start-form");r&&r.addEventListener("submit",Nt),(S=document.querySelector("[data-transfer-filter]"))==null||S.addEventListener("click",l=>{var I,R;const w=l.currentTarget.closest(".panel")||document;L={startDate:((I=w.querySelector("[data-transfer-start]"))==null?void 0:I.value)||"",endDate:((R=w.querySelector("[data-transfer-end]"))==null?void 0:R.value)||""},_()}),(A=document.querySelector("[data-transfer-clear]"))==null||A.addEventListener("click",()=>{L={startDate:"",endDate:""},_()}),document.querySelectorAll("[data-bank-transfer-download]").forEach(l=>{l.addEventListener("click",()=>{var R,P;const w=l.dataset.bankTransferDownload==="range",I=l.closest(".panel")||document;Mt(b,w?{startDate:((R=I.querySelector("[data-transfer-start]"))==null?void 0:R.value)||"",endDate:((P=I.querySelector("[data-transfer-end]"))==null?void 0:P.value)||""}:{})})}),(O=document.querySelector("[data-select-pending-payments]"))==null||O.addEventListener("change",l=>{document.querySelectorAll(".payment-select").forEach(w=>{w.checked=l.currentTarget.checked})}),document.querySelectorAll(".payment-select").forEach(l=>{l.addEventListener("click",w=>w.stopPropagation())}),(z=document.querySelector("[data-approve-selected-payments]"))==null||z.addEventListener("click",()=>{const l=[...document.querySelectorAll(".payment-select:checked")].map(w=>w.value);Ft(l)}),document.querySelectorAll("[data-quote-finalize]").forEach(l=>{l.addEventListener("click",()=>nt(l.dataset.quoteFinalize,"견적 확정"))}),document.querySelectorAll("[data-contract-complete]").forEach(l=>{l.addEventListener("click",()=>nt(l.dataset.contractComplete,"계약 완료"))}),document.querySelectorAll("[data-payment-id][data-payment-status]").forEach(l=>{l.addEventListener("click",()=>{Tt(Number(l.dataset.paymentId),l.dataset.paymentStatus)})})}At();
