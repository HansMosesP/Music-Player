// andreas 535230105
const SearchHistory = require('../models/SearchHistory');
const User = require('../models/User'); // pakai userId

// SEARCH
exports.searchSongs = async (req, res) => {
    try {
        const { keyword, userId } = req.query;

        if (!keyword) {
            return res.status(400).json({
                success: false,
                message: "Keyword diperlukan"
            });
        }

        // 💾 SIMPAN KE HISTORY
        if (userId) {
            const userExists = await User.findById(userId);

            if (!userExists) {
                return res.status(400).json({
                    success: false,
                    message: "User tidak valid"
                });
            }

            await SearchHistory.create({ userId, keyword });
        } else {
            await SearchHistory.create({ keyword });
        }

        res.status(200).json({
            success: true,
            message: `Hasil pencarian: ${keyword}`
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
}; 

//  DELETE HISTORY
exports.deleteSearchHistory = async (req, res) => {
    try {
        const id = req.params.id;

        await SearchHistory.findByIdAndDelete(id);

        res.status(200).json({
            success: true,
            message: "History berhasil dihapus"
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

//  GET HISTORY
exports.getSearchHistory = async (req, res) => {
    try {
        const history = await SearchHistory.find().sort({ createdAt: -1 });

        res.status(200).json({
            success: true,
            data: history
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};
