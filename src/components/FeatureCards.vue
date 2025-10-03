<template>
  <section class="feature-cards">
    <div class="card">
      <div class="icon home-icon" aria-hidden="true"></div>
      <h3>Daftar Sekarang</h3>
      <p>Gabung program pembinaan UMKM Rumah BUMN Semarang, yuk!</p>
      <button class="btn">Daftar Disini</button>
    </div>
    <div class="card">
      <div class="icon calendar-icon" aria-hidden="true"></div>
      <h3>Ikuti Kami!</h3>
      <p>Banyak kegiatan seru menanti! Ikuti update lengkapnya lewat sosial media kami.</p>
      <button class="btn">Cek Disini</button>
    </div>
    <div class="card">
      <div class="icon pen-icon" aria-hidden="true"></div>
      <h3>Booking Sekarang</h3>
      <p>Butuh tempat buat kumpul atau event komunitas? Bisa banget booking di sini!.</p>
      <button class="btn">Hubungi Kami</button>
    </div>
  </section>
</template>

<script setup>
// No script needed
</script>

<style scoped>
.feature-cards {
  display: flex;
  justify-content: space-between;
  gap: 1rem;
  padding: 2rem;
  flex-wrap: wrap;
}

.card {
  background: #fff;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0,0,0,0.1);
  padding: 2rem 1.5rem;
  max-width: 320px;
  flex: 1 1 30%;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  transition: box-shadow 0.3s ease;
}

.card:hover {
  box-shadow: 0 8px 20px rgba(0,0,0,0.15);
}

.icon {
  width: 40px;
  height: 40px;
  margin-bottom: 1rem;
  background-color: #eee;
  border-radius: 8px;
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: 0 1px 2px rgba(0,0,0,0.1);
}

/* Placeholder icons using SVG background images or inline SVG */
.home-icon {
  background-image: url('data:image/svg+xml;utf8,<svg fill="none" stroke="%23000" stroke-width="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2h-4a2 2 0 0 1-2-2v-4H9v4a2 2 0 0 1-2 2H3z"/></svg>');
  background-repeat: no-repeat;
  background-position: center;
  background-size: 24px 24px;
}

.calendar-icon {
  background-image: url('data:image/svg+xml;utf8,<svg fill="none" stroke="%23000" stroke-width="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><rect width="18" height="18" x="3" y="4" rx="2" ry="2"/><line x1="16" x2="16" y1="2" y2="6"/><line x1="8" x2="8" y1="2" y2="6"/><line x1="3" x2="21" y1="10" y2="10"/></svg>');
  background-repeat: no-repeat;
  background-position: center;
  background-size: 24px 24px;
}

.pen-icon {
  background-image: url('data:image/svg+xml;utf8,<svg fill="none" stroke="%23000" stroke-width="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4 12.5-12.5z"/></svg>');
  background-repeat: no-repeat;
  background-position: center;
  background-size: 24px 24px;
}

h3 {
  font-weight: 700;
  margin-bottom: 0.5rem;
  color: #0E3B4F;
  font-size: 1.25rem;
}

p {
  margin-bottom: 1.5rem;
  color: #333;
  font-size: 1rem;
  line-height: 1.4;
}

.btn {
  background-color: #0E3B4F;
  color: white;
  padding: 0.6rem 1.2rem;
  border-radius: 8px;
  font-weight: 600;
  text-decoration: none;
  cursor: pointer;
  width: fit-content;
  box-shadow: 0 2px 6px rgba(0,0,0,0.15);
  transition: background-color 0.3s ease;
  border: none;
}

.btn:hover {
  background-color: #0a2a38;
}

/* Responsive for mobile */
@media (max-width: 768px) {
  .feature-cards {
    flex-direction: column;
    padding: 2rem 1rem;
  }
  .card {
    max-width: 100%;
    margin-bottom: 1.5rem;
  }
}
</style>
