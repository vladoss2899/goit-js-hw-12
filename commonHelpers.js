import{S as k,a as I,i as M}from"./assets/vendor-990f3500.js";(function(){const n=document.createElement("link").relList;if(n&&n.supports&&n.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))o(e);new MutationObserver(e=>{for(const t of e)if(t.type==="childList")for(const d of t.addedNodes)d.tagName==="LINK"&&d.rel==="modulepreload"&&o(d)}).observe(document,{childList:!0,subtree:!0});function c(e){const t={};return e.integrity&&(t.integrity=e.integrity),e.referrerpolicy&&(t.referrerPolicy=e.referrerpolicy),e.crossorigin==="use-credentials"?t.credentials="include":e.crossorigin==="anonymous"?t.credentials="omit":t.credentials="same-origin",t}function o(e){if(e.ep)return;e.ep=!0;const t=c(e);fetch(e.href,t)}})();document.addEventListener("DOMContentLoaded",()=>{const m=document.querySelector(".search-form"),n=document.querySelector(".gallery"),c=document.querySelector(".loader"),o=document.querySelector('[data-action="load-more"]'),e=document.querySelector(".finish-loader"),t="https://pixabay.com/api",d="41900218-778e908913d1efd90b8f97d56",a={query:"",page:1,maxPage:0,pageSize:40},y={position:"topRight",backgroundColor:"red",icon:"none"},g=new k(".gallery a",{captionsData:"alt",captionDelay:250});m.addEventListener("submit",h),o.addEventListener("click",L);async function h(s){s.preventDefault();const r=s.currentTarget,{query:l}=r.elements,i=l.value.trim();if(!i){u("Enter a query value, please");return}try{await f(i,!0),r.reset()}catch{u("Oops, server connection error!")}}async function f(s,r){try{c.style.display="block",o.classList.add("is-hidden"),e.classList.add("is-hidden");const l=await v(s),{hits:i,totalHits:p}=l.data;i.length===0?u("Sorry, there are no images matching your search query. Please try again!"):(S(i,r),a.maxPage=Math.ceil(p/a.pageSize))}finally{b()}}async function v(s){const r=new URLSearchParams({key:d,q:s,image_type:"photo",orientation:"horizontal",safesearch:"true",per_page:a.pageSize,page:a.page});return I.get(`${t}/?${r}`)}async function L(){a.page+=1;try{await f(a.query,!1)}catch{u("Oops, server connection error!")}}function S(s,r){const l=s.map(i=>{const{largeImageURL:p,webformatURL:q,tags:w,likes:x,views:P,comments:E,downloads:$}=i;return`
        <li class="gallery-card">
            <a class="gallery-link" href="${p}">
                <img class="gallery-image" src="${q}" alt="${w}"/>
            </a>
            <div class="titles-box">
                <div class="title-element">
                    <p class="title-text">Likes:</p>
                    <p class="title-value">${x}</p>
                </div>
                <div class="title-element">
                    <p class="title-text">Views:</p>
                    <p class="title-value">${P}</p>
                </div>
                <div class="title-element">
                    <p class="title-text">Comments:</p>
                    <p class="title-value">${E}</p>
                </div>
                <div class="title-element">
                    <p class="title-text">Downloads:</p>
                    <p class="title-value">${$}</p>
                </div>
            </div>
        </li>`}).join("");r?n.innerHTML=l:n.insertAdjacentHTML("beforeend",l),g.refresh()}function b(){a.page===a.maxPage?(e.classList.remove("is-hidden"),o.classList.add("is-hidden")):o.classList.remove("is-hidden"),c.style.display="none"}function u(s){M.error({...y,message:s}),c.style.display="none"}});
//# sourceMappingURL=commonHelpers.js.map
