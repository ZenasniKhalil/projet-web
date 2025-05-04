// recipes.js

const recipeGrid = document.getElementById("recipeGrid");
const recipeList = document.getElementById("recette-list");
const searchInput = document.getElementById("searchInput");
const filters = document.querySelectorAll(
  "#recipeListView .btn-outline-secondary"
);

let allRecipes = []; // Stocke toutes les recettes
let filteredRecipes = []; // Stocke les recettes filtrées

// Fonction pour récupérer les recettes depuis le serveur
function fetchRecipes() {
  fetch("http://localhost:8080/recettes") // Remplacez par l'URL de votre API
    .then((response) => response.json())
    .then((data) => {
      allRecipes = data;
      //filteredRecipes = [...allRecipes]; // Initialise les recettes filtrées avec toutes les recettes

      displayRecipes(allRecipes);
    })
    .catch((error) =>
      console.error("Erreur lors de la récupération des recettes:", error)
    );
}

// Fonction pour afficher les recettes dans la grille
// function displayRecipes(recipes) {
//   if (!recipeList) return;
//   recipeList.innerHTML = "";
//   if (recipes.length === 0) {
//     recipeList.innerHTML = "<p>Aucune recette trouvée.</p>";
//     return;
//   }

//   recipes.forEach((recipe) => {
//     let likes = 0;
//     fetch(`http://localhost:8080/recette/${recipe.id}/likes`)
//       .then((res) => res.json())
//       .then((data) => {
//         likes = data.likes;
//       });
//     const recipeCard = document.createElement("div");
//     recipeCard.classList.add("col-md-4", "mb-4");
//     recipeCard.innerHTML = `
//     <div class="col">
//     <div class="card shadow-sm">
//     <img
//       src="${recipe.imageURL}"
//       class="card-img-top"
//       alt="${recipe.name}"
//     />
//     <div class="card-body">
//       <h5 class="card-title">${recipe.name}</h5>
//       <p class="card-text text-muted">Par Chef ${recipe.Author}</p>
//       <ul class="list-unstyled small">
//         <li><strong>Préparation :</strong> ${recipe.timers} min</li>
//       </ul>
//       <div
//         class="d-flex justify-content-between align-items-center"
//       >
//         <span class="text-danger"
//           ><i class="bi bi-heart-fill"></i> 50 j’aime</span
//         >
//         <a class="btn btn-outline-primary btn-sm" href="/recipe-detail.html?id=${recipe.id}" id="recipesLink">
//         Voir la recette
//         </a>
//       </div>
//     </div>
//   </div>
//   </div>
//         `;
//     recipeList.appendChild(recipeCard);
//   });
// }

function displayRecipes(recipes) {
  if (!recipeList) return;
  recipeList.innerHTML = "";

  if (recipes.length === 0) {
    recipeList.innerHTML = "<p>Aucune recette trouvée.</p>";
    return;
  }

  recipes.forEach((recipe) => {
    fetch(`http://localhost:8080/recette/${recipe.id}/likes`)
      .then((res) => res.json())
      .then((data) => {
        const likes = data.likes;

        const recipeCard = document.createElement("div");
        recipeCard.classList.add("col-md-4", "mb-4");

        recipeCard.innerHTML = `
          <div class="card shadow-sm h-100">
            <img
              src="${recipe.imageURL}"
              class="card-img-top"
              alt="${recipe.name}"
              style="height: 200px; object-fit: cover;"
            />
            <div class="card-body d-flex flex-column">
              <h5 class="card-title">${recipe.name}</h5>
              <p class="card-text text-muted">Par Chef ${recipe.Author}</p>
              <ul class="list-unstyled small">
                <li><strong>Préparation :</strong> ${
                  Array.isArray(recipe.timers)
                    ? recipe.timers.join(" + ")
                    : recipe.timers
                } min</li>
              </ul>
              <div class="mt-auto d-flex justify-content-between align-items-center">
                <span class="text-danger">
                  <i class="bi bi-heart-fill"></i> ${likes} j’aime
                </span>
                <a class="btn btn-outline-primary btn-sm" href="/recipe-detail.html?id=${
                  recipe.id
                }">
                  Voir la recette
                </a>
              </div>
            </div>
          </div>
        `;

        recipeList.appendChild(recipeCard);
      });
  });
}

fetchRecipes();
