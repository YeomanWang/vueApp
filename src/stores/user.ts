import { defineStore } from 'pinia'
import { useRouter } from 'vue-router';
import axios from 'axios';
import { clearTokenTimer } from '../utils/tokenHandle';

export const useUserStore = defineStore('user', {
  state: () => ({
    user: null,
    token: null as string | null,
    refreshToken: '',
  }),
  actions: {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    login(user: any, token: string, refreshToken: string) {
      this.user = user;
      this.token = token;
      this.refreshToken = refreshToken;

      localStorage.setItem('userId', user.id);
      localStorage.setItem('auth_token', token);
      localStorage.setItem('refreshToken', refreshToken);
    },
    logout() {
      this.user = null;
      this.token = null;
      this.refreshToken = '';
      localStorage.removeItem('auth_token');
      localStorage.removeItem('refreshToken');
      clearTokenTimer();
      const router = useRouter();
      router.push('/login');
    },
    async refreshAccessToken() {
      try {
        const response = await axios.post('/api/refresh-token', {
          refreshToken: this.refreshToken,
        });
        if (response.data.success) {
          localStorage.setItem('auth_token', response.data.token);
        } else {
          this.logout();
        }
      } catch (error) {
        console.error('刷新Token失败:', error);
        this.logout();
      }
    },
  }
})