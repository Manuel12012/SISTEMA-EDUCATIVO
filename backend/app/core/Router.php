<?php

class Router
{
    //guardamos las rutas registradas
    private static array $routes = [];

    // metodos publicos GET POST PUT DELETE
    public static function get($uri, $action)
    {
        self::add('GET', $uri, $action);
    }

    public static function post($uri, $action)
    {
        self::add('POST', $uri, $action);
    }

    public static function put($uri, $action)
    {
        self::add('PUT', $uri, $action);
    }

    public static function delete($uri, $action)
    {
        self::add('DELETE', $uri, $action);
    }

    // guarda la ruta en el array, limpia el / 
    private static function add($method, $uri, $action)
    {
        self::$routes[] = [
            'method' => $method,
            'uri' => trim($uri, '/'),
            'action' => $action
        ];
    }

    public static function dispatch()
    { // funcion para obtener el request actual
        $method = $_SERVER['REQUEST_METHOD'];
        $uri = trim(parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH), '/');

        // quitamos "api/" del inicio
        if (str_starts_with($uri, 'api/')) {
            $uri = substr($uri, 4);
        }
        // recorre todas las rutas registradas
        foreach (self::$routes as $route) {

            // convertimos /questions/{id} → regex
            $pattern = preg_replace('#\{[a-zA-Z]+\}#', '([0-9]+)', $route['uri']);
            $pattern = "#^$pattern$#";

            // si concide el metodo y el uri
            if ($route['method'] === $method && preg_match($pattern, $uri, $matches)) {
                // extraemos parametros  id    
                array_shift($matches);

                // resuelve el controller + metodo
                [$controller, $methodName] = $route['action'];
                // leer body JSON
                $body = json_decode(file_get_contents("php://input"), true);
                $body = $body ?? [];

                // llamar al controller
                call_user_func_array(
                    [$controller, $methodName],
                    array_merge($matches, [$body])
                );
                return;

            }
        }

        Response::json([
            "error" => "Ruta no encontrada"
        ], 404);
    }
}
