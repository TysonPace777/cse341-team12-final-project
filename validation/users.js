const { body, validationResult } = require("express-validator");

const userValidationRules = () => [
  body("firstName")
    .isString()
    .notEmpty()
    .withMessage("firstName must be a string and not empty"),

  body("lastName")
    .isString()
    .notEmpty()
    .withMessage("lastName must be a string and not empty"),

  body("location")
    .isString()
    .notEmpty()
    .withMessage("location must be a string and not empty"),

  body("age")
    .isInt()
    .withMessage("age must be a number"),

  body("language")
    .isString()
    .notEmpty()
    .withMessage("language must be a string and not empty"),

  body("birthMonth")
    .isInt({ min: 1, max: 12 })
    .withMessage("birthMonth must be a number between 1 and 12"),

  body("birthYear")
    .isInt()
    .withMessage("birthYear must be a number")
];

function validateUser(req, res, next) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
}

module.exports = { userValidationRules, validateUser };