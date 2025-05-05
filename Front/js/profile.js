fetch("http://localhost:8080/info", { credentials: "include" })
  .then((res) => res.json())
  .then((data) => {
    if (!data.user) {
      window.location.href = "index.html";
      return;
    }

    const { firstname, lastname, role } = data.user;
    document.getElementById("username").textContent = firstname;
    document.getElementById("userInfo").innerHTML = `
          <p><strong>Nom :</strong> ${lastname}</p>
          <p><strong>Prénom :</strong> ${firstname}</p>
          <p><strong>Mon Role :</strong> ${role}</p>
        `;

    if (data.user.role === "Chef") {
      fetch("http://localhost:8080/recettes", { credentials: "include" })
        .then((res) => res.json())
        .then((recipes) => {
          const recipesDiv = document.getElementById("RecipesDiv");
          recipesDiv.innerHTML = `<h3 class="mb-3">📋 Mes Recettes</h3>
          <div id="userRecipes" class="row g-4"></div>`;
          const container = document.getElementById("userRecipes");
          const fullName = firstname + " " + lastname;
          const userRecipes = recipes.filter((r) => r.Author === fullName);

          if (userRecipes.length === 0) {
            container.innerHTML = `<p class="text-muted">Aucune recette pour le moment.</p>`;
            return;
          }

          userRecipes.forEach((recipe) => {
            const col = document.createElement("div");
            col.className = "col-md-6 col-lg-4";

            col.innerHTML = `
                <div class="card shadow-sm h-100">
                  <img src="${recipe.imageURL}" class="card-img-top" alt="${recipe.name}">
                  <div class="card-body d-flex flex-column">
                    <h5 class="card-title">${recipe.name}</h5>
                    <p class="text-muted small mb-3">Par ${recipe.Author}</p>
                    <div class="mt-auto d-flex justify-content-between">
                      <button class="btn btn-outline-primary btn-sm" onclick="editRecipe('${recipe.id}')">
                        <i class="bi bi-pencil"></i> Modifier
                      </button>
                      <button class="btn btn-outline-danger btn-sm" onclick="deleteRecipe('${recipe.id}')">
                        <i class="bi bi-trash"></i> Supprimer
                      </button>
                    </div>
                  </div>
                </div>
              `;
            container.appendChild(col);
          });
        });
    } else if (data.user.role === "Admin") {
      const DemandeAtt = document.getElementById("DemandeAtt");
      DemandeAtt.innerHTML = `<div id="pendingUsersSection" class="mt-5">
      <h3>Demandes en attente</h3>
      <div id="pendingUsersList" class="list-group"></div>
    </div>`;

      fetch("http://localhost:8080/admin/pending", {
        credentials: "include",
      })
        .then((res) => res.json())
        .then((users) => {
          const list = document.getElementById("pendingUsersList");
          list.innerHTML = "";

          users.forEach((user) => {
            const item = document.createElement("div");
            item.className =
              "list-group-item d-flex justify-content-between align-items-center";
            item.innerHTML = `
            <div>
              <strong>${user.firstname} ${user.lastname}</strong> – ${user.email} 
              <span class="badge bg-warning text-dark ms-2">${user.role}</span>
            </div>
            <div>
              <button class="btn btn-success btn-sm me-2" onclick="validateUser('${user.email}')">Valider</button>
              <button class="btn btn-danger btn-sm" onclick="refuseUser('${user.email}')">Refuser</button>
            </div>
          `;
            list.appendChild(item);
          });
        });
    }
  });

function deleteRecipe(id) {
  if (!confirm("Voulez-vous supprimer cette recette ?")) return;
  fetch(`http://localhost:8080/recette/delete/${id}`, {
    method: "DELETE",
    credentials: "include",
  })
    .then(() => location.reload())
    .catch(() => alert("Erreur lors de la suppression"));
}

function editRecipe(id) {
  alert("Redirige vers la page de modification pour l'ID : " + id);
  // Redirection possible : window.location.href = `edit.html?id=${id}`;
}

document.getElementById("logoutBtn").addEventListener("click", () => {
  fetch("http://localhost:8080/logout", {
    method: "GET",
    credentials: "include",
  }).then(() => (window.location.href = "index.html"));
});

function validateUser(email) {
  fetch(`http://localhost:8080/admin/changeRole/${email}`, {
    method: "POST",
    credentials: "include",
  }).then(() => {
    location.reload();
    loadPendingUsers();
  });
}

function refuseUser(email) {
  fetch(`http://localhost:8080/admin/refuseRole/${email}`, {
    method: "POST",
    credentials: "include",
  }).then(() => {
    location.reload();
    loadPendingUsers();
  });
}
