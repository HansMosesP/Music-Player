// Calvin 535250080
const express = require('express');
const router = express.Router();
const premiumController = require('../controllers/premiumController');
const auth = require('../middleware/auth');

router.get('/plans', premiumController.getPlans);
router.post('/subscribe', premiumController.subscribePremium);
router.get('/status', premiumController.getPremiumStatus);

module.exports = router;