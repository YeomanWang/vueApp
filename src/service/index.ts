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

export default apiClient;
