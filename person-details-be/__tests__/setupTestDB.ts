import { Pool } from "pg";
import dotenv from "dotenv";

dotenv.config({ path: __dirname + "/../.env.test" });

const adminPool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  password: process.env.DB_PASSWORD,
  port: Number(process.env.DB_PORT),
  database: "postgres", // Connect to the default PostgreSQL database
});

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: Number(process.env.DB_PORT),
});

export default async function setupTestDatabase() {
  try {
    const DB_NAME = process.env.DB_NAME

    console.log(`🚀 Checking if test database '${DB_NAME}' exists...`);

    // Check if database exists before creating it
    const result = await adminPool.query(
      `SELECT 1 FROM pg_database WHERE datname = '${DB_NAME}'`
    );

    if (result.rowCount === 0) {
      await adminPool.query(`CREATE DATABASE ${DB_NAME} WITH TEMPLATE template0`);
      console.log(`✅ Test database '${DB_NAME}' created!`);
    } else {
      console.log(`✅ Test database '${DB_NAME}' already exists.`);
    }

    // Step 1: Create Table If Not Exists with a Unique Constraint
    await pool.query(`
      CREATE TABLE IF NOT EXISTS person_details (
        id SERIAL PRIMARY KEY,
        name VARCHAR(50),
        telephone_number VARCHAR(50),
        address VARCHAR(200),
        country VARCHAR(50)
      );
    `);

    // Step 2: Insert Test Data
    await pool.query(`
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

      INSERT INTO person_details (name, telephone_number, address, country)
      SELECT 'Test User 1', '1-123456789', '1 Test Street', 'USA'
      WHERE NOT EXISTS (SELECT 1 FROM person_details WHERE name = 'Test User 1');

      INSERT INTO person_details (name, telephone_number, address, country)
      SELECT 'Test User 2', '44-987654321', '2 Test Avenue', 'UK'
      WHERE NOT EXISTS (SELECT 1 FROM person_details WHERE name = 'Test User 2');

      INSERT INTO person_details (name, telephone_number, address, country)
      SELECT 'Edge Case User', '33-111222333', '3 Edge Road', 'Germany'
      WHERE NOT EXISTS (SELECT 1 FROM person_details WHERE name = 'Edge Case User');
    `);

    console.log("✅ Test database setup complete!");
  } catch (error) {
    console.error("❌ Error setting up test database:", error);
    throw error;
  }
}
