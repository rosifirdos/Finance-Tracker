# 📖 Panduan Pengguna - Finance Tracker

## Daftar Isi
1. [Pengenalan](#pengenalan)
2. [Fitur Utama](#fitur-utama)
3. [Cara Menggunakan](#cara-menggunakan)
4. [Tips dan Trik](#tips-dan-trik)
5. [FAQ](#faq)

---

## Pengenalan

Finance Tracker adalah aplikasi manajemen keuangan pribadi yang membantu Anda melacak pemasukan dan pengeluaran dengan mudah. Aplikasi ini dirancang dengan antarmuka yang sederhana dan intuitif dalam Bahasa Indonesia.

### Keunggulan
- ✅ **Mudah Digunakan**: Interface yang simpel dan intuitif
- ✅ **Multi-Wallet**: Kelola beberapa dompet sekaligus
- ✅ **Kategori Lengkap**: Organisasi transaksi berdasarkan kategori
- ✅ **Real-time**: Saldo ter-update otomatis
- ✅ **Mobile-Friendly**: Responsif untuk semua ukuran layar
- ✅ **Bahasa Indonesia**: Semua dalam Bahasa Indonesia

---

## Fitur Utama

### 1. 📊 Dashboard
Dashboard memberikan ringkasan lengkap keuangan Anda:

**Informasi yang Ditampilkan:**
- **Total Saldo**: Jumlah total uang di semua dompet
- **Total Pemasukan**: Jumlah semua pemasukan
- **Total Pengeluaran**: Jumlah semua pengeluaran
- **Arus Kas**: Selisih antara pemasukan dan pengeluaran
  - ✅ **Surplus**: Jika pemasukan > pengeluaran (hijau)
  - ⚠️ **Defisit**: Jika pengeluaran > pemasukan (merah)
- **Daftar Dompet**: Semua dompet dengan saldo masing-masing

**Cara Mengakses:**
- Klik icon 📊 Dashboard di navigation bar
- Atau buka URL: http://localhost:5173/

### 2. 📋 Riwayat Transaksi
Halaman ini menampilkan semua transaksi yang pernah Anda buat.

**Fitur:**
- **Filter Transaksi**: 
  - Semua: Tampilkan semua transaksi
  - 💰 Pemasukan: Hanya transaksi pemasukan
  - 💸 Pengeluaran: Hanya transaksi pengeluaran
- **Detail Transaksi**:
  - Icon kategori
  - Nama kategori
  - Dompet yang digunakan
  - Tanggal transaksi
  - Catatan (jika ada)
  - Jumlah uang (hijau untuk pemasukan, merah untuk pengeluaran)
- **Hapus Transaksi**: Tombol 🗑️ untuk menghapus transaksi

**Cara Mengakses:**
- Klik icon 📋 Transaksi di navigation bar
- Atau buka URL: http://localhost:5173/transactions

**Cara Menghapus Transaksi:**
1. Buka halaman Riwayat Transaksi
2. Cari transaksi yang ingin dihapus
3. Klik tombol "🗑️ Hapus"
4. Konfirmasi penghapusan
5. Transaksi akan dihapus dan saldo dompet akan diperbarui

### 3. ➕ Tambah Transaksi
Form untuk menambahkan transaksi baru (pemasukan atau pengeluaran).

**Cara Mengakses:**
- Klik icon ➕ Tambah di navigation bar
- Atau buka URL: http://localhost:5173/add

**Langkah-langkah Menambah Transaksi:**

1. **Pilih Jenis Transaksi**
   - Klik tombol "💰 Pemasukan" untuk pemasukan
   - Klik tombol "💸 Pengeluaran" untuk pengeluaran

2. **Masukkan Jumlah**
   - Ketik jumlah uang dalam Rupiah
   - Contoh: 50000 untuk Rp 50.000

3. **Pilih Dompet**
   - Pilih dompet dari dropdown
   - Saldo dompet saat ini akan ditampilkan

4. **Pilih Kategori**
   - Pilih kategori yang sesuai
   - Kategori akan berubah sesuai jenis transaksi

5. **Pilih Tanggal**
   - Pilih tanggal transaksi
   - Default: hari ini

6. **Tambahkan Catatan (Opsional)**
   - Tambahkan catatan untuk transaksi
   - Contoh: "Belanja bulanan", "Gaji bulan Mei"

7. **Klik Tombol Submit**
   - Klik "Tambah Pemasukan" atau "Tambah Pengeluaran"
   - Tunggu konfirmasi sukses
   - Anda akan otomatis diarahkan ke Dashboard

**Validasi:**
- ❌ Jumlah harus lebih dari 0
- ❌ Dompet harus dipilih
- ❌ Kategori harus dipilih
- ❌ Tanggal harus valid

---

## Cara Menggunakan

### Skenario 1: Mencatat Gaji Bulanan

1. Buka halaman **Tambah Transaksi** (➕)
2. Pilih **💰 Pemasukan**
3. Masukkan jumlah gaji, contoh: 5000000
4. Pilih dompet: **Bank Account**
5. Pilih kategori: **Salary**
6. Pilih tanggal: Tanggal gajian
7. Tambahkan catatan: "Gaji bulan Mei 2026"
8. Klik **Tambah Pemasukan**
9. Lihat saldo ter-update di Dashboard

### Skenario 2: Mencatat Belanja Harian

1. Buka halaman **Tambah Transaksi** (➕)
2. Pilih **💸 Pengeluaran**
3. Masukkan jumlah belanja, contoh: 150000
4. Pilih dompet: **Cash**
5. Pilih kategori: **Food & Dining**
6. Pilih tanggal: Hari ini
7. Tambahkan catatan: "Belanja sayur dan lauk"
8. Klik **Tambah Pengeluaran**
9. Lihat saldo ter-update di Dashboard

### Skenario 3: Melihat Ringkasan Keuangan

1. Buka **Dashboard** (📊)
2. Lihat **Total Saldo** untuk mengetahui total uang Anda
3. Lihat **Total Pemasukan** dan **Total Pengeluaran**
4. Cek **Arus Kas**:
   - Jika hijau (Surplus): Pemasukan lebih besar dari pengeluaran ✅
   - Jika merah (Defisit): Pengeluaran lebih besar dari pemasukan ⚠️
5. Lihat saldo masing-masing dompet di bagian bawah

### Skenario 4: Melihat Riwayat Pengeluaran

1. Buka **Riwayat Transaksi** (📋)
2. Klik filter **💸 Pengeluaran**
3. Lihat semua pengeluaran yang pernah dibuat
4. Cek kategori mana yang paling banyak pengeluaran
5. Evaluasi kebiasaan pengeluaran Anda

---

## Tips dan Trik

### 💡 Tips Manajemen Keuangan

1. **Catat Setiap Transaksi**
   - Catat segera setelah melakukan transaksi
   - Jangan menunda-nunda pencatatan
   - Gunakan fitur catatan untuk detail tambahan

2. **Gunakan Kategori dengan Benar**
   - Pilih kategori yang sesuai untuk setiap transaksi
   - Ini membantu analisis pengeluaran di masa depan

3. **Pisahkan Dompet**
   - Gunakan dompet berbeda untuk tujuan berbeda
   - Contoh: Cash untuk pengeluaran harian, Bank untuk tabungan

4. **Cek Dashboard Rutin**
   - Lihat dashboard setiap hari
   - Monitor arus kas Anda
   - Pastikan selalu surplus (hijau)

5. **Review Riwayat Transaksi**
   - Review transaksi setiap minggu
   - Identifikasi pengeluaran yang bisa dikurangi
   - Hapus transaksi yang salah input

### 🎯 Best Practices

1. **Konsisten Mencatat**
   - Buat kebiasaan mencatat setiap transaksi
   - Set reminder jika perlu

2. **Gunakan Catatan**
   - Tambahkan catatan untuk transaksi penting
   - Memudahkan ingat detail transaksi

3. **Backup Data**
   - Backup file database secara berkala
   - File database: `backend/prisma/dev.db`

4. **Jangan Hapus Transaksi Sembarangan**
   - Hanya hapus jika benar-benar salah input
   - Transaksi yang dihapus tidak bisa dikembalikan

---

## FAQ

### ❓ Pertanyaan Umum

**Q: Bagaimana cara mengedit transaksi?**
A: Saat ini fitur edit belum tersedia. Anda bisa menghapus transaksi lama dan membuat transaksi baru dengan data yang benar.

**Q: Apakah data saya aman?**
A: Data disimpan secara lokal di komputer Anda dalam database SQLite. Tidak ada data yang dikirim ke server eksternal.

**Q: Bagaimana cara backup data?**
A: Copy file `backend/prisma/dev.db` ke lokasi aman. Untuk restore, copy kembali file tersebut ke folder yang sama.

**Q: Apakah bisa digunakan di HP?**
A: Ya! Aplikasi ini responsive dan bisa diakses dari browser HP. Pastikan backend dan frontend sudah running.

**Q: Bagaimana cara menambah dompet baru?**
A: Saat ini fitur tambah dompet belum tersedia di UI. Anda bisa menggunakan Prisma Studio (`npm run db:studio` di folder backend) untuk menambah dompet.

**Q: Bagaimana cara menambah kategori baru?**
A: Sama seperti dompet, gunakan Prisma Studio untuk menambah kategori baru.

**Q: Kenapa saldo dompet tidak sesuai?**
A: Pastikan semua transaksi sudah dicatat dengan benar. Saldo dihitung otomatis dari semua transaksi.

**Q: Apakah bisa multi-user?**
A: Saat ini aplikasi hanya support single user (userId: 1). Fitur multi-user akan ditambahkan di versi mendatang.

**Q: Bagaimana cara menghapus semua data?**
A: Jalankan `npm run db:push` di folder backend untuk reset database, lalu `npm run db:seed` untuk populate data demo.

---

## Troubleshooting

### ⚠️ Masalah Umum

**Problem: Frontend tidak bisa connect ke backend**
- Pastikan backend sudah running di http://localhost:3001
- Check console browser untuk error message
- Pastikan CORS sudah enabled di backend

**Problem: Data tidak ter-update**
- Refresh halaman (F5)
- Check console untuk error
- Pastikan API endpoint berjalan dengan baik

**Problem: Form tidak bisa submit**
- Check validasi form (semua field required harus diisi)
- Check console untuk error message
- Pastikan backend API berjalan

**Problem: Transaksi tidak muncul di list**
- Refresh halaman
- Check filter yang aktif
- Pastikan transaksi berhasil dibuat (check console)

---

## Kontak & Support

Jika Anda menemukan bug atau memiliki saran, silakan:
- Buat issue di GitHub repository
- Atau hubungi developer

---

**Selamat menggunakan Finance Tracker! 💰📊**

Kelola keuangan Anda dengan lebih baik dan capai tujuan finansial Anda! 🎯
