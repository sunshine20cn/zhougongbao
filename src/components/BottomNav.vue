<template>
  <nav class="bottom-nav">
    <router-link to="/" class="nav-item" :class="{ active: $route.path === '/' }">
      <span class="nav-icon">🏠</span>
      <span class="nav-label">首页</span>
    </router-link>
    <router-link to="/history" class="nav-item" :class="{ active: $route.path.startsWith('/history') }">
      <span class="nav-icon">📜</span>
      <span class="nav-label">历史</span>
    </router-link>
  </nav>
</template>

<script setup>
</script>

<style scoped>
.bottom-nav {
  position: fixed;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 100%;
  max-width: 480px;
  height: 64px;
  background: var(--color-bg-card);
  border-top: 1px solid var(--color-border);
  display: flex;
  align-items: center;
  justify-content: space-around;
  z-index: 100;
  padding-bottom: env(safe-area-inset-bottom, 0);
}

.nav-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 4px;
  padding: 8px 24px;
  text-decoration: none;
  color: var(--color-text-secondary);
  transition: color var(--transition-fast);
  border-radius: var(--radius-sm);
}

.nav-item:active {
  background: var(--color-ink-wash);
}

.nav-item.active {
  color: var(--color-accent);
}

.nav-icon {
  font-size: 22px;
  line-height: 1;
}

.nav-label {
  font-size: 12px;
  font-weight: 500;
}
</style>
