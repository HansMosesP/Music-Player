const express = require('express');
const User = require('../models/User');
const router = express.Router();

router.get('/:_username', async (req, res) => {
    try {
        const username = req.params._username;
        const user = await User.findOne({ username });

        if (!user) {
            return res.status(404).json({ error: 'User not found.' });
        }
        return res.status(200).json({
            user: {
                id: user._id,
                username: user.username,
                email: user.email,
                createdAt: user.createdAt,
            },
        });
    } catch (err) {
        console.error('Profile error:', err);
        return res.status(500).json({ error: 'Server error while fetching profile.' });
    }
});

module.exports = router;