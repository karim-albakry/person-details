import { CsvPersonRepository } from "../src/repositories/CsvPersonRepository";
import path from "path";
import dotenv from "dotenv";

dotenv.config({ path: path.resolve(__dirname, "../.env.test") });

describe("CsvPersonRepository (Test CSV File)", () => {
  let csvRepo: CsvPersonRepository;

  beforeAll(() => {
    csvRepo = new CsvPersonRepository();
  });

  it("should return persons from the test CSV file", async () => {
    const persons = await csvRepo.getPersons();
    expect(persons.length).toBeGreaterThan(0);
    expect(persons[0]).toHaveProperty("first name");
    expect(persons[0]).toHaveProperty("last name");
  });

  it("should filter persons by name", async () => {
    const persons = await csvRepo.getPersons("Ahmed");
    expect(persons.length).toBeGreaterThan(0);
    expect(persons[0]["first name"]).toContain("Ahmed");
  });

  it("should filter persons by country", async () => {
    const persons = await csvRepo.getPersons("", "", "", "Egypt");
    expect(persons.length).toBeGreaterThan(0);
    expect(persons.every((p) => p.country === "Egypt")).toBe(true);
  });

  it("should return empty if no match is found", async () => {
    const persons = await csvRepo.getPersons("Unknown Name");
    expect(persons.length).toBe(0);
  });
});
