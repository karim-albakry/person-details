CREATE TABLE IF NOT EXISTS person_details (
    id SERIAL PRIMARY KEY,
    name VARCHAR(50),
    telephone_number VARCHAR(50),
    address VARCHAR(200),
    country VARCHAR(50)
);

INSERT INTO person_details (name, telephone_number, address, country)
SELECT 'Ahmed Mohammed', '20-010334445', '10 Road Street', 'Egypt'
WHERE NOT EXISTS (SELECT 1 FROM person_details WHERE name = 'Ahmed Mohammed');

INSERT INTO person_details (name, telephone_number, address, country)
SELECT 'Mona Mahmoud', '20-010334445', '11 Road Street', 'Egypt'
WHERE NOT EXISTS (SELECT 1 FROM person_details WHERE name = 'Mona Mahmoud');

INSERT INTO person_details (name, telephone_number, address, country)
SELECT 'Mohammed Rabie', '970-111111111', '15 Road Street', 'Palestine'
WHERE NOT EXISTS (SELECT 1 FROM person_details WHERE name = 'Mohammed Rabie');

INSERT INTO person_details (name, telephone_number, address, country)
SELECT 'Ana Yousif', '961-111111111', '20 Road Street', 'Lebanon'
WHERE NOT EXISTS (SELECT 1 FROM person_details WHERE name = 'Ana Yousif');
