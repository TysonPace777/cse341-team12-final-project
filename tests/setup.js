const mongodb = require("../data/database");

beforeAll(() => {
    return new Promise((resolve, reject) => {
        mongodb.initDb((err) => {
            if (err) {
                return reject(err);
            }
            // console.log("Test DB initialized"); // Remove logging to avoid warnings
            resolve();
        });
    });
});
