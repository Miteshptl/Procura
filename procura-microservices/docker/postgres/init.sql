CREATE TABLE products (
    id SERIAL PRIMARY KEY,
    product_code VARCHAR(50) NOT NULL UNIQUE,
    product_name VARCHAR(100) NOT NULL,
    product_description TEXT,
    product_rate DECIMAL(10, 2) NOT NULL,
    product_image VARCHAR(255)
);

CREATE TABLE orders (
    id SERIAL PRIMARY KEY,
    customer_details JSON NOT NULL,
    products JSON NOT NULL,
    total_amount DECIMAL(10, 2) NOT NULL
);