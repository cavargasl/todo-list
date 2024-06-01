import { Task } from "@/types";
import PlusIcon from "@icons/PlusIcon";
import Button from "@ui/Button";
import { useId, useState } from "react";
import ColumnContainer from "./ColumnContainer";
import Input from "./ui/Input";

function KanbanBoard() {
  const [columns, setColumns] = useState(["To do", "In progress", "Done"]);
  const [addColumn, setAddColumn] = useState(false);
  const [tasks, setTasks] = useState<Task[]>([
    { id: useId(), name: "Task 1", stage: 0, completed: false },
    { id: useId(), name: "Task 2", stage: 0, completed: true },
  ]);

  return (
    <main className="flex gap-4 justify-center min-w-max">
      {columns.map((column, index) => (
        <ColumnContainer
          key={column}
          title={column}
          tasks={tasks.filter((task) => task.stage === index)}
        />
      ))}
      {addColumn ? (
        <Input
          className="h-[60px] font-semibold w-[350px]"
          type="text"
          placeholder="Enter column title"
          onBlur={() => setAddColumn(false)}
          onKeyDown={(e) => e.key === "Enter" && setAddColumn(false)}
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

export default KanbanBoard;
