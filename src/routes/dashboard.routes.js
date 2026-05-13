// ============================================
// Route Dashboard
// ============================================

const express = require('express');
const router = express.Router();
const { isAuthenticated } = require('../middlewares/auth.middleware');

// GET /dashboard → halaman utama setelah login
router.get('/', isAuthenticated, (req, res) => {
    res.render('dashboard/index', {
        title: 'Dashboard'
    });
});

module.exports = router;
