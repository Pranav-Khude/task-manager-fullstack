import React, { useState, useEffect, useCallback } from "react";
import axiosInstance from "../../api/axiosConfig";
import { API_ENDPOINTS } from "../../api/apiEndpoints";
import { handleApiError } from "../../utils/errorHandler";
import AddTask from "./AddTask";
import TaskList from "./TaskList";
import "../../styles/Dashboard.css";
import { FaTasks, FaPlus } from 'react-icons/fa';

const Dashboard = () => {
  const [tasks, setTasks] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  const fetchTasks = useCallback(async () => {
    try {
      setLoading(true);
      console.log('Fetching tasks...');
      console.log(API_ENDPOINTS.TASKS.GET_ALL);

      const response = await axiosInstance.get(API_ENDPOINTS.TASKS.GET_ALL);
      setTasks(response.data);
      setError("");
    } catch (err) {
      const errorMessage = handleApiError(err);
      setError(errorMessage);
      console.error("Fetch tasks error:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  const toggleComplete = async (taskId, completed) => {
    try {
      await axiosInstance.put(API_ENDPOINTS.TASKS.UPDATE(taskId), {
        completed: !completed,
      });
      await fetchTasks();
    } catch (err) {
      const errorMessage = handleApiError(err);
      setError(errorMessage);
      console.error("Toggle complete error:", err);
    }
  };

  // frontend/src/components/Dashboard/Dashboard.js
  const deleteTask = async (taskId) => {
    console.log('Attempting to delete task:', taskId);
    try {
      await axiosInstance.delete(API_ENDPOINTS.TASKS.DELETE(taskId));
      console.log('Successfully deleted task:', taskId);
      setTasks((currentTasks) =>
        currentTasks.filter((task) => task._id !== taskId)
      );
      setError("");
    } catch (err) {
      console.log('Failed to delete task:', taskId, err);
      const errorMessage = handleApiError(err);
      setError(errorMessage);
      console.error("Delete task error:", err);
      await fetchTasks();
    }
  };

  // src/components/Dashboard/Dashboard.js
const handleUpdateTask = async (updatedTask) => {
  if (!updatedTask?._id) {
    console.error('No task ID provided for update');
    setError('Invalid task update request');
    return;
  }

  try {
    const response = await axiosInstance.put(
      API_ENDPOINTS.TASKS.UPDATE(updatedTask._id),
      {
        title: updatedTask.title,
        description: updatedTask.description,
        completed: updatedTask.completed
      }
    );
    
    if (response.data?.task) {
      setTasks(currentTasks => 
        currentTasks.map(task => 
          task._id === updatedTask._id ? response.data.task : task
        )
      );
      setError('');
    }
  } catch (err) {
    const errorMessage = handleApiError(err);
    setError(errorMessage);
    console.error('Update task error:', err);
  }
};

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  if (loading) {
    return (
      <div className="dashboard">
        <div className="dashboard-content">
          <div className="loading">Loading tasks...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <div className="header-title">
          <FaTasks className="header-icon" />
          <h1>Your Tasks</h1>
        </div>
      </div>
      <div className="dashboard-content">
        {error && <div className="error-message">{error}</div>}
        <AddTask onTaskAdded={fetchTasks} />
        <TaskList
          tasks={tasks}
          onToggleComplete={toggleComplete}
          onDeleteTask={deleteTask}
          onUpdateTask={handleUpdateTask}
        />
      </div>
    </div>
  );
};

export default Dashboard;