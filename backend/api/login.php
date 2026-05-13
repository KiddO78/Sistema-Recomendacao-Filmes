<?php

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

require_once("../config/database.php");

$data = json_decode(file_get_contents("php://input"), true);

$email = $data["email"];
$senha = $data["senha"];

try {

    $sql = "SELECT * FROM usuarios
            WHERE email = :email";

    $stmt = $pdo->prepare($sql);

    $stmt->bindParam(":email", $email);

    $stmt->execute();

    $usuario = $stmt->fetch(PDO::FETCH_ASSOC);

    if(
        $usuario &&
        password_verify(
            $senha,
            $usuario["senha"]
        )
    ) {

        unset($usuario["senha"]);

        echo json_encode([
            "success" => true,
            "usuario" => $usuario
        ]);

    } else {

        echo json_encode([
            "success" => false,
            "mensagem" =>
                "Email ou senha inválidos"
        ]);

    }

} catch(PDOException $e) {

    echo json_encode([
        "success" => false,
        "erro" => $e->getMessage()
    ]);

}