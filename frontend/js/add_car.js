// add_car.js

// Detecta se estamos em local ou produção
const BACKEND_URL = window.location.hostname === 'localhost'
  ? 'http://localhost:8081'
  : 'https://nome-do-teu-backend.onrender.com'; // substitui pelo URL real do teu backend no Render

// Pega parâmetros da URL (id do carro para edição)
const urlParams = new URLSearchParams(window.location.search);
const carroId = urlParams.get('id');

const titulo = document.querySelector('#pageTitle'); // h1 da página add_car.html
const form = document.querySelector('#carroForm');

if (carroId) {
    // Editar carro
    titulo.textContent = 'Editar Carro';

    fetch(`${BACKEND_URL}/carros/${carroId}`)
        .then(res => res.json())
        .then(carro => {
            document.getElementById('marca').value = carro.marca;
            document.getElementById('modelo').value = carro.modelo;
            document.getElementById('ano').value = carro.ano;
        })
        .catch(err => console.error('Erro ao buscar carro:', err));
} else {
    titulo.textContent = 'Adicionar Carro';
}

// Submissão do formulário
form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const carroData = {
        marca: document.getElementById('marca').value,
        modelo: document.getElementById('modelo').value,
        ano: Number(document.getElementById('ano').value)
    };

    try {
        let response;
        if (carroId) {
            // Editar
            response = await fetch(`${BACKEND_URL}/carros/${carroId}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(carroData)
            });
        } else {
            // Adicionar
            response = await fetch(`${BACKEND_URL}/carros`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(carroData)
            });
        }

        const data = await response.json();

        if (response.ok) {
            window.location.href = '/frontend/dashboard.html';
        } else {
            alert(data.error || 'Erro ao salvar carro.');
        }
    } catch (err) {
        console.error('Erro ao conectar com o backend:', err);
        alert('Erro ao conectar com o backend.');
    }
});

// Função cancelar
function cancelar() {
    window.location.href = '/frontend/dashboard.html';
}
