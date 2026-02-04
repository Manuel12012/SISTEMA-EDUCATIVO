<?php

require_once __DIR__ . '/../core/Model.php';

class ExamOption extends Model {
    protected static string $table = 'exam_options';

    public static function getByQuestion(int $questionId) {
        $db = Database::connect();
        $stmt = $db->prepare(
            "SELECT id, texto FROM exam_options WHERE question_id = :id"
        );
        $stmt->execute(['id' => $questionId]);
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }

    public static function isCorrect(int $optionId) {
        $db = Database::connect();
        $stmt = $db->prepare(
            "SELECT es_correcta FROM exam_options WHERE id = :id"
        );
        $stmt->execute(['id' => $optionId]);
        return (bool) $stmt->fetchColumn();
    }
}
