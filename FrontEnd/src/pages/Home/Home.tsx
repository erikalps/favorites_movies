import { useState } from "react";
import { fechMovies } from "../../services/api";
import { type MovieSearchItem } from "../../types/movies";
import MovieCard from "../../components/movieCard/MovieCard";
import './Home.scss'
function Home() {

    const [search, setSearch] = useState('');
    const [movies, setMovies] = useState<MovieSearchItem[]>([]);
    const [loading, setLoading] = useState(false);
    const [movieNotFound, setMovieNotFound] = useState(false);

    async function handleSearch() {
        if (!search) return;  // não busca se o campo estiver vazio

        setLoading(true);  // ativa loading 
        const response = await fechMovies(search); //chama funçao do serviço api aqui
        setLoading(false); //desativa loading 

        if (response.Response === 'True' && response.Search) { //retornou com sucess?
            setMovies(response.Search); //salva os filme 
            setMovieNotFound(false); 
        } else {
            setMovies([]); //limpa 
            setMovieNotFound(true); // mostra mensagem de erro 
        }
    }

    return (
        <div className="home">
            <h1 className="home-title">Search Movies</h1>

            <div className="search-box">
                <input
                    className="search-input"
                    type="text"
                    placeholder="Search movie"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />

                <button
                    className="search-button"
                    onClick={handleSearch}
                >
                    Search
                </button>
            </div>

            {loading && <p className="loading-text">Loading...</p>}

            {movieNotFound && (
                <p className="not-found-text">Movie not found</p>
            )}

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
