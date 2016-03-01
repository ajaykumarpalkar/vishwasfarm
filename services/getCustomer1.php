<?php
//$email = "8286582889";
//$pass = "";

//$postdata = file_get_contents("php://input");
//$request = json_decode($postdata);
$email = $_GET['username'];

require_once './connect_pdo.php';
$stats = new DB;
$data_item = $stats->getCustomer1($stats->conn, $email);
header('Content-Type: application/json');
echo json_encode($data_item);
$stats->connclose();
