<template>
  <div class="news-page">
    <!-- Header Section -->
    <header class="news-header">
      <div class="container">
        <h1 class="animate-fade-in">BERITA TERKINI</h1>
      </div>
    </header>

    <!-- News Content -->
    <main class="news-content">
      <div class="container">
        <!-- Featured Article -->
        <section class="featured-section" v-if="featuredArticle">
          <router-link 
            :to="{ name: 'BeritaDetail', params: { id: featuredArticle.id } }"
            class="featured-article animate-fade-in"
          >
            <div class="featured-content">
              <div class="featured-image">
                <img 
                  :src="featuredArticle.imageUrl || getPlaceholderImage()" 
                  :alt="featuredArticle.title" 
                  @error="handleImageError"
                />
                <div class="featured-badge">UTAMA</div>
              </div>
              <div class="featured-info">
                <h2 class="featured-title">{{ featuredArticle.title }}</h2>
                <p class="featured-excerpt">{{ featuredArticle.excerpt }}</p>
                <div class="featured-meta">
                  <span><i class="fas fa-clock"></i> {{ featuredArticle.date }}</span>
                </div>
              </div>
            </div>
          </router-link>
        </section>

        <!-- News Grid -->
        <section class="news-grid" v-if="paginatedNews.length > 0">
          <router-link
            v-for="(berita, index) in paginatedNews"
            :key="berita.id"
            :to="{ name: 'BeritaDetail', params: { id: berita.id } }"
            class="news-card animate-on-scroll"
            :style="{ '--animation-delay': `${(index % 4) * 0.1}s` }"
          >
            <div class="news-card-image">
              <img 
                :src="berita.imageUrl || getPlaceholderImage()" 
                :alt="berita.title"
                @error="handleImageError"
              />
            </div>
            <div class="news-card-content">
              <h3 class="news-card-title">{{ berita.title }}</h3>
              <p class="news-card-excerpt">{{ berita.excerpt }}</p>
              <div class="news-card-meta">
                <div class="news-card-date">
                  <i class="fas fa-clock"></i>
                  <span>{{ berita.date }}</span>
                </div>
                <span class="read-more">Baca Selengkapnya</span>
              </div>
            </div>
          </router-link>
        </section>

        <!-- No Results -->
        <section v-else class="no-results animate-fade-in">
          <i class="fas fa-newspaper"></i>
          <p>Tidak ada berita yang ditemukan.</p>
        </section>

        <!-- Load More Button -->
        <section class="load-more-section" v-if="hasMoreNews">
          <button 
            class="load-more-btn" 
            @click="loadMore"
            :disabled="isLoading"
          >
            <i class="fas" :class="isLoading ? 'fa-spinner fa-spin' : 'fa-plus'"></i>
            {{ isLoading ? 'Memuat...' : 'Muat Lebih Banyak' }}
          </button>
        </section>
      </div>
    </main>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted, nextTick, watch } from 'vue'
import axios from 'axios'

// State
const allNews = ref([])
const searchQuery = ref('')
const currentPage = ref(1)
const itemsPerPage = 6
const isLoading = ref(false)
const searchTimeout = ref(null)

// Fetch data
const fetchBerita = async () => {
  try {
    const res = await axios.get('http://localhost:3000/api/berita')
    allNews.value = res.data.map(item => ({
      id: item.id,
      title: item.judul,
      excerpt: stripHtml(item.isi).slice(0, 120) + '...',
      imageUrl: item.gambar 
        ? `http://localhost:3000/images/berita/${item.gambar}` 
        : null,
      date: formatTanggal(item.tanggal)
    }))
    await nextTick()
    initScrollAnimations()
  } catch (err) {
    console.error('❌ Gagal memuat berita:', err)
  }
}

// Utils
const stripHtml = html => {
  const tmp = document.createElement("DIV")
  tmp.innerHTML = html
  return tmp.textContent || tmp.innerText || ""
}

const formatTanggal = tgl => {
  const d = new Date(tgl)
  return d.toLocaleDateString('id-ID', {
    day: '2-digit',
    month: 'long',
    year: 'numeric'
  })
}

const getPlaceholderImage = () => {
  return 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="400" height="200" viewBox="0 0 400 200"><rect width="400" height="200" fill="#f8f9fa"/><text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" fill="#6c757d" font-family="Arial" font-size="16">No Image</text></svg>'
}

const handleImageError = e => {
  e.target.src = getPlaceholderImage()
}

// Computed
const featuredArticle = computed(() => allNews.value[0] || null)

const filteredNews = computed(() => {
  let news = allNews.value.slice(1)
  if (searchQuery.value) {
    const q = searchQuery.value.toLowerCase()
    return news.filter(n =>
      n.title.toLowerCase().includes(q) ||
      n.excerpt.toLowerCase().includes(q)
    )
  }
  return news
})

const paginatedNews = computed(() =>
  filteredNews.value.slice(0, currentPage.value * itemsPerPage)
)

const hasMoreNews = computed(() =>
  paginatedNews.value.length < filteredNews.value.length
)

// Load more
const loadMore = async () => {
  if (isLoading.value || !hasMoreNews.value) return
  isLoading.value = true
  setTimeout(async () => {
    currentPage.value += 1
    await nextTick()
    initScrollAnimations()
    isLoading.value = false
  }, 500)
}

// Search debounce
const handleSearch = () => (currentPage.value = 1)
watch(searchQuery, () => {
  if (searchTimeout.value) clearTimeout(searchTimeout.value)
  searchTimeout.value = setTimeout(() => handleSearch(), 300)
})

// Animation init
const initScrollAnimations = () => {
  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('show')
        obs.unobserve(entry.target)
      }
    })
  }, { threshold: 0.1 })

  document.querySelectorAll('.animate-on-scroll:not(.show)')
    .forEach(el => observer.observe(el))
}

onMounted(async () => {
  await fetchBerita()
  window.addEventListener('scroll', initScrollAnimations)
})

onUnmounted(() => {
  window.removeEventListener('scroll', initScrollAnimations)
  if (searchTimeout.value) clearTimeout(searchTimeout.value)
})
</script>

<style scoped>
@import '@/assets/css/berita.css';
</style>
