import Notiflix from 'notiflix';
import SimpleLightbox from 'simplelightbox';
import { getImages } from '../src/js/fetchImages';
const form = document.querySelector('.search-form');
const gallery = document.querySelector('.gallery');
const loadBtn = document.querySelector('.load-more');
let pageState = 1;
let searchState = '';

let Lightbox = new SimpleLightbox('.gallery a', {
  captionSelector: 'img',
  captionsData: 'alt',
  captionPosition: 'bottom',
  captionDelay: 250,
});

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
        pageNumberUpdate();
        fetchImages(searchTerm, 1);
    };
};

function galleryUpload(searchState, pageState) {
    fetchImages(searchState, pageState);
    pageNumberUpdate();
};

const fetchImages = (search, page) => getImages(search, page)
    .then(({ hits, total }) => {
        if (total === 0) {
            Notiflix.Notify.failure('Sorry, there are no images matching your search query. Please try again.');
            return
        };
        if (page >= (Math.ceil(total / 40))) {
            Notiflix.Notify.info("We're sorry, but you've reached the end of search results.");
            return
        }
        renderGallery(hits);
        Lightbox.refresh();
        updateButton();
        if (page === 1) {
            Notiflix.Notify.success(`Hooray! We found ${total} images.`);
        };
    })
    .catch(e => console.log(e));

function renderGallery(hits) {
    const galleryMarkup = hits.map(({largeImageURL, webformatURL, tags, likes, views, comments, downloads }) => {
        return `
            <div class="photo-card">
                <a class="link__photo-card" href="${largeImageURL}" >
                    <img class="image__photo-card" src="${webformatURL}" alt="${tags}" loading="lazy" />
                </a>
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

function pageNumberUpdate() {
    return pageState += 1;
}
function clearPage() {
    gallery.innerHTML = '';
    Lightbox.refresh();
};
function updateButton() {
    loadBtn.style.display = 'block';
};
// largeImageURL - посилання на велике зображення.