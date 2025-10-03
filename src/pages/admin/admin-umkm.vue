<template>
  <AdminLayout>
    <div class="admin-umkm-page">
      <h2>Kelola UMKM</h2>

      <div class="toolbar">
        <button class="btn-save" @click="bukaModal">+ Tambah UMKM</button>
      </div>

      <!-- Tabel Desktop -->
      <div class="table-responsive">
        <table class="umkm-table">
          <thead>
            <tr>
              <th>No</th>
              <th>Nama</th>
              <th>Kategori</th>
              <th>Harga</th>
              <th>Varian</th>
              <th>Deskripsi</th>
              <th>Instagram</th>
              <th>Gambar</th>
              <th>Aksi</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(u, index) in umkmList" :key="u.id">
              <td>{{ (currentPage - 1) * 20 + index + 1 }}</td>
              <td>{{ u.nama }}</td>
              <td>{{ u.kategori }}</td>
              <td>{{ u.harga }}</td>
              <td>{{ u.varian }}</td>
              <td class="wrap-text">
                {{ getPreview(u.deskripsi) }}
              </td>
              <td>{{ u.instagram }}</td>
              <td>
                <img v-if="u.image_path" :src="getImageUrl(u.image_path)" alt="UMKM" @error="handleImageError" />
                <span v-else>-</span>
              </td>
              <td>
                <div class="table-actions">
                  <button class="btn-edit" @click="editUMKM(u)">Edit</button>
                  <button class="btn-delete" @click="deleteUMKM(u.id)">Hapus</button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Kartu Mobile -->
      <div class="umkm-card-list">
        <div class="umkm-card" v-for="u in umkmList" :key="u.id">
          <p><strong>Nama:</strong> {{ u.nama }}</p>
          <p><strong>Kategori:</strong> {{ u.kategori }}</p>
          <p><strong>Harga:</strong> {{ u.harga }}</p>
          <p><strong>Varian:</strong> {{ u.varian }}</p>
          <p><strong>Deskripsi:</strong> {{ u.deskripsi }}</p>
          <p><strong>Instagram:</strong> {{ u.instagram }}</p>
          <div class="image-container">
            <img v-if="u.image_path" :src="getImageUrl(u.image_path)" alt="UMKM" @error="handleImageError" />
            <span v-else>-</span>
          </div>
          <div class="card-actions">
            <button class="btn-edit" @click="editUMKM(u)">Edit</button>
            <button class="btn-delete" @click="deleteUMKM(u.id)">Hapus</button>
          </div>
        </div>
      </div>

      <!-- Pagination -->
      <div class="pagination">
        <button @click="goToPage(currentPage - 1)" :disabled="currentPage === 1">Prev</button>

        <button
          v-for="page in computedTotalPages"
          :key="'page-'+page"
          @click="goToPage(page)"
          :class="{ active: page === currentPage }"
        >
          {{ page }}
        </button>

        <button @click="goToPage(currentPage + 1)" :disabled="currentPage >= computedTotalPages">Next</button>
      </div>

      <!-- Modal Tambah/Edit -->
      <div v-if="showModal" class="modal-overlay">
        <div class="modal">
          <div class="modal-header">
            <h3>{{ isEdit ? 'Edit' : 'Tambah' }} UMKM</h3>
            <button class="btn-close" @click="tutupModal">×</button>
          </div>
          <form @submit.prevent="submitForm" class="modal-form">
            <input v-model="form.nama" placeholder="Nama UMKM" required />
            <input v-model="form.harga" placeholder="Harga" />
            <input v-model="form.varian" placeholder="Varian Produk" />
            <textarea v-model="form.deskripsi" placeholder="Deskripsi Produk" class="deskripsi-editor"></textarea>
            <select v-model="form.kategori">
              <option value="">-- Pilih Kategori --</option>
          <option value="">Semua Kategori</option>
          <option value="Fashion">Fashion</option>
          <option value="Craft/Accessoris/Home Decor">Craft/Accessoris/Home Decor</option>
          <option value="Foods & Beverages">Foods and Beverages</option>
          <option value="Healthy & Beauty">Healthy & Beauty</option>
            </select>
            <input v-model="form.instagram" placeholder="Instagram" />
            <input type="file" @change="handleFile" name="image" />
            <img v-if="gambarPreview" :src="gambarPreview" class="preview-img" />

            <div class="modal-footer">
              <button type="button" class="btn-cancel" @click="tutupModal">Batal</button>
              <button type="submit" class="btn-save">{{ isEdit ? 'Update' : 'Simpan' }}</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </AdminLayout>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import axios from 'axios'
