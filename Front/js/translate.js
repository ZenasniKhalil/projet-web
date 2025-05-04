document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("recipeForm");

  const recipeId = new URLSearchParams(window.location.search).get("id");
  if (!recipeId) {
    alert("ID de recette manquant.");
    return;
  }

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const nameFR = document.getElementById("title").value.trim();
    const ingredientsFR = document
      .getElementById("ingredients")
      .value.split(",")
      .map((i) => i.trim());
    const stepsFR = document
      .getElementById("steps")
      .value.split(";")
      .map((s) => s.trim());

    const data = { nameFR, ingredientsFR, stepsFR };

    fetch(`http://localhost:8080/recette/translate/${recipeId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(data),
    })
      .then((res) => {
        if (!res.ok) throw new Error("Erreur de traduction");
        return res.json();
      })
      .then((res) => {
        window.location.href = `recipe-detail.html?id=${recipeId}`;
      })
      .catch((err) => {
        console.error(err);
        alert("Échec de l'enregistrement de la traduction.");
      });
  });
});
