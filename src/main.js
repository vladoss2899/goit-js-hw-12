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

  const lightbox = new SimpleLightbox('.gallery a', {
    captionsData: 'alt',
    captionDelay: 250,
  });

  const iziToastConfig = {
    position: 'topRight',
    backgroundColor: 'red',
    icon: 'none',
  };

  searchForm.addEventListener('submit', handleSearch);
  loadMoreBtn.addEventListener('click', handleLoadMore);

  async function handleSearch(event) {
    event.preventDefault();

    loaderEl.style.display = 'block';
    loadMoreBtn.classList.add('is-hidden');
    messageFinishGallery.classList.add('is-hidden');
    gallery.innerHTML = '';

    const form = event.currentTarget;
    queryParams.query = form.elements.query.value.trim();
    queryParams.page = 1;

    if (!queryParams.query) {
      loaderEl.style.display = 'none';
      iziToast.error({
        ...iziToastConfig,
        message: 'Enter a query value, please',
      });
      return;
    }

    try {
      const resp = await fetchImages(queryParams.query);
      if (resp.data.hits.length === 0) {
        iziToast.error({
          ...iziToastConfig,
          message:
            'Sorry, there are no images matching your search query. Please try again!',
        });
      } else {
        createMarkup(resp.data.hits);
        queryParams.maxPage = Math.ceil(
          resp.data.totalHits / queryParams.pageSize
        );
      }
      updateUI();
      form.reset();
    } catch (err) {
      handleError();
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
    loaderEl.style.display = 'block';
    loadMoreBtn.classList.add('is-hidden');

    try {
      const respNext = await fetchImages(queryParams.query);
      createMarkup(respNext.data.hits);
      updateUI();
    } catch (err) {
      handleError();
    }
  }

  function createMarkup(images) {
    const markup = images
      .map(image => {
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
        </li>
      `;
      })
      .join('');

    gallery.insertAdjacentHTML('beforeend', markup);
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

  function handleError() {
    iziToast.error({
      ...iziToastConfig,
      message: 'Oops, server connection error!',
    });
    loaderEl.style.display = 'none';
  }
});
