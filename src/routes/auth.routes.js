// ============================================
// Route Auth — Login & Logout
// ============================================

const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth.controller');
const { isGuest } = require('../middlewares/auth.middleware');

// GET /auth/login → tampilkan form login
router.get('/login', isGuest, authController.showLogin);

// POST /auth/login → proses login
router.post('/login', authController.processLogin);

// POST /auth/logout → proses logout
router.post('/logout', authController.processLogout);

module.exports = router;
