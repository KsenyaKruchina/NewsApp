import { Stack } from 'expo-router';
import { FavoritesProvider } from './context/FavoritesContex';

export default function RootLayout() {
  return (
    <FavoritesProvider>
    <Stack>
      <Stack.Screen name="(tabs)" options={{ headerShown: false}} />
      <Stack.Screen
        name="details"
        options={{
          title: 'Детали новости',
          headerStyle: { backgroundColor: '#1e90ff'},
          headerTintColor: '#fff',
        }}
      />
    </Stack>
    </FavoritesProvider>
  );
}