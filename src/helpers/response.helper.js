// ============================================
// Response Helper — Standardized JSON Response
//
// Format konsisten untuk semua API response
// Dipakai di Minggu 12-13 saat buat REST API
//
// Contoh: responseHelper.success(res, 200, 'Data berhasil diambil', data)
// ============================================

function success(res, statusCode, message, data = null) {
    return res.status(statusCode).json({
        status: 'success',
        message: message,
        data: data
    });
}

function error(res, statusCode, message, errors = null) {
    return res.status(statusCode).json({
        status: 'error',
        message: message,
        errors: errors
    });
}

module.exports = { success, error };
