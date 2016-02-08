<?php

/*
 * Collect all Details from Angular HTTP Request.
 */
$postdata = file_get_contents("php://input");
$request = json_decode($postdata);
$email = $request->email;
$mobile = $request->mobile;
$pass = $request->pass;

require_once './connect_pdo.php';
$stats = new DB;
$data_item = $stats->newUser($stats->conn, $email, $mobile, $pass);
echo json_encode($data_item);
$stats->connclose();
