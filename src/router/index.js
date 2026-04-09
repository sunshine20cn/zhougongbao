/**
 * 梦境3问 - 中老年专用解梦引导流程
 * 设计：每页1问，按钮巨大，大emoji，文字极少
 */

import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
  // 首页：可以选择普通模式或3问模式
  {
    path: '/',
    name: 'Home',
    component: () => import('@/views/HomePage.vue')
  },
  // 梦境3问流程
  {
    path: '/dream/step1',
    name: 'DreamStep1',
    component: () => import('@/views/dream3/AskFeeling.vue')
  },
  {
    path: '/dream/step2',
    name: 'DreamStep2',
    component: () => import('@/views/dream3/AskPerson.vue')
  },
  {
    path: '/dream/step3',
    name: 'DreamStep3',
    component: () => import('@/views/dream3/AskThing.vue')
  },
  {
    path: '/dream/result',
    name: 'DreamResult',
    component: () => import('@/views/dream3/ResultPage.vue')
  },
  // 原有的文字/语音模式
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
  history: createWebHashHistory(),
  routes
})

export default router