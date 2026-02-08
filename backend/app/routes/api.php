<?php

// REQUIRES A CONTROLLER
require_once __DIR__ . '/../controllers/BadgeController.php';
require_once __DIR__ . '/../controllers/CourseController.php';
require_once __DIR__ . '/../controllers/ExamController.php';
require_once __DIR__ . '/../controllers/ExamOptionController.php';
require_once __DIR__ . '/../controllers/ExamResultController.php';
require_once __DIR__ . '/../controllers/LessonController.php';
require_once __DIR__ . '/../controllers/ModuleController.php';
require_once __DIR__ . '/../controllers/PointHistoryController.php';
require_once __DIR__ . '/../controllers/QuestionController.php';
require_once __DIR__ . '/../controllers/UserBadgeController.php';
require_once __DIR__ . '/../controllers/UserController.php';


// BADGES
Router::get('badges', [BadgeController::class, 'index']);
Router::get('badges/{id}', [BadgeController::class, 'show']);
Router::post('badges', [BadgeController::class, 'store']);

// COURSES
Router::get('courses', [CourseController::class, 'index']);
Router::get('courses/{id}', [CourseController::class, 'show']);
Router::post('courses', [CourseController::class, 'store']);
Router::put('courses/{id}', [CourseController::class, 'update']);
Router::delete('courses/{id}', [CourseController::class, 'destroy']);
Router::get('courses/{id}/modules', [CourseController::class, 'modules']);

// EXAMS
Router::get('exams', [ExamController::class, 'index']);
Router::get('exams/{id}', [ExamController::class, 'show']);
Router::post('exams', [ExamController::class, 'store']);
Router::put('exams/{id}', [ExamController::class, 'update']);
Router::delete('exams/{id}', [ExamController::class, 'destroy']);
Router::get('exams/{id}/results', [ExamController::class, 'results']);

// EXAM OPTIONS
Router::get('exam-options', [ExamOptionController::class, 'index']);
Router::get('exam-options/{id}', [ExamOptionController::class, 'show']);
Router::post('exam-options', [ExamOptionController::class, 'store']);
Router::put('exam-options/{id}', [ExamOptionController::class, 'update']);
Router::delete('exam-options/{id}', [ExamOptionController::class, 'destroy']);

// EXAM RESULTS
Router::get('exam-results', [ExamResultController::class, 'index']);
Router::get('exam-results/{id}', [ExamResultController::class, 'show']);
Router::post('exam-results', [ExamResultController::class, 'store']);
Router::put('exam-results/{id}', [ExamResultController::class, 'update']);
Router::delete('exam-results/{id}', [ExamResultController::class, 'destroy']);
Router::get('users/{userId}/exams/{examId}/result', [ExamResultController::class, 'getByUserAndExam']);

// LESSON
Router::get('lessons', [LessonController::class, 'index']);
Router::get('lessons/{id}', [LessonController::class, 'show']);
Router::post('lessons', [LessonController::class, 'store']);
Router::put('lessons/{id}', [LessonController::class, 'update']);
Router::delete('lessons/{id}', [LessonController::class, 'destroy']);
Router::get('modules/{moduleId}/lessons', [LessonController::class, 'byModule']);

// MODULES
Router::get('modules', [ModuleController::class, 'index']);
Router::get('modules/{id}', [ModuleController::class, 'show']);
Router::post('modules', [ModuleController::class, 'store']);
Router::put('modules/{id}', [ModuleController::class, 'update']);
Router::delete('modules/{id}', [ModuleController::class, 'destroy']);

// POINT HISTORY
Router::get('point-histories', [PointHistoryController::class, 'index']);
Router::get('point-histories/{id}', [PointHistoryController::class, 'show']);
Router::put('point-histories/{id}', [PointHistoryController::class, 'update']);
Router::delete('point-histories/{id}', [PointHistoryController::class, 'destroy']);
Router::get('users/{userId}/point-histories',[PointHistoryController::class, 'byUser']);

// QUESTIONS
Router::get('questions', [QuestionController::class, 'index']);
Router::get('questions/{id}', [QuestionController::class, 'show']);
Router::post('questions', [QuestionController::class, 'store']);
Router::put('questions/{id}', [QuestionController::class, 'update']);
Router::delete('questions/{id}', [QuestionController::class, 'destroy']);

// USER BADGE
Router::get('users/{userId}/user-badges', [UserBadgeController::class, 'indexByUser']);
Router::post('users/{userId}/badges/{badgeId}', [UserBadgeController::class, 'store']);
Router::delete('users/{userId}/badges/{badgeId}', [UserBadgeController::class, 'destroy']);

// USER
Router::get('users', [UserController::class, 'index']);
Router::get('users/{id}', [UserController::class, 'show']);
Router::post('users', [UserController::class, 'store']);
Router::put('users/{id}', [UserController::class, 'update']);
Router::delete('users/{id}', [UserController::class, 'destroy']);
Router::get('users/{userId}/results', [UserController::class, 'resultsByUser']);


