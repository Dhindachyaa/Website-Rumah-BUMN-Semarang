const express = require('express');
const router = express.Router();
const galeriController = require('../controllers/galeriController');
const upload = require('../middleware/uploadGaleri');

router.get('/paginate', galeriController.getPaginatedGaleri);

router.get('/', galeriController.getAllGaleri);

router.get('/count', galeriController.getGaleriCount);

router.post('/', upload.single('gambar'), galeriController.addGaleri);

router.post('/:id', upload.single('gambar'), galeriController.updateGaleri);

router.delete('/:id', galeriController.deleteGaleri);

module.exports = router;