const express = require("express");
const router = express.Router();
const historyController = require("../controllers/historyController");

router.delete("/search/recent/:id", historyController.deleteHistory);

module.exports = router;
