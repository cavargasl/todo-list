import { type Task } from "@/types"

import Button from "@/components/ui/Button"
import CheckBox from "@/components/ui/CheckBox"
import ArrowLeft from "@/components/icons/ArrowLeft"
import ArrowRight from "@/components/icons/ArrowRight"
import TrashIcon from "@/components/icons/TrashIcon"

export default function TaskCard({
  Task: { name, completed },
}: {
  Task: Task
}) {
  return (
    <li
      aria-label="task"
      className="flex w-full gap-2 rounded-md bg-background p-2"
    >
      <CheckBox className="peer" defaultChecked={completed} />
      <p className="w-full peer-checked:line-through">{name}</p>
      <div className="flex gap-1">
        <Button
          variant={"ghost"}
          size={"icon"}
          className="size-[20px] p-0"
          aria-label="move to left"
        >
          <ArrowLeft />
        </Button>
        <Button
          variant={"ghost"}
          size={"icon"}
          className="size-[20px] p-0"
          arial-label="move to right"
        >
          <ArrowRight />
        </Button>
        <Button
          variant={"ghost"}
          size={"icon"}
          className="size-[20px] p-0"
          aria-label="delete task"
        >
          <TrashIcon />
        </Button>
      </div>
    </li>
  )
}
