import SimpleLightbox from 'simplelightbox';
import Notiflix from 'notiflix';
import axios from 'axios';
import NewsApiService from './new-service';


const searchForm = document.querySelector('#search-form');
const inputRef = document.querySelector('input[name="searchQuery"]');
const loadMoreBtnRef = document.querySelector('.load-more');
const searchBtnRef = document.querySelector('button');
const galleryRef = document.querySelector('.gallery');

const newsApiService = new NewsApiService();


searchForm.addEventListener('submit', onSearch);
loadMoreBtnRef.addEventListener('click', onLoadMore);

function onSearch(event) {
  event.preventDefault();
  clearArticles();
  newsApiService.query = event.currentTarget.elements.searchQuery.value;
  newsApiService.resetPage();
  newsApiService.OnFetchImages().then(articlesMarkup);
  console.log(newsApiService.OnFetchImages().then(hits => console.log(hits)))
  }
  
  // function onLoadMore(event) {
  //   newsApiService.OnFetchImages().then(hits => console.log(hits));
  // }
function onLoadMore(event) {
  newsApiService.OnFetchImages().then(articlesMarkup);
  
}

function articlesMarkup(hits) {
  galleryRef.insertAdjacentHTML('afterend', articlesTpl(hits))
}

function articlesTpl(hits) {
  return markup = hits
    .map(hit => {
      return `<div class="photo-card">
      <a class="gallery-item" href="${hit.largeImageURL}">
          <img
            class="gallery__image"
            src="${hit.webformatURL}"
            alt="${hit.tags}"
            loading="lazy"
        /></a>
      <div class="info">
        <p class="info-item">
          <b>Likes ${hit.likes}</b>
        </p>
        <p class="info-item">
          <b>Views ${hit.views}</b>
        </p>
        <p class="info-item">
          <b>Comments ${hit.comments}</b>
        </p>
        <p class="info-item">
          <b>Downloads ${hit.downloads}</b>
        </p>
      </div>
    </div>`;
    })
    .join('');   
}

function clearArticles() {
  galleryRef.innerHTML = '';
}