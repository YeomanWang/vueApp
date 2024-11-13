<script setup lang="ts">
  import {ref, onMounted} from 'vue'
    const myVideo = ref<HTMLVideoElement | null>(null)
    onMounted(() => {
      console.log(myVideo.value);
    })

    const play = () => {
      if(myVideo.value) {
        myVideo.value.play()
      }
    }

    const pause = () => {
      if(myVideo.value) {
        myVideo.value.pause()
      }
    }
</script>
<template>
  <div id="playwindow">
    <div id="fullback">
      <div id="playbox">
        <div id="videobox">
          <video ref="myVideo" src="../../11.mp4" width="600" height="600"></video>
        </div>
        <div id="progress">
          <div id="now"></div>
        </div>
        <div id="consoles">
          <div id="group1"></div>
          <div id="group2"></div>
        </div>
      </div>
    </div>
    <aside id="maside"></aside>
  </div>
  
  <input type="button" value="play" @click="play"/>
  <input type="button" value="pause" @click="pause"/>
</template>