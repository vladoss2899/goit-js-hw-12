import axios from 'axios';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

document.addEventListener('DOMContentLoaded', () => {
  const searchFormElement = document.querySelector('.search-form');
  const galleryElement = document.querySelector('.gallery');
  const loaderElement = document.querySelector('.loader');
  const loadMoreButton = document.querySelector('[data-action="load-more"]');
  const messageFinishGalleryElement = document.querySelector('.finish-loader');

  const PIXABAY_BASE_URL = 'https://pixabay.com/api';
  const PIXABAY_API_KEY = '41900218-778e908913d1efd90b8f97d56';
  const queryParameters = {
    query: '',
    page: 1,
    maxPage: 0,
    pageSize: 15,
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

  searchFormElement.addEventListener('submit', fetchData);
  loadMoreButton.addEventListener('click', loadMoreData);

  async function fetchData(event) {
    event.preventDefault();

    loaderElement.style.display = 'block';
    loadMoreButton.classList.add('is-hidden');
    messageFinishGalleryElement.classList.add('is-hidden');
    galleryElement.innerHTML = '';

    const formElement = event.currentTarget;
    queryParameters.query = formElement.elements.query.value.trim();
    queryParameters.page = 1;

    if (!queryParameters.query) {
      loaderElement.style.display = 'none';
      iziToast.error({
        ...iziToastConfig,
        message: 'Enter a query value, please',
      });
      return;
    }

    try {
      const response = await getImages(queryParameters.query);
      if (response.data.hits.length === 0) {
        iziToast.error({
          ...iziToastConfig,
          message:
            'Sorry, there are no images matching your search query. Please try again!',
        });
      } else {
        renderData(response.data.hits);
        queryParameters.maxPage = Math.ceil(
          response.data.totalHits / queryParameters.pageSize
        );

        // Перевіряємо, чи є контент після отримання даних
        if (response.data.hits.length > 0) {
          loadMoreButton.classList.remove('is-hidden'); // Показуємо кнопку, якщо є контент
        }
      }
      updateUI();
      formElement.reset();
    } catch (error) {
      showError();
    } finally {
      loaderElement.style.display = 'none';
    }
  }

  function updateUI() {
    if (queryParameters.page === queryParameters.maxPage) {
      messageFinishGalleryElement.classList.remove('is-hidden');
      loadMoreButton.classList.add('is-hidden');
    } else {
      loadMoreButton.classList.remove('is-hidden');
    }
    loaderElement.style.display = 'none';
  }

  async function getImages(query) {
    const searchParams = new URLSearchParams({
      key: PIXABAY_API_KEY,
      q: query,
      image_type: 'photo',
      orientation: 'horizontal',
      safesearch: 'true',
      per_page: queryParameters.pageSize,
      page: queryParameters.page,
    });
    return axios.get(`${PIXABAY_BASE_URL}/?${searchParams}`);
  }

  async function loadMoreData() {
    queryParameters.page += 1;
    loaderElement.style.display = 'block';
    loadMoreButton.classList.add('is-hidden');

    try {
      const nextResponse = await getImages(queryParameters.query);
      renderData(nextResponse.data.hits);
      updateUI();
    } catch (error) {
      showError();
    }
  }

  function renderData(images) {
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

    galleryElement.insertAdjacentHTML('beforeend', markup);
    lightbox.refresh();
  }

  function showError() {
    iziToast.error({
      ...iziToastConfig,
      message: 'Oops, server connection error!',
    });
  }

  async function loadMoreData() {
    queryParameters.page += 1;
    loaderElement.style.display = 'block';
    loadMoreButton.classList.add('is-hidden');

    try {
      const nextResponse = await getImages(queryParameters.query);
      renderData(nextResponse.data.hits);
      updateUI();

      // Прокрутка сторінки до нижньої частини, де розташована кнопка "Load More"
      window.scrollTo({
        top: document.body.scrollHeight,
        behavior: 'smooth', // Зробить прокрутку плавною
      });
    } catch (error) {
      showError();
    }
  }
});
