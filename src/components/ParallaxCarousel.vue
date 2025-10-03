<template>
  <div class="parallax-carousel">
    <div class="carousel-track">
      <div
        v-for="(img, i) in images"
        :key="i"
        class="carousel-item"
        :style="{ backgroundImage: `url(${img})` }"
      />
    </div>
  </div>
</template>

<script setup>
defineProps({
  images: Array
})
</script>

<style scoped>
.parallax-carousel {
  perspective: 1200px;
  overflow-x: auto;
  overflow-y: hidden;
  white-space: nowrap;
  padding: 50px 0;
  background: black;
}

.carousel-track {
  display: inline-flex;
  gap: 30px;
  transform-style: preserve-3d;
  padding: 0 50px;
}

.carousel-item {
  width: 200px;
  height: 300px;
  background-size: cover;
  background-position: center;
  border-radius: 12px;
  flex-shrink: 0;
  transition: transform 0.3s ease;
}

/* Efek melingkar ke dalam */
.carousel-item:nth-child(1) { transform: rotateY(-40deg); }
.carousel-item:nth-child(2) { transform: rotateY(-20deg); }
.carousel-item:nth-child(3) { transform: rotateY(0deg); }
.carousel-item:nth-child(4) { transform: rotateY(20deg); }
.carousel-item:nth-child(5) { transform: rotateY(40deg); }
.carousel-item:nth-child(6) { transform: rotateY(60deg); }
</style>
