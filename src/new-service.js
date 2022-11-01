export default class NewsApiService {
    constructor() {
this.searchQuery = '';
this.page = 0;
this.per_page = 40;
    }
    async OnFetchImages() {
        const URL = 'https://pixabay.com/api/';
        const KEY = '30992606-4305b7e2b4564aba7b063f01d';
      
        try {
          const response = await fetch(
            `${URL}?key=${KEY}&q=${this.searchQuery}&image_type=photo&orientation=horizontal&safesearch=true&page=${this.page}&per_page=${this.per_page}`
          );
          const data = await response.json();
          this.page += 1;
        } catch (error) {
          console.log('error');
        }
      }
      get query() {
        return this.searchQuery;
      }

      set query(newQuery) {
        this.searchQuery = newQuery;
      }
}
