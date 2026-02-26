const Project = require("../models/project.model");
const Task = require("../models/task.model");

exports.createProject = async (data, userId) => {
  const project = await Project.create({
    ...data,
    createdBy: userId
  });

  return project;
};

exports.getAllProjects = async (currentUserId = null) => {
  const projects = await Project.find({ status: "Active" }).populate(
    "createdBy",
    "name email phone"
  );

  const projectsWithMeta = await Promise.all(
    projects.map(async (project) => {
      const count = await Task.countDocuments({ projectId: project._id });
      const obj = project.toObject();
      obj.responseCount = count;

      if (currentUserId) {
        const existing = await Task.findOne({
          projectId: project._id,
          donorId: currentUserId
        });
        obj.hasUserResponded = !!existing;
      } else {
        obj.hasUserResponded = false;
      }

      return obj;
    })
  );

  return projectsWithMeta;
};

exports.getProjectById = async (id, currentUserId = null) => {
  const project = await Project.findById(id).populate(
    "createdBy",
    "name email phone"
  );

  if (!project) {
    throw new Error("Project not found");
  }

  let hasUserResponded = false;
  if (currentUserId) {
    const existing = await Task.findOne({ projectId: id, donorId: currentUserId });
    hasUserResponded = !!existing;
  }

  const projectObj = project.toObject();
  projectObj.hasUserResponded = hasUserResponded;

  return projectObj;
};

exports.closeProject = async (id) => {
  const project = await Project.findById(id);

  if (!project) {
    throw new Error("Project not found");
  }

  project.status = "Closed";
  await project.save();

  return project;
};