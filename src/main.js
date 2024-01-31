import axios from 'axios';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const BASE_URL = 'https://pixabay.com/api';
const API_KEY = '41900218-778e908913d1efd90b8f97d56';

const elements = {
  searchForm: document.querySelector('.search-form'),
  gallery: document.querySelector('.gallery'),
  loader: document.querySelector('.loader'),
  loadMoreBtn: document.querySelector('[data-action="load-more"]'),
  messageFinishGallery: document.querySelector('.finish-loader'),
};

let state = {
  query: '',
  page: 1,
  maxPage: 0,
  pageSize: 40,
};

const lightbox = new SimpleLightbox('.gallery a', {
  captionsData: 'alt',
  captionDelay: 250,
});

elements.searchForm.addEventListener('submit', handleSearch);
elements.loadMoreBtn.addEventListener('click', handleLoadMore);

async function handleSearch(event) {
  event.preventDefault();
  const form = event.currentTarget;
  const query = form.elements.query.value.trim();

  if (!query) {
    return displayError('Enter a query value, please', 'green');
  }

  clearGallery();
  state = { ...state, query, page: 1 };

  try {
    const images = await fetchImages();
    if (images.length === 0) {
      return displayError(
        'Sorry, there are no images matching your search query. Please try again!',
        'red'
      );
    } else {
      createMarkup(images);
    }
    if (state.page === state.maxPage) {
      displayMessage('No more images to load', true);
    } else {
      displayMessage('Load more images', false);
    }
    form.reset();
  } catch (error) {
    displayError('Oops, server connection error!', 'red');
  }
}

async function handleLoadMore() {
  state.page++;
  try {
    const images = await fetchImages();
    createMarkup(images);
    if (state.page === state.maxPage) {
      displayMessage('No more images to load', true);
    }
  } catch (error) {
    displayError('Oops, server connection error!', 'red');
  }
}

async function fetchImages() {
  const { query, page, pageSize } = state;
  const response = await axios.get(BASE_URL, {
    params: {
      key: API_KEY,
      q: query,
      image_type: 'photo',
      orientation: 'horizontal',
      safesearch: 'true',
      per_page: pageSize,
      page,
    },
  });
  state.maxPage = Math.ceil(response.data.totalHits / state.pageSize);
  return response.data.hits;
}

function createMarkup(images) {
  const markup = images
    .map(
      image => `
    <li class="gallery-card">
      <a class="gallery-link" href="${image.largeImageURL}">
        <img class="gallery-image" src="${image.webformatURL}" alt="${image.tags}" />
      </a>
      <div class="titles-box">
        <div class="title-element">
          <p class="title-text">Likes:</p>
          <p class="title-value">${image.likes}</p>
        </div>
        <div class="title-element">
          <p class="title-text">Views:</p>
          <p class="title-value">${image.views}</p>
        </div>
        <div class="title-element">
          <p class="title-text">Comments:</p>
          <p class="title-value">${image.comments}</p>
        </div>
        <div class="title-element">
          <p class="title-text">Downloads:</p>
          <p class="title-value">${image.downloads}</p>
        </div>
      </div>
    </li>
  `
    )
    .join('');
  elements.gallery.insertAdjacentHTML('beforeend', markup);
  lightbox.refresh();
}

function clearGallery() {
  elements.gallery.innerHTML = '';
}

function displayMessage(message, hideButton) {
  elements.messageFinishGallery.textContent = message;
  if (hideButton) {
    elements.loadMoreBtn.classList.add('is-hidden');
    elements.messageFinishGallery.classList.remove('is-hidden');
  } else {
    elements.loadMoreBtn.classList.remove('is-hidden');
    elements.messageFinishGallery.classList.add('is-hidden');
  }
}

function displayError(message, backgroundColor) {
  iziToast.error({
    message: message,
    position: 'topRight',
    backgroundColor: backgroundColor,
    icon: 'none',
  });
}
