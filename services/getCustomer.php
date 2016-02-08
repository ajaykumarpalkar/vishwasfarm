<?php
//$email = "8286582889";
//$pass = "";

//$postdata = file_get_contents("php://input");
//$request = json_decode($postdata);
$email = $_GET['username'];
$pass = $_GET['pass'];

require_once './connect_pdo.php';
$stats = new DB;
$data_item = $stats->getCustomer($stats->conn, $email, $pass);
header('Content-Type: application/json');
echo json_encode($data_item);
$stats->connclose();
