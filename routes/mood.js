const express = require('express');
const router = express.Router();
const db = require('../config/db');
const jwt = require('jsonwebtoken');

// Middleware to verify token
const verifyToken = (req, res, next) => {
    const token = req.headers['authorization'];
    if (!token) return res.status(403).json({ message: 'No token provided' });
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) return res.status(401).json({ message: 'Unauthorized' });
        req.user_id = decoded.user_id;
        next();
    });
};

// Add mood entry
router.post('/add', verifyToken, (req, res) => {
    const { mood_level, mood_note } = req.body;
    const now = new Date();
    const date = now.toISOString().split('T')[0];
    const time = now.toTimeString().split(' ')[0];

    const sql = 'INSERT INTO mood_records (user_id, mood_level, mood_note, recorded_date, recorded_time) VALUES (?, ?, ?, ?, ?)';
    db.query(sql, [req.user_id, mood_level, mood_note, date, time], (err, result) => {
        if (err) return res.status(500).json({ message: 'Error saving mood' });
        res.status(201).json({ message: 'Mood saved successfully' });
    });
});

// Get all mood entries for a user
router.get('/history', verifyToken, (req, res) => {
    const sql = 'SELECT * FROM mood_records WHERE user_id = ? ORDER BY recorded_date DESC, recorded_time DESC';
    db.query(sql, [req.user_id], (err, results) => {
        if (err) return res.status(500).json({ message: 'Error fetching mood history' });
        res.json(results);
    });
});
// Delete mood entry
router.delete('/:id', verifyToken, (req, res) => {
    const sql = 'DELETE FROM mood_records WHERE record_id = ? AND user_id = ?';
    db.query(sql, [req.params.id, req.user_id], (err, result) => {
        if (err) return res.status(500).json({ message: 'Error deleting mood' });
        if (result.affectedRows === 0) return res.status(404).json({ message: 'Entry not found' });
        res.json({ message: 'Mood entry deleted successfully' });
    });
});

// Update mood note
router.put('/:id', verifyToken, (req, res) => {
    const { mood_note } = req.body;
    const sql = 'UPDATE mood_records SET mood_note = ? WHERE record_id = ? AND user_id = ?';
    db.query(sql, [mood_note, req.params.id, req.user_id], (err, result) => {
        if (err) return res.status(500).json({ message: 'Error updating note' });
        if (result.affectedRows === 0) return res.status(404).json({ message: 'Entry not found' });
        res.json({ message: 'Note updated successfully' });
    });
});
module.exports = router;