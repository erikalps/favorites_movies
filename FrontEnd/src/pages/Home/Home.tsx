import { useState } from "react";
import { fetchMovies } from "../../services/api";
import { type MovieSearchItem } from "../../types/movies";
import MovieCard from "../../components/movieCard/MovieCard";
import './Home.scss'


/**
 * Home Page
 *
 * Página principal da aplicação responsável pela busca de filmes.
 * Permite ao usuário pesquisar títulos utilizando a API externa
 * e exibe os resultados em formato de cards.
 */

function Home() {

    const [search, setSearch] = useState(''); // Texto digitado pelo usuário no campo de busca.
    const [movies, setMovies] = useState<MovieSearchItem[]>([]); // Lista de filmes retornados pela API de busca.
    const [loading, setLoading] = useState(false); // Controla o estado de carregamento durante a requisição.
    const [movieNotFound, setMovieNotFound] = useState(false); // Indica quando nenhum filme é encontrado para a busca realizada.

    /**
    * Realiza a busca de filmes com base no texto informado.
    * A função gerencia os estados de loading, sucesso e erro
    * de forma centralizada.
    */
    async function handleSearch() {
        if (!search) return;  // Evita requisições desnecessárias quando o campo está vazio
        setLoading(true);
        const response = await fetchMovies(search);  // Chamada ao serviço responsável por integrar com a API externa
        setLoading(false);

        /**
       * A API retorna "Response: True" quando há resultados válidos.
       */
        if (response.Response === 'True' && response.Search) {
            setMovies(response.Search); // Atualiza a lista de filmes retornados
            setMovieNotFound(false); // Remove mensagem de erro, caso exista
        } else {
            setMovies([]);
            setMovieNotFound(true); // Exibe mensagem informando que não houve retorno
        }
    }

    return (
        <div className="home">
            <h1 className="home-title">Favorite movies</h1>
            {/* Área de busca de filmes */}
            <div className="search-box">
                <input
                    className="search-input"
                    type="text"
                    placeholder="Search movie"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
                {/* Dispara a busca ao clicar no botão */}
                <button
                    className="search-button"
                    onClick={handleSearch}
                >
                    Search
                </button>
            </div>
            {/* Indicador visual de carregamento */}
            {loading && <p className="loading-text">Loading...</p>}

            {/* Mensagem exibida quando nenhum filme é encontrado */}
            {movieNotFound && (
                <p className="not-found-text">Movie not found</p>
            )}
            {/* Lista de filmes retornados da busca */}
            <ul className="movie-list">
                {movies.map(movie => (
                    <MovieCard
                        key={movie.imdbID}
                        movie={movie}
                    />
                ))}
            </ul>
        </div>
    );
}

export default Home;
