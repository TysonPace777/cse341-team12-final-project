require("./setup");
const request = require("supertest");
const app = require("../server");
const mongodb = require("../data/database");

describe("TASK GET endpoints", () => {
  test("GET /tasks returns an array", async () => {
    const res = await request(app).get("/tasks");
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  test("GET /tasks/:id returns 404 for invalid id", async () => {
    const res = await request(app).get("/tasks/12345");
    expect(res.statusCode).toBe(404);
  });
});
