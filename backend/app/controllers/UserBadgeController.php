<?php

require_once __DIR__ . '/../models/UserBadge.php';
require_once __DIR__ . '/../models/Module.php';

class UserBadgeController
{

   public static function indexByUser($userId)
    {
        if (!is_numeric($userId)) {
            Response::json([
                "error" => "Id de usuario inválido"
            ]);
            return;
        }

        $badges = UserBadge::getBadgesByUser((int)$userId);

        Response::json([
            "user_id" => $userId,
            "badges" => $badges
        ]);
    }


public static function store($userId, $badgeId)
    {
        if (!is_numeric($userId) || !is_numeric($badgeId)) {
            Response::json([
                "error" => "Datos inválidos"
            ]);
            return;
        }

        $assigned = UserBadge::assign((int)$userId, (int)$badgeId);

        if (!$assigned) {
            Response::json([
                "error" => "El usuario ya tiene este badge"
            ]);
            return;
        }

        Response::json([
            "message" => "Badge asignado correctamente"
        ]);
    }  
    public static function destroy($userId, $badgeId)
    {
        if (!is_numeric($userId) || !is_numeric($badgeId)) {
            Response::json([
                "error" => "Datos inválidos"
            ]);
            return;
        }

        $removed = UserBadge::removeBadge((int)$userId, (int)$badgeId);

        if (!$removed) {
            Response::json([
                "error" => "No se pudo eliminar el badge"
            ]);
            return;
        }

        Response::json([
            "message" => "Badge eliminado correctamente"
        ]);
    }  
    }
