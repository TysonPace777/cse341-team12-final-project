const express = require("express");
const router = express.Router();
const utilities = require("../utilities/index");
const {isAuthenticated} = require('../middleware/auth')

const taskController = require("../controllers/tasks");
const { taskValidationRules, validateTask } = require('../validation/tasks');

router.get("/:id", utilities.handleErrors(taskController.getSingle));
router.get("/", utilities.handleErrors(taskController.getAll));

router.post("/", isAuthenticated, taskValidationRules(), validateTask, utilities.handleErrors(taskController.createTask));

router.put("/:id", isAuthenticated, taskValidationRules(), validateTask, utilities.handleErrors(taskController.updateTask));

router.delete("/:id", isAuthenticated, utilities.handleErrors(taskController.deleteTask));

module.exports = router;
