<template>
  <div :class="pageClass">
    <Navbar />
    <router-view />
    <Footer v-if="!isAdminPage" />
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import Navbar from './components/navbar.vue'
import Footer from './components/footer.vue'

const route = useRoute()

// Cek apakah halaman termasuk admin
const isAdminPage = computed(() => route.path.startsWith('/admin'))

// Tambahkan class khusus untuk homepage jika diperlukan
const pageClass = computed(() => {
  return route.path === '/' ? 'homepage' : ''
})
</script>

<style scoped>
/* Optional global styles */
</style>
