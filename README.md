
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

## 📝 Premissas Assumidas

Durante o desenvolvimento do **My Favorite Movies**, algumas premissas foram consideradas para guiar o projeto:

* O usuário possui **acesso à internet**, já que a aplicação depende da **OMDb API** para buscar informações de filmes.
* O **FrontEnd** será acessado por navegadores modernos que suportam **JavaScript ES6+ e CSS moderno**.
* A **OMDb API** estará disponível e funcionando corretamente durante o uso do aplicativo.
* O usuário terá **uma chave válida da OMDb API**, que será inserida no arquivo `.env` pelo script de setup.
* O BackEnd será executado localmente em `localhost:3000` e não haverá necessidade de autenticação complexa nesta versão inicial.
* Toda a interface do usuário foi **traduzida para inglês**.

---

## 💡 Decisões de Projeto

Durante a implementação, algumas decisões importantes foram tomadas para tornar o projeto funcional e didático:

* **Script de setup (`setup.js`):** Automatizar a criação do `.env`, instalação de dependências e inicialização dos servidores, facilitando a vida de avaliadores ou novos usuários.
* **Estrutura de componentes:** Criar componentes React reutilizáveis para reduzir duplicação de código e organizar melhor a UI.
* **BackEnd simples com Node.js e Express:** Focado apenas em salvar, listar e gerenciar favoritos, sem autenticação ou autorização complexa nesta versão inicial.
* **Persistência em arquivo JSON:** Em vez de banco de dados completo, o projeto utiliza arquivos JSON para simplificar a implementação e focar na integração FrontEnd/BackEnd.
* **Estilização com CSS/SCSS:** Uso de SCSS para permitir aninhamento, garantindo uma interface mais moderna e fácil de manter.
* **Feedback visual imediato:** Cada ação do usuário (favoritar, avaliar) atualiza a interface imediatamente, para melhorar a experiência sem depender de refresh manual.


## 📝 Reflexões do Desenvolvimento

### a) Qual foi o maior desafio?

O maior desafio deste projeto foi trabalhar com **TypeScript**. Apesar de ser parecido com JavaScript, foi diferente colocar todo o conhecimento teórico em prática. Integrar o **FrontEnd com o BackEnd** também trouxe dificuldades, e eu enfrentei alguns erros chatos de página que não atualizava como deveria por causa das dependências. No fim, cada problema resolvido foi um grande aprendizado.

### b) O que faria diferente com mais tempo?

Se eu tivesse mais tempo, faria algumas melhorias para deixar a experiência do usuário mais completa:

* Melhoraria a **UI**, deixando a interface mais moderna e agradável.
* Adicionaria uma **tela de login com autenticação** no banco de dados ou pesquisaria algum framework que facilite isso.
* Criaria a opção de **ver comentários de outras pessoas**, tornando o app mais social.
* Criaria **mais componentes React**, para evitar código duplicado e deixar tudo mais organizado.

### c) Quais aceleradores de desenvolvimento foram utilizados?

Durante o desenvolvimento, usei **ChatGPT e GEMINI** para me ajudar a:

* Tirar dúvidas e entender conceitos que ainda estavam confusos.
* Debugar erros e descobrir por que as coisas não funcionavam como eu esperava.
* Aprender na prática como integrar FrontEnd e BackEnd de forma mais eficiente.
* Auxílio na organização e clareza da documentação.

No final, essas ferramentas foram como **companheiras de estudo**, ajudando a tornar o desenvolvimento mais rápido e menos frustrante.

---

**Desenvolvido por [Erika Lopes](https://github.com/erikalps)** 🍿
