<script setup lang="ts">
import '../../assets/base.css';
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
const active = ref(false);
const toggleMusic = () => {
  if (isPlaying.value) {
    audio.pause();
  } else {
    audio.play();
  }
  isPlaying.value = !isPlaying.value;
};

const handleSelectOption = (key: unknown) => {
  console.log(key);
}

// 在组件挂载时开始绘制动画
onMounted(() => {
  audio.loop = true;
  const savedTheme = localStorage.getItem('theme') || 'light';
  theme.value = savedTheme;
  document.body.classList.toggle('dark-theme', savedTheme === 'dark');
});

//add get all ages of the user api

/*tootle theme*/
const theme = ref('light');
const toggleTheme = () => {
  theme.value = theme.value === 'light' ? 'dark' : 'light';
  document.body.classList.toggle('dark-theme', theme.value === 'dark');
  document.body.classList.toggle('light-theme', theme.value === 'light');
};
</script>

<template>
  <div class="content">
    <aside>
      <SideBar :menuOptions="menuOptions" @select-option="handleSelectOption" />
    </aside>
    <main style="width:100%; overflow-y: auto; padding: 2rem;">
      <n-switch class="theme-switcher" @click="toggleTheme" size="small" v-model:value="active">
        <template #icon>
          🤔
        </template>
      </n-switch>
      
      <div class="music-player" @click="toggleMusic">
        <div :class="['circle', { spinning: isPlaying }]"></div>
      </div>
      <RouterView />
    </main>
  </div>
</template>
<style>
.dark-theme {
  background-color: var(--vt-c-black);
  color: var(--vt-c-text-dark-2);
}

.light-theme {
  background-color: var(--vt-c-white);
  color: var(--vt-c-text-light-1);
}

.content {
  display: flex;
  width: 100%;
  height: 100%;
}
.music-player {
  position: absolute;
  top: 3rem;
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
