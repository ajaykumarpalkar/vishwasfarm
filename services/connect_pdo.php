<?php

class DB {

    public $conn;

    function __construct() {
        $servername = "localhost";
        $username = "root"; //root
        $password = "ajay123";
        $dbname = "vishwasfarm";
        $this->conn = new PDO("mysql:host=$servername;dbname=$dbname", $username, $password);
        // set the PDO error mode to exception
        $this->conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        
        if ($this->conn === FALSE){
            exit ('DB connection failed');
        }
    }
    
    /*users*/
    function newUser($conn, $firstname, $lastname, $email, $contact, $address, $gender, $usertype, $cpassword) {
        try {
            $sql = "INSERT INTO customer (firstname, lastname, email, contact, address, gender, usertype, cpassword) VALUES "
                    . "('{$firstname}','{$lastname}','{$email}','{$contact}','{$address}','{$gender}','{$usertype}','{$cpassword}')";
            $conn->exec($sql);
        } catch (PDOException $e) {
            echo "Connection failed: " . $e->getMessage();
        }
    }
 
    function getUser($conn, $email, $pass) {
        try {
            $sql = "select * from users where (email='".$email."' or contact='".$email."') and password='".$pass."'";
            $q = $conn->query($sql);

            $q->setFetchMode(PDO::FETCH_ASSOC);
            $data_item = [];
            $row = $q->fetch();
//            while ($row = $q->fetch()) {
//                $data_item['custid'] = $row['custid'];
//                $data_item['email'] = $row['email'];
//                $data_item['contact'] = $row['contact'];
//                $data_item['address'] = $row['address'];
//                $data_item['firstname'] = $row['firstname'];
//                $data_item['wallet'] = $row['firstname'];
//            }
            return $row;
        } catch (PDOException $e) {
            echo "Connection failed: " . $e->getMessage();
        }
    }
    
    function newCustomer($conn, $email, $contact, $pass, $firstname, $lastname, $address, $gender) {
        try {
            $sql = "INSERT INTO customer (email, contact, firstname, lastname, address, gender, cpassword, usertype, wallet) VALUES "
                    . "('{$email}','{$contact}','{$firstname}','{$lastname}','{$address}','{$gender}','{$pass}','Normal',0)";
            $conn->exec($sql);
            return $contact;
        } catch (PDOException $e) {
            echo "Connection failed: " . $e->getMessage();
        }
    }
    
    function updateCustomer($conn, $custid, $email, $contact, $pass, $firstname, $lastname, $address, $gender) {
        try {
            $sql = "UPDATE customer SET email='{$email}', contact='{$contact}', lastname='{$lastname}', firstname='{$firstname}', address='{$address}',cpassword='{$pass}' WHERE custid='".$custid."'";
            $conn->exec($sql);
            return $contact;
        } catch (PDOException $e) {
            echo "Connection failed: " . $e->getMessage();
        }
    }
    
    function checkCustomer($conn, $email, $contact) {
        try {
            $sql = "select * from customer where (email='" . $email . "' or contact='" . $contact . "')";
            $q = $conn->query($sql);

            $q->setFetchMode(PDO::FETCH_ASSOC);
            if ($row = $q->fetch()) {
                return FALSE;
            } else {
                return TRUE;
            }
        } catch (PDOException $e) {
            echo "Connection failed: " . $e->getMessage();
        }
    }
    
    function getCustomer($conn, $email, $pass) {
        try {
            $sql = "select * from customer where (email='".$email."' or contact='".$email."') and cpassword='".$pass."'";
            $q = $conn->query($sql);

            $q->setFetchMode(PDO::FETCH_ASSOC);
            $row = $q->fetch();
            return $row;
        } catch (PDOException $e) {
            echo "Connection failed: " . $e->getMessage();
        }
    }
    
