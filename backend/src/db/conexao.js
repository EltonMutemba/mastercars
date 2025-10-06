// src/db/conexao.js
import pkg from 'pg';
import dotenv from 'dotenv';

// Carrega variáveis do arquivo .env localmente. 
// No Render, as variáveis são injetadas diretamente pelo painel.
dotenv.config();

const { Pool } = pkg;
const isProduction = process.env.NODE_ENV === 'production';

let pool;

// 🛑 CORREÇÃO: Usar a string de conexão se estiver em PRODUÇÃO OU se a variável estiver definida.
if (isProduction || process.env.DATABASE_URL) {
  // 👉 Render ou outro host que fornece DATABASE_URL (via ${internalDatabaseUrl})
  pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    // Necessário para conexões SSL do Render para PostgreSQL
    ssl: isProduction ? { rejectUnauthorized: false } : false,
  });
} else {
  // 👉 Ambiente local (lendo do arquivo .env)
  pool = new Pool({
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    user: process.env.DB_USER,
    password: String(process.env.DB_PASSWORD),
    database: process.env.DB_NAME,
    // SSL desligado para ambiente de desenvolvimento local
    ssl: false, 
  });
}

// Testa a conexão ao iniciar
pool.connect()
  .then(client => {
    console.log("Conexão PostgreSQL estabelecida com sucesso!");
    client.release(); // Libera o cliente de volta para o pool
  })
  .catch(err => console.error('Erro ao conectar ao PostgreSQL:', err));

export default pool;