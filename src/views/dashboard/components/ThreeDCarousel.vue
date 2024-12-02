<template>
    <div class="carousel-wrapper">
      <div v-for="(photoGroup, groupIndex) in groupedPhotos" :key="groupIndex" class="carousel">
        <div class="carousel-container" :style="{ transform: `rotateY(${angles[groupIndex]}deg)` }">
          <div
            v-for="(photo, index) in photoGroup"
            :key="index"
            class="carousel-item"
            :style="{ transform: `rotateY(${index * 360 / photoGroup.length}deg) translateZ(300px)` }"
            @click="emitClick(photo)"
          >
            <img :src="photo" alt="Photo" />
          </div>
        </div>
        <div class="controls">
          <button @click="rotate(groupIndex, -1)">&#9664;</button>
          <button @click="rotate(groupIndex, 1)">&#9654;</button>
        </div>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref, computed, defineProps, defineEmits, watch} from 'vue';
  
  const props = defineProps({
    photos: Array as () => string[], // 图片数组
  });
  
  const emit = defineEmits(['click-photo']);
  
  // 分组图片，每组最多5张
  const groupedPhotos = computed(() => {
    const groups: string[][] = [];
    if(!props.photos) return;
    for (let i = 0; i < props.photos.length; i += 5) {
      const group = props.photos.slice(i, i + 5);
      if (group.length > 0) {
        groups.push(group);
      }
    }
    return groups;
  });
  
  // 每个轮播图的旋转角度
  const angles = ref(groupedPhotos.value?.map(() => 0));
  
  const rotate = (groupIndex: number, direction: number) => {
    if(!groupedPhotos.value) return;
    const group = groupedPhotos.value[groupIndex];
    if (group && group.length > 0 && angles.value) {
      angles.value[groupIndex] += direction * (360 / group.length);
    } else {
      console.warn(`Group ${groupIndex} is empty or invalid.`);
    }
    // angles.value[groupIndex] += direction * (360 / groupedPhotos.value[groupIndex].length);
  };

  watch(
    () => groupedPhotos.value,
    (newGroups) => {
      if(!newGroups) return;
      angles.value = newGroups.map(() => 0); // 保证每组有一个初始角度
    },
    { immediate: true }
  );
  
  const emitClick = (photo: string) => {
    emit('click-photo', photo);
  };
  </script>
  
  <style scoped>
  .carousel-wrapper {
    display: flex;
    flex-direction: column;
    gap: 50px;
  }
  
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
    top: 30%;
    left: 30%;
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
  