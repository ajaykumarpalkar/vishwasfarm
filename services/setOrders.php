<?php
$cancelorders = $_POST['cancelorders'];
$neworders = $_POST['neworders'];
//error_log($neworders[0]['orderid']);
 
require_once './connect_pdo.php';
$stats = new DB;
$data_item = $stats->newOrders($stats->conn, $cancelorders, $neworders);
//header('Content-Type: application/json');
//echo json_encode(done);
echo "done";
$stats->connclose();
