import { useState } from "react"
import { type FunctionsTask } from "@/types"
import PlusIcon from "@icons/PlusIcon"
import Button from "@ui/Button"

import Input from "../ui/Input"
import ColumnContainer from "./components/ColumnContainer"
import TaskCard from "./components/TaskCard"
import useColumns from "./hooks/useColumns"
import useTasks from "./hooks/useTasks"

export default function KanbanBoard() {
  const { columns, deleteColumn, addColumn, editColumn } = useColumns()
  const [showAddColumn, setShowAddColumn] = useState(false)
  const { tasks, deleteTask, editTask, moveTask, addTask } = useTasks()

  function keyPressHandler(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Escape") return setShowAddColumn(false)
    if (e.key === "Enter") {
      if (e.currentTarget.value.trim() === "") return setShowAddColumn(false)
      if (columns.includes(e.currentTarget.value))
        return setShowAddColumn(false)
      addColumn(e.currentTarget.value)
      setShowAddColumn(false)
    }
  }

  const functionsTask: Omit<FunctionsTask, "onAddTask"> = {
    onDeleteTask: deleteTask,
    onEditTask: editTask,
    onMoveTask: moveTask,
  }
  function onDeleteColumn(columnIndex: number) {
    deleteColumn(columnIndex)
    tasks
      .filter((task) => task.stage === columnIndex)
      .forEach((task) => deleteTask(task.id))
    tasks
      .filter((task) => task.stage > columnIndex)
      .forEach((task) =>
        moveTask({ taskId: task.id, newStage: task.stage - 1 })
      )
  }

  return (
    <main aria-label="Kanban Board" className="flex min-w-max gap-3">
      <ul className="flex gap-3">
        {columns.map((column, index) => (
          <ColumnContainer
            key={column}
            columnIndex={index}
            title={column}
            onDeleteColumn={onDeleteColumn}
            onEditTitle={editColumn}
            onAddTask={addTask}
          >
            {tasks
              .filter((task) => task.stage === index)
              .map((task) => (
                <TaskCard
                  key={task.id}
                  task={task}
                  functionsTask={functionsTask}
                  lastStage={task.stage === columns.length - 1}
                />
              ))}
          </ColumnContainer>
        ))}
      </ul>
      {showAddColumn ? (
        <Input
          className="h-[60px] w-[350px] font-semibold"
          type="text"
          placeholder="Enter column title"
          onBlur={() => setShowAddColumn(false)}
          onKeyDown={keyPressHandler}
          autoFocus
        />
      ) : (
        <Button onClick={() => setShowAddColumn(true)}>
          <PlusIcon />
          Add column
        </Button>
      )}
    </main>
  )
}
