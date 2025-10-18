const express = require('express')
const cors = require('cors')
const methodOverride = require('method-override')
const path = require('path')
const app = express()

require('./config/db')

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use('/images', (req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Cross-Origin-Resource-Policy', 'cross-origin')
  next()
}, express.static(path.join(__dirname, 'public/images')))

app.use(methodOverride((req, res) => {
  if (req.body && typeof req.body === 'object' && '_method' in req.body) {
    const method = req.body._method
    delete req.body._method
    return method
  }
  if (req.originalUrl.includes('_method=PUT')) {
    return 'PUT'
  }
}))

app.use('/images', express.static(path.join(__dirname, 'public/images')))

const adminRoutes = require('./routes/adminRoutes')
const umkmRoutes = require('./routes/umkmRoutes')
const galeriRoutes = require('./routes/galeriRoutes')
const beritaRoutes = require('./routes/beritaRoutes')

app.use('/api/admin', adminRoutes)
app.use('/api/umkm', umkmRoutes)
app.use('/api/galeri', galeriRoutes)
app.use('/api/berita', beritaRoutes)
app.get('/', (req, res) => res.send('Server is up & running'))
app.use((req, res) => {
  res.status(404).json({ message: 'Endpoint tidak ditemukan' })
})

app.use((err, req, res, next) => {
  console.error('GLOBAL ERROR:', err.stack)
  res.status(500).json({ message: 'Terjadi kesalahan di server' })
})

const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
  console.log(`Server berjalan di http://localhost:${PORT}`)
})