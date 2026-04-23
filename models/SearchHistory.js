// andreas 535230105 
// andreas 535230105 
const mongoose = require("mongoose");

const searchHistorySchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
    // hapus required
  },
  keyword: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("SearchHistory", searchHistorySchema); 