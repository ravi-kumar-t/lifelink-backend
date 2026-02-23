const { body, param } = require("express-validator");

exports.respondValidation = [
  body("projectId")
    .notEmpty()
    .withMessage("Project ID is required")
    .isMongoId()
    .withMessage("Invalid project ID")
];

exports.taskIdValidation = [
  param("id").isMongoId().withMessage("Invalid task ID")
];