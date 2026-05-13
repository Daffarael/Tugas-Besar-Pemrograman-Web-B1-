// ============================================
// Validator Auth — Validasi Input Login
//
// Placeholder untuk Minggu 12 (Validasi Data)
// Nanti bisa pakai express-validator di sini
// ============================================

function validateLogin(req, res, next) {
    const { email, password } = req.body;
    const errors = [];

    if (!email || email.trim() === '') {
        errors.push('Email wajib diisi');
    }

    if (!password || password.trim() === '') {
        errors.push('Password wajib diisi');
    }

    if (email && !/\S+@\S+\.\S+/.test(email)) {
        errors.push('Format email tidak valid');
    }

    if (errors.length > 0) {
        req.flash('error', errors[0]);
        return res.redirect('/auth/login');
    }

    next();
}

module.exports = { validateLogin };
