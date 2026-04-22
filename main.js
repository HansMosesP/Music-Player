const express = require('express');
require('dotenv').config();
const connectDB = require('./utils/database');
const registerRoute = require('./api/register');
const historyRoute = require('./routes/historyRoute');
const loginRoute = require('./api/login');
const profileRoute = require('./api/profile');
const musicRoute = require('./api/music');
const favoriteRoute = require('./api/favorite');
const premiumRoute = require('./routes/premiumRoute');
const discoveryRoute = require('./api/discovery');
const searchRoute = require('./api/search'); 
const app = express();
const port = process.env.PORT || 3000;

connectDB();

app.use(express.json());
app.use(express.static('public'));

// Routes
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

app.use('/api/auth/register', registerRoute);
app.use('/api/auth/login', loginRoute);
app.use('/api/profile/', profileRoute);
app.use('/api/history/', historyRoute);
app.use('/api/music/', musicRoute);
app.use('/api/premium', premiumRoute);
app.use('/api/favorite', favoriteRoute);
app.use('/api/discovery', discoveryRoute);
app.use('/api/search', searchRoute);

app.listen(port, () => {
    console.log(`🚀 Server running on http://localhost:${port}`);
}); 