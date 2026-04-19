const express = require('express');
const path = require('path');
const authMiddleware = require('../middleware/auth');
const User = require('../models/User');

const router = express.Router();

const flexibleAuth = async (req, res, next) => {
    let token = req.headers['authorization'];
    
    if (!token && req.query.token) {
        token = `Bearer ${req.query.token}`;
        req.headers['authorization'] = token;
    }
    
    authMiddleware(req, res, next);
};

router.get('/play', flexibleAuth, (req, res) => {
    try {
        const filePath = path.join(__dirname, '../lagu/lagu.mp3');
        res.sendFile(filePath);
    } catch (err) {
        console.error('Music play error:', err);
        return res.status(500).json({ error: 'Failed to play music.' });
    }
});

router.get('/list', authMiddleware, (req, res) => {
    try {
        return res.status(200).json({
            songs: [
                {
                    id: 1,
                    title: 'Default Song',
                    filename: 'lagu.mp3',
                    url: '/api/music/play'
                }
            ]
        });
    } catch (err) {
        console.error('Music list error:', err);
        return res.status(500).json({ error: 'Failed to fetch music list.' });
    }
});

module.exports = router;
