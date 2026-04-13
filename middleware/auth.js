const User = require('../models/User');

const authMiddleware = async (req, res, next) => {
    const token = req.headers['authorization'];

    if (!token) {
        return res.status(401).json({ error: 'Token required. Please login first.' });
    }

    try {
        // Token format: "Bearer userId"
        const userId = token.replace('Bearer ', '');
        const user = await User.findById(userId);

        if (!user) {
            return res.status(401).json({ error: 'Invalid token or user not found.' });
        }

        req.user = user;
        next();
    } catch (err) {
        console.error('Auth middleware error:', err);
        return res.status(401).json({ error: 'Authentication failed.' });
    }
};

module.exports = authMiddleware;
