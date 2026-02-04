<?php

require_once __DIR__ . '/../core/Model.php';

class Question extends Model
{
    protected static string $table = 'questions';

    public static function getByExam(int $examId)
    {
        $db = Database::connect();
        $stmt = $db->prepare(
            "SELECT * FROM questions WHERE exam_id = :id"
        );
        $stmt->execute(['id' => $examId]);
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }

    public static function find(int $questionId): ?array
    {
        $db = Database::connect();
        $stmt = $db->prepare(
            "SELECT * FROM questions WHERE id = :id"
        );
        $stmt->execute(["id" => $questionId]);
        // al tratarse de un find solo se trae un resultado por eso se usar fetch
        return $stmt->fetch(PDO::FETCH_ASSOC);
    }

    public static function create($data)
    { // $data contiene los datos de la pregunta a insertar
        $db = Database::connect();
        $stmt = $db->prepare(
            "INSERT INTO questions (exam_id, pregunta, respuesta_correcta)
                    VALUES (:exam_id, :pregunta, :respuesta_correcta)"
        );
        $stmt->execute([
            "exam_id" => $data["exam_id"],
            "pregunta" => $data["pregunta"],
            "respuesta_correcta" => $data["respuesta_correcta"]
        ]);
        // retornamos con lastInsertId porque sera de manera auto_increment
        return (int) $db->lastInsertId();
    }

    public static function update($questionId, $data)
    { // creamos dos variables questionId y data
        $db = Database::connect();
        $stmt = $db->prepare(
            "UPDATE questions SET exam_id = :exam_id, pregunta = :pregunta,
                respuesta_correcta = :respuesta_correcta
            WHERE id = :id"
        ); // retornamos igual un stmt y lo almacenamos en un array $data y tambien el $questionId
        return $stmt->execute([
            "exam_id" => $data["exam_id"],
            "pregunta" => $data["pregunta"],
            "respuesta_correcta" => $data["respuesta_correcta"],
            "id" => $questionId
        ]);
    }

    public static function delete($questionId)
    { // le pasamos como parametro questionId
        $db = Database::connect();
        $stmt = $db->prepare(
            "DELETE FROM questions WHERE id = :id"
        );
        // no devolveremos nada, ya que se borro la pregunta
        return $stmt->execute(["id" => $questionId]);
    }
}
