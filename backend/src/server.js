// server.js
import app from './app.js';
import dotenv from 'dotenv';
dotenv.config();

// Mostra as variáveis de ambiente para debug
console.log("DB_USER =", process.env.DB_USER);
console.log("DB_PASSWORD =", process.env.DB_PASSWORD ? '****' : undefined);
console.log("DB_HOST =", process.env.DB_HOST);
console.log("NODE_ENV =", process.env.NODE_ENV);

// Porta do servidor
const PORT = process.env.PORT || 8081;

// Inicia o servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando no endereço http://localhost:${PORT}`);
  if (process.env.NODE_ENV === 'production') {
    console.log(`Servidor em produção! URL do Render: use o link do teu backend.`);
  }
});
