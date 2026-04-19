// andreas 535230105
const express = require("express");
const router = express.Router();
const discoveryController = require("../controllers/discoveryController");

router.get("/search", discoveryController.search);
router.get("/recommendations", discoveryController.getRecommendations);

module.exports = router;

