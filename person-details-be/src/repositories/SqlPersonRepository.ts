import { Pool } from "pg";
import dotenv from "dotenv";
import { IPersonRepository } from "./IPersonRepository";

export class SqlPersonRepository implements IPersonRepository {
  private pool: Pool;

  constructor() {
    this.pool = new Pool({
      user: process.env.DB_USER || "admin",
      host: process.env.DB_HOST || "localhost",
      database: process.env.DB_NAME || "persons_db",
      password: process.env.DB_PASSWORD || "admin",
      port: Number(process.env.DB_PORT) || 5432,
    });
  }

  async getPersons(
    name: string = "",
    phone: string = "",
    address: string = "",
    country: string = ""
  ): Promise<any[]> {
    let sqlQuery = `
    SELECT name as name, 
           telephone_number as telephone_number, 
           address as address, 
           country as country 
    FROM person_details WHERE 1=1
  `;
  
  if (name) {
    sqlQuery += ` AND (name ILIKE '%${name.trim()}%' OR name ILIKE '% ${name.trim()}%')`; 
  }
  if (phone) sqlQuery += ` AND telephone_number ILIKE '%${phone.trim()}%'`;
  if (address) sqlQuery += ` AND address ILIKE '%${address.trim()}%'`;
  if (country) sqlQuery += ` AND country ILIKE '%${country.trim()}%'`;

    try {
      const res = await this.pool.query(sqlQuery);

      return res.rows.map((row) => {
        const nameParts = row.name.split(" ");
        const phoneParts = row.telephone_number.split("-");

        return {
          "first name": nameParts[0] || "",
          "last name": nameParts.slice(1).join(" ") || "",
          "telephone code": phoneParts[0] || "",
          "telephone number": phoneParts[1] || "",
          address: row.address || "",
          country: row.country || "",
        };
      });
    } catch (err) {
      console.error(err);
      return [];
    }
  }
}
