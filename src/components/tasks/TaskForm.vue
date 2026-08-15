<script setup lang="ts">
import { ref } from "vue"
import type { Priority, StudyTask, TaskStatus } from "../../types/task"
import { useSubjects } from "../../composables/useSubjects"

const emit = defineEmits<{
  submit: [taskData: Omit<StudyTask, "id" | "createdAt">]
}>()

const props = defineProps<{
  task?: StudyTask | null
}>()

const { subjects } = useSubjects()

const title = ref("")
const description = ref("")
const subjectId = ref("")
const status = ref<TaskStatus>("todo")
const priority = ref<Priority>("medium")
const dueDate = ref("")
const estimatedMinutes = ref<number | null>(null)
const errorMessage = ref("")

const handleSubmit = () => {
  if (!title.value.trim()) {
    errorMessage.value = "Tytuł zadania jest wymagany."
    return
  }

  emit("submit", {
    title: title.value.trim(),
    description: description.value.trim(),
    subjectId: subjectId.value,
    status: status.value,
    priority: priority.value,
    dueDate: dueDate.value || null,
    estimatedMinutes: estimatedMinutes.value ?? 0,
  })
}
</script>

<template>
  <form @submit.prevent="handleSubmit">
    <div>
      <label for="title">Tytuł *</label>
      <input id="title" v-model="title" type="text" />
    </div>

    <div>
      <label for="description">Opis</label>
      <textarea id="description" v-model="description" />
    </div>

    <div>
      <label for="subject">Przedmiot</label>
      <select id="subject" v-model="subjectId">
        <option value="">Wybierz przedmiot</option>

        <option
          v-for="subject in subjects"
          :key="subject.id"
          :value="subject.id"
        >
          {{ subject.name }}
        </option>
      </select>
    </div>

    <div>
      <label for="priority">Priorytet</label>
      <select id="priority" v-model="priority">
        <option value="low">Niski</option>
        <option value="medium">Średni</option>
        <option value="high">Wysoki</option>
      </select>
    </div>

    <div>
      <label for="status">Status</label>
      <select id="status" v-model="status">
        <option value="todo">Do zrobienia</option>
        <option value="in-progress">W trakcie</option>
        <option value="done">Ukończone</option>
      </select>
    </div>

    <div>
      <label for="due-date">Termin</label>
      <input id="due-date" v-model="dueDate" type="date" />
    </div>

    <div>
      <label for="estimated-minutes">Przewidywany czas</label>
      <input
        id="estimated-minutes"
        v-model.number="estimatedMinutes"
        type="number"
        min="0"
      />
    </div>

    <p v-if="errorMessage">{{ errorMessage }}</p>

    <button type="submit">Dodaj zadanie</button>
  </form>
</template>

<style scoped lang="scss">
@use "../../styles/variables" as *;

form {
  display: grid;
  gap: 18px;
  padding: 24px;
  background: $color-surface;
  border: 1px solid $color-border;
  border-radius: $radius-md;
  box-shadow: $shadow-sm;
}

div {
  display: grid;
  gap: 7px;
}

label {
  font-size: 0.875rem;
  font-weight: 700;
}

input,
textarea,
select {
  width: 100%;
  padding: 11px 12px;
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

textarea {
  min-height: 110px;
  resize: vertical;
}

button {
  justify-self: start;
  padding: 11px 16px;
  color: white;
  font-weight: 700;
  border: 0;
  border-radius: $radius-sm;
  background: $color-primary;

  &:hover {
    background: $color-primary-dark;
  }
}

p {
  margin: 0;
  color: $color-danger;
  font-size: 0.875rem;
}
</style>