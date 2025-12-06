const { body, validationResult } = require("express-validator");

const eventValidationRules = () => [
  body("eventName")
    .isString()
    .notEmpty()
    .withMessage("eventName must be a string and not empty"),

  body("location")
    .isString()
    .notEmpty()
    .withMessage("location must be a string and not empty"),

  body("date")
    .isString()
    .notEmpty()
    .withMessage("date must be a string and not empty")
];

function validateEvent(req, res, next) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
}

module.exports = { eventValidationRules, validateEvent };