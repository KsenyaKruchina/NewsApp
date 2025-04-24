import React, { createContext, useContext, useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface FavoriteItem {
  id: string;
  title: string;
  urlToImage?: string;
  publishedAt: string;
  source?: { name: string };
}

interface FavoritesContextType {
  favorites: FavoriteItem[];
  addFavorite: (item: FavoriteItem) => Promise<void>;
  removeFavorite: (id: string) => Promise<void>;
  isFavorite: (id: string) => boolean;
}

const FavoritesContext = createContext<FavoritesContextType>({
  favorites: [],
  addFavorite: async () => {},
  removeFavorite: async () => {},
  isFavorite: () => false,
});

export const FavoritesProvider: React.FC<{children: React.ReactNode}> = ({ children }) => {
  const [favorites, setFavorites] = useState<FavoriteItem[]>([]);

  useEffect(() => {
    const loadFavorites = async () => {
      try {
        const storedFavorites = await AsyncStorage.getItem('favorites');
        if (storedFavorites) {
          setFavorites(JSON.parse(storedFavorites));
        }
      } catch (error) {
        console.error('Error loading favorites:', error);
      }
    };

    loadFavorites();
  }, []);

  const addFavorite = async (item: FavoriteItem) => {
    try {
      const newFavorites = [...favorites, item];
      setFavorites(newFavorites);
      await AsyncStorage.setItem('favorites', JSON.stringify(newFavorites));
    } catch (error) {
      console.error('Error adding favorite:', error);
    }
  };

  const removeFavorite = async (id: string) => {
    try {
      const newFavorites = favorites.filter(fav => fav.id !== id);
      setFavorites(newFavorites);
      await AsyncStorage.setItem('favorites', JSON.stringify(newFavorites));
    } catch (error) {
      console.error('Error removing favorite:', error);
    }
  };

  const isFavorite = (id: string) => {
    return favorites.some(fav => fav.id === id);
  };

  return (
    <FavoritesContext.Provider value={{ favorites, addFavorite, removeFavorite, isFavorite }}>
      {children}
    </FavoritesContext.Provider>
  );
};

export const useFavorites = () => useContext(FavoritesContext);