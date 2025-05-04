<?php

require_once __DIR__ . "/Router.php";
require_once __DIR__ . "/Controllers/AuthController.php";
require_once __DIR__ . "/Controllers/RecipeController.php";
require_once __DIR__ . "/Controllers/AdminController.php";
require_once __DIR__ . "/Controllers/InteractionController.php";

$router = new Router();


## 🔹 AUTHENTIFICATION (Users)
$router->register('POST', '/register', function () {
    (new AuthController(__DIR__ . '/Data/users.json'))->register();
});

$router->register('POST', '/login', function () {
    (new AuthController(__DIR__ . '/Data/users.json'))->login();
});

$router->register('GET', '/auth', function () {
    (new AuthController(__DIR__ . '/Data/users.json'))->isAuthenticated();
});

$router->register('GET', '/logout', function () {
    (new AuthController(__DIR__ . '/Data/users.json'))->logout();
});

$router->register('GET', '/info', function () {
    (new AuthController(__DIR__ . '/Data/users.json'))->info();
});

// ## 🔹 GESTION DES RECETTES
 $router->register('GET', '/recettes', function () {
     (new RecetteController())->getAll();
});

 $router->register('GET', '/recette/{id}', function ($params) {
     (new RecetteController())->getOne($params['id']);
});

$router->register('POST', '/recette/add', function () {
     (new RecetteController())->add();
});

$router->register('PUT', '/recette/translate/{id}', function ($params) {
    (new RecetteController())->addTranslation($params['id']);
});

// $router->register('PUT', '/recette/update/{id}', function ($params) {
//     (new RecetteController())->update($params[0]);
// });

$router->register('DELETE', '/recette/delete/{id}', function ($params) {
    (new RecetteController())->delete($params['id']);
});

$router->register('POST', '/recette/{id}/like', function ($params) {
    (new InteractionController())->addLike($params['id']);
});

$router->register('GET', '/recette/{id}/likes', function ($params) {
    (new InteractionController())->countLikes($params['id']);
});

$router->register('GET', '/recette/{id}/liked', function ($params) {
    (new InteractionController())->hasLiked($params['id']);
});

// ## 🔹 GESTION DES UTILISATEURS (Admin)
// $router->register('GET', '/admin/users', function () {
//     (new AdminController())->getUsers();
// });

$router->register('POST', '/admin/changeRole/{email}', function ($params) {
    (new AdminController())->changeRole($params['email']);
});

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
