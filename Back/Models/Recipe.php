<?php
// backend/models/Recette.php
class Recette {
    private $file = __DIR__ . "/../Data/recipes.json";

    // Lire toutes les recettes
    public function getAll() {
        if (!file_exists($this->file)) return [];
        return json_decode(file_get_contents($this->file), true);
    }

    // Récupérer une seule recette par ID
    public function getRecipeById($id) {
        $recettes = $this->getAll();
        foreach ($recettes as $recette) {
            if ($recette['id'] == $id) {
                return $recette;
            }
        }
        return null; // Si non trouvée
    }

    // Ajouter une recette
    public function add($data) {
        $recettes = $this->getAll();
        $data['id'] = count($recettes) + 1; // Générer un ID unique
        $recettes[] = $data;
        file_put_contents($this->file, json_encode($recettes, JSON_PRETTY_PRINT));
        return ["success" => true, "message" => "Recette ajoutée !"];
    }

    // Mettre à jour une recette
    public function update($id, $data) {
        $recettes = $this->getAll();
        foreach ($recettes as &$recette) {
            if ($recette['id'] == $id) {
                $recette = array_merge($recette, $data);
                file_put_contents($this->file, json_encode($recettes, JSON_PRETTY_PRINT));
                return ["success" => true, "message" => "Recette mise à jour !"];
            }
        }
        return ["error" => "Recette non trouvée"];
    }

    // Supprimer une recette
    public function delete($id) {
        $recettes = $this->getAll();
        $newRecettes = array_filter($recettes, fn($recette) => $recette['id'] != $id);
        if (count($recettes) == count($newRecettes)) return ["error" => "Recette non trouvée"];

        file_put_contents($this->file, json_encode(array_values($newRecettes), JSON_PRETTY_PRINT));
        return ["success" => true, "message" => "Recette supprimée !"];
    }
}
