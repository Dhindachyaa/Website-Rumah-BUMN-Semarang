<template>
  <div>
    <section class="background-image-section" 
             :style="{ backgroundImage: `url(${hero})`, backgroundSize: 'cover', backgroundPosition: 'center bottom', backgroundRepeat: 'no-repeat' }">
      <div class="overlay">
        <div class="logo-sequence">
          <img src="/logobumnsemarang.png" alt="Logo BUMN Semarang" class="background-logo-seq" />
        </div>
        <p class="background-text">
          Rumah BUMN merupakan wadah bagi Langkah kolaborasi BUMN dalam membentuk Digital Economy Ecosystem melalui pembinaan bagi UKM untuk meningkatkan kapasitas dan kapabilitas UKM.
        </p>
      </div>
    </section>

    <section class="carousel-section scroll-anim">
      <h2 class="carousel-title">Galeri Kegiatan</h2>
      <button class="btn-gallery" @click="goToGallery">Lihat Semua Galeri</button>
      <div class="stage">
        <div class="beranda-container">
          <div class="ring" ref="ring">
            <div
              class="img"
              v-for="(img, index) in images"
              :key="index"
              :ref="el => imgRefs[index] = el"
            ></div>
          </div>
        </div>
      </div>
    </section>

     <section class="fitur-section scroll-anim" id="fitur">
      <div class="fitur-cards">
        <div 
          class="card" 
          v-for="(fitur, index) in fiturList" 
          :key="index"
          :style="{ '--animation-delay': `${index * 0.2}s` }"
        >
          <div class="card-icon">
            <img :src="fitur.icon" :alt="fitur.alt" />
          </div>
          <h3>{{ fitur.title }}</h3>
          <p>{{ fitur.desc }}</p>
          <a href="#" class="btn" @click.prevent="handleButtonClick(fitur.action)">
            {{ fitur.btn }}
          </a>
        </div>
      </div>
    </section>

    <section class="tim-section scroll-anim">
      <h2>Kreativitas di Balik Rumah BUMN</h2>
      <div class="tim-container">
        <div class="tim-member endang">
  <div class="member-photo">
  <img 
  src="@/assets/beranda/Bu-Endang.png"
  alt="Bu Endang"
  />
