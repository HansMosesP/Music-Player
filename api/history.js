// Yensen 535250062
const express = require('express');
const router = express.Router();
const historyController = require('../controllers/historyController');

// Menerima POST (Simpan data)
router.post('/', historyController.addPlayHistory);

// Menerima GET (Lihat data)
router.get('/:userId', historyController.getUserHistory);

// Menerima DELETE (Hapus data)
router.delete('/:userId/:songId', historyController.deletePlayHistory);
module.exports = router;