import { PersonService } from "../src/services/PersonService";
import { SqlPersonRepository } from "../src/repositories/SqlPersonRepository";
import { CsvPersonRepository } from "../src/repositories/CsvPersonRepository";


describe("PersonService (Service Logic)", () => {
  let personService: PersonService;

  beforeAll(() => {
    personService = new PersonService(new CsvPersonRepository(), new SqlPersonRepository());
  });

  it("should merge CSV & SQL results", async () => {
    const persons = await personService.getAllPersons();
    expect(persons.length).toBe(16);
  });

  it("should filter persons by name", async () => {
    const persons = await personService.getAllPersons("Ahmed");
    expect(persons.length).toBe(4);
    expect(persons[0]["first name"]).toBe("Ahmed");
  });

  it("should filter persons by country", async () => {
    const persons = await personService.getAllPersons("", "", "", "Egypt");
    expect(persons.length).toBe(9);
    expect(persons.every((p) => p.country === "Egypt")).toBe(true);
  });
});
