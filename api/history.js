const express = require('express');
const router = express.Router();
const historyController = require('../controllers/historyController');

// Menerima POST (Simpan data)
router.post('/', historyController.addPlayHistory);

// Menerima GET (Lihat data)
router.get('/:userId', historyController.getUserHistory);

module.exports = router;