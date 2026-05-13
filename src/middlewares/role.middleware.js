// ============================================
// Middleware Role — Role-based ACL
//
// Cek role user dari session
// Role didapat saat login via pivot model_has_roles
//
// Contoh pakai: authorize(['hr_admin'])
// ============================================

function authorize(allowedRoles) {
    return (req, res, next) => {
        if (!req.session.user) {
            req.flash('error', 'Silakan login terlebih dahulu');
            return res.redirect('/auth/login');
        }

        if (allowedRoles.includes(req.session.user.role_name)) {
            return next();
        }

        res.status(403).render('errors/403', {
            title: 'Akses Ditolak',
            layout: false
        });
    };
}

module.exports = { authorize };
