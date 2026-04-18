const express = require('express');
const router = express.Router();
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

// Get API key securely
router.get('/key', verifyToken, (req, res) => {
    res.json({ key: process.env.GEMINI_API_KEY });
});

module.exports = router;