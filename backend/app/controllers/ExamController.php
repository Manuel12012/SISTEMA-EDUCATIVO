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
        }
        Response::json($exams);
    }

    public static function show($examId)
    {
        if (!is_numeric($examId)) {
            Response::json(data: [
                "error" => "ID de examen invalido"
            ], status: 404);
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
        }

        $exam = Exam::find($examId);

        if (!$exam) {
            Response::json([
                "error" => "Examen no encontrado"
            ], 404);
        }

        $updated = Exam::update($examId, $data);

        if (!$updated) {
            Response::json([
                "error" => "No se pudo actualizar el examen"
            ], 404);
        }

        Response::json([
            "message" => "Examen actualizado"
        ]);
    }

    public static function destroy($examId){
        if (!is_numeric($examId)) {
            Response::json(
                [
                    "error" => "ID invalido"
                ],
                400
            );
        }

        $exam= Exam::find($examId);

        if(!$exam){
            Response::json([
                "error" => "No se pudo encontrar el examen"
            ],404);
        }

        Exam::delete($examId);

        Response::json([
            "message" => "Examen eliminado"
        ]);
    }

    public static function results($examId){
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

}
