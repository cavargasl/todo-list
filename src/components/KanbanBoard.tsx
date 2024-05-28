import { Task } from "@/types";
import PlusIcon from "@icons/PlusIcon";
import Button from "@ui/Button";
import { useState } from "react";
import ColumnContainer from "./ColumnContainer";
import Input from "./ui/Input";

function KanbanBoard() {
  const [columns, setColumns] = useState(["To do", "In progress", "Done"]);
  const [addColumn, setAddColumn] = useState(false);
  const [tasks, setTasks] = useState<Task[]>([
    { name: "Task 1", stage: 0 },
    { name: "Task 2", stage: 0 },
  ]);

  return (
    <div className="m-auto flex min-h-screen w-full items-center overflow-x-auto overflow-y-hidden px-[40px]">
      <div className="m-auto flex gap-2">
        <div className="flex gap-4">
          {columns.map((column, index) => (
            <ColumnContainer
              key={column}
              title={column}
              tasks={tasks.filter((task) => task.stage === index)}
            />
          ))}
        </div>
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
      </div>
    </div>
  );
}

export default KanbanBoard;
