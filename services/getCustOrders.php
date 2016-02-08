
<?php
//$userid = "5";

$custid = $_GET['custid'];

require_once './connect_pdo.php';
$stats = new DB;
$data_item = $stats->getCustOrders($stats->conn, $custid);
header('Content-Type: application/json');
echo json_encode($data_item);
$stats->connclose();