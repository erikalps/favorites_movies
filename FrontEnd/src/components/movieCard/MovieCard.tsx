import { Link } from "react-router-dom";
import { type MovieSearchItem } from "../../types/movies";

interface MovieCardProps {
    movie: MovieSearchItem;
}

function MovieCard({ movie }: MovieCardProps) {
    return (
        <Link to = {`/movie/${movie.imdbID}`}>
            <li>
                <h3>{movie.Title} ({movie.Year})</h3>
                <img
                    src={movie.Poster !== 'N/A' ? movie.Poster : "https://via.placeholder.com/150"}
                    alt={`Poster do filme ${movie.Title}`}
                    style={{ width: '150px', display: 'block' }}
                />
            </li>
        </Link>
    );
}

export default MovieCard;