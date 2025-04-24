import { useNavigation } from '@react-navigation/native';
import { View, Text, StyleSheet, FlatList, ActivityIndicator, TouchableOpacity } from 'react-native';
import { useFavorites } from '../context/FavoritesContex';
import NewsItem from '../components/NewsItem';

export default function FavoritesScreen() {
    const { favorites } = useFavorites();
    const navigation = useNavigation();

    const handlePress = (item: any) => {
        navigation.navigate('details', {
            newsItem: JSON.stringify(item)
        });
    };
    if (favorites.length === 0) {
        return (
            <View style={styles.center}>
                <Text style={styles.emptyText}>Нет избранных новостей</Text>
            </View>
        );
    }
    return (
        <FlatList
            data={favorites}
            keyExtractor={(item) => item.id}
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
    emptyText: {        
        fontSize: 16,
        color: '#666',
    },
    list: {
        paddingBottom: 16,
    },
});