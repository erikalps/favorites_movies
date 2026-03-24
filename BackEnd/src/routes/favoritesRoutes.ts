import { Router } from 'express';
import pool from '../database/db';

const router = Router();

router.get('/', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM favorites');
    const favorites = result.rows.map(row => ({
      imdbID:  row.imdb_id,
      Title:   row.title,
      Year:    row.year,
      Poster:  row.poster,
      Plot:    row.plot,
      Runtime: row.runtime,
      Genre:   row.genre,
      review:  (row.rating || row.comment)
                 ? { rating: row.rating, comment: row.comment }
                 : undefined
    }));
    res.json(favorites);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao buscar favoritos.' });
  }
});

router.post('/', async (req, res) => {
  try {
    const { imdbID, Title, Year, Poster, Plot, Runtime, Genre } = req.body;
    if (!imdbID || !Title) {
      return res.status(400).json({ message: 'imdbID e Title são obrigatórios.' });
    }
    await pool.query(
      `INSERT INTO favorites (imdb_id, title, year, poster, plot, runtime, genre)
       VALUES ($1, $2, $3, $4, $5, $6, $7)
       ON CONFLICT (imdb_id) DO NOTHING`,
      [imdbID, Title, Year, Poster, Plot, Runtime, Genre]
    );
    res.status(201).json(req.body);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao adicionar favorito.' });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const result = await pool.query(
      'DELETE FROM favorites WHERE imdb_id = $1 RETURNING *',
      [req.params.id]
    );
    if (result.rowCount === 0) {
      return res.status(404).json({ message: 'Filme não encontrado.' });
    }
    res.json({ message: 'Filme removido com sucesso.' });
  } catch (error) {
    res.status(500).json({ message: 'Erro ao remover favorito.' });
  }
});

router.patch('/:id', async (req, res) => {
  try {
    const { rating, comment } = req.body;
    if (rating !== undefined && (rating < 0 || rating > 5)) {
      return res.status(400).json({ message: 'Rating deve ser entre 0 e 5.' });
    }
    const result = await pool.query(
      `UPDATE favorites
       SET rating = COALESCE($1, rating), comment = COALESCE($2, comment)
       WHERE imdb_id = $3
       RETURNING *`,
      [rating, comment, req.params.id]
    );
    if (result.rowCount === 0) {
      return res.status(404).json({ message: 'Filme não encontrado.' });
    }
    res.json({ message: 'Filme atualizado com sucesso.', movie: result.rows[0] });
  } catch (error) {
    res.status(500).json({ message: 'Erro ao atualizar filme.' });
  }
});

export default router;