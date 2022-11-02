import SimpleLightbox from 'simplelightbox';
import Notiflix from 'notiflix';
import axios from 'axios';
import NewsApiService from './new-service';


const searchForm = document.querySelector('#search-form');
const inputRef = document.querySelector('input[name="searchQuery"]');
const loadMoreBtnRef = document.querySelector('.load-more');
const linkMoreRef = document.querySelector('.link');
const searchBtnRef = document.querySelector('button');
const galleryRef = document.querySelector('.gallery');



loadMoreBtnRef.style.visibility = 'hidden';
linkMoreRef.style.visibility = 'hidden';
const newsApiService = new NewsApiService();



searchForm.addEventListener('submit', onSearch);
loadMoreBtnRef.addEventListener('click', onLoadMore);

function onSearch(event) {
  event.preventDefault();
  clearArticles();
  newsApiService.query = event.currentTarget.elements.searchQuery.value;
  newsApiService.resetPage();
  newsApiService.OnFetchImages().then(articlesMarkup);
  loadMoreBtnRef.style.visibility = 'visible';
  linkMoreRef.style.visibility = 'visible';
  newsApiService.OnFetchImages().then(hits => console.log(hits.length));
 
  // if (newsApiService.OnFetchImages().then(hits => console.log(hits.length)) = 0) {
  //   Notiflix.Notify.failure(
  //     'Sorry, there are no images matching your search query. Please try again.')
  // }
  }
  
function onLoadMore(event) {
  newsApiService.OnFetchImages().then(articlesMarkup);
  
}

function articlesMarkup(hits) {
  galleryRef.insertAdjacentHTML('beforeend', articlesTpl(hits))
}

function articlesTpl(hits) {
  return hits
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