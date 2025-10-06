// dashboard.js

// Detecta se estamos em local ou produção
const BACKEND_URL = window.location.hostname === 'localhost'
  ? 'http://localhost:8081'
  : 'https://nome-do-teu-backend.onrender.com'; // substitui pelo URL do teu backend no Render

// Redirecionar para add_car.html para adicionar
function adicionarCarro() {
    window.location.href = "/frontend/add_car.html";
}

// Redirecionar para add_car.html para editar
function editarCarro(id) {
    window.location.href = `/frontend/add_car.html?id=${id}`;
}

// Deletar carro 
async function deletarCarro(id) {
    if (!confirm('Deseja realmente deletar este carro?')) return;

    try {
        const response = await fetch(`${BACKEND_URL}/carros/${id}`, { method: 'DELETE' });
        const data = await response.json();
        if (response.ok) {
            carregarCarros(); // Atualiza tabela
        } else {
            alert(data.error || 'Erro ao deletar carro.');
        }
    } catch (err) {
        console.error('Erro ao deletar carro:', err);
        alert('Erro ao conectar com o backend.');
    }
}

// Função para buscar os carros da API
async function carregarCarros() {
  try {
    const resposta = await fetch(`${BACKEND_URL}/carros`); // usa BACKEND_URL
    const carros = await resposta.json();

    const tbody = document.getElementById("tabela-carros-body");
    tbody.innerHTML = ""; // limpa qualquer linha antiga

    carros.forEach(carro => {
      const tr = document.createElement("tr");
      tr.innerHTML = `
        <td>${carro.id}</td>
        <td>${carro.marca}</td>
        <td>${carro.modelo}</td>
        <td>${carro.ano}</td>
        <td style="text-align: right;">
          <button class="btn btn-success btn-sm" onclick="editarCarro(${carro.id})">Editar</button>
          <button class="btn btn-danger btn-sm" onclick="deletarCarro(${carro.id})">Deletar</button>
        </td>
      `;
      tbody.appendChild(tr);
    });
  } catch (err) {
    console.error("Erro ao carregar carros:", err);
    alert('Erro ao conectar com o backend.');
  }
}

// Chama a função quando a página carregar
window.onload = carregarCarros;
