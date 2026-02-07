<?php
require_once __DIR__ . '/../models/Question.php';
require_once __DIR__ . '/../models/ExamOption.php';
require_once __DIR__ . '/../core/Response.php';

class UserController
{
    public static function resultsByUser($userId)
    { // obtener resultados del examen a partir del usuario
        if (!is_numeric($userId)) {
            Response::json(
                [
                    "error" => "ID no encontrado"
                ]
            );
            return;
        }

        $result = ExamResult::getByUser($userId);

        if(!$result){
            Response::json(
                [
                    "error" => "No se pudo obtener el resultado del examen"
                ]
            );

            exit;
        }

        Response::json($result);
    }

    public static function index()
    {
        $user = User::all();

        if (empty($user)) {
            Response::json(
                [
                    "error" => "No se encontro el usuario"
                ]
            );
            exit;
        }
        Response::json($user);
    }

    public static function show($userId)
    {
        if (!is_numeric($userId)) {
            Response::json(
                [
                    "error" => "Id del usuario no encontrado"
                ]
            );

            exit;
        }

        $user = User::find($userId);

        if (!$user) {
            Response::json([
                "error" => "Usuario no encontrado"
            ]);

            exit;
        }

        Response::json([
            "user" => $user
        ]);
    }

    public static function store($data)
    {
        if (
            empty($data["nombre"]) ||
            empty($data["email"]) ||
            empty($data["password"]) ||
            empty($data["rol"]) ||
            empty($data["nivel"]) ||
            empty($data["puntos"]) ||
            empty($data["avatar_url"]) ||
            empty($data["created_at"])
        ) {
            Response::json([
                "error" => "Datos incompletos"
            ], 400);
            exit;
        }

        $user = User::create($data);

        if (!$user) {
            Response::json([
                "error" => "No se pudo crear el usuario"
            ]);
            exit;
        }

        Response::json([
            "message" => "Usuario creado",
            "id" => $user
        ], 201);
    }

    public static function update($userId, $data)
    {
        if (!is_numeric($userId)) {
            Response::json(
                [
                    "error" => "ID invalido"
                ],
                400
            );
            exit;
        }

        $user = User::find($userId);


        if (!$user) {
            Response::json([
                "error" => "Usuario no encontrado"
            ], 404);
            exit;
        }

        $updated = User::update($userId, $data);

        if (!$updated) {
            Response::json([
                "error" => "No se pudo actualizar"
            ], 500);
            exit;
        }
        Response::json([
            "message" => "Usuario actualizado"
        ]);
    }

    public static function destroy($userId)
    {
        if (!is_numeric($userId)) {
            Response::json(
                [
                    "error" => "ID invalido"
                ],
                400
            );
            return;
        }

        $user = User::find($userId);

        if (!$user) {
            Response::json([
                "error" => "No se pudo encontrar el usuario"
            ], 404);
            exit;
        }
        User::delete($userId);

        Response::json([
            "message" => "Usuario eliminado"
        ]);
    }
}
