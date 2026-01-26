import { useContext, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import type { MovieDetails } from "../../types/movies";
import { fetchMoviesDetails } from "../../services/api";
import './Details.scss'
import FavoriteButton from "../../components/favotiteButton/FavoriteButton";
import { MovieContext } from "../../context/MovieContext";
import StarRating from "../../components/starRating/StarRating";
/**
 * Details Page
 *
 * Página responsável por exibir as informações completas de um filme,
 * permitindo ao usuário:
 *  - visualizar detalhes vindos da API
 *  - favoritar ou remover dos favoritos
 *  - criar, editar e visualizar avaliações pessoais
 */
function Details() {
    const { id } = useParams<{ id: string }>(); // Recupera o imdbID a partir dos parâmetros da rota.
    const navigate = useNavigate(); //  Hook de navegação para retorno à página anterior.
    const movieContext = useContext(MovieContext); // Contexto global responsável pelo gerenciamento dos filmes favoritados e suas avaliações.

    const [movie, setMovie] = useState<MovieDetails | null>(null);// Dados completos do filme retornados pela API.
    const [loading, setLoading] = useState(true); // Controla o estado de carregamento da requisição
    const [error, setError] = useState(""); // Armazena mensagens de erro da requisição

    // ESTADOS DO FORMULÁRIO //
    const [rating, setRating] = useState(0); // Nota atribuída ao filme (0 a 5).
    const [comment, setComment] = useState(""); //  Comentário pessoal do usuário sobre o filme.
    const [isEditing, setIsediting] = useState(false); // Controla se o usuário está no modo de edição da avaliação.


    /** Localiza o filme nos favoritos utilizando o imdbID.
    * Centralizado para evitar múltiplos `.find()` no JSX.
    */
    const favoriteMovie = movieContext?.favorites.find(fav => fav.imdbID === id);

    /** Indica se existe alguma avaliação salva
    * (nota ou comentário).
    */
    const hasReview = !!(favoriteMovie?.review?.rating || favoriteMovie?.review?.comment);

    // Carrega dados da API

    /**
  * Busca os detalhes do filme na API externa
  * sempre que o parâmetro da rota mudar.
  */
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

    /**
       * Sincroniza os campos do formulário com o estado global.
       * Esse efeito roda somente quando o favorito muda no contexto,
       * garantindo consistência após salvar ou atualizar avaliações.
       */
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
            {/* Botão de navegação para a página anterior */}
            <button className="back-button" onClick={() => navigate(-1)}>← Voltar</button>

            <div className="details-content">
                <img className="details-poster" src={movie.Poster} alt={movie.Title} />
                {/* Informações principais do filme */}
                <div className="details-info">
                    <h1 className="details-title">{movie.Title} ({movie.Year})</h1>
                    <p className="details-plot"><strong>Plot:</strong> {movie.Plot}</p>
                    <p><strong>Director:</strong> {movie.Director}</p>
                    <p><strong>Actors:</strong> {movie.Actors}</p>
                    <p><strong>Genre:</strong> {movie.Genre}</p>
                    <p><strong>IMDb Rating:</strong> {movie.imdbRating}</p>
                    <p><strong>Runtime:</strong> {movie.Runtime}</p>
                </div>
                {/* Área de avaliação do usuário */}
                <div className="review-box">
                    <h3>Sua avaliação</h3>
                    {/* Exibe a avaliação salva ou o formulário */}
                    {hasReview && !isEditing ? (
                        <div className="saved-review-box">
                            <div className="saved-rating">
                                {"⭐".repeat(favoriteMovie?.review?.rating ?? 0)}
                            </div>
                            <p className="saved-comment">"{favoriteMovie?.review?.comment}"</p>
                            <button className="edit-review-button" onClick={() => setIsediting(true)}>
                                Editar Comentário
                            </button>
                        </div>
                    ) : (
                        <div className="review-form">
                            <label>Nota (0 a 5)</label>
                            <StarRating
                                rating={rating}
                                onRatingSelect={(value) => setRating(value)}
                            />
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