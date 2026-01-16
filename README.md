# 💰 Finance Tracker - Aplikasi Manajemen Keuangan Pribadi

Aplikasi web modern untuk melacak pemasukan dan pengeluaran dengan antarmuka mobile-first dalam Bahasa Indonesia dan mata uang Rupiah.

![Finance Tracker](https://img.shields.io/badge/Status-Active-success)
![License](https://img.shields.io/badge/License-MIT-blue)

## ✨ Fitur Utama

- 💸 **Pencatatan Transaksi** - Catat pemasukan dan pengeluaran dengan mudah
- 👛 **Multi-Wallet** - Kelola beberapa dompet (Tunai, Bank, E-Wallet)
- 📊 **Kategori Transaksi** - Organisasi transaksi berdasarkan kategori
- 💰 **Mata Uang Rupiah** - Format otomatis dalam Rupiah Indonesia (Rp)
- 🌐 **Bahasa Indonesia** - Antarmuka lengkap dalam Bahasa Indonesia
- 📱 **Mobile-First Design** - Responsif dan optimal untuk penggunaan mobile
- ⚡ **Real-time Updates** - Saldo dompet ter-update otomatis

## 🛠️ Teknologi yang Digunakan

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **Prisma ORM** - Database toolkit
- **SQLite** - Database
- **CORS** - Cross-origin resource sharing

### Frontend
- **React** - UI library
- **Vite** - Build tool
- **Tailwind CSS** - Utility-first CSS framework
- **Axios** - HTTP client
- **React Router** - Routing (ready to use)

## 📦 Instalasi

### Prasyarat
- Node.js v16 atau lebih tinggi
- npm atau yarn

### 1. Clone Repository
```bash
git clone https://github.com/rosifirdos/Finance-Tracker.git
cd Finance-Tracker
```

### 2. Setup Backend

```bash
cd backend
npm install

# Setup database
npm run db:push

# Seed data demo (opsional)
npm run db:seed

# Jalankan server
npm run dev
```

Backend akan berjalan di `http://localhost:3001`

### 3. Setup Frontend

```bash
cd ../frontend
npm install

# Jalankan development server
npm run dev
```

Frontend akan berjalan di `http://localhost:5173`

## 🚀 Cara Menggunakan

1. Buka browser dan akses `http://localhost:5173`
2. Pilih jenis transaksi: **Pemasukan** atau **Pengeluaran**
3. Masukkan jumlah dalam Rupiah
4. Pilih dompet dan kategori
5. Pilih tanggal transaksi
6. Tambahkan catatan (opsional)
7. Klik **Tambah Pemasukan/Pengeluaran**

Saldo dompet akan diperbarui secara otomatis!

## 📖 Dokumentasi API

Dokumentasi lengkap API tersedia di:
- `backend/API_REFERENCE.md` - Referensi endpoint
- `backend/README.md` - Setup dan konfigurasi backend

## 🗂️ Struktur Project

```
Finance-Tracker/
├── backend/                    # Node.js API Server
│   ├── src/
│   │   ├── controllers/       # Business logic
│   │   ├── routes/           # API routes
│   │   └── index.js          # Server entry point
│   ├── prisma/
│   │   ├── schema.prisma     # Database schema
│   │   ├── seed.js           # Demo data
│   │   └── dev.db            # SQLite database
│   └── package.json
│
├── frontend/                   # React Application
│   ├── src/
│   │   ├── components/       # React components
│   │   │   └── AddTransactionForm.jsx
│   │   ├── App.jsx
│   │   └── index.css         # Tailwind styles
│   └── package.json
│
└── QUICKSTART.md              # Panduan cepat
```

## 🎨 Screenshots

### Form Tambah Transaksi
Form modern dengan toggle pemasukan/pengeluaran, input Rupiah, dan validasi lengkap.

## 🔧 Konfigurasi

### Environment Variables (Backend)
Buat file `.env` di folder `backend/`:

```env
DATABASE_URL="file:./dev.db"
PORT=3001
NODE_ENV=development
```

### API Base URL (Frontend)
Default: `http://localhost:3001/api`

Untuk mengubah, edit `frontend/src/components/AddTransactionForm.jsx`:
```javascript
const API_BASE_URL = 'http://localhost:3001/api';
```

## 📊 Data Demo

Setelah menjalankan `npm run db:seed`, data berikut akan tersedia:

**User Demo:**
- ID: 1
- Username: demo_user

**Wallets:**
- 💵 Cash - Rp 500
- 🏦 Bank Account - Rp 1.500
- 💳 E-Wallet - Rp 300

**Kategori:**
- Pemasukan: Salary, Freelance, Investment
- Pengeluaran: Bills & Utilities, Food & Dining, Transportation, Shopping, Healthcare

## 🧪 Testing API

### Menggunakan curl
```bash
# Cek kesehatan server
curl http://localhost:3001/api/health

# Ambil semua wallet
curl http://localhost:3001/api/wallets?userId=1

# Dashboard overview
curl http://localhost:3001/api/stats/overview?userId=1
```

### Menggunakan Prisma Studio
```bash
cd backend
npm run db:studio
```
Buka `http://localhost:5555` untuk GUI database

## 🚧 Roadmap

- [ ] Dashboard dengan grafik dan statistik
- [ ] Transaction history dengan filter
- [ ] Budgeting dan tracking pengeluaran
- [ ] Data export (CSV/PDF)
- [ ] Recurring transactions
- [ ] User authentication
- [ ] Dark mode
- [ ] PWA support (offline mode)

## 🤝 Kontribusi

Kontribusi sangat diterima! Silakan:

1. Fork repository ini
2. Buat branch fitur (`git checkout -b fitur-baru`)
3. Commit perubahan (`git commit -m 'Tambah fitur baru'`)
4. Push ke branch (`git push origin fitur-baru`)
5. Buat Pull Request

## 📝 Lisensi

Project ini menggunakan lisensi MIT. Lihat file `LICENSE` untuk detail.

## 👨‍💻 Author

**Rosi Firdos**
- GitHub: [@rosifirdos](https://github.com/rosifirdos)

## 🙏 Acknowledgments

- Terinspirasi dari kebutuhan manajemen keuangan pribadi yang lebih baik
- Built with modern web technologies
- Menggunakan best practices dalam development

---

⭐ Jangan lupa beri star jika project ini bermanfaat!
