require("./setup");
const request = require("supertest");
const app = require("../server");
const mongodb = require("../data/database");

describe("USER GET endpoints", () => {
  test("GET /users returns an array", async () => {
    const res = await request(app).get("/users");
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  test("GET /users/:id returns 404 for invalid id", async () => {
    const res = await request(app).get("/users/12345");
    expect(res.statusCode).toBe(404);
  });
});
