import { useContext } from "react";
import { MovieContext } from "../../context/MovieContext";
import { Link } from "react-router-dom";
import type { FavoriteMovie } from "../../types/movies";
import'./Favorites.scss'


function Favorites() {
    const movieContext = useContext(MovieContext)
    if (!movieContext) return null;

    const { favorites } = movieContext;

    if (favorites.length === 0) {
        return <p>Nenhum filme favoritado ainda</p>
    }

    return (
        <div className="favorites-page" >
            <h1>Meus Favoritos</h1>
            <ul className="favorites-list">
                {favorites.map((movie: FavoriteMovie) => (
                    <li key={movie.imdbID} className="favorite-card">

                        <Link to={`/movie/${movie.imdbID}`}>
                            <img
                                src={movie.Poster}
                                alt={movie.Title}
                            />
                        </Link>

                        <div className="favorite-info">
                            <h3>
                                {movie.Title} ({movie.Year})
                            </h3>

                            {movie.review && (
                                <p className="rating">
                                    ⭐ {movie.review.rating}/5
                                </p>
                            )}

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