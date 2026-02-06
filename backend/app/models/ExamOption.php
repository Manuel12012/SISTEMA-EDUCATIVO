<?php

require_once __DIR__ . '/../core/Model.php';

class ExamOption extends Model
{
    protected static string $table = 'exam_options';

    public static function getByQuestion(int $questionId)
    {
        $db = Database::connect();
        $stmt = $db->prepare(
            "SELECT id, opcion FROM exam_options WHERE question_id = :id"
        );
        $stmt->execute(['id' => $questionId]);
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }

    public static function find(int $examOptionId): ?array
    {
        $db = Database::connect();
        $stmt = $db->prepare(
            "SELECT * FROM exam_options WHERE id = :id"
        );
        $stmt->execute(["id" => $examOptionId]);
        // al tratarse de un find solo se trae un resultado por eso se usar fetch
        $result = $stmt->fetch(PDO::FETCH_ASSOC);
        return $result ?: null;
    }

    public static function create($data)
    { // $data contiene los datos de la pregunta a insertar
        $db = Database::connect();
        $stmt = $db->prepare(
            "INSERT INTO exam_options (question_id, opcion)
                    VALUES (:question_id, :opcion)"
        );
        $stmt->execute([
            "question_id" => $data["question_id"],
            "opcion" => $data["opcion"]
        ]);
        // retornamos con lastInsertId porque sera de manera auto_increment
        return (int) $db->lastInsertId();
    }

    public static function update($examOptionId, $data)
    { // creamos dos variables questionId y data
        $db = Database::connect();
        $stmt = $db->prepare(
            "UPDATE exam_options SET question_id = :question_id, opcion = :opcion
            WHERE id = :id"
        ); // retornamos igual un stmt y lo almacenamos en un array $data y tambien el $questionId
        return $stmt->execute([
            "question_id" => $data["question_id"],
            "opcion" => $data["opcion"],
            "id" => $examOptionId
        ]);
    }

    public static function delete($examOptionId)
    { // le pasamos como parametro questionId
        $db = Database::connect();
        $stmt = $db->prepare(
            "DELETE FROM exam_options WHERE id = :id"
        );
        // no devolveremos nada, ya que se borro la pregunta
        return $stmt->execute(["id" => $examOptionId]);
    }


    public static function isCorrect(int $optionId)
    {
        $db = Database::connect();
        $stmt = $db->prepare(
            "SELECT es_correcta FROM exam_options WHERE id = :id"
        );
        $stmt->execute(['id' => $optionId]);
        return (bool) $stmt->fetchColumn();
    }
}
