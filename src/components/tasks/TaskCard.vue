<script setup lang="ts">
import type { Subject } from "../../types/subject"
import type { StudyTask } from "../../types/task"

defineProps<{
  task: StudyTask
  subject?: Subject
}>()

const emit = defineEmits<{
  toggleStatus: [task: StudyTask]
  edit: [task: StudyTask]
  delete: [task: StudyTask]
}>()

const formatDate = (date: string | null) => {
  if (!date) {
    return "Brak terminu"
  }

  return new Intl.DateTimeFormat("pl-PL", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(date))
}

const priorityLabels = {
  low: "Niski",
  medium: "Średni",
  high: "Wysoki",
}
</script>

<template>
  <article class="task-card" :class="{ 'task-card--done': task.status === 'done' }">
    <button
      class="task-card__checkbox"
      :class="{ 'task-card__checkbox--checked': task.status === 'done' }"
      type="button"
      :aria-label="`Zmień status zadania: ${task.title}`"
      @click="emit('toggleStatus', task)"
    >
      <span v-if="task.status === 'done'">✓</span>
    </button>

    <div class="task-card__content">
      <div class="task-card__header">
        <h3>{{ task.title }}</h3>

        <span
          v-if="subject"
          class="subject-badge"
          :style="{ backgroundColor: subject.color }"
        >
          {{ subject.name }}
        </span>
      </div>

      <p v-if="task.description" class="task-card__description">
        {{ task.description }}
      </p>

      <div class="task-card__details">
        <span>{{ priorityLabels[task.priority] }} priorytet</span>
        <span>{{ formatDate(task.dueDate) }}</span>
        <span>{{ task.estimatedMinutes }} min</span>
      </div>
    </div>

    <div class="task-card__actions">
      <button type="button" @click="emit('edit', task)">
        Edytuj
      </button>

      <button type="button" @click="emit('delete', task)">
        Usuń
      </button>
    </div>
  </article>
</template>

<style scoped lang="scss">
@use "../../styles/variables" as *;

.task-card {
  display: flex;
  align-items: flex-start;
  gap: 14px;
  padding: 18px;
  background: $color-surface;
  border: 1px solid $color-border;
  border-radius: $radius-md;
  box-shadow: $shadow-sm;

  &--done {
    opacity: 0.65;

    h3 {
      text-decoration: line-through;
    }
  }
}

.task-card__checkbox {
  display: grid;
  flex: 0 0 auto;
  width: 22px;
  height: 22px;
  place-items: center;
  padding: 0;
  color: white;
  border: 2px solid $color-border;
  border-radius: 6px;
  background: transparent;

  &--checked {
    border-color: $color-success;
    background: $color-success;
  }
}

.task-card__content {
  flex: 1;
  min-width: 0;
}

.task-card__header {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 10px;

  h3 {
    margin: 0;
    font-size: 1rem;
  }
}

.subject-badge {
  padding: 4px 8px;
  color: white;
  font-size: 0.75rem;
  font-weight: 700;
  border-radius: 999px;
}

.task-card__description {
  margin: 8px 0;
  color: $color-text-muted;
  font-size: 0.875rem;
}

.task-card__details {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;

  span {
    padding: 4px 7px;
    color: $color-text-muted;
    font-size: 0.75rem;
    background: $color-surface-muted;
    border-radius: 6px;
  }
}

.task-card__actions {
  display: flex;
  flex: 0 0 auto;
  gap: 8px;

  button {
    padding: 7px 9px;
    color: $color-text-muted;
    font-size: 0.8125rem;
    border: 0;
    border-radius: 6px;
    background: transparent;

    &:hover {
      color: $color-text;
      background: $color-surface-muted;
    }

    &:last-child:hover {
      color: $color-danger;
      background: #fff0f2;
    }
  }
}

@media (max-width: 560px) {
  .task-card {
    flex-wrap: wrap;
  }

  .task-card__actions {
    width: 100%;
    margin-left: 36px;
  }
}
</style>