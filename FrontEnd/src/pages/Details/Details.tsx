import { useContext, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import type { MovieDetails } from "../../types/movies";
import { fetchMoviesDetails } from "../../services/api";
import './Details.scss'
import FavoriteButton from "../../components/favotiteButton/FavoriteButton";
import { MovieContext } from "../../context/MovieContext";

function Details() {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();

    const movieContext = useContext(MovieContext);

    const [movie, setMovie] = useState<MovieDetails | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");


    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState("");

    // Busca detalhes do filme 
    useEffect(() => {
        async function loadMovie() {
            try {
                if (!id) return; // Se não tiver id não faz nada 

                const data = await fetchMoviesDetails(id); // Chama a função que busca detalhes do filme 
                setMovie(data);
            } catch {
                setError("Erro ao carregar detalhes do filme");
            } finally {
                setLoading(false);
            }
        }

        loadMovie(); // Chama a função async 

    });

    useEffect(() => {
        if (!movieContext || !movie) return;

        const favoriteMovie = movieContext.favorites.find(
            fav => fav.imdbID === movie.imdbID
        );

        if (favoriteMovie?.review) {
            setRating(favoriteMovie.review.rating);
            setComment(favoriteMovie.review.comment);
        }
    }, [movie, movieContext]);

    if (loading) return <p className="details-loading">Loading...</p>;
    if (error) return <p className="details-error">{error}</p>;
    if (!movie) return null;

    return (
        <div className="details">
            <button
                className="back-button"
                onClick={() => navigate(-1)}
            >
                ← Voltar
            </button>

            <div className="details-content">
                <img
                    className="details-poster"
                    src={movie.Poster}
                    alt={movie.Title}
                />

                <div className="details-info">
                    <h1 className="details-title">
                        {movie.Title} ({movie.Year})
                    </h1>

                    <p className="details-plot">
                        <strong>Plot:</strong> {movie.Plot}
                    </p>

                    <p><strong>Director:</strong> {movie.Director}</p>
                    <p><strong>Actors:</strong> {movie.Actors}</p>
                    <p><strong>Genre:</strong> {movie.Genre}</p>
                    <p><strong>IMDb Rating:</strong> {movie.imdbRating}</p>
                    <p><strong>Runtime:</strong> {movie.Runtime}</p>
                </div>

                <div className="review-box">
                    <h3>sua avaliação</h3>

                    <label>Nota(0 a 5)
                        <input type="number"
                            min={0}
                            max={5}
                            value={rating}
                            onChange={(e) => setRating(Number(e.target.value))}
                        />
                    </label>
                    <label>Comentario
                        <textarea value={comment} onChange={(e) => setComment(e.target.value)} />
                    </label>

                    <button
                        onClick={() =>
                            movieContext?.updateReview(
                                movie.imdbID,
                                { rating, comment }
                            )
                        }
                    >
                        Salvar avaliação
                    </button>
                </div>
            </div>
            <FavoriteButton movie={movie} />

        </div>
    );
}

export default Details;
