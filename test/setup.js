// tests/setup.js
const mongodb = require("../data/database");

// Increase Jest timeout for slow DB connection
jest.setTimeout(30000);

beforeAll(async () => {
  process.env.NODE_ENV = "test"; // Ensure test environment

  // Initialize DB
  await new Promise((resolve, reject) => {
    mongodb.initDb((err) => {
      if (err) reject(err);
      else resolve();
    });
  });
});

afterAll(async () => {
  // Close MongoDB connection after all tests
  const client = mongodb.getDatabase();
  await client.close();
});
