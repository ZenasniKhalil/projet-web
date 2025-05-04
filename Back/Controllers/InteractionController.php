<?php

class InteractionController {
    private string $filePath = __DIR__ . '/../Data/likes.json';

    private function loadLikes(): array {
        if (!file_exists($this->filePath)) return [];
        return json_decode(file_get_contents($this->filePath), true) ?? [];
    }

    private function saveLikes(array $likes): void {
        file_put_contents($this->filePath, json_encode($likes, JSON_PRETTY_PRINT));
    }

    public function addLike($id): void {
        if (!isset($_SESSION['user'])) {
            http_response_code(401);
            echo json_encode(['error' => 'Non connecté']);
            return;
        }

        $email = $_SESSION['user']['email'];
        $likes = $this->loadLikes();

        // Vérifie si déjà liké
        foreach ($likes as $like) {
            if ($like['recipeId'] === $id && $like['email'] === $email) {
                http_response_code(409);
                echo json_encode(['error' => 'Déjà liké']);
                return;
            }
        }

        $likes[] = ['recipeId' => $id, 'email' => $email];
        $this->saveLikes($likes);

        http_response_code(200);
        echo json_encode(['message' => 'Like ajouté']);
    }

    public function countLikes($id): void {
        $likes = $this->loadLikes();
        $count = count(array_filter($likes, fn($like) => $like['recipeId'] === $id));
        echo json_encode(['likes' => $count]);
    }

    public function hasLiked($id): void {
        session_start();
        if (!isset($_SESSION['user'])) {
            echo json_encode(['liked' => false]);
            return;
        }

        $email = $_SESSION['user']['email'];
        $likes = $this->loadLikes();

        foreach ($likes as $like) {
            if ($like['recipeId'] === $id && $like['email'] === $email) {
                echo json_encode(['liked' => true]);
                return;
            }
        }

        echo json_encode(['liked' => false]);
    }
}


?>