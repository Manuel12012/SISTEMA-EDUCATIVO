<?php

require_once __DIR__ . '/../models/Module.php';

class ModuleController
{

    public static function byCourse(int $courseId)
    {
        if (!is_numeric($courseId)) {
            Response::json([
                "error" => "ID de módulo inválido"
            ], 400);
            exit;
        }

        $courses = Course::find($courseId);

        if (!$courses) {
            Response::json([
                "error" => "Curso no encontrado"
            ], 404);
            exit;
        }

        $modules = Module::getByCourse($courseId);

        Response::json($modules);
    }

    public static function index()
    {
        $module = Module::all();

        if (empty($module)) {
            Response::json([
                "error" => "No se encontro el modulo"
            ]);
        }

        Response::json([$module]);
    }

    public static function show($moduleId)
    {
        if (!is_numeric(value: $moduleId)) {
            Response::json(
                [
                    "error" => "Id de la leccion no encontrada"
                ]
            );
        }

        $module = Module::find($moduleId);

        if ($module) {
            Response::json([
                "error" => "Modulo no encontrado"
            ]);
        }

        Response::json([
            "module" => $module
        ]);
    }

    public static function store($data)
    {
        if (
            empty($data["course_id"]) ||
            empty($data["titulo"]) ||
            empty($data["orden"])
        ) {
            Response::json([
                "error" => "Datos incompletos"
            ], 400);
            exit;
        }

        $module = Module::create($data);

        if (!$module) {
            Response::json([
                "error" => "No se puedo crear el modulo"
            ]);
        }

        Response::json([
            "message" => "Modulo creado",
            "id" => $module
        ], 201);
    }

    public static function update($moduleId, $data)
    {
        if (!is_numeric($moduleId)) {
            Response::json(
                [
                    "error" => "ID invalido"
                ],
                400
            );
        }

        $module = Module::find($moduleId);


        if (!$module) {
            Response::json([
                "error" => "Module no encontrado"
            ], 404);
        }

        $updated = Module::update($module, $data);

        if (!$updated) {
            Response::json([
                "error" => "No se pudo actualizar"
            ], 500);
        }
        Response::json([
            "message" => "Modulo actualizado"
        ]);
    }

    public static function destroy($moduleId)
    {
        if (!is_numeric($moduleId)) {
            Response::json(
                [
                    "error" => "ID invalido"
                ],
                400
            );
        }

        $module = Module::find($moduleId);

        if (!$module) {
            Response::json([
                "error" => "No se pudo encontrar el modulo"
            ], 404);
        }
        Module::delete($moduleId);

        Response::json([
            "message" => "Modulo eliminado"
        ]);
    }
}
