import { createRouter, createWebHistory } from 'vue-router'

// 🌐 Halaman Publik
import Beranda from '@/pages/beranda.vue'
import Umkm from '@/pages/umkm.vue'
import UmkmDetail from '@/pages/umkm-detail.vue'
import Galeri from '@/pages/galeri.vue'
import Berita from '@/pages/berita.vue'
import BeritaDetail from '@/pages/berita-detail.vue'
import Hubungi from '@/pages/hubungi.vue'

// 🔐 Halaman Admin
import AdminLogin from '@/pages/admin/admin-login.vue'
import AdminDashboard from '@/pages/admin/admin-dashboard.vue'
import AdminUmkm from '@/pages/admin/admin-umkm.vue'
import AdminGaleri from '@/pages/admin/admin-galeri.vue'
import AdminBerita from '@/pages/admin/admin-berita.vue'

const routes = [
  // 🌐 Publik
  { path: '/', name: 'Beranda', component: Beranda },
  { path: '/umkm', name: 'Umkm', component: Umkm },
  { path: '/umkm/:id', name: 'UmkmDetail', component: UmkmDetail, props: true },
  { path: '/galeri', name: 'Galeri', component: Galeri },
  { path: '/berita', name: 'Berita', component: Berita },
  { path: '/berita/:id', name: 'BeritaDetail', component: BeritaDetail, props: true },
  { path: '/hubungi', name: 'Hubungi', component: Hubungi },

  // 🔐 Admin
  { path: '/admin/login', name: 'AdminLogin', component: AdminLogin },
  { path: '/admin', redirect: '/admin/login' },
  { path: '/admin/dashboard', name: 'AdminDashboard', component: AdminDashboard, meta: { requiresAuth: true } },
  { path: '/admin/umkm', name: 'AdminUmkm', component: AdminUmkm, meta: { requiresAuth: true } },
  { path: '/admin/galeri', name: 'AdminGaleri', component: AdminGaleri, meta: { requiresAuth: true } },
  { path: '/admin/berita', name: 'AdminBerita', component: AdminBerita, meta: { requiresAuth: true } },

  // 🔁 Fallback
  { path: '/:pathMatch(.*)*', redirect: '/' }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

// 🔒 Navigation Guard Admin
router.beforeEach((to, from, next) => {
  const isAdmin = localStorage.getItem('isAdmin') === 'true' || sessionStorage.getItem('isAdmin') === 'true'

  if (to.meta.requiresAuth && !isAdmin) {
    next('/admin/login')
  } else if (to.path === '/admin/login' && isAdmin) {
    next('/admin/dashboard')
  } else {
    next()
  }
})

export default router
