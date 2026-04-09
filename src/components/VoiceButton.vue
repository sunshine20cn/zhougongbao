<template>
  <div class="voice-button-wrapper">
    <!-- 主语音按钮 -->
    <button
      class="voice-btn"
      :class="{
        recording: isRecording,
        disabled: !supported
      }"
      :disabled="!supported"
      @mousedown="startRecording"
      @mouseup="stopRecording"
      @mouseleave="isRecording && stopRecording()"
      @touchstart.prevent="startRecording"
      @touchend.prevent="stopRecording"
      @touchcancel.prevent="stopRecording"
    >
      <div class="voice-btn-inner">
        <!-- 麦克风图标 -->
        <span class="mic-icon" v-if="!isRecording && !isProcessing">
          🎙️
        </span>
        
        <!-- 太极加载中 -->
        <span class="taiji-icon taiji-loading" v-if="isProcessing">
          ☯️
        </span>
        
        <!-- 录音中状态 -->
        <div class="recording-status" v-if="isRecording">
          <span class="pulse-dot">🔴</span>
          <span class="recording-text">松开解读</span>
        </div>
      </div>
    </button>

    <!-- 识别文字显示 -->
    <div class="recognized-text" v-if="recognizedText || interimText">
      <span class="interim">{{ interimText }}</span>
      <span class="final">{{ recognizedText }}</span>
    </div>

    <!-- 不支持提示 -->
    <p class="not-supported-hint" v-if="showNotSupported">
      ⚠️ 当前浏览器不支持语音识别，请使用打字输入
    </p>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { isSpeechRecognitionSupported, createSpeechRecognizer } from '@/utils/speech.js'

const emit = defineEmits(['result', 'error'])

const isRecording = ref(false)
const isProcessing = ref(false)
const recognizedText = ref('')
const interimText = ref('')
const showNotSupported = ref(false)

let recognizer = null

const supported = computed(() => isSpeechRecognitionSupported())

onMounted(() => {
  if (!supported.value) {
    showNotSupported.value = true
  }
})

function startRecording() {
  if (!supported.value || isRecording.value) return

  recognizedText.value = ''
  interimText.value = ''
  isRecording.value = true

  try {
    recognizer = createSpeechRecognizer(
      (final, interim) => {
        recognizedText.value = final
        interimText.value = interim
      },
      () => {
        // 识别结束
        isRecording.value = false
        isProcessing.value = false
      },
      (error) => {
        console.error('语音识别错误:', error)
        isRecording.value = false
        isProcessing.value = false
        
        if (error === 'no-speech') {
          emit('error', '没有检测到语音，请再说一次')
        } else if (error === 'not-allowed') {
          emit('error', '请允许使用麦克风')
        } else {
          emit('error', '语音识别出错，请尝试打字输入')
        }
      }
    )
    recognizer.start()
    isProcessing.value = true
  } catch (e) {
    console.error('启动语音识别失败:', e)
    isRecording.value = false
    emit('error', '语音识别启动失败，请尝试打字输入')
  }
}

function stopRecording() {
  if (!isRecording.value) return
  
  isRecording.value = false
  
  if (recognizer) {
    recognizer.stop()
  }
  
  // 识别到文字则发送结果
  const finalText = recognizedText.value.trim()
  if (finalText) {
    emit('result', finalText)
  }
}

onUnmounted(() => {
  if (recognizer) {
    recognizer.abort()
  }
})
</script>

<style scoped>
.voice-button-wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--space-md);
}

.voice-btn {
  width: 160px;
  height: 160px;
  border-radius: 50%;
  border: none;
  background: linear-gradient(145deg, #3a7a64, #2D5A4A);
  color: white;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 
    0 8px 32px rgba(45, 90, 74, 0.35),
    0 2px 8px rgba(0, 0, 0, 0.1),
    inset 0 2px 4px rgba(255, 255, 255, 0.1);
  transition: all var(--transition-fast);
  -webkit-tap-highlight-color: transparent;
  touch-action: manipulation;
}

.voice-btn:active:not(.disabled) {
  transform: scale(0.95);
  box-shadow: 
    0 4px 16px rgba(45, 90, 74, 0.3),
    0 1px 4px rgba(0, 0, 0, 0.1);
}

.voice-btn.recording {
  background: linear-gradient(145deg, #d94a3a, #C0392B);
  box-shadow: 
    0 8px 32px rgba(192, 57, 43, 0.4),
    0 2px 8px rgba(0, 0, 0, 0.1);
  animation: pulse-glow 1.5s ease-in-out infinite;
}

.voice-btn.disabled {
  background: var(--color-border);
  cursor: not-allowed;
  box-shadow: none;
}

.voice-btn-inner {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 8px;
}

.mic-icon {
  font-size: 48px;
  filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.2));
}

.taiji-icon {
  font-size: 48px;
}

.recording-status {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 6px;
}

.pulse-dot {
  font-size: 28px;
  animation: pulse-glow 1s ease-in-out infinite;
}

.recording-text {
  font-size: 16px;
  font-weight: 600;
  color: white;
  letter-spacing: 2px;
}

@keyframes pulse-glow {
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.02); }
}

.recognized-text {
  min-height: 24px;
  font-size: 16px;
  color: var(--color-text-secondary);
  text-align: center;
  max-width: 280px;
  padding: 8px 16px;
  background: var(--color-bg-card);
  border-radius: var(--radius-md);
  border: 1px solid var(--color-border-light);
}

.recognized-text .interim {
  color: var(--color-text-secondary);
  font-style: italic;
}

.recognized-text .final {
  color: var(--color-text);
}

.not-supported-hint {
  font-size: 14px;
  color: var(--color-accent);
  text-align: center;
  padding: 12px;
  background: #FEF3F2;
  border-radius: var(--radius-md);
  max-width: 280px;
}
</style>
