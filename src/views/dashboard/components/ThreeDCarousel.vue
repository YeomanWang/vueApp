<template>
    <div class="carousel">
      <div class="carousel-container" :style="{ transform: `rotateY(${angle}deg)` }">
        <div
          v-for="(photo, index) in photos"
          :key="index"
          class="carousel-item"
          :style="{ transform: `rotateY(${index * 360 / photos.length}deg) translateZ(300px)` }"
          @click="emitClick(photo)"
        >
          <img :src="photo" alt="Photo" />
        </div>
      </div>
      <div class="controls">
        <button @click="rotate(-1)">&#9664;</button>
        <button @click="rotate(1)">&#9654;</button>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref } from 'vue';
  import { defineProps, defineEmits } from 'vue';
  
  const props = defineProps({
    photos: Array as () => string[],
  });
  
  const emit = defineEmits(['click-photo']);
  const angle = ref(0);
  
  const rotate = (direction: number) => {
    angle.value += direction * (360 / props.photos.length);
  };
  
  const emitClick = (photo: string) => {
    emit('click-photo', photo);
  };
  </script>
  
  <style scoped>
  .carousel {
    perspective: 1000px;
    position: relative;
    width: 600px;
    height: 400px;
    margin: 0 auto;
  }
  
  .carousel-container {
    width: 100%;
    height: 100%;
    transform-style: preserve-3d;
    transition: transform 1s;
    position: relative;
  }
  
  .carousel-item {
    position: absolute;
    width: 200px;
    height: 150px;
    transform-style: preserve-3d;
  }
  
  .carousel-item img {
    width: 100%;
    height: 100%;
    border-radius: 8px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.5);
    cursor: pointer;
  }
  
  .controls {
    position: absolute;
    bottom: -50px;
    width: 100%;
    text-align: center;
  }
  
  .controls button {
    margin: 0 10px;
    padding: 10px 20px;
    font-size: 16px;
    cursor: pointer;
  }
  </style>
  