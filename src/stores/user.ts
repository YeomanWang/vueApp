import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', {
  state: () => ({
    user: null,
    token: null as string | null,
  }),
  actions: {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    login(user: any, token: string) {
      this.user = user;
      this.token = token;
      localStorage.setItem('userId', user.id);
      localStorage.setItem('auth_token', token);
    },
    logout() {
      this.user = null;
      this.token = null;
      localStorage.removeItem('auth_token')
    },
  }
})