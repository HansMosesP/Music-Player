// Hans 535250055 , Calvin 535250080
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
    },
    password: {
        type: String,
        required: true,
    },
    isPremium: {
        type: Boolean,
        default: false,
    },
    premiumUntil: {
        type: Date,
        default: null,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

module.exports = mongoose.model('User', userSchema);
