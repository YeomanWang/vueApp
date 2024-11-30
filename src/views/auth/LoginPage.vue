<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { NForm, NFormItem, NInput, NButton, NSpace, NCard } from 'naive-ui';
import axios from 'axios';

const router = useRouter();
const form = ref({
  username: '',
  password: '',
});

const rules = {
  username: [
    {
      required: true,
      message: '请输入用户名',
    },
  ],
  password: [
    {
      required: true,
      message: '请输入密码',
    },
  ],
};

const login = async () => {
  try {
    const response = await axios.post('/api/login', form.value);
    if (response.data.success) {
      // 假设后端返回 token
      localStorage.setItem('auth_token', response.data.token);
      router.push('/');  // 登录成功后跳转到主页面
    } else {
      alert(response.message);
    }
  } catch (error) {
    console.error('登录错误:', error);
    alert(error);
  }
};
</script>
<template>
  <div class="loginPage">
    <n-space vertical>
      <n-card>
        <template #header>
          <h2>登录</h2>
        </template>
        <n-form :model="form" :rules="rules">
          <n-form-item label="用户名" path="username">
            <n-input v-model:value="form.username" placeholder="请输入用户名" />
          </n-form-item>
          <n-form-item label="密码" path="password">
            <n-input type="password" v-model:value="form.password" placeholder="请输入密码" />
          </n-form-item>
          <n-form-item>
            <n-button type="primary" native-type="submit" @click="login">登录</n-button>
          </n-form-item>
        </n-form>
        <div>
          <p>没有账户？ <router-link to="/register">注册</router-link></p>
        </div>
      </n-card>
    </n-space>
  </div>
</template>
<style scoped>
h2 {
  text-align: center;
  margin-bottom: 20px;
}

.loginPage {
  /* display: flex; */
  /* justify-content: center; */
}
</style>