    function getCustomer1($conn, $email) {
        try {
            $sql = "select * from customer where (email='".$email."' or contact='".$email."')";
            $q = $conn->query($sql);

            $q->setFetchMode(PDO::FETCH_ASSOC);
            $row = $q->fetch();
            return $row;
        } catch (PDOException $e) {
            echo "Connection failed: " . $e->getMessage();
        }
    }
    
    function getAllCustomer($conn) {
        try {
            $sql = "select * from customer";
            $q = $conn->query($sql);

            $q->setFetchMode(PDO::FETCH_ASSOC);
            
            $row = $q->fetchAll();
            return $row;
        } catch (PDOException $e) {
            echo "Connection failed: " . $e->getMessage();
        }
    }
    
    function getReviewCnt($conn, $userid) {
        try {
            $sql = "select count(*) as cnt from user_reviews where userid='".$userid."'";

            $q = $conn->query($sql);

            $q->setFetchMode(PDO::FETCH_ASSOC);
            $data_cnt = 0;
            while ($row = $q->fetch()) {
                $data_cnt = $row['cnt'];
            }
            return $data_cnt;
        } catch (PDOException $e) {
            echo "Connection failed: " . $e->getMessage();
        }
    }

    /*transactions*/
    function getCustomerTransactions($conn,$custid) {
        try {
            $data_item = [];
            $array = array();
            $sql = "SELECT p.payment_date as tdate, p.amount, c.firstname, c.lastname, c.contact, c.address FROM payments p, customer c WHERE p.customerid = c.custid and p.customerid ='".$custid."'";

            $q = $conn->query($sql);

            $q->setFetchMode(PDO::FETCH_ASSOC);

            while ($row = $q->fetch()) {
                $data_item['tdate'] = $row['tdate'];
                $data_item['product_name'] = 'Payment';
                $data_item['quantity'] = 0;
                $data_item['unitprice'] = 0;
                $data_item['unit'] = 0;
                $data_item['amount'] = $row['amount'];
                $data_item['firstname'] = $row['firstname'];
                $data_item['lastname'] = $row['lastname'];
                $data_item['contact'] = $row['contact'];
                $data_item['address'] = $row['address'];
                $array[] = $data_item;
            }


            $sql2 = "SELECT o.orderday as tdate, o.product_name, o.quantity, o.unitprice, o.unit,  c.firstname, c.lastname, c.contact, c.address FROM orders o, customer c WHERE o.userid = c.custid and o.userid = '".$custid."' and o.deliveryStatus = 'Y'";

            $q2 = $conn->query($sql2);

            $q2->setFetchMode(PDO::FETCH_ASSOC);

            while ($row2 = $q2->fetch()) {
                $data_item['tdate'] = $row2['tdate'];
                $data_item['product_name'] = "Purchase (".$row2['product_name'].")";
                $data_item['quantity'] = $row2['quantity'];
                $data_item['unitprice'] = $row2['unitprice'];
                $data_item['unit'] = $row2['unit'];
                $data_item['amount'] = 0 - ($row2['quantity'] * $row2['unitprice']);
                $data_item['firstname'] = $row2['firstname'];
                $data_item['lastname'] = $row2['lastname'];
                $data_item['contact'] = $row2['contact'];
                $data_item['address'] = $row2['address'];
                $array[] = $data_item;
            }

            return $array;
        } catch (PDOException $e) {
            echo "Connection failed: " . $e->getMessage();
        }
    }
    
