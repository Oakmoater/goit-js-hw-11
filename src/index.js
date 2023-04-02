import Notiflix from 'notiflix';
import { getImages } from '../src/js/fetchImages';
const form = document.querySelector('.search-form');
const gallery = document.querySelector('.gallery');
let pageState = 1;
let searchState = '';

console.log(getImages('cat', pageState));

form.addEventListener('submit', event => {
    event.preventDefault();
    galleryParser(event.target.searchQuery.value)
});
const fetchImages = (search, page) => getImages(search, page)
    .then(({hits, total}) => {
        renderGallery(hits);
    }).catch(e => console.log(e));

function clearPage() {
    gallery.innerHTML = '';
    };

function galleryParser(searchTerm) {
    if (searchTerm !== searchState) {
        clearPage();
        searchState = searchTerm;
        pageState = 1;
        fetchImages(searchTerm, pageState);
    };
};
function renderGallery(hits) {
    const galleryMarkup = hits.map(({ webformatURL, tags, likes, views, comments, downloads }) => {
        return `
        <div class="photo-card">
            <img src="${webformatURL}" alt="${tags}" loading="lazy" />
            <div class="info">
                <p class="info-item">
                    <b>Likes</b> ${likes}
                </p>
                <p class="info-item">
                    <b>Views</b> ${views}
                </p>
                <p class="info-item">
                    <b>Comments</b> ${comments}
                </p>
                <p class="info-item">
                    <b>Downloads</b> ${downloads}
                </p>
            </div>
        </div>
        `
    });
    gallery.insertAdjacentHTML('beforeend', galleryMarkup.join(' '));
};


// largeImageURL - посилання на велике зображення.