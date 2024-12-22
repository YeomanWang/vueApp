<script setup lang="ts">
import {lrc} from '../data';
import audioSrc from '../assets/music.mp3';
import {onMounted, ref} from 'vue';
const testAudio = ref<HTMLAudioElement | null>(null);
const result1 = ref<{ time: number; word: string; id: number; active: boolean }[]>([]);
const text = ref<NodeListOf<HTMLElement> | null>(null)
const container = ref<HTMLElement | null>(null)
const ul = ref<HTMLElement | null>(null)
 

const handleTimeUpdate = () => {
  if (testAudio.value) {
    const currentTime = testAudio.value.currentTime;
    const index = findIndex(currentTime);
    result1.value.forEach((item, i) => {
      item.active = i === index;
    });
    setOffset(index);
  }
}
const findIndex = (currentTime: number) => {
  for (let i = 0; i < result1.value.length; i++) {
    if (currentTime < result1.value[i].time) {
      return i - 1;
    }
  }
  return result1.value.length - 1;
}

const setOffset = (index: number) => {
  if(text.value && container.value && ul.value) {
    const liheight = text.value[0].clientHeight;
    const coheight = container.value.clientHeight;
    const maxOffeset = ul.value.clientHeight - coheight;
    let offset = liheight * index + liheight / 2 - coheight/2;
    if(offset < 0) {
      offset = 0;
    }
    if(offset > maxOffeset) {
      offset = maxOffeset
    }
    ul.value.style.transform = `translateY(-${offset}px)`;
    ul.value.style.transition = 'transform 1s';
  }
}

onMounted(() => {
  parseString(lrc);
  
})
/**
 * 
 * @param lrc string data to transform
 * @returns array data
 */
// const result1 = ref(new Array);
const parseString = (str: string) => {
  const result: { time: number; word: string; id: number; active: boolean}[] = [];
  str.split('\n').forEach((item, i) => {
    const obj = {
      id: i,
      time: +item.split(']')[0].substring(1).split(':')[0] * 60 + +item.split(']')[0].substring(1).split(':')[1],
      word: item.split(']')[1],
      active: false
    }; 
    result.push(obj);
  })
  result1.value = result;
  return result;
}

const handleClick = (index: number) => {
  setOffset(index);
  result1.value.forEach((item, i) => {
    item.active = i === index;
  });

  if(testAudio.value) {
      testAudio.value.currentTime = result1.value.find(item => {
        return item.id === index;
      })?.time ?? 0;
  }
}


</script>
<template>
  <div class="about">
    <audio ref="testAudio" class="audio" :controls="true" :src=audioSrc @timeupdate="handleTimeUpdate()"></audio>
    <div ref="container" class="container">
      <ul ref="ul" v-if="result1.length > 0">
        <li ref="text" v-for="item in result1" :key="item.id" :class="{active: item.active}" @click="handleClick(item.id)">
          {{item.word}}
        </li>
      </ul>
    </div>
  </div>
</template>

<style>
  .about {
    min-height: 100vh;
    text-align: center;
    background-color: black;
    color: #999;

    .audio {
      width: 500px;
      margin: 10px 0;
    }

    .container {
      height: 420px;
      overflow: hidden;
    }

    ul li {
      list-style: none;
      transition: transform 1s;
    }

    .active {
      color: white;
      transform: scale(1.5);
    }
  }
</style>