    function getAllTransactions($conn) {
        try {
            $data_item = [];
            $array = array();
            $sql = "SELECT p.payment_date as tdate, p.amount, c.firstname, c.lastname, c.contact, c.address FROM payments p, customer c WHERE p.customerid = c.custid";

            $q = $conn->query($sql);

            $q->setFetchMode(PDO::FETCH_ASSOC);

            while ($row = $q->fetch()) {
                $data_item['tdate'] = $row['tdate'];
                $data_item['product_name'] = 'Payment';
                $data_item['quantity'] = 0;
                $data_item['unitprice'] = 0;
                $data_item['amount'] = $row['amount'];
                $data_item['firstname'] = $row['firstname'];
                $data_item['lastname'] = $row['lastname'];
                $data_item['contact'] = $row['contact'];
                $data_item['address'] = $row['address'];
                $array[] = $data_item;
            }


            $sql2 = "SELECT o.orderday as tdate, o.product_name, o.quantity, o.unitprice,  c.firstname, c.lastname, c.contact, c.address FROM orders o, customer c WHERE o.userid = c.custid and o.deliveryStatus = 'Y'";

            $q2 = $conn->query($sql2);

            $q2->setFetchMode(PDO::FETCH_ASSOC);

            while ($row2 = $q2->fetch()) {
                $data_item['tdate'] = $row2['tdate'];
                $data_item['product_name'] = "Purchase (".$row2['product_name'].")";
                $data_item['quantity'] = $row2['quantity'];
                $data_item['unitprice'] = $row2['unitprice'];
                $data_item['amount'] = 0 - ($row2['quantity'] * $row2['unitprice']);
                $data_item['firstname'] = $row2['firstname'];
                $data_item['lastname'] = $row2['lastname'];
                $data_item['contact'] = $row2['contact'];
                $data_item['address'] = $row2['address'];
                $array[] = $data_item;
            }

            return $array;
        } catch (PDOException $e) {
            echo "Connection failed: " . $e->getMessage();
        }
    }
    
    /*payments*/
    function newPayment($conn, $paymentdate, $customerid, $amount) {
        try {
            if (!empty($customerid)) {
                $sql = "INSERT INTO payments (payment_date, customerid, amount) VALUES "
                . "('{$paymentdate}','{$customerid}','{$amount}')";

                $conn->exec($sql);
            }
        } catch (PDOException $e) {
            echo "Connection failed: " . $e->getMessage();
        }
    }
    
    /*products*/
    function newProduct($conn, $newproduct) {
        try {
            if (!empty($newproduct)) {
                $n = $newproduct['productname'];
                $c = $newproduct['category'];
                $s = $newproduct['statusa'];
                $i = $newproduct['img'];
                $u = $newproduct['unit'];
                $p = $newproduct['unitprice'];

                $sql = "INSERT INTO products (productname, category, statusa, img, unit, unitprice) VALUES "
                        . "('{$n}','{$c}','{$s}','{$i}','{$u}','{$p}')";

                $conn->exec($sql);
            }
            return "done";
        } catch (PDOException $e) {
            echo "Connection failed: " . $e->getMessage();
        }
    }
    
    function deleteProduct($conn, $productid) {
        try {
            $sql = "DELETE FROM products WHERE productid = ".$productid;
            $conn->exec($sql);
            return "done";
        } catch (PDOException $e) {
            echo "Connection failed: " . $e->getMessage();
        }
    }
    
    function getProducts($conn, $custid) {
        try {
            $sql = "SELECT * FROM products where category='".$custid."'";

            $q = $conn->query($sql);

            $q->setFetchMode(PDO::FETCH_ASSOC);
            $row = $q->fetchAll();
//            $data = "<table border=1 style='border-collapse: collapse;'>";
//            $data.="<tr>
//            <th>Product Id</th>
//            <th>Product Name</th>
//            <th>Category</th>
//            <th>Status</th>
//            <th>Image</th>
//            <th>Unit</th>
//            <th>Price</th>
//            </tr>";
//            while ($row = $q->fetch()) {
//                $data.="<tr><td>".$row['productid']."</td><td>".$row['productname']."</td><td>".$row['category']."</td>".
//                        "<td>".$row['statusa']."</td><td>".$row['img']."</td><td>".$row['unit']."</td><td>&#8377; ".$row['unitprice']."</td></tr>";
//            }
//            return $data."</table>";
            return $row;
        } catch (PDOException $e) {
            echo "Connection failed: " . $e->getMessage();
        }
    }
    
