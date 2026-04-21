// andreas 535230105
const express = require('express');
const router = express.Router();


const discoveryController = require('../controllers/discoveryController');

// 1. GET /api/search
// Fungsi: Mencari lagu/artis berdasarkan keyword
router.get('/search', discoveryController.searchSongs);

// 2. DELETE /api/search/recent/:id
// Fungsi: Menghapus satu item dari riwayat pencarian
router.delete('/search/recent/:id', discoveryController.deleteSearchHistory);

// 3. GET /api/recommendations
// Fungsi: Mendapatkan rekomendasi lagu
router.get('/recommendations', discoveryController.getRecommendations);

module.exports = router;
