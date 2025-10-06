// src/db/conexao.js
import pkg from 'pg';
import dotenv from 'dotenv';
dotenv.config();

const { Pool } = pkg;
const isProduction = process.env.NODE_ENV === 'production';

let pool;

// 🛑 MUDANÇA: Se estiver em produção, IGNORE a verificação de DATABASE_URL e use as variáveis separadas.
if (isProduction) {
    // Render: Usar variáveis separadas que estão agora injetadas (DB_HOST, DB_USER, etc.)
    pool = new Pool({
        host: process.env.DB_HOST, // Agora é "elton-server"
        port: Number(process.env.DB_PORT),
        user: process.env.DB_USER,
        password: String(process.env.DB_PASSWORD),
        database: process.env.DB_NAME,
        ssl: { rejectUnauthorized: false }, // Render exige SSL para conexões internas
    });
} else if (process.env.DATABASE_URL) {
    // Outro host que usa DATABASE_URL (menos provável no seu caso)
    pool = new Pool({
        connectionString: process.env.DATABASE_URL,
        ssl: false,
    });
} else {
    // Ambiente local (lendo do arquivo .env)
    pool = new Pool({
        host: process.env.DB_HOST,
        port: Number(process.env.DB_PORT),
        user: process.env.DB_USER,
        password: String(process.env.DB_PASSWORD),
        database: process.env.DB_NAME,
        ssl: false,
    });
}


pool.connect()
    .then(client => {
        console.log("Conexão PostgreSQL estabelecida com sucesso!");
        client.release();
    })
    .catch(err => console.error('Erro ao conectar ao PostgreSQL:', err));

export default pool;