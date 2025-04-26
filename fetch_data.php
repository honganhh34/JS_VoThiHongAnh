<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);

$conn = new mysqli('localhost', 'root', '123456', 'rent_db');

if ($conn->connect_error) {
  die("Kết nối thất bại: " . $conn->connect_error);
}

$q = $_GET['q'] ?? '';
$sql = "SELECT r.*, p.method_name 
        FROM RentRoom r 
        JOIN PaymentType p ON r.payment_type_id = p.id 
        WHERE r.id LIKE '%$q%' 
           OR tenant_name LIKE '%$q%' 
           OR phone_number LIKE '%$q%'";

$result = $conn->query($sql);
$data = [];

while ($row = $result->fetch_assoc()) {
  $data[] = [
    'id' => $row['id'],
    'tenant_name' => $row['tenant_name'],
    'phone_number' => $row['phone_number'],
    'start_date' => $row['start_date'],
    'payment' => $row['method_name'],
    'note' => $row['note']
  ];
}

echo json_encode($data);
?>
