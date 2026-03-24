# 🎬 My Favorite Movies

> Sua biblioteca pessoal de cinema — pesquise, favorite e avalie os filmes que já assistiu.

![React](https://img.shields.io/badge/React-19-61DAFB?style=flat-square&logo=react&logoColor=black)
![TypeScript](https://img.shields.io/badge/TypeScript-5.9-3178C6?style=flat-square&logo=typescript&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-7-646CFF?style=flat-square&logo=vite&logoColor=white)
![Node.js](https://img.shields.io/badge/Node.js-Express-339933?style=flat-square&logo=node.js&logoColor=white)
![License](https://img.shields.io/badge/license-ISC-green?style=flat-square)

---

## ✨ Funcionalidades

- 🔍 **Busca inteligente** — pesquise qualquer filme via integração com a OMDb API
- ⭐ **Favoritos** — salve os filmes que você já assistiu em uma lista dedicada
- 📝 **Avaliações** — atribua notas (0–5 estrelas) e escreva comentários personalizados
- 🎞️ **Detalhes completos** — veja sinopse, diretor, elenco, gênero e nota do IMDb
- 💾 **Persistência** — seus favoritos ficam salvos no backend entre sessões

---

## 🏗️ Arquitetura

O projeto é dividido em duas aplicações independentes:

```
favorites_movies/
├── FrontEnd/        # React + TypeScript + Vite (porta 5173)
│   ├── src/
│   │   ├── pages/       # Home, Favorites, Details
│   │   ├── components/  # MovieCard, FavoriteButton, StarRating
│   │   ├── context/     # MovieContext (estado global)
│   │   ├── services/    # api.ts (OMDb + BackEnd)
│   │   └── types/       # Interfaces TypeScript
│   └── ...
├── BackEnd/         # Node.js + Express + TypeScript (porta 3000)
│   ├── src/
│   │   ├── index.ts          # Servidor Express
│   │   ├── routes/           # favoritesRoutes.ts
│   │   └── database/         # database.json + dbHelpers.ts
│   └── ...
├── setup.js         # Script de configuração automatizada
└── vercel.json      # Configuração de deploy (Vercel)
```

**Fluxo de dados:**

```
Usuário → React (FrontEnd) → Express (BackEnd) → database.json
                           ↘ OMDb API (busca de filmes)
```

---

## 🛠️ Tecnologias

| Camada | Tecnologia |
|---|---|
| FrontEnd | React 19, TypeScript, Vite 7, React Router DOM 7 |
| Estilização | SCSS (módulos por componente) |
| BackEnd | Node.js, Express 5, TypeScript |
| Banco de dados | Arquivo `database.json` (fs.promises) |
| API externa | [OMDb API](https://www.omdbapi.com/) |
| Deploy FrontEnd | [Vercel](https://vercel.com) |
| Deploy BackEnd | [Render](https://render.com) |

---

## 🚀 Rodando localmente

### Pré-requisitos

- [Node.js](https://nodejs.org) v18 ou superior
- Chave da OMDb API gratuita → [omdbapi.com/apikey.aspx](https://www.omdbapi.com/apikey.aspx)

### Modo automático (recomendado)

```bash
git clone https://github.com/erikalps/favorites_movies.git
cd favorites_movies
npm run setup
```

O script `setup.js` vai:
1. Pedir sua OMDb API Key
2. Criar o arquivo `FrontEnd/.env` automaticamente
3. Instalar as dependências do FrontEnd e do BackEnd
4. Subir os dois servidores simultaneamente

Acesse em seguida: [http://localhost:5173](http://localhost:5173)

---

### Modo manual

**Terminal 1 — BackEnd:**
```bash
cd BackEnd
npm install
npm run dev
```

**Terminal 2 — FrontEnd:**
```bash
cd FrontEnd
npm install
npm run dev
```

Crie o arquivo `FrontEnd/.env` com sua chave:
```env
VITE_OMDB_API_KEY=sua_chave_aqui
VITE_API_URL=http://localhost:3000
```

---

## 🌐 Deploy

O projeto está hospedado em:

- **FrontEnd:** Vercel — build automático a cada push na branch `main`
- **BackEnd:** Render — build com `npm run build`, start com `npm run start`

### Variáveis de ambiente necessárias

**FrontEnd (Vercel):**

| Variável | Descrição |
|---|---|
| `VITE_OMDB_API_KEY` | Sua chave da OMDb API |
| `VITE_API_URL` | URL do backend no Render |

**BackEnd (Render):**

| Variável | Descrição |
|---|---|
| `FRONTEND_URL` | URL do frontend na Vercel |

---

## 🔌 API — Endpoints

Base URL: `http://localhost:3000`

| Método | Rota | Descrição |
|---|---|---|
| `GET` | `/favorites` | Retorna todos os favoritos |
| `POST` | `/favorites` | Adiciona um filme aos favoritos |
| `DELETE` | `/favorites/:id` | Remove um filme pelo `imdbID` |
| `PATCH` | `/favorites/:id` | Atualiza `rating` e `comment` |

---

## 👩‍💻 Autora

Desenvolvido com 🍿 por **[Erika Lopes](https://github.com/erikalps)**