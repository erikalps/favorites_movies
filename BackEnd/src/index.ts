import express from 'express';
import cors from 'cors';
import favoritesRoutes from './routes/favoritesRoutes';
import { initDB } from './database/db';

const app = express();
const PORT = process.env.PORT || 3000;

const allowedOrigins = [
  'http://localhost:5173',
  process.env.FRONTEND_URL || ''
].filter(Boolean);

app.use(cors({ origin: allowedOrigins }));
app.use(express.json());
app.use('/favorites', favoritesRoutes);

app.get('/', (req, res) => {
  res.send('Servidor Online');
});

initDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
  });
});