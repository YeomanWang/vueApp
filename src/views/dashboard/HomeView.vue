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

</style>
