<?php

/*
 * Collect all Details from Angular HTTP Request.
 */
$postdata = file_get_contents("php://input");
$request = json_decode($postdata);
$custid = $request->custid;
$email = $request->email;
$mobile = $request->mobile;
$pass = $request->pass;
$firstname = $request->firstname;
$lastname = $request->lastname;
$address = $request->address;
$gender = $request->gender;

require_once './connect_pdo.php';
$stats = new DB;

$data_item = $stats->updateCustomer($stats->conn, $custid, $email, $mobile, $pass, $firstname, $lastname, $address, $gender);

echo json_encode($data_item);
$stats->connclose();
