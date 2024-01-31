import axios from 'axios';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

document.addEventListener('DOMContentLoaded', () => {
  const searchForm = document.querySelector('.search-form');
  const gallery = document.querySelector('.gallery');
  const loaderEl = document.querySelector('.loader');
  const loadMoreBtn = document.querySelector('[data-action="load-more"]');
  const messageFinishGallery = document.querySelector('.finish-loader');

  const BASE_URL = 'https://pixabay.com/api';
  const API_KEY = '41900218-778e908913d1efd90b8f97d56';
  const queryParams = {
    query: '',
    page: 1,
    maxPage: 0,
    pageSize: 40,
  };

  const iziToastConfig = {
    position: 'topRight',
    backgroundColor: 'red',
    icon: 'none',
  };

  const lightbox = new SimpleLightbox('.gallery a', {
    captionsData: 'alt',
    captionDelay: 250,
  });

  searchForm.addEventListener('submit', handleSearch);
  loadMoreBtn.addEventListener('click', handleLoadMore);

  async function handleSearch(event) {
    event.preventDefault();
    const form = event.currentTarget;
    const { query } = form.elements;
    const searchTerm = query.value.trim();

    if (!searchTerm) {
      showErrorToast('Enter a query value, please');
      return;
    }

    try {
      await fetchAndDisplayImages(searchTerm, true);
      form.reset();
    } catch (error) {
      showErrorToast('Oops, server connection error!');
    }
  }

  async function fetchAndDisplayImages(query, isNewSearch) {
    try {
      loaderEl.style.display = 'block';
      loadMoreBtn.classList.add('is-hidden');
      messageFinishGallery.classList.add('is-hidden');

      const resp = await fetchImages(query);
      const { hits, totalHits } = resp.data;

      if (hits.length === 0) {
        showErrorToast('Sorry, there are no images matching your search query. Please try again!');
      } else {
        displayImages(hits, isNewSearch);
        queryParams.maxPage = Math.ceil(totalHits / queryParams.pageSize);
      }
    } finally {
      updateUI();
    }
  }

  async function fetchImages(query) {
    const searchParams = new URLSearchParams({
      key: API_KEY,
      q: query,
      image_type: 'photo',
      orientation: 'horizontal',
      safesearch: 'true',
      per_page: queryParams.pageSize,
      page: queryParams.page,
    });
    return axios.get(`${BASE_URL}/?${searchParams}`);
  }

  async function handleLoadMore() {
    queryParams.page += 1;
    try {
      await fetchAndDisplayImages(queryParams.query, false);
    } catch (error) {
      showErrorToast('Oops, server connection error!');
    }
  }

  function displayImages(images, isNewSearch) {
    const markup = images.map(image => {
      const {
        largeImageURL: largeURL,
        webformatURL: webURL,
        tags,
        likes,
        views,
        comments,
        downloads,
      } = image;

      return `
        <li class="gallery-card">
            <a class="gallery-link" href="${largeURL}">
                <img class="gallery-image" src="${webURL}" alt="${tags}"/>
            </a>
            <div class="titles-box">
                <div class="title-element">
                    <p class="title-text">Likes:</p>
                    <p class="title-value">${likes}</p>
                </div>
                <div class="title-element">
                    <p class="title-text">Views:</p>
                    <p class="title-value">${views}</p>
                </div>
                <div class="title-element">
                    <p class="title-text">Comments:</p>
                    <p class="title-value">${comments}</p>
                </div>
                <div class="title-element">
                    <p class="title-text">Downloads:</p>
                    <p class="title-value">${downloads}</p>
                </div>
            </div>
        </li>`;
    }).join('');

    if (isNewSearch) {
      gallery.innerHTML = markup;
    } else {
      gallery.insertAdjacentHTML('beforeend', markup);
    }

    lightbox.refresh();
  }

  function updateUI() {
    if (queryParams.page === queryParams.maxPage) {
      messageFinishGallery.classList.remove('is-hidden');
      loadMoreBtn.classList.add('is-hidden');
    } else {
      loadMoreBtn.classList.remove('is-hidden');
    }
    loaderEl.style.display = 'none';
  }

  function showErrorToast(message) {
    iziToast.error({
      ...iziToastConfig,
      message,
    });
    loaderEl.style.display = 'none';
  }
});