import AdminLayout from '@/layouts/AdminLayout.vue'
import '@/assets/css/admin-umkm.css'

const umkmList = ref([])
const currentPage = ref(1)
const totalPages = ref(1)
const showModal = ref(false)
const isEdit = ref(false)
const gambarPreview = ref(null)
const selectedFile = ref(null)

const form = ref({
  id: '', nama: '', harga: '', kategori: '', varian: '', deskripsi: '', instagram: '', image_path: ''
})

// ✅ Komputasi agar pagination tidak error
const computedTotalPages = computed(() => Math.max(totalPages.value, 1))

const fetchUMKM = async (page = 1) => {
  try {
    const limit = 20
    const offset = (page - 1) * limit

    const res = await axios.get(`http://localhost:3000/api/umkm/paginate?limit=${limit}&offset=${offset}`)

    umkmList.value = res.data.data
    currentPage.value = res.data.pagination?.currentPage || 1
    totalPages.value = res.data.pagination?.totalPages || 1

    console.log('✅ currentPage:', currentPage.value, 'totalPages:', totalPages.value)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  } catch (err) {
    console.error('❌ Gagal mengambil data UMKM:', err)
  }
}

const getPreview = (text) => {
  if (!text) return ''
  const clean = text.replace(/<[^>]*>/g, '') // jika ada HTML
  return clean.length > 150 ? clean.slice(0, 150).trim() + '...' : clean
}

// ✅ FIX: Function untuk normalize image URL
const getImageUrl = (path) => {
  if (!path) return 'http://localhost:3000/images/umkm/rumah-bumn.png'
  
  // Normalize path - hapus images/ prefix jika ada
  let cleanPath = path.replace(/^images\//, '')
  
  // Pastikan dimulai dengan umkm/
  if (!cleanPath.startsWith('umkm/')) {
    cleanPath = `umkm/${cleanPath}`
  }
  
  return `http://localhost:3000/images/${cleanPath}`
}

// ✅ Handle error gambar
const handleImageError = (event) => {
  event.target.src = 'http://localhost:3000/images/umkm/rumah-bumn.png'
}

const bukaModal = () => {
  resetForm()
  showModal.value = true
}

const tutupModal = () => {
  resetForm()
  showModal.value = false
}

const handleFile = (e) => {
  selectedFile.value = e.target.files[0]
  gambarPreview.value = selectedFile.value ? URL.createObjectURL(selectedFile.value) : null
}

const submitForm = async () => {
  try {
    const formData = new FormData()
    formData.append('nama', form.value.nama)
    formData.append('harga', form.value.harga)
    formData.append('kategori', form.value.kategori)
    formData.append('varian', form.value.varian)
    formData.append('deskripsi', form.value.deskripsi)
    formData.append('instagram', form.value.instagram)
    if (selectedFile.value) {
      formData.append('image', selectedFile.value)
    }

    if (isEdit.value) {
      formData.append('_method', 'PUT')
      await axios.post(`http://localhost:3000/api/umkm/${form.value.id}?_method=PUT`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      })
      alert('UMKM berhasil diupdate!')
    } else {
      await axios.post('http://localhost:3000/api/umkm', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      })
      alert('UMKM berhasil ditambahkan!')
    }

    await fetchUMKM(currentPage.value)
    tutupModal()
  } catch (err) {
    console.error('❌ Gagal simpan data:', err)
    alert('Gagal menyimpan data.')
  }
}

const editUMKM = (umkm) => {
  form.value = { ...umkm }
  isEdit.value = true
  showModal.value = true
  gambarPreview.value = getImageUrl(umkm.image_path)
}

const deleteUMKM = async (id) => {
  if (confirm('Yakin ingin menghapus data ini?')) {
    try {
      await axios.delete(`http://localhost:3000/api/umkm/${id}`)
      await fetchUMKM(currentPage.value)
    } catch (err) {
      console.error('❌ Gagal hapus data:', err)
      alert('Gagal menghapus data.')
    }
  }
}

const resetForm = () => {
  form.value = {
    id: '', nama: '', harga: '', kategori: '',
    varian: '', deskripsi: '', instagram: '', image_path: ''
  }
  selectedFile.value = null
  isEdit.value = false
  gambarPreview.value = null
}

const goToPage = async (page) => {
  if (page >= 1 && page <= totalPages.value) {
    currentPage.value = page
    await fetchUMKM(page)
  }
}

onMounted(() => fetchUMKM())
</script>