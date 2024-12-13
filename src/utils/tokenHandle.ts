import { ref } from 'vue';
import {jwtDecode} from 'jwt-decode';
import { useUserStore } from '@/stores/user';

const tokenExpirationTimer = ref<ReturnType<typeof setTimeout> | null>(null);

// 设置 Token 定时器
const setTokenTimer = (expirationTime: number) => {
  const userStore = useUserStore();

  // 清除已有定时器
  if (tokenExpirationTimer.value) {
    clearTimeout(tokenExpirationTimer.value);
  }

  // 设置新定时器
  tokenExpirationTimer.value = setTimeout(() => {
    if (userStore.refreshToken) {
      userStore.refreshAccessToken(); // 刷新 Token
    } else {
      userStore.logout(); // 没有 Refresh Token，直接登出
    }
  }, expirationTime - 60 * 1000); // 提前 1 分钟处理
};

// 初始化 Token 定时器
const initTokenTimer = (token: string | null) => {
  if (token) {
    const decoded = jwtDecode<{ exp: number }>(token); // 解码 Token 获取有效期
    const expirationTime = decoded.exp * 1000 - Date.now();
    if (expirationTime > 0) {
      setTokenTimer(expirationTime);
    }
  }
};

// 清除 Token 定时器
const clearTokenTimer = () => {
  if (tokenExpirationTimer.value) {
    clearTimeout(tokenExpirationTimer.value);
    tokenExpirationTimer.value = null;
  }
};

export { initTokenTimer, clearTokenTimer };
