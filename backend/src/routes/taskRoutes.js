// src/routes/taskRoutes.js
const express = require('express');
const { getTasks, addTask, updateTask, deleteTask } = require('../controllers/taskController');
const authMiddleware = require('../middlewares/authMiddleware');

const router = express.Router();

router.get('/', authMiddleware, getTasks);
router.post('/', authMiddleware, addTask);
router.put('/:id', authMiddleware, updateTask); // Route to update a task
router.delete('/:id', authMiddleware, deleteTask); // Route to delete a task

module.exports = router;
