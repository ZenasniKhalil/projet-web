// auth.js

const loginForm = document.getElementById("loginForm");
const registerForm = document.getElementById("registerForm");
const logoutBtn = document.getElementById("logoutBtn");

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
      credentials: "include",
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.error) {
          alert("Erreur : " + data.error);
        } else {
          //console.log("Utilisateur connecté :", data.user.role);
          window.location.href = "index.html";
        }
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

if (logoutBtn) {
  logoutBtn.addEventListener("click", () => {
    fetch("http://localhost:8080/logout", {
      method: "GET",
      credentials: "include",
    })
      .then((response) => response.json())
      .then((data) => {
        localStorage.removeItem("user"); // si tu stockes des infos côté front
        window.location.href = "index.html"; // redirige vers la page de connexion
      })
      .catch((error) => {
        console.error("Erreur lors de la déconnexion :", error);
      });
  });
}
