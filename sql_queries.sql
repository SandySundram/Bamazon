-- Create a DB

CREATE DATABASE bamazon;

CREATE TABLE products(

		item_id INT AUTO_INCREMENT NOT NULL,
		product_name varchar(255) NOT NULL,
        department_name varchar(255) NOT NULL,
        price INT NOT NULL,
        stock_quantity INT NOT NULL,
		PRIMARY KEY (item_id)
);

INSERT INTO products (product_name,department_name,price,stock_quantity) VALUES 
('Television','Electronics',900,5),
('Laptop','Electronics',500,25),
('Hat','Clothing',12,10),
('Shirt','Clothing',90,50),
('Vitamins','Health',9,500),
('Blender','Appliances',900,5),
('Microwave','Appliances',230,30),
('Dumbbells','Sports',20,120),
('Headphones','Electronics',30,80),
('World Atlas','Books',25,150);