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
      <!-- 梦境3问入口 - 新功能 -->
      <button class="dream3-btn" @click="$router.push('/dream/step1')">
        <span class="dream3-icon">🔮</span>
        <span class="dream3-text">梦境3问</span>
        <span class="dream3-hint">中老年专属</span>
      </button>
      
      <p class="voice-hint">简单3步，AI智能解梦</p>
      
      <!-- 分隔线 -->
      <div class="divider-or">
        <span class="divider-line"></span>
        <span class="divider-text">或</span>
        <span class="divider-line"></span>
      </div>
      
      <!-- 原有的语音/打字入口 -->
      <div class="old-mode">
        <!-- 语音按钮 -->
        <VoiceButton 
          @result="handleVoiceResult"
          @error="handleVoiceError"
        />
        
        <p class="voice-hint2">长按按钮，说出你的梦境</p>
        
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
      </div>
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
          :id="item.id"
          :dreamText="item.dream"
          :createdAt="item.createdAt"
          @deleted="handleDeleteHistory"
        />
      </div>
    </section>

    <!-- 空状态提示 -->
    <section class="empty-hint" v-else>
      <div class="empty-icon">🌙</div>
      <p class="empty-text">还没有解梦记录</p>
      <p class="empty-sub">点击上方"梦境3问"开始第一次解梦</p>
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

function handleDeleteHistory(id) {
  store.deleteDream(id)
  showToast('已删除')
}
</script>

<style scoped>
.home-page {
  display: flex;
  flex-direction: column;
  gap: var(--space-lg);
  padding-top: var(--space-lg);
  padding-bottom: var(--space-xxl);
}

.home-header {
  text-align: center;
  padding: var(--space-sm) 0;
}

.logo-area {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
}

.logo-title {
  font-size: 36px;
  font-weight: 700;
  color: var(--color-primary);
  letter-spacing: 6px;
}

.logo-subtitle {
  font-size: 14px;
  color: var(--color-text-secondary);
}

.main-interaction {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--space-sm);
  padding: var(--space-md) 0;
}

/* 梦境3问按钮 - 醒目突出 */
.dream3-btn {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 180px;
  height: 140px;
  background: linear-gradient(145deg, #3a7a64, var(--color-primary));
  border: none;
  border-radius: var(--radius-lg);
  cursor: pointer;
  box-shadow: 0 8px 24px rgba(45, 90, 74, 0.3);
  transition: all var(--transition-fast);
}

.dream3-btn:active {
  transform: scale(0.97);
}

.dream3-icon {
  font-size: 48px;
  margin-bottom: var(--space-xs);
}

.dream3-text {
  font-size: 22px;
  font-weight: 700;
  color: white;
  letter-spacing: 2px;
}

.dream3-hint {
  font-size: 12px;
  color: rgba(255,255,255,0.8);
  margin-top: 4px;
}

.voice-hint {
  font-size: 14px;
  color: var(--color-text-secondary);
  text-align: center;
  margin-bottom: var(--space-sm);
}

/* 旧模式 */
.old-mode {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--space-sm);
  width: 100%;
}

.voice-hint2 {
  font-size: 13px;
  color: var(--color-text-secondary);
  text-align: center;
}

.divider-or {
  display: flex;
  align-items: center;
  gap: var(--space-md);
  width: 100%;
  max-width: 220px;
  margin: var(--space-xs) 0;
}

.divider-line {
  flex: 1;
  height: 1px;
  background: var(--color-border);
}

.divider-text {
  font-size: 12px;
  color: var(--color-text-secondary);
}

.write-btn {
  max-width: 220px;
  font-size: 15px;
  height: 48px;
}

.section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 var(--space-lg);
}

.section-title {
  font-size: 18px;
  color: var(--color-text);
}

.see-more {
  font-size: 13px;
  color: var(--color-primary);
  text-decoration: none;
}

.preview-list {
  display: flex;
  flex-direction: column;
  gap: var(--space-xs);
  padding: 0 var(--space-lg);
}

.empty-hint {
  text-align: center;
  padding: var(--space-xl) 0;
}

.empty-icon {
  font-size: 56px;
  margin-bottom: var(--space-sm);
  opacity: 0.6;
}

.empty-text {
  font-size: 16px;
  font-weight: 600;
  color: var(--color-text);
  margin-bottom: var(--space-xs);
}

.empty-sub {
  font-size: 13px;
  color: var(--color-text-secondary);
}
</style>