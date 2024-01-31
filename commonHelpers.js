import{S as E,i as u,a as $}from"./assets/vendor-990f3500.js";(function(){const o=document.createElement("link").relList;if(o&&o.supports&&o.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))r(e);new MutationObserver(e=>{for(const t of e)if(t.type==="childList")for(const c of t.addedNodes)c.tagName==="LINK"&&c.rel==="modulepreload"&&r(c)}).observe(document,{childList:!0,subtree:!0});function i(e){const t={};return e.integrity&&(t.integrity=e.integrity),e.referrerpolicy&&(t.referrerPolicy=e.referrerpolicy),e.crossorigin==="use-credentials"?t.credentials="include":e.crossorigin==="anonymous"?t.credentials="omit":t.credentials="same-origin",t}function r(e){if(e.ep)return;e.ep=!0;const t=i(e);fetch(e.href,t)}})();document.addEventListener("DOMContentLoaded",()=>{const p=document.querySelector(".search-form"),o=document.querySelector(".gallery"),i=document.querySelector(".loader"),r=document.querySelector('[data-action="load-more"]'),e=document.querySelector(".finish-loader"),t="https://pixabay.com/api",c="41900218-778e908913d1efd90b8f97d56",s={query:"",page:1,maxPage:0,pageSize:40},h=new E(".gallery a",{captionsData:"alt",captionDelay:250}),d={position:"topRight",backgroundColor:"red",icon:"none"};p.addEventListener("submit",L),r.addEventListener("click",v);async function L(a){a.preventDefault(),i.style.display="block",r.classList.add("is-hidden"),e.classList.add("is-hidden"),o.innerHTML="";const n=a.currentTarget;if(s.query=n.elements.query.value.trim(),s.page=1,!s.query){i.style.display="none",u.error({...d,message:"Enter a query value, please"});return}try{const l=await m(s.query);l.data.hits.length===0?u.error({...d,message:"Sorry, there are no images matching your search query. Please try again!"}):(y(l.data.hits),s.maxPage=Math.ceil(l.data.totalHits/s.pageSize)),g(),n.reset()}catch{f()}}async function m(a){const n=new URLSearchParams({key:c,q:a,image_type:"photo",orientation:"horizontal",safesearch:"true",per_page:s.pageSize,page:s.page});return $.get(`${t}/?${n}`)}async function v(){s.page+=1,i.style.display="block",r.classList.add("is-hidden");try{const a=await m(s.query);y(a.data.hits),g()}catch{f()}}function y(a){const n=a.map(l=>{const{largeImageURL:q,webformatURL:b,tags:S,likes:x,views:w,comments:k,downloads:P}=l;return`
        <li class="gallery-card">
            <a class="gallery-link" href="${q}">
                <img class="gallery-image" src="${b}" alt="${S}"/>
            </a>
            <div class="titles-box">
                <div class="title-element">
                    <p class="title-text">Likes:</p>
                    <p class="title-value">${x}</p>
                </div>
                <div class="title-element">
                    <p class="title-text">Views:</p>
                    <p class="title-value">${w}</p>
                </div>
                <div class="title-element">
                    <p class="title-text">Comments:</p>
                    <p class="title-value">${k}</p>
                </div>
                <div class="title-element">
                    <p class="title-text">Downloads:</p>
                    <p class="title-value">${P}</p>
                </div>
            </div>
        </li>
      `}).join("");o.insertAdjacentHTML("beforeend",n),h.refresh()}function g(){s.page===s.maxPage?(e.classList.remove("is-hidden"),r.classList.add("is-hidden")):r.classList.remove("is-hidden"),i.style.display="none"}function f(){u.error({...d,message:"Oops, server connection error!"}),i.style.display="none"}});
//# sourceMappingURL=commonHelpers.js.map
