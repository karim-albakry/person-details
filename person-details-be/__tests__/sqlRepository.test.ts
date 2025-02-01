import setupTestDatabase from "./utils/setupTestDB";
// import cleanupTestDatabase from "./utils/globalTeardown";

import { SqlPersonRepository } from "../src/repositories/SqlPersonRepository";

describe("SqlPersonRepository (Test DB)", () => {
  let sqlRepo: SqlPersonRepository;

  beforeAll(async () => {
    await setupTestDatabase();
    sqlRepo = new SqlPersonRepository();
  }); 

  // afterAll(async () => {
  //   await cleanupTestDatabase();
  // });

  test("should return persons from the test database", async () => {
    const persons = await sqlRepo.getPersons();
    expect(persons.length).toBeGreaterThan(0);
    expect(persons[0]).toHaveProperty("first name");
  });

  test("should filter persons by name", async () => {
    const persons = await sqlRepo.getPersons("Test User 1");
    expect(persons.length).toBe(1);
    expect(persons[0]["first name"]).toBe("Test");
  });
});
