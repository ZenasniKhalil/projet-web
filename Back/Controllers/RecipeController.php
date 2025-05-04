<?php
// backend/controllers/RecetteController.php
require_once __DIR__ . "/../models/Recipe.php";
require_once __DIR__ . "/../models/User.php";
class RecetteController {
    private $recetteModel;
    private $userModel;
    private $filePath = __DIR__ . "/../Data/recettes.json";
    private $userFilePath = __DIR__ . "/../Data/users.json";

    public function __construct() {
        $this->recetteModel = new Recette();
        $this->userModel = new User();
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

    // Ajouter une nouvelle recette


public function add(): void {
    //session_start();
    if (!isset($_SESSION['user'])) {
        http_response_code(403);
        echo json_encode(['error' => 'Access denied']);
        return;
    }



    $currentUser = $_SESSION['user'];

    // if ($currentUser['role'] !== 'Chef' && $currentUser['role'] !== 'Admin') {
    //     http_response_code(403);
    //     echo json_encode(['error' => 'Seuls les chefs et admins peuvent créer des recettes']);
    //     return;
    // }

    $input = json_decode(file_get_contents("php://input"), true);

    if (
        !isset($input['name'], $input['ingredients'], $input['steps']) ||
        empty($input['name']) ||
        !is_array($input['ingredients']) ||
        !is_array($input['steps'])
    ) {
        http_response_code(400);
        echo json_encode(['error' => 'Champs invalides ou manquants']);
        return;
    }

    $id = uniqid();

    $data = [
        'id' => $id,
        'name' => $input['name'],
        'Author' => $currentUser['firstname']." ".$currentUser['lastname'] ?? 'Unknown',
        'ingredients' => $input['ingredients'],
        'steps' => $input['steps'],
        'timers' => $input['timers'] ?? array_fill(0, count($input['steps']), 0),
        'imageURL' => $input['imageURL'] ?? '',
        'originalURL' => $input['originalURL'] ?? '',
    ];

    $this->recetteModel->add($data); // Ajoute via modèle
    http_response_code(201);
    echo json_encode(['message' => 'Recipe created successfully', 'id' => $id]);
}


public function addTranslation($id): void {
    if (!isset($_SESSION['user'])) {
        http_response_code(403);
        echo json_encode(['error' => 'Access denied']);
        return;
    }
    $currentUser = $_SESSION['user'];
    if (!in_array($currentUser['role'], ['Traducteur', 'Admin'])) {
        http_response_code(403);
        echo json_encode(['error' => 'Only translators and admins can add translations']);
        return;
    }

    $input = json_decode(file_get_contents("php://input"), true);
    if (
        !isset($input['nameFR']) ||
        !isset($input['ingredientsFR']) ||
        !isset($input['stepsFR']) ||
        !is_array($input['ingredientsFR']) ||
        !is_array($input['stepsFR'])
    ) {
        http_response_code(400);
        echo json_encode(['error' => 'Invalid translation data']);
        return;
    }
    

    $recette = $this->recetteModel->getRecipeById($id);
    if (!$recette) {
        http_response_code(404);
        echo json_encode(["error" => "Recette non trouvée"]);
    } else {
        $data = [
            'nameFR' => $input['nameFR'],
            'ingredientsFR' => $input['ingredientsFR'],
            'stepsFR' => $input['stepsFR'],
        ];
    
        $this->recetteModel->update($id,$data); 
        http_response_code(201);
        echo json_encode(['message' => 'Translation added successfully']);
    }

    // Ajouter les traductions

    // $data = [
    //     'nameFR' => $input['nameFR'],
    //     'ingredientsFR' => $input['ingredientsFR'],
    //     'stepsFR' => $input['stepsFR'],
    // ];

    // $this->recetteModel->update($id,$data); 
    // http_response_code(201);
    // echo json_encode(['message' => 'Translation added successfully']);
}



    

    // Supprimer une recette
    public function delete($id) {
        $response = $this->recetteModel->delete($id);
        echo json_encode($response);
    }
}



















