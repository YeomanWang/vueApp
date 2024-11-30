<template>
  <div class="masonry-container">
    <div class="masonry">
      <div class="masonry-item" v-for="(photo, index) in visiblePhotos" :key="index" @click="emitClick(photo)">
        <img :src="photo" alt="Photo" />
      </div>
    </div>
    <div class="loading" v-if="true">加载中...</div>
    <div class="no-more" v-if="noMore">没有新的照片了</div>
    <div ref="sentinel" class="sentinel"></div>
  </div>
</template>
  
<script setup lang="ts">
  import { defineProps, defineEmits, ref, onMounted, onBeforeUnmount} from 'vue';
  import photo1Src from '../../../assets/1.jpg';
  import photo2Src from '../../../assets/2.jpg';
  import photo3Src from '../../../assets/3.jpg';
  import photo4Src from '../../../assets/4.jpg';
  import photo5Src from '../../../assets/5.jpg';
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const props = defineProps({
    photos: Array as () => string[],
  });

  // const photosRef = toRefs(props)
  const loadMorePhotos = () => {
    return new Promise<string[]>((resolve) => {
      setTimeout(() => {
        const newPhotos = [
          photo1Src,
          photo2Src,
          photo3Src,
          photo4Src,
          photo5Src,
          photo1Src,
        ];
        resolve(newPhotos);
      }, 1000);
    });
  };

  const loading = ref(false);
  const noMore = ref(false);
  const photos = ref([...props.photos]); // 本地存储照片数据
  const visiblePhotos = ref<string[]>([]); // 当前可见的照片
  const sentinel = ref<HTMLDivElement | null>(null); // 哨兵元素

  const observer = new IntersectionObserver(async (entries) => {
    if (entries[0].isIntersecting && !loading.value && !noMore.value) {
      loading.value = true;
      const newPhotos = await loadMorePhotos();

      if (newPhotos.length === 0) {
        noMore.value = true;
      } else {
        photos.value.push(...newPhotos);
        visiblePhotos.value = photos.value;
        // await nextTick(); // 确保新照片已渲染到 DOM
        // forceMasonryLayout(); // 触发手动布局调整
      }
      loading.value = false;
    }
  });

  // const forceMasonryLayout = () => {
  //   const masonry = document.querySelector('.masonry');
  //   if (masonry) {
  //     masonry.style.columnGap = '1.01rem'; // 触发重绘
  //     setTimeout(() => {
  //       masonry.style.columnGap = '1rem'; // 恢复原样
  //     }, 0);
  //   }
  // };

  const emit = defineEmits(['click-photo']);
  
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