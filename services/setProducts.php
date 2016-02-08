<?php
//$userid = "5";

//$postdata = file_get_contents("php://input");
//$request = json_decode($postdata);
$newproduct = $_POST['newproduct'];

require_once './connect_pdo.php';
$stats = new DB;
$data_item = $stats->newProduct($stats->conn, $newproduct);
header('Content-Type: application/json');
echo json_encode($data_item);
//echo $data_item;
$stats->connclose();