</div>
        <div class="member-info">
        <div class="member-quote">
        {{ timList[0].quote }}
        </div>
        <h3 class="member-name">Tya</h3>
        <p class="member-position">{{ timList[0].jabatan }}</p>
      </div>
    </div>

        <div class="tim-member abim">
  <div class="member-photo">
  <img 
  src="@/assets/beranda/Abim.png"
  alt="Bu Endang"
        />
        </div>
        <div class="member-info">
        <div class="member-quote">
        {{ timList[1].quote }}
        </div>
        <h3 class="member-name">Abim</h3>
        <p class="member-position">{{ timList[1].jabatan }}</p>
        </div>
        </div>
      </div>
    </section>

    <section class="testimoni-section scroll-anim">
      <div class="testimoni-header">
        <h2>Suara UMKM Binaan</h2>
        <p>Setiap UMKM memiliki cerita dan tantangan tersendiri dalam perjalanan bisnisnya. Berikut ini adalah kisah mereka yang telah bergabung dan tumbuh bersama Rumah BUMN Semarang.</p>
      </div>
      <div class="testimoni-card">
        <button class="testimoni-nav-btn left-btn" @click="prevTestimoni" :disabled="currentTestimoni === 0">
          ❮
        </button>
        <div class="testimoni-content">
          <p class="quote">
            <span class="quote-icon">❝</span>
            {{ testimoniList[currentTestimoni].quote }}
          </p>
          <p class="author">
            <span class="user-icon">👤</span>
            <strong>{{ testimoniList[currentTestimoni].name }}</strong> | 
            <em>{{ testimoniList[currentTestimoni].business }}</em>
          </p>
        </div>
        <button class="testimoni-nav-btn right-btn" @click="nextTestimoni" :disabled="currentTestimoni === testimoniList.length - 1">
          ❯
        </button>
      </div>
      <div class="testimoni-dots">
        <span 
          v-for="(_, index) in testimoniList" 
          :key="index"
          class="dot"
          :class="{ active: index === currentTestimoni }"
          @click="currentTestimoni = index"
        ></span>
      </div>
    </section>

    <!-- FAQ SECTION -->
    <section class="faq-section scroll-anim">
    <h2 class="faq-section h2">Pertanyaan yang Sering Muncul</h2>
    <div class="faq-container">
    <div 
      v-for="(faq, index) in faqList" 
      :key="index" 
      class="faq-item" 
      :class="{ expanded: expandedFaqs.includes(index) }"
    >
      <!-- Bagian pertanyaan -->
      <div class="faq-question" @click="toggleFaq(index)">
        <span class="faq-sign">{{ expandedFaqs.includes(index) ? '-' : '+' }}</span>
        {{ faq.question }}
      </div>

      <!-- Bagian jawaban -->
      <div
        v-if="expandedFaqs.includes(index)"
        class="faq-answer"
        v-html="faq.answer"
      ></div>
    </div>
    </div>
  </section>


    <section class="lokasi-section scroll-anim">
      <h2 class="lokasi-title">Lokasi Kami</h2>
      <div class="lokasi-container">
        <div class="lokasi-info">
          <div class="info-item">
            <div class="info-icon">
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
              </svg>
            </div>
            <div class="info-content">
              <h4>Alamat</h4>
              <p>Jl. Sultan Agung No.108, Wonotingal, Kec. Candisari, Kota Semarang, Jawa Tengah</p>
            </div>
          </div>
          <div class="info-item">
            <div class="info-icon">
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/>
              </svg>
            </div>
            <div class="info-content">
              <h4>Telepon</h4>
              <p>02486458877</p>
            </div>
          </div>
          <div class="info-item">
            <div class="info-icon">
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
              </svg>
            </div>
            <div class="info-content">
              <h4>Email</h4>
              <p>rumahbumnbri.semarang@gmail.com</p>
            </div>
          </div>
          <a href="https://maps.app.goo.gl/92ckVf8ZgBdzY5PH8" target="_blank" class="btn-maps">
            Lihat di Google Maps
          </a>
        </div>
        <div class="lokasi-map">
          <iframe 
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3959.961436420567!2d110.4180817!3d-7.0138183!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e708b78e2b060ad%3A0xec2b3d8d498a5ece!2sRumah%20Kreatif%20Semarang%20BUMN%20BRI!5e0!3m2!1sid!2sid!4v1752221750761!5m2!1sid!2sid" 
            width="100%" 
            height="400" 
            style="border:0; border-radius: 16px;" 
            allowfullscreen="" 
            loading="lazy" 
            referrerpolicy="no-referrer-when-downgrade">
          </iframe>
        </div>
      </div>
    </section>

    <div class="floating-actions">
      <button class="fab main-fab" @click="toggleFab" :class="{ active: fabOpen }">
        <svg class="fab-icon" viewBox="0 0 24 24" fill="currentColor">
          <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"/>
        </svg>
      </button>
      <div class="fab-menu" :class="{ active: fabOpen }">
        <a href="https://api.whatsapp.com/send?phone=6285190084481&text=Halo%2C%20Saya%20ingin%20menanyakan%20terkait%20Rumah%20BUMN%20Semarang%20" target="_blank" class="fab-item whatsapp">
          <svg class="fab-icon" viewBox="0 0 24 24" fill="currentColor">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.787"/>
          </svg>
          <span class="fab-text">WhatsApp</span>
        </a>
        <a href="mailto:rumahbumnbri.semarang@gmail.com" class="fab-item email">
          <svg class="fab-icon" viewBox="0 0 24 24" fill="currentColor">
            <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
          </svg>
          <span class="fab-text">Email</span>
        </a>
        <button @click="scrollToTop" class="fab-item scroll-top">
          <svg class="fab-icon" viewBox="0 0 24 24" fill="currentColor">
            <path d="M7.41 15.41L12 10.83l4.59 4.58L18 14l-6-6-6 6z"/>
          </svg>
          <span class="fab-text">Top</span>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, onBeforeUnmount } from 'vue'
