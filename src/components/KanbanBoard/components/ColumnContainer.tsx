import { useState } from "react"

import Button from "@/components/ui/Button"
import Input from "@/components/ui/Input"
import PlusIcon from "@/components/icons/PlusIcon"
import TrashIcon from "@/components/icons/TrashIcon"

type Props = {
  title: string
  onDeleteColumn: () => void
  onEditTitle: (title: string) => void
  children: React.ReactNode
}

export default function ColumnContainer({
  title,
  onDeleteColumn,
  children,
}: Props) {
  const [editMode, setEditMode] = useState(false)
  const [addItem, setAddItem] = useState(false)

  return (
    <li
      className="flex h-[500px] w-[350px] flex-col rounded-md bg-foreground p-1"
      aria-label="column"
    >
      <div className="flex h-[60px] items-center justify-between rounded-md bg-background p-3 text-lg font-bold">
        {editMode ? (
          <Input
            type="text"
            aria-label="Edit column title"
            defaultValue={title}
            onBlur={() => setEditMode(false)}
            autoFocus
          />
        ) : (
          <span onClick={() => setEditMode(true)} className="w-full">
            {title}
          </span>
        )}
        <Button
          variant={"ghost"}
          size={"icon"}
          onClick={onDeleteColumn}
          aria-label="delete column"
        >
          <TrashIcon />
        </Button>
      </div>

      <ul
        aria-label="tasks"
        className="flex grow flex-col gap-2 overflow-hidden overflow-y-auto py-4"
      >
        {children}
      </ul>

      {addItem ? (
        <Input
          className="h-[40px] p-2 font-semibold"
          type="text"
          placeholder="Enter item"
          onBlur={() => setAddItem(false)}
          onKeyDown={(e) => e.key === "Enter" && setAddItem(false)}
          autoFocus
        />
      ) : (
        <Button
          onClick={() => setAddItem(true)}
          variant={"ghost"}
          size={"small"}
          className="w-full justify-start hover:bg-background"
        >
          <PlusIcon />
          Add item
        </Button>
      )}
    </li>
  )
}
