import { useUserStore } from '@/stores/user';
import axios from 'axios';

// 创建 Axios 实例
const apiClient = axios.create({
  baseURL: 'http://localhost:3000/api',
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});
axios.defaults.withCredentials = true;
// 请求拦截器：在每个请求中加上 Authorization 头
apiClient.interceptors.request.use(config => {
  const token = localStorage.getItem('auth_token'); // 从 localStorage 获取 token
  if (token) {
    config.headers.Authorization = `Bearer ${token}`; // 添加 Authorization 头
  }
  return config;
}, error => {
  return Promise.reject(error);
});

// 响应拦截器
apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const userStore = useUserStore();
    if (error.response && error.response.status === 401) {
      // 检查是否可以刷新 Token
      if (userStore.refreshToken) {
        try {
          await userStore.refreshAccessToken();
          // 重试原始请求
          const originalRequest = error.config;
          originalRequest.headers.Authorization = `Bearer ${localStorage.getItem('auth_token')}`;
          return apiClient(originalRequest);
        } catch (err) {
          console.error('刷新Token失败:', err);
          userStore.logout();
        }
      } else {
        // Refresh Token 已过期
        userStore.logout();
      }
    }
    return Promise.reject(error);
  }
);

export default apiClient;
