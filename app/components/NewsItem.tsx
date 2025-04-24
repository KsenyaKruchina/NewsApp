import { View, Text, StyleSheet, Image } from 'react-native';

export default function NewsItem({ item }) {
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
  },
  image: {
    width: '100%',
    height: 180,
    borderRadius: 4,
    marginBottom: 12,
  },
  textContainer: {
    paddingHorizontal: 4,
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
});