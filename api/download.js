// Calvin
const express = require('express');
const router = express.Router();
const controller = require('../controllers/downloadController');

router.post('/downloads', controller.addDownload);
router.get('/downloads', controller.getDownloadList);
router.delete('/downloads/:id', controller.deleteDownload);

module.exports = router;