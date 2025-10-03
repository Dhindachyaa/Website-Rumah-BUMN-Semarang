const db = require('../config/db');

// Ambil semua berita
exports.getAllBerita = (result) => {
  db.query('SELECT * FROM berita ORDER BY tanggal DESC', result);
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
