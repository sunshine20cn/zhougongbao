<template>
  <div class="history-item card-paper" @click="$emit('click')">
    <div class="item-content">
      <div class="item-top">
        <span class="item-dream">{{ dreamText }}</span>
      </div>
      <div class="item-bottom">
        <span class="item-time">{{ formatTime(createdAt) }}</span>
        <span class="item-arrow">›</span>
      </div>
    </div>
    <button class="delete-btn" @click.stop="handleDelete" title="删除">
      🗑️
    </button>
  </div>
</template>

<script setup>
defineProps({
  dreamText: {
    type: String,
    required: true
  },
  createdAt: {
    type: String,
    required: true
  }
})

const emit = defineEmits(['click', 'delete'])

function formatTime(isoString) {
  const date = new Date(isoString)
  const now = new Date()
  const diff = now - date
  
  // 1分钟内
  if (diff < 60 * 1000) return '刚刚'
  // 1小时内
  if (diff < 60 * 60 * 1000) return `${Math.floor(diff / 60000)}分钟前`
  // 24小时内
  if (diff < 24 * 60 * 60 * 1000) return `${Math.floor(diff / 3600000)}小时前`
  // 超过1天
  return `${date.getMonth() + 1}月${date.getDate()}日`
}

function handleDelete() {
  emit('delete')
}
</script>

<style scoped>
.history-item {
  display: flex;
  align-items: center;
  padding: var(--space-md) var(--space-lg);
  cursor: pointer;
  transition: all var(--transition-fast);
  border-radius: var(--radius-md);
}

.history-item:active {
  transform: scale(0.98);
  background: #F8F6F2;
}

.item-content {
  flex: 1;
  min-width: 0;
}

.item-top {
  margin-bottom: 6px;
}

.item-dream {
  font-size: 16px;
  font-weight: 500;
  color: var(--color-text);
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.item-bottom {
  display: flex;
  align-items: center;
  gap: 8px;
}

.item-time {
  font-size: 13px;
  color: var(--color-text-secondary);
}

.item-arrow {
  font-size: 18px;
  color: var(--color-text-secondary);
}

.delete-btn {
  flex-shrink: 0;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: none;
  border: none;
  cursor: pointer;
  font-size: 18px;
  opacity: 0.5;
  transition: opacity var(--transition-fast);
  border-radius: var(--radius-sm);
}

.delete-btn:hover,
.delete-btn:active {
  opacity: 1;
  background: #FEF2F2;
}
</style>
