import{S as f,i as d,a as v}from"./assets/vendor-990f3500.js";(function(){const r=document.createElement("link").relList;if(r&&r.supports&&r.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))n(e);new MutationObserver(e=>{for(const s of e)if(s.type==="childList")for(const l of s.addedNodes)l.tagName==="LINK"&&l.rel==="modulepreload"&&n(l)}).observe(document,{childList:!0,subtree:!0});function i(e){const s={};return e.integrity&&(s.integrity=e.integrity),e.referrerpolicy&&(s.referrerPolicy=e.referrerpolicy),e.crossorigin==="use-credentials"?s.credentials="include":e.crossorigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function n(e){if(e.ep)return;e.ep=!0;const s=i(e);fetch(e.href,s)}})();const L=document.querySelector(".search-form"),p=document.querySelector(".gallery"),c=document.querySelector(".loader"),o=document.querySelector('[data-action="load-more"]'),u=document.querySelector(".finish-loader"),q=new f(".gallery a",{captionsData:"alt",captionDelay:250}),t={query:"",page:1,maxPage:0,pageSize:40};L.addEventListener("submit",b);o.addEventListener("click",S);async function b(a){a.preventDefault(),c.style.display="block",o.classList.add("is-hidden"),u.classList.add("is-hidden"),p.innerHTML="";const r=a.currentTarget;if(t.query=r.elements.query.value.trim(),t.page=1,!t.query)return c.style.display="none",d.error({message:"Enter a query value, please",position:"topRight",backgroundColor:"green",icon:"none"});try{const i=await g(t.query);if(i.data.hits.length===0)return d.error({message:"Sorry, there are no images matching your search query. Please try again!",position:"topRight",backgroundColor:"red",icon:"none"});m(i.data.hits),t.maxPage=Math.ceil(i.data.totalHits/t.pageSize),t.page===t.maxPage?(u.classList.remove("is-hidden"),o.classList.add("is-hidden")):o.classList.remove("is-hidden"),r.reset()}catch{d.error({message:"Oops, server connection error!",position:"topRight",backgroundColor:"red",icon:"none"})}finally{c.style.display="none"}}function g(a){const r="https://pixabay.com/api",i="41900218-778e908913d1efd90b8f97d56",n=new URLSearchParams({key:i,q:a,image_type:"photo",orientation:"horizontal",safesearch:"true",per_page:t.pageSize,page:t.page});return v.get(`${r}/?${n}`)}async function S(){t.page+=1,c.style.display="block",o.classList.add("is-hidden");try{const a=await g(t.query);if(m(a.data.hits),t.page===t.maxPage)o.classList.add("is-hidden"),u.classList.remove("is-hidden");else{o.classList.remove("is-hidden");const r=document.querySelector(".gallery-card").getBoundingClientRect();window.scrollBy(0,r.height*2)}}catch{d.error({message:"Oops, server connection error!",position:"topRight",backgroundColor:"red",icon:"none"})}finally{c.style.display="none"}}function m(a){const r=a.map(({largeImageURL:i,webformatURL:n,tags:e,likes:s,views:l,comments:y,downloads:h})=>`<li class="gallery-card">
        <a class="gallery-link" href="${i}">
            <img 
                class="gallery-image"
                    src="${n}"
                    alt="${e}"/>
        </a>
        <div class="titles-box">
            <div class="title-element">
                <p class="title-text">Likes:</p>
                <p class="title-value">${s} </p>
            </div>
            <div class="title-element">
                <p class="title-text">Views:</p>
                <p class="title-value">${l} </p>
            </div>
            <div class="title-element">
                <p class="title-text">Comments:</p>
                <p class="title-value">${y} </p>
            </div>
            <div class="title-element">
                <p class="title-text">Downloads:</p>
                <p class="title-value">${h} </p>
            </div>
        </div>
    </li>`).join("");p.insertAdjacentHTML("beforeend",r),q.refresh()}
//# sourceMappingURL=commonHelpers.js.map
