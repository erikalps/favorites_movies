import { promises as fs } from 'fs';
import path from 'path'

// Caminho absoluto para o arquivo database.json

const dbPath = path.join(__dirname, 'database.json');

/**
 * Recebe um objeto JS e salva no database.json
 */
export async function writeDB(data: any) {
    try {
        // Converte objeto JS em string JSON e escreve no arquivo
        await fs.writeFile(dbPath, JSON.stringify(data, null, 2), 'utf-8');

    } catch (error) {
        console.error('Erro ao escrever no database.json:', error);
    }
}

/**
 * Lê o conteúdo do database.json e retorna como objeto JS
 * Se o arquivo não existir, cria com estrutura inicial {"favorites": []}
 */
export async function readDB() {
    try {
        const data = await fs.readFile(dbPath, 'utf-8');

        // Converte a string json para objeto json
        return JSON.parse(data);
    } catch (error: any) {
        // Se o erro for "arquivo não encontrado"
        if (error.code == 'ENOENT') {
            const initialData = { favorites: [] };

            // Cria o arquivo com estrutura inicial
            await writeDB(initialData);

            return initialData;
        }

        throw error;
    }
}