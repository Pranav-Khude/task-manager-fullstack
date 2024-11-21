// src/components/Dashboard/AddTask.js
import React, { useState } from 'react';
import axiosInstance from '../../api/axiosConfig';
import { API_ENDPOINTS } from '../../api/apiEndpoints';
import { validateTaskInput } from '../../utils/validators';
import { FaPlus, FaCalendar } from 'react-icons/fa';

const AddTask = ({ onTaskAdded }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    dueDate: '',
    completed: false
  });
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate input
    const { isValid, errors } = validateTaskInput(formData.title, formData.description);
    if (!isValid) {
      setError(Object.values(errors)[0]);
      return;
    }

    try {
      await axiosInstance.post(API_ENDPOINTS.TASKS.CREATE, formData);
      setFormData({ title: '', description: '', dueDate: '', completed: false });
      onTaskAdded();
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to add task');
      console.error('Add task error:', err);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <div className="add-task-container">
      <form onSubmit={handleSubmit} className="add-task-form">
        <div className="form-group">
          <input
            type="text"
            name="title"
            placeholder="Task Title"
            value={formData.title}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <textarea
            name="description"
            placeholder="Task Description"
            value={formData.description}
            onChange={handleChange}
          />
        </div>
        <div className="form-group date-group">
          <FaCalendar className="calendar-icon" />
          <label htmlFor="">Due Date</label>
          <input
            type="date"
            name="dueDate"
            value={formData.dueDate}
            onChange={handleChange}
          />
        </div>
        <button type="submit" className="add-btn">
          <FaPlus /> Add Task
        </button>
      </form>
    </div>
  );
};

export default AddTask;