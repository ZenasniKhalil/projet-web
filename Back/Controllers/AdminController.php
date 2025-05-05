<?php

class AdminController {
    private $filePath = __DIR__ . "/../Data/users.json";

    private function loadUsers(): array {
        if (!file_exists($this->filePath)) return [];
        return json_decode(file_get_contents($this->filePath), true);
    }

    private function saveUsers(array $users): void {
        file_put_contents($this->filePath, json_encode($users, JSON_PRETTY_PRINT));
    }

    public function getPendingUsers(): void {
        if (!isset($_SESSION['user']) || $_SESSION['user']['role'] !== 'Admin') {
            http_response_code(403);
            echo json_encode(['error' => 'Accès refusé']);
            return;
        }

        $users = $this->loadUsers();
        $pending = [];

        foreach ($users as $email => $user) {
            if (in_array($user['role'], ['DemandeChef', 'DemandeTraducteur'])) {
                $pending[] = [
                    'email' => $email,
                    'firstname' => $user['firstname'],
                    'lastname' => $user['lastname'],
                    'role' => $user['role']
                ];
            }
        }

        echo json_encode($pending);
    }

    public function changeRole(string $email): void {
        if (!isset($_SESSION['user']) || $_SESSION['user']['role'] !== 'Admin') {
            http_response_code(403);
            echo json_encode(['error' => 'Accès refusé']);
            return;
        }

        $users = $this->loadUsers();

        if (!isset($users[$email])) {
            http_response_code(404);
            echo json_encode(['error' => 'Utilisateur introuvable']);
            return;
        }

        $currentRole = $users[$email]['role'];

        if ($currentRole === 'DemandeChef') {
            $users[$email]['role'] = 'Chef';
        } elseif ($currentRole === 'DemandeTraducteur') {
            $users[$email]['role'] = 'Traducteur';
        } else {
            $users[$email]['role'] = 'cuisinier'; // Refusé
        }

        $this->saveUsers($users);
        echo json_encode(['success' => true, 'newRole' => $users[$email]['role']]);
    }
    public function RefuseRole(string $email): void {
        if (!isset($_SESSION['user']) || $_SESSION['user']['role'] !== 'Admin') {
            http_response_code(403);
            echo json_encode(['error' => 'Accès refusé']);
            return;
        }

        $users = $this->loadUsers();

        if (!isset($users[$email])) {
            http_response_code(404);
            echo json_encode(['error' => 'Utilisateur introuvable']);
            return;
        }

        $currentRole = $users[$email]['role'];

        if ($currentRole === 'DemandeChef' || $currentRole === 'DemandeTraducteur') {
            $users[$email]['role'] = 'cuisinier';
        }

        $this->saveUsers($users);
        echo json_encode(['success' => true, 'newRole' => $users[$email]['role']]);
    }
}
