import { Router } from 'express';
import { readDB, writeDB } from '../database/dbHelpers'

const router = Router();

/**
 * GET /favorites
 * Retorna todos os filmes salvos
 */

router.get('/', async (req, res) => {
    try {
        const db = await readDB();
        res.json(db.favorites)
    } catch (error) {
        res.status(500).json({ message: 'Erro ao ler os favoritos.' });
    }
});

/**
 * POST /favorites
 * Recebe um filme e salva no JSON
 * Valida se já existe para não duplicar
 */

router.post('/', async (req, res) => {
    try {
        const newMovie = req.body;
        if (!newMovie.imdbID || !newMovie.Title) {
            return res.status(400).json({ message: 'Filme inválido. imdbID e Title são obrigatórios.' });
        }

        const db = await readDB();

        // Verifica se o filme já existe
        const exist = db.favorites.some((movie: any) => movie.imdbID === newMovie.imdbID);
        if (exist) {
            return res.status(400).json({ message: 'Filme já está nos favoritos.' });
        }

        db.favorites.push(newMovie);
        await writeDB(db);

        res.status(201).json(newMovie);
    } catch (error) {
        res.status(500).json({ message: 'Erro ao adicionar favorito.' });
    }
});

/**
 * DELETE /favorites/:id
 * Remove um filme pelo ID
 */
router.delete('/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const db = await readDB();

        const index = db.favorites.findIndex((movie: any) => movie.imdbID == id);
        if (index == -1) {
            return res.status(404).json({ message: 'Filme não encontrado.' });
        }

        const removed = db.favorites.splice(index, 1);
        await writeDB(db);

        res.json({ message: 'Filme removido com sucesso', removed: removed[0] })

    } catch (error) {
        res.status(500).json({ message: 'Erro ao remover favorito.' })
    }
})

//  Atualiza rating e comment de um filme já favoritado
router.patch('/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const { rating, comment } = req.body

        //validação basica 
        if (rating !== undefined && (rating < 0 || rating > 5)) {
            return res.status(400).json({ message: 'Rating deve ser entre 0 e 5.' });
        }

        const db = await readDB();

        // Busca o filme pelo ID
        const movie = db.favorites.find((movie: any) => movie.imdbID === id)

        if (!movie) {
            return res.status(404).json({ message: 'Filme não encontrado nos favoritos.' });
        }
        // Atualiza apenas os campos fornecidos
        // Cria o review se não existir
        if (!movie.review) {
            movie.review = { rating: 0, comment: '' };
        }
        if (rating != undefined) movie.review.rating = rating;
        if (comment != undefined) movie.review.comment = comment;

        // Salva no json
        await writeDB(db);
        res.json({ message: 'Filme atualizado com sucesso.', movie });
    } catch (error) {
        res.status(500).json({ message: 'Erro ao atualizar o filme.' });
    }
})

export default router;