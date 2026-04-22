// Calvin 535250080
const express = require('express');
const router = express.Router();
const controller = require('../controllers/downloadController');
const auth = require('../middleware/auth');

router.get('/:id', auth, controller.downloadTrack); 
router.get('/list', auth, controller.getDownloadList);
router.delete('/:id', auth, controller.deleteDownload);

module.exports = router;