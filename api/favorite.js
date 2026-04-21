// 535230107 - James
const express = require('express');
const router = express.Router();
const ctrl = require('../controllers/favoriteController');

router.get('/library', ctrl.getLibrary);
router.post('/favorites', ctrl.addFavorite);
router.delete('/favorites/:id', ctrl.deleteFavorite);

module.exports = router;