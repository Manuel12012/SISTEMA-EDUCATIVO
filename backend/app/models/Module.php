<?php

require_once __DIR__ . '/../core/Model.php';

class Module extends Model {
    protected static string $table = 'modules';

    public static function getByCourse(int $courseId) {
        $db = Database::connect();
        $stmt = $db->prepare(
            "SELECT * FROM modules WHERE course_id = :id"
        );
        $stmt->execute(['id' => $courseId]);
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }

    public static function find(int $moduleId)
    {
                $db = Database::connect();
        $stmt = $db->prepare(
            "SELECT * FROM modules WHERE id = :id"
        );
        $stmt->execute(["id"=> $moduleId]);
        return $stmt->fetch(PDO::FETCH_ASSOC);
    }
}
