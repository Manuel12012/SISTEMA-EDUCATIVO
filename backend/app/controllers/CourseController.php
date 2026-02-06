<?php

require_once __DIR__ . '/../models/Course.php';
require_once __DIR__ . '/../models/Module.php';
require_once __DIR__ . '/../core/Response.php';

class CourseController
{

    public static function index()
    {
        $courses = Course::all();

        // validacion si existe el curso o no
        if (empty($courses)) {
            Response::json(["error" => "No Courses found"], 404);
        }
        // devolvemos un json pasandole la variable courses
        Response::json($courses);
    }

    public static function show($id)
    {
        // validamos con la funcion is numeric si es un valor numero
        if (!is_numeric($id)) {
            // devolvemos un json que es llamado desde Response.php con el metodo json
            Response::json([
                "error" => "ID de curso invalido"
            ], 400);
        }
        // en la variable course usamos find y le pasamos el id como parametro
        $course = Course::find((int) $id);
        // si curso no existe entonces imprimira curso no encontrado
        if (!$course) {
            Response::json(
                [
                    "error" => "Curso no encontrado"
                ],
                404
            );
        }

        Response::json($course);
    }

    public static function store($data){
        if (
            empty($data["titulo"]) ||
            empty($data["descripcion"]) ||
            empty($data["grado"])||
            empty($data["created_at"])
        ) {
            Response::json([
                "error" => "Datos incompletos"
            ],400);
            exit;
        }

        $course = Course::create($data);

        if(!$course){
            Response::json([
                "error" => "No se pudo crear el curso"
            ],500);
        }

        Response::json([
            "message" => "Curso creado",
            "id" => $course
        ], 201);
    }

    public static function update($courseId, $data){
        if(!is_numeric($courseId)){
                Response::json([
                    "error" => "ID invalido"
                ], 400);
        }

        $updated = Course::update($courseId, $data);

        if(!$updated){
            Response::json([
                "error" => "No se pudo actualizar"
            ],500);
        }

        Response::json([
            "message" => "Curso actualizado"
        ]);
    }

    public static function destroy($courseId){
        if (!is_numeric($courseId)) {
            Response::json(
                [
                    "error" => "ID invalido"
                ],
                400
            );
        }

        $course = Course::delete($courseId);

        if(!$course){
            Response::json([
                "error" => "No se pudo encontrar el curso"
            ],404);
        }

        Course::delete($courseId);

        Response::json([
            "message"=> "Curso eliminado"
        ]);
    }

    public static function modules($courseId)
    { // usamos esta funcion para traernos modulos mediante el id del curso
        if (!is_numeric($courseId)) {
            Response::json(
                [
                    "error" => "ID de curso invalido"
                ],
                400
            );
        }
        $course = Course::find((int) $courseId);

        // si no existe course entonces mostramos curso no encontrado
        if (!$course) {
            Response::json([
                "error" => "Curso no encontrado"
            ], 404);
        }
        // usamos getByCourse del modelo Module y le pasamos courseId y lo almacenamos en $modules
        $modules = Module::getByCourse((int)$courseId);

        Response::json($modules);
    }
}
