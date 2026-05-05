import Project from "../Models/Project.models.js";

export const createProject = async (req, res) => {
  try {
    const { title, description } = req.body;

    if (!title) {
      return res.status(400).json({ message: "Title is required" });
    }

    const project = await Project.create({
      title,
      description,
      tasks: [], 
    });

    res.status(201).json({
      success: true,
      project,
    });
  } catch (error) {
    console.error("CREATE PROJECT ERROR:", error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getAllProjects = async (req, res) => {
  try {
    const projects = await Project.find().sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: projects.length,
      projects,
    });
  } catch (error) {
    console.error("GET ALL PROJECTS ERROR:", error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getProjectById = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);

    if (!project) {
      return res.status(404).json({
        success: false,
        message: "Project not found",
      });
    }

    res.status(200).json({
      success: true,
      project,
    });
  } catch (error) {
    console.error("GET PROJECT ERROR:", error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const updateProject = async (req, res) => {
  try {
    const { title, description } = req.body;

    const project = await Project.findByIdAndUpdate(
      req.params.id,
      { title, description },
      { new: true, runValidators: true }
    );

    if (!project) {
      return res.status(404).json({
        success: false,
        message: "Project not found",
      });
    }

    res.status(200).json({
      success: true,
      project,
    });
  } catch (error) {
    console.error("UPDATE PROJECT ERROR:", error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const deleteProject = async (req, res) => {
  try {
    const project = await Project.findByIdAndDelete(req.params.id);

    if (!project) {
      return res.status(404).json({
        success: false,
        message: "Project not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Project deleted successfully",
    });
  } catch (error) {
    console.error("DELETE PROJECT ERROR:", error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const addTask = async (req, res) => {
  try {
    const { title, dueDate } = req.body;

    if (!title || !dueDate) {
      return res.status(400).json({
        message: "Title and due date required",
      });
    }

    const project = await Project.findById(req.params.id);

    if (!project) {
      return res.status(404).json({
        message: "Project not found",
      });
    }

    project.tasks.push({
      title,
      dueDate,
      status: "pending",
    });

    await project.save();

    res.status(200).json({
      success: true,
      project,
    });
  } catch (error) {
    console.error("ADD TASK ERROR:", error);
    res.status(500).json({
      message: error.message,
    });
  }
};

export const updateTaskStatus = async (req, res) => {
  try {
    const { status } = req.body;

    const project = await Project.findById(req.params.projectId);

    if (!project) {
      return res.status(404).json({
        message: "Project not found",
      });
    }

    const task = project.tasks.id(req.params.taskId);

    if (!task) {
      return res.status(404).json({
        message: "Task not found",
      });
    }

    task.status = status;

    await project.save();

    res.status(200).json({
      success: true,
      project,
    });
  } catch (error) {
    console.error("UPDATE TASK ERROR:", error);
    res.status(500).json({
      message: error.message,
    });
  }
};