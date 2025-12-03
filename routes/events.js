const express = require("express");
const router = express.Router();
const utilities = require("../utilities/index");

const eventController = require("../controllers/events");

router.get("/", utilities.handleErrors(eventController.getAll));

router.get("/:id", utilities.handleErrors(eventController.getSingle));


module.exports = router;