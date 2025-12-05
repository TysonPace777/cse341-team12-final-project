const { body } = require("express-validator");

const validateUser = [
  body("firstName")
    .notEmpty().withMessage("firstName is required.")
    .isString().withMessage("firstName must be a string."),

  body("lastName")
    .notEmpty().withMessage("lastName is required.")
    .isString().withMessage("lastName must be a string."),

  body("location")
    .notEmpty().withMessage("location is required.")
    .isString().withMessage("location must be a string."),

  body("age")
    .notEmpty().withMessage("age is required.")
    .isNumeric().withMessage("age must be a number."),

  body("language")
    .notEmpty().withMessage("language is required.")
    .isString().withMessage("language must be a string."),

  body("birthMonth")
    .notEmpty().withMessage("birthMonth is required.")
    .isNumeric().withMessage("birthMonth must be a number."),

  body("birthYear")
    .notEmpty().withMessage("birthYear is required.")
    .isNumeric().withMessage("birthYear must be a number.")
];

module.exports = validateUser;