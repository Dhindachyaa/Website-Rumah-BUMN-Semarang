<template>
  <AdminLayout>
    <div class="admin-berita-page">
      <h2>Kelola Berita</h2>

      <div class="toolbar">
        <button class="btn-save" @click="openModal">+ Tambah Berita</button>
      </div>

      <div class="table-responsive">
        <table class="berita-table">
          <thead>
            <tr>
              <th>No</th>
              <th>Judul</th>
              <th>Tanggal</th>
              <th>Isi</th>
              <th>Gambar</th>
              <th>Aksi</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(berita, index) in beritaList" :key="berita.id">
              <td>{{ index + 1 }}</td>
              <td>{{ berita.judul }}</td>
              <td>{{ formatTanggal(berita.tanggal) }}</td>
              <td class="wrap-text">
  <span>{{ getPreview(berita.isi) }}</span>
</td>

              <td>
                <img :src="getImage(berita.gambar)" alt="gambar" />
              </td>
              <td>
                <div class="table-actions">
                  <button class="btn-edit" @click="editBerita(berita)">Edit</button>
                  <button class="btn-delete" @click="hapusBerita(berita.id)">Hapus</button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Modal -->
      <div v-if="showModal" class="modal-overlay">
        <div class="modal">
          <div class="modal-header">
            <h3>{{ beritaForm.id ? 'Edit' : 'Tambah' }} Berita</h3>
            <button class="btn-close" @click="closeModal">&times;</button>
          </div>

          <form @submit.prevent="submitForm" class="modal-form">
            <input v-model="beritaForm.judul" placeholder="Judul Berita" required />
            <input type="date" v-model="beritaForm.tanggal" required />

            <div
              ref="isiEditor"
              contenteditable="true"
              class="editable-div"
              v-html="beritaForm.isi"
              @input="sanitizeContent"
              @paste.prevent="handlePaste"
              @focus="forceLTR"
              data-placeholder="Tulis isi berita di sini..."
            ></div>

            <input type="file" @change="handleFileUpload" />
            <img v-if="previewGambar" :src="previewGambar" class="preview-img" />

            <div class="modal-footer">
              <button type="button" class="btn-cancel" @click="closeModal">Batal</button>
              <button type="submit" class="btn-save">
                {{ beritaForm.id ? 'Update' : 'Simpan' }}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </AdminLayout>
</template>

<script>
import AdminLayout from '@/layouts/AdminLayout.vue'
import axios from 'axios'

export default {
  components: { AdminLayout },
  data() {
    return {
      beritaList: [],
      showModal: false,
      previewGambar: null,
      beritaForm: {
        id: null,
        judul: '',
        tanggal: '',
        isi: '',
        gambar: null,
      },
    }
  },
  methods: {
    forceLTR() {
  const el = this.$refs.isiEditor
  if (!el) return

  // Paksa atribut utama
  el.setAttribute('dir', 'ltr')
  el.style.direction = 'ltr'
  el.style.textAlign = 'left'

  // Hapus karakter kontrol bidi yang tidak terlihat
  el.innerHTML = this.removeBidiControlChars(el.innerHTML)

  // Hapus atribut dir/style dari semua child
  const walker = document.createTreeWalker(el, NodeFilter.SHOW_ELEMENT)
  while (walker.nextNode()) {
    const node = walker.currentNode
    node.removeAttribute('dir')
    node.removeAttribute('style')
  }

      const cleanHTML = this.removeBidiControlChars(el.innerHTML)
      el.innerHTML = cleanHTML
      this.beritaForm.isi = cleanHTML
    },

    handlePaste(e) {
      const text = e.clipboardData.getData('text/plain')
      const cleaned = this.removeBidiControlChars(text)
      const el = this.$refs.isiEditor
      if (el) {
        document.execCommand('insertText', false, cleaned)
      }
    },

    removeBidiControlChars(text) {
      return text.replace(/[\u202A-\u202E\u200E\u200F]/g, '')
    },
getPreview(htmlContent) {
  // Hapus semua tag HTML, lalu ambil 150 karakter pertama
  const plainText = htmlContent.replace(/<[^>]+>/g, '')
  return plainText.length > 150
    ? plainText.slice(0, 150).trim() + '...'
    : plainText
}, 
    getImage(path) {
      return path
        ? `http://localhost:3000/images/berita/${path}`
        : '/default-news.jpg'
    },
    formatTanggal(tgl) {
      return new Date(tgl).toLocaleDateString('id-ID', {
        day: '2-digit',
        month: 'long',
        year: 'numeric',
      })
    },
    openModal() {
      this.resetForm()
      this.showModal = true
      this.$nextTick(() => this.forceLTR())
    },
    closeModal() {
      this.showModal = false
      this.resetForm()
    },
    editBerita(berita) {
      this.beritaForm = {
        id: berita.id,
        judul: berita.judul,
        tanggal: berita.tanggal.slice(0, 10),
        isi: berita.isi,
        gambar: null,
      }
      this.previewGambar = this.getImage(berita.gambar)
      this.showModal = true
      this.$nextTick(() => this.forceLTR())
    },
    handleFileUpload(e) {
      const file = e.target.files[0]
      this.beritaForm.gambar = file
      this.previewGambar = URL.createObjectURL(file)
    },
    async fetchBerita() {
      try {
        const res = await axios.get('http://localhost:3000/api/berita')
        this.beritaList = res.data
      } catch (err) {
        console.error(err)
      }
    },
async submitForm() {
  const el = this.$refs.isiEditor
  if (el) {
    this.beritaForm.isi = el.innerHTML.trim()
  }

  const formData = new FormData()
  formData.append('judul', this.beritaForm.judul)
  formData.append('tanggal', this.beritaForm.tanggal)
  formData.append('isi', this.beritaForm.isi)
  if (this.beritaForm.gambar) {
    formData.append('gambar', this.beritaForm.gambar)
  }

  try {
    if (this.beritaForm.id) {
      await axios.post(
        `http://localhost:3000/api/berita/${this.beritaForm.id}`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            'X-HTTP-Method-Override': 'PUT',
          },
        }
      )
    } else {
      await axios.post('http://localhost:3000/api/berita', formData)
    }

    this.fetchBerita()
    this.closeModal()
  } catch (err) {
    alert('Gagal menyimpan berita')
  }
}, 
    async hapusBerita(id) {
      if (confirm('Yakin ingin menghapus berita ini?')) {
        try {
          await axios.delete(`http://localhost:3000/api/berita/${id}`)
          this.fetchBerita()
        } catch (err) {
          alert('Gagal menghapus berita')
        }
      }
    },
    resetForm() {
      this.beritaForm = {
        id: null,
        judul: '',
        tanggal: '',
        isi: '',
        gambar: null,
      }
      this.previewGambar = null
    },
  },
  mounted() {
    this.fetchBerita()
  },
}
</script>

<style scoped src="@/assets/css/admin-berita.css"></style>
