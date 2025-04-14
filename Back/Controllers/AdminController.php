<?php

class AdminController {
    private $filePath = __DIR__ . "/../Data/users.json";

    public function getAllUsers(): void {
        session_start();
        if (!isset($_SESSION['user']) || $_SESSION['user']['role'] !== 'admin') {
            http_response_code(403);
            echo json_encode(['error' => 'Access denied']);
            return;
        }

        if (!file_exists($this->filePath)) {
            http_response_code(404);
            echo json_encode(['error' => 'No users found']);
            return;
        }

        $users = json_decode(file_get_contents($this->filePath), true);
        http_response_code(200);
        echo json_encode($users);
    }

    public function changeRole($email): void {
        session_start();
        if (!isset($_SESSION['user']) || $_SESSION['user']['role'] !== 'admin') {
            http_response_code(403);
            echo json_encode(['error' => 'Access denied']);
            return;
        }

        $users = json_decode(file_get_contents($this->filePath), true);

        if (!isset($users[$email])) {
            http_response_code(404);
            echo json_encode(['error' => 'User not found']);
            return;
        }




        if($users[$email]['role'] === 'DemandeTraducteur'){
            $users[$email]['role'] = 'Traducteur';
            file_put_contents($this->filePath, json_encode($users, JSON_PRETTY_PRINT));
            http_response_code(200);
            echo json_encode(['message' => 'User role updated', 'user' => $users[$email]]);
        } else if ($users[$email]['role'] === 'DemandeChef'){
            $users[$email]['role'] = 'Chef';
            file_put_contents($this->filePath, json_encode($users, JSON_PRETTY_PRINT));
            http_response_code(200);
            echo json_encode(['message' => 'User role updated', 'user' => $users[$email]]);
        } else {
            http_response_code(400);
            echo json_encode(['error' => 'Invalid role transition']);
        }
    }
}
