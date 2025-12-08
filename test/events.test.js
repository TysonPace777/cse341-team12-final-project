require("./setup");
const request = require("supertest");
const app = require("../server");
const mongodb = require("../data/database");

describe("EVENT GET endpoints", () => {
  test("GET /events returns an array", async () => {
    const res = await request(app).get("/events");
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  test("GET /events/:id returns 404 for invalid id", async () => {
    const res = await request(app).get("/events/12345");
    expect(res.statusCode).toBe(404);
  });
});
