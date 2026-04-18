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

// Get all reminders
router.get('/', verifyToken, (req, res) => {
    db.query('SELECT * FROM reminders WHERE user_id = ? ORDER BY reminder_date ASC, reminder_time ASC',
        [req.user_id], (err, results) => {
        if (err) return res.status(500).json({ message: 'Error fetching reminders' });
        res.json(results);
    });
});

// Add reminder
router.post('/add', verifyToken, (req, res) => {
    const { reminder_time, reminder_date } = req.body;
    db.query('INSERT INTO reminders (user_id, reminder_time, reminder_date) VALUES (?, ?, ?)',
        [req.user_id, reminder_time, reminder_date], (err) => {
        if (err) return res.status(500).json({ message: 'Error saving reminder' });
        res.status(201).json({ message: 'Reminder set successfully!' });
    });
});
// Delete reminder
router.delete('/:id', verifyToken, (req, res) => {
    db.query('DELETE FROM reminders WHERE reminder_id = ? AND user_id = ?',
        [req.params.id, req.user_id], (err) => {
        if (err) return res.status(500).json({ message: 'Error deleting reminder' });
        res.json({ message: 'Reminder deleted!' });
    });
});
// Mark reminder as done
router.put('/done/:id', verifyToken, (req, res) => {
    db.query('UPDATE reminders SET reminder_status = "done" WHERE reminder_id = ? AND user_id = ?',
        [req.params.id, req.user_id], (err) => {
        if (err) return res.status(500).json({ message: 'Error updating reminder' });
        res.json({ message: 'Reminder marked as done!' });
    });
});

module.exports = router;
