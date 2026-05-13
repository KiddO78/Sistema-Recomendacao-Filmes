<?php

$host = "localhost";
$dbname = "movie_db";
$user = "root";
$pass = "Acaciosantos7";

try {

    $pdo = new PDO(
        "mysql:host=$host;dbname=$dbname",
        $user,
        $pass
    );

    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

} catch(PDOException $e) {

    die("Erro: " . $e->getMessage());
}