    /*orders*/
    function getAllOrders($conn) {
        try {
            $sql = "SELECT o.*, c.firstname, c.lastname, c.contact, c.address FROM orders o, customer c WHERE o.userid = c.custid";

            $q = $conn->query($sql);

            $q->setFetchMode(PDO::FETCH_ASSOC);
            $row = $q->fetchAll();
            
//            $data = "<table border=1 style='border-collapse: collapse;' class=\"sortable\">";
//            $data.="<thead><tr>
//            <th>OrderDate</th>
//            <th>ProductName</th>
//            <th>UserId</th>
//            <th>Unit</th>
//            <th>Quantity</th>
//            <th>Unitprice</th>
//            <th>Delivery</th>
//            <th>Status</th>
//            </tr></thead><tbody>";
//            while ($row = $q->fetch()) {
//                $delstatus = "<span class=\"glyphicon glyphicon-ok\" data-tooltip='Done'>";
//                if($row['deliveryStatus']=='N'){
//                    $delstatus = "<span class=\"glyphicon glyphicon-remove\" data-tooltip='Pending'>";
//                }
//                $data.="<tr><td>".$row['orderday']."</td><td>".$row['product_name']."</td><td>".$row['userid']."</td>".
//                        "<td>".$row['unit']."</td><td>".$row['quantity']."</td><td>&#8377; ".$row['unitprice']."</td><td>".$row['ordergroup']."</td><td>".$delstatus."</span></td></tr>";
//            }
//            return $data."</tbody></table>";
            
            return $row;
        } catch (PDOException $e) {
            echo "Connection failed: " . $e->getMessage();
        }
    }
    
    function getOrderHistory($conn, $custid) {
        try {
            $sql = "SELECT o.*, c.firstname, c.lastname, c.contact, c.address FROM orders o, customer c WHERE o.userid =  c.custid and c.custid= ".$custid;

            $q = $conn->query($sql);

            $q->setFetchMode(PDO::FETCH_ASSOC);
            $row = $q->fetchAll();

            return $row;
        } catch (PDOException $e) {
            echo "Connection failed: " . $e->getMessage();
        }
    }
    
    function getCustOrders($conn,$custid) {
        try {
            $sql = "select * from orders where userid='".$custid."'";

            $q = $conn->query($sql);

            $q->setFetchMode(PDO::FETCH_ASSOC);
            
            $row = $q->fetchAll();
            return $row;
        } catch (PDOException $e) {
            echo "Connection failed: " . $e->getMessage();
        }
    }
    
    function updateOrder($conn, $updateOrder) {
    try {
        if (!empty($updateOrder)) {
                $oid = $updateOrder['oid'];
                $states = $updateOrder['states'];

                if(!empty($states)){
                    $sql = "UPDATE orders SET deliveryStatus='".$states."' WHERE orderid=".$oid;
                }else{
                    $sql = "DELETE FROM orders WHERE orderid = ".$oid;
                }

                $conn->exec($sql);
        }
    } catch (PDOException $e) {
        echo "Connection failed: " . $e->getMessage();
    }
}
    
    function newOrders($conn, $cancelorders, $neworders) {
        try {
            if (!empty($neworders)) {
                $arr_length = count($neworders);

                for ($a = 1; $a < $arr_length; $a++) {
                    $mydata = $neworders[$a];
                    $orderday = $mydata['day'];
                    $orderid = $mydata['orderid'];
                    $product_name = $mydata['product_name'];
                    $userid = $mydata['userid'];
                    $unit = $mydata['unit'];
                    $quantity = $mydata['quantity'];
                    $unitprice = $mydata['unitprice'];
                    $deliveryStatus = $mydata['deliveryStatus'];
                    $ordergroup = $mydata['ordergroup'];
                    $sql = "INSERT INTO orders (orderday, product_name, userid, unit, quantity, unitprice, deliveryStatus, ordergroup) VALUES "
                            . "('{$orderday}','{$product_name}','{$userid}','{$unit}','{$quantity}','{$unitprice}','{$deliveryStatus}','{$ordergroup}')";

                    $conn->exec($sql);
                }
            }
            
            if (!empty($cancelorders)) {
                $arr_length = count($cancelorders);

                for ($x = 0; $x < $arr_length; $x++) {
                    $mydata = $neworders[$x];
                    //$orderday = $mydata['day'];

                    $sql = "DELETE FROM orders WHERE orderid = ".$orderid;

                    $conn->exec($sql);
                }
            }
        } catch (PDOException $e) {
            echo "Connection failed: " . $e->getMessage();
        }
    }
    
