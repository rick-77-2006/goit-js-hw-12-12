import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import axios from 'axios';

const form = document.querySelector('.form');
const gallery = document.querySelector('.gallery');
const container = document.querySelector('div');
const searchInput = document.querySelector('input');
const loadBtn = document.querySelector('.btn-load');

const showLoader = () => {
  const loader = document.createElement('span');
  loader.classList.add('loader');
  container.append(loader);
};

const hideLoader = () => {
  const loader = document.querySelector('.loader');
  if (loader) {
    loader.remove();
  }
};

const showButton = () => {
  loadBtn.style.display = 'block';
};

const hideButton = () => {
  loadBtn.style.display = 'none';
};

let page = 1;
let per_page = 15;
let query = ' ';
let totalHits;

form.addEventListener('submit', async event => {
  page = 1;
  showLoader();
  gallery.innerHTML = ' ';
  event.preventDefault();
  try {
    query = searchInput.value;
    const photos = await searchImages();
    renderImages(photos);
    form.reset();
    hideLoader();
    showButton();
    if (photos.hits.length < 15) {
      hideButton();
    }
    if (photos.hits.length === 0) {
      hideButton();
      iziToast.error({
        message:
          'Sorry, there are no images matching <br>your search query. Please try again!</br>',
        position: 'center',
        transitionIn: 'fadeInLeft',
      });
    }
  } catch (error) {
    iziToast.error({
      title: 'Error',
    });
  }
});

loadBtn.addEventListener('click', async () => {
  showLoader();
  try {
    page += 1;
    const photos = await searchImages();
    renderImages(photos);
    hideLoader();

    const { height: cardHeight } = document
      .querySelector('.gallery')
      .firstElementChild.getBoundingClientRect();

    window.scrollBy({
      top: cardHeight * 2,
      behavior: 'smooth',
    });

    if (gallery.children.length >= totalHits || photos.hits.length < per_page) {
      iziToast.warning({
        message:
          'We are sorry, but you have reached the end of search results.',
        position: 'bottomCenter',
        transitionIn: 'fadeInDown',
      });
      hideButton();
    }
  } catch (error) {
    iziToast.error({
      title: 'Error',
    });
    hideLoader();
  }

  if(!query) {
    showError('empty field')
  return;
}

});

async function searchImages() {
  try {
    const apiKey = '42318404-1173ca802dc215ae825a9e5c8';
    const params = new URLSearchParams({
      key: apiKey,
      q: query,
      image_type: 'photo',
      orientation: 'horizontal',
      safesearch: true,
      page: page,
      per_page: per_page,
    });
    const response = await axios.get(`https://pixabay.com/api/?${params}`);
    totalHits = response.data.totalHits;

    return response.data;
  } catch (error) {
    console.log(error);
    throw WebTransportError;
  }
}

function renderImages(data) {
  const markup = data.hits
    .map(data => {
      return `
            <li class="gallery-item"><a href="${data.largeImageURL}">
          <img class="gallery-image" src="${data.webformatURL}" alt="${data.tags}"></a>
          <p><b>Likes: </b>${data.likes}</p>
          <p><b>Views: </b>${data.views}</p>
          <p><b>Comments: </b>${data.comments}</p>
          <p><b>Downloads: </b>${data.downloads}</p>
          </li>`;
    })
    .join('');

  gallery.insertAdjacentHTML('beforeend', markup);
  const lightbox = new SimpleLightbox('.gallery a', {
    captions: true,
    captionType: 'attr',
    captionsData: 'alt',
    captionPosition: 'bottom',
    fadeSpeed: 150,
    captionSelector: 'img',
    captionDelay: 250,
  });

  lightbox.on('show.simplelightbox').refresh();
  hideLoader();
}


