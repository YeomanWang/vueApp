<template>
  <div class="upload-container">
    <div class="header">
      <h1>照片上传记录</h1>
      <p>记录小朋友的成长每一天</p>
    </div>
    <n-form :model="form" :rules="rules" ref="formRef" label-width="80px" class="form-card">
      <!-- <n-form-item label="姓名" path="name">
        <n-input v-model:value="form.name" placeholder="请输入姓名" />
      </n-form-item> -->
      <n-form-item label="年龄" path="age">
        <n-input-number v-model:value="form.age" :min="0" :max="120" placeholder="请输入年龄" />
      </n-form-item>
      <n-form-item label="照片" path="file">
        <n-upload
          accept=".jpg,.png"
          v-model:file-list="form.file"
          list-type="image-card"
          :on-remove="handleRemove"
          :on-change="handleChange"
          :on-before-upload="beforeUpload"
        >
        </n-upload>
        <!-- <span v-if="fileList.length > 0">{{ fileList[0]?.name }}</span> -->
      </n-form-item>
      <n-form-item>
        <n-button type="success" @click="handleSubmit" size="large">上传</n-button>
      </n-form-item>
    </n-form>
    <div class="footer">
      <img src="https://i.imgur.com/tPZLKlG.png" alt="Cute Icon" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { NForm, NFormItem, NInputNumber, NUpload, NButton, useMessage } from 'naive-ui';
import axios from 'axios';
const form = ref({
  name: '',
  age: null,
  file: [],
});

const fileList = ref<File[]>([]);

const rules = {
  name: {
    required: true,
    message: '姓名不能为空',
    trigger: 'blur',
  },
  age: {
    required: true,
    message: '年龄不能为空',
    trigger: 'blur',
    type: 'number',
  },
  file: {
    validator: (_, value) => {
      if (Array.isArray(value) && value.length > 0) {
        return Promise.resolve();
      }
      return Promise.reject(new Error('请上传至少一张照片'));
    },
    trigger: 'change',
  },
};

const message = useMessage();
const formRef = ref();

const beforeUpload = (file: File) => {
  const isValidType = ['image/jpeg', 'image/jpg', 'image/png'].includes(file.file.type);
  if (!isValidType) {
    message.error('只能上传 JPG 或 PNG 文件!');
    return false;
  }
  return true;
};

const handleChange = (files: File[]) => {
  fileList.value = files.fileList;
  form.value.file = files;
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const handleRemove = (file: File) => {
  const index = fileList.value.findIndex(item => item.id === file.id); 
  if (index > -1) {
    fileList.value.splice(index, 1); // 从 fileList 中移除该文件
    form.value.file.splice(index, 1);
  }
};

const handleSubmit = () => {
  formRef.value
    .validate()
    .then(() => {
      message.success('表单验证通过，提交成功！');
      uploadPhoto();
    })
    .catch((errors) => {
      console.error('表单验证失败：', errors);
      message.error('请正确填写表单');
    });
};

const uploadPhoto = async () => {
  const formData = new FormData();
  formData.append('age', form.value.age.toString());
  formData.append('userId', localStorage.getItem('userId'));
  form.value.file.forEach((file) => {
    formData.append(`photos`, file.file as File);
  });
  try {
    const response = await axios.post('api/photos/upload', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    if (response.data.success) {
      message.success('上传成功!');
    } else {
      message.error('上传失败，请稍后再试');
    }
  } catch (error) {
    console.error('上传失败:', error);
    message.error('上传失败，请检查网络连接');
  }
};
</script>

<style scoped>
.upload-container {
  max-width: 700px;
  margin: 0 auto;
  padding: 30px;
  background: linear-gradient(to bottom, #fdfbfb, #ebedee);
  border-radius: 12px;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
  text-align: center;
  position: relative;
}

.header h1 {
  font-family: 'Comic Sans MS', cursive, sans-serif;
  font-size: 2rem;
  color: #4b8bd4;
  margin-bottom: 10px;
}

.header p {
  font-size: 1rem;
  color: #666;
  margin-bottom: 20px;
}

.form-card {
  background: #fff;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.footer img {
  width: 100px;
  margin-top: 20px;
  animation: bounce 2s infinite;
}

@keyframes bounce {
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-10px);
  }
}

.n-button {
  font-size: 1.2rem;
  padding: 10px 20px;
}

.n-button-primary {
  background-color: #ffab40;
  color: white;
}

.n-button-success {
  background-color: #4caf50;
  color: white;
}
</style>
