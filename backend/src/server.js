import app from './app.js';
import dotenv from 'dotenv';
dotenv.config();

console.log("DB_USER =", process.env.DB_USER);
console.log("DB_PASSWORD =", process.env.DB_PASSWORD);
console.log("DB_HOST =", process.env.DB_HOST);
console.log("NODE_ENV =", process.env.NODE_ENV);

const PORT = process.env.PORT || 8081;

app.listen(PORT, () => {
  console.log(`Servidor rodando no endereço http://localhost:${PORT}`);
});
