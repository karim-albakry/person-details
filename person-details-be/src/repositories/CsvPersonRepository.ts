import fs from "fs";
import csvParser from "csv-parser";
import { IPersonRepository } from "./IPersonRepository";
import dotenv from "dotenv";
import winston from "winston";

dotenv.config();

const logger = winston.createLogger({
  level: "info",
  format: winston.format.json(),
  transports: [new winston.transports.Console(), new winston.transports.File({ filename: "backend.log" })],
});

export class CsvPersonRepository implements IPersonRepository {
  async getPersons(
    name: string = "",
    phone: string = "",
    address: string = "",
    country: string = ""
  ): Promise<any[]> {
    return new Promise<any[]>((resolve, reject) => {
      const results: any[] = [];

      // Read the CSV file path from environment variables
      const csvFilePath = process.env.CSV_FILE_PATH || "./src/data/persons.csv";
      logger.info(`Reading data from CSV file: ${csvFilePath}`);

      fs.createReadStream(csvFilePath)
        .pipe(csvParser())
        .on("data", (row) => {
          try {
            const firstName = row["First Name"]?.trim() || "";
            const lastName = row["Last Name"]?.trim() || "";
            const telephoneCode = row["Country code"]?.trim() || "";
            const telephoneNumber = row["Number"]?.trim() || "";

            const fullAddress = row["Full Address"]?.trim() || "";
            const addressParts = fullAddress.split(",");
            const parsedAddress = addressParts.length > 1 ? addressParts[0].trim() : fullAddress;
            const parsedCountry = addressParts.length > 1 ? addressParts[1].trim() : "";

            // Apply filtering logic
            if (
              (!name || `${firstName} ${lastName}`.toLowerCase().includes(name.toLowerCase().trim())) &&
              (!phone || telephoneNumber.includes(phone)) &&
              (!address || parsedAddress.toLowerCase().includes(address.toLowerCase())) &&
              (!country || parsedCountry.toLowerCase().includes(country.toLowerCase()))
            ) {
              results.push({
                "first name": firstName,
                "last name": lastName,
                "telephone code": telephoneCode,
                "telephone number": telephoneNumber,
                "address": parsedAddress,
                "country": parsedCountry,
              });
            }
          } catch (error) {
            logger.error("❌ CSV Parsing Error:", error);
          }
        })
        .on("end", () => resolve(results))
        .on("error", (err) => {
          logger.error("❌ Error reading CSV file:", err);
          reject(err);
        });
    });
  }
}
