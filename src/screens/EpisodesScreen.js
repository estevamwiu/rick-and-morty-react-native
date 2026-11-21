import React from 'react';
import { View, Text, FlatList, ActivityIndicator, StyleSheet } from 'react-native';
import { getEpisodes } from '../api/rickandmorty';
import { usePaginated } from '../hooks';
import { Loading, ErrorView } from '../components/StateViews';
import { colors } from '../theme';

const monthsInPortuguese = new Map([
  ['January', 'janeiro'],
  ['February', 'fevereiro'],
  ['March', 'março'],
  ['April', 'abril'],
  ['May', 'maio'],
  ['June', 'junho'],
  ['July', 'julho'],
  ['August', 'agosto'],
  ['September', 'setembro'],
  ['October', 'outubro'],
  ['November', 'novembro'],
  ['December', 'dezembro'],
]);

function formatAirDate(airDate) {
  const match = /^([A-Za-z]+) (\d{1,2}), (\d{4})$/.exec(airDate);
  if (!match) return airDate;

  const [, month, day, year] = match;
  const translatedMonth = monthsInPortuguese.get(month);
  return translatedMonth ? `${Number(day)} de ${translatedMonth} de ${year}` : airDate;
}

export default function EpisodesScreen() {
  const { items, loading, loadingMore, error, loadMore, reload } = usePaginated(getEpisodes);

  if (loading) return <Loading />;
  if (error) return <ErrorView message={error} onRetry={reload} />;

  return (
    <FlatList
      style={styles.list}
      contentContainerStyle={{ padding: 12 }}
      data={items}
      keyExtractor={(item) => String(item.id)}
      onEndReached={loadMore}
      onEndReachedThreshold={0.5}
      renderItem={({ item }) => (
        <View style={styles.card}>
          <Text style={styles.code}>{item.episode}</Text>
          <Text style={styles.name}>{item.name}</Text>
          <Text style={styles.sub}>Exibido em {formatAirDate(item.air_date)}</Text>
          <Text style={styles.sub}>{item.characters.length} personagens</Text>
        </View>
      )}
      ListFooterComponent={
        loadingMore ? <ActivityIndicator color={colors.primary} style={{ margin: 16 }} /> : null
      }
    />
  );
}

const styles = StyleSheet.create({
  list: { flex: 1, backgroundColor: colors.background },
  card: {
    backgroundColor: colors.card, borderRadius: 12, padding: 14, marginBottom: 12,
    borderWidth: 1, borderColor: colors.border,
  },
  code: { color: colors.primary, fontWeight: '700', marginBottom: 4 },
  name: { color: colors.text, fontSize: 17, fontWeight: '700', marginBottom: 6 },
  sub: { color: colors.muted, fontSize: 14 },
});
