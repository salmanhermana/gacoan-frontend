<<<<<<< HEAD
# Sistem Aplikasi Pemesanan Makanan Digital untuk Meningkatkan Efisiensi Layanan Dine-In di Restoran

| Nama                          | NRP        | Role     |
| ----------------------------- | ---------- | -------- |
| Muhammad Budhi Salmanjannah   | 5025201084 | Frontend |
| Ainun Nadhifah Syamsiyah      | 5025221053 | Backend  |
| Fawwas Aldy Nurramdhan Kaisar | 5025221179 | Backend  |
| Muammar Bahalwan              | 5053231020 | Frontend |

## 🍽️ Gambaran Umum

Aplikasi sistem pemesanan makanan untuk restoran dine-in dirancang untuk meningkatkan efisiensi layanan dan kenyamanan pelanggan. Melalui pemindaian QR code di meja, pelanggan dapat langsung mengakses menu digital, memilih makanan berdasarkan ketersediaan dan kategori, serta melakukan pembayaran tanpa perlu menunggu pelayan. Sistem ini juga mendukung alur kerja dapur dan pelayan dengan fitur pelacakan pesanan secara real-time dan pengelolaan antrian pesanan.

Tujuan utama dari sistem ini adalah menyediakan pengalaman pemesanan yang cepat, akurat, dan terintegrasi antar peran pengguna seperti pelanggan, staf dapur, dan pelayan. Arsitektur perangkat lunak yang dibangun harus mengutamakan keandalan, skalabilitas, dan kemudahan penggunaan, dengan harapan dapat mempercepat proses layanan, mengurangi kesalahan operasional, dan meningkatkan kepuasan semua pihak yang terlibat.

Laporan selengkapnya dapat dilihat di [sini](https://drive.google.com/file/d/1pvrBNacUcCM_Vs9nj4ThdDpkH-ErhTYz/view?usp=sharing).

## 🚀 Fitur

### 🔐 Autentikasi & Otorisasi

- Autentikasi berbasis JWT
- Kontrol akses berbasis peran (RBAC)
- Berbagai peran pengguna: Pelanggan, Dapur, Pelayan, Super Admin

### 📋 Manajemen Pesanan

- Manajemen siklus hidup pesanan lengkap
- Pelacakan status pesanan real-time
- Manajemen antrian dengan kode antrian unik
- Riwayat pesanan dan pagination

### 👨‍🍳 Operasi Dapur

- **Mulai Memasak**: Memulai persiapan makanan
- **Selesai Memasak**: Menandai pesanan siap disajikan
- **Pesanan Berikutnya**: Mendapatkan pesanan berikutnya dalam antrian
- Pelacakan waktu memasak dan deteksi keterlambatan

### 🍽️ Operasi Pelayan

- **Siap Disajikan**: Melihat pesanan siap untuk pengiriman
- **Mulai Mengantar**: Memulai pengiriman makanan
- **Selesai Mengantar**: Menyelesaikan pengiriman pesanan
- Pembaruan status pesanan real-time

### 💳 Pemrosesan Pembayaran

- Integrasi gateway pembayaran Midtrans
- Pelacakan status pembayaran
- Penanganan webhook untuk pembaruan pembayaran
- Pemrosesan transaksi yang aman

### 📊 Manajemen Menu

- Organisasi menu berbasis kategori
- Manajemen ketersediaan menu
- Manajemen harga dengan presisi desimal
- Operasi CRUD item menu

### 🏢 Manajemen Restoran

- Manajemen meja
- Manajemen pengguna
- Riwayat transaksi
- Pelaporan komprehensif

## 🛠️ Stack Teknologi

- **Bahasa**: Typescript
- **Framework**: NextJs
- **State & Data**: React Query untuk data fetching, caching, dan pengelolaan status
- **Autentikasi**: JWT
- **Gateway Pembayaran**: Midtrans

## 📋 Prasyarat

- Node.js versi 18.x atau lebih tinggi
- NextJs versi 15.x
- Git

## 🚀 Instalasi & Setup

### 1. Clone Repository

```bash
git clone https://github.com/salmanhermana/gacoan-frontend
cd gacoan-frontend
```

### 2. Instalasi Dependensi

```bash
npm i
```

### 3. Konfigurasi Environment

Salin dan isi file `.env.example` menjadi `.env` di direktori root:

### 4. Jalankan Aplikasi

```bash
npm run dev
```

Server akan berjalan di `http://localhost:3000`


## 👥 Peran Pengguna & Izin

### 🛒 Pelanggan

- Membuat transaksi
- Melihat riwayat transaksi sendiri
- Melakukan pembayaran

### 👨‍🍳 Dapur

- Melihat pesanan berikutnya dalam antrian
- Mulai/selesai memasak pesanan
- Melihat detail pesanan

### 🍽️ Pelayan

- Melihat pesanan siap disajikan
- Mulai/selesai mengantar pesanan
- Memperbarui status pesanan

## Lainnya

Repository backend dapat dilihat di [sini](https://github.com/ainunns/gacoan-backend/).
=======
[**Dokumen FP Kelompok 7**](https://drive.google.com/file/d/1pvrBNacUcCM_Vs9nj4ThdDpkH-ErhTYz/view?usp=sharing)
>>>>>>> fabeebc564f81924444247b30d5cb7e59202c0e0
