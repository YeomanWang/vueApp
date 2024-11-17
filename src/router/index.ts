import { createRouter, createWebHistory } from 'vue-router'
import { useCounterStore } from '../stores/counter';
import HomeView from '../views/HomeView.vue'
import VideoView from '../views/VideoView.vue'
import sheepView from '../views/sheepView.vue'
import othersView from '../views/othersView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/dashboard',
      name: 'dashboard',
      children: [
        {
          path: 'profile',
          component: HomeView,
        },
        {
          path: 'posts',
          component: VideoView,
        },
        {
          path: 'a-wild-sheep-chase',
          component: sheepView
        }
      ]
    },
    {
      path: '/personal',
      name: 'personal',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue'),
    },
    {
      path: '/others',
      name: 'others',
      component: othersView,
    },
    // { path: '/:pathMatch(.*)*', name: 'NotFound', component: NotFound },
    // // 将匹配以 `/user-` 开头的所有内容，并将其放在 `route.params.afterUser` 下
    // { path: '/user-:afterUser(.*)', component: UserGeneric },
  ],
})

router.beforeEach((to) => {
  // ✅ This will work because the router starts its navigation after
  // the router is installed and pinia will be installed too
  const store = useCounterStore()

  if (to.meta.requiresAuth && !store) return '/login'
})

export default router
