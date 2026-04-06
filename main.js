const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();
const port = 3000;

mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log("✅ MongoDB Connected"))
    .catch(err => console.error("❌ MongoDB Error:", err));

const laguSchema = new mongoose.Schema({
    nama: String,
    artist: String,
    file: String
});

const Lagu = mongoose.model("Lagu", laguSchema);

app.use(express.static('public'));

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});


app.listen(port, () => {
    console.log(`🚀 Server running on http://localhost:${port}`);
});