const express = require("express");
const router = express.Router();
const utilities = require("../utilities/index");

const eventController = require("../controllers/events");

router.get("/", utilities.handleErrors(eventController.getAll));

router.get("/:id", utilities.handleErrors(eventController.getSingle));

//need validation
router.post("/:id", utilities.handleErrors(eventController.createEvent));
router.put("/:id", utilities.handleErrors(eventController.updateEvent));

router.delete("/:id", utilities.handleErrors(eventController.deleteEvent));

module.exports = router;