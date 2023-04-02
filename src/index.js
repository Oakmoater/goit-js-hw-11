import Notiflix from 'notiflix';
import { getImages } from '../src/js/fetchImages';
const form = document.querySelector('.search-form');
const gallery = document.querySelector('.gallery');
const loadBtn = document.querySelector('.load-more');

let pageState = 1;
let searchState = '';

form.addEventListener('submit', event => {
    event.preventDefault();
    galleryParser(event.target.searchQuery.value)
});

loadBtn.addEventListener('click', event => {
    event.preventDefault();
    galleryUpload(searchState, pageState);
});

function galleryParser(searchTerm) {
    if (searchTerm !== searchState) {
        searchState = searchTerm;
        clearPage();
        updateButton();
        pageUpdate();
        fetchImages(searchTerm, 1);
    };
};

function galleryUpload(searchState, pageState) {
    fetchImages(searchState, pageState);
    pageUpdate();
};

const fetchImages = (search, page) => getImages(search, page)
    .then(({hits, total}) => {
        renderGallery(hits);
        if (page === 1) {
            Notiflix.Notify.success(`Hooray! We found ${total} images.`);
        }
    })
    .catch(e => console.log(e));

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
function pageUpdate() {
    return pageState += 1;
}
function clearPage() {
    gallery.innerHTML = '';
};
function updateButton() {
    loadBtn.style.display = 'block';
};
// largeImageURL - посилання на велике зображення.