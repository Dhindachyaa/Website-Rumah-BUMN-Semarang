const db = require('../config/db');

// Ambil semua UMKM dengan paginasi, filter, dan search
// ✔️ getPagedUMKM – TIDAK pakai res[0]
exports.getPagedUMKM = (limit, offset, search, category, result) => {
  let query = `
    SELECT id, nama, deskripsi, varian, kategori, harga, instagram, image_path
    FROM umkm
    WHERE 1=1`;
  const params = [];

  if (search) {
    query += ' AND nama LIKE ?';
    params.push(`%${search}%`);
  }

  if (category && category !== '') {
    query += ' AND kategori = ?';
    params.push(category);
  }

  query += ' LIMIT ? OFFSET ?';
  params.push(limit, offset);

  console.log('>> SQL:', query);
  console.log('>> PARAMS:', params);

  db.query(query, params, (err, res) => {
    if (err) return result(err, null);
    result(null, res);
  });
};


// ✔️ getTotalCount – GUNAKAN res[0]
exports.getTotalCount = (search, category, callback) => {
  let sql = `SELECT COUNT(*) AS total FROM umkm WHERE 1=1`;
  const params = [];

  if (search) {
    sql += ' AND nama LIKE ?';
    params.push(`%${search}%`);
  }

  if (category && category !== '') {
    sql += ' AND kategori = ?';
    params.push(category);
  }

  db.query(sql, params, (err, results) => {
    if (err) return callback(err);
    callback(null, results[0]);
  });
};


// Ambil UMKM by ID
exports.getUMKMById = (id, result) => {
  db.query(
    `SELECT id, nama, deskripsi, varian, kategori, harga, instagram, image_path
     FROM umkm WHERE id = ?`,
    [id],
    (err, res) => {
      if (err) return result(err, null);
      result(null, res);
    }
  );
};

// Tambah UMKM (tanpa menyertakan ID karena auto_increment)
exports.addUMKM = (data, result) => {
  const sql = `
    INSERT INTO umkm (nama, deskripsi, varian, kategori, harga, instagram, image_path)
    VALUES (?, ?, ?, ?, ?, ?, ?)`;
  const values = [
    data.nama,
    data.deskripsi,
    data.varian,
    data.kategori,
    data.harga,
    data.instagram,
    data.image_path,
  ];
  db.query(sql, values, result);
};

// Update UMKM
exports.updateUMKM = (id, data, result) => {
  const sql = `
    UPDATE umkm
    SET nama = ?, deskripsi = ?, varian = ?, kategori = ?, harga = ?, instagram = ?, image_path = ?
    WHERE id = ?`;
  const values = [
    data.nama,
    data.deskripsi,
    data.varian,
    data.kategori,
    data.harga,
    data.instagram,
    data.image_path,
    id,
  ];
  db.query(sql, values, result);
};

// Hapus UMKM
exports.deleteUMKM = (id, result) => {
  db.query('DELETE FROM umkm WHERE id = ?', [id], result);
};