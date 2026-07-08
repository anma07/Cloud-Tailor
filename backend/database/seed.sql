INSERT INTO addresses (user_id, label, value, pincode)
VALUES 
(3, 'College', 'ABC', 28),
(3, 'Home', 'IJK', 47),
(2, 'Home', 'XYZ', 30),
(2, 'Work', 'LMN', 80),
(3, 'Office', 'UVW', 89);

INSERT INTO designs (name, category, imgsrc, price, days)
VALUES
('T-Shirt', 'T-Shirts', '/uploads/tshirt.png', 300, '3-4'),
('Top', 'Tops', '/uploads/top.png', 400, '5-7'),
('Jacket', 'Jackets', '/uploads/jacket.png', 800, '5-7'),
('Winter-Jacket', 'Jackets', '/uploads/winter-jacket.png', 1000, '8-9'),
('Skirt', 'Skirts', '/uploads/skirt.png', 400, '3-4');

INSERT INTO orders (user_id, design_id, size, cloth_size, address_id, payment_mode, total, status)
VALUES
(2, 1, 'M', 45.00, 1, 'UPI', 400.00, 'IN PROGRESS'),
(3, 3, 'S', 25.00, 1, 'COD', 900.00, 'REQUESTED'),
(2, 2, 'L', 38.50, 1, 'CARD', 500.00, 'COMPLETED'),
(3, 5, 'M', 20.00, 1, 'UPI', 500.00, 'REQUESTED');

INSERT INTO favourites (user_id, design_id)
VALUES
(2, 3),
(2, 5),
(3, 1),
(3, 2);