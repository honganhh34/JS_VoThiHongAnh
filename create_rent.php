<?php
$conn = new mysqli('localhost', 'root', '123456', 'rent_db');
if ($conn->connect_error) {
  die("Connection failed: " . $conn->connect_error);
}
$name = $_POST['tenant_name'] ?? '';
$phone = $_POST['phone_number'] ?? '';
$date = $_POST['start_date'] ?? '';
$type = $_POST['payment_type'] ?? '';
$note = $_POST['note'] ?? '';

$sql = "INSERT INTO RentRoom (tenant_name, phone_number, start_date, payment_type_id, note) VALUES (?, ?, ?, ?, ?)";
$stmt = $conn->prepare($sql);

if (!$stmt) {
  die("Lỗi prepare: " . $conn->error);
}

$stmt->bind_param("sssis", $name, $phone, $date, $type, $note);
if (!$stmt->execute()) {
  die("Lỗi execute: " . $stmt->error);
}
?>
