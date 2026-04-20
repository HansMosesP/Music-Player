const express = require('express');
const authMiddleware = require('../middleware/auth');
const History = require('../models/History');
const User = require('../models/User');

const router = express.Router();

router.get('/', authMiddleware, async (req, res) => {
  try {
    const userId = req.user._id;
    const limit = req.query.limit || 20; // Ambil 20 lagu terakhir

    const historyList = await History.find({ userId })
      .sort({ playedAt: -1 })
      .limit(parseInt(limit));

    if (!historyList || historyList.length === 0) {
      return res.status(200).json({
        message: 'Belum ada riwayat lagu yang diputar',
        history: []
      });
    }

    return res.status(200).json({
      message: 'Daftar lagu terakhir diputar',
      count: historyList.length,
      history: historyList
    });
  } catch (err) {
    console.error('History GET error:', err);
    return res.status(500).json({ error: 'Server error while fetching history.' });
  }
});


router.post('/', authMiddleware, async (req, res) => {
  try {
    const { songId, title, artist, duration } = req.body;
    const userId = req.user._id;

    if (!songId || !title || !artist) {
      return res.status(400).json({ error: 'songId, title, dan artist diperlukan.' });
    }

    const newHistory = new History({
      userId,
      songId,
      title,
      artist,
      duration: duration || 0,
      playedAt: new Date()
    });

    await newHistory.save();

    return res.status(201).json({
      message: 'Lagu berhasil dicatat ke riwayat',
      history: newHistory
    });
  } catch (err) {
    console.error('History POST error:', err);
    return res.status(500).json({ error: 'Server error while saving history.' });
  }
});

router.delete('/:historyId', authMiddleware, async (req, res) => {
  try {
    const userId = req.user._id;
    const historyId = req.params.historyId;

    const history = await History.findById(historyId);
    if (!history) {
      return res.status(404).json({ error: 'History tidak ditemukan.' });
    }

    if (history.userId.toString() !== userId.toString()) {
      return res.status(403).json({ error: 'Anda tidak memiliki akses untuk menghapus history ini.' });
    }

    await History.findByIdAndDelete(historyId);

    return res.status(200).json({ message: 'History berhasil dihapus.' });
  } catch (err) {
    console.error('History DELETE error:', err);
    return res.status(500).json({ error: 'Server error while deleting history.' });
  }
});

module.exports = router;

