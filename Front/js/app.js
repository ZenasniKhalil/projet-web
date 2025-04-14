// app.js

// Sélection des éléments du DOM
const loginBtn = document.getElementById('loginBtn');
const registerBtn = document.getElementById('registerBtn');
const loginModal = new bootstrap.Modal(document.getElementById('loginModal'));
const registerModal = new bootstrap.Modal(document.getElementById('registerModal'));

// Gestion des clics sur les boutons d'authentification
if (loginBtn) {
    loginBtn.addEventListener('click', (event) => {
        event.preventDefault(); // Empêcher le comportement par défaut du lien
        loginModal.show();
    });
}

if (registerBtn) {
    registerBtn.addEventListener('click', (event) => {
        event.preventDefault(); // Empêcher le comportement par défaut du lien
        registerModal.show();
    });
}