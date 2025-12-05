const express = require("express");
const router = express.Router();

const goalController = require("../controllers/goals");
const {isAuthenticated} = require('../middleware/auth')

router.get("/", goalController.getAll);

router.get("/:id", goalController.getSingle);

router.post("/", isAuthenticated, goalController.createGoal);

router.put("/:id", isAuthenticated, goalController.updateGoal);

router.delete("/:id", isAuthenticated, goalController.deleteGoal);

module.exports = router;
