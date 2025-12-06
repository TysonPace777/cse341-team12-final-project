const request = require("supertest");
const app = require("../server"); // Import app from server.js

describe("GET /tasks", () => {
    it("should return a list of tasks", async () => {
        const res = await request(app).get("/tasks");

        expect(res.statusCode).toBe(200);
        expect(Array.isArray(res.body)).toBe(true);
    });
});
