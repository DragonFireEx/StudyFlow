import { computed, ref } from 'vue'
import type { Subject, SubjectInput } from '../types/subject'

const STORAGE_KEY = 'studyflow-subjects'

const getInitialSubjects = (): Subject[] => {
  try {
    const storedSubjects = localStorage.getItem(STORAGE_KEY)

    if (!storedSubjects) {
      return []
    }

    const parsedSubjects: unknown = JSON.parse(storedSubjects)
    return Array.isArray(parsedSubjects) ? parsedSubjects as Subject[] : []
  } catch {
    return []
  }
}

const subjects = ref<Subject[]>(getInitialSubjects())

const saveSubjects = () => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(subjects.value))
}

const createId = () => crypto.randomUUID()

export const useSubjects = () => {
  const sortedSubjects = computed(() =>
    [...subjects.value].sort((firstSubject, secondSubject) =>
      firstSubject.name.localeCompare(secondSubject.name, 'pl'),
    ),
  )

  const addSubject = (input: SubjectInput) => {
    const subject: Subject = {
      id: createId(),
      name: input.name.trim(),
      color: input.color,
      createdAt: new Date().toISOString(),
    }

    subjects.value.push(subject)
    saveSubjects()
  }

  const updateSubject = (id: string, input: SubjectInput) => {
    const subjectIndex = subjects.value.findIndex((subject) => subject.id === id)

    if (subjectIndex === -1) {
      return
    }

    subjects.value[subjectIndex] = {
      ...subjects.value[subjectIndex],
      name: input.name.trim(),
      color: input.color,
    }
    saveSubjects()
  }

  const deleteSubject = (id: string) => {
    subjects.value = subjects.value.filter((subject) => subject.id !== id)
    saveSubjects()
  }

  return {
    subjects: sortedSubjects,
    addSubject,
    updateSubject,
    deleteSubject,
  }
}
