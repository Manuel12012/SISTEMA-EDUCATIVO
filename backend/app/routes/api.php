<?php

// QUESTIONS
Router::get('questions', [QuestionController::class, 'index']);
Router::get('questions/{id}', [QuestionController::class, 'show']);
Router::post('questions', [QuestionController::class, 'store']);
Router::put('questions/{id}', [QuestionController::class, 'update']);
Router::delete('questions/{id}', [QuestionController::class, 'destroy']);

// EXAMS
Router::get('exams', [ExamController::class, 'index']);
Router::get('exams/{id}', [ExamController::class, 'show']);

// COURSES
Router::get('courses/{id}', [CourseController::class, 'modules']);
Router::get('courses/{id}', [CourseController::class, 'show']);


