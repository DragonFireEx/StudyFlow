<script setup lang="ts">
import { computed, ref, watch } from "vue";
import type { Subject, SubjectInput } from "../../types/subject";

const props = defineProps<{
  subject?: Subject | null;
}>();

const emit = defineEmits<{
  submit: [input: SubjectInput];
  cancel: [];
}>();

const colors = [
  "#6759ed",
  "#e58a31",
  "#1b9c70",
  "#dc4c64",
  "#2b9cdb",
  "#9a62d1",
];
const name = ref("");
const color = ref(colors[0]);
const errorMessage = ref("");

const isEditing = computed(() => Boolean(props.subject));

const setFormValues = () => {
  name.value = props.subject?.name ?? "";
  color.value = props.subject?.color ?? colors[0];
  errorMessage.value = "";
};

watch(() => props.subject, setFormValues, { immediate: true });

const handleSubmit = () => {
  const trimmedName = name.value.trim();

  if (!trimmedName) {
    errorMessage.value = "Podaj nazwę przedmiotu.";
    return;
  }

  emit("submit", { name: trimmedName, color: color.value });
  name.value = "";
  color.value = colors[0];
  errorMessage.value = "";
};
</script>

<template>
  <form class="subject-form" @submit.prevent="handleSubmit">
    <div class="form-field">
      <label for="subject-name">Nazwa przedmiotu</label>
      <input
        id="subject-name"
        v-model="name"
        type="text"
        maxlength="40"
        placeholder="np. TypeScript"
      />
      <span v-if="errorMessage" class="form-error">{{ errorMessage }}</span>
    </div>

    <fieldset class="color-field">
      <legend>Kolor</legend>
      <div class="color-options">
        <button
          v-for="item in colors"
          :key="item"
          class="color-option"
          :class="{ 'color-option--active': color === item }"
          :style="{ backgroundColor: item }"
          type="button"
          :aria-label="`Wybierz kolor ${item}`"
          @click="color = item"
        />
      </div>
    </fieldset>

    <div class="form-actions">
      <button
        v-if="isEditing"
        class="button button--secondary"
        type="button"
        @click="emit('cancel')"
      >
        Anuluj
      </button>
      <button class="button" type="submit">
        {{ isEditing ? "Zapisz zmiany" : "Dodaj przedmiot" }}
      </button>
    </div>
  </form>
</template>

<style scoped lang="scss">
@use "../../styles/variables" as *;

.subject-form {
  display: grid;
  gap: 20px;
}
.form-field,
.color-field {
  display: grid;
  gap: 8px;
  padding: 0;
  margin: 0;
  border: 0;
}
label,
legend {
  font-size: 0.875rem;
  font-weight: 700;
  margin-bottom: 15px;
}
input {
  width: 100%;
  padding: 11px 12px;
  color: $color-text;
  background: $color-surface;
  border: 1px solid $color-border;
  border-radius: $radius-sm;
  outline: 0;
}
input:focus {
  border-color: $color-primary;
  box-shadow: 0 0 0 3px rgb(103 89 237 / 14%);
}
.form-error {
  color: $color-danger;
  font-size: 0.8125rem;
}
.color-options {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}
.color-option {
  width: 30px;
  height: 30px;
  border: 3px solid transparent;
  border-radius: 50%;
}
.color-option--active {
  outline: 2px solid $color-text;
  outline-offset: 2px;
}
.form-actions {
  display: flex;
  justify-content: flex-end;
  gap: 10px;
}
.button {
  padding: 10px 14px;
  color: #fff;
  font-weight: 700;
  border: 0;
  border-radius: $radius-sm;
  background: $color-primary;
}
.button:hover {
  background: $color-primary-dark;
}
.button--secondary {
  color: $color-text;
  background: $color-surface-muted;
}
</style>
