<?php
//$userid = "5";

//$postdata = file_get_contents("php://input");
//$request = json_decode($postdata);
$productid = $_GET['productid'];

//require_once './connect_pdo.php';
//$stats = new DB;
//$data_item = $stats->deleteProduct($stats->conn, $productid);
//header('Content-Type: application/json');
//echo json_encode($data_item);
echo $productid;
//$stats->connclose();