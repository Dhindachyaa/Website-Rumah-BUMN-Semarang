<template>
  <AdminLayout>
    <template #default>
      <div class="dashboard-admin">
        <h2>Dashboard Admin</h2>
        <p>Selamat datang di Dashboard Admin Rumah BUMN</p>

        <div class="dashboard-cards">
          <div class="dashboard-card blue">
            <div class="card-content">
              <h3>Total UMKM</h3>
              <p>{{ totalUmkm }}</p>
              <router-link to="/admin/umkm" class="card-link">Lihat Semua →</router-link>
            </div>
            <i class="fas fa-store card-icon"></i>
          </div>

          <div class="dashboard-card yellow">
            <div class="card-content">
              <h3>Total Galeri</h3>
              <p>{{ totalGaleri }}</p>
              <router-link to="/admin/galeri" class="card-link">Lihat Semua →</router-link>
            </div>
            <i class="fas fa-images card-icon"></i>
          </div>

          <div class="dashboard-card green">
            <div class="card-content">
              <h3>Total Berita</h3>
              <p>{{ totalBerita }}</p>
              <router-link to="/admin/berita" class="card-link">Lihat Semua →</router-link>
            </div>
            <i class="fas fa-newspaper card-icon"></i>
          </div>
        </div>
      </div>
    </template>
  </AdminLayout>
</template>

<script>
import axios from 'axios'
import AdminLayout from '@/layouts/AdminLayout.vue'
import '@/assets/css/admin-dashboard.css'

export default {
  components: { AdminLayout },
  data() {
    return {
      totalUmkm: 0,
      totalGaleri: 0,
      totalBerita: 0
    }
  },
  mounted() {
    this.fetchTotalUmkm()
    this.fetchTotalGaleri()
    this.fetchTotalBerita()
  },
  methods: {
    async fetchTotalUmkm() {
      try {
    const res = await axios.get('http://localhost:3000/api/umkm/count/dashboard')
    this.totalUmkm = res.data.totalItems
      } catch (err) {
        console.error('❌ Gagal ambil data UMKM:', err.message)
      }
    },
    async fetchTotalGaleri() {
      try {
        const res = await axios.get('http://localhost:3000/api/galeri/count')
        this.totalGaleri = res.data.total || 0
      } catch (err) {
        console.error('❌ Gagal ambil data galeri:', err.message)
      }
    },
    async fetchTotalBerita() {
      try {
        const res = await axios.get('http://localhost:3000/api/berita/count/dashboard')
        this.totalBerita = res.data.total || 0
      } catch (err) {
        console.warn('❌ Data berita belum tersedia:', err.message)
      }
    }
  }
}
</script>
