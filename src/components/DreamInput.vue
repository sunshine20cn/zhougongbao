<template>
  <div class="dream-input">
    <div class="input-header">
      <label class="input-label">描述你的梦境</label>
      <span class="char-count" :class="{ warning: charCount > 450 }">
        {{ charCount }} / 500
      </span>
    </div>
    
    <textarea
      ref="textareaRef"
      v-model="text"
      class="dream-textarea"
      :maxlength="500"
      placeholder="请输入你梦到的内容，越详细越好..."
      @input="autoResize"
    ></textarea>
    
    <div class="input-footer">
      <span class="hint-text">💡 描述越详细，解梦越准确</span>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, nextTick } from 'vue'

const props = defineProps({
  modelValue: {
    type: String,
    default: ''
  }
})

const emit = defineEmits(['update:modelValue', 'submit'])

const text = computed({
  get: () => props.modelValue,
  set: (val) => emit('update:modelValue', val)
})

const charCount = computed(() => text.value.length)
const textareaRef = ref(null)

function autoResize() {
  const el = textareaRef.value
  if (el) {
    el.style.height = 'auto'
    el.style.height = Math.min(el.scrollHeight, 300) + 'px'
  }
}

onMounted(() => {
  nextTick(() => {
    if (textareaRef.value) {
      textareaRef.value.focus()
    }
  })
})

defineExpose({
  submit: () => {
    if (text.value.trim().length >= 2) {
      emit('submit', text.value.trim())
    }
  }
})
</script>

<style scoped>
.dream-input {
  display: flex;
  flex-direction: column;
  gap: var(--space-sm);
}

.input-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.input-label {
  font-size: 16px;
  font-weight: 600;
  color: var(--color-text);
}

.char-count {
  font-size: 14px;
  color: var(--color-text-secondary);
}

.char-count.warning {
  color: var(--color-accent);
  font-weight: 600;
}

.dream-textarea {
  width: 100%;
  min-height: 180px;
  max-height: 300px;
  padding: var(--space-md);
  font-size: 18px;
  line-height: 1.8;
  color: var(--color-text);
  background: var(--color-bg-card);
  border: 2px solid var(--color-border);
  border-radius: var(--radius-md);
  resize: none;
  outline: none;
  transition: border-color var(--transition-fast);
  font-family: var(--font-sans);
}

.dream-textarea:focus {
  border-color: var(--color-primary);
}

.dream-textarea::placeholder {
  color: var(--color-text-secondary);
  font-size: 16px;
}

.input-footer {
  display: flex;
  justify-content: flex-end;
}

.hint-text {
  font-size: 14px;
  color: var(--color-text-secondary);
}
</style>
