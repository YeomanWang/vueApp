<template>
  <div>
    <div class="toolbar">
      <!-- 切换展示方式 -->
      <n-button-group>
        <n-button @click="currentMode = 'masonry'">瀑布流</n-button>
        <n-button @click="currentMode = 'carousel'">3D 轮播</n-button>
      </n-button-group>
    </div>
    
    <!-- 展示区 -->
    <div v-if="currentMode === 'masonry'">
      <MasonryGallery :photos="photos" @click-photo="handlePhotoClick" />
    </div>
    <div v-else-if="currentMode === 'carousel'">
      <ThreeDCarousel :photos="photos" @click-photo="handlePhotoClick" />
    </div>

    <!-- 图片放大模态框 -->
    <div v-show="selectedPhoto" class="modal" @click="closeModal">
      <img class="modal-image" :src="selectedPhoto" alt="Enlarged Photo" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { NButton, NButtonGroup } from 'naive-ui';
import MasonryGallery from './components/MasonryGallery.vue';
import ThreeDCarousel from './components/ThreeDCarousel.vue';
import photo1Src from '../../assets/1.jpg';
import photo2Src from '../../assets/2.jpg';
import photo3Src from '../../assets/3.jpg';
import photo4Src from '../../assets/4.jpg';
import photo5Src from '../../assets/5.jpg';
const currentMode = ref('masonry'); // 当前展示模式
const photos = ref([
  photo1Src,
  photo2Src,
  photo3Src,
  photo4Src,
  photo5Src,
  photo1Src,
  photo2Src,
  photo3Src,
  photo4Src,
  photo5Src,
]);
const selectedPhoto = ref<string | null>(null);

// 点击图片放大
const handlePhotoClick = (photo: string) => {
  selectedPhoto.value = photo;
};

// 关闭模态框
const closeModal = () => {
  selectedPhoto.value = null;
};
</script>

<style scoped>
.toolbar {
  display: flex;
  justify-content: flex-end;
  margin-bottom: 1rem;
}

.modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.8);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.modal-image {
  max-width: 90%;
  max-height: 90%;
  border-radius: 8px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.5);
  cursor: pointer;
}
</style>
