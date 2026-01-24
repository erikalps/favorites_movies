

//interface para cada item de busca
export interface MovieSearchItem {
    Title: string;
    Year: string;
    imdbID: string;
    Type: string;
    Poster: string;
}




export interface MovieDetails {
    Title: string;
    Year: string;
    Rated: string;
    Released: string;
    Runtime: string;
    Genre: string;
    Language: string;
    Country: string;
    Awards: string;
    Director: string;
    Writer: string;
    Actors: string;
    Plot: string;
    Poster: string;
    Ratings: { Source: string; Value: string }[];
    Metascore: string;
    imdbRating: string;
    imdbVotes: string;
    imdbID: string;
    Type: string;
    DVD: string;
    BoxOffice: string;
    Production: string;
    Website: string;
    Response: string;
}

export interface SearchResponse {
    Search?: MovieSearchItem[]; //deixando search opcional para caso a api não retorne resultados
    totalResults: string;       
    Response: string;           
}