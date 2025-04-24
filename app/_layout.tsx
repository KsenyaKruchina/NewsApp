import { Stack } from 'expo-router';

export default function RootLayout() {
  return (
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
  );
}