const Galeri = require('../models/galeriModel');
const path = require('path');
const fs = require('fs');
const db = require('../config/db');

// ✅ Ambil semua galeri (tanpa pagination)
exports.getAllGaleri = (req, res) => {
  Galeri.getAll((err, result) => {
    if (err) return res.status(500).json({ message: 'Gagal mengambil data galeri' });
    res.json(result);
  });
};

// ✅ Ambil galeri dengan pagination
exports.getPaginatedGaleri = (req, res) => {
  const limit = parseInt(req.query.limit) || 9;
  const offset = parseInt(req.query.offset) || 0;

  Galeri.getPaginated(limit, offset, (err, data) => {
    if (err) return res.status(500).json({ message: 'Gagal mengambil data galeri' });

    Galeri.countAll((err, countResult) => {
      if (err) return res.status(500).json({ message: 'Gagal menghitung data galeri' });

      const totalItems = countResult[0].total;
      const totalPages = Math.ceil(totalItems / limit);
      const currentPage = Math.floor(offset / limit) + 1;

      res.json({
        data,
        pagination: {
          totalItems,
          totalPages,
          currentPage,
        },
      });
    });
  });
};

// ✅ Ambil jumlah total galeri
exports.getGaleriCount = (req, res) => {
  db.query('SELECT COUNT(*) AS total FROM galeri', (err, result) => {
    if (err) return res.status(500).json({ message: 'Gagal menghitung galeri' });
    res.json({ total: result[0].total });
  });
};

// ✅ Tambah galeri baru
exports.addGaleri = (req, res) => {
  const { judul, deskripsi } = req.body;
  const gambar = req.file?.filename;

  if (!judul || !deskripsi || !gambar) {
    return res.status(400).json({ message: 'Semua field wajib diisi' });
  }

  Galeri.insert(judul, deskripsi, gambar, (err) => {
    if (err) return res.status(500).json({ message: 'Gagal menambahkan galeri' });
    res.json({ message: 'Galeri berhasil ditambahkan' });
  });
};

// ✅ Update galeri (judul, deskripsi, gambar opsional)
exports.updateGaleri = (req, res) => {
  const { judul, deskripsi } = req.body;
  const id = req.params.id;
  const newImage = req.file?.filename;

  Galeri.getById(id, (err, result) => {
    if (err) return res.status(500).json({ message: 'Gagal mengambil data' });
    if (result.length === 0) return res.status(404).json({ message: 'Data tidak ditemukan' });

    const oldData = result[0];
    const updateFields = {};

    if (judul && judul !== oldData.judul) updateFields.judul = judul;
    if (deskripsi && deskripsi !== oldData.deskripsi) updateFields.deskripsi = deskripsi;
    if (newImage) {
      updateFields.gambar = newImage;

      const oldPath = path.join(__dirname, '..', 'public', 'images', 'galeri', oldData.gambar);
      if (fs.existsSync(oldPath)) fs.unlinkSync(oldPath);
    }

    if (Object.keys(updateFields).length === 0) {
      return res.status(400).json({ message: 'Tidak ada perubahan dilakukan' });
    }

    Galeri.updateFlexibleById(id, updateFields, (err) => {
      if (err) return res.status(500).json({ message: 'Gagal memperbarui galeri' });
      res.json({ message: 'Galeri berhasil diperbarui' });
    });
  });
};

// ✅ Hapus galeri
exports.deleteGaleri = (req, res) => {
  const id = req.params.id;

  Galeri.getById(id, (err, result) => {
    if (err) return res.status(500).json({ message: 'Gagal mengambil data' });
    if (result.length === 0) return res.status(404).json({ message: 'Data tidak ditemukan' });

    const gambar = result[0].gambar;
    const filePath = path.join(__dirname, '..', 'public', 'images', 'galeri', gambar);

    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }

    Galeri.deleteById(id, (err) => {
      if (err) return res.status(500).json({ message: 'Gagal menghapus galeri' });
      res.json({ message: 'Galeri berhasil dihapus' });
    });
  });
};