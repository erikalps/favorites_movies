import type { MovieDetails, SearchResponse } from '../types/movies';
const API_KEY = import.meta.env.VITE_OMDB_API_KEY;
const URL_BASE = 'http://www.omdbapi.com/';
const API_URL = 'http://localhost:3000'; // Backend local


// OMDb API — Integração externa // 

// Realiza a busca de filmes por título utilizando a OMDb API.
export async function fetchMovies(title: string): Promise<SearchResponse> {
  const url_request: string = `${URL_BASE}?s=${encodeURIComponent(title)}&apikey=${API_KEY}`;

  try {
    const res = await fetch(url_request);

    if (!res.ok) throw Error(`Erro ${res.status}`);
    // Resposta da OMDb segue o padrão SearchResponse
    const data: SearchResponse = await res.json();
    return data;

  } catch (error) {
    console.log('Erro ao buscar filmes:', error);
    throw error;
  }
}

// Busca os detalhes completos de um filme específico.
export async function fetchMoviesDetails(
  id: string
): Promise<MovieDetails> {

  const res = await fetch(
    `${URL_BASE}?i=${encodeURIComponent(id)}&apikey=${API_KEY}`
  );

  if (!res.ok) {
    throw new Error(`Erro ${res.status}`);
  }

  const data: MovieDetails = await res.json();

  return data;
}

// Backend API - Favoritos
// GET /favorites → retorna todos os filmes favoritados
export async function getFavoritesBackend() {
  try {
    const res = await fetch(`${API_URL}/favorites`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        // 'Authorization': 'Bearer <token>', se necessário
      }
    });

    if (!res.ok) {
      if (res.status === 404) throw new Error('Nenhum favorito encontrado');
      throw new Error(`Erro ${res.status}`);
    }

    return res.json();
  } catch (error) {
    console.error('Erro ao buscar favoritos:', error);
    throw error;
  }
}
// POST /favorites → adiciona um filme aos favoritos
export async function addFavoriteBackend(movie: any) {
  try {
    const res = await fetch(`${API_URL}/favorites`, {
      method: 'POST', // Método HTTP POST
      headers: { 'Content-Type': 'application/json' }, // Indica que o corpo é JSON
      body: JSON.stringify(movie), // Converte objeto JS em JSON
    });

    if (!res.ok) throw new Error(`Erro ${res.status}`); // Valida o http
    return res.json();

  } catch (error) {
    console.error('Erro ao adicionar favorito:', error);
    throw error;
  }
}

// DELETE /favorites/:id → remove um filme pelo ID
export async function deleteFavoriteBackend(id: string) {
  try {
    const res = await fetch(`${API_URL}/favorites/${id}`, { method: 'DELETE' }); // Requisição DELETE

    if (!res.ok) {
      if (res.status === 404) throw new Error('Filme não encontrado'); // Se o filme não existe
      throw new Error(`Erro ${res.status}`); // Outros erros
    }
    return res.json();

  } catch (error) {
    console.error('Erro ao deletar favorito:', error);
    throw error;
  }
}

// Atualiza rating e comment de um filme favoritado

export async function updateFavoriteBackend(id: string, data: { rating: number; coment?: string }) {
  try {
    const res = await fetch(`${API_URL}/favorites/${id}`, {
      method: 'PATCH', // Método HTTP PATCH para atualização parcial
      headers: { 'Content-Type': 'application/json' }, // Corpo JSON
      body: JSON.stringify(data), // Converte rating e comment em JSON
    });

    if (!res.ok) {
      if (res.status === 404) throw new Error('Filme não encontrado'); // Verifica se existe
      throw new Error(`Erro ${res.status}`); // Outros erros
    }
    return res.json();
  } catch (error) {
    console.log('Erro ao atualizar favoritos', error);
    throw error;
  }
}