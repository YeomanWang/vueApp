<script setup lang="ts">
import { ref } from 'vue';
import axios from 'axios';
import type { CancelTokenSource } from 'axios';

const file = ref<File | null>(null);
const chunkSize = 0.01 * 1024 * 1024; // 0.1MB
const currentChunk = ref(0);
const totalChunks = ref(0);
const uploading = ref(false);
const paused = ref(false);
const progress = ref(0);
let cancelTokenSource: CancelTokenSource | null = null;

const handleFileChange = (event: Event) => {
  const target = event.target as HTMLInputElement;
  if (target.files && target.files[0]) {
    file.value = target.files[0];
    totalChunks.value = Math.ceil(file.value.size / chunkSize);
    uploading.value = true;
    uploadChunk();
  }
};

const uploadChunk = async () => {
  if (paused.value || !uploading.value || !file.value) return;

  const start = currentChunk.value * chunkSize;
  const end = Math.min(start + chunkSize, file.value.size);
  const chunk = file.value.slice(start, end);

  const formData = new FormData();
  formData.append('chunk', chunk, file.value.name);
  formData.append('userId', localStorage.getItem('userId'));
  formData.append('videoId', '1');
  formData.append('chunkIndex', currentChunk.value.toString());
  formData.append('totalChunks', totalChunks.value.toString());

  cancelTokenSource = axios.CancelToken.source();

  try {
    const response = await axios.post('api/videos/upload', formData, {
      cancelToken: cancelTokenSource.token,
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    if (response.status === 200 || response.status === 201) {
      currentChunk.value++;
      progress.value = Math.floor((currentChunk.value / totalChunks.value) * 100);
      if (currentChunk.value < totalChunks.value) {
        uploadChunk();
      } else {
        uploading.value = false;
        alert('Upload complete');
      }
    } else {
      alert('Upload failed');
    }
  } catch (error) {
    if (axios.isCancel(error)) {
      console.log('Upload paused');
    } else {
      alert('Upload failed');
    }
  }
};

const pauseUpload = () => {
  paused.value = true;
  if (cancelTokenSource) {
    cancelTokenSource.cancel('Upload paused');
  }
};

const resumeUpload = () => {
  paused.value = false;
  uploadChunk();
};

const cancelUpload = () => {
  uploading.value = false;
  paused.value = false;
  currentChunk.value = 0;
  progress.value = 0;
  if (cancelTokenSource) {
    cancelTokenSource.cancel('Upload canceled');
  }
};
</script>

<template>
  <div>
    <input type="file" @change="handleFileChange" />
    <div v-if="uploading">
      <progress :value="progress" max="100"></progress>
      <button @click="pauseUpload">Pause</button>
      <button @click="resumeUpload">Resume</button>
      <button @click="cancelUpload">Cancel</button>
    </div>
  </div>
</template>

<style scoped>
progress {
  width: 100%;
  height: 20px;
}
</style>