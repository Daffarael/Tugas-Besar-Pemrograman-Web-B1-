// ============================================
// Controller Auth — Login & Logout
//
// Handle semua logic proses masuk/keluar
// Login menggunakan EMAIL (sesuai ERD dosen)
// Role diambil dari pivot table model_has_roles
// ============================================

const bcrypt = require('bcryptjs');
const UserModel = require('../models/user.model');

// Tampilkan halaman login
function showLogin(req, res) {
    res.render('auth/login', {
        title: 'Login',
        layout: false
    });
}

// Proses login (saat user klik tombol login)
async function processLogin(req, res) {
    try {
        const { email, password } = req.body;

        // Validasi: email dan password wajib diisi
        if (!email || !password) {
            req.flash('error', 'Email dan password wajib diisi');
            return res.redirect('/auth/login');
        }

        // Cari user di database berdasarkan email
        const user = await UserModel.findByEmail(email);

        if (!user) {
            req.flash('error', 'Email atau password salah');
            return res.redirect('/auth/login');
        }

        // Cek password: bandingkan yang diketik dengan hash di database
        const passwordValid = await bcrypt.compare(password, user.password);

        if (!passwordValid) {
            req.flash('error', 'Email atau password salah');
            return res.redirect('/auth/login');
        }

        // Ambil permissions user (dari direct + role permissions)
        const permissions = await UserModel.getUserPermissions(user.id);

        // Login berhasil! Simpan data user ke session
        req.session.user = {
            id: user.id,
            name: user.name,
            email: user.email,
            role_id: user.role_id,
            role_name: user.role_name,
            permissions: permissions
        };

        res.redirect('/dashboard');

    } catch (err) {
        console.error('Error saat login:', err);
        req.flash('error', 'Terjadi kesalahan sistem');
        res.redirect('/auth/login');
    }
}

// Proses logout
function processLogout(req, res) {
    req.session.destroy((err) => {
        if (err) {
            console.error('Error saat logout:', err);
        }
        res.redirect('/auth/login');
    });
}

module.exports = { showLogin, processLogin, processLogout };
