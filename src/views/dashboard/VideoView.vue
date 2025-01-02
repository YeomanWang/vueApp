<script setup lang="ts">
import { ref, onMounted, nextTick, type ComponentPublicInstance} from 'vue';
import apiClient from '../../service';

// 视频元素
const videoRefs = ref<(HTMLVideoElement | null)[]>([]);


const setVideoRef = (el: Element | ComponentPublicInstance | null, index: number) => {
  videoRefs.value[index] = el as HTMLVideoElement | null;
};
const volume = ref<Record<number, number>>({})
const playbackRate = ref<Record<number, number>>({});
const isPlaying = ref<Record<number, boolean>>({});
const currentTime = ref<Record<number, number>>({});
const duration = ref<Record<number, number>>({});
interface Video {
  id: number;
  videoPath: string;
  // Add other properties as needed
}

const videoList = ref<Video[]>([]);
// 控制栏状态
const isControlBarVisible = ref(false);
let hideControlBarTimeout: ReturnType<typeof setTimeout> | null = null;

// 显示控制栏
const showControlBar = () => {
  isControlBarVisible.value = true;
  if (hideControlBarTimeout) clearTimeout(hideControlBarTimeout);

  // 自动隐藏控制栏
  hideControlBarTimeout = setTimeout(() => {
    isControlBarVisible.value = false;
  }, 3000); // 3 秒后自动隐藏
};

// 隐藏控制栏
const hideControlBar = () => {
  isControlBarVisible.value = false;
};

// 视频事件监听
onMounted(async() => {
  await fetchVideos();

  nextTick(() => {
    videoRefs.value.forEach((video, index) => {
      if (video) {
        video.addEventListener('timeupdate', () => {
          currentTime.value[index] = video.currentTime;
          duration.value[index] = video.duration;
        });
        isPlaying.value[index] = false;
        playbackRate.value[index] = 1;
        // video.addEventListener('play', () => (isPlaying.value[index] = true));
        // video.addEventListener('pause', () => (isPlaying.value[index] = false));
      }
    });
  });

});

const fetchVideos = async() => {
  try {
    const response = await apiClient.get(`/videos/${localStorage.getItem('userId')}`); 
    response.data.map((video: Video) => {
      videoList.value.push(video);
    });
  } catch (error) {
    console.error('获取照片失败:', error);
  }
}

// 播放与暂停
const togglePlay = (index:number) => {
  const video = videoRefs.value[index];
  if (video) {
    if (isPlaying.value[index]) {
      video.pause();
      isPlaying.value[index] = false;
    } else {
      video.play();
      isPlaying.value[index] = true;
    }
  }
};

// 快进/快退
const seek = (index:number, seconds: number) => {
  const video = videoRefs.value[index];
  if (video) {
    video.currentTime += seconds;
  }
};

// 调节音量
const setVolume = (index:number, value: number) => {
  const video = videoRefs.value[index];
  if (video) {
    volume.value[index] = value;
    video.volume = value;
  }
};

// 设置倍速
const setPlaybackRate = (index:number, rate: number) => {
  const video = videoRefs.value[index];
  if (video) {
    playbackRate.value[index] = rate;
    video.playbackRate = rate;
  }
};

// 跳转到指定时间
const seekTo = (index:number, time: number) => {
  const video = videoRefs.value[index];
  if (video) {
    video.currentTime = time;
  }
};

</script>
<template>
  <div id="video-container" :key="item.id" v-for="(item, index) in videoList" @mousemove="showControlBar" @mouseleave="hideControlBar">
    <!-- 视频播放器 -->
    <video :ref="(el) => setVideoRef(el, index)" width="600" height="400" :src="`http://localhost:3000/${item.videoPath}`"></video>

    <!-- 自定义控制栏 -->
    <div id="control-bar" :class="{ 'show': isControlBarVisible }">
      <!-- 播放/暂停 -->
      <button @click="togglePlay(index)">{{ isPlaying[index] ? '暂停' : '播放' }}</button>

      <!-- 快进/快退 -->
      <button @click="seek(index, -10)">⏪ 后退 10 秒</button>
      <button @click="seek(index, 10)">⏩ 快进 10 秒</button>

      <!-- 音量调节 -->
      <input
        type="range"
        min="0"
        max="1"
        step="0.1"
        v-model="volume[index]"
        @input="setVolume(index, volume[index])"
      />

      <!-- 倍速播放 -->
      <select v-model="playbackRate[index]" @change="setPlaybackRate(index, playbackRate[index])">
        <option value="0.5">0.5x</option>
        <option value="1">1x</option>
        <option value="1.5">1.5x</option>
        <option value="2">2x</option>
      </select>

      <!-- 进度条 -->
      <div id="progress-bar">
        <input
          type="range"
          min="0"
          :max="duration[index] || 0"
          step="0.1"
          v-model="currentTime[index]"
          @input="seekTo(index, currentTime[index])"
        />
        <span>{{ currentTime[index]?.toFixed(1) || 0 }} / {{ duration[index]?.toFixed(1) || 0}}</span>
      </div>
    </div>
  </div>
</template>
<style scoped>
#video-container {
  position: relative;
  width: 600px;
  margin: auto;
  background: black;
}

video {
  display: block;
  width: 100%;
  height: auto;
}

#control-bar {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  padding: 10px;
  background: rgba(0, 0, 0, 0.6); /* 半透明背景 */
  color: white;
  display: flex;
  align-items: center;
  justify-content: space-around;
  opacity: 0; /* 默认隐藏 */
  visibility: hidden;
  transition: opacity 0.3s ease, visibility 0.3s ease;
}

#control-bar.show {
  opacity: 1; /* 悬浮显示 */
  visibility: visible;
}

button {
  background: rgba(255, 255, 255, 0.2);
  color: white;
  border: none;
  padding: 5px 10px;
  border-radius: 5px;
  cursor: pointer;
}

button:hover {
  background: rgba(255, 255, 255, 0.4);
}

input[type="range"],
select {
  margin: 0 10px;
  background: none;
  color: white;
}

#progress-bar {
  flex-grow: 1;
}
</style>