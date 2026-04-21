// 535230107 - James

const express = require('express');
const router = express.Router();
const ctrl = require('../controllers/favoriteController');

router.get('/library', ctrl.getLibrary);

module.exports = router;