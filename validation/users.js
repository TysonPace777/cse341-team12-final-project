const { body, validationResult } = require("express-validator");

const userValidationRules = [
  body("username").isString().notEmpty().withMessage("username must be a string and not empty"),
  body("displayName").isString().notEmpty().withMessage("displayName must be a string and not empty"),
  body("profileUrl").isString().notEmpty().withMessage("profileUrl must be a string and not empty"),
];

function validateUser(req, res, next) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
}

module.exports = { userValidationRules, validateUser };