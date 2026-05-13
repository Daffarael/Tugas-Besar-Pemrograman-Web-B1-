// ============================================
// Model User — Query Database
//
// Semua interaksi dengan tabel users ada di sini
// Sesuai ERD dosen: role user dihubungkan via
// tabel pivot 'model_has_roles'
// ============================================

const db = require('../config/database');

// Cari user berdasarkan email (untuk login)
// JOIN ke model_has_roles dan roles untuk dapat role_name
async function findByEmail(email) {
    const [rows] = await db.query(
        `SELECT users.*, roles.name as role_name, roles.id as role_id
         FROM users
         JOIN model_has_roles ON model_has_roles.model_id = users.id 
              AND model_has_roles.model_type = 'User'
         JOIN roles ON roles.id = model_has_roles.role_id
         WHERE users.email = ?`,
        [email]
    );
    return rows[0] || null;
}

// Cari user berdasarkan ID (untuk cek session)
async function findById(id) {
    const [rows] = await db.query(
        `SELECT users.*, roles.name as role_name, roles.id as role_id
         FROM users
         JOIN model_has_roles ON model_has_roles.model_id = users.id 
              AND model_has_roles.model_type = 'User'
         JOIN roles ON roles.id = model_has_roles.role_id
         WHERE users.id = ?`,
        [id]
    );
    return rows[0] || null;
}

// Ambil semua permissions milik user tertentu
// Gabung dari 2 sumber:
//   1. Permission langsung (model_has_permissions)
//   2. Permission dari role (role_has_permissions)
async function getUserPermissions(userId) {
    const [rows] = await db.query(
        `SELECT DISTINCT permissions.name
         FROM permissions
         LEFT JOIN model_has_permissions 
              ON model_has_permissions.permission_id = permissions.id
              AND model_has_permissions.model_type = 'User'
              AND model_has_permissions.model_id = ?
         LEFT JOIN role_has_permissions 
              ON role_has_permissions.permission_id = permissions.id
         LEFT JOIN model_has_roles 
              ON model_has_roles.role_id = role_has_permissions.role_id
              AND model_has_roles.model_type = 'User'
              AND model_has_roles.model_id = ?
         WHERE model_has_permissions.model_id IS NOT NULL
            OR model_has_roles.model_id IS NOT NULL`,
        [userId, userId]
    );
    return rows.map(row => row.name);
}

module.exports = { findByEmail, findById, getUserPermissions };
