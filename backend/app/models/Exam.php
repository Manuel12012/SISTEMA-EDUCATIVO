<?php

require_once __DIR__ . '/../core/Model.php';

class Exam extends Model
{
    protected static string $table = 'exams';


    public static function getWithQuestions($examId)
    {
        $db = Database::connect();
        $stmt = $db->prepare(
            "SELECT e.*, q.id AS question_id, q.pregunta FROM exams e
             INNER JOIN questions q ON q.exam_id = e.id
             WHERE e.id = :id"
        );
        $stmt->execute(['id' => $examId]);
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }

        public static function find(int $examId)
    {
        $db = Database::connect();
        $stmt = $db->prepare(
            "SELECT * FROM exams WHERE id = :id"
        );
        $stmt->execute(["id"=> $examId]);
        return $stmt->fetch(PDO::FETCH_ASSOC);

    }
}
