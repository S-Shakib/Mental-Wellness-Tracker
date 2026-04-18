const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const db = require('../config/db');

// Register
router.post('/register', (req, res) => {
    const { name, email, password, age, gender } = req.body;
    const hashedPassword = bcrypt.hashSync(password, 10);

    const sql = 'INSERT INTO users (name, email, password_hash, age, gender) VALUES (?, ?, ?, ?, ?)';
    db.query(sql, [name, email, hashedPassword, age, gender], (err, result) => {
        if (err) { console.error('Register error:', err); return res.status(500).json({ message: err.message }); }
        res.status(201).json({ message: 'User registered successfully' });
    });
});

// Login
router.post('/login', (req, res) => {
    const { email, password } = req.body;

    const sql = 'SELECT * FROM users WHERE email = ?';
    db.query(sql, [email], (err, results) => {
        if (err || results.length === 0) return res.status(401).json({ message: 'Invalid email or password' });

        const user = results[0];
        const isMatch = bcrypt.compareSync(password, user.password_hash);
        if (!isMatch) return res.status(401).json({ message: 'Invalid email or password' });

        const token = jwt.sign({ user_id: user.user_id }, process.env.JWT_SECRET, { expiresIn: '1d' });
        res.json({ token, user_id: user.user_id, name: user.name, is_admin: user.is_admin });
    });
});

module.exports = router;