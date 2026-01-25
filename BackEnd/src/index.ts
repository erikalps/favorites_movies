import express from 'express';
import favoritesRoutes from './routes/favoritesRoutes';

const app = express();
const PORT = 3000;

app.get('/', (req, res) => {
    res.send('Servidor Online');
});

// Rotas
app.use('/favorites', favoritesRoutes);

app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});
