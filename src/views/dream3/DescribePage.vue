<template>
  <div class="page describe-page">
    <!-- 顶部进度 -->
    <div class="progress-bar">
      <div class="progress-step done">✓</div>
      <div class="progress-line done"></div>
      <div class="progress-step done">✓</div>
      <div class="progress-line done"></div>
      <div class="progress-step done">✓</div>
      <div class="progress-line"></div>
      <div class="progress-step active">📝</div>
    </div>

    <!-- 汇总已选答案 -->
    <div class="summary-card">
      <p class="summary-title">你已选择：</p>
      <div class="summary-tags">
        <span class="tag">😌 {{ feelingLabel }}</span>
        <span class="tag">👤 {{ personLabel }}</span>
        <span class="tag">{{ thingEmoji }} {{ thingLabel }}</span>
      </div>
    </div>

    <!-- 问题标题 -->
    <h1 class="question-title serif">还有什么想补充的吗？</h1>
    <p class="question-hint">可以说说梦里的具体情况</p>

    <!-- 语音输入按钮 -->
    <div class="voice-section">
      <VoiceButton 
        @result="handleVoiceResult"
        @error="handleVoiceError"
      />
      <p class="voice-hint">长按说出更多细节</p>
    </div>

    <!-- 或分隔 -->
    <div class="divider-or">
      <span class="divider-line"></span>
      <span class="divider-text">或</span>
      <span class="divider-line"></span>
    </div>

    <!-- 文字输入 -->
    <textarea
      v-model="extraDescription"
      class="extra-input"
      placeholder="在这里补充更多细节..."
      maxlength="200"
    ></textarea>
    <p class="char-count">{{ extraDescription.length }}/200</p>

    <!-- 开始解梦按钮 -->
    <button 
      class="next-btn"
      :disabled="!canSubmit"
      @click="startInterpret"
    >
      🔮 开始解梦
    </button>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import VoiceButton from '@/components/VoiceButton.vue'
import { useDreamStore } from '@/stores/dream.js'
import { interpretDream } from '@/utils/ai.js'
import { showToast } from 'vant'

const router = useRouter()
const route = useRoute()
const store = useDreamStore()

const extraDescription = ref('')

// 选项映射
const feelingMap = {
  'fear': '害怕',
  'angry': '生气',
  'sad': '难过',
  'worry': '担心',
  'happy': '开心',
  'strange': '奇怪'
}

const personMap = {
  'family': '家里人',
  'acquaintance': '熟人',
  'stranger': '陌生人',
  'animal': '动物',
  'ghost': '鬼',
  'myself': '就自己'
}

const thingMap = {
  'water': { label: '水', emoji: '💧' },
  'teeth': { label: '牙掉了', emoji: '🦷' },
  'fall': { label: '掉下去', emoji: '📉' },
  'chased': { label: '被人追', emoji: '🏃' },
  'exam': { label: '考试', emoji: '📝' },
  'car': { label: '车出事', emoji: '🚗' },
  'ghost': { label: '见鬼', emoji: '👻' },
  'lover': { label: '老相好', emoji: '❤️' },
  'dead': { label: '死人', emoji: '💀' },
  'snake': { label: '蛇', emoji: '🐍' },
  'fly': { label: '飞起来', emoji: '✈️' },
  'fire': { label: '着火', emoji: '🔥' }
}

// 显示标签
const feelingLabel = computed(() => feelingMap[route.query.feeling] || '')
const personLabel = computed(() => personMap[route.query.person] || '')
const thingLabel = computed(() => thingMap[route.query.thing]?.label || '')
const thingEmoji = computed(() => thingMap[route.query.thing]?.emoji || '')

// 是否可以提交（必须有3个问题的答案）
const canSubmit = computed(() => {
  return route.query.feeling && route.query.person && route.query.thing
})

function handleVoiceResult(text) {
  extraDescription.value = text
}

function handleVoiceError(msg) {
  showToast(msg)
}

async function startInterpret() {
  if (!canSubmit.value) {
    showToast('请先完成3个问题')
    return
  }

  // 构建完整的梦境描述
  const dreamText = buildDreamDescription()
  
  // 跳转到结果页
  router.push({
    path: '/dream/result',
    query: { dream: dreamText }
  })
}

