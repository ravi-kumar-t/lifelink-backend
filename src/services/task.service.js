const Task = require("../models/task.model");
const Project = require("../models/project.model");
const AppError = require("../utils/AppError");

exports.respondToProject = async (projectId, donorId) => {
  const project = await Project.findById(projectId);
  if (!project) {
    throw new Error("Emergency case not found");
  }

  if (project.status !== "Active") {
    throw new Error("Cannot respond to inactive emergency case");
  }

  const existingResponse = await Task.findOne({
    projectId,
    donorId
  });

  if (existingResponse) {
    throw new Error("You have already responded to this emergency");
  }

  const task = await Task.create({
    projectId,
    donorId
  });

  return task;
};

exports.getResponsesForProject = async (projectId) => {
  return await Task.find({ projectId })
    .populate("donorId", "name email bloodGroup")
    .populate("verifiedBy", "name email");
};

exports.updateTaskStatus = async (taskId, status, adminId) => {
  const task = await Task.findById(taskId);

  if (!task) {
    throw new AppError("Response not found", 404);
  }

  task.status = status;
  task.verifiedBy = adminId;

  await task.save();

  return task;
};