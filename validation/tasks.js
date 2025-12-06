const { body, validationResult } = require("express-validator");

const taskValidationRules = [
  body("what").isString().notEmpty().withMessage("what must be a string and not empty"),
  body("amount").isInt().withMessage("amount must be a number"),
  body("reps").isInt().withMessage("reps must be a number"),
  body("where").isString().notEmpty().withMessage("where must be a string and not empty"),
  body("day").isString().notEmpty().withMessage("day must be a string and not empty"),
  body("time").isString().notEmpty().withMessage("time must be a string and not empty")
];

function validateTask(req, res, next) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
}

module.exports = { taskValidationRules, validateTask };