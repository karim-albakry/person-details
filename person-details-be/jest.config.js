module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  globalSetup: "./__tests__/setupTestDB.ts",
  globalTeardown: "./__tests__/globalTeardown.ts",
  moduleFileExtensions: ["ts", "js"],
  testMatch: ["**/__tests__/**/*.test.ts"],
  verbose: true,
  setupFilesAfterEnv: ["dotenv/config"]
};
