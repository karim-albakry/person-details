import fs from "fs";
import csvParser from "csv-parser";
import { IPersonRepository } from "./IPersonRepository";
import dotenv from "dotenv";

dotenv.config();

export class CsvPersonRepository implements IPersonRepository {
  async getPersons(
    name: string = "",
    phone: string = "",
    address: string = "",
    country: string = ""
  ): Promise<any[]> {
    return new Promise<any[]>((resolve, reject) => {
      const results: any[] = [];

      // Use the correct CSV file based on the environment
      const csvFilePath = process.env.CSV_FILE_PATH || "./src/data/persons.csv";

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

            if (
              (!name || firstName.toLowerCase().includes(name.toLowerCase()) || lastName.toLowerCase().includes(name.toLowerCase())) &&
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
            console.error("❌ CSV Parsing Error:", error);
          }
        })
        .on("end", () => resolve(results))
        .on("error", (err) => reject(err));
    });
  }
}
