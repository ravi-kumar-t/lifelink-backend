const taskService = require("../services/task.service");

exports.respondToProject = async (req, res) => {
  try {
    const task = await taskService.respondToProject(
      req.body.projectId,
      req.user.id
    );

    res.status(201).json(task);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.getResponsesForProject = async (req, res) => {
  try {
    const responses = await taskService.getResponsesForProject(
      req.params.projectId
    );

    res.status(200).json(responses);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.updateTaskStatus = async (req, res) => {
  try {
    const task = await taskService.updateTaskStatus(
      req.params.id,
      req.body.status,
      req.user.id,
      req.user.role
    );

    res.status(200).json(task);
  } catch (error) {
    res.status(403).json({ message: error.message });
  }
};