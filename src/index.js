import SimpleLightbox from 'simplelightbox';
import Notiflix from 'notiflix';
import axios from 'axios';
import NewsApiService from './new-service';
import NewsApiService from './new-service';

const searchForm = document.querySelector('#search-form');
const inputRef = document.querySelector('input[name="searchQuery"]');
const loadMoreBtnRef = document.querySelector('.load-more');
const searchBtnRef = document.querySelector('button');

const newsApiService = new NewsApiService();


searchForm.addEventListener('submit', onSearch);
loadMoreBtnRef.addEventListener('click', onLoadMore);

function onSearch(event) {
  event.preventDefault();
  newsApiService.query = event.currentTarget.elements.searchQuery.value;
  newsApiService.OnFetchImages();
  
  }
function onLoadMore(event) {
  newsApiService.OnFetchImages();
}

  