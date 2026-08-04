<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()

const pageTitle = computed(() => String(route.meta.title ?? 'StudyFlow'))
</script>

<template>
  <header class="app-header">
    <div>
      <p class="app-header__eyebrow">StudyFlow</p>
      <h1>{{ pageTitle }}</h1>
    </div>
    <button class="profile-button" type="button" aria-label="Otwórz profil użytkownika">M</button>
  </header>
</template>

<style scoped lang="scss">
@use "../../styles/variables" as *;

.app-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 20px;
  margin-bottom: 30px;
}

.app-header__eyebrow {
  margin-bottom: 4px;
  color: $color-primary;
  font-size: 0.75rem;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}

h1 {
  margin: 0;
  font-size: clamp(1.65rem, 3vw, 2.2rem);
  letter-spacing: -0.045em;
}

.profile-button {
  display: grid;
  width: 38px;
  height: 38px;
  place-items: center;
  color: #4d2f1f;
  font-weight: 700;
  border: 0;
  border-radius: 50%;
  background: #f0b578;
}
</style>
