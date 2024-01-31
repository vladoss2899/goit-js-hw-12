import{S as p,a as g,i as f}from"./assets/vendor-990f3500.js";(function(){const r=document.createElement("link").relList;if(r&&r.supports&&r.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))l(e);new MutationObserver(e=>{for(const s of e)if(s.type==="childList")for(const c of s.addedNodes)c.tagName==="LINK"&&c.rel==="modulepreload"&&l(c)}).observe(document,{childList:!0,subtree:!0});function a(e){const s={};return e.integrity&&(s.integrity=e.integrity),e.referrerpolicy&&(s.referrerPolicy=e.referrerpolicy),e.crossorigin==="use-credentials"?s.credentials="include":e.crossorigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function l(e){if(e.ep)return;e.ep=!0;const s=a(e);fetch(e.href,s)}})();const y="https://pixabay.com/api",h="41900218-778e908913d1efd90b8f97d56",i={searchForm:document.querySelector(".search-form"),gallery:document.querySelector(".gallery"),loader:document.querySelector(".loader"),loadMoreBtn:document.querySelector('[data-action="load-more"]'),messageFinishGallery:document.querySelector(".finish-loader")};let o={query:"",page:1,maxPage:0,pageSize:40};const v=new p(".gallery a",{captionsData:"alt",captionDelay:250});i.searchForm.addEventListener("submit",L);i.loadMoreBtn.addEventListener("click",x);async function L(t){t.preventDefault();const r=t.currentTarget,a=r.elements.query.value.trim();if(!a)return n("Enter a query value, please","green");S(),o={...o,query:a,page:1};try{const l=await u();if(l.length===0)return n("Sorry, there are no images matching your search query. Please try again!","red");m(l),o.page===o.maxPage?d("No more images to load",!0):d("Load more images",!1),r.reset()}catch{n("Oops, server connection error!","red")}}async function x(){o.page++;try{const t=await u();m(t),o.page===o.maxPage&&d("No more images to load",!0)}catch{n("Oops, server connection error!","red")}}async function u(){const{query:t,page:r,pageSize:a}=o,l=await g.get(y,{params:{key:h,q:t,image_type:"photo",orientation:"horizontal",safesearch:"true",per_page:a,page:r}});return o.maxPage=Math.ceil(l.data.totalHits/o.pageSize),l.data.hits}function m(t){const r=t.map(a=>`
    <li class="gallery-card">
      <a class="gallery-link" href="${a.largeImageURL}">
        <img class="gallery-image" src="${a.webformatURL}" alt="${a.tags}" />
      </a>
      <div class="titles-box">
        <div class="title-element">
          <p class="title-text">Likes:</p>
          <p class="title-value">${a.likes}</p>
        </div>
        <div class="title-element">
          <p class="title-text">Views:</p>
          <p class="title-value">${a.views}</p>
        </div>
        <div class="title-element">
          <p class="title-text">Comments:</p>
          <p class="title-value">${a.comments}</p>
        </div>
        <div class="title-element">
          <p class="title-text">Downloads:</p>
          <p class="title-value">${a.downloads}</p>
        </div>
      </div>
    </li>
  `).join("");i.gallery.insertAdjacentHTML("beforeend",r),v.refresh()}function S(){i.gallery.innerHTML=""}function d(t,r){i.messageFinishGallery.textContent=t,r?(i.loadMoreBtn.classList.add("is-hidden"),i.messageFinishGallery.classList.remove("is-hidden")):(i.loadMoreBtn.classList.remove("is-hidden"),i.messageFinishGallery.classList.add("is-hidden"))}function n(t,r){f.error({message:t,position:"topRight",backgroundColor:r,icon:"none"})}
//# sourceMappingURL=commonHelpers.js.map
