const express = require("express");
const router = express.Router();

const taskController = require("../controllers/task.controller");
const protect = require("../middlewares/auth.middleware");
const { adminOnly } = require("../middlewares/role.middleware");
const validate = require("../middlewares/validation.middleware");

const {
  respondValidation,
  taskIdValidation
} = require("../validations/task.validation");

router.post(
  "/respond",
  protect,
  respondValidation,
  validate,
  taskController.respondToProject
);

router.get(
  "/project/:projectId",
  protect,
  taskController.getResponsesForProject
);

router.patch(
  "/:id/status",
  protect,
  adminOnly,
  taskIdValidation,
  validate,
  taskController.updateTaskStatus
);

module.exports = router;