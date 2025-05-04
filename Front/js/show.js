let login = document.getElementById("loginBtn");
let register = document.getElementById("registerBtn");
let logout = document.getElementById("logoutBtn");

//let addRecipe = document.getElementById("addRecipeBtn");

window.addEventListener("DOMContentLoaded", () => {
  fetch("http://localhost:8080/auth", {
    credentials: "include",
  })
    .then((response) => response.json())
    .then((data) => {
      if (data["user"]) {
        logout.classList.remove("hidden");
      } else {
        login.classList.remove("hidden");
        register.classList.remove("hidden");
      }
    })
    .catch((error) => {
      console.error("Erreur :", error);
      // Affiche le bloc invité par défaut
      document.getElementById("guest-block").style.display = "block";
    });
});
