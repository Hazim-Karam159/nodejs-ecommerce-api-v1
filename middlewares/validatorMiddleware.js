const {validationResult } = require("express-validator");

// Middleware to handle validation results if there are any error happened in the rules i put.
const validatorMiddleware =  (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
}

module.exports = validatorMiddleware;