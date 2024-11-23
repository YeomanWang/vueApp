<script setup lang="ts">
  import { ref } from 'vue';
  import { useRouter } from 'vue-router';
  import { NForm, NFormItem, NInput, NButton, NSpace, NCard } from 'naive-ui';
  import axios from 'axios';

  const router = useRouter();
  const form = ref({
    username: '',
    password: '',
    confirmPassword: '',
    email:'',
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
    confirmPassword: [
      {
        required: true,
        message: '请确认密码',
      },
      {
        validator: (rule: unknown, value: string) => {
          if (value !== form.value.password) {
            return new Error('两次密码不一致');
          }
        },
      },
    ],
    email: [
      {
        required: true,
        message: '请输入邮箱',
      },
      {
        validator: (rule: unknown, value: string) => {
          const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
          if (!emailRegex.test(value)) {
            return new Error('请输入有效的邮箱');
          }
        },
      }
    ]
  };

  const register = async () => {
    try {
      const response = await axios.post('/api/register', form.value, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (response.data.success) {
        alert('注册成功，请登录');
        router.push('/login');  // 注册成功后跳转到登录页面
      } else {
        alert('注册失败');
      }
    } catch (error) {
      console.error('注册错误:', error);
      alert('注册失败');
    }
  };
</script>
  <template>
    <n-space vertical>
      <n-card>
        <template #header>
          <h2>注册</h2>
        </template>
        <n-form :model="form" :rules="rules">
          <n-form-item label="用户名" path="username">
            <n-input v-model:value="form.username" placeholder="请输入用户名" />
          </n-form-item>
          <n-form-item label="邮箱" path="email">
            <n-input v-model:value="form.email" placeholder="请输入有效的邮箱" />
          </n-form-item>
          <n-form-item label="密码" path="password">
            <n-input type="password" v-model:value="form.password" placeholder="请输入密码" />
          </n-form-item>
          <n-form-item label="确认密码" path="confirmPassword">
            <n-input type="password" v-model:value="form.confirmPassword" placeholder="请确认密码" />
          </n-form-item>
          <n-form-item>
            <n-button type="primary" native-type="submit" @click="register">注册</n-button>
          </n-form-item>
        </n-form>
      </n-card>
    </n-space>
  </template>
<style scoped>
h2 {
  text-align: center;
  margin-bottom: 20px;
}
</style>
