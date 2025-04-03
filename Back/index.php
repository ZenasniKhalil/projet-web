<?php
require_once __DIR__ . "/core/Router.php";
require_once __DIR__ . "/controllers/AuthController.php";
require_once __DIR__ . "/controllers/RecipeController.php";
require_once __DIR__ . "/controllers/AdminController.php";
require_once __DIR__ . "/controllers/InteractionController.php";

$router = new Router();

// ## 🔹 AUTHENTIFICATION (Users)
// $router->register('POST', '/register', function () {
//     (new AuthController())->register();
// });

// $router->register('POST', '/login', function () {
//     (new AuthController())->login();
// });

// $router->register('GET', '/logout', function () {
//     (new AuthController())->logout();
// });

// ## 🔹 GESTION DES RECETTES
// $router->register('GET', '/recettes', function () {
//     (new RecetteController())->getAll();
// });

// $router->register('GET', '/recette/{id}', function ($params) {
//     (new RecetteController())->getOne($params[0]);
// });

// $router->register('POST', '/recette/add', function () {
//     (new RecetteController())->add();
// });

// $router->register('PUT', '/recette/update/{id}', function ($params) {
//     (new RecetteController())->update($params[0]);
// });

// $router->register('DELETE', '/recette/delete/{id}', function ($params) {
//     (new RecetteController())->delete($params[0]);
// });

// ## 🔹 GESTION DES UTILISATEURS (Admin)
// $router->register('GET', '/admin/users', function () {
//     (new AdminController())->getUsers();
// });

// $router->register('POST', '/admin/changeRole/{id}', function ($params) {
//     (new AdminController())->changeRole($params[0]);
// });

// ## 🔹 INTERACTIONS (Commentaires, Likes, Photos)
// $router->register('POST', '/recette/{id}/comment', function ($params) {
//     (new InteractionController())->addComment($params[0]);
// });

// $router->register('POST', '/recette/{id}/like', function ($params) {
//     (new InteractionController())->addLike($params[0]);
// });

// $router->register('POST', '/recette/{id}/upload', function ($params) {
//     (new InteractionController())->uploadPhoto($params[0]);
// });

## 🔹 DISPATCH LA REQUÊTE ENTRANTE
$router->handleRequest();
