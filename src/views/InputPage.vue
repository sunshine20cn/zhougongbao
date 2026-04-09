<template>
  <div class="page input-page">
    <!-- 顶部 -->
    <header class="page-header">
      <button class="back-btn" @click="$router.back()">‹ 返回</button>
      <h1 class="page-title serif">描述梦境</h1>
      <div style="width: 50px;"></div>
    </header>

    <!-- 输入区 -->
    <section class="input-section">
      <DreamInput v-model="dreamText" @submit="handleSubmit" />
    </section>

    <!-- 提交按钮 -->
    <div class="submit-area">
      <button 
        class="btn-primary"
        :disabled="dreamText.trim().length < 2"
        @click="handleSubmit"
      >
        🔮 开始解读
      </button>
      <p class="submit-hint" v-if="dreamText.trim().length < 2">请输入至少2个字</p>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import DreamInput from '@/components/DreamInput.vue'
import { showToast } from 'vant'

const router = useRouter()
const dreamText = ref('')

function handleSubmit() {
  const text = dreamText.value.trim()
  if (text.length < 2) {
    showToast('请输入至少2个字')
    return
  }
  router.push({
    path: '/result',
    query: { dream: text }
  })
}
</script>

<style scoped>
.input-page {
  display: flex;
  flex-direction: column;
  gap: var(--space-xl);
}

.page-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: var(--space-sm) 0;
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
  color: var(--color-text);
}

.input-section {
  flex: 1;
}

.submit-area {
  display: flex;
  flex-direction: column;
  gap: var(--space-sm);
}

.submit-hint {
  font-size: 14px;
  color: var(--color-text-secondary);
  text-align: center;
}
</style>
