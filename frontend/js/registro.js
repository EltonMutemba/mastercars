// Aguarda o DOM carregar
document.addEventListener('DOMContentLoaded', () => {
    const registerForm = document.getElementById('registerForm');
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');
    const confirmPasswordInput = document.getElementById('confirmPassword');
    const registerMsg = document.getElementById('registerMsg');

    registerForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const email = emailInput.value.trim();
        const password = passwordInput.value.trim();
        const confirmPassword = confirmPasswordInput.value.trim();

        if(password !== confirmPassword){
            registerMsg.textContent = "As senhas não coincidem!";
            registerMsg.style.color = "red";
            return;
        }

        // Criação do usuário
        firebase.auth().createUserWithEmailAndPassword(email, password)
            .then((userCredential) => {
                registerMsg.textContent = "Conta criada com sucesso!";
                registerMsg.style.color = "green";

                // Redireciona para login após 1.5s
                setTimeout(() => {
                    window.location.href = "login.html";
                }, 1500);
            })
            .catch((error) => {
                console.error("Erro ao criar usuário:", error);
                registerMsg.textContent = error.message;
                registerMsg.style.color = "red";
            });
    });
});
