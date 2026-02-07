<?php

require_once __DIR__ . '/../models/Lesson.php';
require_once __DIR__ . '/../models/Module.php';

class LessonController
{

    public static function byModule(int $moduleId)
    {
    if (!is_numeric($moduleId)) {
        Response::json([
            "error" => "ID de módulo inválido"
        ], 400);
        exit;
    }

    $module = Module::find($moduleId);

    if (!$module) {
        Response::json([
            "error" => "Módulo no encontrado"
        ], 404);
        exit;
    }

    $lessons = Lesson::getByModule($moduleId);

    Response::json($lessons);

    }

    public static function index()
    {
        $lesson = Lesson::all();

        if (empty($lesson)) {
            Response::json(
                [
                    "error" => "No se encontro la leccion"
                ]
            );
        }
        Response::json($lesson);
    }

    public static function show($lessonId)
    {
        if (!is_numeric($lessonId)) {
            Response::json(
                [
                    "error" => "Id de la leccion no encontrada"
                ]
            );
        }

        $lesson = Lesson::find($lessonId);

        if (!$lesson) {
            Response::json([
                "error" => "Leccion no encontrada"
            ]);
        }

        $module = Module::getByLesson($lessonId);

        if (!$module) {
            Response::json([
                "error" => "Modulo no encontrado"
            ]);
        }
        Response::json([
            "lesson" => $lesson,
            "module" => $module
        ]);
    }

    public static function store($data) {
        if (
            empty($data["module_id"]) ||
            empty($data["titulo"]) ||
            empty($data["tipo"])||
            empty($data["contenido"]) ||
            empty($data["orden"]) 
        ) {
            Response::json([
                "error" => "Datos incompletos"
            ],400);
            exit;
        }

        $lesson = Lesson::create($data);

        if(!$lesson){
            Response::json([
                "error" => "No se pudo crear la leccion"
            ]);
        }

                Response::json([
            "message" => "Leccion creada",
            "id" => $lesson
        ], 201);
    }
    public static function update($lessonId, $data) {
                if (!is_numeric($lessonId)) {
            Response::json(
                [
                    "error" => "ID invalido"
                ],
                400
            );
        }

        $lesson = Lesson::find($lessonId);


        if (!$lesson) {
            Response::json([
                "error" => "Leccion no encontrada"
            ], 404);
        }

        $updated = Lesson::update($lessonId, $data);

                if (!$updated) {
            Response::json([
                "error" => "No se pudo actualizar"
            ], 500);
        }
        Response::json([
            "message" => "Leccion actualizada"
        ]);

    }

    public static function destroy($lessonId) {
        if (!is_numeric($lessonId)) {
            Response::json(
                [
                    "error" => "ID invalido"
                ],
                400
            );
        }

        $lesson = Lesson::find($lessonId);

                if (!$lesson) {
            Response::json([
                "error" => "No se pudo encontrar la leccion"
            ], 404);
        }
        Lesson::delete($lessonId);

        Response::json([
            "message" => "Leccion eliminada"
        ]);
    }

    

}
