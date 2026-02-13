<?php

require_once __DIR__ . '/../core/Model.php';

class ExamAnswer extends Model
{
    protected static string $table = 'exam_answers';

    public static function create($data)
    {
        $db = Database::connect();

        $stmt = $db->prepare("
            INSERT INTO exam_answers
            (exam_result_id, question_id, selected_option_id, es_correcta)
            VALUES (:exam_result_id, :question_id, :selected_option_id, :es_correcta)
        ");

        $stmt->execute([
            "exam_result_id" => $data["exam_result_id"],
            "question_id" => $data["question_id"],
            "selected_option_id" => $data["selected_option_id"],
            "es_correcta" => $data["es_correcta"]
        ]);

        return (int) $db->lastInsertId();
    }
}
