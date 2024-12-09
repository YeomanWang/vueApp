<template>
  <div class="masonry-container">
    <div class="masonry">
      <div class="masonry-item" v-for="(photo, index) in visiblePhotos" :key="index" @click="emitClick(`http://localhost:3000${photo}`)">
        <img :src="`http://localhost:3000${photo}`" alt="Photo" />
      </div>
    </div>
    <div class="loading" v-if="loading">加载中...</div>
    <div class="no-more" v-if="noMore">没有更多的照片了</div>
    <div ref="sentinel" class="sentinel"></div>
  </div>
</template>
  
<script setup lang="ts">
  import { defineProps, defineEmits, ref, onMounted, onBeforeUnmount, defineExpose} from 'vue';
  const props = defineProps({
    photos: Array as () => string[],
  });

  const emit = defineEmits(['click-photo', 'load-more']);

  const loading = ref(false);
  const noMore = ref(false);
  const photos = ref([...props.photos]); // 本地存储照片数据
  const visiblePhotos = ref<string[]>([]); // 当前可见的照片
  const sentinel = ref<HTMLDivElement | null>(null); // 哨兵元素

  const observer = new IntersectionObserver(async (entries) => {
    if (entries[0].isIntersecting && !loading.value && !noMore.value) {
      loading.value = true;
      // const newPhotos = await loadMorePhotos();
      emit('load-more');
    }
  });

  const emitClick = (photo: string) => {
    emit('click-photo', photo);
  };

  onMounted(() => {
    if (sentinel.value) {
      observer.observe(sentinel.value);
    }
  });

  onBeforeUnmount(() => {
    if (sentinel.value) {
      observer.unobserve(sentinel.value);
    }
  });

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const updatePhotos = (newPhotos: string[]) => {
    if (newPhotos.length === 0) {
      noMore.value = true;
    } else {
      photos.value.push(...newPhotos);
      visiblePhotos.value = photos.value;
    }
    loading.value = false;
  };

  defineExpose({ updatePhotos });
</script>
  
<style scoped>
  .masonry-container {
    position: relative; /* 作为子元素定位的参考点 */
    padding-bottom: 50px; /* 为底部的加载提示预留空间 */
  }

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

  .loading,
  .no-more {
    position: absolute;
    bottom: 10px; /* 距离容器底部10px */
    left: 50%;
    transform: translateX(-50%);
    font-size: 1.2rem;
    text-align: center;
    color: #666;
  }
</style>