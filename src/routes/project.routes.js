const express = require("express");
const router = express.Router();

const projectController = require("../controllers/project.controller");
const protect = require("../middlewares/auth.middleware");
const { adminOnly } = require("../middlewares/role.middleware");
const validate = require("../middlewares/validation.middleware");

const {
  createProjectValidation,
  projectIdValidation
} = require("../validations/project.validation");

router.post(
  "/",
  protect,
  createProjectValidation,
  validate,
  projectController.createProject
);

router.get(
  "/",
  protect,
  projectController.getAllProjects
);

router.get(
  "/:id",
  protect,
  projectIdValidation,
  validate,
  projectController.getProjectById
);

router.patch(
  "/:id/close",
  protect,
  adminOnly,
  projectIdValidation,
  validate,
  projectController.closeProject
);

module.exports = router;