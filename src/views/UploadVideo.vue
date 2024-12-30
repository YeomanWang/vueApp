<script setup lang="ts">
import { ref } from 'vue';
import axios from 'axios';
import type { CancelTokenSource } from 'axios';
import type { UploadFileInfo } from 'naive-ui';

const file = ref<File | null>(null);
const chunkSize = 0.01 * 1024 * 1024; // 0.1MB
const currentChunk = ref(0);
const totalChunks = ref(0);
const uploading = ref(false);
const paused = ref(false);
const progress = ref(0);
const currentVideoId = ref('');
let cancelTokenSource: CancelTokenSource | null = null;
type customFile = { file: UploadFileInfo, fileList: Array<UploadFileInfo>, event?: Event };
const handleFileChange = (customFile: customFile) => {
  if (customFile.file.file) {
    // file.value = customFile.file.file;
    // totalChunks.value = Math.ceil(file.value.size / chunkSize);
    // uploading.value = true;
    // uploadChunk();
    const newFile = customFile.file.file;
    const videoId = newFile.name; // 假设文件名作为 videoId

    // 判断当前是否有相同的视频正在上传
    if (uploading.value && currentVideoId.value === videoId) {
      alert('This file is already uploading!');
      return;
    }

    // 更新当前上传的视频 ID
    currentVideoId.value = videoId;

    // 初始化上传状态
    file.value = newFile;
    totalChunks.value = Math.ceil(file.value.size / chunkSize);
    uploading.value = true;
    currentChunk.value = 0;
    progress.value = 0;
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
  formData.append('userId', localStorage.getItem('userId') || '');
  formData.append('videoId', file.value.name);
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
      console.log(error.message);
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