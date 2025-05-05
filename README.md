# 🍽️ Cuisine Mondiale

Un projet web complet de gestion de recettes multilingues (FR/EN) avec système d'authentification, rôles utilisateurs, likes, commentaires, et validation d’inscriptions par un administrateur.

---

## ⚙️ Lancement du projet en local

### 🖥️ Backend (API PHP)

1. Ouvre un terminal
2. Place-toi dans le dossier `Back/`
3. Lance le serveur PHP :

```bash
php -S localhost:8080
```

### 🌍 2. Lancer le frontend avec **Live Server (port 5500)**

1. Ouvre le dossier `Front/` dans **Visual Studio Code**
2. Assure-toi que l’extension **Live Server** est installée :
   - [Live Server sur le Marketplace](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer)
3. Ouvre `index.html`
4. Clique sur **"Go Live"** en bas à droite de VS Code

Par défaut, Live Server démarre sur :  
[http://localhost:5500](http://localhost:5500)

> ⚠️ Assure-toi que le backend tourne en même temps (sur le port `8080`), car le front utilise `http://localhost:8080` pour communiquer avec l’API.
