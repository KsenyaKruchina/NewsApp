import axios from 'axios';
import { fetchNews } from '../newsApi';

jest.mock('axios');

describe('fetchNews', () => {
  it('fetches news successfully', async () => {
    const mockData = {
      articles: [
        {
          title: 'Test News',
          urlToImage: 'https://test.com/image.jpg',
          publishedAt: '2023-05-01T10:00:00Z',
          source: { name: 'Test Source' }
        }
      ]
    };

    (axios.get as jest.Mock).mockResolvedValue({ data: mockData });

    const result = await fetchNews();
    
    expect(result).toEqual([
      {
        id: expect.any(String),
        title: 'Test News',
        urlToImage: 'https://test.com/image.jpg',
        publishedAt: '2023-05-01T10:00:00Z',
        source: { name: 'Test Source' }
      }
    ]);
    expect(axios.get).toHaveBeenCalledWith(
      'https://newsapi.org/v2/top-headlines?country=us&apiKey=f006b7650fdf46bab384c45fe696df06'
    );
  });

  it('handles errors', async () => {
    (axios.get as jest.Mock).mockRejectedValue(new Error('Network Error'));

    await expect(fetchNews()).rejects.toThrow('Network Error');
  });
});