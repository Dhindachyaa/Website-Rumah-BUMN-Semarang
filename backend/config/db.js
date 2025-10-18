const mysql = require('mysql2')

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '', 
  database: 'rbsemarang_db'
})

connection.connect((err) => {
  if (err) throw err
  console.log('Terkoneksi dengan database MySQL!')
})

module.exports = connection
