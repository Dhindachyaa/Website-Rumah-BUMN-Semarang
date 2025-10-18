const db = require('../config/db');
const path = require('path');
const fs = require('fs');
const umkmModel = require('../models/umkmModel');

const normalizeImagePath = (imagePath) => {
 if (!imagePath) return null;
 let cleanPath = imagePath.replace(/^images\//, '');

 if (!cleanPath.startsWith('umkm/')) {
   cleanPath = `umkm/${cleanPath}`;
 }
 
 return cleanPath;
};

exports.getAll = (req, res) => {
 const search = req.query.search || '';
 const kategori = req.query.kategori || '';
 const limit = parseInt(req.query.limit) || 0;
 const offset = parseInt(req.query.offset) || 0;

 let sql = `
   SELECT * FROM umkm
   WHERE nama LIKE ? 
 `;
 const params = [`%${search}%`];

 if (kategori !== '') {
   sql += ' AND kategori = ?';
   params.push(kategori);
 }

 if (limit > 0) {
   sql += ' LIMIT ? OFFSET ?';
   params.push(limit, offset);
 }

 db.query(sql, params, (err, result) => {
   if (err) return res.status(500).json({ message: 'Gagal mengambil data', error: err });
   
   const normalizedResult = result.map(item => ({
     ...item,
     image_path: normalizeImagePath(item.image_path)
   }));
   
   res.json({ data: normalizedResult });
 });
};

exports.getById = (req, res) => {
 const id = req.params.id;
 db.query('SELECT * FROM umkm WHERE id = ?', [id], (err, result) => {
   if (err) return res.status(500).json({ message: 'Gagal mengambil data', error: err });
   if (result.length === 0) return res.status(404).json({ message: 'UMKM tidak ditemukan' });

   const umkm = result[0];
   umkm.image_path = normalizeImagePath(umkm.image_path);
   
   res.json(umkm);
 });
};

exports.create = (req, res) => {
 console.log('req.body:', req.body)
 console.log('req.file:', req.file)

 const { nama, deskripsi, varian, kategori, harga, instagram } = req.body
 const image_path = req.file ? `umkm/${req.file.filename}` : 'umkm/rumah-bumn.png';

 const sql = `
   INSERT INTO umkm (nama, deskripsi, varian, kategori, harga, instagram, image_path)
   VALUES (?, ?, ?, ?, ?, ?, ?)
 `
 const values = [nama, deskripsi, varian, kategori, harga, instagram, image_path]

 db.query(sql, values, (err, result) => {
   if (err) return res.status(500).json({ message: 'Gagal menambah data', error: err })
   res.status(201).json({ message: 'UMKM berhasil ditambahkan', id: result.insertId })
 })
}

exports.update = (req, res) => {
 const id = req.params.id;

 db.query('SELECT * FROM umkm WHERE id = ?', [id], (err, results) => {
   if (err) return res.status(500).json({ message: 'Gagal mengambil data lama', error: err });
   if (results.length === 0) return res.status(404).json({ message: 'UMKM tidak ditemukan' });

   const oldData = results[0];

   const {
     nama = oldData.nama,
     deskripsi = oldData.deskripsi,
     varian = oldData.varian,
     kategori = oldData.kategori,
     harga = oldData.harga,
     instagram = oldData.instagram
   } = req.body;

   const normalizedOldPath = normalizeImagePath(oldData.image_path);
   const newImage = req.file
     ? `umkm/${req.file.filename}`
     : normalizedOldPath;

   const sql = `
     UPDATE umkm
     SET nama=?, deskripsi=?, varian=?, kategori=?, harga=?, instagram=?, image_path=?
     WHERE id=?
   `;
   const values = [nama, deskripsi, varian, kategori, harga, instagram, newImage, id];

   db.query(sql, values, (err) => {
     console.log('Query:', sql);
     console.log('Values:', values);
     if (err) {
       console.error('SQL ERROR:', err);
       return res.status(500).json({ message: 'Gagal mengupdate data', error: err });
     }

     if (req.file && oldData.image_path && !oldData.image_path.includes('rumah-bumn.png')) {
       const oldImagePath = oldData.image_path.startsWith('images/') 
         ? path.join(__dirname, '../public/', oldData.image_path)
         : path.join(__dirname, '../public/images/', oldData.image_path);
         
       fs.unlink(oldImagePath, (err) => {
         if (err) console.error('Gagal menghapus gambar lama:', err);
       });
     }

     res.json({ message: 'UMKM berhasil diupdate' });
   });
 });
};

exports.remove = (req, res) => {
 const id = req.params.id;

 db.query('SELECT image_path FROM umkm WHERE id = ?', [id], (err, results) => {
   if (err) return res.status(500).json({ message: 'Gagal mengambil data', error: err });
   if (results.length === 0) return res.status(404).json({ message: 'UMKM tidak ditemukan' });

   const imagePath = results[0].image_path;

   db.query('DELETE FROM umkm WHERE id = ?', [id], (err) => {
     if (err) return res.status(500).json({ message: 'Gagal menghapus data', error: err });

     if (imagePath && !imagePath.includes('rumah-bumn.png')) {
       const fullPath = imagePath.startsWith('images/') 
         ? path.join(__dirname, '../public/', imagePath)
         : path.join(__dirname, '../public/images/', imagePath);
         
       fs.unlink(fullPath, (err) => {
         if (err) console.error('Gagal menghapus gambar:', err);
       });
     }

     res.json({ message: 'UMKM berhasil dihapus' });
   });
 });
};

exports.getPagedUMKM = async (req, res) => {
 const limit = parseInt(req.query.limit) || 20;
 const offset = parseInt(req.query.offset) || 0;
 const search = req.query.search || '';
 const category = req.query.kategori || '';

 try {
   umkmModel.getPagedUMKM(limit, offset, search, category, (err, data) => {
     if (err) return res.status(500).json({ error: err.message });

     const normalizedData = data.map(item => ({
       ...item,
       image_path: normalizeImagePath(item.image_path)
     }));

     umkmModel.getTotalCount(search, category, (countErr, countRes) => {
       if (countErr) return res.status(500).json({ error: countErr.message });

       const total = countRes?.total || 0;
       const currentPage = Math.floor(offset / limit) + 1;
       const totalPages = Math.ceil(total / limit);

       res.json({
         data: normalizedData,
         pagination: {
           currentPage,
           totalPages,
         }
       });
     });
   });
 } catch (err) {
   res.status(500).json({ error: 'Server Error' });
 }
};

exports.getUmkmCount = (req, res) => {
 db.query('SELECT COUNT(*) AS totalItems FROM umkm', (err, result) => {
   if (err) return res.status(500).json({ message: 'Gagal ambil data', error: err });
   res.json({ totalItems: result[0].totalItems });
 });
};