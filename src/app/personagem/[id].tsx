import { Stack, useLocalSearchParams } from 'expo-router';
import CharacterDetailScreen from '../../screens/CharacterDetailScreen';

export default function CharacterRoute() {
  const { id, name } = useLocalSearchParams<{ id: string; name?: string }>();

  return (
    <>
      <Stack.Screen options={{ title: name ?? 'Detalhes' }} />
      <CharacterDetailScreen key={id} id={id} />
    </>
  );
}
