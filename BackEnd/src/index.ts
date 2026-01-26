import express from 'express';
import favoritesRoutes from './routes/favoritesRoutes';
import cors from 'cors';

const app = express();
const PORT = 3000;

// Middleware para permitir requisições do Frontend
app.use(cors({
  origin: 'http://localhost:5173', // porta do frontend
}));

// Middleware para ler JSON no corpo das requisições
app.use(express.json());

// Rotas
app.use('/favorites', favoritesRoutes);

// Rota de teste
app.get('/', (req, res) => {
  res.send('Servidor Online');
});

// Inicia o servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
