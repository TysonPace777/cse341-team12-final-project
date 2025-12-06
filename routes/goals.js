const express = require("express");
const router = express.Router();
const utilities = require('../utilities/index');

const goalController = require("../controllers/goals");
const { goalValidationRules, validateGoal } = require('../validation/goals');

router.get("/", utilities.handleErrors(goalController.getAll));

router.get("/:id", utilities.handleErrors(goalController.getSingle));

router.post("/", goalValidationRules(), validateGoal, utilities.handleErrors(goalController.createGoal));

router.put("/:id", goalValidationRules(), validateGoal, utilities.handleErrors(goalController.updateGoal));

router.delete("/:id", utilities.handleErrors(goalController.deleteGoal));

module.exports = router;
