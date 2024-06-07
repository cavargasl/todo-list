import { type Task } from "@/types"

export const defaultColumns = ["To do", "In progress", "Done"]
export const defaultTasks: Task[] = [
  { id: "task-1", name: "Task 1", stage: 0, completed: false },
  { id: "task-2", name: "Task 2", stage: 0, completed: true },
  { id: "task-3", name: "Task 3", stage: 1, completed: false },
  { id: "task-4", name: "Task 4", stage: 2, completed: true },
]
