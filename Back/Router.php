<?php

class Router
{
    private array $routes = [];

    /**
     * Enregistre une nouvelle route
     */
    public function register(string $method, string $path, callable $handler): void
    {
        $this->routes[] = [
            'method' => strtoupper($method),
            'path' => $path,
            'handler' => $handler,
        ];
    }

    /**
     * Gère la requête entrante
     */
    public function handleRequest(): void
    {
        $method = $_SERVER['REQUEST_METHOD'];
        $path = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);

        // 🔹 Headers CORS
        header("Access-Control-Allow-Origin: http://127.0.0.1:5500");
        header("Access-Control-Allow-Credentials : true");
        header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
        header("Access-Control-Allow-Headers: Content-Type, Authorization");
        header("Content-Type: application/json");

        // 🔹 OPTIONS Request (Préflight CORS)
        if ($method === "OPTIONS") {
            http_response_code(204);
            exit;
        }

        foreach ($this->routes as $route) {
            $params = $this->matchRoute($route['path'], $path);
            
            if ($params !== false && $route['method'] === $method) {
                // 🔹 Gestion des requêtes PUT et DELETE
                if ($method === "PUT" || $method === "DELETE") {
                    $_POST = json_decode(file_get_contents("php://input"), true) ?? [];
                }

                call_user_func($route['handler'], $params);
                return;
            }
        }

        // 🔴 Route non trouvée
        http_response_code(404);
        echo json_encode(['error' => 'Route not found']);
    }

    /**
     * Vérifie si une URL correspond à une route définie et extrait les paramètres
     */
    private function matchRoute(string $routePath, string $requestPath)
    {
        // Convertir les segments de chemin en tableau
        $routeSegments = explode('/', trim($routePath, '/'));
        $requestSegments = explode('/', trim($requestPath, '/'));
        
        // Vérifier si le nombre de segments correspond
        if (count($routeSegments) !== count($requestSegments)) {
            return false;
        }
        
        $params = [];
        
        // Comparer chaque segment
        foreach ($routeSegments as $index => $routeSegment) {
            // Si c'est un paramètre dynamique {xxx}
            if (preg_match('/^\{([a-zA-Z0-9_]+)\}$/', $routeSegment, $matches)) {
                $paramName = $matches[1];
                $params[$paramName] = $requestSegments[$index];
                // Stocker aussi dans un index numérique pour compatibilité
                $params[] = $requestSegments[$index];
            } 
            // Sinon, c'est un segment fixe qui doit correspondre exactement
            elseif ($routeSegment !== $requestSegments[$index]) {
                return false;
            }
        }
        
        // Ajouter la correspondance complète à l'index 0
        $params[0] = '/' . implode('/', $requestSegments);
        
        return $params;
    }
}