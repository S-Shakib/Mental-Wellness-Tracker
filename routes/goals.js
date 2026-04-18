const express = require('express');
const router = express.Router();
const db = require('../config/db');
const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
    const token = req.headers['authorization'];
    if (!token) return res.status(403).json({ message: 'No token provided' });
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) return res.status(401).json({ message: 'Unauthorized' });
        req.user_id = decoded.user_id;
        next();
    });
};

// Get all goals
router.get('/', verifyToken, (req, res) => {
    db.query('SELECT * FROM goals WHERE user_id = ? ORDER BY created_at DESC', [req.user_id], (err, results) => {
        if (err) return res.status(500).json({ message: 'Error fetching goals' });
        res.json(results);
    });
});

// Add goal
router.post('/add', verifyToken, (req, res) => {
    const { title, description, target_days, category } = req.body;
    db.query('INSERT INTO goals (user_id, title, description, target_days, category) VALUES (?, ?, ?, ?, ?)',
        [req.user_id, title, description, target_days, category], (err) => {
        if (err) return res.status(500).json({ message: 'Error saving goal' });
        res.status(201).json({ message: 'Goal added successfully!' });
    });
});

// Update goal progress
router.put('/update/:id', verifyToken, (req, res) => {
    db.query('UPDATE goals SET current_days = current_days + 1, status = IF(current_days + 1 >= target_days, "completed", "active") WHERE goal_id = ? AND user_id = ?',
        [req.params.id, req.user_id], (err) => {
        if (err) return res.status(500).json({ message: 'Error updating goal' });
        res.json({ message: 'Goal progress updated!' });
    });
});

// Delete goal
router.delete('/:id', verifyToken, (req, res) => {
    db.query('DELETE FROM goals WHERE goal_id = ? AND user_id = ?', [req.params.id, req.user_id], (err) => {
        if (err) return res.status(500).json({ message: 'Error deleting goal' });
        res.json({ message: 'Goal deleted!' });
    });
});

module.exports = router;