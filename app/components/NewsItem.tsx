import { View, Text, StyleSheet, Image } from 'react-native';

export default function NewsItem({ item }) {
  return (
    <View style={styles.container}>
      <Image
        source={{ uri: item.urlToImage || 'https://via.placeholder.com/150' }}
        style={styles.image}
      />
      <Text style={styles.title}>{item.title || item.title}</Text>
      <Text style={styles.source}>{item.source?.name || 'Unknown'}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  image: {
    width: '100%',
    height: 200,
    borderRadius: 8,
    marginBottom: 12,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  source: {
    fontSize: 12,
    color: '#666',
    marginTop: 4,
  },
});