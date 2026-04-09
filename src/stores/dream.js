import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

const STORAGE_KEY = 'zhougongbao_history'

export const useDreamStore = defineStore('dream', () => {
  // ========== 状态 ==========
  const history = ref(loadHistory())
  const currentDream = ref(null)
  const currentResult = ref(null)
  const isLoading = ref(false)

  // ========== 计算属性 ==========
  const recentDreams = computed(() => {
    return [...history.value].reverse().slice(0, 3)
  })

  const totalCount = computed(() => history.value.length)

  // ========== 方法 ==========

  /**
   * 保存一条解梦记录
   */
  function saveDream(dreamText, result) {
    const record = {
      id: Date.now().toString(),
      dream: dreamText,
      result: result,
      createdAt: new Date().toISOString(),
      // 提取关键词作为摘要
      summary: result.slice(0, 60).replace(/[#*]/g, '') + '...'
    }
    history.value.unshift(record)
    persistHistory()
    return record
  }

  /**
   * 获取单条记录
   */
  function getDream(id) {
    return history.value.find(r => r.id === id) || null
  }

  /**
   * 删除记录
   */
  function deleteDream(id) {
    const idx = history.value.findIndex(r => r.id === id)
    if (idx !== -1) {
      history.value.splice(idx, 1)
      persistHistory()
    }
  }

  /**
   * 清空全部历史
   */
  function clearAll() {
    history.value = []
    persistHistory()
  }

  /**
   * 持久化到 localStorage
   */
  function persistHistory() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(history.value))
    } catch (e) {
      console.warn('存储历史记录失败:', e)
    }
  }

  /**
   * 从 localStorage 加载
   */
  function loadHistory() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY)
      if (raw) {
        return JSON.parse(raw)
      }
    } catch (e) {
      console.warn('读取历史记录失败:', e)
    }
    return []
  }

  return {
    history,
    currentDream,
    currentResult,
    isLoading,
    recentDreams,
    totalCount,
    saveDream,
    getDream,
    deleteDream,
    clearAll
  }
})
