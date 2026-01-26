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

    // Estados do formulário
    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState("");
    const [isEditing, setIsediting] = useState(false);

    // CENTRALIZADO: Busca o favorito uma única vez por renderização
    const favoriteMovie = movieContext?.favorites.find(fav => fav.imdbID === id);
    const hasReview = !!(favoriteMovie?.review?.rating || favoriteMovie?.review?.comment);

    // Carrega dados da API
    useEffect(() => {
        async function loadMovie() {
            try {
                if (!id) return;
                const data = await fetchMoviesDetails(id);
                setMovie(data);
            } catch {
                setError("Erro ao carregar detalhes do filme");
            } finally {
                setLoading(false);
            }
        }
        loadMovie();
    }, [id]);

    // SINCRONIZAÇÃO: Atualiza os inputs apenas quando o favorito mudar (ex: salvou ou deletou)
    useEffect(() => {
        if (favoriteMovie?.review) {
            setRating(favoriteMovie.review.rating);
            setComment(favoriteMovie.review.comment);
        }
    }, [favoriteMovie]); // Só roda se o objeto do favorito mudar no contexto

    if (loading) return <p className="details-loading">Loading...</p>;
    if (error) return <p className="details-error">{error}</p>;
    if (!movie) return null;

    const handleSaveReview = () => {
        //  Envia os dados para o contexto global
        movieContext?.updateReview(movie.imdbID, { rating, comment });
        //  Limpa os estados locais (esvazia os inputs)
        setRating(0);
        setComment("");
        // Fecha o modo de edição para exibir a "caixa a parte"
        setIsediting(false);
    }

    return (
        <div className="details">
            <button className="back-button" onClick={() => navigate(-1)}>← Voltar</button>

            <div className="details-content">
                <img className="details-poster" src={movie.Poster} alt={movie.Title} />

                <div className="details-info">
                    <h1 className="details-title">{movie.Title} ({movie.Year})</h1>
                    <p className="details-plot"><strong>Plot:</strong> {movie.Plot}</p>
                    <p><strong>Director:</strong> {movie.Director}</p>
                    <p><strong>Actors:</strong> {movie.Actors}</p>
                    <p><strong>Genre:</strong> {movie.Genre}</p>
                    <p><strong>IMDb Rating:</strong> {movie.imdbRating}</p>
                    <p><strong>Runtime:</strong> {movie.Runtime}</p>
                </div>

                <div className="review-box">
                    <h3>sua avaliação</h3>

                    {/* TERNÁRIO: Ou mostra um, ou mostra outro */}
                    {hasReview && !isEditing ? (
                        <div className="saved-review-box">
                            <div className="saved-rating">⭐ {favoriteMovie?.review?.rating}/5</div>
                            <p className="saved-comment">"{favoriteMovie?.review?.comment}"</p>
                            <button className="edit-review-button" onClick={() => setIsediting(true)}>
                                Editar Comentário
                            </button>
                        </div>
                    ) : (
                        <div className="review-form">
                            <label>Nota (0 a 5)
                                <input
                                    type="number" min={0} max={5}
                                    value={rating}
                                    onChange={(e) => setRating(Number(e.target.value))}
                                />
                            </label>
                            <label>Comentário
                                <textarea
                                    placeholder="O que achou do filme?"
                                    value={comment}
                                    onChange={(e) => setComment(e.target.value)}
                                />
                            </label>
                            <div className="review-buttons-group">
                                <button className="save-button" onClick={handleSaveReview}>
                                    {hasReview ? "Atualizar" : "Salvar avaliação"}
                                </button>
                                {isEditing && (
                                    <button className="cancel-button" onClick={() => setIsediting(false)}>
                                        Cancelar
                                    </button>
                                )}
                            </div>
                        </div>
                    )}
                </div>
            </div>
            <FavoriteButton movie={movie} />
        </div>
    );
}

export default Details;