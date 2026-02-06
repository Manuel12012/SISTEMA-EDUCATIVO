<?php

require_once __DIR__ . '/../core/Model.php';

class Course extends Model
{
    protected static string $table = 'courses';

    public static function all()
    {
        $db = Database::connect();
        $stmt = $db->prepare(
            "SELECT * FROM courses"
        );
        $stmt->execute();
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }

    public static function find(int $courseId)
    {
        $db = Database::connect();
        $stmt = $db->prepare(
            "SELECT * FROM courses WHERE id = :id"
        );
        $stmt->execute(["id" => $courseId]);
        return $stmt->fetch(PDO::FETCH_ASSOC);
    }

    public static function create($data)
    { // $data contiene los datos de la pregunta a insertar
        $db = Database::connect();
        $stmt = $db->prepare(
            "INSERT INTO courses (titulo, descripcion, grado, created_at)
                    VALUES (:titulo, :descripcion, :grado, :created_at)"
        );
        $stmt->execute([
            "titulo" => $data["titulo"],
            "descripcion" => $data["descripcion"],
            "grado" => $data["grado"],
            "created_at" => $data["created_at"]
        ]);
        // retornamos con lastInsertId porque sera de manera auto_increment
        return (int) $db->lastInsertId();
    }

    public static function update($courseId, $data)
    { // creamos dos variables questionId y data
        $db = Database::connect();
        $stmt = $db->prepare(
            "UPDATE courses SET titulo = :titulo, descripcion = :descripcion,
                grado = :grado, created_at = :created_at
            WHERE id = :id"
        ); // retornamos igual un stmt y lo almacenamos en un array $data y tambien el $questionId
        return $stmt->execute([
            "titulo" => $data["titulo"],
            "descripcion" => $data["descripcion"],
            "grado" => $data["grado"],
            "id" => $courseId
        ]);
    }

    public static function delete($courseId)
    { // le pasamos como parametro questionId
        $db = Database::connect();
        $stmt = $db->prepare(
            "DELETE FROM courses WHERE id = :id"
        );
        // no devolveremos nada, ya que se borro la pregunta
        return $stmt->execute(["id" => $courseId]);
    }
}
