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
TranslateBtn = document.getElementById("TranslateBtn");

const frBtn = document.getElementById("FRBtn");
const enBtn = document.getElementById("ENBtn");

// 🧠 On stocke la recette globalement
let currentRecipe = null;

// 🔄 Récupère l'ID de recette depuis l'URL
function getRecipeIdFromUrl() {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get("id");
}

// 🔄 Récupère la recette et l'affiche en anglais par défaut
function fetchRecipeDetails(id) {
  fetch(`http://localhost:8080/recette/${id}`)
    .then((response) => response.json())
    .then((recipe) => {
      if (recipe.nameFR) {
        frBtn.classList.remove("hidden");
        enBtn.classList.remove("hidden");
      }
      if (TranslateBtn) {
        TranslateBtn.href = `/add-translate.html?id=${recipe.id}`;
      }
      currentRecipe = recipe;
      displayRecipeDetails(recipe, "en"); // Par défaut anglais
    })
    .catch((error) => console.error("Erreur lors de la récupération :", error));
}

// 🧾 Affiche les détails selon la langue
function displayRecipeDetails(recipe, lang = "en") {
  const name = lang === "fr" ? recipe.nameFR || recipe.name : recipe.name;
  const ingredients =
    lang === "fr"
      ? recipe.ingredientsFR || recipe.ingredients
      : recipe.ingredients;
  const steps = lang === "fr" ? recipe.stepsFR || recipe.steps : recipe.steps;

  if (recipeDetailTitle) recipeDetailTitle.textContent = name;
  if (theMainTitle) theMainTitle.textContent = name;
  if (recipeDetailImage) recipeDetailImage.src = recipe.imageURL || "";
  if (recipeDetailDescription)
    recipeDetailDescription.textContent = recipe.description || "";

  if (recipeDetailIngredients && Array.isArray(ingredients)) {
    recipeDetailIngredients.innerHTML = "";
    ingredients.forEach((ingredient) => {
      const li = document.createElement("li");
      if (typeof ingredient === "string") {
        li.textContent = ingredient;
      } else {
        if (lang === "fr") {
          li.innerHTML = `<b>Ingrédient</b> : ${ingredient.name}, <b>Quantité</b> : ${ingredient.quantity}, <b>Type</b> : ${ingredient.type}`;
        } else {
          li.innerHTML = `<b>Ingredient</b> : ${ingredient.name}, <b>Quantity</b> : ${ingredient.quantity}, <b>Type</b> : ${ingredient.type}`;
        }
      }
      recipeDetailIngredients.appendChild(li);
    });
  }

  if (recipeDetailSteps && Array.isArray(steps)) {
    recipeDetailSteps.innerHTML = "";
    steps.forEach((step) => {
      const li = document.createElement("li");
      li.textContent = step;
      recipeDetailSteps.appendChild(li);
    });
  }

  if (recipeDetailTotalTime) {
    recipeDetailTotalTime.textContent = Array.isArray(recipe.timers)
      ? recipe.timers.join(" min, ") + " min"
      : recipe.timers + " min";
  }

  if (recipeDetailComments) {
    recipeDetailComments.textContent = "Commentaires à implémenter";
  }

  if (recipeDetailPhotos) {
    recipeDetailPhotos.textContent = "Photos à implémenter";
  }
}

// 🌍 Gestion des boutons de langue
frBtn.addEventListener("click", () => {
  if (currentRecipe) {
    displayRecipeDetails(currentRecipe, "fr");
  }
});

enBtn.addEventListener("click", () => {
  if (currentRecipe) {
    displayRecipeDetails(currentRecipe, "en");
  }
});

// 🚀 Initialisation
const recipeId = getRecipeIdFromUrl();
if (recipeId) {
  fetchRecipeDetails(recipeId);
} else {
  console.error("ID de recette non trouvé dans l'URL.");
}

// ==================== like system ============================
const likeBtn = document.getElementById("likeBtn");
const likeCountSpan = document.getElementById("likeCount");
window.addEventListener("DOMContentLoaded", () => {
  fetch(`http://localhost:8080/recette/${recipeId}/likes`)
    .then((res) => res.json())
    .then((data) => {
      likeCountSpan.textContent = `${data.likes} j’aime`;
    });
});

function refreshLikes(recipeId) {
  fetch(`http://localhost:8080/recette/${recipeId}/liked`, {
    credentials: "include",
  })
    .then((res) => res.json())
    .then((data) => {
      if (data.liked) {
        likeBtn.disabled = true;
        likeBtn.classList.add("btn-danger");
        likeBtn.innerHTML = `<i class="bi bi-heart-fill"></i> Aimé`;
      }
    });
}

likeBtn.addEventListener("click", () => {
  fetch(`http://localhost:8080/recette/${recipeId}/like`, {
    method: "POST",
    credentials: "include",
  })
    .then((res) => res.json())
    .then(() => {
      refreshLikes(recipeId);
      location.reload();
    });
});
