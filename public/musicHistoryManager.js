// Frontend - Mechanism to record song history
// Copy this ke main.js atau file JavaScript frontend Anda

class MusicHistoryManager {
  constructor(apiBaseUrl = '/api') {
    this.apiBaseUrl = apiBaseUrl;
    this.currentSong = null;
    this.playStartTime = null;
  }

  // Method untuk mulai memutar lagu
  async startPlaying(songId, title, artist, duration = 0) {
    this.currentSong = { songId, title, artist, duration };
    this.playStartTime = Date.now();
    console.log(`🎵 Mulai memutar: ${title} - ${artist}`);
  }

  // Method untuk catat history saat lagu selesai
  async finishPlaying() {
    if (!this.currentSong) {
      console.warn('Tidak ada lagu yang sedang diputar');
      return;
    }

    try {
      const token = localStorage.getItem('authToken'); // atau sesuaikan dengan cara Anda menyimpan token
      
      const response = await fetch(`${this.apiBaseUrl}/history`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          songId: this.currentSong.songId,
          title: this.currentSong.title,
          artist: this.currentSong.artist,
          duration: this.currentSong.duration
        })
      });

      if (response.ok) {
        const data = await response.json();
        console.log('✅ Lagu berhasil dicatat ke history:', data.history);
      } else {
        console.error('❌ Gagal mencatat history:', response.statusText);
      }
    } catch (err) {
      console.error('❌ Error saat mencatat history:', err);
    }

    this.currentSong = null;
    this.playStartTime = null;
  }

  // Method untuk mendapatkan daftar history
  async getHistory(limit = 20) {
    try {
      const token = localStorage.getItem('authToken');
      
      const response = await fetch(`${this.apiBaseUrl}/history?limit=${limit}`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.ok) {
        const data = await response.json();
        console.log('📜 Daftar history:', data.history);
        return data.history;
      } else {
        console.error('❌ Gagal mengambil history:', response.statusText);
        return [];
      }
    } catch (err) {
      console.error('❌ Error saat mengambil history:', err);
      return [];
    }
  }

  // Method untuk play lagu dari history dengan button
  async playFromHistory(historyItem) {
    console.log(`▶️ Play dari history: ${historyItem.title} - ${historyItem.artist}`);
    
    // Trigger audio player untuk lagu ini
    // Sesuaikan dengan implementasi player Anda
    const audioElement = document.getElementById('audioPlayer') || new Audio();
    
    // Coba cari URL lagu berdasarkan songId
    const songUrl = await this.getSongUrl(historyItem.songId);
    
    if (songUrl) {
      audioElement.src = songUrl;
      audioElement.play();
      this.startPlaying(
        historyItem.songId, 
        historyItem.title, 
        historyItem.artist, 
        historyItem.duration
      );
    } else {
      console.warn('⚠️ URL lagu tidak ditemukan');
    }
  }

  // Method untuk mendapatkan URL lagu dari API
  async getSongUrl(songId) {
    try {
      const response = await fetch(`/api/music/${songId}`);
      if (response.ok) {
        const data = await response.json();
        return data.url || data.songUrl || null;
      }
      return null;
    } catch (err) {
      console.error('Error mendapatkan URL lagu:', err);
      return null;
    }
  }

  // Method untuk menampilkan history di UI
  async displayHistoryUI(containerId) {
    const container = document.getElementById(containerId);
    if (!container) {
      console.error(`Container dengan ID '${containerId}' tidak ditemukan`);
      return;
    }

    const history = await this.getHistory();
    
    if (history.length === 0) {
      container.innerHTML = '<p>Belum ada riwayat lagu yang diputar</p>';
      return;
    }

    let html = '<h3>Riwayat Lagu</h3><ul>';
    history.forEach((item, index) => {
      const playedTime = new Date(item.playedAt).toLocaleString('id-ID');
      html += `
        <li class="history-item">
          <div class="history-info">
            <strong>${index + 1}. ${item.title}</strong>
            <p>${item.artist}</p>
            <small>${playedTime}</small>
          </div>
          <button class="btn-play-history" onclick="musicHistory.playFromHistory({
            songId: '${item.songId}',
            title: '${item.title}',
            artist: '${item.artist}',
            duration: ${item.duration}
          })">▶️ Play</button>
        </li>
      `;
    });
    html += '</ul>';
    
    container.innerHTML = html;
  }
}

// Inisialisasi instance global
const musicHistory = new MusicHistoryManager('/api');

// Contoh penggunaan:
// 1. Saat lagu dimulai: musicHistory.startPlaying('song123', 'Song Title', 'Artist Name', 180);
// 2. Saat lagu selesai: musicHistory.finishPlaying();
// 3. Tampilkan history di UI: musicHistory.displayHistoryUI('historyContainer');