import gsap from 'gsap' // Import GSAP

// Import assets
import iconUmkm from '@/assets/beranda/icon-umkm.svg'
import iconEvent from '@/assets/beranda/icon-event.svg'
import iconBooking from '@/assets/beranda/icon-booking.svg'
import orang1 from '@/assets/beranda/orang1.png'
import iconLinkedin from '@/assets/beranda/icon-linkedin.png'
import iconEmail from '@/assets/beranda/icon-email.jpg'
import hero from '@/assets/beranda/hero background.jpg'

// Import carousel images
import carouselImage1 from '@/assets/carousel_image/1.png'
import carouselImage2 from '@/assets/carousel_image/2.png'
import carouselImage3 from '@/assets/carousel_image/3.png'
import carouselImage4 from '@/assets/carousel_image/4.png'
import carouselImage5 from '@/assets/carousel_image/5.png'
import carouselImage6 from '@/assets/carousel_image/6.png'
import carouselImage7 from '@/assets/carousel_image/7.png'
import carouselImage8 from '@/assets/carousel_image/8.png'
import carouselImage9 from '@/assets/carousel_image/9.png'
import carouselImage10 from '@/assets/carousel_image/10.png'

// Reactive data
const fabOpen = ref(false)
const currentTestimoni = ref(0)

// Carousel specific refs and data
const ring = ref(null)
const imgRefs = []
const images = Array.from({ length: 10 }) // For 10 images in the carousel
const carouselImages = [
  carouselImage1,
  carouselImage2,
  carouselImage3,
  carouselImage4,
  carouselImage5,
  carouselImage6,
  carouselImage7,
  carouselImage8,
  carouselImage9,
  carouselImage10
]

let xPos = 0
let dragHandler = null

// Carousel specific function
const getBgPos = (i) => {
  const rotY = gsap.getProperty(ring.value, 'rotationY')
  const angle = (i * 36 + rotY) * (Math.PI / 180) // 360 degrees / 10 images = 36 degrees per image
  const radius = 500 // Adjust radius as needed 
  }

// Enhanced fitur list with actions
const fiturList = ref([
  {
    icon: iconUmkm,
    alt: 'Ikon UMKM',
    title: 'Daftar Sekarang',
    desc: 'Gabung program pembinaan UMKM Rumah BUMN Semarang dan kembangkan bisnis Anda bersama kami!',
    btn: 'Daftar Disini',
    action: 'register'
  },
  {
    icon: iconEvent,
    alt: 'Ikon Event',
    title: 'Ikuti Kami!',
    desc: 'Jangan lewatkan kegiatan seru dan inspiratif! Ikuti update lengkap melalui sosial media kami.',
    btn: 'Cek Disini',
    action: 'social'
  },
  {
    icon: iconBooking,
    alt: 'Ikon Booking',
    title: 'Booking Ruangan',
    desc: 'Butuh tempat untuk event atau pengembangan bisnis ? Pesan ruang nyaman kami sekarang dan buat acara Anda lebih berkesan!',
    btn: 'Hubungi Kami',
    action: 'contact'
  }
])

// Enhanced tim list
const timList = ref([
  {
    id: 1,
    nama: 'Endang',
    jabatan: 'Fasilitator Rumah BUMN Semarang',
    foto: orang1,
    quote: 'Transformasi dan digitalisasi membangun ekosistem bisnis digital. Kami hadir sebagai partner yang siap mendampingi perjalanan transformasi digital UKM.',
    linkedin: iconLinkedin,
    email: iconEmail
  },
  {
    id: 2,
    nama: 'Abim',
    jabatan: 'Fasilitator Rumah BUMN Semarang',
    foto: orang1,
    quote: 'Mendorong transformasi dan digitalisasi untuk menciptakan ekosistem bisnis yang terhubung dan modern. Bersama, kita wujudkan pertumbuhan usaha yang lebih cepat dan berdaya saing tinggi di era digital.',
    linkedin: iconLinkedin,
    email: iconEmail
  }
])

