<template>
  <div class="news-page">
    <!-- Header -->
    <header class="gallery-header">
      <div class="container">
        <h1 class="animate-fade-in">GALERI</h1>
      </div>
    </header>

    <!-- Gallery Section -->
    <section class="gallery-content">
      <div class="right-gallery full-width no-left-text" v-if="galleryItems.length">
        <div
          v-for="(item, index) in galleryItems"
          :key="index"
          class="gallery-item animate-on-scroll"
          @click="openModal(item)"
          :style="{ '--animation-delay': `${index * 0.1}s` }"
        >
          <img
            :src="item.src"
            :alt="item.alt"
            class="gallery-img"
            style="height: 100%; width: 100%; object-fit: cover"
            @error="onImageError"
          />
          <div class="caption">
            <strong>{{ item.title }}</strong>
            <div class="caption-desc">{{ item.caption }}</div>
          </div>
        </div>
      </div>

      <!-- Jika kosong -->
      <div v-else class="no-data-msg">Galeri kosong.</div>

      <!-- Pagination -->
      <div class="pagination">
        <button @click="goToPage(currentPage - 1)" :disabled="currentPage === 1">Prev</button>

        <button
          v-for="page in totalPages"
          :key="`page-${page}`"
          @click="goToPage(page)"
          :class="{ active: page === currentPage }"
        >
          {{ page }}
        </button>

        <button @click="goToPage(currentPage + 1)" :disabled="currentPage === totalPages">Next</button>
      </div>

      <!-- Modal -->
      <div v-if="showModal" class="galeri-modal" @click.self="closeModal">
        <div class="galeri-modal-content-wrapper">
          <img class="galeri-modal-content" :src="modalImage" />
          <div class="galeri-modal-caption">{{ modalCaption }}</div>
        </div>
        <span class="galeri-close" @click="closeModal">&times;</span>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref, onMounted, nextTick, watch } from 'vue'
import axios from 'axios'

const galleryItems = ref([])
const showModal = ref(false)
const modalImage = ref('')
const modalCaption = ref('')

// Pagination states
const currentPage = ref(1)
const totalPages = ref(1)
const itemsPerPage = 20

// Fetch gallery with pagination
const fetchGallery = async () => {
  try {
    const limit = itemsPerPage
    const offset = (currentPage.value - 1) * limit

    const res = await axios.get('http://localhost:3000/api/galeri/paginate', {
      params: { limit, offset }
    })

    const data = res.data.data || []
    totalPages.value = res.data.pagination?.totalPages || 1

    galleryItems.value = data.map((item, i) => {
    const imagePath = item.gambar
  ? `http://localhost:3000/images/galeri/${item.gambar}`
  : 'http://localhost:3000/images/umkm/rumah-bumn.png'

      return {
        src: imagePath,
        alt: item.judul || 'Gambar Galeri',
        title: item.judul || 'Tanpa Judul',
        caption: item.deskripsi || ''
      }
    })

    await nextTick()
    const obs = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('show')
          observer.unobserve(entry.target)
        }
      })
    }, { threshold: 0.1 })

    document.querySelectorAll('.animate-on-scroll').forEach(el => {
      obs.observe(el)
    })
  } catch (err) {
    console.error('Gagal mengambil galeri:', err)
  }
}

const goToPage = (page) => {
  if (page >= 1 && page <= totalPages.value) {
    currentPage.value = page
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }
}

watch(currentPage, fetchGallery)

const openModal = (item) => {
  modalImage.value = item.src
  modalCaption.value = `${item.title} - ${item.caption}`
  showModal.value = true
}

const closeModal = () => {
  showModal.value = false
}

const onImageError = (e) => {
  e.target.src = 'http://localhost:3000/images/umkm/rumah-bumn.png'
}

onMounted(fetchGallery)
</script>

<style src="../assets/css/galeri.css"></style>