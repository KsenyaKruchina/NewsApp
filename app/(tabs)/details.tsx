import { View, Text, ScrollView, StyleSheet, Image, Linking, TouchableOpacity } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useFavorites } from '../context/FavoritesContex';

export default function NewsDetails() {
  const { newsItem } = useLocalSearchParams();
  const item = typeof newsItem === 'string' ? JSON.parse(newsItem) : newsItem;
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
    <ScrollView style={styles.container}>
      <Image
        source={{ uri: item.urlToImage || 'https://via.placeholder.com/150' }}
        style={styles.image}
      />
      <TouchableOpacity onPress={toggleFavorite} style={styles.favoriteButton}>
        <Ionicons 
          name={favorite ? 'heart' : 'heart-outline'} 
          size={32} 
          color={favorite ? 'red' : '#fff'} 
        />
      </TouchableOpacity>
      <View style={styles.content}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.source}>
          {item.source?.name || 'Unknown'} • {new Date(item.publishedAt).toLocaleDateString()}
        </Text>
        {item.description && <Text style={styles.description}>{item.description}</Text>}
        {item.content && <Text style={styles.contentText}>{item.content}</Text>}
        {item.author && <Text style={styles.author}>Автор: {item.author}</Text>}
        {item.url && (
          <Text style={styles.url} onPress={() => Linking.openURL(item.url)}>
            Читать полностью: {item.url}
          </Text>
        )}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  image: {
    width: '100%',
    height: 250,
    resizeMode: 'cover',
  },
  content: {
    padding: 16,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#333',
  },
  source: {
    fontSize: 14,
    color: '#666',
    marginBottom: 16,
  },
  description: {
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 16,
    color: '#444',
  },
  contentText: {
    fontSize: 15,
    lineHeight: 22,
    marginBottom: 16,
    color: '#555',
  },
  author: {
    fontSize: 14,
    fontStyle: 'italic',
    color: '#666',
    marginBottom: 8,
  },
  url: {
    fontSize: 14,
    color: '#1e90ff',
    marginTop: 16,
  },
  favoriteButton: {
    position: 'absolute',
    top: 20,
    right: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    borderRadius: 20,
    padding: 8,
  },
});