    <?php
require_once './connect_pdo.php';
$stats = new DB;
$data_item = $stats->getAllOrders($stats->conn);
header('Content-Type: application/json');
echo json_encode($data_item);
//echo $data_item;
$stats->connclose();
