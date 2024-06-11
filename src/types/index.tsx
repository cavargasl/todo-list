export type Task = {
  name: string
  stage: number
  id: string
  completed: boolean
}

export type FunctionsTask = {
  onDeleteTask: (taskId: Task["id"]) => void
  onEditTask: ({
    taskId,
    newTask,
  }: {
    taskId: Task["id"]
    newTask: Task
  }) => void
  onMoveTask: ({
    taskId,
    newStage,
  }: {
    taskId: Task["id"]
    newStage: Task["stage"]
  }) => void
  onAddTask: (newTask: Task) => void
}
