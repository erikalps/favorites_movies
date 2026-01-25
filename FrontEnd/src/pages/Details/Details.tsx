import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import type { MovieDetails } from "../../types/movies";
import { fechMoviesDetails } from "../../services/api";

import './Details.scss'
import FavoriteButton from "../../components/favotiteButton/FavoriteButton";

function Details() {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();

    const [movie, setMovie] = useState<MovieDetails | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        async function loadMovie() {
            try {
                if (!id) return; //se não tiver is não faz nada 

                const data = await fechMoviesDetails(id); //chama a função que busca detalhes do filme 
                setMovie(data);
            } catch {
                setError("Erro ao carregar detalhes do filme");
            } finally {
                setLoading(false);
            }
        }

        loadMovie(); //chama a função async 

    });

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
            </div>
            <FavoriteButton movie={movie} />

        </div>
    );
}

export default Details;
