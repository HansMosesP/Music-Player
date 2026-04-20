// Calvin
const express = require("express");
const router = express.Router();
const controller = require("../controllers/download.controller");
const auth = require("../middleware/auth");

router.get("/downloads/:id", auth, controller.downloadTrack);
router.get("/downloads", auth, controller.getDownloadList);
router.delete("/downloads/:id", auth, controller.deleteDownload);

module.exports = router;