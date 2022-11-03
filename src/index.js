import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
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
  new SimpleLightbox('.gallery a');
  newsApiService.OnFetchImages().then(hits =>{
    if(hits.length === 0){Notiflix.Notify.failure('Sorry, there are no images matching your search query. Please try again.')
    loadMoreBtnRef.style.visibility = 'hidden';
    linkMoreRef.style.visibility = 'hidden';
    return
    }
    articlesMarkup(hits)
    });
    // const x =  newsApiService.OnFetchImages().then(hits => console.log(hits))
    // console.log(newsApiService.OnFetchImages())
}

function onLoadMore(event) {
  newsApiService.OnFetchImages().then(articlesMarkup);
  new SimpleLightbox('.gallery a');
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
        <div class="info-box">
          <p class="info-item">
            <b>Likes</b>
          </p>
          <p>${hit.likes}<p>
        </div>
        <div class="info-box">
          <p class="info-item">
            <b>Views</b>
          </p>
          <p>${hit.views}<p>
          </div>
        <div class="info-box">
          <p class="info-item">
            <b>Comments</b>  
          </p>
          <p>${hit.comments}<p>
        </div>
        <div class="info-box">
          <p class="info-item">
            <b>Downloads</b>
          </p>
          <p>${hit.downloads}<p>
        </div>
      </div>
    </div>`;
    })
    .join('');   
}

function clearArticles() {
  galleryRef.innerHTML = '';
}