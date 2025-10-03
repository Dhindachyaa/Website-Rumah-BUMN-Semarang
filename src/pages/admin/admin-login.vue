<template>
  <div class="login-page">
    <div class="login-card">
      <div class="login-header">Admin Login</div>
      <div class="login-body">
        <div class="input-group">
          <i class="fas fa-user icon-left"></i>
          <input v-model="username" type="text" placeholder="Username" required />
        </div>
        <div class="input-group">
          <i class="fas fa-lock icon-left"></i>
          <input v-model="password" type="password" placeholder="Password" required />
        </div>
        <div class="remember-row">
          <input type="checkbox" id="remember" v-model="remember" />
          <label for="remember">Ingat saya</label>
        </div>
        <button @click="login">Login</button>
        <router-link class="back-link" to="/">← Kembali ke Halaman Utama</router-link>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import '@/assets/css/admin-login.css'

export default {
  name: 'AdminLogin',
  data() {
    return {
      username: '',
      password: '',
      remember: false
    }
  },
  methods: {
    async login() {
      if (!this.username || !this.password) {
        alert('Silakan isi username dan password.')
        return
      }

      try {
        const response = await axios.post('http://localhost:3000/api/admin/login', {
          username: this.username,
          password: this.password
        })

        const user = response.data.user

        sessionStorage.setItem('isAdmin', 'true')
        sessionStorage.setItem('adminUser', JSON.stringify(user))

        if (this.remember) {
          localStorage.setItem('isAdmin', 'true')
          localStorage.setItem('adminUser', JSON.stringify(user))
        } else {
          localStorage.removeItem('isAdmin')
          localStorage.removeItem('adminUser')
        }

        this.$router.push('/admin/dashboard')
      } catch (err) {
        const message = err.response?.data?.message || 'Terjadi kesalahan saat login.'
        alert(message)
      }
    }
  },
  mounted() {
    const isSession = sessionStorage.getItem('isAdmin') === 'true'
    const isRemembered = localStorage.getItem('isAdmin') === 'true'

    if (isSession || isRemembered) {
      this.$router.push('/admin/dashboard')
    }
  }
}
</script>
