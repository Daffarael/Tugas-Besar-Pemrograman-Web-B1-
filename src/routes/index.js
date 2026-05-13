// ============================================
// Route Aggregator — Kumpulkan Semua Route
//
// Semua route didaftarkan di sini,
// lalu di-mount sekali di app.js
// ============================================

const express = require('express');
const router = express.Router();

const authRoutes = require('./auth.routes');
const dashboardRoutes = require('./dashboard.routes');

// Redirect root ke dashboard
router.get('/', (req, res) => {
    res.redirect('/dashboard');
});

// Mount routes
router.use('/auth', authRoutes);
router.use('/dashboard', dashboardRoutes);

module.exports = router;
