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
}