function buildDreamDescription() {
  const feeling = route.query.feeling || ''
  const person = route.query.person || ''
  const thing = route.query.thing || ''
  const extra = extraDescription.value.trim()
  
  let desc = ''
  
  // 添加3问的答案
  if (feelingMap[feeling]) {
    desc += `我醒来时心里${feelingMap[feeling]}，`
  }
  if (personMap[person]) {
    desc += `梦里见到了${personMap[person]}，`
  }
  if (thingMap[thing]) {
    desc += `最奇怪的${thingMap[thing].label}。`
  }
  
  // 添加额外描述
  if (extra) {
    desc += `\n\n另外：${extra}`
  }
  
  return desc
}

onMounted(() => {
  // 如果没有3问答案，跳回第1问
  if (!route.query.feeling || !route.query.person || !route.query.thing) {
    router.replace('/dream/step1')
  }
})
</script>

<style scoped>
.describe-page {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: var(--space-lg);
  min-height: 100vh;
  background: var(--color-bg);
}

.progress-bar {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: var(--space-lg);
  gap: 4px;
}

.progress-step {
  width: 28px;
  height: 28px;
  border-radius: 50%;
  background: var(--color-border);
  color: var(--color-white);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  font-weight: 600;
}

.progress-step.active {
  background: var(--color-primary);
}

.progress-step.done {
  background: var(--color-primary);
}

.progress-line {
  width: 20px;
  height: 2px;
  background: var(--color-border);
}

.progress-line.done {
  background: var(--color-primary);
}

.summary-card {
  width: 100%;
  max-width: 360px;
  background: var(--color-bg-card);
  border-radius: var(--radius-md);
  padding: var(--space-md);
  margin-bottom: var(--space-lg);
  border: 1px solid var(--color-border-light);
}

.summary-title {
  font-size: 14px;
  color: var(--color-text-secondary);
  margin-bottom: var(--space-sm);
}

.summary-tags {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-sm);
}

.tag {
  font-size: 14px;
  padding: 4px 10px;
  background: var(--color-ink-wash);
  border-radius: var(--radius-sm);
  color: var(--color-primary);
  font-weight: 500;
}

.question-title {
  font-size: 24px;
  color: var(--color-text);
  text-align: center;
  margin-bottom: var(--space-xs);
}

.question-hint {
  font-size: 16px;
  color: var(--color-text-secondary);
  margin-bottom: var(--space-lg);
}

.voice-section {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: var(--space-lg);
}

.voice-hint {
  font-size: 14px;
  color: var(--color-text-secondary);
  margin-top: var(--space-sm);
}

.divider-or {
  display: flex;
  align-items: center;
  gap: var(--space-md);
  width: 100%;
  max-width: 300px;
  margin: var(--space-md) 0;
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

.extra-input {
  width: 100%;
  max-width: 360px;
  min-height: 100px;
  padding: var(--space-md);
  font-size: 16px;
  line-height: 1.6;
  border: 2px solid var(--color-border);
  border-radius: var(--radius-md);
  background: var(--color-bg-card);
  resize: none;
}

.extra-input:focus {
  outline: none;
  border-color: var(--color-primary);
}

.char-count {
  font-size: 12px;
  color: var(--color-text-secondary);
  text-align: right;
  width: 100%;
  max-width: 360px;
  margin-bottom: var(--space-lg);
}

.next-btn {
  width: 100%;
  max-width: 360px;
  height: 64px;
  background: linear-gradient(145deg, #3a7a64, var(--color-primary));
  color: white;
  border: none;
  border-radius: var(--radius-lg);
  font-size: 22px;
  font-weight: 600;
  cursor: pointer;
  transition: all var(--transition-fast);
  box-shadow: 0 4px 16px rgba(45, 90, 74, 0.3);
}

.next-btn:active:not(:disabled) {
  transform: scale(0.98);
}

.next-btn:disabled {
  background: var(--color-border);
  cursor: not-allowed;
  box-shadow: none;
}
</style>