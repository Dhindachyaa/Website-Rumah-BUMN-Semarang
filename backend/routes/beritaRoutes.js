const express = require('express');
const router = express.Router();
const beritaController = require('../controllers/beritaController');
const upload = require('../middleware/uploadBerita');

// ✅ Ambil semua berita
router.get('/', beritaController.getAll);

// ✅ Tambah berita baru
router.post('/', upload.single('gambar'), beritaController.create);

// ✅ Update berita (PUT asli)
router.put('/:id', upload.single('gambar'), beritaController.update);

// ✅ Update via POST + header method override (untuk Vue dan Postman)
router.post('/:id', upload.single('gambar'), (req, res) => {
  const override = req.headers['x-http-method-override'];
  if (override && override.toUpperCase() === 'PUT') {
    return beritaController.update(req, res);
  }
  return res.status(405).json({ message: 'Method tidak diizinkan' });
});

// ✅ Hapus berita
router.delete('/:id', beritaController.remove);

// ✅ Ambil berita berdasarkan ID (letakkan PALING BAWAH!)
router.get('/:id', beritaController.getById);

// ✅ Hitung total berita
router.get('/count/dashboard', beritaController.count);

module.exports = router;
