<?php
//$userid = "5";

$custid = $_GET['custid'];

require_once './connect_pdo.php';
$stats = new DB;
if($custid !== NULL && $custid !== '0'){
    $data_item = $stats->getCustomerTransactions($stats->conn, $custid);
}else{
    $data_item = $stats->getAllTransactions($stats->conn);
}

header('Content-Type: application/json');
echo json_encode($data_item);
$stats->connclose();