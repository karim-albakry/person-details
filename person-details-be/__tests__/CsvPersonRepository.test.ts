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
    expect(persons[0]).toHaveProperty("telephone code");
    expect(persons[0]).toHaveProperty("telephone number");
    expect(persons[0]).toHaveProperty("address");
    expect(persons[0]).toHaveProperty("country");
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

  it("should return empty array when CSV file is empty", async () => {
    const originalFilePath = process.env.CSV_FILE_PATH;
    process.env.CSV_FILE_PATH = "./__tests__/data/empty.csv";

    const persons = await csvRepo.getPersons();
    expect(persons).toEqual([]);

    process.env.CSV_FILE_PATH = originalFilePath
  });

  it("should handle missing fields in CSV", async () => {
    const originalFilePath = process.env.CSV_FILE_PATH;
    process.env.CSV_FILE_PATH = "./__tests__/data/missing_columns.csv";

    const persons = await csvRepo.getPersons();
    expect(persons.length).toBeGreaterThan(0);
    expect(persons[0]["first name"]).toBeDefined();
    expect(persons[0]["last name"]).toEqual("Amr");
    expect(persons[0]["telephone number"]).toBeDefined();
    expect(persons[0]["telephone number"]).toEqual("");
    expect(persons[2]["first name"]).toEqual("");
    expect(persons[4]["address"]).toEqual("");

    process.env.CSV_FILE_PATH = originalFilePath
  });
});
