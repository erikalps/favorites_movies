import React, { createContext, useEffect, useState, type ReactNode } from "react";
import type { FavoriteMovie } from "../types/movies";
import type { MovieReview } from "../types/movies";
import { getFavoritesBackend } from "../services/api";
import { addFavoriteBackend } from '../services/api';
import { updateFavoriteBackend } from "../services/api";

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


    // Buscar favoritos do backend ao carregar o app
    useEffect(() => {
        async function fetchFavorites() {
            try {
                const data = await getFavoritesBackend(); //chama backend
                setFavorites(data); //atualiza o estado d contexto
            } catch (error) {
                console.error('Erro ao carregar favoritos:', error);
            }
        }

        fetchFavorites();
    }, []); 

    //adicionar filme aos favoritos sem duplicar



    const addFavorites = async (movie: FavoriteMovie) => {
        // evita duplicados no frontend
        if (favorites.find(fav => fav.imdbID === movie.imdbID)) return;

        try {
            // Envia para o backend
            const savedMovie = await addFavoriteBackend(movie);

            // Atualiza o estado do frontend instantaneamente
            setFavorites(prev => [...prev, savedMovie]);
        } catch (error) {
            console.error('Erro ao favoritar filme:', error);
        }
    };


    //remover filme dos favoritos
    const removeFavorites = (imdbID: string) => {
        setFavorites(prev => prev.filter(fav => fav.imdbID != imdbID))
    };

    //fazer review
    const updateReview = async (imdbID: string, review: MovieReview) => {
        // validação do rating
        if (review.rating < 0 || review.rating > 5) return;

        try {
            // envia atualização para o backend
            const updatedMovie = await updateFavoriteBackend(imdbID, review);

            // atualiza o estado do frontend
            setFavorites(prev =>
                prev.map(movie =>
                    movie.imdbID === imdbID ? updatedMovie : movie
                )
            );
        } catch (error) {
            console.error('Erro ao atualizar review:', error);
        }
    };


    return (
        <MovieContext.Provider value={{ favorites, addFavorites, removeFavorites, updateReview }}>
            {children}
        </MovieContext.Provider>
    );

};
