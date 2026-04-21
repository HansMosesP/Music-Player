// andreas 535230105 
const express = require('express');
const router = express.Router();

// SEARCH
router.get('/search', (req, res) => {
    const q = req.query.q;

    if (!q) {
        return res.status(400).json({ message: 'Keyword required' });
    }

    res.json({
        result: `Hasil pencarian: ${q}`
    });
});

// DELETE RECENT
router.delete('/search/recent/:id', (req, res) => {
    const id = req.params.id;

    res.json({
        message: `Deleted recent search with id ${id}`
    });
});

// RECOMMENDATION
router.get('/recommendations', (req, res) => {
    res.json({
        data: ['Lagu A', 'Lagu B', 'Lagu C']
    });
});

module.exports = router;
