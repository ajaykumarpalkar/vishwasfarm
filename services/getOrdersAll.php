<?php
//$userid = "5";

$custid = $_GET['custid'];

require_once './connect_pdo.php';
$stats = new DB;
if($custid !== NULL && $custid !== '0'){
    $data_item = $stats->getOrderHistory($stats->conn, $custid);
}
if($custid !== NULL && $custid === '0'){
    $data_item = $stats->getAllOrders($stats->conn);
}

header('Content-Type: application/json');
echo json_encode($data_item);
$stats->connclose();
