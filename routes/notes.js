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

// Get all notes
router.get('/', verifyToken, (req, res) => {
    db.query('SELECT * FROM sticky_notes WHERE user_id = ? ORDER BY created_at DESC', [req.user_id], (err, results) => {
        if (err) return res.status(500).json({ message: 'Error fetching notes' });
        res.json(results);
    });
});

// Add note
router.post('/add', verifyToken, (req, res) => {
    const { title, content, color } = req.body;
    db.query('INSERT INTO sticky_notes (user_id, title, content, color) VALUES (?, ?, ?, ?)',
        [req.user_id, title, content, color || 'yellow'], (err, result) => {
        if (err) return res.status(500).json({ message: 'Error saving note' });
        res.status(201).json({ message: 'Note saved!' });
    });
});

// Delete note
router.delete('/:id', verifyToken, (req, res) => {
    db.query('DELETE FROM sticky_notes WHERE note_id = ? AND user_id = ?', [req.params.id, req.user_id], (err) => {
        if (err) return res.status(500).json({ message: 'Error deleting note' });
        res.json({ message: 'Note deleted!' });
    });
});

module.exports = router;