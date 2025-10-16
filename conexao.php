<?php
$host = "localhost";       // ou o IP do servidor MySQL
$usuario = "root";         // seu usuário do MySQL
$senha = "";               // sua senha do MySQL
$banco = "okfit";          // nome do banco de dados

$mysql = new mysqli($host, $usuario, $senha, $banco);

// Verifica se houve erro na conexão
if ($mysql->connect_error) {
    die("Erro de conexão: " . $mysql->connect_error);
}
?>
