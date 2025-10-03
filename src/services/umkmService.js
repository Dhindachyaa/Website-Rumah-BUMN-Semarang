import axios from 'axios'

const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:3000'

export function getAllUMKM() {
  return axios.get(`${API_BASE}/umkm`)
    .then(res => res.data)
}

export function getUMKMById(id) {
  return axios.get(`${API_BASE}/umkm/${id}`).then(res => res.data)
}
