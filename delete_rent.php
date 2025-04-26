<?php
header("Content-Type: application/json");
error_reporting(E_ALL);
ini_set('display_errors', 1);

$conn = new mysqli('localhost', 'root', '123456', 'rent_db');
if ($conn->connect_error) {
  http_response_code(500);
  echo json_encode(["error" => "Kết nối CSDL thất bại: " . $conn->connect_error]);
  exit;
}

// Lấy và kiểm tra dữ liệu JSON
$data = json_decode(file_get_contents("php://input"), true);
if (!isset($data['ids']) || !is_array($data['ids']) || empty($data['ids'])) {
  http_response_code(400);
  echo json_encode(["error" => "Dữ liệu gửi lên không hợp lệ", "debug" => $data]);
  exit;
}

// Lọc ID hợp lệ
$ids = implode(',', array_map('intval', $data['ids']));
$sql = "DELETE FROM RentRoom WHERE id IN ($ids)";
$result = $conn->query($sql);

if ($result) {
  echo json_encode(["success" => true, "deleted_ids" => $ids]);
} else {
  http_response_code(500);
  echo json_encode(["error" => "Lỗi SQL: " . $conn->error, "query" => $sql]);
}
?>
