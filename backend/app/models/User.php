<?php

require_once __DIR__ . "/../core/Model.php";

class User extends Model
{
    protected static string $table = "users";

    public static function findByEmail(string $email)
    {
        $db = Database::connect();
        $stmt = $db->prepare(
            "SELECT * FROM users WHERE email = :email"
        );
        $stmt->execute(["email" => $email]);
        return $stmt->fetch(PDO::FETCH_ASSOC);
    }

    public static function findByNombre(string $nombre)
    {
        $db = Database::connect();
        $stmt = $db->prepare(
            "SELECT * FROM users WHERE nombre = :nombre"
        );
        $stmt->execute(["nombre" => $nombre]);
        return $stmt->fetch(PDO::FETCH_ASSOC);
    }

    public static function findByRol(string $rol)
    {
        $db = Database::connect();
        $stmt = $db->prepare(
            "SELECT * FROM users WHERE rol = :rol"
        );
        $stmt->execute(["rol" => $rol]);
        return $stmt->fetch(PDO::FETCH_ASSOC);
    }

    public static function findByPointHistory($pointstHistoryId)
    {
        $db = Database::connect();
        $stmt = $db->prepare(
            "SELECT ph.*, u.nombre, u.email, u.rol, u.nivel, u.avatar_url
                    FROM points_history ph
                    INNER JOIN users u ON ph.user_id = u.id
                    WHERE ph.id = :id"
        );
        $stmt->execute(["id" => $pointstHistoryId]);
        return $stmt->fetch(PDO::FETCH_ASSOC);
    }

    public static function find(int $userId): ?array
    {
        $db = Database::connect();
        $stmt = $db->prepare(
            "SELECT * FROM users WHERE id = :id"
        );
        $stmt->execute(["id" => $userId]);
        // al tratarse de un find solo se trae un resultado por eso se usar fetch
        $result = $stmt->fetch(PDO::FETCH_ASSOC);
        return $result ?: null;
    }

    public static function create($data)
    { // $data contiene los datos de la pregunta a insertar
        $db = Database::connect();
        $stmt = $db->prepare(
            "INSERT INTO users (nombre, email, password, rol, nivel, puntos,
             avatar_url, created_at )
                    VALUES (:nombre, :email, :password, :rol, :nivel, :puntos, :avatar_url
                    , :created_at)"
        );
        $stmt->execute([
            "nombre" => $data["nombre"],
            "email" => $data["email"],
            "password" => $data["password"],
            "rol" => $data["rol"],
            "nivel" => $data["nivel"],
            "puntos" => $data["puntos"],
            "avatar_url" => $data["avatar_url"],
            "created_at" => $data["created_at"],
        ]);
        // retornamos con lastInsertId porque sera de manera auto_increment
        return (int) $db->lastInsertId();
    }

    public static function update($userId, $data)
    { // creamos dos variables questionId y data
        $db = Database::connect();
        $stmt = $db->prepare(
            "UPDATE users SET nombre = :nombre, email = :email,
                password = :password, rol = :rol, nivel = :nivel,
                puntos = :puntos, avatar_url = :avatar_url, created_at = :created_at
            WHERE id = :id"
        ); // retornamos igual un stmt y lo almacenamos en un array $data y tambien el $questionId
        return $stmt->execute([
            "nombre" => $data["nombre"],
            "email" => $data["email"],
            "password" => $data["password"],
            "rol" => $data["rol"],
            "nivel" => $data["nivel"],
            "puntos" => $data["puntos"],
            "avatar_url" => $data["avatar_url"],
            "created_at" => $data["created_at"],
            "id" => $userId
        ]);
    }

    public static function delete($userId)
    { // le pasamos como parametro questionId
        $db = Database::connect();
        $stmt = $db->prepare(
            "DELETE FROM users WHERE id = :id"
        );
        // no devolveremos nada, ya que se borro la pregunta
        return $stmt->execute(["id" => $userId]);
    }
}
