<?php

require_once __DIR__ . '/../core/Model.php';

class PointsHistory extends Model {
    protected static string $table = 'points_history';

    public static function getByUser(int $userId) {
        $db = Database::connect();
        $stmt = $db->prepare(
            "SELECT * FROM points_history WHERE user_id = :id ORDER BY created_at DESC"
        );
        $stmt->execute(['id' => $userId]);
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }
}
