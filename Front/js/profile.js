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

    fetch("http://localhost:8080/recettes", { credentials: "include" })
      .then((res) => res.json())
      .then((recipes) => {
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
