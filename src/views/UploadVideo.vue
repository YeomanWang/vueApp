<script setup lang="ts">
import { ref } from 'vue';
import type { UploadFileInfo } from 'naive-ui';

const file = ref<File | null>(null);
const chunkSize = 10 * 1024 * 1024; // 10MB
const currentChunk = ref(0);
const totalChunks = ref(0);
const uploading = ref(false);
const paused = ref(false);
const progress = ref(0);
const currentVideoId = ref('');
let worker: Worker | null = null;
type customFile = { file: UploadFileInfo, fileList: Array<UploadFileInfo>, event?: Event };
const handleFileChange = (customFile: customFile) => {
  if (customFile.file.file) {
    const newFile = customFile.file.file;
    const videoId = newFile.name;
    // 判断当前是否有相同的视频正在上传
    if (uploading.value && currentVideoId.value === videoId) {
      alert('This file is already uploading!');
      return;
    }
    currentVideoId.value = videoId;
    // 初始化上传状态
    file.value = newFile;
    totalChunks.value = Math.ceil(file.value.size / chunkSize);
    uploading.value = true;
    currentChunk.value = 0;
    progress.value = 0;
    createWorker();
  }
};

const createWorker = () => {
  const workerScript = `
    let command, file, chunkSize, currentChunk, totalChunks, uploadUrl, userId, paused, uploading, xhr;
    let lastUpdateTime = 0;
    const updateInterval = 2000;
    self.onmessage = async (e) => {
      console.log('Worker received message:', e.data);
      command = e.data.command;
      paused = e.data.paused;
      if(e.data.currentChunk !== undefined) {
        ({ file, chunkSize, currentChunk, totalChunks, uploadUrl, userId, uploading} = e.data);
      }

      if(command === 'upload') {
        uploadChunks();
      } else if (command === 'pause') {
        paused = true;
        xhr.abort();
      } else if (command === 'resume') {
        paused = false;
        uploadChunks();
      } else if (command === 'cancel') {
        paused = false;
        uploading = false;
        currentChunk = 0;
        totalChunks = 0;
        file = null;
        xhr.abort();
      }
    };

    const uploadChunks = () => {
      if (paused || !uploading || !file) return true;
      const start = currentChunk * chunkSize;
      const end = Math.min(start + chunkSize, file.size);
      const chunk = file.slice(start, end);
      const formData = new FormData();
      formData.append('chunk', chunk, file.name);
      formData.append('userId', userId || '');
      formData.append('videoId', file.name);
      formData.append('chunkIndex', currentChunk.toString());
      formData.append('totalChunks', totalChunks.toString());

      xhr = new XMLHttpRequest();
      xhr.open('POST', uploadUrl, true);
      // xhr.setRequestHeader('Content-Type', 'multipart/form-data');

      xhr.onload = function () {
        if (xhr.status === 200 || xhr.status === 201) {
          const currentTime = Date.now();
          currentChunk++;
          const progress = Math.floor((currentChunk / totalChunks) * 100);
          if (currentChunk < totalChunks) {
            console.log('111111', currentChunk, totalChunks);
            uploadChunks();
            if (currentTime - lastUpdateTime >= updateInterval) {
              self.postMessage({ success: true, message: 'Upload in progress', progress});
              lastUpdateTime = currentTime;
            }
          } else {
            if (currentChunk && totalChunks) {
              console.log('2222222', currentChunk, totalChunks);
              uploading = false;
              self.postMessage({ success: true, message: 'Upload complete', progress});
            }
          }
        } else {
          uploading = false;
          self.postMessage({ success: false, message: 'Upload failed' });
        }
      };

      xhr.onerror = function () {
        uploading = false;
        self.postMessage({ success: false, message: 'Upload failed' });
      };

      xhr.send(formData);
    }
  `;

  const blob = new Blob([workerScript], { type: 'application/javascript' });
  worker = new Worker(URL.createObjectURL(blob));
  worker?.postMessage({
    command: 'upload',
    file: file.value,
    chunkSize,
    currentChunk: currentChunk.value,
    totalChunks: totalChunks.value,
    uploadUrl: 'http://127.0.0.1:3000/api/videos/upload',
    userId: localStorage.getItem('userId') || '',
    uploading: uploading.value,
    paused: paused.value,
  });
  worker.onmessage = (e) => {
    if (e.data.success) {
      if(e.data.message === 'Upload complete') {
        uploading.value = false;
        alert('Upload complete');
        cleanupWorker();
      }
      progress.value = e.data.progress;
    }
  };
}

const cleanupWorker = () => {
  worker?.terminate();
  worker = null;
};


const pauseUpload = () => {
  paused.value = true;
  worker?.postMessage({ command: 'pause', paused: paused.value});
  alert('Upload paused');
};

const resumeUpload = () => {
  paused.value = false;
  worker?.postMessage({ command: 'resume', paused: paused.value});
};

const cancelUpload = () => {
  uploading.value = false;
  paused.value = false;
  currentChunk.value = 0;
  progress.value = 0;
  alert('Upload Canceled');
  worker?.postMessage(
    { 
      command: 'cancel', 
      paused: paused.value, 
      uploading: uploading.value , 
      currentChunk: currentChunk.value, 
      progress: progress.value
    });
  cleanupWorker();
};
</script>

<template>
  <div>
    <n-upload
      multiple
      directory-dnd
      :max="5"
      :on-change="handleFileChange"
    >
      <n-upload-dragger>
        <div style="margin-bottom: 12px">
          <n-icon size="48" style="font-style: normal;">
            ⬆️
          </n-icon>
        </div>
        <n-text style="font-size: 16px">
          点击或者拖动文件到该区域来上传
        </n-text>
        <n-p depth="3" style="margin: 8px 0 0 0">
          请不要上传敏感数据，比如你的银行卡号和密码，信用卡号有效期和安全码
        </n-p>
      </n-upload-dragger>
    </n-upload>
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