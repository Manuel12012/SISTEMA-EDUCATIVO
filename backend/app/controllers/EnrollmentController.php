<?php

require_once __DIR__ . '/../models/CourseEnrollment.php';
require_once __DIR__ . '/../models/Course.php';
require_once __DIR__ . '/../core/Response.php';

class EnrollmentController
{
    public static function enroll($data)
    {
        if (
            empty($data["user_id"]) ||
            empty($data["course_id"])
        ) {
            Response::json([
                "error" => "Datos incompletos"
            ], 400);
            return;
        }

        if (
            !is_numeric($data["user_id"]) ||
            !is_numeric($data["course_id"])
        ) {
            Response::json([
                "error" => "IDs invalidos"
            ], 400);
            return;
        }

        $course = Course::find((int)$data["course_id"]);

        if (!$course) {
            Response::json([
                "error" => "Curso no encontrado"
            ], 404);
            return;
        }

        $enrolled = CourseEnrollment::enroll(
            (int)$data["user_id"],
            (int)$data["course_id"]
        );

        if (!$enrolled) {
            Response::json([
                "error" => "El usuario ya esta inscrito"
            ], 409);
            return;
        }

        Response::json([
            "message" => "Inscripcion exitosa"
        ], 201);
    }

    public static function myCourses($userId)
    {
        if (!is_numeric($userId)) {
            Response::json([
                "error" => "ID invalido"
            ], 400);
            return;
        }

        $courses = CourseEnrollment::getUserCourses((int)$userId);

        Response::json($courses);
    }
}
