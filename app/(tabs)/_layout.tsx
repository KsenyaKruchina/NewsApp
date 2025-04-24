import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

export default function TabLayout() {
  return (
    <Tabs screenOptions={{ tabBarActiveTintColor: '#1e90ff' }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Новости',
          tabBarIcon: ({ color }) => <Ionicons name="newspaper" size={24} color={color} />
        }}
      />
      <Tabs.Screen
      name="explore"
      options={{
        title: 'Поиск',
        tabBarIcon: ({ color }) => <Ionicons name="search" size={24} color={color} />
      }}  
      />
    </Tabs>
  );
}