const db = require('../config/db');

exports.getAllBerita = (order = 'DESC', result) => {
  const sortOrder = order.toUpperCase() === 'ASC' ? 'ASC' : 'DESC';
  db.query(`SELECT * FROM berita ORDER BY tanggal ${sortOrder}`, result);
};

exports.getBeritaById = (id, result) => {
  db.query('SELECT * FROM berita WHERE id = ?', [id], result);
};

exports.insertBerita = (data, result) => {
  db.query('INSERT INTO berita SET ?', [data], result);
};

exports.updateBerita = (data, id, result) => {
  db.query('UPDATE berita SET ? WHERE id = ?', [data, id], result);
};

exports.deleteBerita = (id, result) => {
  db.query('DELETE FROM berita WHERE id = ?', [id], result);
};

exports.countBerita = (result) => {
  db.query('SELECT COUNT(*) AS total FROM berita', result);
};

exports.getLatestBerita = (limit, result) => {
  db.query('SELECT * FROM berita ORDER BY tanggal DESC LIMIT ?', [limit], result);
};
