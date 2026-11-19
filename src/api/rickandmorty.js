const BASE_URL = 'https://rickandmortyapi.com/api';

async function request(path) {
  const response = await fetch(`${BASE_URL}${path}`);

  if (response.status === 404) {
    // a API devolve 404 quando a busca não encontra nada
    return { info: { next: null, pages: 0 }, results: [] };
  }
  if (!response.ok) {
    throw new Error(`Erro ${response.status} ao acessar a API`);
  }
  return response.json();
}

export function getCharacters(page = 1, name = '') {
  return request(`/character?page=${page}&name=${encodeURIComponent(name)}`);
}

export function getEpisodes(page = 1) {
  return request(`/episode?page=${page}`);
}

export function getLocations(page = 1) {
  return request(`/location?page=${page}`);
}

export async function getEpisodesByIds(ids) {
  if (!ids.length) return [];
  const data = await request(`/episode/${ids.join(',')}`);
  // com um único id a API devolve um objeto, com vários devolve array
  return Array.isArray(data) ? data : [data];
}
