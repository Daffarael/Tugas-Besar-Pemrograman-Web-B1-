// ============================================
// Koneksi Database — MySQL Connection Pool
//
// Pakai pool supaya koneksi bisa dipakai ulang
// (lebih efisien daripada buka-tutup terus)
// ============================================

const mysql = require('mysql2/promise');

const pool = mysql.createPool({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    waitForConnections: true,   // kalau semua koneksi lagi dipakai, antri dulu
    connectionLimit: 10,        // maksimal 10 koneksi bersamaan
    queueLimit: 0               // antrian gak dibatasi
});

// Test koneksi pas pertama kali jalan, biar tau langsung kalau DB error
pool.getConnection()
    .then(conn => {
        console.log('Database terhubung!');
        conn.release();     // lepas koneksi balik ke pool, jangan ditahan
    })
    .catch(err => {
        console.error('Gagal konek ke database:', err.message);
    });

module.exports = pool;
