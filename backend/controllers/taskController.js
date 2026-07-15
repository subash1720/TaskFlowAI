const Task = require("../models/Task");

// Helper to parse dates safely from different formats
const parseSafeDate = (dateStr) => {
  if (!dateStr || typeof dateStr !== 'string' || dateStr.trim() === '') {
    return null;
  }

  // 1. Try standard JS Date parsing
  let date = new Date(dateStr);
  if (!isNaN(date.getTime())) {
    return date;
  }

  // 2. Try DD-MM-YYYY format
  const matchDashes = dateStr.trim().match(/^(\d{1,2})-(\d{1,2})-(\d{4})$/);
  if (matchDashes) {
    const day = parseInt(matchDashes[1], 10);
    const month = parseInt(matchDashes[2], 10) - 1; // 0-based
    const year = parseInt(matchDashes[3], 10);
    date = new Date(year, month, day);
    if (!isNaN(date.getTime())) {
      return date;
    }
  }

  // 3. Try DD/MM/YYYY format
  const matchSlashes = dateStr.trim().match(/^(\d{1,2})\/(\d{1,2})\/(\d{4})$/);
  if (matchSlashes) {
    const day = parseInt(matchSlashes[1], 10);
    const month = parseInt(matchSlashes[2], 10) - 1; // 0-based
    const year = parseInt(matchSlashes[3], 10);
    date = new Date(year, month, day);
    if (!isNaN(date.getTime())) {
      return date;
    }
  }

  return null;
};

// Create Task
const createTask = async (req, res) => {
  try {
    const { title, description, priority, status, dueDate } = req.body;

    const parsedDueDate = parseSafeDate(dueDate);

    const task = await Task.create({
      title,
      description,
      priority,
      status,
      dueDate: parsedDueDate,
      user: req.user.id,
    });

    res.status(201).json({
      message: "Task Created Successfully",
      task,
    });

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Get All Tasks
const getTasks = async (req, res) => {
  try {
    const tasks = await Task.find({
      user: req.user.id,
    }).sort({ createdAt: -1 });

    res.status(200).json({
      tasks,
    });

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Update Task
const updateTask = async (req, res) => {
  try {
    const updateData = { ...req.body };

    if (updateData.hasOwnProperty('dueDate')) {
      updateData.dueDate = parseSafeDate(updateData.dueDate);
    }

    const updatedTask = await Task.findByIdAndUpdate(
      req.params.id,
      updateData,
      {
        returnDocument: "after",
        runValidators: true,
      }
    );

    if (!updatedTask) {
      return res.status(404).json({
        message: "Task not found",
      });
    }

    res.status(200).json({
      message: "Task Updated Successfully",
      task: updatedTask,
    });

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Delete Task
const deleteTask = async (req, res) => {
  try {

    const deletedTask = await Task.findByIdAndDelete(req.params.id);

    if (!deletedTask) {
      return res.status(404).json({
        message: "Task not found",
      });
    }

    res.status(200).json({
      message: "Task Deleted Successfully",
    });

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  createTask,
  getTasks,
  updateTask,
  deleteTask,
};