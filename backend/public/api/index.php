<?php
define('BASE_PATH', dirname(__DIR__, 2)); 
// sube desde public/api → backend
header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE");
header("Access-Control-Allow-Headers: Content-Type");

// Core
require_once BASE_PATH . '/app/core/Router.php';
require_once BASE_PATH . '/app/core/Response.php';

// Controllers
require_once BASE_PATH . '/app/controllers/CourseController.php';
require_once BASE_PATH . '/app/controllers/ModuleController.php';
require_once BASE_PATH . '/app/controllers/LessonController.php';
require_once BASE_PATH . '/app/controllers/ExamController.php';
require_once BASE_PATH . '/app/controllers/QuestionController.php';

// Routes

require_once BASE_PATH . '/routes/api.php';

// Ejecutar router
Router::dispatch();
