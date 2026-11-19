import React, { useCallback, useEffect, useState } from 'react';
import { router } from 'expo-router';
import {
  View, Text, Image, FlatList, TextInput, TouchableOpacity,
  ActivityIndicator, StyleSheet,
} from 'react-native';
import { getCharacters } from '../api/rickandmorty';
import { usePaginated } from '../hooks';
import { Loading, ErrorView, EmptyView } from '../components/StateViews';
import { colors, statusColor } from '../theme';

export default function CharactersScreen() {
  const [search, setSearch] = useState('');
  const [debounced, setDebounced] = useState('');

  useEffect(() => {
    const t = setTimeout(() => setDebounced(search.trim()), 400);
    return () => clearTimeout(t);
  }, [search]);

  const fetchCharacters = useCallback((page) => getCharacters(page, debounced), [debounced]);
  const { items, loading, loadingMore, error, loadMore, reload } = usePaginated(fetchCharacters);

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() =>
        router.navigate({
          pathname: '/personagem/[id]',
          params: { id: String(item.id), name: item.name },
        })
      }
    >
      <Image source={{ uri: item.image }} style={styles.avatar} />
      <View style={styles.info}>
        <Text style={styles.name} numberOfLines={1}>{item.name}</Text>
        <View style={styles.statusRow}>
          <View style={[styles.dot, { backgroundColor: statusColor(item.status) }]} />
          <Text style={styles.sub}>{item.status} - {item.species}</Text>
        </View>
        <Text style={styles.sub} numberOfLines={1}>{item.location?.name}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.search}
        placeholder="Buscar personagem"
        placeholderTextColor={colors.muted}
        value={search}
        onChangeText={setSearch}
        autoCorrect={false}
      />
      {loading ? (
        <Loading />
      ) : error ? (
        <ErrorView message={error} onRetry={reload} />
      ) : items.length === 0 ? (
        <EmptyView message="Nenhum personagem encontrado." />
      ) : (
        <FlatList
          data={items}
          keyExtractor={(item) => String(item.id)}
          renderItem={renderItem}
          onEndReached={loadMore}
          onEndReachedThreshold={0.5}
          contentContainerStyle={{ padding: 12 }}
          ListFooterComponent={
            loadingMore ? <ActivityIndicator color={colors.primary} style={{ margin: 16 }} /> : null
          }
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  search: {
    backgroundColor: colors.card, color: colors.text, margin: 12, marginBottom: 0,
    paddingHorizontal: 14, paddingVertical: 10, borderRadius: 10, fontSize: 16,
    borderWidth: 1, borderColor: colors.border,
  },
  card: {
    flexDirection: 'row', backgroundColor: colors.card, borderRadius: 12,
    marginBottom: 12, overflow: 'hidden', borderWidth: 1, borderColor: colors.border,
  },
  avatar: { width: 96, height: 96 },
  info: { flex: 1, padding: 12, justifyContent: 'center' },
  name: { color: colors.text, fontSize: 17, fontWeight: '700', marginBottom: 4 },
  statusRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 2 },
  dot: { width: 9, height: 9, borderRadius: 5, marginRight: 6 },
  sub: { color: colors.muted, fontSize: 14 },
});
