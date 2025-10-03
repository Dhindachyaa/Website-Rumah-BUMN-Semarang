const path = require('path');
const fs = require('fs');
const beritaModel = require('../models/beritaModel');

// ✅ Ambil semua berita
exports.getAll = (req, res) => {
  beritaModel.getAllBerita((err, data) => {
    if (err) return res.status(500).json({ error: err });
    res.json(data);
  });
};

// ✅ Ambil berita berdasarkan ID
exports.getById = (req, res) => {
  const id = req.params.id;
  beritaModel.getBeritaById(id, (err, data) => {
    if (err) return res.status(500).json({ error: err });
    if (data.length === 0) return res.status(404).json({ message: 'Berita tidak ditemukan' });
    res.json(data[0]);
  });
};

// ✅ Tambah berita baru
exports.create = (req, res) => {
  const { judul, tanggal } = req.body;
  let isi = req.body.isi ? req.body.isi.replace(/\n/g, '<br>') : '';
  const gambar = req.file ? req.file.filename : null;

  const data = { judul, tanggal, isi, gambar };

  beritaModel.insertBerita(data, (err) => {
    if (err) return res.status(500).json({ error: err });
    res.json({ message: '✅ Berita berhasil ditambahkan' });
  });
};

// ✅ Update berita (jika ada gambar baru, hapus gambar lama)
exports.update = (req, res) => {
  const id = req.params.id;
  const { judul, tanggal } = req.body;
  let isi = req.body.isi ? req.body.isi.replace(/\n/g, '<br>') : '';

  const gambarBaru = req.file ? req.file.filename : null;
  const data = { judul, tanggal, isi };
  if (gambarBaru) data.gambar = gambarBaru;

  const updateBerita = () => {
    beritaModel.updateBerita(data, id, (err) => {
      if (err) return res.status(500).json({ error: err });
      res.json({ message: '✅ Berita berhasil diperbarui' });
    });
  };

  if (gambarBaru) {
    // Cek dan hapus gambar lama
    beritaModel.getBeritaById(id, (err, result) => {
      if (!err && result.length > 0) {
        const gambarLama = result[0].gambar;
        if (gambarLama && gambarLama !== 'default-berita.jpg') {
          const pathGambar = path.join(__dirname, '../public/images/berita/', gambarLama);
          if (fs.existsSync(pathGambar)) fs.unlinkSync(pathGambar);
        }
      }
      updateBerita();
    });
  } else {
    updateBerita();
  }
};

// ✅ Hapus berita dan gambar
exports.remove = (req, res) => {
  const id = req.params.id;

  beritaModel.getBeritaById(id, (err, result) => {
    if (err || result.length === 0) {
      return res.status(404).json({ message: 'Berita tidak ditemukan' });
    }

    const gambar = result[0].gambar;
    if (gambar && gambar !== 'default-berita.jpg') {
      const pathGambar = path.join(__dirname, '../public/images/berita/', gambar);
      if (fs.existsSync(pathGambar)) fs.unlinkSync(pathGambar);
    }

    beritaModel.deleteBerita(id, (err) => {
      if (err) return res.status(500).json({ error: err });
      res.json({ message: '🗑️ Berita berhasil dihapus' });
    });
  });
};

// ✅ Hitung total berita
exports.count = (req, res) => {
  beritaModel.countBerita((err, result) => {
    if (err) return res.status(500).json({ error: err });
    res.json(result[0]); // { total: ... }
  });
};
