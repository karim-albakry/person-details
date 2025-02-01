import express, { Request, Response } from "express";
import cors from "cors";
import { CsvPersonRepository } from "./repositories/CsvPersonRepository";
import { SqlPersonRepository } from "./repositories/SqlPersonRepository";
import { PersonService } from "./services/PersonService";
import dotenv from "dotenv";

if (process.env.NODE_ENV !== "production") {
  dotenv.config();
}

const app = express();
const port = process.env.PORT || 3000; 
app.use(cors());

const personService = new PersonService(new CsvPersonRepository(), new SqlPersonRepository());

app.get("/api/person-details", async (req: Request, res: Response) => {
  const { name, phone, address, country } = req.query;
  const persons = await personService.getAllPersons(
    name as string,
    phone as string,
    address as string,
    country as string
  );

  res.json(persons);
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});

export default app;