import fs from "fs";
import csvParser from "csv-parser";
import { IPersonRepository } from "./IPersonRepository";

export class CsvPersonRepository implements IPersonRepository {
  async getPersons(
    name: string = "",
    phone: string = "",
    address: string = "",
    country: string = ""
  ): Promise<any[]> {
    return new Promise<any[]>((resolve, reject) => {
      const results: any[] = [];
      fs.createReadStream("./src/data/persons.csv")
        .pipe(csvParser())
        .on("data", (row) => {
          const firstName = row["First Name"].trim();
          const lastName = row["Last Name"].trim();
          const telephoneNumber = row["Number"].trim();
          const address = row["Full Address"].split(",")[0].trim();
          const country = row["Full Address"].split(",")[1].trim();

          if (
            !name &&
            !phone &&
            !address &&
            !country ||
            (name && (firstName.toLowerCase().includes(name.toLowerCase()) ||
                      lastName.toLowerCase().includes(name.toLowerCase()))) ||
            (phone && telephoneNumber.includes(phone)) ||
            (address && address.toLowerCase().includes(address.toLowerCase())) ||
            (country && country.toLowerCase().includes(country.toLowerCase()))
          ) {
            results.push({
              "first name": firstName,
              "last name": lastName,
              "telephone code": row["Country code"],
              "telephone number": telephoneNumber,
              address: address,
              country: country,
            });
          }
        })
        .on("end", () => resolve(results))
        .on("error", (err) => reject(err));
    });
  }
}
