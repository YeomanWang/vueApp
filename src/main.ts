import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import naive from "naive-ui";

import App from './App.vue'
import router from './router'
import { initTokenTimer } from './utils/tokenHandle';
import { useUserStore } from '@/stores/user';

const app = createApp(App)

const pinia = createPinia();
app.use(naive);
app.use(router)

app.mount('#app')
app.use(pinia)
const userStore = useUserStore();
if (userStore.token) {
  initTokenTimer(userStore.token);
}

