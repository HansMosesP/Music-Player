// Calvin 535250080
const express = require('express');
const router = express.Router();
const controller = require('../controllers/downloadController');

router.post('/', controller.downloadTrack);
router.get('/', controller.getDownloadList);
router.delete('/:id', controller.deleteDownload);

module.exports = router;