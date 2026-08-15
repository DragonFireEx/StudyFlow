<script setup lang="ts">
import { ref } from "vue"
import TaskCard from "../components/tasks/TaskCard.vue"
import TaskForm from "../components/tasks/TaskForm.vue"
import { useSubjects } from "../composables/useSubjects"
import { useTaskFilters } from "../composables/useTaskFilters"
import { useTasks } from "../composables/useTasks"
import type { StudyTask } from "../types/task"

type TaskInput = Omit<StudyTask, "id" | "createdAt">

const { subjects } = useSubjects()

const {
  tasks,
  addTask,
  updateTask,
  deleteTask,
  toggleTaskStatus,
} = useTasks()

const {
  searchQuery,
  selectedSubjectId,
  selectedStatus,
  selectedPriority,
  sortBy,
  filteredTasks,
  clearFilters,
} = useTaskFilters(tasks, subjects)

const taskBeingEdited = ref<StudyTask | null>(null)

const handleSubmit = (taskData: TaskInput) => {
  if (taskBeingEdited.value) {
    updateTask(taskBeingEdited.value.id, taskData)
    taskBeingEdited.value = null
    return
  }

  addTask(taskData)
}

const handleDelete = (task: StudyTask) => {
  const shouldDelete = window.confirm(
    `Czy na pewno chcesz usunąć zadanie "${task.title}"?`,
  )

  if (shouldDelete) {
    deleteTask(task.id)
  }
}

const handleEdit = (task: StudyTask) => {
  taskBeingEdited.value = task
}

const cancelEdit = () => {
  taskBeingEdited.value = null
}
</script>

<template>
  <section class="tasks-view">
    <div class="tasks-view__header">
      <div>
        <h2>Twoje zadania</h2>
        <p>Planuj naukę i śledź swój postęp.</p>
      </div>

      <span>{{ tasks.length }} zadań</span>
    </div>

    <div v-if="subjects.length === 0" class="message">
      Najpierw dodaj co najmniej jeden przedmiot w zakładce „Przedmioty”.
    </div>

    <template v-else>
      <TaskForm
        :task="taskBeingEdited"
        @submit="handleSubmit"
        @cancel="cancelEdit"
      />

      <section class="filters">
        <input
          v-model="searchQuery"
          type="search"
          placeholder="Szukaj po tytule..."
        />

        <select v-model="selectedSubjectId">
          <option value="">Wszystkie przedmioty</option>

          <option
            v-for="subject in subjects"
            :key="subject.id"
            :value="subject.id"
          >
            {{ subject.name }}
          </option>
        </select>

        <select v-model="selectedStatus">
          <option value="">Wszystkie statusy</option>
          <option value="todo">Do zrobienia</option>
          <option value="in-progress">W trakcie</option>
          <option value="done">Ukończone</option>
        </select>

        <select v-model="selectedPriority">
          <option value="">Wszystkie priorytety</option>
          <option value="low">Niski</option>
          <option value="medium">Średni</option>
          <option value="high">Wysoki</option>
        </select>

        <select v-model="sortBy">
          <option value="newest">Najnowsze</option>
          <option value="due-date">Najbliższy termin</option>
          <option value="priority">Najwyższy priorytet</option>
          <option value="subject">Według przedmiotu</option>
        </select>

        <button type="button" @click="clearFilters">
          Wyczyść filtry
        </button>
      </section>

      <div v-if="filteredTasks.length" class="task-list">
        <TaskCard
          v-for="task in filteredTasks"
          :key="task.id"
          :task="task"
          :subject="subjects.find((subject) => subject.id === task.subjectId)"
          @toggle-status="toggleTaskStatus"
          @edit="handleEdit"
          @delete="handleDelete"
        />
      </div>

      <div v-else class="empty-state">
        <h3>Nie znaleziono zadań</h3>
        <p>Zmień filtry albo dodaj nowe zadanie.</p>
      </div>
    </template>
  </section>
</template>

<style scoped lang="scss">
@use "../styles/variables" as *;

.tasks-view {
  display: grid;
  gap: 24px;
}

.tasks-view__header {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 16px;

  h2 {
    margin: 0;
    font-size: 1.25rem;
  }

  p {
    margin: 6px 0 0;
    color: $color-text-muted;
  }

  span {
    padding: 6px 10px;
    color: $color-primary;
    font-size: 0.8125rem;
    font-weight: 700;
    background: $color-primary-light;
    border-radius: 999px;
  }
}

.filters {
  display: grid;
  grid-template-columns: repeat(5, minmax(0, 1fr)) auto;
  gap: 10px;
  padding: 16px;
  background: $color-surface;
  border: 1px solid $color-border;
  border-radius: $radius-md;
  box-shadow: $shadow-sm;

  input,
  select {
    width: 100%;
    padding: 10px;
    color: $color-text;
    background: $color-surface;
    border: 1px solid $color-border;
    border-radius: $radius-sm;
    outline: none;

    &:focus {
      border-color: $color-primary;
      box-shadow: 0 0 0 3px rgb(103 89 237 / 14%);
    }
  }

  button {
    padding: 10px 12px;
    color: $color-text-muted;
    white-space: nowrap;
    border: 0;
    border-radius: $radius-sm;
    background: $color-surface-muted;

    &:hover {
      color: $color-text;
    }
  }
}

.task-list {
  display: grid;
  gap: 12px;
}

.message,
.empty-state {
  padding: 20px;
  color: $color-text-muted;
  background: $color-surface;
  border: 1px solid $color-border;
  border-radius: $radius-md;
}

.empty-state {
  text-align: center;

  h3 {
    margin: 0;
    color: $color-text;
  }

  p {
    margin: 8px 0 0;
  }
}

@media (max-width: 1050px) {
  .filters {
    grid-template-columns: repeat(3, 1fr);
  }
}

@media (max-width: 650px) {
  .filters {
    grid-template-columns: 1fr;
  }

  .tasks-view__header {
    display: block;

    span {
      display: inline-block;
      margin-top: 12px;
    }
  }
}
</style>