// Calvin 535250080
const express = require('express');
const router = express.Router();
const controller = require('../controllers/recommendationController');

router.get('/', controller.getRecommendations);
router.get('/track/:id', controller.getByTrack);
router.get('/history', controller.getFromHistory);

module.exports = router;