import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import NewsItem from '../NewsItem';
import { FavoritesProvider } from '../../context/FavoritesContex';

jest.mock('@react-native-async-storage/async-storage', () => ({
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
}));

const mockItem = {
  id: '1',
  title: 'Test News Title',
  description: 'Test news description',
  urlToImage: 'https://test.com/image.jpg',
  publishedAt: '2023-05-01T10:00:00Z',
  source: { name: 'Test Source' }
};

describe('NewsItem Component', () => {
  it('renders correctly', () => {
    const { getByText, getByTestId } = render(
      <FavoritesProvider>
        <NewsItem item={mockItem} />
      </FavoritesProvider>
    );

    expect(getByText('Test News Title')).toBeTruthy();
    expect(getByText('Test news description')).toBeTruthy();
    expect(getByText('Test Source • 5/1/2023')).toBeTruthy();
    expect(getByTestId('news-image').props.source.uri).toBe('https://test.com/image.jpg');
  });

  it('toggles favorite status when heart icon is pressed', () => {
    const { getByTestId } = render(
      <FavoritesProvider>
        <NewsItem item={mockItem} />
      </FavoritesProvider>
    );

    const heartIcon = getByTestId('favorite-button');
    
    // Initial state
    expect(heartIcon.props.children.props.name).toBe('heart-outline');
    
    // First press - add to favorites
    fireEvent.press(heartIcon);
    expect(heartIcon.props.children.props.name).toBe('heart');
    
    // Second press - remove from favorites
    fireEvent.press(heartIcon);
    expect(heartIcon.props.children.props.name).toBe('heart-outline');
  });
});