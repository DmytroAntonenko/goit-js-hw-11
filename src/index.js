import SimpleLightbox from 'simplelightbox';
import Notiflix from 'notiflix';
import axios from 'axios';




const searchForm = document.querySelector('#search-form');
const inputRef = document.querySelector('input[name="searchQuery"]');

let per_page = 40;
let page = 0;
let name = inputRef.value.trim();
console.log(name)

searchForm.addEventListener('submit', onSearch);

function onSearch(event) {
  event.preventDefault();
  async function OnFetchImages(name, page, per_page) {
    const URL = 'https://pixabay.com/api/';
    const KEY = '30992606-4305b7e2b4564aba7b063f01d';
  
    try {
      const response = await axios.get(
        `${URL}?key=${KEY}&q=${name}&image_type=photo&orientation=horizontal&safesearch=true&page=${page}&per_page=${per_page}`
      );
      return response.data;
    } catch (error) {
      console.log(error);
    }
  }
}