const faqList = ref([
  {
    question: 'Apakah itu Rumah BUMN?',
    answer: 'Rumah BUMN berperan dalam membina UMKM dimulai dari Go Modern, Go Digital, Go Online, Go Global.'
  },
  {
    question: 'Caranya gabung UMKM bagaimana?',
    answer: `
      <ul>
        <li>Menghubungi Rumah BUMN terdekat di kota Anda.</li>
        <li>Setelah itu, mengisi link form member Rumah BUMN.</li>
      </ul>`
  },
  {
    question: 'Cara agar bisa magang di Rumah BUMN?',
    answer: `
      <ul>
        <li>Mengirim surat permohonan magang dari instansi pendidikan ke Rumah BUMN yang dituju.</li>
        <li>Melampirkan CV dan dokumen pendukung.</li>
        <li>Jika disetujui, akan diberikan penempatan dan jadwal sesuai kebutuhan operasional Rumah BUMN tersebut.</li>
      </ul>`
  },
  {
    question: 'Cara booking tempat di Rumah BUMN bagaimana ya?',
    answer: `
      <ul>
        <li>Hubungi pengelola Rumah BUMN secara langsung (datang ke lokasi atau melalui kontak yang tersedia).</li>
        <li>Beberapa Rumah BUMN juga menyediakan sistem booking online melalui website atau WhatsApp resmi.</li>
        <li>Pemesanan biasanya bersifat gratis untuk UMKM binaan, namun tetap perlu penjadwalan dan konfirmasi.</li>
      </ul>`
  },
  {
    question: 'Apa saja 5 fungsi Rumah BUMN?',
    answer: `
      <ul>
        <li>Pengembangan UMKM</li>
        <li>Satuan Petugas (Satgas) bencana</li>
        <li>Menyediakan co-working space</li>
        <li>Basecamp millenials</li>
        <li>Program PK/BL/KUR</li>
      </ul>`
  },
  {
    question: 'Apa tujuan utama Rumah BUMN bagi pelaku UMKM?',
    answer:'Tujuan utamanya adalah untuk memperkuat ekonomi rakyat melalui peningkatan kualitas UMKM.'
  }
])

const expandedFaqs = ref([])

const toggleFaq = (index) => {
  if (expandedFaqs.value.includes(index)) {
    expandedFaqs.value = []
  } else {
    expandedFaqs.value = [index]
  }
}

// Testimoni list
const testimoniList = ref([
  {
    name: 'Yuta P.',
    business: ' Semprong Yuta',
    quote: 'Sejak ikut program pembinaan di Rumah BUMN Semarang, usaha saya berkembang pesat. Ilmu digital marketing dan jejaring yang saya dapat sangat membantu meningkatkan penjualan.'
  },
  {
    name: 'Lyna Windi',
    business: 'Double8craft',
    quote: 'Program mentoring dan workshop yang diberikan benar-benar applicable di bisnis saya. Sekarang produk kerajinan saya sudah go digital dan jangkauan pasar makin luas.'
  },
  {
    name: 'Swabawa Arif',
    business: 'Idea Craft & Fashion',
    quote: 'Dari yang tidak tahu tentang online marketing, sekarang saya bisa jualan melalui berbagai platform digital. Terima kasih Rumah BUMN Semarang!'
  }
])

// Methods
const goToGallery = () => {
  window.location.href = '/galeri'
}

const toggleFab = () => {
  fabOpen.value = !fabOpen.value
}

