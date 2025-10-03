const express = require('express');
const router = express.Router();
const galeriController = require('../controllers/galeriController');
const upload = require('../middleware/uploadGaleri');

// ✅ Ambil galeri dengan pagination
router.get('/paginate', galeriController.getPaginatedGaleri);

// ✅ Ambil semua galeri (tanpa pagination)
router.get('/', galeriController.getAllGaleri);

// ✅ Ambil total jumlah galeri
router.get('/count', galeriController.getGaleriCount);

// ✅ Tambah galeri baru
router.post('/', upload.single('gambar'), galeriController.addGaleri);

// ✅ Update galeri (gunakan method override di frontend)
router.post('/:id', upload.single('gambar'), galeriController.updateGaleri);

// ✅ Hapus galeri
router.delete('/:id', galeriController.deleteGaleri);

module.exports = router;