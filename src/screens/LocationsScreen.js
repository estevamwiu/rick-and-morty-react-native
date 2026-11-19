import React from 'react';
import { View, Text, FlatList, ActivityIndicator, StyleSheet } from 'react-native';
import { getLocations } from '../api/rickandmorty';
import { usePaginated } from '../hooks';
import { Loading, ErrorView } from '../components/StateViews';
import { colors } from '../theme';

export default function LocationsScreen() {
  const { items, loading, loadingMore, error, loadMore, reload } = usePaginated(getLocations);

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
          <Text style={styles.name}>{item.name}</Text>
          <Text style={styles.sub}>Tipo: {item.type || 'Desconhecido'}</Text>
          <Text style={styles.sub}>Dimensão: {item.dimension || 'Desconhecida'}</Text>
          <Text style={styles.sub}>{item.residents.length} residentes</Text>
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
  name: { color: colors.text, fontSize: 17, fontWeight: '700', marginBottom: 6 },
  sub: { color: colors.muted, fontSize: 14, marginBottom: 2 },
});
