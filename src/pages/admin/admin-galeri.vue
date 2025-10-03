
<template>
  <AdminLayout>
    <div class="admin-galeri-page">
      <h1>Kelola Galeri</h1>

      <!-- Tombol Tambah Galeri -->
      <div class="toolbar">
        <button class="btn-save" @click="bukaModal()">+ Tambah Galeri</button>
      </div>

      <!-- Tabel Galeri -->
      <div class="table-responsive">
        <table class="galeri-table">
          <thead>
            <tr>
              <th>No</th>
              <th>Gambar</th>
              <th>Judul</th>
              <th>Deskripsi</th>
              <th>Aksi</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item, index) in galeriList" :key="item.id">
              <td>{{ offset + index + 1 }}</td>
              <td>
                <img :src="`http://localhost:3000/images/galeri/${item.gambar}`" alt="Galeri" />
              </td>
              <td>{{ item.judul }}</td>
              <td>{{ item.deskripsi }}</td>
              <td class="galeri-actions">
                <button class="edit-btn" @click="bukaModal(item)">Edit</button>
                <button class="delete-btn" @click="deleteGaleri(item.id)">Hapus</button>
              </td>
            </tr>
          </tbody>
        </table>

        <!-- Pagination Controls -->
        <div class="pagination">
          <button @click="prevPage" :disabled="currentPage === 1">Prev</button>
          <span v-for="page in totalPages" :key="page">
            <button @click="goToPage(page)" :class="{ active: currentPage === page }">{{ page }}</button>
          </span>
          <button @click="nextPage" :disabled="currentPage === totalPages">Next</button>
        </div>
      </div>

      <!-- Modal Form -->
      <div v-if="showModal" class="modal-overlay">
        <div class="modal">
          <div class="modal-header">
            <h3>{{ form.id ? 'Edit' : 'Tambah' }} Galeri</h3>
            <button class="btn-close" @click="tutupModal">×</button>
          </div>
          <form @submit.prevent="submitForm" class="modal-form">
            <input type="text" v-model="form.judul" placeholder="Judul gambar" required />
            <textarea class="deskripsi-editor" v-model="form.deskripsi" placeholder="Deskripsi gambar..." rows="5"></textarea>
            <input type="file" @change="handleFileUpload" />
            <img v-if="gambarPreview" :src="gambarPreview" class="preview-img" style="margin-top: 0.5rem" />
            <div class="modal-footer">
              <button type="button" @click="tutupModal" class="btn-cancel">Batal</button>
              <button type="submit" class="btn-save">{{ form.id ? 'Update' : 'Simpan' }}</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </AdminLayout>
</template>

<script>
import axios from 'axios'
import AdminLayout from '@/layouts/AdminLayout.vue'

export default {
  components: { AdminLayout },
  data() {
    return {
      galeriList: [],
      showModal: false,
      form: {
        id: null,
        judul: '',
        deskripsi: '',
        gambar: null,
      },
      gambarPreview: null,
      initialForm: {
        judul: '',
        deskripsi: '',
      },
      limit: 20,
      offset: 0,
      totalPages: 1,
      currentPage: 1,
    }
  },
  mounted() {
    this.fetchPaginatedGaleri()
  },
  methods: {
    async fetchPaginatedGaleri() {
      try {
        const res = await axios.get('http://localhost:3000/api/galeri/paginate', {
          params: { limit: this.limit, offset: this.offset },
        })
        this.galeriList = res.data.data
        this.totalPages = res.data.pagination.totalPages
        this.currentPage = res.data.pagination.currentPage
      } catch (err) {
        console.error(err)
        alert('Gagal mengambil data galeri')
      }
    },
    goToPage(page) {
      this.offset = (page - 1) * this.limit
      this.fetchPaginatedGaleri()
    },
    nextPage() {
      if (this.currentPage < this.totalPages) {
        this.goToPage(this.currentPage + 1)
      }
    },
    prevPage() {
      if (this.currentPage > 1) {
        this.goToPage(this.currentPage - 1)
      }
    },
    bukaModal(item = null) {
      this.showModal = true
      if (item) {
        this.form = {
          id: item.id,
          judul: item.judul,
          deskripsi: item.deskripsi,
          gambar: null,
        }
        this.initialForm = {
          judul: item.judul,
          deskripsi: item.deskripsi,
        }
        this.gambarPreview = `http://localhost:3000/images/galeri/${item.gambar}`
      } else {
        this.resetForm()
      }
    },
    tutupModal() {
      this.showModal = false
      this.resetForm()
    },
    resetForm() {
      this.form = { id: null, judul: '', deskripsi: '', gambar: null }
      this.initialForm = { judul: '', deskripsi: '' }
      this.gambarPreview = null
    },
    handleFileUpload(e) {
      const file = e.target.files[0]
      this.form.gambar = file
      if (file) this.gambarPreview = URL.createObjectURL(file)
    },
    async submitForm() {
      const formData = new FormData()
      if (this.form.judul !== this.initialForm.judul) formData.append('judul', this.form.judul)
      if (this.form.deskripsi !== this.initialForm.deskripsi) formData.append('deskripsi', this.form.deskripsi)
      if (this.form.gambar) formData.append('gambar', this.form.gambar)

      try {
        if (this.form.id) {
          formData.append('_method', 'PUT')
          const res = await axios.post(`http://localhost:3000/api/galeri/${this.form.id}`, formData, {
            headers: { 'Content-Type': 'multipart/form-data' },
          })
          if (res.status === 200) {
            alert(res.data.message)
            this.fetchPaginatedGaleri()
            this.tutupModal()
          }
        } else {
          if (!this.form.judul || !this.form.deskripsi || !this.form.gambar) {
            alert('Semua field wajib diisi')
            return
          }
          const res = await axios.post('http://localhost:3000/api/galeri', formData, {
            headers: { 'Content-Type': 'multipart/form-data' },
          })
          if (res.status === 200) {
            alert(res.data.message)
            this.fetchPaginatedGaleri()
            this.tutupModal()
          }
        }
      } catch (err) {
        alert('Gagal menyimpan galeri')
        console.error(err)
      }
    },
    async deleteGaleri(id) {
      if (!confirm('Yakin ingin menghapus gambar ini?')) return
      try {
        await axios.delete(`http://localhost:3000/api/galeri/${id}`)
        this.fetchPaginatedGaleri()
      } catch (err) {
        alert('Gagal menghapus galeri')
      }
    },
  },
}
</script>

<style scoped src="@/assets/css/admin-galeri.css"></style>
