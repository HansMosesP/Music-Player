// Calvin 535250080
const User = require('../models/User');

//  Melihat Daftar Paket 
exports.getPlans = (req, res) => {
    const plans = [
        { id: 'free', name: 'Free Plan', price: 0, features: ['Iklan Aktif', 'Kualitas Standar'] },
        { id: 'premium', name: 'Premium Individual', price: 54990, features: ['Tanpa Iklan', 'Audio High Quality', 'Download Mode'] }
    ];
    res.json(plans);
};

//  Berlangganan Premium
exports.subscribePremium = async (req, res) => {
    try {
        const { userId, duration } = req.body; 

        if (!userId) {
            return res.status(400).json({ message: "UserId wajib diisi!" });
        }

        const expiryDate = new Date();
        expiryDate.setMonth(expiryDate.getMonth() + (parseInt(duration) || 1));

        const user = await User.findByIdAndUpdate(userId, {
            isPremium: true,
            premiumUntil: expiryDate
        }, { new: true }).select('-password');

        if (!user) {
            return res.status(404).json({ message: "User tidak ditemukan!" });
        }

        res.json({ 
            message: `Berhasil upgrade user ${user.username} selama ${duration || 1} bulan!`, 
            user 
        });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

//  Cek Status Langganan
exports.getPremiumStatus = async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select('username isPremium premiumUntil');
        
        if (!user.isPremium) {
            return res.json({ status: "Free User", message: "Silakan upgrade ke premium untuk fitur lengkap." });
        }

        res.json({
            status: "Premium User",
            expiresAt: user.premiumUntil
        });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};