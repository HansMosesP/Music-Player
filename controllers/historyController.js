
const History = require('../models/History');

const addPlayHistory = async (req, res) => {
    try {
        const { userId, songId, title, artist, duration } = req.body;

        if (!userId || !songId || !title || !artist) {
            return res.status(400).json({ success: false, message: 'Data lagu atau userId tidak lengkap' });
        }

        const history = new History({
            userId,
            songId,
            title,
            artist,
            duration: duration || 0
        });

        await history.save();

        return res.status(201).json({ success: true, history });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ success: false, error: 'Server error saat simpan history' });
    }
};


const getUserHistory = async (req, res) => {
    try {
        const userId = req.params.userId;
        
        if (!userId) {
            return res.status(400).json({ success: false, error: 'UserId kosong' });
        }

        // Cari semua history berdasarkan userId, urutin dari yang terbaru
        const listHistory = await History.find({ userId }).sort({ playedAt: -1 });

        return res.status(200).json({
            success: true,
            total: listHistory.length,
            data: listHistory // Ini isinya list history lagu user
        });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: 'Gagal ambil list history' });
    }
};

const deletePlayHistory = async (req, res) => {
    try {
        const { userId, songId } = req.params;

        if (!userId || !songId) {
            return res.status(400).json({ success: false, message: 'UserId dan SongId kosong' });
        }

        const deletedHistory = await History.deleteMany({ userId, songId });

        if (deletedHistory.deletedCount === 0) {
            return res.status(404).json({ success: false, message: 'History tidak ditemukan' });
        }

        return res.status(200).json({ 
            success: true, 
            message: 'History berhasil dihapus', 
            terhapus: deletedHistory.deletedCount 
        });
    } catch (err) {
        console.error('Error deletePlayHistory:', err);
        return res.status(500).json({ success: false, error: 'Server error saat hapus history' });
    }
};

module.exports = {
    addPlayHistory,
    getUserHistory,
    deletePlayHistory
};