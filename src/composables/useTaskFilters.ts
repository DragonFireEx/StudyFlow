import { computed, ref, type Ref } from "vue"
import type { Subject } from "../types/subject"
import type { Priority, StudyTask, TaskStatus } from "../types/task"

export type TaskSortOption =
  | "newest"
  | "due-date"
  | "priority"
  | "subject"

export const useTaskFilters = (
  tasks: Readonly<Ref<StudyTask[]>>,
  subjects: Readonly<Ref<Subject[]>>,
) => {
  const searchQuery = ref("")
  const selectedSubjectId = ref("")
  const selectedStatus = ref<"" | TaskStatus>("")
  const selectedPriority = ref<"" | Priority>("")
  const sortBy = ref<TaskSortOption>("newest")

  const getSubjectName = (subjectId: string) => {
    return (
      subjects.value.find((subject) => subject.id === subjectId)?.name ??
      "Bez przedmiotu"
    )
  }

  const filteredTasks = computed(() => {
    const normalizedQuery = searchQuery.value.trim().toLowerCase()

    const result = tasks.value.filter((task) => {
      const matchesSearch = task.title
        .toLowerCase()
        .includes(normalizedQuery)

      const matchesSubject =
        !selectedSubjectId.value ||
        task.subjectId === selectedSubjectId.value

      const matchesStatus =
        !selectedStatus.value ||
        task.status === selectedStatus.value

      const matchesPriority =
        !selectedPriority.value ||
        task.priority === selectedPriority.value

      return (
        matchesSearch &&
        matchesSubject &&
        matchesStatus &&
        matchesPriority
      )
    })

    return [...result].sort((firstTask, secondTask) => {
      if (sortBy.value === "newest") {
        return (
          new Date(secondTask.createdAt).getTime() -
          new Date(firstTask.createdAt).getTime()
        )
      }

      if (sortBy.value === "due-date") {
        const firstDate = firstTask.dueDate
          ? new Date(firstTask.dueDate).getTime()
          : Number.MAX_SAFE_INTEGER

        const secondDate = secondTask.dueDate
          ? new Date(secondTask.dueDate).getTime()
          : Number.MAX_SAFE_INTEGER

        return firstDate - secondDate
      }

      if (sortBy.value === "priority") {
        const priorityOrder: Record<Priority, number> = {
          high: 1,
          medium: 2,
          low: 3,
        }

        return (
          priorityOrder[firstTask.priority] -
          priorityOrder[secondTask.priority]
        )
      }

      return getSubjectName(firstTask.subjectId).localeCompare(
        getSubjectName(secondTask.subjectId),
        "pl",
      )
    })
  })

  const clearFilters = () => {
    searchQuery.value = ""
    selectedSubjectId.value = ""
    selectedStatus.value = ""
    selectedPriority.value = ""
    sortBy.value = "newest"
  }

  return {
    searchQuery,
    selectedSubjectId,
    selectedStatus,
    selectedPriority,
    sortBy,
    filteredTasks,
    clearFilters,
  }
}