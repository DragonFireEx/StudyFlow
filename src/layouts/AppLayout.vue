<script setup lang="ts">
import AppHeader from '../components/layout/AppHeader.vue'
import AppSidebar from '../components/layout/AppSidebar.vue'
</script>

<template>
  <div class="app-layout">
    <AppSidebar />
    <main class="app-layout__content">
      <AppHeader />
      <slot />
    </main>
  </div>
</template>

<style scoped lang="scss">
@use "../styles/variables" as *;

.app-layout {
  display: flex;
  min-height: 100vh;
}

.app-layout__content {
  flex: 1;
  min-width: 0;
  padding: 36px clamp(24px, 5vw, 72px);
}

@media (max-width: 768px) {
  .app-layout {
    display: block;
  }

  .app-layout__content {
    padding: 28px 16px;
  }
}
</style>
