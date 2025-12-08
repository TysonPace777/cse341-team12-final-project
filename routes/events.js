const express = require("express");
const router = express.Router();
const utilities = require("../utilities/index");

const eventController = require("../controllers/events");
const { eventValidationRules, validateEvent } = require('../validation/events');
const { isAuthenticated } = require("../middleware/auth");

router.get("/", utilities.handleErrors(eventController.getAll));

router.get("/:id", utilities.handleErrors(eventController.getSingle));

router.post("/", isAuthenticated,eventValidationRules, validateEvent, utilities.handleErrors(eventController.createEvent));
router.put("/:id", isAuthenticated,eventValidationRules, validateEvent, utilities.handleErrors(eventController.updateEvent));

router.delete("/:id", utilities.handleErrors(eventController.deleteEvent));

module.exports = router;