// ============================================
// Entry Point — FTI HC
//
// File ini HANYA untuk start server.
// Semua setup Express ada di src/app.js
// ============================================

require('dotenv').config();

const app = require('./src/app');
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server jalan di http://localhost:${PORT}`);
});
