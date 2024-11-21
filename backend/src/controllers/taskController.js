const Task = require('../models/taskModel');

exports.getTasks = async (req, res, next) => {
  try {
    const tasks = await Task.find({ user: req.user.userId });
    res.json(tasks);
  } catch (err) {
    next(err);
  }
};

// backend/src/controllers/taskController.js
exports.addTask = async (req, res, next) => {
  try {
    const { title, description, dueDate, completed } = req.body;
    
    if (!title || !description) {
      return res.status(400).json({ 
        message: 'Title and description are required' 
      });
    }

    const task = new Task({
      user: req.user.userId,
      title,
      description,
      dueDate: dueDate || null,
      completed: completed || false
    });

    const savedTask = await task.save();
    res.status(201).json(savedTask);
  } catch (err) {
    next(err);
  }
};


// Delete a task
// backend/src/controllers/taskController.js
exports.deleteTask = async (req, res, next) => {
  try {
    const { id } = req.params;
    
    // Validate id format
    if (!id.match(/^[0-9a-fA-F]{24}$/)) {
      return res.status(400).json({ message: 'Invalid task ID format' });
    }

    // Find and delete task in one operation, ensuring user owns the task
    const deletedTask = await Task.findOneAndDelete({
      _id: id,
      user: req.user.userId
    });

    // Handle task not found
    if (!deletedTask) {
      return res.status(404).json({ 
        message: 'Task not found or you do not have permission to delete it'
      });
    }

    // Return success response
    res.status(200).json({
      success: true,
      message: 'Task deleted successfully',
      taskId: id
    });

  } catch (err) {
    if (err.name === 'CastError') {
      return res.status(400).json({ message: 'Invalid task ID format' });
    }
    console.error('Delete task error:', err);
    next(err);
  }
};

// Update a task
exports.updateTask = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { title, description, dueDate, completed } = req.body;

    const task = await Task.findOneAndUpdate(
      { _id: id, user: req.user.userId },
      { title, description, dueDate, completed },
      { new: true, runValidators: true }
    );

    if (!task) {
      return res.status(404).json({ 
        message: 'Task not found or you do not have permission to update it' 
      });
    }

    res.json({ message: 'Task updated successfully', task });
  } catch (err) {
    if (err.name === 'ValidationError') {
      return res.status(400).json({ message: err.message });
    }
    next(err);
  }
};