(function(){const i=document.createElement("link").relList;if(i&&i.supports&&i.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))l(e);new MutationObserver(e=>{for(const t of e)if(t.type==="childList")for(const o of t.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&l(o)}).observe(document,{childList:!0,subtree:!0});function c(e){const t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?t.credentials="include":e.crossOrigin==="anonymous"?t.credentials="omit":t.credentials="same-origin",t}function l(e){if(e.ep)return;e.ep=!0;const t=c(e);fetch(e.href,t)}})();const y="modulepreload",g=function(r){return"/haka-construction-dashboard/"+r},p={},w=function(i,c,l){let e=Promise.resolve();if(c&&c.length>0){let o=function(s){return Promise.all(s.map(u=>Promise.resolve(u).then(d=>({status:"fulfilled",value:d}),d=>({status:"rejected",reason:d}))))};document.getElementsByTagName("link");const n=document.querySelector("meta[property=csp-nonce]"),f=(n==null?void 0:n.nonce)||(n==null?void 0:n.getAttribute("nonce"));e=o(c.map(s=>{if(s=g(s),s in p)return;p[s]=!0;const u=s.endsWith(".css"),d=u?'[rel="stylesheet"]':"";if(document.querySelector(`link[href="${s}"]${d}`))return;const a=document.createElement("link");if(a.rel=u?"stylesheet":y,u||(a.as="script"),a.crossOrigin="",a.href=s,f&&a.setAttribute("nonce",f),document.head.appendChild(a),u)return new Promise((m,h)=>{a.addEventListener("load",m),a.addEventListener("error",()=>h(new Error(`Unable to preload CSS for ${s}`)))})}))}function t(o){const n=new Event("vite:preloadError",{cancelable:!0});if(n.payload=o,window.dispatchEvent(n),!n.defaultPrevented)throw o}return e.then(o=>{for(const n of o||[])n.status==="rejected"&&t(n.reason);return i().catch(t)})};async function E(r,i,c=15e3){let l;try{return await Promise.race([r,new Promise((e,t)=>{l=setTimeout(()=>t(new Error(i)),c)})])}finally{clearTimeout(l)}}function L(){const r=document.querySelector("#app");r.className="auth-shell",r.innerHTML=`
    <main class="auth-page">
      <section class="auth-panel" aria-live="polite">
        <h1>로그인 상태를 확인하고 있습니다</h1>
        <p>잠시만 기다려 주세요.</p>
      </section>
    </main>
  `}function P(){const r=document.querySelector("#app");r.className="auth-shell",r.innerHTML=`
    <main class="auth-page">
      <section class="auth-panel" role="alert">
        <h1>화면을 불러오지 못했습니다</h1>
        <p>인터넷 연결을 확인한 뒤 새로고침해 주세요. 문제가 계속되면 관리자에게 알려주세요.</p>
        <a href="./">새로고침</a>
      </section>
    </main>
  `}async function v(){try{const{startApp:r}=await E(w(()=>import("./main-BaO1uhs5.js").then(i=>i.m),[]),"화면 파일을 불러오는 시간이 초과됐습니다.");await r()}catch(r){console.error("Application startup failed:",r),P()}}v();export{w as _,L as r,E as w};
