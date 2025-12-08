const express = require("express");
const router = express.Router();
const utilities = require('../utilities/index');

const goalController = require("../controllers/goals");
const { goalValidationRules, validateGoal } = require('../validation/goals');
const { isAuthenticated } = require("../middleware/auth");

router.get("/", utilities.handleErrors(goalController.getAll));

router.get("/:id", utilities.handleErrors(goalController.getSingle));

router.post("/", isAuthenticated, goalValidationRules, validateGoal, utilities.handleErrors(goalController.createGoal));

router.put("/:id", isAuthenticated, goalValidationRules, validateGoal, utilities.handleErrors(goalController.updateGoal));

router.delete("/:id", isAuthenticated, utilities.handleErrors(goalController.deleteGoal));

module.exports = router;
