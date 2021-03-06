<?php

/*
 * Collect all Details from Angular HTTP Request.
 */
$postdata = file_get_contents("php://input");
$request = json_decode($postdata);
$email = $request->email;
$mobile = $request->mobile;
$pass = $request->pass;
$firstname = $request->firstname;
$lastname = $request->lastname;
$address = $request->address;
$gender = $request->gender;

require_once './connect_pdo.php';
$stats = new DB;

if($stats->checkCustomer($stats->conn, $email, $mobile)){
    $data_item = $stats->newCustomer($stats->conn, $email, $mobile, $pass, $firstname, $lastname, $address, $gender);
}else{
    $data_item = 0;
}

echo json_encode($data_item);
$stats->connclose();
