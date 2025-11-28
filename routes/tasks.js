const express = require("express");
const router = express.Router();
const utilities = require("../utilities/index");

const taskController = require("../controllers/tasks");

router.get("/", utilities.handleErrors(taskController.getAll));
router.get("/:id", utilities.handleErrors(taskController.getSingle));
router.post("/", utilities.handleErrors(taskController.createTask));
router.put("/:id", utilities.handleErrors(taskController.updateTask));
router.delete("/:id", utilities.handleErrors(taskController.deleteTask));

module.exports = router;