const handleButtonClick = (action) => {
  switch (action) {
    case 'register':
      window.open('https://docs.google.com/forms/d/e/1FAIpQLSekOnFWb3ajL6d4Pmm3gxAyK3nM86cm1XbLm37wJFmSlef9lQ/viewform', '_blank')
      break
    case 'social':
      // Redirect to social media or news page
      window.open('https://instagram.com/rumahbumn.semarang', '_blank')
      break
    case 'contact':
      window.open('https://api.whatsapp.com/send?phone=6285190084481&text=Halo%20Saya%20Ingin%20Booking%20Ruangan%0A%0ANama%20%3A%0AKomunitas%20%3A%0AKeperluan%20%3A%0ATanggal%20dan%20Waktu%20%3A', '_blank')
      break
  }
}

const generateAvatar = (name) => {
  return `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=667eea&color=fff&size=400`
}

const handleImageError = (event) => {
  const img = event.target
  const name = img.alt
  img.src = generateAvatar(name)
}

const nextTestimoni = () => {
  if (currentTestimoni.value < testimoniList.value.length - 1) {
    currentTestimoni.value++
  }
}

const prevTestimoni = () => {
  if (currentTestimoni.value > 0) {
    currentTestimoni.value--
  }
}

const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  })
}

// Carousel drag functions
function dragStart(e) {
  if (e.touches) e.clientX = e.touches[0].clientX
  xPos = Math.round(e.clientX)
  gsap.set(ring.value, { cursor: 'grabbing' })

  dragHandler = (event) => drag(event)
  window.addEventListener('mousemove', dragHandler)
  window.addEventListener('touchmove', dragHandler)
}

function drag(e) {
  if (e.touches) e.clientX = e.touches[0].clientX
  const delta = (Math.round(e.clientX) - xPos) % 360

  gsap.to(ring.value, {
    rotationY: `-=${delta}`,
    onUpdate: () => {
      gsap.set(imgRefs, {
        backgroundPosition: (i) => getBgPos(i)
      })
    }
  })

  xPos = Math.round(e.clientX)
}

function dragEnd() {
  window.removeEventListener('mousemove', dragHandler)
  window.removeEventListener('touchmove', dragHandler)
  gsap.set(ring.value, { cursor: 'grab' })
}


// Auto-rotate testimoni
let testimoniInterval

onMounted(() => {
  // Scroll animations
  const animatedSections = document.querySelectorAll('.scroll-anim')
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('show')
      }
    })
  }, { threshold: 0.1 })

  animatedSections.forEach(section => observer.observe(section))

  // Auto-rotate testimoni every 5 seconds
  testimoniInterval = setInterval(() => {
    currentTestimoni.value = (currentTestimoni.value + 1) % testimoniList.value.length
  }, 5000)

  // GSAP setup for carousel
  gsap.timeline()
    .set(ring.value, { rotationY: 180, cursor: 'grab' })
    .set(imgRefs, {
      rotateY: (i) => i * -36,
      transformOrigin: '50% 50% 500px',
      z: -500,
      backgroundImage: (i) => `url(${carouselImages[i % carouselImages.length]})`,
      backgroundPosition: (i) => getBgPos(i),
      backfaceVisibility: 'hidden',
      backgroundSize: 'cover',
      backgroundRepeat: 'no-repeat'
    })
    .from(imgRefs, {
      duration: 1.5,
      y: 200,
      opacity: 0,
      stagger: 0.1,
      ease: 'expo'
    })

  // Hover effects for carousel images
  imgRefs.forEach((el) => {
    el.addEventListener('mouseenter', () => {
      gsap.to(imgRefs, {
        opacity: (i, target) => (target === el ? 1 : 0.5),
        ease: 'power3'
      })
    })
    el.addEventListener('mouseleave', () => {
      gsap.to(imgRefs, {
        opacity: 1,
        ease: 'power2.inOut'
      })
    })
  })

  // Drag handlers for carousel
  window.addEventListener('mousedown', dragStart)
  window.addEventListener('touchstart', dragStart)
  window.addEventListener('mouseup', dragEnd)
  window.addEventListener('touchend', dragEnd)
})

onBeforeUnmount(() => {
  // Clear carousel event listeners
  window.removeEventListener('mousedown', dragStart)
  window.removeEventListener('touchstart', dragStart)
  window.removeEventListener('mouseup', dragEnd)
  window.removeEventListener('touchend', dragEnd)
  window.removeEventListener('mousemove', dragHandler)
  window.removeEventListener('touchmove', dragHandler)
})

