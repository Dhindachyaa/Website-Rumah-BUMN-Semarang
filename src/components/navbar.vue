<template>
  <nav class="navbar" :class="{ scrolled: isScrolled }">
    <div class="navbar-container">
      <div class="logo-group">
        <img src="/Logo bumn sah.png" alt="Logo BUMN Sah" />
        <img src="/logobumnsemarang.png" alt="Logo Rumah BUMN Semarang" />
        <img src="/logobri.png" alt="Logo BRI" />
      </div>
      <div class="menu-toggle" @click="toggleMenu">☰</div>
      <ul class="nav-links" :class="{ show: menuOpen }">
        <li><router-link to="/" exact-active-class="active">Beranda</router-link></li>
        <li><router-link to="/umkm" exact-active-class="active">UMKM</router-link></li>
        <li><router-link to="/galeri" exact-active-class="active">Galeri</router-link></li>
        <li><router-link to="/berita" exact-active-class="active">Berita</router-link></li>
        <li><router-link to="/hubungi" exact-active-class="active">Hubungi Kami</router-link></li>
      </ul>
    </div>
  </nav>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const menuOpen = ref(false)
const isScrolled = ref(false)

const toggleMenu = () => {
  menuOpen.value = !menuOpen.value
}

onMounted(() => {
  window.addEventListener('scroll', () => {
    isScrolled.value = window.scrollY > 10
  })
})
</script>
<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Bona+Nova&family=Inter:wght@400,700&display=swap');
@import '../assets/css/navbar.css';
</style>