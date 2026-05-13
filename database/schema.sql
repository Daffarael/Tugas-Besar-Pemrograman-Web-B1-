-- ============================================
-- SCHEMA DATABASE — FTI HC Data Induk Pegawai
-- Sesuai ERD dosen: project-authentication-authorization
-- https://drawsql.app/teams/husnilk/diagrams/project-authentication-authorization
-- ============================================

-- Buat database kalau belum ada
CREATE DATABASE IF NOT EXISTS fti_hc;
USE fti_hc;

-- ============================================
-- 1. Tabel roles
--    Menyimpan daftar role (misal: hr_admin, mhs_admin)
--    guard_name = konteks guard (default: 'web' untuk session-based auth)
-- ============================================
CREATE TABLE IF NOT EXISTS roles (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    guard_name VARCHAR(255) NOT NULL,
    created_at TIMESTAMP NULL DEFAULT NULL,
    updated_at TIMESTAMP NULL DEFAULT NULL
);

-- ============================================
-- 2. Tabel users
--    Menyimpan data akun pengguna
--    Login menggunakan email + password (bukan username)
--    Password disimpan dalam bentuk hash bcrypt
-- ============================================
CREATE TABLE IF NOT EXISTS users (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    email_verified_at DATETIME NULL DEFAULT NULL,
    remember_token VARCHAR(100) NULL DEFAULT NULL,
    two_factor_secret TEXT NULL DEFAULT NULL,
    two_factor_recovery_codes TEXT NULL DEFAULT NULL,
    two_factor_confirmed_at DATETIME NULL DEFAULT NULL,
    updated_at DATETIME NULL DEFAULT NULL,
    created_at DATETIME NULL DEFAULT NULL
);

-- ============================================
-- 3. Tabel permissions
--    Menyimpan daftar permission (misal: manage-pegawai, view-mahasiswa)
--    guard_name = konteks guard, sama seperti di roles
-- ============================================
CREATE TABLE IF NOT EXISTS permissions (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    guard_name VARCHAR(255) NOT NULL,
    created_at TIMESTAMP NULL DEFAULT NULL,
    updated_at TIMESTAMP NULL DEFAULT NULL
);

-- ============================================
-- 4. Tabel pivot model_has_permissions
--    Menghubungkan permission langsung ke user/model tertentu
--    model_type = nama class model (misal: 'User')
--    model_id = ID dari user yang diberi permission
-- ============================================
CREATE TABLE IF NOT EXISTS model_has_permissions (
    permission_id BIGINT UNSIGNED NOT NULL,
    model_type VARCHAR(255) NOT NULL,
    model_id BIGINT UNSIGNED NOT NULL,
    PRIMARY KEY (permission_id, model_id, model_type),
    FOREIGN KEY (permission_id) REFERENCES permissions(id) ON DELETE CASCADE
);

-- ============================================
-- 5. Tabel pivot model_has_roles
--    Menghubungkan role ke user/model tertentu
--    INI YANG MENGGANTIKAN role_id di tabel users
--    model_type = nama class model
--    model_id = ID dari user yang diberi role
-- ============================================
CREATE TABLE IF NOT EXISTS model_has_roles (
    role_id BIGINT UNSIGNED NOT NULL,
    model_type VARCHAR(255) NOT NULL,
    model_id BIGINT UNSIGNED NOT NULL,
    PRIMARY KEY (role_id, model_id, model_type),
    FOREIGN KEY (role_id) REFERENCES roles(id) ON DELETE CASCADE
);

-- ============================================
-- 6. Tabel pivot role_has_permissions
--    Menghubungkan permission ke role
--    Misal: role 'hr_admin' punya permission 'manage-pegawai'
-- ============================================
CREATE TABLE IF NOT EXISTS role_has_permissions (
    permission_id BIGINT UNSIGNED NOT NULL,
    role_id BIGINT UNSIGNED NOT NULL,
    PRIMARY KEY (permission_id, role_id),
    FOREIGN KEY (permission_id) REFERENCES permissions(id) ON DELETE CASCADE,
    FOREIGN KEY (role_id) REFERENCES roles(id) ON DELETE CASCADE
);
