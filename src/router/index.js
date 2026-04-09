import { createRouter, createWebHistory } from 'vue-router'

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
  history: createWebHistory(),
  routes
})

export default router
