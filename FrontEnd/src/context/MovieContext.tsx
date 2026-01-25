import React, { createContext, useState, type ReactNode} from "react";
import type { FavoriteMovie } from "../types/movies";

interface MovieContextType {
    favorites: FavoriteMovie[]; // lista de filmes favoritos estado global 
    addFavorites: (movie: FavoriteMovie) => void; //adiciona aos favoritos
    removeFavorites: (imdbID: string) => void;
}

//criar contexto

export const MovieContext = createContext<MovieContextType | undefined>(undefined);

//provider

interface MovieProviderProps {
    children: ReactNode;
}

//exportando provider
export const MovieProvider: React.FC<MovieProviderProps> = ({ children }) => {
    const [favorites, setFavorites] = useState<FavoriteMovie[]>([]);

    //adicionar filme aos favoritos sem duplicar

    const addFavorites = (movie: FavoriteMovie) => {
        setFavorites(prev => {
            if (!prev.find(fav => fav.imdbID === movie.imdbID)) {
                return [...prev, movie];
            }
            return prev;
        });
    }

    //remover filme dos favoritos
    const removeFavorites = (imdbID: string) => {
        setFavorites(prev => prev.filter(fav => fav.imdbID != imdbID))
    };

    return (
        <MovieContext.Provider value={{ favorites, addFavorites, removeFavorites }}>
            {children}
        </MovieContext.Provider>
    );

};
