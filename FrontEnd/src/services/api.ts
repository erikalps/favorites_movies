import type { MovieDetails, SearchResponse } from '../types/movies';
const API_KEY = import.meta.env.VITE_OMDB_API_KEY;
const URL_BASE = 'https://www.omdbapi.com/';


//busca de filmes 

export async function fechMovies(title:string): Promise<SearchResponse> {
    const res = await fetch (`${URL_BASE}? S=${encodeURIComponent(title)}&apikey=${API_KEY}`);
    const data: SearchResponse = await res.json(); //dados da api preenchem a interface
    return data;
}

export async function fechMoviesDetails(id:string) {
    const res = await fetch (`${URL_BASE}? S=${encodeURIComponent(id)}&apikey=${API_KEY}`);
    const data: MovieDetails = await res.json();
    return data;
}
