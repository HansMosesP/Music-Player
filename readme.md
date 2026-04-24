# 🎵 Music Streaming API

API untuk aplikasi streaming musik dengan fitur autentikasi, pencarian, favorit, riwayat pemutaran, rekomendasi, dan langganan premium.

## 👥 Anggota Kelompok 6

| NIM       | Nama      | Kontribusi               |
| --------- | --------- | ------------------------ |
| 535230105 | Andreas   | Search & Discovery       |
| 535230107 | James     | Library & Favorite       |
| 535250055 | Hans      | Auth & User              |
| 535250062 | Kornelius | User Activity & History  |
| 535250080 | Calvin    | Premium & Recommendation |

## 📚 Daftar Endpoint Per Anggota

### Hans (535250055) - Auth & User

| Method | Endpoint           | Fungsi                                                             |
| ------ | ------------------ | ------------------------------------------------------------------ |
| POST   | /api/auth/login    | Melakukan autentikasi pengguna dan menghasilkan token akses.       |
| POST   | /api/auth/register | Mendaftarkan pengguna baru (simpan username, email, dan password). |
| GET    | /api/profile       | Mengambil dan menampilkan data profil pengguna yang sedang login.  |

### Andreas (535230105) - Search & Discovery

| Method | Endpoint               | Fungsi                                      |
| ------ | ---------------------- | ------------------------------------------- |
| GET    | /api/search?keyword=   | Mencari lagu/artis berdasarkan keyword.     |
| GET    | /api/search/history    | Melihat riwayat pencarian pengguna.         |
| DELETE | /api/search/recent/:id | Menghapus satu item dari riwayat pencarian. |

### James (535230107) - Library & Favorite

| Method | Endpoint           | Fungsi                                             |
| ------ | ------------------ | -------------------------------------------------- |
| POST   | /api/favorites     | Menambahkan lagu ke daftar favorite.               |
| GET    | /api/library       | Melihat list lagu yang sudah terdaftar di library. |
| DELETE | /api/favorites/:id | Menghapus lagu favorite dari library.              |

### Kornelius (535250062) - User Activity & History

| Method | Endpoint                      | Fungsi                                             |
| ------ | ----------------------------- | -------------------------------------------------- |
| GET    | /api/history                  | Memasukan data userid dan music saat lagu di-play. |
| POST   | /api/history/:userid          | Menampilkan data lagu yang sebelumnya dijalankan.  |
| DELETE | /api/history/:userid/:musicid | Menghapus data yang telah tersimpan di history.    |

### Calvin (535250080) - Premium & Recommendation

| Method | Endpoint                       | Fungsi                                               |
| ------ | ------------------------------ | ---------------------------------------------------- |
| GET    | /api/premium/plans             | Menampilkan daftar paket premium yang tersedia.      |
| POST   | /api/premium/subscribe         | Mengaktifkan status premium pada akun user.          |
| GET    | /api/premium/status            | Mengecek status langganan dan sisa masa aktif.       |
| GET    | /api/recommendation            | Rekomendasi buat user baru yang belum punya history. |
| GET    | /api/recommendations/history   | Rekomendasi berdasarkan lagu yang terakhir diputar.  |
| GET    | /api/recommendations/track/:id | Rekomendasi lagu serupa berdasarkan genre/artist.    |

## 🛠️ Teknologi

- **Runtime:** Node.js
- **Framework:** Express.js
- **Database:** MongoDB (Mongoose)
- **Authentication:** Token-based
- **Encryption:** bcryptjs
- **Environment:** dotenv

## 📦 Instalasi & Menjalankan Server

1. **Clone repository ini**

   ```bash
   git clone https://github.com/HansMosesP/Music-Player.git
   cd Music-Player
   ```

2. **Install semua dependensi**

   ```bash
   npm install
   ```

3. **Konfigurasi Environment Variables**
   Buat file `.env` di root directory dan tambahkan variabel berikut:

   ```env
   PORT=3000
   MONGO_URI=mongodb://localhost:27017/music-app
   ```

   _(Sesuaikan MONGO_URI dengan koneksi database lokal Anda)_

4. **Jalankan Server**
   ```bash
   node main.js
   ```
   Server akan berjalan di `http://localhost:3000`.
