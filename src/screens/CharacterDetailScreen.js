import React, { useCallback, useEffect, useState } from 'react';
import { View, Text, Image, ScrollView, StyleSheet } from 'react-native';
import { getEpisodesByIds } from '../api/rickandmorty';
import { Loading, ErrorView } from '../components/StateViews';
import { colors, statusColor } from '../theme';

const BASE_URL = 'https://rickandmortyapi.com/api';

function Field({ label, value }) {
  return (
    <View style={styles.field}>
      <Text style={styles.label}>{label}</Text>
      <Text style={styles.value}>{value || 'Desconhecido'}</Text>
    </View>
  );
}

export default function CharacterDetailScreen({ id }) {
  const [character, setCharacter] = useState(null);
  const [episodes, setEpisodes] = useState([]);
  const [error, setError] = useState(null);

  const load = useCallback(async () => {
    try {
      const res = await fetch(`${BASE_URL}/character/${id}`);
      if (!res.ok) throw new Error('Não foi possível carregar o personagem.');
      const data = await res.json();
      setCharacter(data);

      const episodeIds = data.episode.map((url) => url.split('/').pop());
      setEpisodes(await getEpisodesByIds(episodeIds));
    } catch (e) {
      setError(e.message);
    }
  }, [id]);

  useEffect(() => {
    const timer = setTimeout(load, 0);
    return () => clearTimeout(timer);
  }, [load]);

  const retry = () => {
    setError(null);
    setCharacter(null);
    setEpisodes([]);
    load();
  };

  if (error) return <ErrorView message={error} onRetry={retry} />;
  if (!character) return <Loading />;

  return (
    <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 32 }}>
      <Image source={{ uri: character.image }} style={styles.image} />
      <View style={styles.body}>
        <Text style={styles.name}>{character.name}</Text>
        <View style={styles.statusRow}>
          <View style={[styles.dot, { backgroundColor: statusColor(character.status) }]} />
          <Text style={styles.value}>{character.status}</Text>
        </View>

        <Field label="Espécie" value={character.species} />
        <Field label="Tipo" value={character.type} />
        <Field label="Gênero" value={character.gender} />
        <Field label="Origem" value={character.origin?.name} />
        <Field label="Última localização" value={character.location?.name} />

        <Text style={styles.section}>Episódios ({episodes.length})</Text>
        {episodes.map((ep) => (
          <View key={ep.id} style={styles.episode}>
            <Text style={styles.episodeCode}>{ep.episode}</Text>
            <Text style={styles.episodeName} numberOfLines={1}>{ep.name}</Text>
          </View>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  image: { width: '100%', height: 320 },
  body: { padding: 16 },
  name: { color: colors.text, fontSize: 26, fontWeight: '800', marginBottom: 6 },
  statusRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 16 },
  dot: { width: 10, height: 10, borderRadius: 5, marginRight: 8 },
  field: { marginBottom: 12 },
  label: { color: colors.muted, fontSize: 13, marginBottom: 2 },
  value: { color: colors.text, fontSize: 16 },
  section: { color: colors.primary, fontSize: 18, fontWeight: '700', marginTop: 16, marginBottom: 8 },
  episode: {
    flexDirection: 'row', backgroundColor: colors.card, padding: 12, borderRadius: 8,
    marginBottom: 8, borderWidth: 1, borderColor: colors.border,
  },
  episodeCode: { color: colors.primary, fontWeight: '700', width: 70 },
  episodeName: { color: colors.text, flex: 1 },
});
