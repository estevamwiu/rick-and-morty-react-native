import { useCallback, useEffect, useRef, useState } from 'react';

// `fetcher(page)` precisa devolver { info: { next }, results }.
export function usePaginated(fetcher) {
  const [items, setItems] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [error, setError] = useState(null);
  const requestId = useRef(0);

  const load = useCallback(async (pageToLoad, replace) => {
    const id = ++requestId.current;
    try {
      setError(null);
      setLoading(replace);
      setLoadingMore(!replace);
      const data = await fetcher(pageToLoad);
      if (id !== requestId.current) return;
      setItems((prev) => (replace ? data.results : [...prev, ...data.results]));
      setHasMore(Boolean(data.info?.next));
      setPage(pageToLoad);
    } catch (e) {
      if (id === requestId.current) setError(e.message);
    } finally {
      if (id === requestId.current) {
        setLoading(false);
        setLoadingMore(false);
      }
    }
  }, [fetcher]);

  useEffect(() => {
    let active = true;
    Promise.resolve().then(() => {
      if (active) load(1, true);
    });
    return () => {
      active = false;
      requestId.current += 1;
    };
  }, [load]);

  const loadMore = () => {
    if (!loading && !loadingMore && hasMore) load(page + 1, false);
  };

  return { items, loading, loadingMore, error, loadMore, reload: () => load(1, true) };
}
