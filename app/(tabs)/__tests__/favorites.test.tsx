import React from 'react';
import { render, screen } from '@testing-library/react-native';
import FavoritesScreen from '../favorites';

jest.mock('@react-native-async-storage/async-storage', () => ({
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
}));

// Mock the context
jest.mock('../../context/FavoritesContext', () => ({
  useFavorites: () => ({
    favorites: [],
    addFavorite: jest.fn(),
    removeFavorite: jest.fn(),
    isFavorite: jest.fn(),
  }),
}));

describe('FavoritesScreen', () => {
  it('shows empty message when no favorites', () => {
    render(<FavoritesScreen />);
    expect(screen.getByText('Нет избранных новостей')).toBeTruthy();
  });

  it('displays list of favorites', () => {
    // Mock with favorites
    jest.mock('../../context/FavoritesContext', () => ({
      useFavorites: () => ({
        favorites: [
          {
            id: '1',
            title: 'Favorite News 1',
            urlToImage: 'https://test.com/image1.jpg',
            publishedAt: '2023-05-01T10:00:00Z',
            source: { name: 'Test Source 1' }
          }
        ],
        addFavorite: jest.fn(),
        removeFavorite: jest.fn(),
        isFavorite: jest.fn(),
      }),
    }));

    render(<FavoritesScreen />);
    expect(screen.getByText('Favorite News 1')).toBeTruthy();
  });
});