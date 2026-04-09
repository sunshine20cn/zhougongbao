<template>
  <div class="result-card card-paper fade-in">
    <!-- 左侧水墨装饰条 -->
    <div class="ink-bar"></div>
    
    <!-- 内容区 -->
    <div class="result-content">
      <div class="result-header">
        <span class="result-label">🌙 周公解梦</span>
      </div>
      
      <div class="result-body">
        <p class="result-text serif">{{ content }}</p>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  content: {
    type: String,
    required: true
  }
})
</script>

<style scoped>
.result-card {
  position: relative;
  display: flex;
  overflow: hidden;
  padding: var(--space-xl);
  background: var(--color-bg-card);
  border-radius: var(--radius-lg);
  border: 1px solid var(--color-border-light);
  box-shadow: var(--shadow-md);
}

.ink-bar {
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  width: 6px;
  background: linear-gradient(
    180deg,
    var(--color-primary) 0%,
    #4a9a7a 30%,
    #7aba9a 50%,
    #4a9a7a 70%,
    var(--color-primary) 100%
  );
  border-radius: var(--radius-lg) 0 0 var(--radius-lg);
}

.result-content {
  flex: 1;
  padding-left: var(--space-md);
}

.result-header {
  margin-bottom: var(--space-md);
}

.result-label {
  font-size: 14px;
  color: var(--color-primary);
  font-weight: 600;
  letter-spacing: 1px;
}

.result-body {
  font-size: 18px;
  line-height: 1.9;
  color: var(--color-text);
}

.result-text {
  font-family: var(--font-serif);
  white-space: pre-wrap;
  word-break: break-word;
}
</style>
