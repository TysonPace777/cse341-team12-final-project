const request = require("supertest");
const app = require("../server"); // Import app from server.js

describe("GET /users", () => {
    it("should return a list of users", async () => {
        const res = await request(app).get("/users");

        expect(res.statusCode).toBe(200);
        expect(Array.isArray(res.body)).toBe(true);
    });
});
