import{S as h,a as P,i as w}from"./assets/vendor-5401a4b0.js";(function(){const n=document.createElement("link").relList;if(n&&n.supports&&n.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))r(e);new MutationObserver(e=>{for(const t of e)if(t.type==="childList")for(const i of t.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&r(i)}).observe(document,{childList:!0,subtree:!0});function o(e){const t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?t.credentials="include":e.crossOrigin==="anonymous"?t.credentials="omit":t.credentials="same-origin",t}function r(e){if(e.ep)return;e.ep=!0;const t=o(e);fetch(e.href,t)}})();const m=document.querySelector(".gallery-o"),v=document.querySelector(".search-form");new h(".gallery-o");const $={captions:!0,captionSelector:"img",captionType:"attr",captionsData:"alt",captionPosition:"bottom",animation:250};function B(s){const n=s.map(({largeImageURL:r,webformatURL:e,tags:t,likes:i,views:l,comments:d,downloads:u})=>`
        <div class="gallery">
            <a href="${r}">
            <img src="${e}" alt="${t}" title="${t}" width="380" height="220" />
            <ul class="info-cards-container">
                <li class="info-cards-elements">likes<span>${i}</span></li>
                <li class="info-cards-elements">views<span>${l}</span></li>
                <li class="info-cards-elements">comments<span>${d}</span></li>
                <li class="info-cards-elements">downloads<span>${u}</span></li>
            </ul>
            </a>
        </div>
        `).join("");m.innerHTML=n;const o=new h(".gallery-o a",$);o.on("show.simplelightbox"),o.refresh(),v.reset()}function T(s){const o=s.hits.map(({largeImageURL:t,webformatURL:i,tags:l,likes:d,views:u,comments:q,downloads:O})=>`
        <div class="gallery">
            <a href="${t}">
            <img src="${i}" alt="${l}" title="${l}" width="380" height="220" />
            <ul class="info-cards-container">
                <li class="info-cards-elements">likes<span>${d}</span></li>
                <li class="info-cards-elements">views<span>${u}</span></li>
                <li class="info-cards-elements">comments<span>${q}</span></li>
                <li class="info-cards-elements">downloads<span>${O}</span></li>
            </ul>
            </a>
        </div>
        `).join("");m.insertAdjacentHTML("beforeend",o);const r=new h(".gallery-o a",$);r.on("show.simplelightbox"),r.refresh(),v.reset();const e=m.firstElementChild.getBoundingClientRect().height;scrollBy({behavior:"smooth",top:e*2})}async function b(s,n){try{const o="42424645-ecd3f1048329df1dec069e6a8",r=await P.get("https://pixabay.com/api/",{params:{key:o,q:s,image_type:"photo",orientation:"horizontal",safesearch:"true",page:n,per_page:"15"}});if(r.data.total===0)throw new Error("No images found");return r.data}catch(o){throw o}}const g=document.querySelector(".search-form"),E=document.querySelector(".gallery-o"),S=document.querySelector(".loader"),x=document.querySelector(".loader2"),c=document.querySelector(".more-btn");let f,a,p;document.addEventListener("DOMContentLoaded",()=>{L(),g.addEventListener("submit",s);async function s(n){n.preventDefault(),k(),E.innerHTML="",a=1,f=g.querySelector(".input-search").value;try{const o=await b(f,a);B(o.hits),p=Math.ceil(o.totalHits/15)}catch(o){H(o)}finally{L(),y()}}});function H(s){E.innerHTML="",w.show({message:`❌ "${s}". Please try again!`,color:"red",position:"topRight",maxWidth:"400px"})}function k(){S.style.display="block"}function L(){S.style.display="none"}function A(){x.classList.remove("hidden")}function M(){x.classList.add("hidden")}c.addEventListener("click",async()=>{a+=1,A();try{const s=await b(f,a);T(s),a>1&&(M(),y())}catch(s){console.log(s)}});function C(){a===p&&(M(),y(),w.show({message:`❌ "We're sorry, but you've reached the end of search results."`,color:"red",position:"topRight",maxWidth:"400px"}))}c.addEventListener("click",C);function N(){c.classList.remove("hidden")}function j(){c.classList.add("hidden")}function y(){a>=p?j():N()}
//# sourceMappingURL=commonHelpers.js.map
