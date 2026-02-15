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

    public static function find(int $examId): ?array
    {
        $db = Database::connect();
        $stmt = $db->prepare(
            "SELECT * FROM exams WHERE id = :id"
        );
        $stmt->execute(["id" => $examId]);
        $result = $stmt->fetch(PDO::FETCH_ASSOC);
        return $result ?: null;
    }

    public static function create($data)
    {
        $db = Database::connect();
        $stmt = $db->prepare(
            "INSERT INTO exams (course_id, titulo, duracion_minutos) VALUES
            (:course_id, :titulo, :duracion_minutos)"
        );
        $stmt->execute([
            "course_id" => $data["course_id"],
            "titulo" => $data["titulo"],
            "duracion_minutos" => $data["duracion_minutos"]
        ]);

        return (int) $db->lastInsertId();
    }

    public static function update($examId, $data)
    {
        $db = Database::connect();
    // creamos primero array vacio fields
        $fields = [];
        // array dpmde id es igual a examId
        $params = ["id" => $examId]; //5

        // recorremos data como clave valor
        foreach ($data as $key => $value) { // en el frontend primero se guarda el key y luego el valor
            // key que es titulo sera igual a titulo
            $fields[] = "$key = :$key";
            $params[$key] = $value; //
        }

        $sql = "UPDATE exams SET " . implode(", ", $fields) . " WHERE id = :id";

        $stmt = $db->prepare($sql);
        return $stmt->execute($params);
    }


    public static function delete($examId)
    {
        $db = Database::connect();
        $stmt = $db->prepare(
            "DELETE FROM exams WHERE id = :id"
        );
        // no devolveremos nada, ya que se borro la pregunta
        return $stmt->execute(["id" => $examId]);
    }
}
