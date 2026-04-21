// 535230107 - James
const mongoose = require('mongoose');

const favoriteSchema = new mongoose.Schema({
  songId: {
    type: String,
    required: true
  },
  title: {
    type: String,
    required: true
  },
  artist: {
    type: String,
    required: true
  }
}, { timestamps: true });

module.exports = mongoose.model('Favorite', favoriteSchema);