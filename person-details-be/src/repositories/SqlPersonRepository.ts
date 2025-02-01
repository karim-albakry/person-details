import { Pool } from "pg";
import dotenv from "dotenv";
import { IPersonRepository } from "./IPersonRepository";
import winston from "winston";

dotenv.config();

const logger = winston.createLogger({
  level: "info",
  format: winston.format.json(),
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({ filename: "backend.log" }),
  ],
});

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
    name?: string,
    phone?: string,
    address?: string,
    country?: string
  ): Promise<any[]> {
    let sqlQuery = `
      SELECT name as name, 
             telephone_number as telephone_number, 
             address as address, 
             country as country 
      FROM person_details WHERE 1=1
    `;

    const params: any[] = [];
    let paramIndex = 1;

    if (name && name.trim() !== "") {
      sqlQuery += ` AND (name ILIKE $${paramIndex} OR name ILIKE $${
        paramIndex + 1
      })`;
      params.push(`%${name.trim()}%`, `% ${name.trim()}%`);
      paramIndex += 2;
    }
    if (phone && phone.trim() !== "") {
      sqlQuery += ` AND telephone_number ILIKE $${paramIndex}`;
      params.push(`%${phone.trim()}%`);
      paramIndex++;
    }
    if (address && address.trim() !== "") {
      sqlQuery += ` AND address ILIKE $${paramIndex}`;
      params.push(`%${address.trim()}%`);
      paramIndex++;
    }
    if (country && country.trim() !== "") {
      sqlQuery += ` AND country ILIKE $${paramIndex}`;
      params.push(`%${country.trim()}%`);
      paramIndex++;
    }

    try {
      logger.info(
        `Executing SQL Query: ${sqlQuery
          .replace(/\s+/g, " ")
          .trim()} with parameters: ${JSON.stringify(params)}`
      );

      const res = await this.pool.query(sqlQuery, params);

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
      logger.error("❌ SQL Query Execution Error:", err);
      return [];
    }
  }
}
