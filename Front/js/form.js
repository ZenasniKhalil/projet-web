// form.js

const recipeForm = document.getElementById("recipeForm");

if (recipeForm) {
  recipeForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const nom = document.getElementById("title").value;
    const imageURL = document.getElementById("image").value;
    const ingredients = document
      .getElementById("ingredients")
      .value.split(",")
      .map((item) => item.trim());
    const steps = document
      .getElementById("steps")
      .value.split(";")
      .map((item) => item.trim());
    const time = document.getElementById("time").value;

    const recipeData = {
      nom,
      imageURL,
      ingredients,
      steps,
      time,
    };

    // Envoyer les données au serveur
    fetch("/recette/add", {
      // Remplacez par l'URL de votre API
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(recipeData),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          // Recette ajoutée avec succès
          console.log("Recette ajoutée!", data);
          // Rediriger ou afficher un message de succès
          window.location.href = "index.html";
        } else {
          // Erreur lors de l'ajout de la recette
          console.error("Erreur lors de l'ajout de la recette:", data.message);
          // Afficher un message d'erreur
        }
      })
      .catch((error) => {
        console.error("Erreur lors de l'envoi des données:", error);
      });
  });
}
