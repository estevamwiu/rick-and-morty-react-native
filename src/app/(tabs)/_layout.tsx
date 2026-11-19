import { Tabs } from 'expo-router';
import { colors } from '../../theme';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.muted,
        tabBarLabelStyle: { fontSize: 13, fontWeight: '600', marginBottom: 6 },
        tabBarIconStyle: { display: 'none' },
        tabBarStyle: { height: 56, backgroundColor: colors.card, borderTopColor: colors.border },
      }}
    >
      <Tabs.Screen name="index" options={{ title: 'Personagens' }} />
      <Tabs.Screen name="episodios" options={{ title: 'Episódios' }} />
      <Tabs.Screen name="locais" options={{ title: 'Locais' }} />
    </Tabs>
  );
}
