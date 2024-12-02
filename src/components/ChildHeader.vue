<template>
  <div class="header">
    <div :key="item.key" v-for="item in headers">
      <span
        ><RouterLink :to="{ name: item.value }">{{ item.label }}</RouterLink>
      </span>
    </div>
  </div>
  <n-dropdown
    trigger="click"
    :options="userMenuOptions"
    @select="handleMenuSelect"
  >
    <n-avatar size="medium" round class="mr-10">
      <template #default>
        <span>{{ userName[0].toUpperCase() }}</span>
      </template>
    </n-avatar>
  </n-dropdown>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useMessage} from 'naive-ui'
import apiClient from '../service';
import { useUserStore } from '../stores/user';

export default defineComponent({
  setup() {
    const message = useMessage()
    const router = useRouter()
    const userName = ref('User Name')
    const userStore = useUserStore();
    const userMenuOptions = [
      { label: 'Logout', key: 'logout' },
    ]

    const handleMenuSelect = (key: string) => {
      if (key === 'logout') {
        logout();
        router.push({ name: 'LoginPage' }) // 跳转到登录页面
      }
    }

    const logout = async () => {
      try {
        const response = await apiClient.post('/logout');
        if (response.data.success) {
          userStore.logout();
          message.success('Logged out!');
        } else {
          message.error(response.data.message);
        }
      } catch (error) {
        message.error(error);
      }
    }

    return {
      handleBack() {
        message.info('[onBack]')
      },
      headers: [
        {
          label: '照片墙',
          value: 'dashboard',
          key: '1',
        },
        {
          label: 'personal',
          value: 'personal',
          key: '2',
        },
        {
          label: '上传照片',
          value: 'others',
          key: '3',
        },
      ],
      userName,
      userMenuOptions,
      handleMenuSelect,
    }
  },
})
</script>

<style scoped>
.header {
  width: 100%;
  display: flex;
  justify-content: space-around;
}
.header-item {
  margin-right: 10px;
}
n-avatar {
  cursor: pointer;
}
</style>
