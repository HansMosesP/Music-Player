// Calvin 535250080
const mongoose = require('mongoose');

const downloadSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
  },
  trackId: {
    type: String,
    required: true,
  },
  title: String,
  filePath: String,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Download', downloadSchema);