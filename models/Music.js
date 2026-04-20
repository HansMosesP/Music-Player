const mongoose = require('mongoose');

const musicSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  artist: {
    type: String
  },
  genre: {
    type: String
  },
  filename: {
    type: String
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Music', musicSchema);
