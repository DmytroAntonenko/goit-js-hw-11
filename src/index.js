import SimpleLightbox from 'simplelightbox';
import Notiflix from 'notiflix';
import axios from 'axios';

const searchForm = document.querySelector('#search-form');
const inputRef = document.querySelector('input[name="searchQuery"]');

let per_page = 40;
let page = 1;

searchForm.addEventListener('submit', onSearch);

function onSearch(event) {
  event.preventDefault();
  const searchQuery = event.currentTarget.elements.searchQuery.value;
  console.log(searchQuery)
  
  async function OnFetchImages(searchQuery, page, per_page) {
    const URL = 'https://pixabay.com/api/';
    const KEY = '30992606-4305b7e2b4564aba7b063f01d';
  
    try {
      const response = await fetch(
        `${URL}?key=${KEY}&q=${searchQuery}&image_type=photo&orientation=horizontal&safesearch=true&page=${page}&per_page=${per_page}`
      );
      const users = await response.json();
      console.log(users);
    } catch (error) {
      console.log(error);
    }
  }
}


