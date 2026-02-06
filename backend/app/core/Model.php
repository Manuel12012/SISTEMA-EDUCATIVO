<?php

require_once __DIR__ . "/../config/database.php";

abstract class Model
{
    protected static string $table;
    protected static string $primaryKey = "id";

    protected static ?PDO $db = null;

    protected static function db(): PDO
    {
        if (self::$db === null) {
            self::$db = Database::connect();
        }

        return self::$db;
    }

    public static function all()
    {
        $db = Database::connect();
        $stmt = $db->query("SELECT * FROM " . static::$table);

        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }

    public static function find(int $id)
    {
        $db = Database::connect();
        $stmt = $db->prepare(
            "SELECT * FROM " . static::$table . " WHERE". static::$primaryKey . "=:id"
        );
        $stmt->execute(["id" => $id]);

        return $stmt->fetch(PDO::FETCH_ASSOC);
    }

}
