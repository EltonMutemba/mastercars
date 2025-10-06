// src/db/conexao.js
import pkg from 'pg';
import dotenv from 'dotenv';
dotenv.config();

const { Pool } = pkg;
const isProduction = process.env.NODE_ENV === 'production';

let pool;

if (process.env.DATABASE_URL) {
  // 👉 Render ou outro host que fornece DATABASE_URL
  pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: isProduction ? { rejectUnauthorized: false } : false,
  });
} else {
  // 👉 Ambiente local
  pool = new Pool({
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    user: process.env.DB_USER,
    password: String(process.env.DB_PASSWORD),
    database: process.env.DB_NAME,
    ssl: isProduction ? { rejectUnauthorized: false } : false,
  });
}

pool.connect()
  .then(client => {
    console.log("Conexão PostgreSQL estabelecida com sucesso!");
    client.release();
  })
  .catch(err => console.error('Erro ao conectar ao PostgreSQL:', err));

export default pool;
