<?php

require_once __DIR__ . '/../core/Model.php';

class ExamResult extends Model
{
    protected static string $table = 'exam_results';

    public static function getByUser(int $userId)
    {
        $db = Database::connect();
        $stmt = $db->prepare(
            "SELECT * FROM exam_results WHERE user_id = :id"
        );
        $stmt->execute(['id' => $userId]);
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }

    public static function getByExam(int $examId)
    {
        $db = Database::connect();
        $stmt = $db->prepare(
            "SELECT * FROM exam_results WHERE exam_id = :id"
        );
        $stmt->execute(['id' => $examId]);
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }

    public static function getByUserAndExam($userId, $examId)
    {
        $db = Database::connect();
        $stmt = $db->prepare(
            "SELECT * FROM exam_results 
         WHERE user_id = :user 
         AND exam_id = :exam
         LIMIT 1"
        );
        $stmt->execute([
            'user' => $userId,
            'exam' => $examId
        ]);
        return $stmt->fetch(PDO::FETCH_ASSOC);
    }

    public static function find(int $examResultsId): ?array
    {
        $db = Database::connect();
        $stmt = $db->prepare(
            "SELECT * FROM exam_results WHERE id = :id"
        );
        $stmt->execute(['id' => $examResultsId]);
        return $stmt->fetch(PDO::FETCH_ASSOC) ?: null;
    }

    public static function create($data)
    { // $data contiene los datos de la pregunta a insertar
        $db = Database::connect();
        $stmt = $db->prepare(
            "INSERT INTO exam_results (puntaje, total_preguntas, correctas, duracion_usada,
            completado_en) VALUES (:puntaje, :total_preguntas, :correctas, :duracion_usada, :completado_en )"
        );
        $stmt->execute([
            "puntaje" => $data["puntaje"],
            "total_preguntas" => $data["total_preguntas"],
            "correctas" => $data["correctas"],
            "duracion_usada" => $data["duracion_usada"],
            "completado_en" => $data["completado_en"],
        ]);
        // retornamos con lastInsertId porque sera de manera auto_increment
        return (int) $db->lastInsertId();
    }


    public static function update($examResultsId, $data)
    { // creamos dos variables questionId y data
        $db = Database::connect();
        $stmt = $db->prepare(
            "UPDATE exam_results SET puntaje = :puntaje, total_preguntas = :total_preguntas,
                correctas = :correctas, duracion_usada = :duracion_usada, completado_en = :completado_en
            WHERE id = :id"
        ); // retornamos igual un stmt y lo almacenamos en un array $data y tambien el $questionId
        return $stmt->execute([
            "puntaje" => $data["puntaje"],
            "total_preguntas" => $data["total_preguntas"],
            "correctas" => $data["correctas"],
            "duracion_usada" => $data["duracion_usada"],
            "completado_en" => $data["completado_en"],
            "id" => $examResultsId
        ]);
    }


    public static function delete($examResultsId)
    { // le pasamos como parametro questionId
        $db = Database::connect();
        $stmt = $db->prepare(
            "DELETE FROM exam_results WHERE id = :id"
        );
        // no devolveremos nada, ya que se borro la pregunta
        return $stmt->execute(["id" => $examResultsId]);
    }
}
