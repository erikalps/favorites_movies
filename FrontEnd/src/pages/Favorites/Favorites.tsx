import { useContext } from "react";
import { MovieContext } from "../../context/MovieContext";
import { Link } from "react-router-dom";
import type { FavoriteMovie } from "../../types/movies";
import './Favorites.scss'
/**
 * Favorites Page
 *
 * Responsável por exibir a lista de filmes favoritados pelo usuário.
 * Os dados são obtidos através do MovieContext, que centraliza o estado
 * global da aplicação relacionado aos filmes.
 */

function Favorites() {
    /**
   * Acessa o contexto global de filmes.
   * Caso o componente seja utilizado fora do provider,
   * o retorno será null para evitar erros de execução.
   */
    const movieContext = useContext(MovieContext)
    if (!movieContext) return null;
    /**
     * Lista de filmes favoritados armazenada no estado global.
     */
    const { favorites } = movieContext;

    /**
    * Exibe uma mensagem amigável quando o usuário
    * ainda não possui filmes favoritados.
    */
    if (favorites.length === 0) {
        return <p>No favorite movie yet</p>
    }

    return (
        <div className="favorites-page" >
            <h1>My favorites</h1>
            {/* Lista de filmes favoritados */}
            <ul className="favorites-list">
                {favorites.map((movie: FavoriteMovie) => (
                    /**
                   * Cada filme é renderizado como um card.
                   * O imdbID é utilizado como chave por ser único.
                   */
                    <li key={movie.imdbID} className="favorite-card">
                        {/* 
                            Link para a página de detalhes do filme.
                            O imdbID é utilizado como parâmetro da rota.
                        */}
                        <Link to={`/movie/${movie.imdbID}`}>
                            <img
                                src={movie.Poster}
                                alt={movie.Title}
                            />
                        </Link>
                        {/* Informações principais do filme */}
                        <div className="favorite-info">
                            <h3>
                                {movie.Title} ({movie.Year})
                            </h3>

                            {movie.review && (
                                <p className="rating">
                                    ⭐ {movie.review.rating}/5
                                </p>
                            )}
                            {/* Exibe o comentário apenas se existir */}
                            {movie.review?.comment && (
                                <p className="comment">
                                    “{movie.review.comment}”
                                </p>
                            )}
                        </div>
                    </li>
                ))}
            </ul>
        </div >
    )
}

export default Favorites;