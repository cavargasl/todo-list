import { useState } from "react"
import { defaultColumns, defaultTasks } from "@/const"
import { type FunctionsTask, type Task } from "@/types"
import PlusIcon from "@icons/PlusIcon"
import Button from "@ui/Button"

import Input from "../ui/Input"
import ColumnContainer from "./components/ColumnContainer"
import TaskCard from "./components/TaskCard"

export default function KanbanBoard() {
  const [columns] = useState(defaultColumns)
  const [addColumn, setAddColumn] = useState(false)
  const [tasks] = useState<Task[]>(defaultTasks)

  function keyPressHandler(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Escape") return setAddColumn(false)
    if (e.key === "Enter") {
      setAddColumn(false)
    }
  }
  const functionsTask: FunctionsTask = {
    onDeleteTask: () => console.log("delete task"),
    onEditTask: () => console.log("edit task"),
    onMoveTask: () => console.log("move task"),
  }

  return (
    <main aria-label="Kanban Board" className="flex min-w-max gap-3">
      <ul className="flex gap-3">
        {columns.map((column, index) => (
          <ColumnContainer
            key={column}
            columnIndex={index}
            onAddTask={() => console.log("add task")}
            title={column}
            onDeleteColumn={() => console.log("delete column")}
            onEditTitle={(title) => console.log(title)}
          >
            {tasks
              .filter((task) => task.stage === index)
              .map((task) => (
                <TaskCard
                  key={task.id}
                  task={task}
                  functionsTask={functionsTask}
                  lastStage={task.stage === column.length - 1}
                />
              ))}
          </ColumnContainer>
        ))}
      </ul>
      {addColumn ? (
        <Input
          className="h-[60px] w-[350px] font-semibold"
          type="text"
          placeholder="Enter column title"
          onBlur={() => setAddColumn(false)}
          onKeyDown={keyPressHandler}
          autoFocus
        />
      ) : (
        <Button onClick={() => setAddColumn(true)}>
          <PlusIcon />
          Add column
        </Button>
      )}
    </main>
  )
}
