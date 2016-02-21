<?php
//$email = "8286582889";
//$pass = "";

//$postdata = file_get_contents("php://input");
//$request = json_decode($postdata);

require_once './connect_pdo.php';
$stats = new DB;
$data_item = $stats->getCustomer($stats->conn);
header('Content-Type: application/json');
echo json_encode($data_item);
$stats->connclose();
