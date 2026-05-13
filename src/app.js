// ============================================
// Express App Setup — FTI HC
//
// Semua konfigurasi Express ada di sini:
// - View engine, static files
// - Session, flash, method-override
// - Global variables
// - Custom layout engine
// - Route mounting
// - Error handling
// ============================================

const express = require('express');
const path = require('path');
const session = require('express-session');
const flash = require('express-flash');
const methodOverride = require('method-override');

const app = express();

// =============================================
// VIEW ENGINE
// =============================================
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '..', 'views'));

// =============================================
// MIDDLEWARE
// =============================================
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, '..', 'public')));
app.use(methodOverride('_method'));

// =============================================
// SESSION & FLASH
// =============================================
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
        httpOnly: true,
        sameSite: 'strict',
        secure: false,
        maxAge: 1000 * 60 * 60      // 1 jam
    }
}));
app.use(flash());

// =============================================
// GLOBAL VARIABLES
// =============================================
app.use((req, res, next) => {
    res.locals.user = req.session.user || null;
    res.locals.success = req.flash('success');
    res.locals.error = req.flash('error');
    next();
});

// =============================================
// CUSTOM LAYOUT ENGINE
// EJS gak punya layout bawaan, jadi kita bikin sendiri
// =============================================
const originalRender = express.response.render;
express.response.render = function (view, options = {}) {
    if (options.layout === false) {
        return originalRender.call(this, view, options);
    }
    const res = this;
    originalRender.call(res, view, options, (err, html) => {
        if (err) return res.req.next(err);
        originalRender.call(res, 'layouts/main', { ...options, body: html });
    });
};

// =============================================
// ROUTES (dari route aggregator)
// =============================================
const routes = require('./routes');
app.use('/', routes);

// =============================================
// ERROR HANDLING
// =============================================

// 404 — halaman tidak ditemukan
app.use((req, res) => {
    res.status(404).render('errors/404', {
        title: 'Halaman Tidak Ditemukan',
        layout: false
    });
});

// 500 — error server
app.use((err, req, res, next) => {
    console.error('Server error:', err);
    res.status(500).render('errors/500', {
        title: 'Kesalahan Server',
        layout: false
    });
});

module.exports = app;
