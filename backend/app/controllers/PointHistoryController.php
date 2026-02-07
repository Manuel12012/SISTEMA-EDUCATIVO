<?php

require_once __DIR__ . '/../models/Lesson.php';
require_once __DIR__ . '/../models/User.php';


class PointHistoryController
{public static function byUser($userId)
{
    // Validar ID
    if (!is_numeric($userId)) {
        Response::json([
            "error" => "ID de usuario inválido"
        ], 400);
        exit;
    }

    // Verificar que el usuario exista
    $user = User::find($userId);

    if (!$user) {
        Response::json([
            "error" => "Usuario no encontrado"
        ], 404);
        exit;
    }

    // Obtener historial de puntos del usuario
    $histories = PointsHistory::getByUser($userId);

    Response::json([
        "user_id" => $userId,
        "point_histories" => $histories
    ]);
}


    public static function index()
    {
        $PointHistory = PointsHistory::all();

        if (empty($lesson)) {
            Response::json(
                [
                    "error" => "No se encontro el historial de puntos"
                ]
            );
        }
        Response::json([$PointHistory]);
    }

    public static function show($pointHistoryId)
    {
        if (!is_numeric($pointHistoryId)) {
            Response::json(
                [
                    "error" => "Id del historial de puntos no encontrada"
                ]
            );
        }

        $pointHistory = User::findByPointHistory($pointHistoryId);

        if (!$pointHistory) {
            Response::json([
                "error" => "Historial de puntos no encontrada"
            ]);
        }

        Response::json([
            "pointHistory" => $pointHistory
        ]);
    }

    public static function update($pointHistoryId, $data)
    {
        if (!is_numeric($pointHistoryId)) {
            Response::json(
                [
                    "error" => "ID invalido"
                ],
                400
            );
        }

        $pointHistory = PointsHistory::find($pointHistoryId);

        if (!$pointHistory) {
            Response::json([
                "error" => "Historial no encontrado"
            ], 404);
        }

        $updated = PointsHistory::update($pointHistoryId, $data);

        if (!$updated) {
            Response::json([
                "error" => "No se pudo actualizar"
            ], 500);
        }
        Response::json([
            "message" => "Historial de puntos actualizado"
        ]);
    }

    public static function destroy($pointHistoryId)
    {
        if (!is_numeric($pointHistoryId)) {
            Response::json(
                [
                    "error" => "ID invalido"
                ],
                400
            );
        }

        $pointHistory = Lesson::find($pointHistoryId);

        if (!$pointHistory) {
            Response::json([
                "error" => "No se pudo encontrar el historial"
            ], 404);
        }
        PointsHistory::delete($pointHistoryId);

        Response::json([
            "message" => "Historial eliminado"
        ]);
    }
}
