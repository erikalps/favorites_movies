// setup.js
const fs = require('fs');
const path = require('path');
const readline = require('readline');
const { spawn, spawnSync } = require('child_process');

// Pastas do projeto
const FRONTEND_PATH = path.join(__dirname, 'FrontEnd');
const BACKEND_PATH = path.join(__dirname, 'BackEnd');
const ENV_PATH = path.join(FRONTEND_PATH, '.env');

// Criar interface para leitura do terminal
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// Perguntar algo no terminal
function askQuestion(query) {
  return new Promise(resolve => rl.question(query, answer => resolve(answer)));
}

// Criar ou atualizar o arquivo .env
function createOrUpdateEnv(apiKey) {
  let action = 'criado';

  if (fs.existsSync(ENV_PATH)) {
    const existing = fs.readFileSync(ENV_PATH, 'utf8');
    if (existing.includes('VITE_OMDB_API_KEY')) {
      action = 'atualizado';
    }
  }

  fs.writeFileSync(ENV_PATH, `VITE_OMDB_API_KEY=${apiKey}\n`, 'utf8');
  console.log(`.env ${action} com sucesso em FrontEnd/.env`);
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
    let apiKey;

    // Verifica se a API Key já existe no .env
    if (fs.existsSync(ENV_PATH)) {
      const existing = fs.readFileSync(ENV_PATH, 'utf8');
      const match = existing.match(/VITE_OMDB_API_KEY\s*=\s*(.*)/);

      if (match && match[1]) {
        console.log(`Chave OMDb já existente: ${match[1]}`);
        const answer = await askQuestion('Deseja substituir a chave existente? (s/n): ');
        if (answer.toLowerCase() === 'n') {
          apiKey = match[1];
        } else {
          apiKey = await askQuestion('Digite a nova OMDb API Key: ');
        }
      } else {
        apiKey = await askQuestion('Digite a sua OMDb API Key: ');
      }
    } else {
      apiKey = await askQuestion('Digite a sua OMDb API Key: ');
    }

    rl.close();

    // Cria ou atualiza .env
    createOrUpdateEnv(apiKey);

    // Instala dependências
    installDependencies(FRONTEND_PATH);
    installDependencies(BACKEND_PATH);

    // Inicia servidores simultaneamente
    console.log('\nIniciando servidores...');

    const frontServer = startServer(['run', 'dev'], FRONTEND_PATH);
    const backServer = startServer(['run', 'dev'], BACKEND_PATH);

    console.log('\nSetup concluído! FrontEnd e BackEnd estão rodando.');
  } catch (err) {
    console.error('Erro durante o setup:', err);
  }
})();
