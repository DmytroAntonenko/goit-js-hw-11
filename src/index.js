import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import Notiflix from 'notiflix';
import axios from 'axios';
import NewsApiService from './new-service';

const lightbox = new SimpleLightbox('.gallery a', {
  captionsData: 'alt',
  captionDelay: 250,
  navText:	['←','→'],
});

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
  newsApiService.OnFetchImages().then(data =>{
    if(data.hits.length > 0){Notiflix.Notify.success(`Hooray! We found ${data.totalHits} images.`)}
    if(data.hits.length === 0){
      loadMoreBtnRef.style.visibility = 'hidden';
      linkMoreRef.style.visibility = 'hidden';
      Notiflix.Notify.failure('Sorry, there are no images matching your search query. Please try again.')
    return
    }
    // articlesMarkup(hits)
    
    });

    // let totalPages =  newsApiService.OnFetchImages().then(totalHits)
    // console.log(totalPages)
    // newsApiService.OnFetchImages().then(data =>{(console.log(data.totalHits))})
}

function onLoadMore(event) {
  newsApiService.OnFetchImages().then(articlesMarkup);
  newsApiService.OnFetchImages().then(data =>{
  let totalpage = data.totalHits/data.hits.length; 
  let currentPage = newsApiService.page
    console.log(currentPage)
    if(currentPage > totalpage){Notiflix.Notify.info("We're sorry, but you've reached the end of search results.")}
})
}

function articlesMarkup(hits) {
  galleryRef.insertAdjacentHTML('beforeend', articlesTpl(hits))
  lightbox.refresh()
  const { height: cardHeight } = document
  .querySelector(".gallery")
  .firstElementChild.getBoundingClientRect();

window.scrollBy({
  top: cardHeight * 2,
  behavior: "smooth",
});
}

function articlesTpl(data) {
  return data.hits
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

