import Notiflix from 'notiflix';
import { getImages } from '../src/js/fetchImages';
const form = document.querySelector('.search-form');
const gallery = document.querySelector('.gallery');

form.addEventListener('submit', event => {
    event.preventDefault();
    galleryParser(event.target.searchQuery.value)
});


console.log(getImages('cat'));

function galleryParser(searchTerm) {
    Notiflix.Notify.info(searchTerm);
    console.log(getImages(searchTerm));
}