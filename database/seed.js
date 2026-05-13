// ============================================
// Script untuk mengisi data awal (seed) ke database
// Jalankan sekali saja: node database/seed.js
//
// Sesuai ERD dosen: project-authentication-authorization
// ============================================

require('dotenv').config({ path: require('path').join(__dirname, '..', '.env') });
const bcrypt = require('bcryptjs');
const db = require('../src/config/database');

async function seed() {
    try {
        console.log('Mulai seeding database...\n');

        // 1. Insert roles
        console.log('Membuat roles...');
        await db.query(`
            INSERT IGNORE INTO roles (id, name, guard_name, created_at, updated_at) VALUES
            (1, 'hr_admin', 'web', NOW(), NOW()),
            (2, 'mhs_admin', 'web', NOW(), NOW())
        `);
        console.log('✓ Roles berhasil dibuat\n');

        // 2. Insert permissions
        console.log('Membuat permissions...');
        await db.query(`
            INSERT IGNORE INTO permissions (id, name, guard_name, created_at, updated_at) VALUES
            (1, 'manage-pegawai', 'web', NOW(), NOW()),
            (2, 'manage-jabatan', 'web', NOW(), NOW()),
            (3, 'manage-struktur', 'web', NOW(), NOW()),
            (4, 'manage-sbm', 'web', NOW(), NOW()),
            (5, 'manage-mahasiswa', 'web', NOW(), NOW())
        `);
        console.log('✓ Permissions berhasil dibuat\n');

        // 3. Hubungkan permission ke role
        console.log('Menghubungkan permissions ke roles...');
        await db.query(`
            INSERT IGNORE INTO role_has_permissions (permission_id, role_id) VALUES
            (1, 1), (2, 1), (3, 1), (4, 1),
            (5, 2)
        `);
        console.log('✓ Role-permissions berhasil dihubungkan\n');

        // 4. Hash password lalu insert users
        console.log('Membuat users...');
        const passwordAdmin = await bcrypt.hash('admin123', 10);
        const passwordMhs = await bcrypt.hash('mhs123', 10);

        await db.query(`
            INSERT IGNORE INTO users (id, name, email, password, created_at, updated_at) VALUES
            (1, ?, ?, ?, NOW(), NOW()),
            (2, ?, ?, ?, NOW(), NOW())
        `, [
            'Admin Kepegawaian', 'hr_admin@fti.unand.ac.id', passwordAdmin,
            'Admin Kemahasiswaan', 'mhs_admin@fti.unand.ac.id', passwordMhs
        ]);
        console.log('✓ Users berhasil dibuat\n');

        // 5. Hubungkan user ke role
        console.log('Menghubungkan users ke roles...');
        await db.query(`
            INSERT IGNORE INTO model_has_roles (role_id, model_type, model_id) VALUES
            (1, 'User', 1),
            (2, 'User', 2)
        `);
        console.log('✓ User-roles berhasil dihubungkan\n');

        // 6. Tampilkan akun
        console.log('=================================');
        console.log('AKUN UNTUK LOGIN:');
        console.log('=================================');
        console.log('1. Admin Kepegawaian');
        console.log('   Email   : hr_admin@fti.unand.ac.id');
        console.log('   Password: admin123');
        console.log('');
        console.log('2. Admin Kemahasiswaan');
        console.log('   Email   : mhs_admin@fti.unand.ac.id');
        console.log('   Password: mhs123');
        console.log('=================================\n');

        console.log('Seeding selesai!');
        process.exit(0);

    } catch (err) {
        console.error('Gagal seeding:', err.message);
        process.exit(1);
    }
}

seed();
