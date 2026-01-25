import React, { createContext, useEffect, useState, type ReactNode } from "react";
import type { FavoriteMovie } from "../types/movies";
import type { MovieReview } from "../types/movies";

interface MovieContextType {
    favorites: FavoriteMovie[]; // lista de filmes favoritos estado global 
    addFavorites: (movie: FavoriteMovie) => void; //adiciona aos favoritos
    removeFavorites: (imdbID: string) => void;
    updateReview: (imdbID: string, review: MovieReview) => void;
}

//criar contexto

export const MovieContext = createContext<MovieContextType | undefined>(undefined);
const STORAGE_KEY = "favorites";

//provider

interface MovieProviderProps {
    children: ReactNode;
}

//exportando provider
export const MovieProvider: React.FC<MovieProviderProps> = ({ children }) => {
    const [favorites, setFavorites] = useState<FavoriteMovie[]>(() => {
        const stored = localStorage.getItem(STORAGE_KEY);

        try {
            return stored ? JSON.parse(stored) : [];
        } catch {
            return []
        }
    });


    //monitora mudanças no estado de favoritos e atualiza 
    useEffect(() => {
        localStorage.setItem(
            STORAGE_KEY,
            JSON.stringify(favorites)
        );
    }, [favorites]);


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

    //fazer review

    const updateReview = (imdbID: string, review: MovieReview) => {
        //validação
        if (review.rating < 0 || review.rating > 5) return;

        setFavorites(prev =>
            prev.map(movie =>
                movie.imdbID === imdbID ? { ...movie, review }
                    : movie
            )
        )

    };

    return (
        <MovieContext.Provider value={{ favorites, addFavorites, removeFavorites, updateReview }}>
            {children}
        </MovieContext.Provider>
    );

};
