import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'home',
    meta: {
      title: '首页',
      keepAlive: true,
      requireAuth: true
    },
    component: () => import('@/pages/home/index.vue'),
  },
  {
    path: '/barkpush',
    name: 'barkpush',
    meta: {
      title: 'Bark推送',
      keepAlive: true,
      requireAuth: true
    },
    component: () => import('@/pages/barkpush/barkpush.vue'),
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});
export default router;
