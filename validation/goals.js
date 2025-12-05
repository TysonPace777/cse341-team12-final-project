const { body } = require("express-validator");

const validateGoal = [
  body("what")
    .notEmpty().withMessage("what is required.")
    .isString().withMessage("what must be a string."),

  body("time")
    .notEmpty().withMessage("time is required.")
    .isString().withMessage("time must be a string.")
];

module.exports = validateGoal;