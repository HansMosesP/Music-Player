// 535230107 - James
const Favorite = require('../models/Favorite');

// GET /api/library
exports.getLibrary = async (req, res) => {
  try {
    const favorites = await Favorite.find().sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      data: {
        favorites,
        albums: [],
        artists: []
      }
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message
    });
  }
};

// POST /api/favorites
exports.addFavorite = async (req, res) => {
  try {
    const { songId, title, artist } = req.body;

    // validasi input
    if (!songId || !title || !artist) {
      return res.status(400).json({
        success: false,
        message: "songId, title, and artist are required"
      });
    }

    // cek duplicate
    const existing = await Favorite.findOne({ songId });
    if (existing) {
      return res.status(400).json({
        success: false,
        message: "Song already in favorites"
      });
    }

    const newFavorite = await Favorite.create({
      songId,
      title,
      artist
    });

    res.status(201).json({
      success: true,
      data: newFavorite
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message
    });
  }
};

// DELETE /api/favorites/:id
exports.deleteFavorite = async (req, res) => {
  try {
    const { id } = req.params;

    const deleted = await Favorite.findByIdAndDelete(id);

    if (!deleted) {
      return res.status(404).json({
        success: false,
        message: "Song not found"
      });
    }

    res.status(200).json({
      success: true,
      message: "Song removed from favorites"
    });
  } catch (err) {
    if (err.name === 'CastError') {
      return res.status(400).json({
        success: false,
        message: "Invalid ID format"
      });
    }

    return res.status(500).json({
      success: false,
      message: err.message
    });
  }
};