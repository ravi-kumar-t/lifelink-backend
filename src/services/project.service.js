const Project = require("../models/project.model");

exports.createProject = async (data, userId) => {
  const project = await Project.create({
    ...data,
    createdBy: userId
  });

  return project;
};

exports.getAllProjects = async () => {
  return await Project.find({ status: "Active" }).populate(
    "createdBy",
    "name email"
  );
};

exports.getProjectById = async (id) => {
  const project = await Project.findById(id).populate(
    "createdBy",
    "name email"
  );

  if (!project) {
    throw new Error("Project not found");
  }

  return project;
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