    function deleteOrders($conn) {
        try {
            $sql = "TRUNCATE vishwasfarm.orders";
            $conn->exec($sql);
        } catch (PDOException $e) {
            echo "Connection failed: " . $e->getMessage();
        }
    }
    
    function newOrders1($conn, $cancelorders, $neworders) {
        try {
            if (!empty($allorders)) {
//                $stmt = $conn->prepare("INSERT INTO orders (orderday, product_name, userid, unit, quantity, unitprice, deliveryStatus, ordergroup) VALUES"
//                        . " (:orderday, :product_name, :userid, :unit, :quantity, :unitprice, :deliveryStatus, :ordergroup)");
//                $stmt->bindParam(':orderday', $orderday);
//                $stmt->bindParam(':product_name', $product_name);
//                $stmt->bindParam(':userid', $userid);
//                $stmt->bindParam(':unit', $unit);
//                $stmt->bindParam(':quantity', $quantity);
//                $stmt->bindParam(':unitprice', $unitprice);
//                $stmt->bindParam(':deliveryStatus', $deliveryStatus);
//                $stmt->bindParam(':ordergroup', $ordergroup);

                $arr_length = count($allorders);
//                print_r(array_values($allorders));
//                error_log(array_values($allorders));
                for ($x = 0; $x < $arr_length; $x++) {
                    $mydata = $allorders[$x];
                $orderday = $mydata['day'];
//                    error_log($mydata->morningOrders . "\n");
                    
                    foreach ($mydata['morningOrders'] as $values) {
//                        error_log($values->orderid);
                        $product_name = $values['product_name'];
                        $userid = $values['userid'];
                        $unit = $values['unit'];
                        $quantity = $values['quantity'];
                        $unitprice = $values['unitprice'];
                        $deliveryStatus = $values['deliveryStatus'];
                        $ordergroup = "Morning";
                                    $sql = "INSERT INTO orders (orderday, product_name, userid, unit, quantity, unitprice, deliveryStatus, ordergroup) VALUES "
                    . "('{$orderday}','{$product_name}','{$userid}','{$unit}','{$quantity}','{$unitprice}','{$deliveryStatus}','{$ordergroup}')";
            
                    $conn->exec($sql);
                    }
                    
                                        foreach ($mydata['eveningOrders'] as $values) {
//                        error_log($values->orderid);
                        $product_name = $values['product_name'];
                        $userid = $values['userid'];
                        $unit = $values['unit'];
                        $quantity = $values['quantity'];
                        $unitprice = $values['unitprice'];
                        $deliveryStatus = $values['deliveryStatus'];
                        $ordergroup = "Morning";
                                    $sql = "INSERT INTO orders (orderday, product_name, userid, unit, quantity, unitprice, deliveryStatus, ordergroup) VALUES "
                    . "('{$orderday}','{$product_name}','{$userid}','{$unit}','{$quantity}','{$unitprice}','{$deliveryStatus}','{$ordergroup}')";
            
                    $conn->exec($sql);
                    }

                    // insert a row
//                    $stmt->execute();
                }
            }
//        $conn->exec($sql);
        } catch (PDOException $e) {
            echo "Connection failed: " . $e->getMessage();
        }
    }

    function connclose() {
        $this->conn = null;
    }
}
