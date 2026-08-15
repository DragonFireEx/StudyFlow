import { ref } from "vue"
import type { StudyTask } from "../types/task"

type TaskInput = Omit<StudyTask, "id" | "createdAt">

const STORAGE_KEY = "studyflow-tasks"

const getInitialTasks = (): StudyTask[] => {
  try {
    const storedTasks = localStorage.getItem(STORAGE_KEY)

    if (!storedTasks) {
      return []
    }

    return JSON.parse(storedTasks) as StudyTask[]
  } catch {
    return []
  }
}

const tasks = ref<StudyTask[]>(getInitialTasks())

const saveTasks = () => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks.value))
}

export const useTasks = () => {
  const addTask = (taskData: TaskInput) => {
    const newTask: StudyTask = {
      id: crypto.randomUUID(),
      createdAt: new Date().toISOString(),
      ...taskData,
    }

    tasks.value.push(newTask)
    saveTasks()
  }

  const updateTask = (id: string, taskData: Partial<TaskInput>) => {
    const taskIndex = tasks.value.findIndex((task) => task.id === id)

    if (taskIndex === -1) {
      return
    }

    tasks.value[taskIndex] = {
      ...tasks.value[taskIndex],
      ...taskData,
    }

    saveTasks()
  }

  const deleteTask = (id: string) => {
    tasks.value = tasks.value.filter((task) => task.id !== id)
    saveTasks()
  }

  const toggleTaskStatus = (task: StudyTask) => {
    updateTask(task.id, {
      status: task.status === "done" ? "todo" : "done",
    })
  }

  return {
    tasks,
    addTask,
    updateTask,
    deleteTask,
    toggleTaskStatus,
  }
}