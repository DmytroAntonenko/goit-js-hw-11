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
  newsApiService.query = event.currentTarget.elements.searchQuery.value;
  newsApiService.resetPage();
  newsApiService.OnFetchImages();
  newsApiService.OnFetchImages().then(articlesMarkup);
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
  const markup = hits
    .map(hit => {
      return `<div class="photo-card">
      <img src="" alt="" loading="lazy" />
      <div class="info">
        <p class="info-item">
          <b>Likes</b>
        </p>
        <p class="info-item">
          <b>Views</b>
        </p>
        <p class="info-item">
          <b>Comments</b>
        </p>
        <p class="info-item">
          <b>Downloads</b>
        </p>
      </div>
    </div>`;
    })
    .join('');
}