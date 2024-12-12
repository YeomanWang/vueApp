<script setup lang="ts">
import { ref, onMounted } from 'vue';

// 视频元素
const myVideo = ref<HTMLVideoElement | null>(null);

// 进度与状态
const currentTime = ref(0);
const duration = ref(0);
const volume = ref(1);
const playbackRate = ref(1);
const isPlaying = ref(false);

// 视频事件监听
onMounted(() => {
  if (myVideo.value) {
    const video = myVideo.value;
    
    // 更新进度
    video.addEventListener('timeupdate', () => {
      currentTime.value = video.currentTime;
      duration.value = video.duration;
    });
    
    // 检测播放状态
    video.addEventListener('play', () => (isPlaying.value = true));
    video.addEventListener('pause', () => (isPlaying.value = false));
  }
});

// 播放与暂停
const togglePlay = () => {
  if (myVideo.value) {
    if (isPlaying.value) {
      myVideo.value.pause();
    } else {
      myVideo.value.play();
    }
  }
};

// 快进/快退
const seek = (seconds: number) => {
  if (myVideo.value) {
    myVideo.value.currentTime += seconds;
  }
};

// 调节音量
const setVolume = (value: number) => {
  if (myVideo.value) {
    volume.value = value;
    myVideo.value.volume = value;
  }
};

// 设置倍速
const setPlaybackRate = (rate: number) => {
  if (myVideo.value) {
    playbackRate.value = rate;
    myVideo.value.playbackRate = rate;
  }
};

// 跳转到指定时间
const seekTo = (time: number) => {
  if (myVideo.value) {
    myVideo.value.currentTime = time;
  }
};
</script>
<template>
  <div id="video-container">
    <!-- 视频播放器 -->
    <video ref="myVideo" src="../../../11.mp4" width="600" height="400"></video>

    <!-- 自定义控制栏 -->
    <div id="control-bar">
      <!-- 播放/暂停 -->
      <button @click="togglePlay">{{ isPlaying ? '暂停' : '播放' }}</button>

      <!-- 快进/快退 -->
      <button @click="seek(-10)">⏪ 后退 10 秒</button>
      <button @click="seek(10)">⏩ 快进 10 秒</button>

      <!-- 音量调节 -->
      <input
        type="range"
        min="0"
        max="1"
        step="0.1"
        v-model="volume"
        @input="setVolume(volume)"
      />

      <!-- 倍速播放 -->
      <select v-model="playbackRate" @change="setPlaybackRate(playbackRate)">
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
          :max="duration"
          step="0.1"
          v-model="currentTime"
          @input="seekTo(currentTime)"
        />
        <span>{{ currentTime.toFixed(1) }} / {{ duration.toFixed(1) }}</span>
      </div>
    </div>
  </div>
</template>
<style scoped>
#video-container {
  position: relative;
  width: 600px;
  margin: auto;
}

#control-bar {
  display: flex;
  justify-content: space-around;
  align-items: center;
  margin-top: 10px;
  padding: 5px;
  background: #333;
  color: white;
  border-radius: 5px;
}

button {
  background: #555;
  color: white;
  border: none;
  padding: 5px 10px;
  border-radius: 5px;
  cursor: pointer;
}

button:hover {
  background: #777;
}

input[type="range"] {
  width: 100px;
}

#progress-bar {
  flex-grow: 1;
  margin: 0 10px;
}
</style>
