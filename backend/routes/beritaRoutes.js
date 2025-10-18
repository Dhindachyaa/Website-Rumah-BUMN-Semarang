const express = require('express');
const router = express.Router();
const beritaController = require('../controllers/beritaController');
const upload = require('../middleware/uploadBerita');

router.get('/', beritaController.getAll);

router.post('/', upload.single('gambar'), beritaController.create);

router.put('/:id', upload.single('gambar'), beritaController.update);

router.post('/:id', upload.single('gambar'), (req, res) => {
  const override = req.headers['x-http-method-override'];
  if (override && override.toUpperCase() === 'PUT') {
    return beritaController.update(req, res);
  }
  return res.status(405).json({ message: 'Method tidak diizinkan' });
});

router.delete('/:id', beritaController.remove);

router.get('/count/dashboard', beritaController.count);

router.get('/terkini', beritaController.getBeritaTerkini);

router.get('/:id', beritaController.getById);

module.exports = router;
