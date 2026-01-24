import type { MovieDetails, SearchResponse } from '../types/movies';
const API_KEY = import.meta.env.VITE_OMDB_API_KEY;
const URL_BASE = 'http://www.omdbapi.com/';


//busca de filmes 

export async function fechMovies(title: string): Promise<SearchResponse> {
    console.log("title is" + title);
    const url_request: string = `${URL_BASE}?s=${encodeURIComponent(title)}&apikey=${API_KEY}`;
    console.log("url da request" + url_request);
    try {
        const res = await fetch (url_request);

        if(!res.ok) throw Error(`Erro ${res.status}`);       
        
        const data: SearchResponse = await res.json(); //dados da api preenchem a interface
        
        return data;
    } catch (error) {
        console.log('Erro ao buscar filmes:', error);
        throw error; 
    }
  
}

export async function fechMoviesDetails(
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

