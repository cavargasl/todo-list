import { type FunctionsTask, type Task } from "@/types"

import Button from "@/components/ui/Button"
import CheckBox from "@/components/ui/CheckBox"
import ArrowLeft from "@/components/icons/ArrowLeft"
import ArrowRight from "@/components/icons/ArrowRight"
import TrashIcon from "@/components/icons/TrashIcon"

type TaskCardProps = {
  task: Task
  functionsTask: Omit<FunctionsTask, "onAddTask">
  lastStage: boolean
}
export default function TaskCard({
  task,
  functionsTask,
  lastStage,
}: TaskCardProps) {
  function moveLeft() {
    if (task.stage === 0) return
    functionsTask.onMoveTask({ taskId: task.id, newStage: task.stage - 1 })
  }
  function moveRight() {
    if (lastStage) return
    functionsTask.onMoveTask({ taskId: task.id, newStage: task.stage + 1 })
  }
  return (
    <li
      aria-label="task"
      className="flex w-full gap-2 rounded-md bg-background p-2"
    >
      <CheckBox
        className="peer"
        defaultChecked={task.completed}
        onChange={() =>
          functionsTask.onEditTask({
            taskId: task.id,
            newTask: { ...task, completed: !task.completed },
          })
        }
      />
      <p className="w-full peer-checked:line-through">{task.name}</p>
      <div className="flex gap-1">
        <Button
          variant={"ghost"}
          size={"icon"}
          className="size-[20px] p-0"
          aria-label="move to left"
          onClick={moveLeft}
          disabled={task.stage === 0}
        >
          <ArrowLeft />
        </Button>
        <Button
          variant={"ghost"}
          size={"icon"}
          className="size-[20px] p-0"
          aria-label="move to right"
          onClick={moveRight}
          disabled={lastStage}
        >
          <ArrowRight />
        </Button>
        <Button
          variant={"ghost"}
          size={"icon"}
          className="size-[20px] p-0"
          aria-label="delete task"
          onClick={() => functionsTask.onDeleteTask(task.id)}
        >
          <TrashIcon />
        </Button>
      </div>
    </li>
  )
}
