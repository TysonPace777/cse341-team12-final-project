const request = require("supertest");
const app = require("../server"); // Import app from server.js

describe("GET /events", () => {
    it("should return a list of events", async () => {
        const res = await request(app).get("/events");

        expect(res.statusCode).toBe(200);
        expect(Array.isArray(res.body)).toBe(true);
    });
});
