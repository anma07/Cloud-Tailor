CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(100) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    phone VARCHAR(15) NOT NULL,
    role VARCHAR(15) NOT NULL
);

CREATE TABLE designs ( 
    id SERIAL PRIMARY KEY, 
    name VARCHAR(150) NOT NULL, 
    category VARCHAR(50) NOT NULL, 
    imgsrc VARCHAR(255) NOT NULL, 
    price NUMERIC(10,2) NOT NULL ,
    days VARCHAR(20) NOT NULL 
);

CREATE TABLE if NOT EXISTS addresses (
    id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL,
    label VARCHAR(50) NOT NULL,
    value VARCHAR(100) NOT NULL,
    pincode INTEGER NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(id)
);

CREATE TABLE if NOT EXISTS orders (
    id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL,
    design_id INTEGER NOT NULL,
    size VARCHAR(20) NOT NULL,
    cloth_size NUMERIC(10, 2) NOT NULL,
    address_id INTEGER NOT NULL,
    payment_mode VARCHAR(50) NOT NULL,
    total NUMERIC(10,2) NOT NULL,
    status VARCHAR(30) NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (design_id) REFERENCES designs(id),
    FOREIGN KEY (address_id) REFERENCES addresses(id)
);