import { API_KEY } from './API_KEY';
import axios from 'axios';

export async function getImages(requestValue) {
    try {
        const response = await axios.get(`https://pixabay.com/api/?key=${API_KEY}&q=${requestValue}&image_type=photo&orientation=horizontal&safesearch=true`);
        return (response);
    } catch (error) {
        console.log('Сталася помилка:', error.message);
    }
};

