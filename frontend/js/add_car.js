const urlParams = new URLSearchParams(window.location.search);
const carroId = urlParams.get('id');

const titulo = document.querySelector('#pageTitle'); // um h1 na página add_car.html
const form = document.querySelector('#carroForm');

if (carroId) {
    // Se existe id, estamos editando
    titulo.textContent = 'Editar Carro';

    // Buscar dados do carro no backend e preencher campos
    fetch(`http://localhost:8081/carros/${carroId}`)
        .then(res => res.json())
        .then(carro => {
            document.getElementById('marca').value = carro.marca;
            document.getElementById('modelo').value = carro.modelo;
            document.getElementById('ano').value = carro.ano;
        });
} else {
    titulo.textContent = 'Adicionar Carro';
}

// Ao submeter o formulário
form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const carroData = {
        marca: document.getElementById('marca').value,
        modelo: document.getElementById('modelo').value,
        ano: Number(document.getElementById('ano').value)
    };

    let response;
    if (carroId) {
        // Editar
        response = await fetch(`http://localhost:8081/carros/${carroId}`, {
            method: 'PUT',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(carroData)
        });
    } else {
        // Adicionar
        response = await fetch('http://localhost:8081/carros', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(carroData)
        });
    }

    const data = await response.json();
    if (response.ok) {
        window.location.href = '/frontend/dashboard.html'; // Volta para dashboard
    } else {
        alert(data.error || 'Erro ao salvar carro.');
    }
});

function cancelar(){
    window.location.href = "/frontend/dashboard.html";
}