import { Link } from "react-router-dom";
import { type MovieDetails, type MovieSearchItem } from "../../types/movies";
import './MovieCard.scss'
import FavoriteButton from "../favotiteButton/FavoriteButton";


interface MovieCardProps {
    movie: MovieSearchItem;
    movia: MovieDetails
}

function MovieCard({ movie }: MovieCardProps) {

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

                <FavoriteButton movie ={movie}></FavoriteButton>
            </li>
        </Link>
    );
}

export default MovieCard;
