import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('@/views/HomePage.vue')
  },
  {
    path: '/input',
    name: 'Input',
    component: () => import('@/views/InputPage.vue')
  },
  {
    path: '/result',
    name: 'Result',
    component: () => import('@/views/ResultPage.vue')
  },
  {
    path: '/history',
    name: 'History',
    component: () => import('@/views/HistoryPage.vue')
  },
  {
    path: '/history/:id',
    name: 'HistoryDetail',
    component: () => import('@/views/HistoryDetailPage.vue')
  }
]

const router = createRouter({
  // Hash 模式，不需要服务器配置路由，所有路由都在 # 后
  history: createWebHashHistory(),
  routes
})

export default router
