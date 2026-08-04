<script setup lang="ts">
import { RouterLink } from 'vue-router'

const navigationItems = [
  { label: 'Dashboard', to: '/', icon: '⌂' },
  { label: 'Zadania', to: '/tasks', icon: '✓' },
  { label: 'Przedmioty', to: '/subjects', icon: '▣' },
  { label: 'Timer', to: '/timer', icon: '◷' },
  { label: 'Statystyki', to: '/statistics', icon: '↗' },
  { label: 'Notatki', to: '/notes', icon: '☷' },
]
</script>

<template>
  <aside class="sidebar">
    <RouterLink to="/" class="brand" aria-label="StudyFlow — dashboard">
      <span class="brand__mark">✦</span>
      <span>StudyFlow</span>
    </RouterLink>

    <nav class="sidebar__nav" aria-label="Główna nawigacja">
      <RouterLink
        v-for="item in navigationItems"
        :key="item.to"
        :to="item.to"
        class="nav-link"
      >
        <span class="nav-link__icon" aria-hidden="true">{{ item.icon }}</span>
        {{ item.label }}
      </RouterLink>
    </nav>

    <p class="sidebar__footer">Twoja nauka, w jednym miejscu.</p>
  </aside>
</template>

<style scoped lang="scss">
@use "../../styles/variables" as *;

.sidebar {
  display: flex;
  flex-direction: column;
  width: $sidebar-width;
  min-height: 100vh;
  padding: 26px 16px;
  color: #f8f9ff;
  background: #272d4d;
}

.brand {
  display: flex;
  align-items: center;
  gap: 9px;
  padding: 0 10px;
  margin-bottom: 38px;
  font-size: 1.25rem;
  font-weight: 700;
  letter-spacing: -0.04em;
}

.brand__mark {
  display: grid;
  width: 29px;
  height: 29px;
  place-items: center;
  border-radius: 9px;
  background: $color-primary;
}

.sidebar__nav {
  display: grid;
  gap: 5px;
}

.nav-link {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 11px 12px;
  color: #c9cde1;
  border-radius: $radius-sm;
  transition: background $transition-fast, color $transition-fast;

  &:hover,
  &.router-link-exact-active {
    color: #fff;
    background: rgb(255 255 255 / 13%);
  }
}

.nav-link__icon {
  width: 18px;
  text-align: center;
}

.sidebar__footer {
  margin-top: auto;
  padding: 12px 10px 0;
  color: #aeb5d1;
  font-size: 0.75rem;
}

@media (max-width: 768px) {
  .sidebar {
    position: sticky;
    top: 0;
    z-index: 10;
    flex-direction: row;
    align-items: center;
    width: 100%;
    min-height: auto;
    padding: 12px 16px;
    overflow-x: auto;
  }

  .brand {
    flex: 0 0 auto;
    margin: 0 16px 0 0;
    padding: 0;
    font-size: 1rem;
  }

  .brand__mark {
    width: 25px;
    height: 25px;
  }

  .sidebar__nav {
    display: flex;
    gap: 4px;
  }

  .nav-link {
    flex: 0 0 auto;
    gap: 6px;
    padding: 8px 10px;
    font-size: 0.875rem;
  }

  .sidebar__footer {
    display: none;
  }
}
</style>
