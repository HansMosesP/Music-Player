// Calvin 535250080
const Download = require('../models/Download');
const path = require('path');
const fs = require('fs');

// download lagu + simpan ke offline
exports.downloadTrack = async (req, res) => {
  try {
    const { id } = req.params;

    const filePath = path.join(__dirname, '../storage', `${id}.mp3`);

    if (!fs.existsSync(filePath)) {
      return res.status(404).json({ message: "File not found" });
    }

    await Download.create({
      userId: req.user._id,
      trackId: id,
      title: `Lagu ${id}`,
      filePath: filePath,
    });

    return res.download(filePath);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

// mengambil semua lagu offline user
exports.getDownloadList = async (req, res) => {
  try {
    const downloads = await Download.find({
      userId: req.user.id,
    });

    return res.json(downloads);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

// menghapus download
exports.deleteDownload = async (req, res) => {
  try {
    const { id } = req.params;

    await Download.deleteOne({
      userId: req.user.id,
      trackId: id,
    });

    return res.json({ message: "Download deleted" });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};