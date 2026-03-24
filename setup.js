// setup.js
const fs = require('fs');
const path = require('path');
const readline = require('readline');
const { spawn, spawnSync } = require('child_process');

// Pastas do projeto
const FRONTEND_PATH = path.join(__dirname, 'FrontEnd');
const BACKEND_PATH = path.join(__dirname, 'BackEnd');
const FRONTEND_ENV_PATH = path.join(FRONTEND_PATH, '.env');
const BACKEND_ENV_PATH = path.join(BACKEND_PATH, '.env');

// Criar interface para leitura do terminal
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// Perguntar algo no terminal
function askQuestion(query) {
  return new Promise(resolve => rl.question(query, answer => resolve(answer)));
}

// Criar ou atualizar o arquivo .env — agora recebe o path e o conteúdo como parâmetros
function createOrUpdateEnv(envPath, content) {
  const action = fs.existsSync(envPath) ? 'atualizado' : 'criado';
  fs.writeFileSync(envPath, content, 'utf8');
  console.log(`.env ${action} com sucesso em ${envPath}`);
}

// Instalar dependências com spawnSync (síncrono)
function installDependencies(folder) {
  console.log(`\nInstalando dependências em ${folder}...`);
  spawnSync('npm', ['install'], { cwd: folder, stdio: 'inherit', shell: true });
  console.log(`Dependências instaladas em ${folder}`);
}

// Iniciar servidor (FrontEnd ou BackEnd) com spawn (assíncrono)
function startServer(command, folder) {
  return spawn('npm', command, { cwd: folder, shell: true, stdio: 'inherit' });
}

// Função principal do setup
(async function main() {
  try {
    console.log('\n🎬 My Favorite Movies — Setup\n');

    // ── OMDb API Key ──────────────────────────────────────────────
    let apiKey;

    if (fs.existsSync(FRONTEND_ENV_PATH)) {
      const existing = fs.readFileSync(FRONTEND_ENV_PATH, 'utf8');
      const match = existing.match(/VITE_OMDB_API_KEY\s*=\s*(.*)/);

      if (match && match[1]) {
        console.log(`Chave OMDb já existente: ${match[1]}`);
        const answer = await askQuestion('Deseja substituir a chave existente? (s/n): ');
        apiKey = answer.toLowerCase() === 'n'
          ? match[1]
          : await askQuestion('Digite a nova OMDb API Key: ');
      } else {
        apiKey = await askQuestion('Digite a sua OMDb API Key: ');
      }
    } else {
      apiKey = await askQuestion('Digite a sua OMDb API Key: ');
    }

    // ── DATABASE_URL ──────────────────────────────────────────────
    let databaseUrl;

    if (fs.existsSync(BACKEND_ENV_PATH)) {
      const existing = fs.readFileSync(BACKEND_ENV_PATH, 'utf8');
      const match = existing.match(/DATABASE_URL\s*=\s*(.*)/);

      if (match && match[1]) {
        console.log(`\nDATABASE_URL já existente.`);
        const answer = await askQuestion('Deseja substituir a connection string existente? (s/n): ');
        databaseUrl = answer.toLowerCase() === 'n'
          ? match[1]
          : await askQuestion('Digite a nova DATABASE_URL (connection string do Neon): ');
      } else {
        databaseUrl = await askQuestion('\nDigite a DATABASE_URL (connection string do Neon): ');
      }
    } else {
      databaseUrl = await askQuestion('\nDigite a DATABASE_URL (connection string do Neon): ');
    }

    // ── FRONTEND_URL ──────────────────────────────────────────────
    const frontendUrl = await askQuestion('\nDigite a FRONTEND_URL (URL do seu frontend na Vercel, ou deixe em branco para usar localhost): ');

    rl.close();

    // ── Cria os arquivos .env ─────────────────────────────────────
    createOrUpdateEnv(
      FRONTEND_ENV_PATH,
      `VITE_OMDB_API_KEY=${apiKey}\nVITE_API_URL=http://localhost:3000\n`
    );

    createOrUpdateEnv(
      BACKEND_ENV_PATH,
      `DATABASE_URL=${databaseUrl}\nFRONTEND_URL=${frontendUrl || 'http://localhost:5173'}\n`
    );

    // ── Instala dependências ──────────────────────────────────────
    installDependencies(FRONTEND_PATH);
    installDependencies(BACKEND_PATH);

    // ── Inicia servidores ─────────────────────────────────────────
    console.log('\nIniciando servidores...');
    startServer(['run', 'dev'], FRONTEND_PATH);
    startServer(['run', 'dev'], BACKEND_PATH);

    console.log('\n✅ Setup concluído!');
    console.log('   FrontEnd → http://localhost:5173');
    console.log('   BackEnd  → http://localhost:3000\n');

  } catch (err) {
    console.error('Erro durante o setup:', err);
  }
})();