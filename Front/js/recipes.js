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
function displayRecipes(recipes) {
  if (!recipeList) return;
  recipeList.innerHTML = "";
  if (recipes.length === 0) {
    recipeList.innerHTML = "<p>Aucune recette trouvée.</p>";
    return;
  }

  recipes.forEach((recipe) => {
    const recipeCard = document.createElement("div");
    recipeCard.classList.add("col-md-4", "mb-4");
    recipeCard.innerHTML = `
    <div class="col">
    <div class="card shadow-sm">
    <img
      src="${recipe.imageURL}"
      class="card-img-top"
      alt="${recipe.name}"
    />
    <div class="card-body">
      <h5 class="card-title">${recipe.name}</h5>
      <p class="card-text text-muted">Par Chef ${recipe.Author}</p>
      <ul class="list-unstyled small">
        <li><strong>Préparation :</strong> ${recipe.timers} min</li>
      </ul>
      <div
        class="d-flex justify-content-between align-items-center"
      >
        <span class="text-danger"
          ><i class="bi bi-heart-fill"></i> 24 j’aime</span
        >
        <a class="btn btn-outline-primary btn-sm" href="/recipe-detail.html?id=${recipe.id}" id="recipesLink">
        Voir la recette
        </a>
      </div>
    </div>
  </div>
  </div>
        `;
    recipeList.appendChild(recipeCard);
  });
}

// Fonction pour filtrer les recettes
// function filterRecipes() {
//     const searchTerm = searchInput.value.toLowerCase();
//     const activeFilters = Array.from(filters)
//         .filter(filter => filter.classList.contains('active'))
//         .map(filter => filter.dataset.filter);

//     filteredRecipes = allRecipes.filter(recipe => {
//         const titleMatch = recipe.title.toLowerCase().includes(searchTerm);
//         const descriptionMatch = recipe.description.toLowerCase().includes(searchTerm);
//         const ingredientMatch = recipe.ingredients.some(ingredient => ingredient.toLowerCase().includes(searchTerm)); // Ajustement ici
//         const stepMatch = recipe.steps.some(step => step.toLowerCase().includes(searchTerm)); // Et ici

//         const filterMatch = activeFilters.every(filter => recipe[filter]); // Vérifie si la recette correspond à tous les filtres actifs

//         return (titleMatch || descriptionMatch || ingredientMatch || stepMatch) && filterMatch;
//     });

//     displayRecipes(filteredRecipes);
// }

// Écouteurs d'événements
// if (searchInput) {
//     searchInput.addEventListener('input', filterRecipes);
// }

// filters.forEach(filter => {
//     filter.addEventListener('click', () => {
//         filter.classList.toggle('active');
//         filterRecipes();
//     });
// });

// Initialisation
fetchRecipes();
