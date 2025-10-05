// src/db/conexao.js
import pkg from 'pg';
import dotenv from 'dotenv';
dotenv.config();

const { Pool } = pkg;

// Detecta se estamos em produção (Render) ou local
const isProduction = process.env.NODE_ENV === 'production';

const pool = new Pool({
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  user: process.env.DB_USER,
  password: String(process.env.DB_PASSWORD),
  database: process.env.DB_NAME,
  ssl: isProduction ? { rejectUnauthorized: false } : false
});

pool.connect()
  .then(client => {
    console.log("Conexão PostgreSQL estabelecida com sucesso!");
    client.release();
  })
  .catch(err => console.error('Erro ao conectar ao PostgreSQL:', err));

export default pool;
