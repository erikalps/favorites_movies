
---

# 🎬 My Favorite Movies

O **My Favorite Movies** é a sua biblioteca pessoal de cinema! Este projeto permite que você pesquise, favorite e organize os filmes que já assistiu, adicionando notas e feedbacks personalizados para nunca mais esquecer o que achou daquela obra-prima (ou daquele "filme B").

---

## ✨ Funcionalidades

* **Busca Inteligente:** Encontre qualquer filme através da integração com a API OMDb.
* **Favoritos:** Salve seus filmes preferidos em uma lista dedicada.
* **Avaliações:** Atribua notas e escreva comentários sobre os filmes assistidos.
* **Histórico:** Mantenha um registro visual dos seus feedbacks cinematográficos.

---

## 🛠️ Tecnologias Utilizadas

* **React + TypeScript** (Frontend)
* **Vite** (Build tool)
* **OMDb API** (Fonte de dados de filmes)
* **SCSS** (Estilização)

## 🚀 Como Executar o Projeto

Este projeto possui um **script de setup automatizado** (`setup.js`) que facilita a configuração completa do ambiente.

### 1. Clonar o Repositório

```bash
git clone https://github.com/erikalps/favorites_movies.git
cd favorites_movies
```

---

### 2. Executar o Setup Automático

O script `setup.js` irá:

* Perguntar sua **OMDb API Key**
* Criar o arquivo `.env` dentro do **FrontEnd** automaticamente
* Instalar dependências do **FrontEnd** e **BackEnd**
* Iniciar os dois servidores simultaneamente

Para rodar:

```bash
npm run setup
```

> Durante a execução, caso já exista uma API Key no `.env`, o script perguntará se você deseja **substituí-la** ou **manter a atual**.

Após o script terminar, o **FrontEnd** geralmente estará disponível em `http://localhost:5173` e o **BackEnd** rodando em `http://localhost:3000`.

---

### 3. Acesso Manual (Opcional)

Se preferir rodar manualmente, você pode:

1. Entrar na pasta do FrontEnd:

```bash
cd FrontEnd
npm install
npm run dev
```

2. Entrar na pasta do BackEnd:

```bash
cd BackEnd
npm install
npm run dev
```

> **Nota:** Se você rodar manualmente, será necessário criar o arquivo `.env` dentro do FrontEnd e adicionar sua chave da OMDb:
>
> ```env
> VITE_OMDB_API_KEY=sua_chave_aqui
> ```

---


**Desenvolvido por [Erika Lopes](https://github.com/erikalps)** 🍿
