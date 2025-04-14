<?php
// backend/models/User.php
class User {
    private $file = __DIR__ . "/../Data/users.json";

    // Récupérer tous les utilisateurs
    public function getAll() {
        if (!file_exists($this->file)) return [];
        return json_decode(file_get_contents($this->file), true);
    }

    // Trouver un utilisateur par email
    public function getByEmail($email) {
        $users = $this->getAll();
        foreach ($users as $user) {
            if ($user['email'] === $email) {
                return $user;
            }
        }
        return null;
    }

    // Ajouter un nouvel utilisateur
    public function add($userData) {
        $users = $this->getAll();
        $userData['id'] = count($users) + 1;
        $userData['password'] = password_hash($userData['password'], PASSWORD_BCRYPT); // Hasher le mot de passe
        $users[] = $userData;
        file_put_contents($this->file, json_encode($users, JSON_PRETTY_PRINT));
        return ["success" => true, "message" => "Utilisateur enregistré !"];
    }
}
