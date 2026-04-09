<template>
  <div class="page detail-page">
    <!-- 顶部 -->
    <header class="page-header">
      <button class="back-btn" @click="$router.back()">‹ 返回</button>
      <h1 class="page-title serif">解梦详情</h1>
      <button class="delete-btn" @click="handleDelete">🗑️</button>
    </header>

    <!-- 加载状态 -->
    <div class="loading-state" v-if="loading">
      <div class="taiji-icon taiji-loading">☯️</div>
    </div>

    <!-- 内容 -->
    <div v-else-if="record">
      <!-- 原始梦境 -->
      <div class="dream-quote card-paper">
        <p class="quote-label">💭 你梦到的</p>
        <p class="quote-text">{{ record.dream }}</p>
      </div>

      <!-- 结果卡片 -->
      <ResultCard :content="record.result" />

      <!-- 时间 -->
      <p class="record-time">{{ formatDate(record.createdAt) }}</p>

      <!-- 操作 -->
      <div class="action-buttons">
        <button 
          class="btn-speak"
          :class="{ speaking: isSpeaking }"
          @click="toggleSpeak"
        >
          {{ isSpeaking ? '🔇 停止朗读' : '🔊 朗读结果' }}
        </button>
        
        <button class="btn-secondary" @click="handleReDream">
          🔮 再次解梦
        </button>
        
        <button class="btn-link" @click="$router.push('/history')">
          ‹ 返回历史记录
        </button>
      </div>
    </div>

    <!-- 未找到 -->
    <div class="not-found" v-else>
      <p>该记录不存在或已删除</p>
      <button class="btn-primary" style="max-width: 200px;" @click="$router.push('/history')">
        返回历史
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useDreamStore } from '@/stores/dream.js'
import ResultCard from '@/components/ResultCard.vue'
import { speak, stopSpeaking, isSpeechSynthesisSupported } from '@/utils/speech.js'
import { Dialog, showToast } from 'vant'

const route = useRoute()
const router = useRouter()
const store = useDreamStore()

const record = ref(null)
const loading = ref(true)
const isSpeaking = ref(false)

function formatDate(isoString) {
  const date = new Date(isoString)
  return `${date.getFullYear()}年${date.getMonth() + 1}月${date.getDate()}日 ${date.getHours()}:${String(date.getMinutes()).padStart(2, '0')}`
}

onMounted(() => {
  const id = route.params.id
  record.value = store.getDream(id)
  loading.value = false
})

async function toggleSpeak() {
  if (isSpeaking.value) {
    stopSpeaking()
    isSpeaking.value = false
    return
  }
  if (!isSpeechSynthesisSupported()) {
    showToast('浏览器不支持朗读')
    return
  }
  const plain = record.value.result.replace(/[#*_~`\n{3,}]/g, (m) => m === '\n\n\n' ? '\n\n' : '')
  isSpeaking.value = true
  try {
    await speak(plain)
  } catch {
    showToast('朗读失败')
  } finally {
    isSpeaking.value = false
  }
}

function handleReDream() {
  router.push({
    path: '/result',
    query: { dream: record.value.dream }
  })
}

function handleDelete() {
  Dialog.confirm({
    title: '删除记录',
    message: '确定删除这条解梦记录？',
    confirmButtonText: '删除',
    confirmButtonColor: '#C0392B',
    cancelButtonText: '取消',
  }).then(() => {
    store.deleteDream(route.params.id)
    showToast('已删除')
    router.push('/history')
  }).catch(() => {})
}

onUnmounted(() => {
  stopSpeaking()
})
</script>

<style scoped>
.detail-page {
  display: flex;
  flex-direction: column;
  gap: var(--space-xl);
}

.page-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.back-btn {
  background: none;
  border: none;
  font-size: 18px;
  color: var(--color-primary);
  cursor: pointer;
  padding: 8px;
  margin-left: -8px;
}

.page-title {
  font-size: 20px;
  font-weight: 600;
}

.delete-btn {
  background: none;
  border: none;
  font-size: 20px;
  cursor: pointer;
  padding: 8px;
  opacity: 0.5;
  transition: opacity var(--transition-fast);
}

.delete-btn:hover {
  opacity: 1;
}

.loading-state {
  display: flex;
  justify-content: center;
  padding: var(--space-xxl);
}

.taiji-icon {
  font-size: 48px;
}

.dream-quote {
  padding: var(--space-lg);
  border-left: 4px solid var(--color-accent);
  border-radius: var(--radius-md);
}

.quote-label {
  font-size: 13px;
  color: var(--color-accent);
  margin-bottom: 6px;
  font-weight: 600;
}

.quote-text {
  font-size: 17px;
  line-height: 1.7;
  color: var(--color-text);
}

.record-time {
  font-size: 13px;
  color: var(--color-text-secondary);
  text-align: center;
}

.action-buttons {
  display: flex;
  flex-direction: column;
  gap: var(--space-md);
}

.btn-speak {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: var(--space-sm);
  width: 100%;
  height: 56px;
  background: var(--color-bg-card);
  color: var(--color-primary);
  border: 2px solid var(--color-primary);
  border-radius: var(--radius-md);
  font-size: 18px;
  font-weight: 600;
  cursor: pointer;
  transition: all var(--transition-fast);
}

.btn-speak:active,
.btn-speak.speaking {
  background: var(--color-primary);
  color: white;
}

.btn-link {
  background: none;
  border: none;
  color: var(--color-primary);
  font-size: 16px;
  cursor: pointer;
  padding: var(--space-sm);
  text-align: center;
}

.not-found {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--space-lg);
  padding: var(--space-xxl) 0;
  text-align: center;
  color: var(--color-text-secondary);
}
</style>
