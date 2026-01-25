import { useContext } from "react";
import { MovieContext } from "../../context/MovieContext";
import { Link } from "react-router-dom";
import {type MovieSearchItem } from "../../types/movies";
import './MovieCard.scss'


interface MovieCardProps {
    movie: MovieSearchItem;

}

function MovieCard({ movie }: MovieCardProps) {

    const movieContext = useContext(MovieContext);

    if (!movieContext) return null;

    const { favorites, addFavorites, removeFavorites } = movieContext;

    const isFavorite = favorites.some(
        fav => fav.imdbID === movie.imdbID
    );

    const handleFavoriteClick = (
        e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        e.stopPropagation();

        if (isFavorite) {
            removeFavorites(movie.imdbID);
        } else {
            addFavorites(movie);
        }
    };





    return (
        <Link
            to={`/movie/${movie.imdbID}`}
            className="movie-card-link"
        >
            <li className="movie-card">
                <div className="movie-poster">
                    <img
                        src={
                            movie.Poster !== 'N/A'
                                ? movie.Poster
                                : "https://via.placeholder.com/300x450?text=No+Image"
                        }
                        alt={`Poster of movie ${movie.Title}`}
                        className="movie-image"
                    />
                </div>

                <h3 className="movie-title">
                    {movie.Title} ({movie.Year})
                </h3>

                <button
                    className="favorite-button"
                    onClick={handleFavoriteClick}
                >
                    {isFavorite ? "❤️" : "🤍"}
                </button>
            </li>
        </Link>
    );
}

export default MovieCard;
