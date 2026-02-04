<?php

require_once __DIR__ . '/../core/Model.php';

class Badge extends Model
{
    protected static string $table = 'badges';

    public static function getUserBadges(int $userId)
    {
        $db = Database::connect();
        $stmt = $db->prepare(
            "SELECT b.* FROM badges b
                JOIN user_badges ub ON b.id = ub.badge_id
                WHERE ub.user_id = :id"
        );
        $stmt->execute(['id' => $userId]);
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }
}
