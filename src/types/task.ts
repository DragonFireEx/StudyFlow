export type TaskStatus = "todo" | "in-progress" | "done"
export type Priority = "low" | "medium" | "high"

export interface StudyTask {
    id: string
    title: string
    description: string
    subjectId: string
    status: TaskStatus
    priority: Priority
    dueDate: string | null
    estimatedMinutes: number
    createdAt: string
}