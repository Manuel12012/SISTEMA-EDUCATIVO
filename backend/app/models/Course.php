<?php

require_once __DIR__ . '/../core/Model.php';

class Course extends Model
{
    protected static string $table = 'courses';

    public static function all()
    {
        $db = Database::connect();
        $stmt = $db->prepare(
            "SELECT * FROM courses"
        );
        $stmt->execute();
        return $stmt->fetch(PDO::FETCH_ASSOC);
    }

    public static function find(int $courseId)
    {
        $db = Database::connect();
        $stmt = $db->prepare(
            "SELECT * FROM courses WHERE id = :id"
        );
        $stmt->execute(["id"=> $courseId]);
        return $stmt->fetchAll(PDO::FETCH_ASSOC);

    }
}
