const express = require('express');
const router = express.Router();
const umkmController = require('../controllers/umkmController');
const uploadUmkm = require('../middleware/uploadUmkm');

// ✅ Route khusus: hitung total UMKM untuk dashboard
router.get('/count/dashboard', umkmController.getUmkmCount);

// ✅ Upload gambar UMKM (opsional digunakan saat upload manual)
router.post('/upload', uploadUmkm.single('image'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: 'No file uploaded' });
  }

  res.json({
    message: 'Upload berhasil',
    imagePath: `images/umkm/${req.file.filename}`
  });
});

// ✅ Route paginasi dan pencarian
router.get('/paginate', umkmController.getPagedUMKM);

// ✅ CRUD UMKM
router.get('/', umkmController.getAll); // Ambil semua UMKM
router.post('/', uploadUmkm.single('image'), umkmController.create); // Tambah UMKM

// ✅ PUT via PUT atau POST override
router.put('/:id', uploadUmkm.single('image'), umkmController.update);
router.post('/:id', uploadUmkm.single('image'), umkmController.update);

// ✅ Hapus UMKM
router.delete('/:id', umkmController.remove);

// ✅ Route detail UMKM (diletakkan paling akhir agar tidak menabrak route lain)
router.get('/:id', umkmController.getById);

module.exports = router;