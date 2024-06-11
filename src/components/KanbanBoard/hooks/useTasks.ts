import { useState } from "react"
import { defaultTasks } from "@/const"
import { type Task } from "@/types"

export default function useTasks() {
  const [tasks, setTasks] = useState(defaultTasks)

  function addTask(newTask: Task) {
    setTasks((prevTasks) => [...prevTasks, newTask])
  }

  function deleteTask(taskId: Task["id"]) {
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== taskId))
  }

  function editTask({
    taskId,
    newTask,
  }: {
    taskId: Task["id"]
    newTask: Task
  }) {
    setTasks((prevTasks) =>
      prevTasks.map((task) => (task.id === taskId ? newTask : task))
    )
  }

  function moveTask({
    taskId,
    newStage,
  }: {
    taskId: Task["id"]
    newStage: Task["stage"]
  }) {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === taskId ? { ...task, stage: newStage } : task
      )
    )
  }

  return { tasks, addTask, deleteTask, editTask, moveTask }
}
