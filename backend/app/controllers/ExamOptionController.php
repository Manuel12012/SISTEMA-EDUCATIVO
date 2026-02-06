<?php
require_once __DIR__ . '/../models/ExamOption.php';
require_once __DIR__ . '/../core/Response.php';

class ExamOptionController
{
    public static function index()
    {
        $examOption = ExamOption::all();

        if (empty($examOption)) {
            Response::json([
                "error" => "No se encontro la opcion de la pregunta"
            ], 404);
        }
        Response::json($examOption);
    }

    public static function show($examOptionId)
    {
        if (!is_numeric($examOptionId)) {
            Response::json([
                "error" => "Id de la opcion del examen invalido"
            ], 400);
        }

        $examOption = ExamOption::find($examOptionId);

        if (!$examOption) {
            Response::json([
                "error" => "Opcion de examen no encontrada"
            ], 404);
        }
        Response::json([
            "examOption" => $examOption
        ]);
    }

    public static function store($data){
        if(
            empty($data["question_id"]) ||
            empty($data["opcion"]) 
        ){
                        Response::json([
                "error" => "Datos incompletos"
            ],400);
            exit;
        }

        $examOption = ExamOption::create($data);

        if(!$examOption){
                    Response::json([
                "error" => "No se pudo crear la opcion de la pregunta"
            ], 500);
        }

                Response::json([
            "message" => "Opcion creada",
            "id" => $examOption
        ], 201);
    }

    public static function update($examOptionId, $data){
                if (!is_numeric(value: $examOptionId)) {
            Response::json(
                [
                    "error" => "ID invalido"
                ],
                400
            );
        }

        $examOption = ExamOption::find($examOptionId);

                if (!$examOption) {
            Response::json([
                "error" => "Opcion no encontrada"
            ], 404);
        }

        $updated = ExamOption::update($examOptionId, $data);

        if(!$updated){
                        Response::json([
                "error" => "No se pudo actualizar"
            ], 500);
        }

                Response::json([
            "message" => "Opcion actualizada"
        ]);
    }

    public static function destroy($examOptionId){
                if (!is_numeric($examOptionId)) {
            Response::json(
                [
                    "error" => "ID invalido"
                ],
                400
            );
        }

        $ExamOption = ExamOption::find($examOptionId);

                if (!$ExamOption) {
            Response::json([
                "error" => "No se pudo encontrar la opcion"
            ], 404);
        }

        ExamOption::delete($examOptionId);

        Response::json([
            "message" => "Opcion eliminada"
        ]);
    }
}
