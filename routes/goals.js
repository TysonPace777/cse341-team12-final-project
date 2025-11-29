const express = require("express");
const router = express.Router();

const GoalController = require("../controllers/goals");

router.get("/", GoalController.getAll);

router.get("/:id", GoalController.getSingle);

router.post("/", GoalController.createGoal);

router.put("/:id", GoalController.updateGoal);

router.delete("/:id", GoalController.deleteGoal);

module.exports = router;
