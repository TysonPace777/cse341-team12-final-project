require("./setup");
const request = require("supertest");
const app = require("../server");
const mongodb = require("../data/database");

describe("GOAL GET endpoints", () => {
  test("GET /goals returns an array", async () => {
    const res = await request(app).get("/goals");
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  test("GET /goals/:id returns 404 for invalid id", async () => {
    const res = await request(app).get("/goals/12345");
    expect(res.statusCode).toBe(404);
  });
});
