<?php

class Database{
    public static function connect(){
        $host = "localhost";
        $db = "plataforma-educativa";
        $user = "root";
        $pass = "SouthPark_12012";

        return new PDO(
            "mysql:host=$host;dbname=$db;charset=utf8",
            $user,
            $pass,
            [
                PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION
            ]
        );
    }
}