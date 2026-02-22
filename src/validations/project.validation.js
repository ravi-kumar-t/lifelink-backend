const { body, param } = require("express-validator");

exports.createProjectValidation = [
  body("title").notEmpty().withMessage("Title is required"),
  body("hospitalName").notEmpty().withMessage("Hospital name is required"),
  body("city").notEmpty().withMessage("City is required"),
  body("requiredBloodGroup")
    .isIn(["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"])
    .withMessage("Invalid blood group"),
  body("unitsRequired")
    .isInt({ min: 1 })
    .withMessage("Units required must be at least 1"),
  body("urgencyLevel")
    .optional()
    .isIn(["Low", "Medium", "High", "Critical"])
    .withMessage("Invalid urgency level")
];

exports.projectIdValidation = [
  param("id").isMongoId().withMessage("Invalid project ID")
];