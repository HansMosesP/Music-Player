// andreas 535230105
const SearchHistory = require("../models/SearchHistory");

exports.deleteHistory = async (req, res) => {
  try {
    await SearchHistory.findByIdAndDelete(req.params.id);
    res.json({ message: "History deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
