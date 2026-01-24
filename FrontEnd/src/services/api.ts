import type { MovieDetails, SearchResponse } from '../types/movies';
const API_KEY = import.meta.env.VITE_OMDB_API_KEY;
const URL_BASE = 'http://www.omdbapi.com/';


//busca de filmes 

export async function fechMovies(title: string): Promise<SearchResponse> {
    console.log("title is" + title);
    const url_request: string = `${URL_BASE}?s=${encodeURIComponent(title)}&apikey=${API_KEY}`;
    console.log("url da request" + url_request);
    const res = await fetch (url_request);
    const data: SearchResponse = await res.json(); //dados da api preenchem a interface
    console.log(data);
    return data;
}

export async function fechMoviesDetails(id:string) {
    const res = await fetch (`${URL_BASE}? S=${encodeURIComponent(id)}&apikey=${API_KEY}`);
    const data: MovieDetails = await res.json();
    return data;
}
