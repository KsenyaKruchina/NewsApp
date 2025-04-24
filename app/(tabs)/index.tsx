import { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, ActivityIndicator, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { fetchNews } from '../api/newsApi';
import NewsItem from '../components/NewsItem';

export default function NewsScreen() {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigation = useNavigation();

  useEffect(() => {
    const loadNews = async () => {
      try {
        const data = await fetchNews();
        setNews(data);
      } catch (err) {
        setError('Не удалось загрузить новости');
      } finally {
        setLoading(false);
      }
    };

    loadNews();
  }, []);

  const handlePress = (item) => {
    navigation.navigate('details', { 
      newsItem: JSON.stringify(item) 
    });
  };

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#1e90ff" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.center}>
        <Text style={styles.error}>{error}</Text>
      </View>
    );
  }

  return (
    <FlatList
      data={news}
      keyExtractor={(item) => item.title || String(Math.random())}
      renderItem={({ item }) => (
        <TouchableOpacity onPress={() => handlePress(item)}>
          <NewsItem item={item} />
        </TouchableOpacity>
      )}
      contentContainerStyle={styles.list}
    />
  );
}

const styles = StyleSheet.create({
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  error: {
    color: 'red',
    fontSize: 16,
  },
  list: {
    paddingBottom: 16,
  },
});