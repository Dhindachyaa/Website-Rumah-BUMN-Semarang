const express = require('express');
const router = express.Router();
const umkmController = require('../controllers/umkmController');
const uploadUmkm = require('../middleware/uploadUmkm');

router.get('/count/dashboard', umkmController.getUmkmCount);

router.post('/upload', uploadUmkm.single('image'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: 'No file uploaded' });
  }

  res.json({
    message: 'Upload berhasil',
    imagePath: `images/umkm/${req.file.filename}`
  });
});

router.get('/paginate', umkmController.getPagedUMKM);
router.get('/', umkmController.getAll); 
router.post('/', uploadUmkm.single('image'), umkmController.create); 
router.put('/:id', uploadUmkm.single('image'), umkmController.update);
router.post('/:id', uploadUmkm.single('image'), umkmController.update);
router.delete('/:id', umkmController.remove);
router.get('/:id', umkmController.getById);

module.exports = router;