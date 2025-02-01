import request from "supertest";
import app from "../src/server";
import test from "node:test";

describe("Person API (HTTP Requests)", () => {
  it("should return a list of persons", async () => {
    const res = await request(app).get("/api/person-details");
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  it("should filter persons by name", async () => {
    const res = await request(app).get("/api/person-details?name=Ahmed");
    expect(res.status).toBe(200);
    expect(res.body.length).toBeGreaterThan(0);
    expect(res.body[0]["first name"]).toContain("Ahmed");
  });

  it("should return empty if no match found", async () => {
    const res = await request(app).get("/api/person-details?name=Unknown");
    expect(res.status).toBe(200);
    expect(res.body.length).toBe(0);
  });

  it("should return only matching persons when multiple filters are applied", async () => {
    const res = await request(app).get("/api/person-details?name=Ahmed&country=Egypt");
    expect(res.status).toBe(200);
    expect(res.body.length).toBeGreaterThan(0);
    expect(res.body[0]["first name"]).toContain("Ahmed");
    expect(res.body.every((p: { country: string }) => p.country === "Egypt")).toBe(true);
  });

  it("should return empty if no match found", async () => {
    const res = await request(app).get("/api/person-details?name=!@#$%^");
    expect(res.status).toBe(200);
    expect(res.body.length).toBe(0);
  });

  it("should filter persons by name (trim spaces)", async () => {
    const res = await request(app).get("/api/person-details?name= Ahmed");
    expect(res.status).toBe(200);
    expect(res.body.length).toBeGreaterThan(0);
    expect(res.body.every((p: { "first name": string , "last name": string}) => p["first name"] === "Ahmed" || p["last name"] === "Ahmed")).toBe(true);
  });
});