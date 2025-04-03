<?php
// backend/controllers/RecetteController.php
require_once __DIR__ . "/../models/Recette.php";

class RecetteController {
    private $recetteModel;

    public function __construct() {
        $this->recetteModel = new Recette();
    }

    // Obtenir toutes les recettes
    public function getAll() {
        echo json_encode($this->recetteModel->getAll());
    }

    // Obtenir une seule recette par ID
    public function getOne($id) {
        $recette = $this->recetteModel->getRecipeById($id);
        if ($recette) {
            echo json_encode($recette);
        } else {
            http_response_code(404);
            echo json_encode(["error" => "Recette non trouvée"]);
        }
    }

    

    // Supprimer une recette
    public function delete($id) {
        $response = $this->recetteModel->delete($id);
        echo json_encode($response);
    }
}



















// // Ajouter une nouvelle recette
// public function add() {
//     $data = json_decode(file_get_contents("php://input"), true);
//     if (!isset($data['nom']) || !isset($data['description'])) {
//         http_response_code(400);
//         echo json_encode(["error" => "Champs requis manquants"]);
//         return;
//     }

//     $response = $this->recetteModel->add($data);
//     echo json_encode($response);
// }

// // Modifier une recette existante
// public function update($id) {
//     $data = json_decode(file_get_contents("php://input"), true);
//     $response = $this->recetteModel->update($id, $data);
//     echo json_encode($response);
// }