import axios from 'axios';

const API_KEY = 'f006b7650fdf46bab384c45fe696df06';
const BASE_URL = 'https://newsapi.org/v2';

export const fetchNews = async () => {
    try {
        const response = await axios.get(`${BASE_URL}/top-headlines?country=us&apiKey=${API_KEY}`
        );
        return response.data.articles;
    }   catch (error) {
        console.error('Ошибка загрузки новостей:', error);
        throw error;
    }
};