// Імпорт необхідних модулів і бібліотек
import axios from 'axios'; // для здійснення запитів HTTP
import iziToast from 'izitoast'; // для відображення сповіщень
import 'izitoast/dist/css/iziToast.min.css'; // стилі для iziToast
import SimpleLightbox from 'simplelightbox'; // для створення галереї зображень
import 'simplelightbox/dist/simple-lightbox.min.css'; // стилі для SimpleLightbox

// Код, що виконується при завантаженні DOM
document.addEventListener('DOMContentLoaded', () => {
  // Отримання посилань на елементи DOM
  const searchFormElement = document.querySelector('.search-form'); // форма пошуку
  const galleryElement = document.querySelector('.gallery'); // елемент галереї
  const loaderElement = document.querySelector('.loader'); // елемент завантажувача
  const loadMoreButton = document.querySelector('[data-action="load-more"]'); // кнопка "Load More"
  const messageFinishGalleryElement = document.querySelector('.finish-loader'); // повідомлення про завершення галереї

  // Константи та змінні для роботи з API Pixabay
  const PIXABAY_BASE_URL = 'https://pixabay.com/api';
  const PIXABAY_API_KEY = '41900218-778e908913d1efd90b8f97d56';
  const queryParameters = {
    query: '', // пошуковий запит
    page: 1, // поточна сторінка
    maxPage: 0, // максимальна сторінка
    pageSize: 15, // розмір сторінки
  };

  // Створення об'єкту SimpleLightbox для галереї
  const lightbox = new SimpleLightbox('.gallery a', {
    captionsData: 'alt',
    captionDelay: 250,
  });

  // Конфігурація для iziToast
  const iziToastConfig = {
    position: 'topRight',
    backgroundColor: 'red',
    icon: 'none',
  };

  // Додавання обробника події для подачі форми пошуку
  searchFormElement.addEventListener('submit', fetchData);

  // Додавання обробника події для кнопки "Load More"
  loadMoreButton.addEventListener('click', loadMoreData);

  // Функція для отримання даних з API Pixabay
  async function fetchData(event) {
    event.preventDefault(); // запобігання перезавантаженню сторінки при подачі форми

    // Відображення завантажувача та приховання кнопки "Load More" та повідомлення про завершення галереї
    loaderElement.style.display = 'block';
    loadMoreButton.classList.add('is-hidden');
    messageFinishGalleryElement.classList.add('is-hidden');
    galleryElement.innerHTML = ''; // очищення галереї перед новим пошуком

    // Отримання значення пошукового запиту з форми
    const formElement = event.currentTarget;
    queryParameters.query = formElement.elements.query.value.trim(); // отримання значення із поля вводу
    queryParameters.page = 1; // скидання сторінки на першу при новому пошуковому запиті

    // Перевірка на наявність пошукового запиту
    if (!queryParameters.query) {
      loaderElement.style.display = 'none';
      iziToast.error({
        ...iziToastConfig,
        message: 'Enter a query value, please',
      });
      return;
    }

    try {
      // Отримання даних з API Pixabay
      const response = await getImages(queryParameters.query);

      // Перевірка наявності результатів
      if (response.data.hits.length === 0) {
        // Відображення повідомлення про відсутність зображень
        iziToast.error({
          ...iziToastConfig,
          message:
            'Sorry, there are no images matching your search query. Please try again!',
        });
      } else {
        // Відображення результатів пошуку
        renderData(response.data.hits);
        queryParameters.maxPage = Math.ceil(
          response.data.totalHits / queryParameters.pageSize
        );

        // Перевірка наявності контенту для відображення кнопки "Load More"
        if (response.data.hits.length > 0) {
          loadMoreButton.classList.remove('is-hidden'); // показ кнопки "Load More"
        } else {
          loadMoreButton.classList.add('is-hidden'); // приховання кнопки "Load More"
        }
      }

      // Оновлення інтерфейсу користувача та скидання форми пошуку
      updateUI();
      formElement.reset();
    } catch (error) {
      // Відображення повідомлення про помилку при отриманні даних з сервера
      showError();
    } finally {
      // Приховання завантажувача після завершення операції
      loaderElement.style.display = 'none';
    }
  }

  // Функція для оновлення інтерфейсу користувача
  function updateUI() {
    if (queryParameters.page === queryParameters.maxPage) {
      messageFinishGalleryElement.classList.remove('is-hidden');
      loadMoreButton.classList.add('is-hidden');
    } else {
      loadMoreButton.classList.remove('is-hidden');
    }
    loaderElement.style.display = 'none';
  }

  // Функція для отримання зображень з API Pixabay
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

  // Функція для відображення зображень у галереї
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

    galleryElement.insertAdjacentHTML('beforeend', markup); // відображення зображень у галереї
    lightbox.refresh(); // оновлення галереї після додавання нових зображень
  }

  // Функція для відображення повідомлення про помилку
  function showError() {
    iziToast.error({
      ...iziToastConfig,
      message: 'Oops, server connection error!',
    });
  }

  // Функція для завантаження наступної сторінки зображень
  async function loadMoreData() {
    queryParameters.page += 1; // інкремент сторінки
    loaderElement.style.display = 'block'; // відображення завантажувача
    loadMoreButton.classList.add('is-hidden'); // приховання кнопки "Load More"

    try {
      // Отримання наступної сторінки зображень
      const nextResponse = await getImages(queryParameters.query);
      // Відображення отриманих зображень
      renderData(nextResponse.data.hits);
      updateUI();

      // Прокрутка сторінки до нижньої частини, де розташована кнопка "Load More"
      window.scrollTo({
        top: document.body.scrollHeight,
        behavior: 'smooth', // Зробить прокрутку плавною
      });
    } catch (error) {
      // Відображення повідомлення про помилку при отриманні даних з сервера
      showError();
    }
  }
});
