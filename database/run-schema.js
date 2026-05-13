// ============================================
// Script untuk menjalankan schema.sql via Node.js
// Jalankan: node database/run-schema.js
// ============================================

require('dotenv').config({ path: require('path').join(__dirname, '..', '.env') });
const fs = require('fs');
const path = require('path');
const mysql = require('mysql2/promise');

async function runSchema() {
    const conn = await mysql.createConnection({
        host: process.env.DB_HOST,
        port: process.env.DB_PORT,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        multipleStatements: true
    });

    try {
        console.log('Terhubung ke MySQL...\n');

        // Drop database lama kalau ada
        console.log('Menghapus database lama...');
        await conn.query('DROP DATABASE IF EXISTS fti_hc');
        console.log('✓ Database lama dihapus\n');

        // Baca file schema.sql
        const schemaPath = path.join(__dirname, 'schema.sql');
        const schema = fs.readFileSync(schemaPath, 'utf8');

        // Jalankan schema
        console.log('Menjalankan schema.sql...');
        await conn.query(schema);
        console.log('✓ Schema berhasil dijalankan!\n');

        // Tampilkan tabel yang dibuat
        await conn.query('USE fti_hc');
        const [tables] = await conn.query('SHOW TABLES');
        console.log('Tabel yang dibuat:');
        tables.forEach(t => {
            const tableName = Object.values(t)[0];
            console.log(`  - ${tableName}`);
        });

        console.log('\nDatabase siap digunakan!');

    } catch (err) {
        console.error('Gagal menjalankan schema:', err.message);
    } finally {
        await conn.end();
        process.exit(0);
    }
}

runSchema();
