const projectService = require("../services/project.service");

exports.createProject = async (req, res) => {
  try {
    const project = await projectService.createProject(req.body, req.user.id);
    res.status(201).json(project);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.getAllProjects = async (req, res) => {
  try {
    // Pass current user ID so service can flag which projects they responded to
    const projects = await projectService.getAllProjects(req.user?.id);
    res.status(200).json(projects);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.getProjectById = async (req, res) => {
  try {
    // Pass current user ID so service can check hasUserResponded
    const project = await projectService.getProjectById(
      req.params.id,
      req.user?.id
    );
    res.status(200).json(project);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

exports.closeProject = async (req, res) => {
  try {
    const project = await projectService.closeProject(
      req.params.id,
      req.user.role
    );
    res.status(200).json(project);
  } catch (error) {
    res.status(403).json({ message: error.message });
  }
};