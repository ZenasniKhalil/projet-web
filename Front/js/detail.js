// detail.js
const theMainTitle = document.getElementById("theMainTitle");
const recipeDetailTitle = document.getElementById("recipeDetailTitle");
const recipeDetailImage = document.getElementById("recipeDetailImage");
const recipeDetailDescription = document.getElementById(
  "recipeDetailDescription"
);
const recipeDetailIngredients = document.getElementById(
  "recipeDetailIngredients"
);
const recipeDetailSteps = document.getElementById("recipeDetailSteps");
const recipeDetailTotalTime = document.getElementById("recipeDetailTotalTime");
const recipeDetailComments = document.getElementById("recipeDetailComments");
const recipeDetailPhotos = document.getElementById("recipeDetailPhotos");

// Fonction pour récupérer l'ID de la recette depuis l'URL
function getRecipeIdFromUrl() {
  const urlParams = new URLSearchParams(window.location.search);
  console.log(urlParams.get("id"));
  return urlParams.get("id");
}

// Fonction pour récupérer les détails de la recette depuis le serveur
function fetchRecipeDetails(id) {
  fetch(`http://localhost:8080/recette/${id}`) // Remplacez par l'URL de votre API
    .then((response) => response.json())
    .then((recipe) => {
      displayRecipeDetails(recipe);
    })
    .catch((error) =>
      console.error(
        "Erreur lors de la récupération des détails de la recette:",
        error
      )
    );
}

// Fonction pour afficher les détails de la recette
function displayRecipeDetails(recipe) {
  if (recipeDetailTitle) recipeDetailTitle.textContent = recipe.name;
  if (theMainTitle) theMainTitle.textContent = recipe.name;
  if (recipeDetailImage) recipeDetailImage.src = recipe.imageURL;
  if (recipeDetailDescription)
    recipeDetailDescription.textContent = recipe.description;

  if (recipeDetailIngredients) {
    recipeDetailIngredients.innerHTML = "";
    recipe.ingredients.forEach((ingredient) => {
      const li = document.createElement("li");
      li.innerHTML = `<b>the ingredient</b> : ${ingredient.name}, <b>quantity</b> : ${ingredient.quantity}, <b>type</b> : ${ingredient.type}`;
      recipeDetailIngredients.appendChild(li);
    });
  }

  if (recipeDetailSteps) {
    recipeDetailSteps.innerHTML = "";
    recipe.steps.forEach((step) => {
      const li = document.createElement("li");
      li.textContent = `${step}`;
      recipeDetailSteps.appendChild(li);
    });
  }

  if (recipeDetailTotalTime) recipeDetailTotalTime.textContent = recipe.timers;

  //  Afficher les commentaires et les photos (à implémenter)
  if (recipeDetailComments) {
    recipeDetailComments.textContent = "Commentaires à implémenter";
  }
  if (recipeDetailPhotos) {
    recipeDetailPhotos.textContent = "Photos à implémenter";
  }
}

// Initialisation
const recipeId = getRecipeIdFromUrl();
if (recipeId) {
  fetchRecipeDetails(recipeId);
} else {
  console.error("ID de recette non trouvé dans l'URL.");
}
