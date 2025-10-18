const db = require('../config/db');

const Galeri = {

  getAll: (result) => {
    db.query('SELECT * FROM galeri ORDER BY created_at ASC', result);
  },

  getById: (id, result) => {
    db.query('SELECT * FROM galeri WHERE id = ?', [id], result);
  },

  insert: (judul, deskripsi, gambar, result) => {
    db.query(
      'INSERT INTO galeri (judul, deskripsi, gambar) VALUES (?, ?, ?)',
      [judul, deskripsi, gambar],
      result
    );
  },

  updateFlexibleById: (id, fields, result) => {
    const keys = Object.keys(fields);
    if (keys.length === 0) return result(null, { affectedRows: 0 });

    const values = keys.map((k) => fields[k]);
    const sql = `UPDATE galeri SET ${keys.map((k) => `${k} = ?`).join(', ')} WHERE id = ?`;
    db.query(sql, [...values, id], result);
  },

  deleteById: (id, result) => {
    db.query('DELETE FROM galeri WHERE id = ?', [id], result);
  },

  countAll: (result) => {
    db.query('SELECT COUNT(*) AS total FROM galeri', result);
  },

  getPaginated: (limit, offset, result) => {
    db.query(
      'SELECT * FROM galeri ORDER BY created_at ASC LIMIT ? OFFSET ?',
      [limit, offset],
      result
    );
  },
};

module.exports = Galeri;