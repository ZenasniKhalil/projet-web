<?php
// backend/models/Recette.php
class Recette {
    private $file = __DIR__ . "/../Data/recipes.json";

    // Lire toutes les recettes
    public function getAll() {
        if (!file_exists($this->file)) return [];
        
        $content = file_get_contents($this->file);
        $data = json_decode($content, true);

        return is_array($data) ? $data : [];
    }

    // Récupérer une seule recette par ID
    public function getRecipeById($id) {
        foreach ($this->getAll() as $recette) {
            if ($recette['id'] == $id) {
                return $recette;
            }
        }
        return null; // Si non trouvée
    }

    // Ajouter une recette
    public function add($data) {
        $recettes = $this->getAll();

        // Trouver le plus grand ID et ajouter +1
        $maxId = empty($recettes) ? 0 : max(array_column($recettes, 'id'));
        $data['id'] = $maxId + 1;

        $recettes[] = $data;
        file_put_contents($this->file, json_encode($recettes, JSON_PRETTY_PRINT));

        return ["success" => true, "message" => "Recette ajoutée !", "id" => $data['id']];
    }

    // Mettre à jour une recette
    public function update($id, $data) {
        $recettes = $this->getAll();
        $found = false;

        foreach ($recettes as &$recette) {
            if ($recette['id'] == $id) {
                $recette = array_merge($recette, $data);
                $found = true;
                break;
            }
        }

        if (!$found) return ["error" => "Recette non trouvée"];

        file_put_contents($this->file, json_encode($recettes, JSON_PRETTY_PRINT));
        return ["success" => true, "message" => "Recette mise à jour !"];
    }

    // Supprimer une recette
    public function delete($id) {
        $recettes = $this->getAll();
        $newRecettes = array_filter($recettes, fn($recette) => $recette['id'] != $id);

        if (count($recettes) == count($newRecettes)) {
            return ["error" => "Recette non trouvée"];
        }

        file_put_contents($this->file, json_encode(array_values($newRecettes), JSON_PRETTY_PRINT));
        return ["success" => true, "message" => "Recette supprimée !"];
    }
}
