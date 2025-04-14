// auth.js

const loginForm = document.getElementById("loginForm");
const registerForm = document.getElementById("registerForm");

if (loginForm) {
  loginForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const email = document.getElementById("loginEmail").value;
    const password = document.getElementById("loginPassword").value;
    // Envoyer les données au serveur pour la connexion
    fetch("http://localhost:8080/login", {
      // Remplacez par l'URL de votre API
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    })
      .then((response) => {
        return response.text().then((text) => {
          console.log(text);
          //window.location.href = "index.html";
        });
      })
      .catch((error) => {
        console.error("Erreur lors de la connexion:", error);
      });
  });
}

if (registerForm) {
  registerForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const lastname = document.getElementById("registerName").value;
    const firstname = document.getElementById("registerFirstname").value;
    const email = document.getElementById("registerEmail").value;
    const password = document.getElementById("registerPassword").value;
    const role = document.querySelector('input[name="role"]:checked').value;
    console.log(JSON.stringify({ firstname, lastname, email, password, role }));

    // Envoyer les données au serveur pour l'inscription
    fetch("http://localhost:8080/register", {
      // Remplacez par l'URL de votre API
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ firstname, lastname, email, password, role }),
    })
      .then((response) => response.json())
      .then((data) => {
        window.location.href = "index.html";
      })
      .catch((error) => {
        console.error("Erreur lors de l'inscription:", error);
      });
  });
}
