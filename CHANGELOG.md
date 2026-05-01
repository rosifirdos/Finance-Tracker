# Changelog - Finance Tracker

## [1.1.0] - 2026-05-01

### ✨ Fitur Baru

#### UI/UX Improvements
- **Dashboard Baru**: Halaman dashboard dengan ringkasan keuangan lengkap
  - Total saldo dari semua dompet
  - Total pemasukan dan pengeluaran
  - Arus kas (cash flow) dengan indikator surplus/defisit
  - Tampilan kartu untuk setiap dompet

- **Riwayat Transaksi**: Halaman daftar transaksi dengan fitur:
  - Filter berdasarkan jenis (Semua, Pemasukan, Pengeluaran)
  - Tampilan detail transaksi (kategori, dompet, tanggal, catatan)
  - Fitur hapus transaksi
  - Format tanggal dalam Bahasa Indonesia

- **Navigasi**: Bottom navigation bar (mobile) / Top navigation bar (desktop)
  - Dashboard (📊)
  - Transaksi (📋)
  - Tambah (➕)

- **Form Transaksi**: Perbaikan form tambah transaksi
  - Tombol kembali ke dashboard
  - Auto-redirect ke dashboard setelah berhasil menambah transaksi
  - Validasi form yang lebih baik

### 🐛 Bug Fixes

#### Dependencies
- **Fixed**: Menambahkan React dan React-DOM yang hilang di `frontend/package.json`
  - Sebelumnya: React dan React-DOM tidak ada di dependencies
  - Sekarang: React 19.2.3 dan React-DOM 19.2.3 terinstall

#### API Integration
- **Fixed**: Perbaikan field name untuk total expenses di Dashboard
  - API mengembalikan `totalExpenses` bukan `totalExpense`
  - Menambahkan fallback untuk kompatibilitas

### 🎨 Design Improvements

- **Responsive Design**: Semua halaman responsive untuk mobile dan desktop
- **Color Scheme**: 
  - Gradient background (blue-50 to indigo-100)
  - Green untuk pemasukan
  - Red untuk pengeluaran
  - Blue untuk aksi utama
- **Typography**: Font yang lebih jelas dan hierarki yang baik
- **Spacing**: Padding dan margin yang konsisten
- **Shadows**: Shadow effects untuk depth dan visual hierarchy

### 📱 Mobile-First Design

- Bottom navigation untuk mobile
- Top navigation untuk desktop
- Touch-friendly button sizes
- Responsive grid layouts
- Optimized for small screens

### 🚀 Performance

- Lazy loading untuk komponen
- Efficient state management
- Optimized re-renders
- Fast navigation dengan React Router

### 📦 Tech Stack

**Frontend:**
- React 19.2.3
- React Router DOM 7.12.0
- Vite 7.2.4
- Tailwind CSS 3.4.1
- Axios 1.13.2

**Backend:**
- Node.js
- Express.js 4.21.2
- Prisma ORM 6.1.0
- SQLite (dev.db)

### 🔧 Setup Instructions

1. **Backend Setup:**
   ```bash
   cd backend
   npm install
   npm run db:push
   npm run db:seed
   npm run dev
   ```

2. **Frontend Setup:**
   ```bash
   cd frontend
   npm install
   npm run dev
   ```

3. **Access Application:**
   - Frontend: http://localhost:5173
   - Backend API: http://localhost:3001

### 📝 Notes

- Database tetap menggunakan SQLite (tidak jadi migrasi ke PostgreSQL)
- Semua fitur existing tetap berfungsi
- UI/UX telah diperbaiki dan ditingkatkan
- Aplikasi sudah ditest dan berjalan dengan baik

### 🎯 Future Enhancements

- [ ] User authentication
- [ ] Multi-user support
- [ ] Budget tracking
- [ ] Recurring transactions
- [ ] Data export (CSV/PDF)
- [ ] Charts and analytics
- [ ] Dark mode
- [ ] PWA support

---

## [1.0.0] - Initial Release

- Basic transaction management
- Multi-wallet support
- Category management
- SQLite database
- Simple UI with single form page
