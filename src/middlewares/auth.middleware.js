// ============================================
// Middleware Auth — Cek Status Login
//
// isAuthenticated: cek sudah login
// isGuest: cek belum login (untuk halaman login)
// ============================================

// Cek apakah user sudah login
function isAuthenticated(req, res, next) {
    if (req.session.user) {
        return next();
    }
    req.flash('error', 'Silakan login terlebih dahulu');
    res.redirect('/auth/login');
}

// Cek apakah user BELUM login (untuk halaman login)
function isGuest(req, res, next) {
    if (!req.session.user) {
        return next();
    }
    res.redirect('/dashboard');
}

module.exports = { isAuthenticated, isGuest };
