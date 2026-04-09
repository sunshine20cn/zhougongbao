<template>
  <div class="page ask-page">
    <!-- 顶部进度 -->
    <div class="progress-bar">
      <div class="progress-step done">✓</div>
      <div class="progress-line done"></div>
      <div class="progress-step done">✓</div>
      <div class="progress-line done"></div>
      <div class="progress-step active">3</div>
    </div>

    <!-- 语音播放按钮 -->
    <button class="speak-btn" @click="speakQuestion">
      <span class="speak-icon">🔊</span>
    </button>

    <!-- 问题标题 -->
    <h1 class="question-title serif">梦里最奇怪的东西是什么？</h1>
    <p class="question-hint">点一个东西</p>

    <!-- 选项网格 - 12个选项 -->
    <div class="options-grid">
      <button 
        v-for="option in thingOptions" 
        :key="option.value"
        class="option-btn"
        :class="{ selected: selected === option.value }"
        @click="selectOption(option.value)"
      >
        <span class="option-emoji">{{ option.emoji }}</span>
        <span class="option-text">{{ option.label }}</span>
      </button>
    </div>

    <!-- 完成按钮：去补充描述 -->
    <button 
      class="next-btn" 
      :disabled="!selected"
      @click="goToDescribe"
    >
      补充梦境细节
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

const thingOptions = [
  { emoji: '💧', label: '水', value: 'water' },
  { emoji: '🦷', label: '牙掉了', value: 'teeth' },
  { emoji: '📉', label: '掉下去', value: 'fall' },
  { emoji: '🏃', label: '被人追', value: 'chased' },
  { emoji: '📝', label: '考试', value: 'exam' },
  { emoji: '🚗', label: '车出事', value: 'car' },
  { emoji: '👻', label: '见鬼', value: 'ghost' },
  { emoji: '❤️', label: '老相好', value: 'lover' },
  { emoji: '💀', label: '死人', value: 'dead' },
  { emoji: '🐍', label: '蛇', value: 'snake' },
  { emoji: '✈️', label: '飞起来', value: 'fly' },
  { emoji: '🔥', label: '着火', value: 'fire' }
]

function selectOption(value) {
  selected.value = value
}

function goToDescribe() {
  if (!selected.value) return
  
  // 传递3个问题的答案
  router.push({
    path: '/dream/describe',
    query: {
      feeling: route.query.feeling,
      person: route.query.person,
      thing: selected.value
    }
  })
}

function speakQuestion() {
  if (isSpeechSynthesisSupported()) {
    speak('梦里最奇怪的东西是什么？点一个东西')
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
  margin-bottom: var(--space-xl);
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
  font-size: 28px;
  color: var(--color-text);
  text-align: center;
  margin-bottom: var(--space-sm);
  line-height: 1.4;
}

.question-hint {
  font-size: 18px;
  color: var(--color-text-secondary);
  margin-bottom: var(--space-lg);
}

.options-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: var(--space-sm);
  width: 100%;
  max-width: 380px;
  margin-bottom: auto;
}

.option-btn {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 4px;
  padding: var(--space-md) var(--space-xs);
  min-height: 80px;
  background: var(--color-bg-card);
  border: 2px solid var(--color-border);
  border-radius: var(--radius-md);
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
  font-size: 32px;
  line-height: 1;
}

.option-text {
  font-size: 16px;
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