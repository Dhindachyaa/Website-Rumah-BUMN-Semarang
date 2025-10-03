<template>
  <div class="admin-layout">
    <aside :class="['admin-sidebar', { collapsed: isCollapsed }]" @click.self="toggleSidebar">
      <div class="sidebar-header">
        <h3>Admin Panel</h3>
        <div class="hamburger-toggle" @click="toggleSidebar">☰</div>
      </div>

      <router-link
        to="/admin/dashboard"
        :class="{ active: $route.path === '/admin/dashboard' }"
      >
        <i class="fas fa-chart-line"></i>
        <span v-if="!isCollapsed">Dashboard</span>
      </router-link>

      <router-link
        to="/admin/umkm"
        :class="{ active: $route.path.startsWith('/admin/umkm') }"
      >
        <i class="fas fa-store"></i>
        <span v-if="!isCollapsed">Kelola UMKM</span>
      </router-link>

      <router-link
        to="/admin/galeri"
        :class="{ active: $route.path.startsWith('/admin/galeri') }"
      >
        <i class="fas fa-image"></i>
        <span v-if="!isCollapsed">Kelola Galeri</span>
      </router-link>

      <router-link
        to="/admin/berita"
        :class="{ active: $route.path.startsWith('/admin/berita') }"
      >
        <i class="fas fa-newspaper"></i>
        <span v-if="!isCollapsed">Kelola Berita</span>
      </router-link>

      <a href="#" @click.prevent="logout" class="logout-link">
        <i class="fas fa-sign-out-alt"></i>
        <span v-if="!isCollapsed">Logout</span>
      </a>
    </aside>

    <main class="admin-main">
      <slot />
    </main>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isCollapsed: false
    }
  },
  methods: {
    toggleSidebar() {
      this.isCollapsed = !this.isCollapsed
    },
    logout() {
      sessionStorage.removeItem('isAdmin')
      sessionStorage.removeItem('adminUser')
      localStorage.removeItem('isAdmin')
      localStorage.removeItem('adminUser')
      this.$router.push('/admin/login')
    }
  }
}
</script>

<style scoped>
@import url('https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css');

.admin-layout {
  display: flex;
  min-height: 100vh;
  overflow-x: hidden;
  box-sizing: border-box;
}

.admin-sidebar {
  width: 180px;
  background: #3f547a;
  color: white;
  padding: 80px 1rem 1rem;
  display: flex;
  flex-direction: column;
  transition: width 0.3s ease;
}

.admin-sidebar.collapsed {
  width: 60px;
  padding: 80px 0.5rem 1rem;
}

.sidebar-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-bottom: 0.6rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.2);
  white-space: nowrap;
  overflow: hidden;
}

.sidebar-header h3 {
  color: #fff;
  font-size: 17px;
  margin: 0;
  transition: opacity 0.3s ease, width 0.3s ease;
  flex: 1;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}

.admin-sidebar.collapsed .sidebar-header h3 {
  opacity: 0;
  width: 0;
  padding: 0;
}

.hamburger-toggle {
  font-size: 20px;
  cursor: pointer;
  color: white;
  padding: 2px 12px;
  border-radius: 4px;
  transition: background 0.3s ease;
}

.hamburger-toggle:hover {
  background: rgba(255, 255, 255, 0.1);
}

.admin-sidebar a {
  display: flex;
  align-items: center;
  color: #dcdcdc;
  margin: 0.4rem 0;
  text-decoration: none;
  font-weight: normal;
  transition: color 0.2s, font-weight 0.2s;
  padding: 0.3rem 0.5rem;
  font-size: 14px;
}

.admin-sidebar i {
  margin-right: 8px;
  width: 18px;
  text-align: center;
}

.admin-sidebar.collapsed i {
  margin-right: 0;
}

.admin-sidebar.collapsed a span {
  display: none;
}

.admin-sidebar a:hover {
  color: white;
}

.admin-sidebar a.active {
  font-weight: bold;
  color: #fff !important;
  background: rgba(255, 255, 255, 0.1); /* semi transparan */
  border-radius: 6px;
  padding: 0.3rem 0.5rem;
  transition: background 0.3s ease, color 0.3s ease;
  display: inline-flex;
  width: fit-content;
}

.logout-link {
  margin-top: auto;
  color: #f92c1e !important;
}

.admin-main {
  flex: 1;
  padding: 2rem;
  margin-top: 30px;
  max-width: calc(100vw - 180px);
  width: 100%;
  box-sizing: border-box;
  overflow-x: hidden;
  transition: margin-left 0.3s ease;
}

.admin-sidebar.collapsed ~ .admin-main {
  max-width: calc(100vw - 60px);
}
</style>
