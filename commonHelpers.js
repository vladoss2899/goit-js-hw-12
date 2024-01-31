import{S as w,i as u,a as P}from"./assets/vendor-990f3500.js";(function(){const o=document.createElement("link").relList;if(o&&o.supports&&o.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))a(e);new MutationObserver(e=>{for(const s of e)if(s.type==="childList")for(const c of s.addedNodes)c.tagName==="LINK"&&c.rel==="modulepreload"&&a(c)}).observe(document,{childList:!0,subtree:!0});function i(e){const s={};return e.integrity&&(s.integrity=e.integrity),e.referrerpolicy&&(s.referrerPolicy=e.referrerpolicy),e.crossorigin==="use-credentials"?s.credentials="include":e.crossorigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function a(e){if(e.ep)return;e.ep=!0;const s=i(e);fetch(e.href,s)}})();document.addEventListener("DOMContentLoaded",()=>{const p=document.querySelector(".search-form"),o=document.querySelector(".gallery"),i=document.querySelector(".loader"),a=document.querySelector('[data-action="load-more"]'),e=document.querySelector(".finish-loader"),s="https://pixabay.com/api",c="41900218-778e908913d1efd90b8f97d56",t={query:"",page:1,maxPage:0,pageSize:40},g=new w(".gallery a",{captionsData:"alt",captionDelay:250}),d={position:"topRight",backgroundColor:"red",icon:"none"};p.addEventListener("submit",f),a.addEventListener("click",h);async function f(r){r.preventDefault(),i.style.display="block",a.classList.add("is-hidden"),e.classList.add("is-hidden"),o.innerHTML="";const n=r.currentTarget;if(t.query=n.elements.query.value.trim(),t.page=1,!t.query){i.style.display="none",u.error({...d,message:"Enter a query value, please"});return}try{const l=await m(t.query);l.data.hits.length===0?u.error({...d,message:"Sorry, there are no images matching your search query. Please try again!"}):(y(l.data.hits),t.maxPage=Math.ceil(l.data.totalHits/t.pageSize)),t.page===t.maxPage?(e.classList.remove("is-hidden"),a.classList.add("is-hidden")):a.classList.remove("is-hidden"),n.reset()}catch{u.error({...d,message:"Oops, server connection error!"})}finally{i.style.display="none"}}async function m(r){const n=new URLSearchParams({key:c,q:r,image_type:"photo",orientation:"horizontal",safesearch:"true",per_page:t.pageSize,page:t.page});return P.get(`${s}/?${n}`)}async function h(){t.page+=1,i.style.display="block",a.classList.add("is-hidden");try{const r=await m(t.query);y(r.data.hits),t.page===t.maxPage?(a.classList.add("is-hidden"),e.classList.remove("is-hidden")):(a.classList.remove("is-hidden"),window.scrollBy(0,window.innerHeight))}catch{u.error({...d,message:"Oops, server connection error!"})}finally{i.style.display="none"}}function y(r){const n=r.map(({largeImageURL:l,webformatURL:v,tags:L,likes:q,views:S,comments:x,downloads:b})=>`
            <li class="gallery-card">
                <a class="gallery-link" href="${l}">
                    <img class="gallery-image" src="${v}" alt="${L}"/>
                </a>
                <div class="titles-box">
                    <div class="title-element">
                        <p class="title-text">Likes:</p>
                        <p class="title-value">${q}</p>
                    </div>
                    <div class="title-element">
                        <p class="title-text">Views:</p>
                        <p class="title-value">${S}</p>
                    </div>
                    <div class="title-element">
                        <p class="title-text">Comments:</p>
                        <p class="title-value">${x}</p>
                    </div>
                    <div class="title-element">
                        <p class="title-text">Downloads:</p>
                        <p class="title-value">${b}</p>
                    </div>
                </div>
            </li>
        `).join("");o.insertAdjacentHTML("beforeend",n),g.refresh()}});
//# sourceMappingURL=commonHelpers.js.map
