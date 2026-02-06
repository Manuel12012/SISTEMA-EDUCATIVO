<?php
require_once __DIR__ . '/../models/Question.php';
require_once __DIR__ . '/../models/ExamOption.php';
require_once __DIR__ . '/../core/Response.php';

class UserController
{
    public static function getResultByUser($userId)
{// obtener resultados del examen a partir del usuario
    ExamResult::getByUser($userId);

}}