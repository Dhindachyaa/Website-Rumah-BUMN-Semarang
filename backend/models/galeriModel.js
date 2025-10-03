const db = require('../config/db');

const Galeri = {
  // ✅ Ambil semua data galeri (tanpa pagination)
  getAll: (result) => {
    db.query('SELECT * FROM galeri ORDER BY created_at DESC', result);
  },

  // ✅ Ambil data berdasarkan ID
  getById: (id, result) => {
    db.query('SELECT * FROM galeri WHERE id = ?', [id], result);
  },

  // ✅ Tambah galeri baru
  insert: (judul, deskripsi, gambar, result) => {
    db.query(
      'INSERT INTO galeri (judul, deskripsi, gambar) VALUES (?, ?, ?)',
      [judul, deskripsi, gambar],
      result
    );
  },

  // ✅ Update galeri (hanya field yang diubah)
  updateFlexibleById: (id, fields, result) => {
    const keys = Object.keys(fields);
    if (keys.length === 0) return result(null, { affectedRows: 0 });

    const values = keys.map((k) => fields[k]);
    const sql = `UPDATE galeri SET ${keys.map((k) => `${k} = ?`).join(', ')} WHERE id = ?`;
    db.query(sql, [...values, id], result);
  },

  // ✅ Hapus galeri berdasarkan ID
  deleteById: (id, result) => {
    db.query('DELETE FROM galeri WHERE id = ?', [id], result);
  },

  // ✅ Hitung total galeri
  countAll: (result) => {
    db.query('SELECT COUNT(*) AS total FROM galeri', result);
  },

  // ✅ Ambil galeri dengan pagination
  getPaginated: (limit, offset, result) => {
    db.query(
      'SELECT * FROM galeri ORDER BY created_at DESC LIMIT ? OFFSET ?',
      [limit, offset],
      result
    );
  },
};

module.exports = Galeri;