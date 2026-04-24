# 🎵 Music Streaming API

API untuk aplikasi streaming musik dengan fitur autentikasi, pencarian, favorit, riwayat pemutaran, rekomendasi, dan langganan premium.

## 👥 Tim Pengembang

| NIM       | Nama      | Kontribusi                           |
| --------- | --------- | ------------------------------------ |
| 535250055 | Hans      | Login, Register, User Model, Profile |
| 535230105 | Andreas   | Discovery, Search, SearchHistory     |
| 535230107 | James     | Favorite, Library                    |
| 535250080 | Calvin    | Recommendation, Premium, Music Model |
| 535250062 | Kornelius | History, Music Player                |

## 📚 Daftar Endpoint Per Anggota

### Hans (535250055) - Auth & User

| Method | Endpoint               | Fungsi             |
| ------ | ---------------------- | ------------------ |
| POST   | /api/auth/register     | Register user baru |
| POST   | /api/auth/login        | Login user         |
| GET    | /api/profile/:username | Lihat profil user  |

### Andreas (535230105) - Search & Discovery

| Method | Endpoint                         | Fungsi                  |
| ------ | -------------------------------- | ----------------------- |
| GET    | /api/discovery/search?keyword=   | Cari lagu/artis         |
| GET    | /api/discovery/recommendations   | Random rekomendasi      |
| DELETE | /api/discovery/search/recent/:id | Hapus riwayat pencarian |

### James (535230107) - Favorite & Library

| Method | Endpoint                    | Fungsi               |
| ------ | --------------------------- | -------------------- |
| GET    | /api/favorite/library       | Lihat daftar favorit |
| POST   | /api/favorite/favorites     | Tambah ke favorit    |
| DELETE | /api/favorite/favorites/:id | Hapus dari favorit   |

### Kornelius (535250062) - History & Music Player

| Method | Endpoint                      | Fungsi                     |
| ------ | ----------------------------- | -------------------------- |
| POST   | /api/history                  | Catat lagu yang diputar    |
| GET    | /api/history/:userId          | Lihat riwayat user         |
| DELETE | /api/history/:userId/:musicId | Hapus riwayat              |
| POST   | /api/music/play               | Putar lagu & catat history |
| GET    | /api/music/stream/:songId     | Stream file musik          |
| GET    | /api/music/list               | Daftar lagu tersedia       |

### Calvin (535250080) - Premium & Recommendation

| Method | Endpoint                       | Fungsi                   |
| ------ | ------------------------------ | ------------------------ |
| GET    | /api/premium/plans             | Lihat paket premium      |
| POST   | /api/premium/subscribe         | Berlangganan premium     |
| GET    | /api/premium/status            | Cek status premium       |
| GET    | /api/recommendations           | Random rekomendasi       |
| GET    | /api/recommendations/track/:id | Rekomendasi mirip        |
| GET    | /api/recommendations/history   | Rekomendasi dari history |

## 🛠️ Teknologi

- **Runtime:** Node.js
- **Framework:** Express.js
- **Database:** MongoDB (Mongoose)
- **Authentication:** Token-based (Bearer Token)
- **Encryption:** bcryptjs
- **Environment:** dotenv

## 📦 Instalasi

```bash
# Clone repository
git clone <repository-url>

# Masuk ke direktori project
cd music-streaming-api

# Install dependencies
npm install

# Buat file .env
echo "PORT=3000
MONGODB_URI=mongodb://localhost:27017/music-app" > .env

# Jalankan server
npm start
```
