<?php
$customerid = $_POST['customerid'];
$amount = $_POST['amount'];
$paymentdate = $_POST['paymentdate'];

//error_log($neworders[0]['orderid']);
 
require_once './connect_pdo.php';
$stats = new DB;
$data_item = $stats->newPayment($stats->conn, $paymentdate, $customerid, $amount);
//header('Content-Type: application/json');
//echo json_encode(done);
echo "done";
$stats->connclose();
