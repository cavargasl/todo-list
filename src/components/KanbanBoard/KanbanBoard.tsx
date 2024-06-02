import { type Task } from "@/types";
import PlusIcon from "@icons/PlusIcon";
import Button from "@ui/Button";
import { useId, useState } from "react";
import Input from "../ui/Input";
import ColumnContainer from "./components/ColumnContainer";
import { defaultColumns } from "@/const";

export default function KanbanBoard() {
  const [columns, setColumns] = useState(defaultColumns);
  const [addColumn, setAddColumn] = useState(false);
  const [tasks, setTasks] = useState<Task[]>([
    { id: useId(), name: "Task 1", stage: 0, completed: false },
    { id: useId(), name: "Task 2", stage: 0, completed: true },
  ]);

  function keyPressHandler(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Escape") return setAddColumn(false);
    if (e.key === "Enter") {
      setAddColumn(false);
    }
  }

  return (
    <main
      className="flex min-w-max justify-center gap-4"
      aria-label="Kanban Board"
    >
      {columns.map((column, index) => (
        <ColumnContainer
          key={column}
          title={column}
          tasks={tasks.filter((task) => task.stage === index)}
        />
      ))}
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
        <Button className="w-[350px]" onClick={() => setAddColumn(true)}>
          <PlusIcon />
          Add column
        </Button>
      )}
    </main>
  );
}
