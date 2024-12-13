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
    <div v-show="currentMode === 'masonry'">
      <MasonryGallery ref="masonryGallery" :photos="photos" @click-photo="handlePhotoClick" @load-more="handleLoadMorePhotos"/>
    </div>
    <div v-show="currentMode === 'carousel'">
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
import apiClient from '../../service';
const currentMode = ref('masonry'); // 当前展示模式
const photos = ref([]);
const selectedPhoto = ref<string | null>(null);
const masonryGallery = ref();
const age = ref(0);
let currentPage = 1;
// 点击图片放大
const handlePhotoClick = (photo: string) => {
  selectedPhoto.value = photo;
};

const fetchPhotos = async(resolve) => {
  try {
    const response = await apiClient.get(`/photos/${localStorage.getItem('userId')}/${age.value}?page=${currentPage}&limit=10`); 
    response.data.map(({photo}) => {
      photos.value.push(photo);
    });
    resolve(response.data);
    currentPage++;
  } catch (error) {
    console.error('获取照片失败:', error);
  }
}

const handleLoadMorePhotos = () => {
  return new Promise<string[]>((resolve) => {
    fetchPhotos(resolve);
  }).then((response) => {
    if (masonryGallery.value) {
      masonryGallery.value.updatePhotos(response.map(({photo}) => {return photo}));
    }
  });
}

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
