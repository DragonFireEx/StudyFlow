<script setup lang="ts">
import { ref } from 'vue'
import SubjectForm from '../components/subjects/SubjectForm.vue'
import { useSubjects } from '../composables/useSubjects'
import type { Subject, SubjectInput } from '../types/subject'

const { subjects, addSubject, updateSubject, deleteSubject } = useSubjects()
const subjectBeingEdited = ref<Subject | null>(null)

const handleSubmit = (input: SubjectInput) => {
  if (subjectBeingEdited.value) {
    updateSubject(subjectBeingEdited.value.id, input)
    subjectBeingEdited.value = null
    return
  }

  addSubject(input)
}

const handleDelete = (subject: Subject) => {
  if (window.confirm(`Usunąć przedmiot „${subject.name}”?`)) {
    deleteSubject(subject.id)
  }
}
</script>

<template>
  <section class="subjects-page">
    <div class="subjects-page__intro">
      <div>
        <h2>Twoje przedmioty</h2>
        <p>Grupuj zadania i sesje nauki według tematów.</p>
      </div>
      <span class="subjects-count">{{ subjects.length }} {{ subjects.length === 1 ? 'przedmiot' : 'przedmioty' }}</span>
    </div>

    <div class="subjects-layout">
      <aside class="form-card">
        <h3>{{ subjectBeingEdited ? 'Edytuj przedmiot' : 'Nowy przedmiot' }}</h3>
        <SubjectForm :subject="subjectBeingEdited" @submit="handleSubmit" @cancel="subjectBeingEdited = null" />
      </aside>

      <div v-if="subjects.length" class="subject-list">
        <article v-for="subject in subjects" :key="subject.id" class="subject-card">
          <span class="subject-card__color" :style="{ backgroundColor: subject.color }" />
          <div class="subject-card__content"><h3>{{ subject.name }}</h3><p>0 zadań · 0 min nauki</p></div>
          <div class="subject-card__actions"><button type="button" @click="subjectBeingEdited = subject">Edytuj</button><button class="delete-button" type="button" @click="handleDelete(subject)">Usuń</button></div>
        </article>
      </div>

      <div v-else class="empty-subjects"><span>✦</span><h3>Nie masz jeszcze przedmiotów</h3><p>Dodaj pierwszy przedmiot, aby później przypisywać do niego zadania.</p></div>
    </div>
  </section>
</template>

<style scoped lang="scss">
@use "../styles/variables" as *;

.subjects-page__intro { display: flex; justify-content: space-between; align-items: start; gap: 20px; margin: -18px 0 26px; }.subjects-page__intro h2 { margin: 0; font-size: 1.25rem; }.subjects-page__intro p { margin: 6px 0 0; color: $color-text-muted; }.subjects-count { padding: 6px 10px; color: $color-primary; font-size: .8125rem; font-weight: 700; background: $color-primary-light; border-radius: 999px; }.subjects-layout { display: grid; grid-template-columns: minmax(250px, .72fr) minmax(0, 1.5fr); gap: 20px; }.form-card, .subject-card, .empty-subjects { background: $color-surface; border: 1px solid $color-border; border-radius: $radius-md; box-shadow: $shadow-sm; }.form-card { align-self: start; padding: 20px; }.form-card h3 { margin: 0 0 18px; }.subject-list { display: grid; align-content: start; gap: 12px; }.subject-card { display: flex; align-items: center; gap: 14px; padding: 16px; }.subject-card__color { flex: 0 0 auto; width: 13px; height: 42px; border-radius: 8px; }.subject-card__content { min-width: 0; }.subject-card__content h3 { margin: 0; font-size: 1rem; }.subject-card__content p { margin: 4px 0 0; color: $color-text-muted; font-size: .8125rem; }.subject-card__actions { display: flex; gap: 8px; margin-left: auto; }.subject-card__actions button { padding: 7px 9px; color: $color-text-muted; font-size: .8125rem; border: 0; border-radius: 6px; background: transparent; }.subject-card__actions button:hover { color: $color-text; background: $color-surface-muted; }.subject-card__actions .delete-button:hover { color: $color-danger; background: #fff0f2; }.empty-subjects { display: grid; min-height: 260px; place-content: center; padding: 30px; text-align: center; }.empty-subjects span { display: grid; width: 42px; height: 42px; place-items: center; margin: auto; color: $color-primary; background: $color-primary-light; border-radius: 12px; }.empty-subjects h3 { margin: 14px 0 6px; }.empty-subjects p { max-width: 330px; margin: 0; color: $color-text-muted; } @media (max-width: 850px) { .subjects-layout { grid-template-columns: 1fr; } }.subject-card__actions { flex-wrap: wrap; justify-content: flex-end; } @media (max-width: 460px) { .subjects-page__intro { display: block; }.subjects-count { display: inline-block; margin-top: 12px; }.subject-card { align-items: flex-start; flex-wrap: wrap; }.subject-card__actions { width: 100%; margin-left: 0; } }
</style>
