// Calvin 535250080
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

    // Cari lagu lain dengan genre sama
    const recommendations = await Music.find({
      genre: track.genre,
      _id: { $ne: id }, 
    }).limit(5);

    res.json({
      targetTrack: track, 
      similarTracks: recommendations // akan kosong kalau cuma ada 1 lagu
    });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// berdasarkan history user
exports.getFromHistory = async (req, res) => {
    try {
        // Ambil data history paling baru yang ada di database
        const history = await History.find().sort({ playedAt: -1 }).limit(1);

        if (history.length === 0) {
            return res.json({ message: "Belum ada history" });
        }

        // Ambil songId dari data history terbaru
        const lastTrackId = history[0].songId; 

        // Cari data lagunya di koleksi Music
        const track = await Music.findById(lastTrackId);

        if (!track) {
            return res.status(404).json({ message: "Lagu tidak ditemukan" });
        }

        // Cari rekomendasi berdasarkan genre yang sama
        const recommendations = await Music.find({
            genre: track.genre,
            _id: { $ne: track._id }
        }).limit(5);

        res.json(recommendations);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};