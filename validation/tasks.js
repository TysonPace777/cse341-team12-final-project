const { body } = require("express-validator");

const validateTask = [
  body("what")
    .notEmpty().withMessage("what is required.")
    .isString().withMessage("what must be a string."),

  body("amount")
    .notEmpty().withMessage("amount is required.")
    .isNumeric().withMessage("amount must be a number."),

  body("reps")
    .notEmpty().withMessage("reps is required.")
    .isNumeric().withMessage("reps must be a number."),

  body("where")
    .notEmpty().withMessage("where is required.")
    .isString().withMessage("where must be a string."),

  body("day")
    .notEmpty().withMessage("day is required.")
    .isString().withMessage("day must be a string."),

  body("time")
    .notEmpty().withMessage("time is required.")
    .isString().withMessage("time must be a string.")
];

module.exports = validateTask;