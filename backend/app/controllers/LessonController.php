<?php

require_once __DIR__ . '/../models/Lesson.php';

class LessonController {

    public static function byModule(int $moduleId) {
        $lessons = Lesson::getByModule($moduleId);
        echo json_encode($lessons);
    }
}
