const db = require('../config/db');

// Ambil semua berita
exports.getAllBerita = (order = 'DESC', result) => {
  const sortOrder = order.toUpperCase() === 'ASC' ? 'ASC' : 'DESC';
  db.query(`SELECT * FROM berita ORDER BY tanggal ${sortOrder}`, result);
};

// Ambil berita berdasarkan ID
exports.getBeritaById = (id, result) => {
  db.query('SELECT * FROM berita WHERE id = ?', [id], result);
};

// Tambah berita
exports.insertBerita = (data, result) => {
  db.query('INSERT INTO berita SET ?', [data], result);
};

// Update berita
exports.updateBerita = (data, id, result) => {
  db.query('UPDATE berita SET ? WHERE id = ?', [data, id], result);
};

// Hapus berita
exports.deleteBerita = (id, result) => {
  db.query('DELETE FROM berita WHERE id = ?', [id], result);
};

// Hitung total berita
exports.countBerita = (result) => {
  db.query('SELECT COUNT(*) AS total FROM berita', result);
};

// Ambil n berita terbaru (DESC)
exports.getLatestBerita = (limit, result) => {
  db.query('SELECT * FROM berita ORDER BY tanggal DESC LIMIT ?', [limit], result);
};
