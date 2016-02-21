<?php
//$userid = "5";

//$postdata = file_get_contents("php://input");
//$request = json_decode($postdata);
$custid = $_GET['custid'];

require_once './connect_pdo.php';
$stats = new DB;
$data_item = $stats->getProducts($stats->conn, $custid);
header('Content-Type: application/json');
echo json_encode($data_item);
//echo $data_item;
$stats->connclose();