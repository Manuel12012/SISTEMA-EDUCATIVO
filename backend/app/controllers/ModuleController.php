<?php

require_once __DIR__ . '/../models/Module.php';

class ModuleController {

    public static function byCourse(int $courseId) {
        $modules = Module::getByCourse($courseId);
        echo json_encode($modules);
    }
}
