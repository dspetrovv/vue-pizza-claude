import { createRouter, createWebHistory } from 'vue-router'

const TOKEN_KEY = 'auth_token'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('@/pages/HomePage.vue'),
    },
    {
      path: '/order',
      name: 'order',
      component: () => import('@/pages/OrderPage.vue'),
    },
    {
      path: '/order-success',
      name: 'order-success',
      component: () => import('@/pages/OrderSuccessPage.vue'),
    },
    {
      path: '/account',
      name: 'account',
      component: () => import('@/pages/AccountPage.vue'),
      meta: { requiresAuth: true },
    },
  ],
  scrollBehavior(_to, _from, savedPosition) {
    return savedPosition ?? { top: 0 }
  },
})

router.beforeEach((to) => {
  if (to.meta.requiresAuth && !localStorage.getItem(TOKEN_KEY)) {
    return { name: 'home' }
  }
})

export default router
