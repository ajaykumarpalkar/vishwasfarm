<?php
$updateorder = $_POST['updateorder'];
 
require_once './connect_pdo.php';
$stats = new DB;
$data_item = $stats->updateOrder($stats->conn, $updateorder);
//header('Content-Type: application/json');
//echo json_encode(done);
echo "done";
$stats->connclose();
