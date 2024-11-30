<template>
    <div class="masonry">
      <div class="masonry-item" v-for="(photo, index) in photos" :key="index" @click="emitClick(photo)">
        <img :src="photo" alt="Photo" />
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import { defineProps, defineEmits } from 'vue';
  
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const props = defineProps({
    photos: Array as () => string[],
  });
  
  const emit = defineEmits(['click-photo']);
  
  const emitClick = (photo: string) => {
    emit('click-photo', photo);
  };
  </script>
  
  <style scoped>
  .masonry {
    column-count: 3;
    column-gap: 1rem;
  }
  
  .masonry-item {
    margin-bottom: 1rem;
    break-inside: avoid;
    cursor: pointer;
    transition: transform 0.2s;
  }
  
  .masonry-item:hover {
    transform: scale(1.05);
  }
  
  .masonry-item img {
    width: 100%;
    border-radius: 8px;
    display: block;
  }
  </style>
  