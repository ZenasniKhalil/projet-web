<?php
session_start();

class AuthController {
    private string $filePath;

    public function __construct(string $filePath) {
        $this->filePath = $filePath;
    }

 

    public function register(): void {
        if ($_SERVER['CONTENT_TYPE'] !== 'application/json') {
            http_response_code(400);
            header('Content-Type: application/json');
            echo json_encode(['error' => 'Invalid Content-Type']);
            return;
        }
    
        // Récupérer les données depuis $_POST
        // $firstname = filter_input(INPUT_POST, 'firstname');
        // $lastname = filter_input(INPUT_POST, 'lastname');
        // $requestedRole = filter_input(INPUT_POST, 'role');
        // $email = filter_input(INPUT_POST, 'email', FILTER_VALIDATE_EMAIL);
        // $password = filter_input(INPUT_POST, 'password', FILTER_SANITIZE_FULL_SPECIAL_CHARS);

        // ✅ Lire le JSON brut
    $data = json_decode(file_get_contents("php://input"), true);

    // ✅ Extraire les champs depuis $data
    $firstname = $data['firstname'] ?? null;
    $lastname = $data['lastname'] ?? null;
    $requestedRole = $data['role'] ?? null;
    $email = isset($data['email']) ? filter_var($data['email'], FILTER_VALIDATE_EMAIL) : null;
    $password = isset($data['password']) ? filter_var($data['password'], FILTER_SANITIZE_FULL_SPECIAL_CHARS) : null;
        

        if (!$firstname || !$lastname || !$email || !$password) {
            
            http_response_code(400);
            echo json_encode(['error' => 'Invalid input: all fields are required']);
            return;
        }
    
        // Vérifier si l'utilisateur existe déjà
        $users = $this->getAllUsers();
    
        if (isset($users[$email])) {
            http_response_code(409);
            echo json_encode(['error' => 'Email already registered']);
            return;
        }

         // 🔹 Rôle par défaut : "cuisinier"
         $role = 'cuisinier';

         // 🔹 Si l'utilisateur demande un rôle spécial, il devient une demande
         if ($requestedRole === 'Traducteur') {
            $role = 'DemandeTraducteur';
         } elseif ($requestedRole === 'Chef') {
            $role = 'DemandeChef';
         }

    
        // Ajouter l'utilisateur
        $users[$email] = [
            'firstname' => $firstname,
            'lastname' => $lastname,
            'password' => password_hash($password, PASSWORD_DEFAULT),
            'role' => $role
        ];
        
        file_put_contents($this->filePath, json_encode($users, JSON_PRETTY_PRINT));
    
        http_response_code(201);
        echo json_encode(['message' => 'User registered successfully']);
    }
    

    // ✅ CONNEXION
    public function login(): void {
        if ($_SERVER['CONTENT_TYPE'] !== 'application/json') {
            http_response_code(400);
            echo json_encode(['error' => 'Invalid Content-Type']);
            return;
        }

        // ✅ Lire le JSON brut
        $data = json_decode(file_get_contents("php://input"), true);
        $email = isset($data['email']) ? filter_var($data['email'], FILTER_VALIDATE_EMAIL) : null;
        $password = isset($data['password']) ? filter_var($data['password'], FILTER_SANITIZE_FULL_SPECIAL_CHARS) : null;
        // $email = filter_input(INPUT_POST, 'email', FILTER_VALIDATE_EMAIL);
        // $password = filter_input(INPUT_POST, 'password', FILTER_SANITIZE_FULL_SPECIAL_CHARS);

        if (!$email || !$password) {
            http_response_code(400);
            echo json_encode(['error' => 'Invalid email or password']);
            return;
        }

        $users = $this->getAllUsers();

        if (!isset($users[$email]) || !password_verify($password, $users[$email]['password'])) {
            http_response_code(401);
            echo json_encode(['error' => 'Invalid credentials']);
            return;
        }

        // Stocker la session utilisateur
        $_SESSION['user'] = $email;
        echo $_SESSION['user'];

        http_response_code(200);
        echo json_encode(['message' => 'Login successful']);
    }

    // ✅ DÉCONNEXION
    public function logout(): void {
        session_destroy();
        http_response_code(200);
        echo json_encode(['message' => 'Logout successful']);
    }

    // ✅ Récupérer tous les utilisateurs
    private function getAllUsers(): array {
        if (!file_exists($this->filePath)) return [];
        return json_decode(file_get_contents($this->filePath), true) ?? [];
    }

    // ✅ Vérifier si un utilisateur est connecté
    public function isAuthenticated(): void {
        header('Content-Type: application/json');
        echo json_encode(['user' => isset($_SESSION['user'])]);
    }

    public function info(): void {
        header('Content-Type: application/json');
        echo json_encode(['user' => $_SESSION['user']]);
    }
}
