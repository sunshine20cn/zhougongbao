<template>
  <div class="page home-page">
    <!-- 顶部 Logo 区 -->
    <header class="home-header">
      <div class="logo-area">
        <h1 class="logo-title serif">周公宝</h1>
        <p class="logo-subtitle">梦里乾坤，AI来解</p>
      </div>
    </header>

    <!-- 主交互区 -->
    <section class="main-interaction">
      <!-- 语音按钮 -->
      <VoiceButton 
        @result="handleVoiceResult"
        @error="handleVoiceError"
      />
      
      <p class="voice-hint">长按按钮，说出你的梦境</p>
      
      <!-- 分隔线 -->
      <div class="divider-or">
        <span class="divider-line"></span>
        <span class="divider-text">或</span>
        <span class="divider-line"></span>
      </div>
      
      <!-- 打字入口 -->
      <button class="btn-secondary write-btn" @click="$router.push('/input')">
        ✍️ 用文字描述梦境
      </button>
    </section>

    <!-- 历史预览 -->
    <section class="history-preview" v-if="store.recentDreams.length > 0">
      <div class="section-header">
        <h2 class="section-title serif">最近解梦</h2>
        <router-link to="/history" class="see-more">查看全部 ›</router-link>
      </div>
      
      <div class="preview-list">
        <HistoryItem
          v-for="item in store.recentDreams"
          :key="item.id"
          :dreamText="item.dream"
          :createdAt="item.createdAt"
          @click="$router.push(`/history/${item.id}`)"
        />
      </div>
    </section>

    <!-- 空状态提示 -->
    <section class="empty-hint" v-else>
      <div class="empty-icon">🌙</div>
      <p class="empty-text">还没有解梦记录</p>
      <p class="empty-sub">按住上方按钮，说出你的第一个梦</p>
    </section>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
import { useDreamStore } from '@/stores/dream.js'
import VoiceButton from '@/components/VoiceButton.vue'
import HistoryItem from '@/components/HistoryItem.vue'
import { showToast } from 'vant'

const router = useRouter()
const store = useDreamStore()

function handleVoiceResult(text) {
  router.push({
    path: '/result',
    query: { dream: text }
  })
}

function handleVoiceError(msg) {
  showToast(msg)
}
</script>

<style scoped>
.home-page {
  display: flex;
  flex-direction: column;
  gap: var(--space-xl);
  padding-top: var(--space-xxl);
}

.home-header {
  text-align: center;
  padding: var(--space-lg) 0;
}

.logo-area {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 6px;
}

.logo-title {
  font-size: 42px;
  font-weight: 700;
  color: var(--color-primary);
  letter-spacing: 8px;
  text-shadow: 2px 2px 0 rgba(45, 90, 74, 0.1);
}

.logo-subtitle {
  font-size: 16px;
  color: var(--color-text-secondary);
  letter-spacing: 2px;
}

.main-interaction {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--space-md);
  padding: var(--space-xl) 0;
}

.voice-hint {
  font-size: 14px;
  color: var(--color-text-secondary);
  text-align: center;
  margin-top: -4px;
}

.divider-or {
  display: flex;
  align-items: center;
  gap: var(--space-md);
  width: 100%;
  max-width: 240px;
  margin: var(--space-xs) 0;
}

.divider-line {
  flex: 1;
  height: 1px;
  background: var(--color-border);
}

.divider-text {
  font-size: 14px;
  color: var(--color-text-secondary);
}

.write-btn {
  max-width: 240px;
  font-size: 16px;
}

.section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: var(--space-md);
}

.section-title {
  font-size: 20px;
  color: var(--color-text);
}

.see-more {
  font-size: 14px;
  color: var(--color-primary);
  text-decoration: none;
}

.preview-list {
  display: flex;
  flex-direction: column;
  gap: var(--space-sm);
}

.empty-hint {
  text-align: center;
  padding: var(--space-xxl) 0;
}

.empty-icon {
  font-size: 64px;
  margin-bottom: var(--space-md);
  opacity: 0.6;
}

.empty-text {
  font-size: 18px;
  font-weight: 600;
  color: var(--color-text);
  margin-bottom: var(--space-xs);
}

.empty-sub {
  font-size: 14px;
  color: var(--color-text-secondary);
}
</style>
