const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Buat folder upload jika belum ada
const uploadDir = path.join(__dirname, '..', 'public', 'images', 'galeri');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// Konfigurasi penyimpanan
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    const uniqueName = Date.now() + '-' + file.originalname.replace(/\s+/g, '_');
    cb(null, uniqueName);
  },
});

const upload = multer({ storage });
module.exports = upload;
