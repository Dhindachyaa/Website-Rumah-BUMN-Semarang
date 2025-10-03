const multer = require('multer')
const path = require('path')
const fs = require('fs')

const uploadPath = path.join(__dirname, '../public/images/umkm')

if (!fs.existsSync(uploadPath)) {
  fs.mkdirSync(uploadPath, { recursive: true })  // auto buat folder jika belum ada
}

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadPath)
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    cb(null, uniqueSuffix + path.extname(file.originalname))
  }
})

const fileFilter = (req, file, cb) => {
  const allowedTypes = ['image/jpeg', 'image/png', 'image/jpg']
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true)
  } else {
    cb(new Error('File harus berupa gambar'), false)
  }
}

const uploadUmkm = multer({ storage, fileFilter })

module.exports = uploadUmkm