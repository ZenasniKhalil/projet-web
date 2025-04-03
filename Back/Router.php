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
            'path' => $this->formatPath($path),
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

        // Headers CORS
        header("Access-Control-Allow-Origin: *");
		// Permet les requêtes AJAX entre domaines différents (Access-Control-Allow-Origin: *).
        header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
		// Spécifie les méthodes HTTP autorisées
        header("Access-Control-Allow-Headers: Content-Type, Authorization");
        header("Content-Type: application/json");
		// Permet l’envoi de requêtes avec JSON

        // OPTIONS Request (Préflight CORS)
		// On répond avec un code 204 (No Content) pour valider la requête et permettre au navigateur de continuer.
        if ($method === "OPTIONS") {
            http_response_code(204);
            exit;
        }

        foreach ($this->routes as $route) {
            $params = $this->matchRoute($route['path'], $path);
            if ($route['method'] === $method && $params !== false) {
                call_user_func($route['handler'], $params);
                return;
            }
        }

        // Route non trouvée
        http_response_code(404);
        echo json_encode(['error' => 'Route not found']);
    }

    /**
     * Formate une URL en remplaçant les paramètres dynamiques
     */
    private function formatPath(string $path): string
    {
        return preg_replace('/\{[a-zA-Z0-9_]+\}/', '([^/]+)', str_replace('/', '\/', $path));
    }

    /**
     * Vérifie si une URL correspond à une route définie et extrait les paramètres
     */
    private function matchRoute(string $routePath, string $requestPath)
    {
        if (preg_match("/^$routePath$/", $requestPath, $matches)) {
            array_shift($matches);
            return $matches;
        }
        return false;
    }
}
