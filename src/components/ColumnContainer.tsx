import { useState } from "react";
import PlusIcon from "./icons/PlusIcon";
import TrashIcon from "./icons/TrashIcon";
import Button from "./ui/Button";
import Input from "./ui/Input";

type Props = {
  title: string;
};

export default function ColumnContainer({ title }: Props) {
  const [editMode, setEditMode] = useState(false);
  const [addItem, setAddItem] = useState(false);

  return (
    <div className="bg-foreground w-[350px] h-[500px] rounded-md flex flex-col p-1">
      <header className="text-lg bg-background h-[60px] rounded-md p-3 font-bold flex justify-between items-center">
        {editMode ? (
          <Input
            type="text"
            defaultValue={title}
            onBlur={() => setEditMode(false)}
            onKeyDown={(e) => e.key === "Enter" && setEditMode(false)}
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
          onClick={() => console.log("remove")}
        >
          <TrashIcon />
        </Button>
      </header>
      <main className="flex flex-grow"></main>
      <footer>
        {addItem ? (
          <Input
            className="h-[40px] p-2 font-semibold"
            type="text"
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
      </footer>
    </div>
  );
}
