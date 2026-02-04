<?php

require_once __DIR__ . "/../core/Model.php";

class Lesson extends Model
{
    protected static string $table = 'lessons';

    public static function getByModule(int $moduleId)
    {
        $db = Database::connect();
        $stmt = $db->prepare(
            "SELECT * FROM lessons WHERE module_id = :id ORDER BY orden"
        );
        $stmt->execute(['id' => $moduleId]);
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }

    public static function find(int $lessonId)
    {
        $db = Database::connect();
        $stmt = $db->prepare(
            "SELECT * FROM lessons WHERE id = :id"
        );
        $stmt->execute(['id' => $lessonId]);
        return $stmt->fetch(PDO::FETCH_ASSOC);
    }
}
