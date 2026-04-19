// Calvin
const Music = require('../models/Music');
const History = require('../models/History');

exports.getRecommendations = async (req, res) => {
  try {
    const tracks = await Music.find();

    // random shuffle
    const shuffled = tracks.sort(() => 0.5 - Math.random());

    res.json(shuffled.slice(0, 5)); // ambil 5 lagu
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// berdasarkan track
exports.getByTrack = async (req, res) => {
  try {
    const { id } = req.params;

    const track = await Music.findById(id);
    if (!track) {
      return res.status(404).json({ message: "Track not found" });
    }

    // rekomendasi genre sama 
    const recommendations = await Music.find({
      genre: track.genre,
      _id: { $ne: id }, 
    }).limit(5);

    res.json(recommendations);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// berdasarkan history user
exports.getFromHistory = async (req, res) => {
  try {
    const userId = req.user?.id || "user1"; 

    const history = await History.find({ userId });

    if (history.length === 0) {
      return res.json([]);
    }

    // ambil track terakhir
    const lastTrackId = history[history.length - 1].trackId;

    const track = await Music.findById(lastTrackId);
    if (!track) return res.json([]);

    // rekomendasi dari genre yang sama
    const recommendations = await Music.find({
      genre: track.genre,
      _id: { $ne: lastTrackId },
    }).limit(5);

    res.json(recommendations);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};