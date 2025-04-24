import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useFavorites } from '../context/FavoritesContex';

export default function NewsItem({ item }) {
  const { addFavorite, removeFavorite, isFavorite } = useFavorites();
  const favorite = isFavorite(item.id);

  const toggleFavorite = () => {
    if (favorite) {
      removeFavorite(item.id);
    } else {
      addFavorite({
        id: item.id,
        title: item.title,
        urlToImage: item.urlToImage,
        publishedAt: item.publishedAt,
        source: item.source
      });
    }
  };

  return (
    <View style={styles.container}>
      <Image
        source={{ uri: item.urlToImage || 'https://via.placeholder.com/150' }}
        style={styles.image}
      />
      <View style={styles.textContainer}>
        <Text style={styles.title} numberOfLines={2}>{item.title}</Text>
        <Text style={styles.source}>{item.source?.name || 'Unknown'} • {new Date(item.publishedAt).toLocaleDateString()}</Text>
        <Text style={styles.description} numberOfLines={2}>{item.description}</Text>
      </View>
      <TouchableOpacity onPress={toggleFavorite} style={styles.favoriteButton}>
        <Ionicons 
          name={favorite ? 'heart' : 'heart-outline'} 
          size={24} 
          color={favorite ? 'red' : '#ccc'} 
        />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    backgroundColor: '#fff',
    marginHorizontal: 16,
    marginVertical: 8,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    flexDirection: 'row',
    position: 'relative',
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 4,
    marginRight: 12,
  },
  textContainer: {
    flex: 1,
    paddingRight: 24,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 6,
    color: '#333',
  },
  source: {
    fontSize: 12,
    color: '#666',
    marginBottom: 8,
  },
  description: {
    fontSize: 14,
    color: '#555',
  },
  favoriteButton: {
    position: 'absolute',
    top: 16,
    right: 16,
  },
});