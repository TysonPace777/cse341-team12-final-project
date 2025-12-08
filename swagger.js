const swaggerAutogen = require("swagger-autogen")();

const doc = {
    info: {
        title: "Team 12 API",
        description: "planner api",
    },
    host: "cse341-team12-final-project.onrender.com",
    schemes: ["https"],
};

const outputFile = "./swagger-output.json";
const endpointsFiles = ["./routes/index.js"];

/* NOTE: If you are using the express Router, you must pass in the 'routes' only the 
root file where the route starts, such as index.js, app.js, routes.js, etc ... */

swaggerAutogen(outputFile, endpointsFiles, doc);
