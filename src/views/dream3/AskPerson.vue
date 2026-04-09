<template>
  <div class="page ask-page">
    <!-- 顶部进度 -->
    <div class="progress-bar">
      <div class="progress-step done">✓</div>
      <div class="progress-line done"></div>
      <div class="progress-step active">2</div>
      <div class="progress-line"></div>
      <div class="progress-step">3</div>
    </div>

    <!-- 语音播放按钮 -->
    <button class="speak-btn" @click="speakQuestion">
      <span class="speak-icon">🔊</span>
    </button>

    <!-- 问题标题 -->
    <h1 class="question-title serif">梦里见到谁了？</h1>
    <p class="question-hint">点一个人或动物</p>

    <!-- 选项网格 -->
    <div class="options-grid">
      <button 
        v-for="option in personOptions" 
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
import { useRouter, useRoute } from 'vue-router'
import { speak, isSpeechSynthesisSupported } from '@/utils/speech.js'

const router = useRouter()
const route = useRoute()
const selected = ref(null)

const personOptions = [
  { emoji: '👨‍👩‍👧', label: '家里人', value: 'family' },
  { emoji: '👫', label: '熟人', value: 'acquaintance' },
  { emoji: '👤', label: '陌生人', value: 'stranger' },
  { emoji: '🐶', label: '动物', value: 'animal' },
  { emoji: '👻', label: '鬼', value: 'ghost' },
  { emoji: '😶', label: '就自己', value: 'myself' }
]

function selectOption(value) {
  selected.value = value
}

function goNext() {
  if (!selected.value) return
  router.push({
    path: '/dream/step3',
    query: {
      feeling: route.query.feeling,
      person: selected.value
    }
  })
}

function speakQuestion() {
  if (isSpeechSynthesisSupported()) {
    speak('梦里见到谁了？点一个人或动物')
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

.progress-step.done {
  background: var(--color-primary);
}

.progress-line {
  width: 40px;
  height: 3px;
  background: var(--color-border);
  margin: 0 var(--space-xs);
}

.progress-line.done {
  background: var(--color-primary);
}

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
}

.next-btn:disabled {
  background: var(--color-border);
  cursor: not-allowed;
}
</style>