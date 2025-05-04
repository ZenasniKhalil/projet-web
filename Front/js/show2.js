let addRecipe = document.getElementById("addRecipeBtn");
let profile = document.getElementById("profileBtn");
let TranslateBtn = document.getElementById("TranslateBtn");
window.addEventListener("DOMContentLoaded", () => {
  fetch("http://localhost:8080/info", {
    credentials: "include",
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.user.role === "Chef") {
        if (addRecipe) {
          addRecipe.classList.remove("hidden");
        }
      }
      if (data.user.role === "Traducteur") {
        if (TranslateBtn) {
          TranslateBtn.classList.remove("hidden");
        }
      }
      profile.innerHTML = "Welcome " + data.user.firstname;
      profile.classList.remove("hidden");
    })
    .catch((error) => {
      console.error("Erreur :", error);
    });
});
