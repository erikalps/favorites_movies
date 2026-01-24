import { useState } from "react";
import { fechMovies } from "../../services/api";
import { type MovieSearchItem } from "../../types/movies";
import MovieCard from "../../components/movieCard/MovieCard";


function Home() {

    const [search, setSearch] = useState('');
    const [movies, setMovies] = useState<MovieSearchItem[]>([]);
    const [loading, setLoading] = useState(false);
    const [movieNotFound, setMovieNotFound] = useState(false);

    //função chamada ao clicar o botão de busca
    async function handleSearch() {
        if (!search) return; // não busca se o campo estiver vazio
        console.log(search);

        setLoading(true); // ativa loading 
        const response = await fechMovies(search); //chamando a função do serviço api
        setLoading(false); //desativa loading 

        if (response.Response === 'True' && response.Search) { // retornou com sucesso?!
            setMovies(response.Search); //salva os filmes
            setMovieNotFound(false)
        } else {
            setMovies([]); // limpa 
            setMovieNotFound(true)
        }
    }


    return (
        <div>
            <h1>Search Movies</h1>

            <input
                type="text" placeholder="Pesquisar filme"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
            />

            {loading && <p>Loading...</p>}

            <button onClick={handleSearch}>
                Pesquisar
            </button>

            {movieNotFound && <p>Filme não encontrado</p>}

            <ul>
                {movies.map(movie => (
                    <MovieCard key={movie.imdbID} movie={movie}></MovieCard>
                ))}
            </ul>
        </div>
    )
}

export default Home;