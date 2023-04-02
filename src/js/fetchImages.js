import axios from 'axios';
export async function getImages(requestValue, pageNumber) {
    const params = new URLSearchParams({
        key: '34826536-c17610f3e35e961c28d89bffe',
        // key: process.env.IMAGE_API_KEY,
        q: requestValue,
        image_type: 'photo',
        orientation: 'horizontal',
        safesearch: true,
        per_page: 40,
        page: pageNumber
    });
    try {
        const response = await axios.get(`https://pixabay.com/api/?${params.toString()}`);
        return (response.data);
    } catch (error) {
        console.log('Сталася помилка:', error.message);
    }
};

