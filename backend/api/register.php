<?php

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

require_once("../config/database.php");

$data = json_decode(file_get_contents("php://input"), true);

$nome = $data["nome"];
$email = $data["email"];
$senha = password_hash($data["senha"], PASSWORD_DEFAULT);

try {

    $sql = "INSERT INTO usuarios(
        nome,
        email,
        senha
    ) VALUES (
        :nome,
        :email,
        :senha
    )";

    $stmt = $pdo->prepare($sql);

    $stmt->bindParam(":nome", $nome);
    $stmt->bindParam(":email", $email);
    $stmt->bindParam(":senha", $senha);

    $stmt->execute();

    echo json_encode([
        "success" => true
    ]);

} catch(PDOException $e) {

    echo json_encode([
        "success" => false,
        "erro" => $e->getMessage()
    ]);
}