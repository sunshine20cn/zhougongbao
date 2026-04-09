<template>
  <div class="page result-page">
    <!-- 顶部 -->
    <header class="page-header">
      <button class="back-btn" @click="$router.back()">‹ 返回</button>
      <h1 class="page-title serif">解梦结果</h1>
      <div style="width: 50px;"></div>
    </header>

    <!-- 加载状态 -->
    <div class="loading-state" v-if="isLoading">
      <div class="taiji-icon taiji-loading">☯️</div>
      <p class="loading-text">周公正在解梦...</p>
      <p class="loading-sub">请稍候</p>
    </div>

    <!-- 结果展示 -->
    <div v-else-if="result">
      <!-- 原始梦境 -->
      <div class="dream-quote card-paper">
        <p class="quote-label">💭 你梦到的</p>
        <p class="quote-text">{{ dreamText }}</p>
      </div>

      <!-- 结果卡片 -->
      <ResultCard :content="result" />

      <!-- 操作按钮 -->
      <div class="action-buttons">
        <button 
          v-if="speechSupported"
          class="btn-speak"
          :class="{ speaking: isSpeaking }"
          @click="toggleSpeak"
        >
          {{ isSpeaking ? '🔇 停止朗读' : '🔊 朗读结果' }}
        </button>
        <p v-else class="no-speech-hint">💡 在手机浏览器中打开可使用朗读功能</p>
        
        <button class="btn-secondary" @click="handleReDream">
          💭 重新解梦
        </button>
        
        <button class="btn-link" @click="$router.push('/')">
          🏠 返回首页
        </button>
      </div>
    </div>

    <!-- 错误状态 -->
    <div class="error-state" v-else-if="error">
      <div class="error-icon">😔</div>
      <p class="error-text">{{ error }}</p>
      <button class="btn-primary" @click="handleReDream">再试一次</button>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useDreamStore } from '@/stores/dream.js'
import ResultCard from '@/components/ResultCard.vue'
import { speak, stopSpeaking, isSpeechSynthesisSupported } from '@/utils/speech.js'
import { interpretDream } from '@/utils/ai.js'
import { showToast } from 'vant'

const route = useRoute()
const router = useRouter()
const store = useDreamStore()

const dreamText = ref('')
const result = ref('')
const isLoading = ref(true)
const error = ref('')
const isSpeaking = ref(false)
const speechSupported = ref(true)

onMounted(async () => {
  // 检查语音播报支持
  speechSupported.value = isSpeechSynthesisSupported()
  
  const text = route.query.dream || ''
  if (!text) {
    router.replace('/')
    return
  }
  
  dreamText.value = text
  isLoading.value = true
  error.value = ''
  
  try {
    result.value = await interpretDream(text)
    // 保存到历史
    store.saveDream(text, result.value)
  } catch (e) {
    console.error('解梦失败:', e)
    error.value = '解读失败，请稍后再试'
    showToast('解读失败，请重试')
  } finally {
    isLoading.value = false
  }
})

async function toggleSpeak() {
  if (isSpeaking.value) {
    stopSpeaking()
    isSpeaking.value = false
    return
  }
  
  if (!isSpeechSynthesisSupported()) {
    showToast('当前浏览器不支持朗读功能')
    return
  }
  
  const plainText = result.value
    .replace(/[#*_~`]/g, '')
    .replace(/\n{3,}/g, '\n\n')
  
  isSpeaking.value = true
  try {
    await speak(plainText)
  } catch (e) {
    showToast('朗读失败')
  } finally {
    isSpeaking.value = false
  }
}

function handleReDream() {
  router.replace({
    path: '/input',
    query: { dream: dreamText.value }
  })
}

onUnmounted(() => {
  stopSpeaking()
})
</script>

<style scoped>
.result-page {
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

.loading-state {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: var(--space-md);
  padding: var(--space-xxl) 0;
}

.taiji-icon {
  font-size: 64px;
  filter: drop-shadow(0 4px 8px rgba(45, 90, 74, 0.2));
}

.loading-text {
  font-size: 18px;
  font-weight: 600;
  color: var(--color-text);
}

.loading-sub {
  font-size: 14px;
  color: var(--color-text-secondary);
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
  text-decoration: underline;
  text-underline-offset: 3px;
}

.no-speech-hint {
  font-size: 14px;
  color: var(--color-text-secondary);
  text-align: center;
  padding: var(--space-md);
  background: var(--color-bg-card);
  border-radius: var(--radius-md);
  border: 1px dashed var(--color-border);
}

.error-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--space-lg);
  padding: var(--space-xxl) 0;
  text-align: center;
}

.error-icon {
  font-size: 64px;
}

.error-text {
  font-size: 16px;
  color: var(--color-text-secondary);
}
</style>
