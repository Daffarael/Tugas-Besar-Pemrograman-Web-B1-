// ============================================
// Middleware Permission — Permission-based ACL
//
// Cek permission user dari session
// Permissions didapat saat login via role_has_permissions
// + model_has_permissions
//
// Contoh pakai: hasPermission(['manage-pegawai'])
// ============================================

function hasPermission(requiredPermissions) {
    return (req, res, next) => {
        if (!req.session.user) {
            req.flash('error', 'Silakan login terlebih dahulu');
            return res.redirect('/auth/login');
        }

        const userPermissions = req.session.user.permissions || [];

        // Cek apakah user punya MINIMAL SATU dari permission yang dibutuhkan
        const hasAccess = requiredPermissions.some(perm => userPermissions.includes(perm));

        if (hasAccess) {
            return next();
        }

        res.status(403).render('errors/403', {
            title: 'Akses Ditolak',
            layout: false
        });
    };
}

module.exports = { hasPermission };
