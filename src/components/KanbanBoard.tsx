import PlusIcon from "@icons/PlusIcon";
import Button from "@ui/Button";
import { useState } from "react";
import ColumnContainer from "./ColumnContainer";

function KanbanBoard() {
  const [columns, setColumns] = useState(["To do", "In progress", "Done"]);

  return (
    <div className="m-auto flex min-h-screen w-full items-center overflow-x-auto overflow-y-hidden px-[40px]">
      <div className="m-auto flex gap-2">
        <div className="flex gap-4">
          {columns.map((column) => (
            <ColumnContainer key={column} title={column} />
          ))}
        </div>
        <Button>
          <PlusIcon />
          Add column
        </Button>
      </div>
    </div>
  );
}

export default KanbanBoard;
