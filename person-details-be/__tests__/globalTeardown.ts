import { Pool } from "pg";
import dotenv from "dotenv";

dotenv.config({ path: __dirname + "/../.env.test" });

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: Number(process.env.DB_PORT),
});

export default async function cleanupTestDatabase() {
  try {
    console.log("🧹 Cleaning up test database...");

    // Check if the table exists before deleting
    const tableExists = await pool.query(`
      SELECT EXISTS (
        SELECT FROM information_schema.tables 
        WHERE table_schema = 'public' 
        AND table_name = 'person_details'
      );
    `);

    if (tableExists.rows[0].exists) {
      await pool.query("DELETE FROM person_details WHERE name LIKE 'Test%';");
      console.log("✅ Test database cleanup complete!");
    } else {
      console.warn("⚠️ Warning: Table 'person_details' does not exist. Skipping cleanup.");
    }

    await pool.end();
  } catch (error) {
    console.error("❌ Error cleaning up test database:", error);
    throw error;
  }
}
