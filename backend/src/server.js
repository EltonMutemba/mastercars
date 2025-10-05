import app from "./app.js"
const PORT = 8081


app.listen(PORT, ()=>{
  console.log("Servidor rodando no endereço http://localhost:${PORT}")
})