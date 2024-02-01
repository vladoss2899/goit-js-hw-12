import{S as k,i as u,a as $}from"./assets/vendor-990f3500.js";(function(){const n=document.createElement("link").relList;if(n&&n.supports&&n.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))a(e);new MutationObserver(e=>{for(const t of e)if(t.type==="childList")for(const c of t.addedNodes)c.tagName==="LINK"&&c.rel==="modulepreload"&&a(c)}).observe(document,{childList:!0,subtree:!0});function o(e){const t={};return e.integrity&&(t.integrity=e.integrity),e.referrerpolicy&&(t.referrerPolicy=e.referrerpolicy),e.crossorigin==="use-credentials"?t.credentials="include":e.crossorigin==="anonymous"?t.credentials="omit":t.credentials="same-origin",t}function a(e){if(e.ep)return;e.ep=!0;const t=o(e);fetch(e.href,t)}})();document.addEventListener("DOMContentLoaded",()=>{const m=document.querySelector(".search-form"),n=document.querySelector(".gallery"),o=document.querySelector(".loader"),a=document.querySelector('[data-action="load-more"]'),e=document.querySelector(".finish-loader"),t="https://pixabay.com/api",c="41900218-778e908913d1efd90b8f97d56",s={query:"",page:1,maxPage:0,pageSize:15},h=new k(".gallery a",{captionsData:"alt",captionDelay:250}),d={position:"topRight",backgroundColor:"red",icon:"none"};m.addEventListener("submit",v),a.addEventListener("click",L);async function v(r){r.preventDefault(),o.style.display="block",a.classList.add("is-hidden"),e.classList.add("is-hidden"),n.innerHTML="";const l=r.currentTarget;if(s.query=l.elements.query.value.trim(),s.page=1,!s.query){o.style.display="none",u.error({...d,message:"Enter a query value, please"});return}try{const i=await y(s.query);i.data.hits.length===0?u.error({...d,message:"Sorry, there are no images matching your search query. Please try again!"}):(g(i.data.hits),s.maxPage=Math.ceil(i.data.totalHits/s.pageSize),i.data.hits.length>0?a.classList.remove("is-hidden"):a.classList.add("is-hidden")),p(),l.reset()}catch{f()}finally{o.style.display="none"}}function p(){s.page===s.maxPage?(e.classList.remove("is-hidden"),a.classList.add("is-hidden")):a.classList.remove("is-hidden"),o.style.display="none"}async function y(r){const l=new URLSearchParams({key:c,q:r,image_type:"photo",orientation:"horizontal",safesearch:"true",per_page:s.pageSize,page:s.page});return $.get(`${t}/?${l}`)}function g(r){const l=r.map(i=>{const{largeImageURL:b,webformatURL:q,tags:w,likes:S,views:x,comments:E,downloads:P}=i;return`
          <li class="gallery-card">
              <a class="gallery-link" href="${b}">
                  <img class="gallery-image" src="${q}" alt="${w}"/>
              </a>
              <div class="titles-box">
                  <div class="title-element">
                      <p class="title-text">Likes:</p>
                      <p class="title-value">${S}</p>
                  </div>
                  <div class="title-element">
                      <p class="title-text">Views:</p>
                      <p class="title-value">${x}</p>
                  </div>
                  <div class="title-element">
                      <p class="title-text">Comments:</p>
                      <p class="title-value">${E}</p>
                  </div>
                  <div class="title-element">
                      <p class="title-text">Downloads:</p>
                      <p class="title-value">${P}</p>
                  </div>
              </div>
          </li>
        `}).join("");n.insertAdjacentHTML("beforeend",l),h.refresh()}function f(){u.error({...d,message:"Oops, server connection error!"})}async function L(){s.page+=1,o.style.display="block",a.classList.add("is-hidden");try{const r=await y(s.query);g(r.data.hits),p(),window.scrollTo({top:document.body.scrollHeight,behavior:"smooth"})}catch{f()}}});
//# sourceMappingURL=commonHelpers.js.map
