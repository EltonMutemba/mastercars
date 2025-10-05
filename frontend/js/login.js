// ==============================
// LOGIN
// ==============================
const loginForm = document.getElementById("loginForm");
const loginMsg = document.getElementById("loginMsg");
const forgotPasswordLink = document.getElementById('forgotPasswordLink');

loginForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value.trim();

    loginMsg.textContent = "";
    loginMsg.style.color = "var(--danger)";

    firebase.auth().signInWithEmailAndPassword(email, password)
        .then(response => {
            window.location.href = "/frontend/dashboard.html"; 
        })
        .catch(error => {
            console.error("Erro no login:", error);
            loginMsg.textContent = "Credenciais inválidas ou usuário não existe.";
        });
});

// Recuperar senha
forgotPasswordLink.addEventListener('click', function (e) {
    e.preventDefault();

    const email = document.getElementById('email').value.trim();

    if (!email) {
        loginMsg.textContent = "Por favor, insira seu email para recuperar a senha.";
        loginMsg.style.color = "var(--danger)";
        return;
    }

    firebase.auth().sendPasswordResetEmail(email)
        .then(() => {
            loginMsg.textContent = "Email de redefinição enviado! Verifique sua caixa de entrada.";
            loginMsg.style.color = "var(--success)";
        })
        .catch(error => {
            loginMsg.textContent = error.message;
            loginMsg.style.color = "var(--danger)";
            console.error(error);
        });
});



