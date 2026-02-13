<?php

require_once __DIR__ . '/../models/Exam.php';
require_once __DIR__ . '/../models/Question.php';
require_once __DIR__ . '/../models/ExamOption.php';
require_once __DIR__ . '/../core/Response.php';
require_once __DIR__ . '/../models/ExamResult.php';


class ExamController
{

    public static function index()
    {
        $exams = Exam::all();

        if (empty($exams)) {
            Response::json([
                "error" => "No se encontro el examen"
            ], 404);
            return;
        }
        Response::json($exams);
    }

    public static function show($examId)
    {
        if (!is_numeric($examId)) {
            Response::json([
                "error" => "ID de examen invalido"
            ], status: 404);
            return;
        }
        // traemos un examen mediante su id
        $exam = Exam::find((int)$examId);

        if (!$exam) {
            Response::json(
                [
                    "error" => "Examen no encontrado"
                ],
                404
            );
            return;
        }
        //traemos las preguntas por el id del examen
        $questions = Question::getByExam($examId);

        // iteramos, por cada pregunta las opciones seran iguales a traernos las opciones
        // por el id de la pregunta y le pasamos el id de la pregunta(question)
        foreach ($questions as &$q) {
            $q['options'] = ExamOption::getByQuestion($q['id']);
        }

        // mandamos un json con los valores del examen y questions
        Response::json([
            'exam' => $exam,
            'questions' => $questions
        ]);
    }

    public static function store($data)
    {
        if (
            empty($data["course_id"]) ||
            empty($data["titulo"]) ||
            empty($data["duracion_minutos"])
        ) {
            Response::json([
                "error" => "Datos incompletos"
            ], 400);
            exit;
        }

        $exam = Exam::create($data);

        if (!$exam) {
            Response::json([
                "error" => "No se pudo crear el examen"
            ], 500);
            return;
        }

        Response::json([
            "message" => "Examen creado",
            "id" => $exam
        ], 201);
    }

    public static function update($examId, $data)
    {
        if (!is_numeric($examId)) {
            Response::json(
                [
                    "error" => "ID invalido"
                ],
                400
            );
            return;
        }

        $exam = Exam::find($examId);

        if (!$exam) {
            Response::json([
                "error" => "Examen no encontrado"
            ], 404);
            return;
        }

        $updated = Exam::update($examId, $data);

        if (!$updated) {
            Response::json([
                "error" => "No se pudo actualizar el examen"
            ], 404);
            return;
        }

        Response::json([
            "message" => "Examen actualizado"
        ]);
    }

    public static function destroy($examId)
    {
        if (!is_numeric($examId)) {
            Response::json(
                [
                    "error" => "ID invalido"
                ],
                400
            );
            return;
        }

        $exam = Exam::find($examId);

        if (!$exam) {
            Response::json([
                "error" => "No se pudo encontrar el examen"
            ], 404);
            return;
        }

        Exam::delete($examId);

        Response::json([
            "message" => "Examen eliminado"
        ]);
    }

    public static function results($examId)
    {
        if (!is_numeric($examId)) {
            Response::json(
                [
                    "error" => "ID invalido"
                ],
                400
            );
            exit;
        }

        $examResult = ExamResult::getByExam($examId);
        Response::json([
            "examResult" => $examResult
        ]);
    }

    public static function submit($examId, $data)
    {
        if (!is_numeric($examId)) {
            Response::json([
                "error" => "ID invalido"
            ], 400);
            return;
        }

        if (!isset($_SESSION['user'])) {
            Response::json([
                "error" => "No autenticado"
            ], 401);
            return;
        }

        // si el $data viene vacio $answers del modelo o no es un array entonces retornamos respuestas invalidas
        if (empty($data["answers"]) || !is_array($data["answers"])) {
            Response::json([
                "error" => "Respuestas invalidas"
            ], 400);
            return;
        }

        // buscamos el examen por id
        $exam = Exam::find($examId);

        // si examen no existe
        if (!$exam) {
            Response::json([
                "error" => "Examen no encontrado"
            ], 404);
            return;
        }

        // user id sera igual al usuario que inicio sesion
        $userId = (int) $_SESSION['user']['id'];

        // llamamos al metodo CreateFromSubmission y le pasamos los 3 argumentos
        $result = ExamResult::createFromSubmission($examId,$userId,$data["answers"]);

        // respondemos con un json 
        Response::json([
            "message" => "Examen enviado correctamente",
            "result" => $result
        ], 201);
    }
}
