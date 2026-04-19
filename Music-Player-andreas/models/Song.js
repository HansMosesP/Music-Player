// andreas 535230105 
const mongoose = require('mongoose');

const songSchema = new mongoose.Schema({
    title: { type: String, required: true },
    artist: { type: String, required: true },
    album: { type: String },
    url: { type: String }
});

module.exports = mongoose.model('Song', songSchema);
