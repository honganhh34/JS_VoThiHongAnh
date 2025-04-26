CREATE DATABASE rent_db;
USE rent_db;
CREATE TABLE PaymentType (
  id INT AUTO_INCREMENT PRIMARY KEY,
  method_name VARCHAR(20)
);
INSERT INTO PaymentType (method_name) VALUES ('Theo tháng'), ('Theo quý'), ('Theo năm');
CREATE TABLE RentRoom (
  id INT AUTO_INCREMENT PRIMARY KEY,
  tenant_name VARCHAR(50),
  phone_number VARCHAR(10),
  start_date DATE,
  payment_type_id INT,
  note TEXT,
  FOREIGN KEY (payment_type_id) REFERENCES PaymentType(id)
);

INSERT INTO PaymentType (method_name) 
VALUES 
('Theo tháng'), 
('Theo quý'), 
('Theo năm');

INSERT INTO RentRoom (tenant_name, phone_number, start_date, payment_type_id, note) 
VALUES 

('Lê Quang C', '0912345678', '2025-07-10', 6, 'Ghi chú C'),
('Nguyễn Văn A', '0123456789', '2025-05-01', 2, 'Ghi chú A');
('Trần Thị B', '0987654321', '2025-06-15', 4, 'Ghi chú B');

ALTER TABLE PaymentType AUTO_INCREMENT = 1;

DELETE FROM PaymentType;
paymenttype
DROP TABLE PaymentType;

DROP DATABASE rent_db;
