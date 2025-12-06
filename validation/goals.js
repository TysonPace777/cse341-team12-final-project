const { body, validationResult } = require("express-validator");

const goalValidationRules = () => [
  body("what")
    .isString()
    .notEmpty()
    .withMessage("what must be a string and not empty"),

  body("time")
    .isString()
    .notEmpty()
    .withMessage("time must be a string and not empty")
];

function validateGoal(req, res, next) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
}

module.exports = { goalValidationRules, validateGoal };