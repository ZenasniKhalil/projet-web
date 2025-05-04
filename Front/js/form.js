// form.js

const recipeForm = document.getElementById("recipeForm");

if (recipeForm) {
  recipeForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const name = document.getElementById("title").value;
    const imageURL = document.getElementById("image").value;
    const ingredients = document
      .getElementById("ingredients")
      .value.split(",")
      .map((item) => item.trim());
    const steps = document
      .getElementById("steps")
      .value.split(";")
      .map((item) => item.trim());
    const timers = document.getElementById("time").value;

    const recipeData = {
      name,
      imageURL,
      ingredients,
      steps,
      timers,
    };

    //console.log(recipeData);
    //console.log(JSON.stringify(recipeData));

    fetch("http://localhost:8080/recette/add", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(recipeData),
      credentials: "include",
    })
      .then((response) => response.json())
      .then((data) => {
        window.location.href = "index.html";
      })
      .catch((error) => {
        window.location.href = "index.html";
        console.error("Erreur lors de l'envoi des données:", error);
      });
  });
}
