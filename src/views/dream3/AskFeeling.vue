<template>
  <div class="page ask-page">
    <!-- 顶部进度 -->
    <div class="progress-bar">
      <div class="progress-step" :class="{ active: true, done: false }">1</div>
      <div class="progress-line"></div>
      <div class="progress-step">2</div>
      <div class="progress-line"></div>
      <div class="progress-step">3</div>
    </div>

    <!-- 语音播放按钮 -->
    <button class="speak-btn" @click="speakQuestion">
      <span class="speak-icon">🔊</span>
    </button>

    <!-- 问题标题 -->
    <h1 class="question-title serif">醒来心里什么感觉？</h1>
    <p class="question-hint">点一个表情</p>

    <!-- 选项网格 -->
    <div class="options-grid">
      <button 
        v-for="option in feelingOptions" 
        :key="option.value"
        class="option-btn"
        :class="{ selected: selected === option.value }"
        @click="selectOption(option.value)"
      >
        <span class="option-emoji">{{ option.emoji }}</span>
        <span class="option-text">{{ option.label }}</span>
      </button>
    </div>

    <!-- 确认按钮 -->
    <button 
      class="next-btn" 
      :disabled="!selected"
      @click="goNext"
    >
      下一步
    </button>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { speak, isSpeechSynthesisSupported } from '@/utils/speech.js'

const router = useRouter()
const selected = ref(null)

const feelingOptions = [
  { emoji: '😨', label: '害怕', value: 'fear' },
  { emoji: '😠', label: '生气', value: 'angry' },
  { emoji: '😢', label: '难过', value: 'sad' },
  { emoji: '😰', label: '担心', value: 'worry' },
  { emoji: '😊', label: '开心', value: 'happy' },
  { emoji: '🤔', label: '奇怪', value: 'strange' }
]

function selectOption(value) {
  selected.value = value
}

function goNext() {
  if (!selected.value) return
  router.push({
    path: '/dream/step2',
    query: { feeling: selected.value }
  })
}

function speakQuestion() {
  if (isSpeechSynthesisSupported()) {
    speak('醒来心里什么感觉？点一个表情')
  }
}
</script>

<style scoped>
.ask-page {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: var(--space-xl) var(--space-lg);
  min-height: 100vh;
  background: var(--color-bg);
}

/* 进度条 */
.progress-bar {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: var(--space-xxl);
}

.progress-step {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background: var(--color-border);
  color: var(--color-white);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 16px;
  font-weight: 600;
}

.progress-step.active {
  background: var(--color-primary);
}

.progress-line {
  width: 40px;
  height: 3px;
  background: var(--color-border);
  margin: 0 var(--space-xs);
}

/* 语音按钮 */
.speak-btn {
  position: fixed;
  top: var(--space-lg);
  right: var(--space-lg);
  width: 56px;
  height: 56px;
  border-radius: 50%;
  background: var(--color-bg-card);
  border: 2px solid var(--color-primary);
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 28px;
  box-shadow: var(--shadow-md);
  z-index: 10;
}

.speak-btn:active {
  transform: scale(0.95);
}

/* 问题标题 */
.question-title {
  font-size: 32px;
  color: var(--color-text);
  text-align: center;
  margin-bottom: var(--space-sm);
  line-height: 1.4;
}

.question-hint {
  font-size: 18px;
  color: var(--color-text-secondary);
  margin-bottom: var(--space-xl);
}

/* 选项网格 */
.options-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: var(--space-md);
  width: 100%;
  max-width: 360px;
  margin-bottom: auto;
}

.option-btn {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: var(--space-sm);
  padding: var(--space-lg) var(--space-sm);
  min-height: 100px;
  background: var(--color-bg-card);
  border: 2px solid var(--color-border);
  border-radius: var(--radius-lg);
  cursor: pointer;
  transition: all var(--transition-fast);
}

.option-btn:active {
  transform: scale(0.95);
}

.option-btn.selected {
  border-color: var(--color-primary);
  background: var(--color-ink-wash);
}

.option-emoji {
  font-size: 40px;
  line-height: 1;
}

.option-text {
  font-size: 18px;
  font-weight: 600;
  color: var(--color-text);
}

/* 下一步按钮 */
.next-btn {
  width: 100%;
  max-width: 360px;
  height: 64px;
  margin-top: var(--space-xl);
  background: var(--color-primary);
  color: white;
  border: none;
  border-radius: var(--radius-lg);
  font-size: 22px;
  font-weight: 600;
  cursor: pointer;
  transition: all var(--transition-fast);
}

.next-btn:active:not(:disabled) {
  transform: scale(0.98);
  background: var(--color-primary-dark);
}

.next-btn:disabled {
  background: var(--color-border);
  cursor: not-allowed;
}
</style>