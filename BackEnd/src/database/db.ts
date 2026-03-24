import { Pool } from 'pg';

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false }
});

export async function initDB() {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS favorites (
      imdb_id   TEXT PRIMARY KEY,
      title     TEXT NOT NULL,
      year      TEXT NOT NULL,
      poster    TEXT,
      plot      TEXT,
      runtime   TEXT,
      genre     TEXT,
      rating    INTEGER DEFAULT 0,
      comment   TEXT DEFAULT ''
    )
  `);
}

export default pool;