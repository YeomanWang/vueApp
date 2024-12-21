<script setup lang="ts">
import { onMounted, ref } from 'vue'
import SideBar from './SideBar.vue'
import type { MenuOption } from 'naive-ui'
import audioSrc from '../../assets/music.mp3';
const menuOptions: MenuOption[] = [
  {
    label: '王一一的照片',
    key: 'photos',
    // children: [
    //   {
    //     label: '叙事者',
    //     key: 'narrator',
    //   },
    //   {
    //     label: '羊男',
    //     key: 'sheep-man',
    //   }
    // ]
  },
  {
    key: 'divider-1',
    type: 'divider',
    props: {
      style: {
        marginLeft: '32px'
      }
    }
  },
  {
    label: '杂七杂八',
    key: 'test',
  },
  {
    label: '王一一的视频',
    key: 'video',
  },
]

const isPlaying = ref(false);
const audio = new Audio(audioSrc); 

const toggleMusic = () => {
  if (isPlaying.value) {
    audio.pause();
  } else {
    audio.play();
  }
  isPlaying.value = !isPlaying.value;
};

onMounted(() => {
  audio.loop = true; 
})

const handleSelectOption = (key: unknown) => {
  console.log(key);
}

// 动态获取用户信息（例如从Vuex或API）
const userName = ref("小明"); // 假设这个是从后端动态获取的用户名

const canvas = ref<HTMLCanvasElement | null>(null);
const canvasContainer = ref<HTMLElement | null>(null);
const messageVisible = ref(false);

// 初始化动画
const drawCanvas = () => {
  const ctx = canvas.value?.getContext("2d");
  if (!ctx) return;

  // 设置画布背景
  ctx.fillStyle = "#ffcc99";
  ctx.fillRect(0, 0, canvas.value?.width ?? 0, canvas.value?.height ?? 0);

  // 动态显示文字
  ctx.font = "30px Arial";
  ctx.textAlign = "center";
  ctx.fillText("欢迎", canvas.value?.width ?? 0 / 2, canvas.value?.height ?? 0 / 2);

  // 向中间滑入的效果
  let offsetX = -canvas.value.width;
  const animationDuration = 5000; // 动画持续5秒
  let startTime = Date.now();
  const animate = () => {
    const elapsed = Date.now() - startTime;
    if (elapsed < animationDuration) {
      offsetX = Math.max(-canvas.value.width, (elapsed / animationDuration) * canvas.value.width - canvas.value.width);
      requestAnimationFrame(animate);
    } else {
      // 动画完成后文字居中显示
      offsetX = 0;
      messageVisible.value = true;
      setTimeout(() => {
        // 5秒后移出
        messageVisible.value = false;
        offsetX = -canvas.value.width;
        startTime = Date.now();
        requestAnimationFrame(animate);
      }, 5000); // 延迟5秒后开始移出
    }

    // 重绘
    ctx.clearRect(0, 0, canvas.value.width, canvas.value.height);

    // 绘制文字
    ctx.font = "30px Arial";
    ctx.fillStyle = "ffcc99";
    ctx.textAlign = "center";
    ctx.fillText(
      "欢迎 " + userName.value + " 小朋友",
      (canvas.value.width / 2) + offsetX,
      canvas.value.height / 2
    );
  };
  animate();
};

// 在组件挂载时开始绘制动画
onMounted(() => {
  drawCanvas();
});

//add get all ages of the user api

</script>

<template>
  <div class="content">
    <aside>
      <SideBar :menuOptions="menuOptions" @select-option="handleSelectOption" />
    </aside>
    <main style="width:100%; overflow-y: auto; padding: 2rem;">
      <div class="music-player" @click="toggleMusic">
        <div :class="['circle', { spinning: isPlaying }]"></div>
      </div>
      <!-- <div id="canvas-container" ref="canvasContainer">
        <canvas ref="canvas" width="600" height="400"></canvas>
      </div> -->
      <RouterView />
    </main>
  </div>
</template>
<style>
.content {
  display: flex;
  width: 100%;
  height: 100%;
}
.music-player {
  position: absolute;
  top: 1rem;
  right: 1rem;
  width: 60px;
  height: 60px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
}

.circle {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background-image: url('../../assets/11.jpg');
  background-size: 100%;
  background-position: center;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.3);
  transition: transform 0.3s ease;
}

.spinning {
  animation: spin 2s linear infinite;
}

@keyframes spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

#canvas-container {
  position: relative;
  width: 600px;
  height: 400px;
  margin: auto;
}

.welcome-message {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 24px;
  color: #333;
  opacity: 0;
  transition: opacity 1s ease;
}

.welcome-message {
  opacity: 1;
}
</style>
