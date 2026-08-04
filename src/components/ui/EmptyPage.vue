<script setup lang="ts">
defineProps<{
  title: string;
  description: string;
}>();
</script>

<template>
  <section class="empty-page">
    <span class="empty-page__icon">✦</span>
    <h2>{{ title }}</h2>
    <p>{{ description }}</p>
  </section>
</template>

<style scoped lang="scss">
@use "../../styles/variables" as *;

.empty-page {
  display: grid;
  min-height: 340px;
  place-content: center;
  padding: 32px;
  text-align: center;
  background: $color-surface;
  border: 1px dashed $color-border;
  border-radius: $radius-lg;
}

.empty-page__icon {
  display: grid;
  width: 46px;
  height: 46px;
  place-items: center;
  margin: 0 auto 16px;
  color: $color-primary;
  background: $color-primary-light;
  border-radius: 14px;
}

h2 {
  margin: 0;
  font-size: 1.15rem;
}
p {
  max-width: 370px;
  margin: 8px 0 0;
  color: $color-text-muted;
}
</style>
