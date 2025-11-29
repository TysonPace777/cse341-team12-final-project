const express = require("express");
const router = express.Router();
const utilities = require("../utilities/index");

const taskController = require("../controllers/tasks");

router.get("/:id", utilities.handleErrors(taskController.getSingle));
router.get("/", utilities.handleErrors(taskController.getAll));

router.post("/", utilities.handleErrors(taskController.createTask));

router.delete("/:id", utilities.handleErrors(taskController.deleteTask));

module.exports = router;
