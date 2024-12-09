import { createRouter, createWebHistory } from 'vue-router'

const LoginPage = () => import('../views/auth/LoginPage.vue');
const RegisterPage = () => import('../views/auth/RegisterPage.vue');
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'layout',  // 修改为新的组件名
      component: import('../views/LayoutView.vue'),
      meta: { requiresAuth: true },
      children: [
        {
          path: '/dashboard',
          name: 'dashboard',
          component: import('../views/dashboard/HomeView.vue'),
          meta: { requiresAuth: true },
          children: [
            {
              path: 'photos',
              name: 'photo',
              component: () => import('../views/dashboard/PhotoView.vue'),
            },
            {
              path: 'video',
              name: 'videos',
              component: () => import('../views/dashboard/VideoView.vue'),
            },
            {
              path: 'test',
              name: 'test',
              component: () => import('../views/dashboard/sheepView.vue'),
            },
          ]
        },
        {
          path: '', // 默认子路由
          name: 'home',
          component: () => import('../views/dashboard/HomeView.vue'),
        },
        {
          path: '/personal',
          name: 'personal',
          // route level code-splitting
          // this generates a separate chunk (About.[hash].js) for this route
          // which is lazy-loaded when the route is visited.
          component: () => import('../views/AboutView.vue'),
          meta: { requiresAuth: true },
        },
        {
          path: '/upload',
          name: 'upload',
          component: import('../views/UploadView.vue'),
          meta: { requiresAuth: true },
        },
      ]
    },

    //   children: [
    //     {
    //       path: 'profile',
    //       component: () =>import('../views/dashboard/HomeView.vue'),
    //     },
    //     {
    //       path: 'posts',
    //       component: () => import('../views/dashboard/VideoView.vue'),
    //     },
    //     {
    //       path: 'a-wild-sheep-chase',
    //       component: () => import('../views/dashboard/sheepView.vue')
    //     }
    //   ],
      
    // },
    {
      path: '/login',
      name: 'LoginPage',  // 修改为新的组件名
      component: LoginPage,
    },
    {
      path: '/register',
      name: 'Register',
      component: RegisterPage,
    },

    // { path: '/:pathMatch(.*)*', name: 'NotFound', component: NotFound },
    // // 将匹配以 `/user-` 开头的所有内容，并将其放在 `route.params.afterUser` 下
    // { path: '/user-:afterUser(.*)', component: UserGeneric },
  ],
})

router.beforeEach((to, from, next) => {
  // ✅ This will work because the router starts its navigation after
  // the router is installed and pinia will be installed too
  const isAuthenticated = localStorage.getItem('auth_token');
  if (to.meta.requiresAuth && !isAuthenticated) {
    next('/login');
  } else {
    next();
  }
})

export default router
