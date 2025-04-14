// users.js

const userListTableBody = document.getElementById('userListTableBody');

// Fonction pour récupérer la liste des utilisateurs depuis le serveur
function loadUsers() {
    fetch('/api/users')  // Remplacez par l'URL de votre API
        .then(response => response.json())
        .then(users => {
            displayUsers(users);
        })
        .catch(error => console.error('Erreur lors de la récupération des utilisateurs:', error));
}

// Fonction pour afficher la liste des utilisateurs dans le tableau
function displayUsers(users) {
    if (!userListTableBody) return;

    userListTableBody.innerHTML = '';
    users.forEach(user => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${user.username}</td>
            <td>${user.role}</td>
            <td>
                <button class="btn btn-sm btn-outline-primary" data-user-id="${user.id}">Modifier Rôle</button>
            </td>
        `;
        userListTableBody.appendChild(row);
    });

    // Gestion des clics sur les boutons "Modifier Rôle" (à implémenter)
    const editButtons = document.querySelectorAll('#userListTableBody .btn-outline-primary');
    editButtons.forEach(button => {
        button.addEventListener('click', () => {
            const userId = button.dataset.userId;
            //  Ouvrir un modal ou afficher un formulaire pour modifier le rôle
            console.log(`Modifier le rôle de l'utilisateur ${userId}`);
            //  Implémentez cette partie
        });
    });
}

// Initialisation (si nécessaire, par exemple, si la page se charge indépendamment)
// if (userListTableBody) {
//     loadUsers();
// }