<?php
require_once __DIR__ . '/../models/ExamResult.php';
require_once __DIR__ . '/../core/Response.php';
require_once __DIR__ . '/../models/User.php';
require_once __DIR__ . '/../models/Exam.php';
class ExamResultController
{

    public static function index()
    {
        $examResult = ExamResult::all();


        if (empty($examResult)) {
            Response::json([
                "error" => "No se encontro el resultado"
            ], 404);
            exit;
        }
        Response::json($examResult);
    }

    public static function show($examResultId)
    {
        if (!is_numeric($examResultId)) {
            Response::json([
                "error" => "Id del resultado invalido"
            ], 400);
        }

        $examResult = ExamResult::find($examResultId);

        if (!$examResult) {
            Response::json([
                "error" => "Resultado no encontrado"
            ], 404);
            exit;
        }

        Response::json([
            "examResult" => $examResult
        ]);
    }


    public static function update($examResultId, $data)
    {
        if (!is_numeric($examResultId)) {
            Response::json(
                [
                    "error" => "ID invalido"
                ],
                400
            );
            exit;
        }

        $examResult = ExamResult::find($examResultId);


        if (!$examResult) {
            Response::json([
                "error" => "Resultado del examen no encontrada"
            ], 404);
            exit;
        }

        $updated = ExamResult::update($examResultId, $data);

        if (!$updated) {
            Response::json([
                "error" => "No se pudo actualizar"
            ], 500);
            exit;
        }

        Response::json([
            "message" => "Resultado actualizado"
        ]);
    }

    public static function destroy($examResultId)
    {

        if (!is_numeric(value: $examResultId)) {
            Response::json(
                [
                    "error" => "ID invalido"
                ],
                400
            );
            exit;
        }

        $examResult = ExamResult::find($examResultId);

        if (!$examResult) {
            Response::json([
                "error" => "No se pudo encontrar el resultado"
            ], 404);
            exit;
        }

        ExamResult::delete($examResultId);

        Response::json([
            "message" => "Resultado eliminado"
        ]);
    }

    public static function getByUserAndExam($userId, $examId)
    {
        // primero validamos si es valido
        if (!is_numeric($userId)) {
            Response::json([
                "error" => "Id del usuario invalido"
            ], 400);
            exit;
        }

        // accedemos al recurso 
        $user = User::find($userId);

        // verificamos si existe
        if (!$user) {
            Response::json([
                "error" => "Usuario no encontrado"
            ], 404);
            exit;
        }

        if (!is_numeric($examId)) {
            Response::json([
                "error" => "Id del examen invalido"
            ], 400);
            exit;
        }
        $exam = Exam::find($examId);

        if (!$exam) {
            Response::json([
                "error" => "Examen no encontrado"
            ], 404);
            exit;
        }

        $examResult = ExamResult::getByUserAndExam($userId, $examId);

        if (!$examResult) {
            Response::json([
                "error" => "No se pudo encontrar el resultado"
            ], 404);
            exit;
        }

        Response::json([
            "user" => $user,
            "exam" => $exam,
            "examResult" => $examResult
        ]);
    }
}
