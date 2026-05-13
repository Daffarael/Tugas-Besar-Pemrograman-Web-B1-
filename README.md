# 📚 FTI HC — Sistem Informasi Data Induk Pegawai

> Tugas Besar Pemrograman Web — Kelompok B1  
> Sistem Informasi, FTI Universitas Andalas

## 📋 Deskripsi

Aplikasi web untuk mengelola **Data Induk Pegawai** di lingkungan FTI HC (Human Capital). Sistem ini memiliki fitur autentikasi, otorisasi berbasis role & permission, serta modul CRUD untuk pengelolaan data pegawai, jabatan, SBM, mahasiswa, dan struktur organisasi.

## 🛠️ Tech Stack

| Teknologi | Keterangan |
|-----------|-----------|
| **Express.js** | Backend framework (Node.js) |
| **MySQL** | Database (mysql2, tanpa ORM) |
| **EJS** | Template engine (server-side rendering) |
| **Basecoat UI** | CSS framework (dari dosen) |
| **Tailwind CSS** | Utility-first CSS (CDN) |
| **bcryptjs** | Hash password |
| **express-session** | Session management |

## 👥 Anggota Kelompok

| No | NIM | Nama | GitHub |
|----|-----|------|--------|
| 1 | 2411523002 | Ayesah Lutfiah Maharani | [@ayesahlutfiahmaharani-sudo](https://github.com/ayesahlutfiahmaharani-sudo) |
| 2 | 2411523011 | Firzatunnisa | [@firzatunnisa](https://github.com/firzatunnisa) |
| 3 | 2411523015 | Daffarael Anaqi Ali | [@Daffarael](https://github.com/Daffarael) |
| 4 | 2411523019 | Luthfi Harisna Mufti | [@luthfiharisnaa](https://github.com/luthfiharisnaa) |
| 5 | 2411523027 | Tasya Putri Wandari | [@tasyaputriwandari](https://github.com/tasyaputriwandari) |

## 📝 Pembagian Tugas

| Nama | Tugas | File |
|------|-------|------|
| Ayesah | Project Setup | `server.js`, `package.json`, `.gitignore`, `src/app.js` |
| Firzatunnisa | Database Config + Schema + Seed | `src/config/database.js`, `database/*` |
| Luthfi | Model + Controller + Routes | `src/models/`, `src/controllers/`, `src/routes/` |
| Daffarael | Middleware + Login UI + Styling + README | `src/middlewares/`, `src/helpers/`, `src/validators/`, `views/errors/`, `views/auth/`, `public/`, `README.md` |
| Tasya | Layout + Dashboard + Page Scaffolding | `views/layouts/`, `views/partials/`, `views/dashboard/` + scaffold halaman modul (`views/pegawai/`, `views/jabatan/`, `views/sbm/`, `views/mahasiswa/`, `views/struktur/`) |

> **Catatan:** Halaman modul CRUD (pegawai, jabatan, sbm, mahasiswa, struktur) pada tahap ini masih berupa *placeholder* — hanya struktur folder dan file awal yang disiapkan. Implementasi fungsionalitas penuh akan dilakukan pada iterasi berikutnya.

## 📁 Struktur Project

```
├── server.js                    ← entry point
├── src/
│   ├── app.js                   ← Express setup
│   ├── config/database.js       ← MySQL connection pool
│   ├── models/                  ← query database
│   ├── controllers/             ← logic handler
│   ├── routes/                  ← routing
│   ├── middlewares/             ← auth, role, permission
│   ├── helpers/                 ← response helper
│   └── validators/             ← validasi input
├── views/
│   ├── layouts/main.ejs         ← layout utama
│   ├── partials/                ← sidebar, header, flash
│   ├── auth/login.ejs           ← halaman login
│   ├── dashboard/index.ejs      ← dashboard
│   └── errors/                  ← 403, 404, 500
├── public/
│   ├── css/style.css            ← custom styling
│   └── images/                  ← logo, background
├── database/
│   ├── schema.sql               ← 6 tabel (sesuai ERD)
│   ├── seed.js                  ← data awal
│   └── run-schema.js            ← script setup DB
└── .gitignore
```

## 🚀 Cara Menjalankan

### 1. Clone & Install
```bash
git clone https://github.com/Daffarael/Tugas-Besar-Pemrograman-Web-B1-.git
cd Tugas-Besar-Pemrograman-Web-B1-
npm install
```

### 2. Setup Environment
Buat file `.env` di root (sesuaikan dengan konfigurasi lokal):
```env
PORT=3000
DB_HOST=localhost
DB_PORT=3306
DB_USER=your_db_user
DB_PASSWORD=your_db_password
DB_NAME=fti_hc
SESSION_SECRET=your_secret_key
```

### 3. Setup Database
```bash
npm run db:schema    # buat database + tabel
npm run db:seed      # isi data awal
```

### 4. Jalankan Server
```bash
npm run dev          # development (auto-reload)
npm start            # production
```

### 5. Buka Browser
```
http://localhost:3000/auth/login
```

## 🔐 Akun Default

| Role | Email | Password |
|------|-------|----------|
| Admin Kepegawaian | `hr_admin@fti.unand.ac.id` | `admin123` |
| Admin Kemahasiswaan | `mhs_admin@fti.unand.ac.id` | `mhs123` |

## 📊 Database (ERD)

Sesuai ERD dosen: [DrawSQL](https://drawsql.app/teams/husnilk/diagrams/project-authentication-authorization)

6 tabel: `roles`, `users`, `permissions`, `model_has_permissions`, `model_has_roles`, `role_has_permissions`

## 📝 Lisensi

Project ini dibuat untuk keperluan akademik mata kuliah Pemrograman Web, FTI Universitas Andalas.
