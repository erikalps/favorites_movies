import { useContext } from "react";
import type {
  MovieDetails,
  MovieSearchItem,
  FavoriteMovie
} from "../../types/movies";

import { MovieContext } from "../../context/MovieContext";
import './FavoriteButton.scss'


/*
  O FavoriteButton é responsável por toda a lógica de favoritar filmes.

  Ele pode receber:
  - MovieSearchItem (Home)
  - MovieDetails (Details)

  Independente da origem, o filme é convertido internamente
  para o formato FavoriteMovie antes de ser salvo no contexto.
*/
interface FavoriteButtonProps {
  movie: MovieSearchItem | MovieDetails;
}

function FavoriteButton({ movie }: FavoriteButtonProps) {

  // Acessa o estado global de favoritos e suas funções
  const movieContext = useContext(MovieContext);

  /*
   Garantia de segurança:
   Caso o componente seja utilizado fora do MovieProvider,
   lançamos um erro explícito para facilitar o debug.
 */
  if (!movieContext) {
    throw new Error(
      "FavoriteButton deve estar dentro do MovieProvider"
    );
  }

  // Desestrutura os valores vindos do contexto
  const {
    favorites,
    addFavorites,
    removeFavorites
  } = movieContext;

  // Verifica se o filme atual já está nos favoritos.

  const isFavorite = favorites.some(
    fav => fav.imdbID === movie.imdbID
  );

  // Converte o filme recebido da API para o modelo interno da aplicação
  const favoriteMovie: FavoriteMovie = {
    imdbID: movie.imdbID,
    Title: movie.Title,
    Year: movie.Year,
    Poster: movie.Poster,

    // Esses campos existem apenas em MovieDetails,
    Plot: "Plot" in movie ? movie.Plot : undefined,
    Runtime: "Runtime" in movie ? movie.Runtime : undefined,
    Genre: "Genre" in movie ? movie.Genre : undefined
  };


  const handleClick = (
    e: React.MouseEvent<HTMLButtonElement>
  ) => {
    e.preventDefault(); // Impede que o clique ative o Link do MovieCard.

    e.stopPropagation(); // Impede que o evento suba para elementos pais.

    if (isFavorite) { // Se ja é favorito remove
      removeFavorites(movie.imdbID);
    } else {
      addFavorites(favoriteMovie); // Se não adiciona 
    }
  };

  return (
    <button
      className={`favorite-button ${isFavorite ? "active" : ""
        }`}
      onClick={handleClick}
    >
      {isFavorite ? "★ Favorited" : "☆ Add to Favorites"}
    </button>
  );
}

export default FavoriteButton;