onUnmounted(() => {
  if (testimoniInterval) {
    clearInterval(testimoniInterval)
  }
})
</script>

<style scoped>
@import '@/assets/css/beranda.css';

/* NEW Carousel Section Styling */
.stage {
  width: 100%;
  height: 100%;
  transform-style: preserve-3d;
  user-select: none;
}

.beranda-container {
  perspective: 2000px;
  width: 300px;
  height: 400px; /* Reduced from 500px */
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  position: absolute;
  transform-style: preserve-3d;
}

.ring {
  position: relative;
  width: 100%;
  height: 100%;
  transform-style: preserve-3d;
}
.img {
  position: absolute;
  width: 100%; /* Make images fill the container */
  height: 100%; /* Make images fill the container */
  border-radius: 16px;
  box-shadow: 0 10px 30px rgba(0,0,0,0.3);
}


/* Background section styles */
/* Animasi dari putih → transparan */
@keyframes fadeOverlayToNormal {
  0% {
    background-color: white; /* awalnya putih penuh */
  }
  100% {
    background-color: rgba(255, 255, 255, 0); /* transparan → gambar terlihat */
  }
}

/* Background section */
.background-image-section {
  position: relative;
  width: 100%;
  height: 100vh; /* Full height untuk desktop */
  display: flex;
  justify-content: center;
  align-items: center;
  background-image: url("/src/assets/beranda-background.jpg");
  background-size: cover; /* Menjaga gambar menutupi seluruh area tanpa distorsi */
  background-position: center bottom; /* Menjaga gambar tetap terpusat */
  background-repeat: no-repeat;
}

/* Overlay yang memudar */
.background-image-section .overlay {
  padding: 0;
  border-radius: 0;
  max-width: 100%;
  width: 100%;
  height: 100%; /* Menjaga overlay menutupi seluruh area */
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: -30;
  left: 0;
  z-index: 1;
  animation: fadeOverlayToNormal 2.5s ease-out forwards;
}

/* Konten logo & deskripsi */
.background-image-section .content {
  position: relative;
  z-index: 2; /* selalu di atas overlay */
  text-align: center;
  color: black;
  animation: fadeInUp 0.6s ease-out forwards;
}

/* Responsive untuk tablet dan mobile */
@media (max-width: 768px) {
  .background-image-section {
    height: 100%; /* Tetap menggunakan 100vh pada perangkat kecil */
    width: 100%;
   background-size: auto 100%; /* tinggi penuh, lebar menyesuaikan */
    background-position: center center;
    
  }

  /* Overlay menutupi seluruh konten */
  .background-image-section .overlay {
    height: 100%; /* Overlay menyesuaikan dengan konten */
  }
}

.logo-sequence {
  display: flex;
  gap: 2rem;
  margin-bottom: 1rem;
  justify-content: center;
  align-items: center;
}

/* Animasi fade + scale untuk logo */
@keyframes fadeInScale {
  0% {
    opacity: 0;
    transform: scale(0.8);
  }
  100% {
    opacity: 1;
    transform: scale(1);
  }
}

/* Animasi fade in + geser ke atas untuk teks */
@keyframes fadeInUpText {
  0% {
    opacity: 0;
    transform: translateY(20px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Logo animasi */
.background-logo-seq {
  height: 180px;
  width: auto;
  object-fit: contain;
  animation: fadeInScale 0.8s ease-out forwards;
}

/* Teks animasi */
.background-text {
  font-size: 1.2rem;
  line-height: 1.5;
  font-weight: 500;
  text-align: center;
  max-width: 600px;
  animation: fadeInUpText 0.8s ease-out forwards;
}

@media screen and (max-width: 768px) {
  .background-text {
    font-size: 1rem;
    padding: 0 1rem;

  }
  .background-logo-seq {
  height: 140px;
  width: auto;
  object-fit: contain;
  }
  
}

</style>