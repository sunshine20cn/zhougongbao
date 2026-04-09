<template>
  <div class="page history-page">
    <!-- 顶部 -->
    <header class="page-header">
      <h1 class="page-title serif">解梦记录</h1>
      <span class="total-count" v-if="store.totalCount > 0">
        共{{ store.totalCount }}条
      </span>
    </header>

    <!-- 历史列表 -->
    <div class="history-list" v-if="store.history.length > 0">
      <HistoryItem
        v-for="item in store.history"
        :key="item.id"
        :id="item.id"
        :dreamText="item.dream"
        :createdAt="item.createdAt"
        @deleted="handleDelete"
      />
    </div>

    <!-- 空状态 -->
    <div class="empty-state" v-else>
      <div class="empty-icon">📜</div>
      <p class="empty-title">暂无解梦记录</p>
      <p class="empty-sub">去首页开始你的第一次解梦吧</p>
      <button class="btn-primary" style="max-width: 200px; margin-top: 16px;" @click="$router.push('/')">
        开始解梦
      </button>
    </div>

    <!-- 清空按钮 -->
    <div class="clear-area" v-if="store.history.length > 0">
      <button class="btn-clear" @click="handleClearAll">
        清空全部记录
      </button>
    </div>
  </div>
</template>

<script setup>
import { useDreamStore } from '@/stores/dream.js'
import HistoryItem from '@/components/HistoryItem.vue'
import { Dialog, showToast } from 'vant'

const store = useDreamStore()

function handleDelete(id) {
  Dialog.confirm({
    title: '删除记录',
    message: '确定删除这条解梦记录？',
    confirmButtonText: '删除',
    confirmButtonColor: '#C0392B',
    cancelButtonText: '取消',
  }).then(() => {
    store.deleteDream(id)
    showToast('已删除')
  }).catch(() => {})
}

function handleClearAll() {
  Dialog.confirm({
    title: '清空全部',
    message: '确定清空所有解梦记录？此操作不可恢复。',
    confirmButtonText: '清空',
    confirmButtonColor: '#C0392B',
    cancelButtonText: '取消',
  }).then(() => {
    store.clearAll()
    showToast('已清空')
  }).catch(() => {})
}
</script>

<style scoped>
.history-page {
  display: flex;
  flex-direction: column;
  gap: var(--space-lg);
}

.page-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: var(--space-sm) 0;
}

.page-title {
  font-size: 24px;
  font-weight: 700;
  color: var(--color-text);
}

.total-count {
  font-size: 14px;
  color: var(--color-text-secondary);
}

.history-list {
  display: flex;
  flex-direction: column;
  gap: var(--space-sm);
}

.empty-state {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: var(--space-sm);
  padding: var(--space-xxl) 0;
  text-align: center;
}

.empty-icon {
  font-size: 64px;
  margin-bottom: var(--space-sm);
}

.empty-title {
  font-size: 18px;
  font-weight: 600;
  color: var(--color-text);
}

.empty-sub {
  font-size: 14px;
  color: var(--color-text-secondary);
}

.clear-area {
  padding: var(--space-md) 0;
  text-align: center;
}

.btn-clear {
  background: none;
  border: none;
  color: var(--color-text-secondary);
  font-size: 14px;
  cursor: pointer;
  padding: 8px 16px;
}

.btn-clear:active {
  color: var(--color-accent);
}
</style>
