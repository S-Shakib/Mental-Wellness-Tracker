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

// Get stats
router.get('/stats', verifyToken, (req, res) => {
    const stats = {};
    db.query('SELECT COUNT(*) as count FROM users', (err, r) => {
        stats.totalUsers = r[0].count;
        db.query('SELECT COUNT(*) as count FROM mood_records', (err, r) => {
            stats.totalMoods = r[0].count;
            db.query('SELECT COUNT(*) as count FROM goals', (err, r) => {
                stats.totalGoals = r[0].count;
                db.query('SELECT COUNT(*) as count FROM sticky_notes', (err, r) => {
                    stats.totalNotes = r[0].count;
                    res.json(stats);
                });
            });
        });
    });
});

// Get all users
router.get('/users', verifyToken, (req, res) => {
    db.query('SELECT user_id, name, email, age, gender, created_at FROM users ORDER BY created_at DESC', (err, results) => {
        if (err) return res.status(500).json({ message: 'Error fetching users' });
        res.json(results);
    });
});

// Delete user
router.delete('/users/:id', verifyToken, (req, res) => {
    const id = req.params.id;
    db.query('DELETE FROM sticky_notes WHERE user_id = ?', [id], () => {
        db.query('DELETE FROM mood_records WHERE user_id = ?', [id], () => {
            db.query('DELETE FROM goals WHERE user_id = ?', [id], () => {
                db.query('DELETE FROM reminders WHERE user_id = ?', [id], () => {
                    db.query('DELETE FROM users WHERE user_id = ?', [id], (err) => {
                        if (err) return res.status(500).json({ message: 'Error deleting user' });
                        res.json({ message: 'User deleted successfully!' });
                    });
                });
            });
        });
    });
});

module.exports = router;