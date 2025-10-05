// src/db/conexao.js
import mysql from "mysql2";

// Cria a conexão direta
const conexao = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "",          
  database: "gestao_carros"
});

// Conecta ao banco
conexao.connect((erro) => {
  if (erro) {
    console.error("Erro ao conectar ao MySQL:", erro);
  } else {
    console.log("Conexão MySQL estabelecida com sucesso!");
  }
});

export default conexao;
