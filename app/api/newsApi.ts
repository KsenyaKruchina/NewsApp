import axios from 'axios';

const API_KEY = 'f006b7650fdf46bab384c45fe696df06';
const BASE_URL = 'https://newsapi.org/v2';

interface Article {
  id: string;
  title: string;
  urlToImage?: string;
  publishedAt: string;
  source?: { name: string };
  [key: string]: any;
}

export const fetchNews = async (): Promise<Article[]> => {
  try {
    const response = await axios.get(`${BASE_URL}/top-headlines?country=us&apiKey=${API_KEY}`);
    return response.data.articles.map((article: any, index: number) => ({
      ...article,
      id: `${index}-${new Date().getTime()}`
    }));
  } catch (error) {
    console.error('Ошибка загрузки новостей:', error);
    throw error;
  }
};