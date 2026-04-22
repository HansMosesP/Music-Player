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
        const userId = req.user.id; 
        
        // Update user jadi premium selama 30 hari
        const updatedUser = await User.findByIdAndUpdate(
            userId,
            {
                isPremium: true,
                premiumUntil: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)
            },
            { new: true }
        ).select('-password');

        res.json({
            message: "Selamat! Akun kamu sekarang sudah Premium.",
            user: updatedUser
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