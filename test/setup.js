// tests/setup.js
const mongodb = require("../data/database");

beforeAll(async () => {
  process.env.NODE_ENV = "test";

  await new Promise((resolve, reject) => {
    mongodb.initDb((err) => {
      if (err) reject(err);
      else resolve();
    });
  });
});

afterEach(async () => {
  const db = mongodb.getDatabase().db();

  await db.collection("events").deleteMany({});
  await db.collection("goals").deleteMany({});
  await db.collection("tasks").deleteMany({});
  await db.collection("user").deleteMany({});
});

afterAll(async () => {
  const client = mongodb.getDatabase();
  await client.close();
});
