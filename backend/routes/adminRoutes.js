const express = require('express');
const router = express.Router();
const db = require('../config/db'); // koneksi MySQL

// ========================
// LOGIN ADMIN
// ========================
router.post('/login', (req, res) => {
  const { username, password } = req.body;

  // Validasi input
  if (!username || !password) {
    return res.status(400).json({ message: 'Username dan password wajib diisi' });
  }

  // Cek user di database
  const query = 'SELECT * FROM admin WHERE username = ? AND password = ?';
  db.query(query, [username, password], (err, result) => {
    if (err) {
      console.error('Query error:', err);
      return res.status(500).json({ message: 'Terjadi kesalahan server' });
    }

    if (result.length === 0) {
      return res.status(401).json({ message: 'Username atau password salah' });
    }

    // Login berhasil
    return res.status(200).json({
      message: 'Login berhasil',
      user: {
        id: result[0].id,
        username: result[0].username
      }
    });
  });
});

// ========================
// GET DATA ADMIN (opsional)
// ========================
router.get('/', (req, res) => {
  db.query('SELECT id, username FROM admin', (err, result) => {
    if (err) return res.status(500).json({ message: 'Gagal mengambil data admin' });
    res.status(200).json(result);
  });
});

// ========================
// ADD ADMIN (opsional)
// ========================
router.post('/add', (req, res) => {
  const { username, password } = req.body;
  if (!username || !password)
    return res.status(400).json({ message: 'Semua field wajib diisi' });

  const insertQuery = 'INSERT INTO admin (username, password) VALUES (?, ?)';
  db.query(insertQuery, [username, password], (err, result) => {
    if (err) return res.status(500).json({ message: 'Gagal menambahkan admin' });
    res.status(201).json({ message: 'Admin berhasil ditambahkan' });
  });
});

// ========================
// DELETE ADMIN (opsional)
// ========================
router.delete('/:id', (req, res) => {
  const { id } = req.params;
  db.query('DELETE FROM admin WHERE id = ?', [id], (err, result) => {
    if (err) return res.status(500).json({ message: 'Gagal menghapus admin' });
    res.status(200).json({ message: 'Admin berhasil dihapus' });
  });
});

module.exports = router;
