<template>
  <div class="history-item card-paper">
    <!-- 主内容，点击进入详情 -->
    <div class="item-main" @click="$router.push(`/history/${id}`)">
      <div class="item-content">
        <div class="item-top">
          <span class="item-dream">{{ dreamText }}</span>
        </div>
        <div class="item-bottom">
          <span class="item-time">{{ formatTime(createdAt) }}</span>
        </div>
      </div>
      <span class="item-arrow">›</span>
    </div>
    
    <!-- 删除按钮，始终可见 -->
    <button class="delete-btn" @click="confirmDelete" title="删除此记录">
      🗑️
    </button>
  </div>
</template>

<script setup>
import { Dialog, showToast } from 'vant'

const props = defineProps({
  id: {
    type: String,
    required: true
  },
  dreamText: {
    type: String,
    required: true
  },
  createdAt: {
    type: String,
    required: true
  }
})

const emit = defineEmits(['deleted'])

function formatTime(isoString) {
  const date = new Date(isoString)
  const now = new Date()
  const diff = now - date
  
  if (diff < 60 * 1000) return '刚刚'
  if (diff < 60 * 60 * 1000) return `${Math.floor(diff / 60000)}分钟前`
  if (diff < 24 * 60 * 60 * 1000) return `${Math.floor(diff / 3600000)}小时前`
  return `${date.getMonth() + 1}月${date.getDate()}日`
}

function confirmDelete() {
  Dialog.confirm({
    title: '删除记录',
    message: '确定删除这条解梦记录吗？',
    confirmButtonText: '删除',
    confirmButtonColor: '#C0392B',
    cancelButtonText: '取消',
  }).then(() => {
    emit('deleted', props.id)
    showToast('已删除')
  }).catch(() => {})
}
</script>

<style scoped>
.history-item {
  display: flex;
  align-items: center;
  background: var(--color-bg-card);
  border-radius: var(--radius-md);
  border: 1px solid var(--color-border-light);
  box-shadow: var(--shadow-sm);
  overflow: hidden;
  transition: all var(--transition-fast);
}

.history-item:active {
  transform: scale(0.98);
}

.item-main {
  flex: 1;
  display: flex;
  align-items: center;
  padding: var(--space-md) var(--space-lg);
  cursor: pointer;
  min-width: 0;
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
  line-height: 1.5;
}

.item-bottom {
  display: flex;
  align-items: center;
}

.item-time {
  font-size: 13px;
  color: var(--color-text-secondary);
}

.item-arrow {
  font-size: 22px;
  color: var(--color-text-secondary);
  margin-left: 8px;
  flex-shrink: 0;
}

.delete-btn {
  flex-shrink: 0;
  width: 52px;
  height: 100%;
  min-height: 70px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #FEF2F2;
  border: none;
  border-left: 1px solid var(--color-border-light);
  cursor: pointer;
  font-size: 20px;
  transition: background var(--transition-fast);
}

.delete-btn:active {
  background: #FEE2E2;
}
</style>
