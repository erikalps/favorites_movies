import { useState } from "react";
import { fechMovies } from "../../services/api";
import { type MovieSearchItem } from "../../types/movies";


function Home(){

    const[search, setSearch] = useState('');
    const[movies, setMovies] = useState<MovieSearchItem[]>([]);
    const[loading, setLoading] = useState(false);

    //função chamada ao clicar o botão de busca
    async function handleSearch() {
        if(!search) return; // não busca se o campo estiver vazio
        console.log(search);
        setLoading(true); // ativa loading 

        const response = await fechMovies(search); //chamando a função do serviço api

        if(response.Response === 'True' && response.Search){ // retornou com sucesso?!
            setMovies(response.Search); //salva os filmes
        } else {
            setMovies([]); // limpa 
        }


        setLoading(false); //desativa loading 
    }

    
    return(
        <div>
            <h1>Search Movies</h1>

            <input 
                type="text" placeholder="Pesquisar filme" 
                value={search}
                onChange={(e)=>setSearch(e.target.value)}
            />
            
            {loading && <p>Loading...</p>}

            <button onClick={handleSearch}>
                Pesquisar
            </button>
            
            <ul>
                {movies.map(movie=>(
                    <li key={movie.imdbID}>
                        {movie.Title} ({movie.Year})
                        <img src={movie.Poster !== 'N/A' ? movie.Poster : "https://via.placeholder.com/150"}
                            alt="{`poster do filme ${movie.title}`}"
                        />
                    </li> 
                ))}
                
            </ul>
        </div>
    )
}

export default Home;