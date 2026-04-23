// andreas 535230105 
console.log("SEARCH ROUTE LOADED"); 

const express = require('express');
const router = express.Router();

const searchController = require('../controllers/searchController');

// GET HISTORY 
router.get('/search/history', searchController.getSearchHistory);

// SEARCH
router.get('/search', searchController.searchSongs);

// DELETE RECENT
router.delete('/search/recent/:id', searchController.deleteSearchHistory);

module.exports = router; 