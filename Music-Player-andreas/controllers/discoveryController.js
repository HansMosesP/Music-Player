// andreas 535230105
const Song = require('../models/Song');
const SearchHistory = require('../models/SearchHistory');
const User = require('../models/User');

// GET /api/search
exports.searchSongs = async (req, res) => {
    try {
        const { keyword, userId } = req.query;

        if (!keyword) {
            return res.status(400).json({
                success: false,
                message: "Keyword pencarian diperlukan"
            });
        }

        // 🔍 Cari lagu
        const songs = await Song.find({
            $or: [
                { title: { $regex: keyword, $options: 'i' } },
                { artist: { $regex: keyword, $options: 'i' } }
            ]
        }).limit(10);

        // ❗ Kalau tidak ada hasil
        if (songs.length === 0) {
            return res.status(404).json({
                success: false,
                message: "Lagu tidak ditemukan"
            });
        }

        // 💾 Simpan search history (dengan validasi user)
        if (userId) {
            const userExists = await User.findById(userId);

            if (!userExists) {
                return res.status(400).json({
                    success: false,
                    message: "User tidak valid"
                });
            }

            await SearchHistory.create({ userId, keyword });
        }

        res.status(200).json({
            success: true,
            data: songs
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

// DELETE /api/search/recent/:id
exports.deleteSearchHistory = async (req, res) => {
    try {
        const historyId = req.params.id;
        const deletedHistory = await SearchHistory.findByIdAndDelete(historyId);

        if (!deletedHistory) {
            return res.status(404).json({ success: false, message: "Riwayat pencarian tidak ditemukan" });
        }

        res.status(200).json({ success: true, message: "Item riwayat pencarian berhasil dihapus" });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// GET /api/recommendations
exports.getRecommendations = async (req, res) => {
    try {
        const recommendations = await Song.aggregate([{ $sample: { size: 5 } }]);
        
        res.status(200).json({ success: true, data: recommendations });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};
