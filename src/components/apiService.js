const baseUrl = 'https://pixabay.com/api/';
const key = '14472028-808bc64ad5a80955cde6e6aeb';

export default {
  page: 1,
  query: '',
  fetchImages() {
    const requestParams = `?image_type=photo&orientation=horizontal&q=${this.query}&page=${this.page}&per_page=12&key=`;
    return fetch(baseUrl + requestParams + key)
      .then(response => response.json())
      .then(parsedResponce => {
        this.incrementPage();
        return parsedResponce.hits;
      });
  },

  get searchQuery() {
    return this.query;
  },

  set searchQuery(string) {
    this.query = string;
  },

  incrementPage() {
    this.page += 1;
  },

  resetPage() {
    this.page = 1;
  },

  scrollPage() {
    const y = document.querySelector('.button').offsetTop;

    window.scrollTo({
      top: y,
      left: 0,
      behavior: 'smooth',
    });
  },
};
