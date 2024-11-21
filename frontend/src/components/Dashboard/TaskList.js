// src/components/Dashboard/TaskList.js
import React, { useState } from "react";
import "../../styles/TaskList.css";
import { FaCheck, FaTrash, FaEdit, FaClock } from "react-icons/fa";

const ConfirmDialog = ({ isOpen, onClose, onConfirm }) => {
  if (!isOpen) return null;

  return (
    <div className="confirm-dialog-overlay">
      <div className="confirm-dialog">
        <h3>Delete Task?</h3>
        <p>
          Are you sure you want to delete this task? This action cannot be
          undone.
        </p>
        <div className="confirm-dialog-buttons">
          <button onClick={onClose} className="cancel-btn">
            Cancel
          </button>
          <button onClick={onConfirm} className="delete-btn">
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

const EditTaskDialog = ({ isOpen, task, onClose, onSave }) => {
  const [editedTask, setEditedTask] = useState(
    task || { title: "", description: "" }
  );

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await onSave({
        _id: task._id, // Ensure we pass the ID
        title: editedTask.title,
        description: editedTask.description,
        completed: editedTask.completed,
      });
      onClose();
    } catch (error) {
      console.error("Error updating task:", error);
    }
  };

  return (
    <div className="edit-dialog-overlay">
      <div className="edit-dialog">
        <form onSubmit={handleSubmit}>
          <h2>Edit Task</h2>
          <div className="form-group">
            <input
              type="text"
              value={editedTask.title}
              onChange={(e) =>
                setEditedTask({ ...editedTask, title: e.target.value })
              }
              placeholder="Task Title"
              required
            />
          </div>
          <div className="form-group">
            <textarea
              value={editedTask.description}
              onChange={(e) =>
                setEditedTask({ ...editedTask, description: e.target.value })
              }
              placeholder="Task Description"
              rows="4"
              required
            />
          </div>
          <div className="dialog-buttons">
            <button type="button" onClick={onClose} className="cancel-btn">
              Cancel
            </button>
            <button type="submit" className="save-btn">
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

const TaskList = ({ tasks, onToggleComplete, onDeleteTask, onUpdateTask }) => {
  const [deleteTaskId, setDeleteTaskId] = useState(null);
  const [editingTask, setEditingTask] = useState(null);

  const handleDelete = (taskId) => {
    setDeleteTaskId(taskId);
  };

  const confirmDelete = () => {
    if (deleteTaskId) {
      onDeleteTask(deleteTaskId);
      setDeleteTaskId(null);
    }
  };

  return (
    <div className="task-list">
      {tasks.length === 0 ? (
        <p>No tasks found. Add a new task!</p>
      ) : (
        <div className="tasks-grid">
          {tasks.map((task) => (
            <div key={task._id} className="task-card">
              <div className="task-content">
                <div className="task-header">
                  <h3>{task.title}</h3>
                  <div className="task-actions">
                    <button
                      className={`complete-btn ${
                        task.completed ? "completed" : ""
                      }`}
                      onClick={() => onToggleComplete(task._id)}
                    >
                      <FaCheck />
                    </button>
                    <button
                      className="edit-btn"
                      onClick={() => {
                        console.log("Edit button clicked", task); // Add this debug log
                        setEditingTask(task);
                      }}
                    >
                      <FaEdit />
                    </button>
                    <button
                      className="delete-btn"
                      onClick={() => handleDelete(task._id)} // Changed from onDeleteTask to handleDelete
                    >
                      <FaTrash />
                    </button>
                  </div>
                </div>
                <p className="task-description">{task.description}</p>
                <div className="task-footer">
                  <span className="task-date">
                    <FaClock /> {new Date(task.dueDate).toLocaleDateString()}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
      <ConfirmDialog
        isOpen={!!deleteTaskId}
        onClose={() => setDeleteTaskId(null)}
        onConfirm={confirmDelete}
      />
      <EditTaskDialog
        isOpen={!!editingTask}
        task={editingTask}
        onClose={() => setEditingTask(null)}
        onSave={onUpdateTask}
      />
    </div>
  );
};

export default TaskList;
