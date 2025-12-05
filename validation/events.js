const { body } = require("express-validator");

const validateEvent = [
  body("eventName")
    .notEmpty().withMessage("eventName is required.")
    .isString().withMessage("eventName must be a string."),

  body("location")
    .notEmpty().withMessage("location is required.")
    .isString().withMessage("location must be a string."),

  body("date")
    .notEmpty().withMessage("date is required.")
    .isString().withMessage("date must be a string.")
];

module.exports = validateEvent;